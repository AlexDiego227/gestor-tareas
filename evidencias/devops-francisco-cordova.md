# Evidencias individuales - Práctica 1 DevOps

Renombra este fichero como `devops-nombre-apellido.md` y complétalo dentro de tu rama feature.

## 1. Colaboración DevOps - RA1.a

Explica en 1-2 frases qué aporta cada acción al trabajo colaborativo:

### a) Trabajar en una rama feature

Respuesta: feature/anadir-tarea.

### b) Abrir un Pull Request y que otro compañero lo revise

Respuesta: mi Pull Request fue revisada por Javi.

### c) Resolver un conflicto de README.md entre varios cambios

Respuesta: Fue resuelto descartando inforamción inncesaria durante el transcurso del desarrollo del proyecto.

## 2. CI/CD - RA1.b

### a) Integración Continua (CI)

Explica con tus palabras qué podría automatizarse al hacer `push` o abrir un Pull Request:

Respuesta: Se podría automatizar la ejecución de pruebas unitarias, de integración y de calidad del código cada vez que se realice un `push` (el pull request debería ser revisado manualmente).

### b) Entrega / Despliegue Continuo (CD)

Explica qué podría ocurrir automáticamente después de superar las comprobaciones:

Respuesta: Después de superar las comprobaciones, se podría desplegar automáticamente la aplicación en un entorno de producción o staging.

### c) Dos comprobaciones de esta práctica que automatizarías en un pipeline futuro

1. Verificación de la calidad del código (code quality checks)
2. Pruebas de seguridad (security tests)

## 3. Selección de herramientas - RA1.e

Herramientas de referencia: Git, GitHub, GitHub Actions, Jenkins, SonarQube y OWASP ZAP.

### Contexto A
Equipo pequeño que ya trabaja en GitHub y quiere ejecutar pruebas automáticamente en cada Pull Request.

Herramienta principal de CI/CD elegida: GitHub Actions

Justificación (2-3 líneas): GitHub Actions es una herramienta nativa de GitHub que permite automatizar el proceso de integración y despliegue continuo sin necesidad de configurar un servidor propio.

### Contexto B
Empresa que quiere administrar su propio servidor de automatización y conectarlo con repositorios y entornos internos.

Herramienta principal de CI/CD elegida: Coolify

Justificación (2-3 líneas): Coolify es una herramienta de automatización que permite administrar un servidor propio y conectarlo con repositorios internos, facilitando la integración y despliegue continuo en entornos controlados.

### Herramienta adicional opcional

Si añadirías SonarQube u OWASP ZAP, indica cuál y qué comprobaría:

Añadiria WASP ZAP para realizar pruebas de seguridad en la aplicación, identificando vulnerabilidades y asegurando que el código cumpla con los estándares de seguridad antes de ser desplegado en producción.
