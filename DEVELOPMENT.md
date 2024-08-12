# Template api nodejs mongodb

## Versiones de herramientas utilizadas:
- ***git: 2.25.1***
- ***npm: 10.8.1***
- ***node: v20.16.0***

## Temas

***
### Organizacion 
- `project/app`
    - Aplicacion local
- `project/app_docker`
    - Aplicacion encapsulada con Docker

Script para automatizar todo el proceso de lanzamiento de servicios Docker-Compose: 
- `project/app.sh`
    - Para el lanzamiento de  servicios en:
        - `app_docker`

Archivo `.dockerignore` para ignorar archivos y directorios, ya que el directorio de contexto para la construccion de imagenes es `project/`. 

***
### Nombre de la plantilla
El nombre de la plantilla se encuentra en los siguientes archivos (por si se desea modificar el nombre):
- `project/app.sh`
- `project/app_docker/docker-compose.yaml`

***
### `project/app`
### ***Babel***
Es un compilador de JavaScript. Es una herramienta popular que nos ayuda a utilizar las funciones más actuales del lenguaje de programación JavaScript.

Node.js por su cuenta no va a poder realizar declaraciones de importación y exportación ES6 junto con otras características interesantes de la sintaxis de ES6 sin usar un compilador como Babel.

Dependencias necesarias (desarrollo):
- `@babel/cli`
- `@babel/core`
- `@babel/node`
- `@babel/preset-env`

Archivo de configuracion inicial de Babel (.babelrc):
```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

A continuacion se mostraran algunos comandos suponiendo una estructura de carpetas como la siguiente:
- `app`
    - `src` (aqui se tiene todo el codigo de la aplicacion)
    - `<otros archivos>`

Para ejecutar la aplicacion se debe transpilar el codigo primero antes de ejecutarlo con Node:
- Con Nodemon
    - `nodemon --exec babel-node ./src/index.js`
- Sin Nodemon
    - `babel-node ./src/index.js`

Transpilar codigo y despues usar node:
- `babel ./src -d ./dist`
- `node ./dist/index.js`

### ***NPM***
#### Generar archivo package.json:
- `npm init -y`

El archivo describe todas las dependencias del proyecto.

#### Instalar dependencias especificadas en el archivo package.json:
- Con Yarn
    - `yarn`
- Con NPM
    - `npm install`

Por lo general se requiere ejecutar el siguiente comando:
- `npm audit fix --force`

El comando `npm audit` muestra una descripción de las dependencias instaladas, si se encuentran vulnerabilidades, se calculará el impacto al proyecto.

El comando `npm audit fix` proporciona una actualización de los paquetes.

Como especificar un paquete en `package.json`:
- Cualquier version mayor o igual a `<version>` 
    - `"package": "^<version>"`
- Version exacta:
    - `"package": "<version>"`

Tanto Yarn como NPM son herramientas de administración de paquetes en Node.js.

***Diferencias:***
NPM instala los paquetes de forma secuencial, Yarn realiza una instalación paralela, lo que da como resultado una mejor velocidad y rendimiento.

#### Instalar dependencias:
- Global y de desarrollo:
    - `npm install -g -D <package_name>`
- Local y de produccion:
    - `npm install <package_name>`

***Dependencia global:***
Se puede hacer uso de la funcionalidad del paquete desde cualquier directorio de nuestro ordenador.

***Dependencia local:***
Sólo podremos utilizarlo en el directorio donde se ha instalado.

#### Desinstalar dependencias:
- Todas 
    - `rm -rf node_modules && rm package-lock.json && npm cache clean --force`
- Dependencia global y de desarrollo (tambien lo elimina del package.json)
    - `npm uninstall -g -D <package_name> --save`
- Dependencia local y de produccion (tambien lo elimina del package.json)
    - `npm uninstall <package_name> --save`

#### Listar dependencias:
- Dependencias locales y de produccion
    - `npm list --prod --all`
- Dependencias globales
    - `npm list -g`

#### Ejecutar scripts definidos en package.json:
- `npm run <script>`

### ***Node*** 
Node.js es un entorno JavaScript altamente escalable y basado en eventos.

Actualizar Node utilizando NPM:
- `sudo npm install -g n`
- `sudo n lts`

Eliminar versiones instaladas previamente:
- `sudo n prune`

### ***Render***
Render es una plataforma en la nube totalmente administrada donde puedes alojar sitios estáticos, API de backend, bases de datos, etc., todo en un solo lugar.

Pasos para alojar la aplicacion en Render:
1. Crear cuenta en [Render](https://dashboard.render.com/)
2. Crear servicio web
3. Ir a la opcion de repositorio git publico y colocar la URL del repositorio
4. Colocar las siguientes configuraciones:
    - Language: **Node**
    - Branch: **master**
    - Root directory: `project/app/`
    - Build command: `npm install`
    - Start command: `npm run start`
5. Al final se tendra la api desplegada en la nube

### ***Variables de entorno***
En esta carpeta debe existir un archivo `.env` con la siguiente estructura:
```
MODE=DEVELOPMENT # DEVELOPMENT, PRODUCTION
PORT=4000
JWT_SECRET=jwt_secret
ROLE_SECRET=role_secret
USERNAME_DB=username_db
PASSWORD_DB=password_db
DB_NAME=db_name
USER_COLLECTION_NAME=user_collection_name
CLUSTER_STRING=cluster_string
DB_HOST=db_host 
DB_PORT=db_port
```
> Se puede cambiar el valor de cada variable si asi se desea.
> La variable `CLUSTER_STRING` se usa para una conexion en la nube con la base de datos.
> Las variables `DB_HOST` y `DB_PORT` se usan para una conexion en local con la base de datos.

***
### `project/app_docker`
### ***Archivo de dependencias de la aplicacion***
El archivo de dependencias es `package.json`. Este es el archivo necesario para crear todas las dependencias de una aplicacion de Nodejs.

El puerto del servicio que se mapea en el archivo `docker-compose.yaml` debe ser el mismo que `PORT` del archivo `.env`.































