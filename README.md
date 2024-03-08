# Empleados-Angular
Este proyecto es una prueba técnica para la gestión de empleados utilizando Angular.

## Instalación
Antes de ejecutar el proyecto, asegúrate de tener Node.js y npm instalados en tu sistema. Luego, puedes seguir estos pasos:

### Instala json-server globalmente ejecutando el siguiente comando en tu terminal
npm install -g json-server

### Instala las dependencias del proyecto ejecutando el siguiente comando en la raíz del proyecto
npm install

### Ejecución
Puedes ejecutar el proyecto de la siguiente manera:

### Inicia el servidor JSON ejecutando el siguiente comando en la raíz del proyecto
json-server --watch src/assets/db.json
Esto iniciará el servidor JSON y servirá los datos de empleados desde el archivo db.json.

### Inicia la aplicación Angular ejecutando el siguiente comando en la raíz del proyecto:
ionic serve
Esto iniciará la aplicación Angular y la abrirá en tu navegador web predeterminado.

### Uso
La aplicación te permitirá gestionar una lista de empleados, incluyendo la capacidad de registrar nuevos empleados, editar información existente, cambiar el estado de un empleado (activo/inactivo) y eliminar empleados.
