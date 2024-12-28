# Usa la imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /myapp

# Acepta argumentos de construcción para las variables de entorno
ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD

# Configura las variables de entorno
ENV DB_HOST=$DB_HOST
ENV DB_NAME=$DB_NAME
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD

# Copia los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./ 

# Instala las dependencias y PM2 de forma global
RUN npm install && npm install -g pm2

# Copia el resto del código fuente
COPY . .

# Ejecuta el comando de build (si es necesario)
RUN npm run build

# Expone el puerto 8090
EXPOSE 8090

# Cambia el usuario a 'node' por seguridad
USER node

# Define el comando por defecto para iniciar la aplicación con PM2
CMD ["pm2-runtime","NODE_ENV=production" ,"start", "dist/server.js", "--name", "my_node_app" ]
