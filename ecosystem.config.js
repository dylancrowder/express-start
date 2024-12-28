module.exports = {
    apps: [
      {
        name: 'crud-app',
        script: 'dist/server.js',  // Ruta a tu archivo de servidor (después de compilar TypeScript)
        instances: 'max',           // Utiliza todas las CPU disponibles
        autorestart: true,         // Reinicia automáticamente si el proceso falla
        watch: false,              // No vigilamos los archivos (en producción)
        max_memory_restart: '1G',  // Reinicia si el proceso usa más de 1 GB de memoria
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  