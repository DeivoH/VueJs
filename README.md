
## ✨ Configuración del proyecto

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

# Instala las dependencias**

   1. Ejecuta el siguiente comando en la raíz del proyecto:

    npm install

   2. Inicia el servidor de desarrollo (Una vez instaladas las dependencias) ejecuta :

    npm run dev

    Esto levantará la aplicación localmente. Generalmente estará disponible en http://localhost:5173, aunque la terminal te indicará la URL exacta.

# Descripción del proyecto 

    Listado de posts generado desde un api publica con facilidad de visualizacion de los datos, contiene paginacion y facilidad de cambiar entre peticiones/reactividad de vue

# ⚙️ Decisiones técnicas

    - Pinia fue elegido como gestor de estado por su API simple, moderna y modular, facilitando la escalabilidad y mantenibilidad en proyectos de mediano y gran tamaño.

    - Se emplea TypeScript para mejorar la robustez del código mediante tipado.


# 🧠 Flujo de trabajo recomendado

    Esta plantilla sigue una estructura clara y organizada basada en buenas prácticas del ecosistema Vue 3:

    - **Páginas**: ubicadas en `src/pages`
    - **Composables** reutilizables en `src/composables`
    - **Stores** gestionadas con [Pinia](https://pinia.vuejs.org) en `src/stores`
    - **Interfaces y tipos** de TypeScript en `src/interfaces`
    - **Componentes reutilizables** en `src/components`

# 📁 Estructura del proyecto
    
    src/
    ├── assets/          # Archivos estáticos (imágenes, íconos, etc.)
    ├── composables/     # Lógica reutilizable (hooks personalizados)
    ├── interfaces/      # Definición de tipos e interfaces TypeScript
    ├── pages/           # Vistas del sistema organizadas por rutas
    ├── stores/          # Stores Pinia para la gestión del estado
    ├── router/          # Configuración de rutas
    ├── App.vue          # Componente raíz
    └── main.ts          # Punto de entrada de la aplicación

# 🧩 Modularización de componentes

    El proyecto está diseñado siguiendo una arquitectura modular y reutilizable. Algunos ejemplos:.

    Composables personalizados en src/composables para lógica reutilizable como validaciones, peticiones HTTP o manejo de formularios.

    Stores con Pinia, separados por contexto en src/stores

# ✅ Ejecución de Pruebas End-to-End (E2E) con Cypress
    Sigue estos pasos para ejecutar correctamente los tests automatizados utilizando Cypress:

    1. Instalar dependencias del proyecto
    2. Asegúrate de tener todas las dependencias instaladas. Si aún no lo has hecho, ejecuta en la raíz del proyecto:

    npm install

    3. Abrir la interfaz de Cypress: 
     - Ejecuta el siguiente comando en la raíz del proyecto para abrir el entorno gráfico de Cypress:
        npx cypress open
        
    - Esto abrirá la interfaz interactiva donde podrás seleccionar el tipo de pruebas a ejecutar.

    4. Seleccionar tipo de prueba E2E
    
    5. En la interfaz de Cypress, selecciona la opción E2E Testing para trabajar con pruebas de extremo a extremo (End-to-End).

    6. Elegir el navegador y test a ejecutar

        - Cypress te permitirá elegir el navegador donde se ejecutarán los tests (puedes usar Chrome, Edge, Electron, etc.).

    7. Selecciona el archivo de prueba correspondiente, por ejemplo: posts.cy

    8. Visualizar la ejecución

    - Cypress abrirá una ventana del navegador donde podrás ver paso a paso cómo se ejecutan los tests, incluyendo las interacciones con la interfaz, las peticiones a la API,    los resultados esperados, y posibles errores.

# 🧠 Ventajas de Cypress

    Permite ver en tiempo real la ejecución de los tests.

    Facilita la depuración de errores gracias a herramientas como el panel de comandos y el visor de solicitudes.



# 🚀 Posibles mejoras futuras

    Loading global automático: Implementar un sistema centralizado de carga para mostrar un loader general sin necesidad de configurarlo manualmente en cada petición. Se debe considerar una UX amigable para evitar bloquear completamente la pantalla durante procesos   largos.

    Registro de los errores para debugging.

# 📦 Dependencias principales
    - Vue 3
    - Vite
    - Pinia
    - Vue Router
    - TypeScript
    - Vuexy (estilos base y componentes)


# 🚀 Plantilla Básica Vuexy con Vue 3 + Vite

Este proyecto es una plantilla base construida con [Vuexy](https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/landing/) sobre Vue 3 y Vite. Está diseñada para ser escalable, modular y fácil de mantener, ideal como punto de partida para proyectos modernos con Vue.

## 💻 Requisitos del entorno

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión recomendada: **18+**)
- [Visual Studio Code](https://code.visualstudio.com/) con la extensión [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)  
  > ⚠️ Asegúrate de **desactivar Vetur** si lo tienes habilitado, ya que puede causar conflictos con Volar.

