# Usa la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /myapp

# Copia los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias y nodemon de forma global
RUN npm install && npm install -g nodemon

# Copia el resto del código fuente
COPY . .

# Ejecuta el comando de build (para aplicaciones que lo necesiten)
RUN npm run build

# Expone el puerto 8090
EXPOSE 8090

# Cambia el usuario a 'node' por seguridad
USER node

# Define el comando por defecto para iniciar la aplicación
CMD ["npm", "run", "start"]
