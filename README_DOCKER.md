# Despliegue Docker del gestor de tareas

**Equipo:** Equipo gestor-tareas
**Integrantes:** Francisco Cordova, Darío Sánchez, Alex Diego Peña, Javier Martin
**Repositorio de GitHub:** https://github.com/AlexDiego227/gestor-tareas

## Requisitos

- Docker (con el daemon en marcha) y Docker Compose v2 (`docker compose version`).
- Puerto `8080` libre en el ordenador.
- No hace falta instalar Nginx ni Node.

## Ejecutar la aplicación

```bash
https://github.com/AlexDiego227/gestor-tareas/tree/feature/docker
cd gestor-tareas
docker compose up -d --build
```

**URL de acceso:** http://localhost:8080

Comprobar el estado: `docker compose ps`

## Detener y eliminar los contenedores

```bash
docker compose down
```

(`docker compose stop` solo los para; `down` además elimina contenedores y la red.)

## Arquitectura

```
Navegador → localhost:8080 → [proxy: Nginx] → red de Compose → [web: Nginx + gestor de tareas]
```

- **web**: imagen propia `gestor-tareas:2.0` (Nginx + archivos estáticos HTML/CSS/JS, construida con el `Dockerfile`). No publica ningún puerto en el ordenador; solo escucha dentro de la red Docker.
- **proxy**: Nginx oficial con `proxy/default.conf` montado en solo lectura. Es el único servicio visible desde el ordenador (`127.0.0.1:8080`) y reenvía las peticiones a `web`.
- **Comunicación entre servicios**: Compose crea una red por defecto con DNS interno, así que el proxy llega a `web` por su nombre (`http://web:80`) sin conocer su IP.

## Posibles problemas

- **Puerto 8080 ocupado** (`port is already allocated`): había otro contenedor usando el puerto. Se soluciona con `docker ps` para identificarlo y `docker stop`/`docker rm` sobre él.
- **Cambios que no aparecen**: la imagen no se reconstruye sola; hay que usar `docker compose up -d --build`.
- **Proxy en bucle de reinicio**: si `proxy_pass` apunta a un servicio que no existe, Nginx falla con `host not found in upstream`. Revisar `docker compose logs proxy`.
