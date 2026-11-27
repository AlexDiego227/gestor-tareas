# Práctica 2 - Imagen para la aplicación del equipo
FROM nginx:stable-alpine

# Copiamos la aplicación (index.html, css/, js/) al directorio que Nginx sirve por defecto.
# Lo que no debe entrar en la imagen se excluye en .dockerignore.
COPY . /usr/share/nginx/html/

EXPOSE 80
