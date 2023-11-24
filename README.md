# Evaluación 2

El taller 1 fue desarrollada en:
- Frontend: Svelte
- Backend: Express - Node JS
- Base de datos: MongoDB

## Requisitos Previos

Asegúrate de tener instalado Node.js en tu máquina

## Clonar o descargar el ZIP del repositorio

## Frontend

1. **Ingresa al directorio 'Frontend/client'**

```bash
cd Frontend
cd client
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno creando un archivo .env en el directorio client y proporciona el valor necesario que es la url en donde se corre el servidor:**
- VITE_BASE_API_URL = ""

4. **Inicia la aplicación**

```bash
npm run dev
```

## Base de datos

1. **Regístrate en MongoDB Atlas:**

   - Dirígete a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Inicia sesión o sigue el proceso de registro para crear una cuenta.

2. **Crea un Proyecto:**

   - Después de iniciar sesión, crea un nuevo proyecto en la opción "project" y luego "new project".
   - Dale un nombre a tu nuevo proyecto y dale siguiente hasta terminar la configuración

3. **Crea una implemetación:**

   - En el dashboard del proyecto, haz clic en "Create".
   - Crea un nombre de ususario y una contraseña.
   - Selecciona el entorno local.
   - Agrega tu dirección IP actual
   - Termina de configurar la implementación y presiona "Finish and close".

4. **Conexión:**

   - En el dashboard del proyecto, haz clic en "Connect" para conectar con el proyecto en Visual Studio Code.
   - Selecciona MongoDB for VS Code y sigue los pasos indicados.
   - Copia la cadena de conexión y luego ponla en la variable de entorno o archivo .env del backend como: 'MONGO_URL'.

## Backend

1. **Ingresa al directorio 'Backend'**

```bash
cd Backend
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno creando un archivo .env en el directorio backend y proporciona los valores necesarios que son:**
 
- PORT = ""
- MONGO_URL = ""
- JWT_SECRET= "Jaqamain3pals"

4. **Inicia la aplicación**

```bash
npx nodemon
```
