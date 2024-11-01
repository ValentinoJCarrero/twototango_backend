# twototango_backend

## Instrucciones de Configuración

### Requisitos previos

* Node.js (versión 14 o superior)
* npm (versión 6 o superior)
* TypeORM (versión 0.3.20 o superior)
* PostgreSQL (versión 13 o superior)

### Instalación de dependencias

1. Clona el repositorio: `git clone https://github.com/tu-usuario/twototango_backend.git`
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
	* `PORT`: puerto en el que se ejecutará el servidor (por defecto, 8001)
	* `TYPEORM_HOST`: host de la base de datos PostgreSQL
	* `TYPEORM_PORT`: puerto de la base de datos PostgreSQL
	* `TYPEORM_USERNAME`: usuario de la base de datos PostgreSQL
	* `TYPEORM_PASSWORD`: contraseña de la base de datos PostgreSQL
	* `TYPEORM_DB_NAME`: nombre de la base de datos PostgreSQL
	* `JWT_SECRET`: secreto para la generación de tokens JWT

### Ejecución del proyecto

1. Ejecuta el comando `npm run build` para compilar el proyecto
2. Ejecuta el comando `npm run start` para iniciar el servidor

## Explicación Técnica

### Arquitectura del proyecto

El proyecto utiliza una arquitectura de microservicios, con un servidor principal que se encarga de la autenticación y la autorización, y otro microservicio que se encarga de las tareas.

### Tecnologías utilizadas

* Node.js como entorno de ejecución
* TypeScript como lenguaje de programación
* NestJS como framework para la creación de aplicaciones web
* TypeORM como ORM para la interacción con la base de datos PostgreSQL
* JWT como mecanismo de autenticación y autorización