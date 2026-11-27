# Evidencias grupales · Práctica 2 Docker

**Equipo:** Equipo gestor-tareas  
**Integrantes:** Francisco Cordova, Darío Sánchez, Alex Diego Peña, Javier Martin  
**Fecha:** 27/11/2026

> No hace falta una captura por comando. Bastan resultados breves y explicaciones comprensibles. Las evidencias son del **equipo**.

## 1. Primeros contenedores

- [x] `docker --version` / `docker compose version` comprobados.
- [x] `hello-world` ejecutado.
- [x] Nginx accesible en `http://localhost:8081`.
- [x] Se ha detenido, iniciado y eliminado el contenedor.

**Comandos utilizados y resultado:**

    docker --version
    # Docker version 29.8.2

    docker compose version
    # Docker Compose version v5.5.0

    docker run --rm hello-world
    # Descarga la imagen e imprime el mensaje de bienvenida.

    docker pull nginx:stable-alpine

    docker run -d --name nginx-prueba -p 127.0.0.1:8081:80 nginx:stable-alpine

    # http://localhost:8081 -> <title>Welcome to nginx!</title>

    docker exec nginx-prueba ls /usr/share/nginx/html
    # 50x.html  index.html

    docker stop nginx-prueba
    docker start nginx-prueba
    docker stop nginx-prueba

    docker rm nginx-prueba
    # El contenedor desaparece de docker ps -a.

    docker images
    # La imagen nginx:stable-alpine sigue disponible después de eliminar el contenedor.

**¿Qué hace `--rm`?**

Elimina automáticamente el contenedor cuando termina su ejecución, de modo que no quedan contenedores parados acumulándose.

**¿Qué significa `8081:80`?**

Publica el puerto 80 del contenedor (donde escucha Nginx) en el puerto 8081 del ordenador. Con `127.0.0.1:8081:80` además solo se puede acceder desde la propia máquina, no desde la red.

## 2. Nuestra imagen

- [x] Imagen construida con `docker build`.
- [x] Aplicación accesible en `http://localhost:8080`.
- [x] Cambio visual comprobado tras reconstruir y recrear el contenedor.

**Comandos y resultados:**

    docker build -t gestor-tareas:2.0 .

    docker run -d --name gestor-tareas -p 127.0.0.1:8080:80 gestor-tareas:2.0

    # http://localhost:8080 -> gestor de tareas funcionando

El `Dockerfile` usa `FROM nginx:stable-alpine` y `COPY . /usr/share/nginx/html/`.

El `.dockerignore` evita que entren en la imagen archivos que no son de la aplicación (`.git`, documentación, `compose.yaml`, `proxy/`, `evidencias/`...), con lo que la imagen es más pequeña y no se filtra información innecesaria.

**¿Por qué el contenedor antiguo no cambia al reconstruir la imagen?**

Un contenedor se crea a partir de una imagen en un instante concreto y conserva esa copia. Reconstruir la imagen genera una imagen nueva, pero los contenedores ya creados siguen usando la anterior; hay que hacer `docker stop` + `docker rm` + `docker run` (o `docker compose up -d --build`) para crear uno nuevo desde la imagen actualizada.

**Prueba de actualización:**

Se modificó el título de la aplicación, se reconstruyó la imagen y se comprobó que el contenedor antiguo seguía utilizando la versión anterior. Después de recrearlo, apareció el título actualizado.

## 3. Persistencia de datos

- [x] Volumen creado.
- [x] Un contenedor escribe un archivo en el volumen.
- [x] Otro contenedor recupera el archivo tras eliminar el primero.

**Comandos y resultado:**

    docker volume create datos-devops

    docker run --rm -v datos-devops:/datos alpine:3.24 sh -c "echo datos persistentes > /datos/prueba.txt"

    docker run --rm -v datos-devops:/datos alpine:3.24 cat /datos/prueba.txt

    # -> datos persistentes

El primer contenedor desaparece (`--rm`), pero el segundo lee el mismo archivo. Las tareas de la aplicación no están en este volumen: usan `localStorage`, que vive en el navegador.

**¿Qué relación tiene esto con las bases de datos?**

El sistema de archivos de un contenedor es efímero: se pierde al eliminarlo. Una base de datos (MySQL, PostgreSQL...) guarda sus datos en un volumen para que sobrevivan a recreaciones, actualizaciones de imagen o fallos del contenedor.

## 4. Docker Compose

- [x] Servicios `web` y `proxy` iniciados.
- [x] La aplicación funciona en `http://localhost:8080`.
- [x] Se ha consultado `docker compose ps`.
- [x] Se ha probado la comunicación `proxy` → `web`.

**Comandos y resultado:**

    docker compose config
    # Sin errores.

    docker compose up -d --build

    docker compose ps

    # gestor-tareas-proxy-1   nginx:stable-alpine   Up   127.0.0.1:8080->80/tcp
    # gestor-tareas-web-1     gestor-tareas:2.0     Up   80/tcp (sin puerto publicado)

    curl -s -o /dev/null -w "%{http_code}" http://localhost:8080
    # 200

    docker compose exec proxy wget -qO- http://web:80/
    # Devuelve el HTML del gestor de tareas.

También se probaron los siguientes comandos:

- `docker compose logs proxy`: consulta los registros del proxy.
- `docker compose restart web`: reinicia el servicio web.
- `docker compose stop`: detiene los servicios.
- `docker compose start`: vuelve a iniciarlos.
- `docker compose down`: elimina los contenedores y la red.
- `docker compose up -d`: vuelve a levantar los servicios.

Los servicios se recrean correctamente y la aplicación vuelve a responder en el puerto 8080.

`depends_on` solo fija el orden de arranque; no garantiza que `web` esté listo para aceptar conexiones.

**¿Por qué el proxy se conecta a `web` por su nombre?**

Compose crea una red propia para el proyecto con un servidor DNS interno que resuelve el nombre de cada servicio a la IP actual de su contenedor. Así no hay que fijar IPs, que cambian al recrear contenedores.

## 5. Incidencias

**Incidencia 1 - Puerto ocupado**

Con el despliegue activo se intentó ejecutar:

    docker run -p 127.0.0.1:8080:80 nginx:stable-alpine

**Síntoma:** Error `Bind for 127.0.0.1:8080 failed: port is already allocated`.

**Causa:** El proxy de Compose ya tenía publicado el puerto 8080 y un puerto del host solo puede asignarse a un contenedor.

**Solución:** Se identificó con `docker ps` y se eliminó el contenedor sobrante (`docker rm -f`), o bien se usa otro puerto del host (por ejemplo, `8082:80`), sin tocar el despliegue ni borrar datos.

**Incidencia 2 - Imagen no actualizada**

Se cambió el `<title>` de `index.html` y, sin reconstruir, `http://localhost:8080` seguía mostrando el título antiguo porque la imagen de `web` contiene una copia de los archivos hecha en el build.

**Síntoma:** Los cambios realizados en los archivos no aparecían en la aplicación.

**Causa:** El contenedor seguía utilizando la imagen anterior.

**Solución:** Se ejecutó `docker compose up -d --build`, que reconstruye la imagen y recrea `web`. Tras ello apareció el título nuevo.

**Incidencia 3 - Servicio incorrecto en Nginx**

Se cambió `http://web:80` por `http://servicio-inexistente:80` en `proxy/default.conf` y se recreó el proxy.

**Síntoma:** `localhost:8080` dejó de responder y el contenedor `proxy` quedó en estado `Restarting`.

En `docker compose logs proxy` apareció:

    [emerg] host not found in upstream "servicio-inexistente"

**Causa:** Ese nombre no existe en la red de Compose.

**Solución:** Se restauró el nombre `web` y se ejecutó:

    docker compose up -d --force-recreate proxy

La aplicación volvió a responder con el código HTTP 200.

## 6. Conclusión del equipo

**Dos cosas que hemos aprendido:**

1. La diferencia entre imagen (plantilla inmutable) y contenedor (instancia), y por qué hay que reconstruir y recrear para ver cambios.
2. Con Compose se define toda la arquitectura (web + proxy, red y puertos) en un solo archivo y se despliega con un único comando.

**Una duda o dificultad que hemos tenido:**

Entender que `depends_on` no espera a que la aplicación esté lista, y cómo se resuelven los nombres de servicio dentro de la red de Compose.

## 7. Colaboración

**Pull Requests relevantes:**

- `feature/docker` → `develop`: https://github.com/AlexDiego227/gestor-tareas/pull/8
