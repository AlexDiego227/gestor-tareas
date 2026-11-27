# Evidencias individuales - Práctica 1 DevOps

Renombra este fichero como `devops-nombre-apellido.md` y complétalo dentro de tu rama feature.

## 1. Colaboración DevOps - RA1.a

Explica en 1-2 frases qué aporta cada acción al trabajo colaborativo:

### a) Trabajar en una rama feature

Respuesta: Al trabajar en ramas independiente  lo que nos permite es que cada integrante desarrolle su funcionalidad sin afectar al resto del qeuipo

### b) Abrir un Pull Request y que otro compañero lo revise

Respuesta: Al hacerlo lo que nos permite es revisar el código de otro integrante y corregir los errores antes de incorporarlo

### c) Resolver un conflicto de README.md entre varios cambios

Respuesta: Nos obliga a coordinarnos para solucionar errores al juntar diversos códigos 

## 2. CI/CD - RA1.b

### a) Integración Continua (CI)

Explica con tus palabras qué podría automatizarse al hacer `push` o abrir un Pull Request:

Respuesta: Se podrían automatizar las pruebas del proyecto para comprobar que el código no tiene errores y que las funcionalidades funcionan correctamente.

### b) Entrega / Despliegue Continuo (CD)

Explica qué podría ocurrir automáticamente después de superar las comprobaciones:

Respuesta: Después de superar las comprobaciones, el sistema podría preparar una versión del proyecto para su entrega o desplegarla automáticamente en un servidor.

### c) Dos comprobaciones de esta práctica que automatizarías en un pipeline futuro

1. Comprobar que añadir, eliminar, completar y filtrar tareas funciona correctamente.
2. Comprobar que los archivos JavaScript no contienen errores.
## 3. Selección de herramientas - RA1.e

Herramientas de referencia: Git, GitHub, GitHub Actions, Jenkins, SonarQube y OWASP ZAP.

### Contexto A
Equipo pequeño que ya trabaja en GitHub y quiere ejecutar pruebas automáticamente en cada Pull Request.

Herramienta principal de CI/CD elegida: GitHub Actions.


Justificación (2-3 líneas): GitHub Actions permite automatizar pruebas directamente desde el repositorio de GitHub.

### Contexto B
Empresa que quiere administrar su propio servidor de automatización y conectarlo con repositorios y entornos internos.

Herramienta principal de CI/CD elegida: Jenkins

Justificación (2-3 líneas): Jenkins permite instalar y administrar un servidor de automatización propio.

### Herramienta adicional opcional

Si añadirías SonarQube u OWASP ZAP, indica cuál y qué comprobaría: Añadiría SonarQube para analizar el código automáticamente.
