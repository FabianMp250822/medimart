# Clínica de la Costa - Aplicación Web

Bienvenido al repositorio de la aplicación web de la **Clínica de la Costa**. Este proyecto es una aplicación moderna, completa y escalable desarrollada con Next.js y el ecosistema de Firebase, diseñada para ser el portal digital principal de la clínica, ofreciendo información, servicios y un portal interactivo para pacientes.

## ✨ Características Principales

- **Sitio Web Informativo Completo:** Múltiples secciones que detallan la misión, visión, historia, políticas y servicios de la clínica.
- **Directorio de Servicios Médicos:** Una sección exhaustiva y categorizada de todos los servicios médicos, con páginas de detalle para cada uno.
- **Perfiles de Especialistas:** Un directorio de médicos con buscador, filtros por especialidad y páginas de perfil detalladas para cada profesional, incluyendo su producción científica.
- **Blog de Noticias:** Un sistema de blog dinámico para publicar artículos, noticias y consejos de salud, con contador de visitas y sección de comentarios.
- **Portal de Pacientes Seguro:** Un área de acceso exclusivo para pacientes donde pueden registrarse, iniciar sesión y gestionar sus solicitudes de citas médicas.
- **Chat de Soporte con Agentes:** Un sistema de chat en tiempo real que conecta a los pacientes con agentes de soporte para coordinar y confirmar sus citas.
- **Asistente Virtual con IA (CostaBot):** Un chatbot inteligente integrado, desarrollado con **Genkit**, para responder preguntas frecuentes de los usuarios 24/7.
- **Bolsa de Empleo:** Una sección de "Trabaja con Nosotros" con listado de vacantes, filtros y un formulario de postulación completo.
- **Diseño Moderno y Responsivo:** Interfaz de usuario limpia, profesional y totalmente adaptable a dispositivos móviles, tabletas y computadoras de escritorio, construida con **ShadCN UI** y **Tailwind CSS**.

## 🚀 Stack Tecnológico

- **Framework Principal:** [Next.js](https://nextjs.org/) (con App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **UI y Estilos:**
    - [React](https://reactjs.org/)
    - [Tailwind CSS](https://tailwindcss.com/)
    - [ShadCN UI](https://ui.shadcn.com/) para componentes accesibles y reutilizables.
    - [Lucide React](https://lucide.dev/) para la iconografía.
- **Inteligencia Artificial:**
    - [Genkit](https://firebase.google.com/docs/genkit) para la creación de flujos de IA (chatbot).
- **Backend y Base de Datos:**
    - [Firebase](https://firebase.google.com/):
        - **Firestore:** Base de datos NoSQL para almacenar datos de médicos, noticias, ofertas de empleo, etc.
        - **Authentication:** Para la gestión de usuarios (pacientes).
        - **Storage:** Para el almacenamiento de imágenes y documentos.
- **Despliegue:** Preparado para [Firebase App Hosting](https://firebase.google.com/docs/app-hosting).

## 📂 Estructura del Proyecto

```
/
├── src/
│   ├── app/                # Rutas principales de la aplicación (App Router)
│   │   ├── (rutas)/        # Carpetas para cada sección: /servicios, /pacientes, etc.
│   │   ├── layout.tsx      # Layout principal de la aplicación
│   │   └── page.tsx        # Página de inicio
│   ├── components/         # Componentes React reutilizables
│   │   ├── ui/             # Componentes base de ShadCN UI
│   │   └── (otros)/        # Componentes específicos de la aplicación (header, footer, etc.)
│   ├── lib/                # Utilidades, configuraciones y constantes
│   │   ├── firebase.ts     # Configuración del cliente de Firebase
│   │   └── firebase-admin.ts # Configuración del SDK de Admin de Firebase (para SSR)
│   ├── ai/                 # Lógica relacionada con Inteligencia Artificial
│   │   ├── flows/          # Flujos de Genkit (ej. support-flow.ts)
│   │   └── genkit.ts       # Configuración principal de Genkit
│   ├── types/              # Definiciones de tipos de TypeScript
│   └── data/               # Datos estáticos (ej. doctores, geo-data)
├── public/                 # Archivos estáticos (imágenes, etc.)
├── next.config.ts          # Configuración de Next.js
└── tailwind.config.ts      # Configuración de Tailwind CSS
```

## ⚙️ Configuración y Variables de Entorno

Para ejecutar este proyecto localmente, necesitarás dos proyectos de Firebase: uno para la aplicación principal y otro para el portal de pacientes (nombrado internamente como "iMedic").

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables con las credenciales de tus proyectos de Firebase:

```env
# Credenciales del Proyecto Principal de Firebase (Web App)
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="..."

# Credenciales del SDK de Admin de Firebase (para renderizado en servidor)
FIREBASE_PROJECT_ID="..."
FIREBASE_CLIENT_EMAIL="..."
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Credenciales del Proyecto de Pacientes "iMedic" (Web App)
NEXT_PUBLIC_IMEDIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_IMEDIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_IMEDIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_IMEDIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_IMEDIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_IMEDIC_FIREBASE_APP_ID="..."

# API Key para Genkit / Google AI Studio
GEMINI_API_KEY="..."
```

## ▶️ Cómo Empezar

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd [NOMBRE_DEL_PROYECTO]
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar las variables de entorno:**
    Crea el archivo `.env` como se describe en la sección anterior.

4.  **Ejecutar el servidor de desarrollo:**
    La aplicación web principal y Genkit se ejecutan en procesos separados.

    *   **Para la aplicación Next.js (en una terminal):**
        ```bash
        npm run dev
        ```
        La aplicación estará disponible en `http://localhost:9002`.

    *   **Para el servidor de Genkit (en otra terminal):**
        ```bash
        npm run genkit:dev
        ```
        Esto inicia el servidor de Genkit y la UI de desarrollo para probar los flujos de IA.

¡Y listo! Ya puedes empezar a explorar y desarrollar la aplicación de la Clínica de la Costa.
```