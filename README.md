# Frontend-Aplicacion-MedioAmbiente
 
*(https://github.com/Xalex79/Forntend-Aplicacion-MedioAmbiente)
*(https://github.com/Xalex79/Backend-Aplicacion-MedioAmbiente)

Esta es la configuración del Frontend, es la base de lo que en un futuro será la interfaz que usará el usuario final para ver las medidas guardadas de Ozono y otros parámetros secundarios. 

Para configurar el Frontend en un deployment, usaremos Docker.
Antes de nada es importante tener Docker instalado. La manera más sencilla e intuitiva de hacerlo es descargando la aplicación de escritorio Docker Desktop (https://www.docker.com/). Es resto de modulos que requiere este proyecto están en el propio contenedor que engloba todo el backend, frontend, y la base de datos en MongoDb en local. También se puede usar una base de datos en la nube con un cluster en MongoDB Atlas, pero para el desarrollo de este proyecto no es necesario y evita la necesidad de tener conexión a internet al probar el funcionamiento del proyecto (aunque para configurarlo usando Docker es necesaria una conexión a internet).

Si has descargado los dos repositorios* y quieres hacer tu propio contenedor, sigue los pasos a continuación.

Crea una carpeta donde guardarás ambos repositorios*, por ejemplo Proyecto MedioAmbiente
                                                                 |- Backend
                                                                 |_ Frontend

Dentro de la carpeta raíz (en este ejemplo "Proyecto MedioAmbiente"), pero fuera de los repositorios*, crearás un archivo llamado "docker-compose.yml". Con este código:

version: '3.8'

services:
  backend:
    build:
      context: ./
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development

  frontend:
    build:
      context: ./
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    depends_on:
      - backend

  mongodb:
    image: mongo:5.0
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:


En el archivo "docker-compose.yml" estarán especificadas las carpetas del proyecto y demás requerimientos necesarios. Cuando descargues los repositorios* de Backend y Frontend, asegurate de escribir la ruta correcta de cada uno. 
En frontend:
    build:
      context: AQUI PONES LA RUTA DEL FRONTEND, POR EJEMPLO ASI: ./Frontend/ (donde estarán las carpetas src, doc, test, ... etc)
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    depends_on:
      - backend
Lo mismo con el backend. 
Una vez tengas esto completado, abrirás la terminal (por defecto la terminal de tu editor de código), y asegurándote que estás en la carpeta que guarda frontend y backend, escribirás el siguiente comando "docker-compose up --build". Si todo sale bien en la interfaz de Docker Desktop en "Containers" verás el nombre del contenedor y dentro al desplegar el icono verás tres imágenes, de frontend, backend, y mongodb. 
Entrando en el navegador en la página http://localhost:8080 podrás ver el frontend, junto con las medidas en la base de datos. Si aún no tienes un dispositivo Android que pueda mandar nuevas medidas a la base de datos, puedes acceder al archivo "request.http" y probar diferentes métodos HTTP. Por ejemplo puedes hacer un POST para crear nuevas medidas, o hacer un GET para recibir todas las medidas, puedes actualizar medidas con PUT buscando por ID o borrar medidas por ID con DELETE. Si todo va bien deberías ver en el frontend como se van modificando las medidas al usar los métodos HTTP. 

Al usar entre otras cosas, REACT, el frontend se irá actualizando sin necesidad de recargar la página web con F5 o Shift+F5 como con otras tecnologías. En este proyecto esta puesto que se actualicen cada 5s, pero puedes modificarlo en "MeasurementDashboard.tsx" en la linea 30 al tiempo que veas conveniente en ms (5s = 5000ms).

Eso es todo lo importante para el Frontend.