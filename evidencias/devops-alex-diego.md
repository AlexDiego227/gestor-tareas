# Evidencias individuales - Práctica 1 DevOps

Renombra este fichero como `devops-nombre-apellido.md` y complétalo dentro de tu rama feature.

## 1. Colaboración DevOps - RA1.a

Explica en 1-2 frases qué aporta cada acción al trabajo colaborativo:

### a) Trabajar en una rama feature

Respuesta:feature/completar-tarea.

### b) Abrir un Pull Request y que otro compañero lo revise

Respuesta:el pull request fue revisado por dario.

### c) Resolver un conflicto de README.md entre varios cambios

Respuesta:para descartar informaciion innecesaria y seleccionar la que tenga la informacion mas precisa y util entre toda la informacion.

## 2. CI/CD - RA1.b

### a) Integración Continua (CI)

Explica con tus palabras qué podría automatizarse al hacer `push` o abrir un Pull Request:

Respuesta:el push podria automatzarse porque asi se podria ahorrar algo de trabajo

### b) Entrega / Despliegue Continuo (CD)

Explica qué podría ocurrir automáticamente después de superar las comprobaciones:

Respuesta: despues de comprobarlas podria subir automaticamente los cambios una vez que todo este corrrecto y se verifica que las comprobaciones estan
correctas.
 

### c) Dos comprobaciones de esta práctica que automatizarías en un pipeline futuro

1. verificar la calidad del codigo
2. Pruebas de seguridad

## 3. Selección de herramientas - RA1.e

Herramientas de referencia: Git, GitHub, GitHub Actions, Jenkins, SonarQube y OWASP ZAP.

### Contexto A
Equipo pequeño que ya trabaja en GitHub y quiere ejecutar pruebas automáticamente en cada Pull Request.

Herramienta principal de CI/CD elegida:GitHub Actions

Justificación (2-3 líneas):Es una herramienta nativa de GitHub que nos permite  automatizar el despliegue continuo y el proceso de integracion sin tener que configurar un servidor propio.

### Contexto B
Empresa que quiere administrar su propio servidor de automatización y conectarlo con repositorios y entornos internos.

Herramienta principal de CI/CD elegida: Coolify

Justificación (2-3 líneas): es una herramienta que sirve para administrar un servidor propipo y conectarlo con repositorios que ayuda a la integrqacion y el despliegue de entornos controlados

### Herramienta adicional opcional

Si añadirías SonarQube u OWASP ZAP, indica cuál y qué comprobaría: OWASP ZAP
realizaría pruebas dinámicas de seguridad sobre la aplicación web en ejecución para identificar vulnerabilidades como XSS (Cross-Site Scripting), configuraciones inseguras, cabeceras HTTP incorrectas y otros riesgos recogidos en OWASP Top 10.
