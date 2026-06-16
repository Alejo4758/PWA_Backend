# 🧩 Tempo Deluxe — Backend

Backend API REST para la aplicación Tempo Deluxe, desarrollada como proyecto principal de la materia **Programación Web Avanzada** en la **Universidad Nacional del Comahue**. El servidor provee una API completa para gestionar un catálogo de relojes de lujo, conectada a una base de datos PostgreSQL mediante Prisma ORM.


## 👥 Integrantes

| Nombre | Rol |
|--------|-----|
| Alejo Lopez | Project Manager |
| Facundo Ledesma | Developer |
| Benjamín de la Fuente | Developer |


## 🔗 Links

- 🖥️ [Repositorio del Frontend](<https://github.com/FacuLedesmaBertalot/PWA_Frontend.git>)
- 📋 [Tablero Kanban](<https://github.com/users/Alejo4758/projects/3>)
- 🚀 [Deploy del Backend](<https://pwa-backend-two.vercel.app/>)
- 🌐 [Deploy del Frontend](<https://pwa-frontend-one.vercel.app/>)


## 📖 Descripción de la aplicación

Tempo Deluxe es una aplicación web de catálogo de relojes de lujo. Permite explorar, buscar y gestionar una colección de relojes de las marcas más reconocidas del mundo. Los usuarios pueden ver el detalle de cada pieza y agregarla a favoritos. El catálogo completo puede gestionarse mediante operaciones CRUD a través de la API.

## ⌚ Entidad principal — Reloj

La entidad principal del proyecto es `Reloj`, que representa una pieza del catálogo.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int | Identificador único autoincremental |
| `nombre` | String | Nombre del reloj |
| `marca` | String | Marca del reloj (Rolex, Omega, etc.) |
| `precio` | Float | Precio en dólares |
| `materiales` | String[] | Lista de materiales del reloj |
| `imagen` | String | URL de la imagen del reloj |
| `resistencia_agua` | String | Nivel de resistencia al agua |
| `categoria` | String | Categoría (Casual, Deportivo, Clásico, Moderno, Lujo) |
| `stock` | Int | Cantidad disponible |
| `destacado` | Boolean | Indica si el reloj está destacado |
| `detalles_breve` | String | Descripción corta del reloj |
| `detalles` | String | Descripción completa del reloj |
| `createdAt` | DateTime | Fecha de creación del registro |
| `updatedAt` | DateTime | Fecha de última actualización |


## ⚙️ Instalación y ejecución local

### Requisitos previos

- Node.js v18 o superior
- npm
- PostgreSQL (o acceso a una base de datos en Neon)

### Pasos

**1 — Clonar el repositorio**
```bash
git clone https://github.com/Alejo4758/PWA_Backend.git
cd PWA_Backend
```

**2 — Instalar dependencias**
```bash
npm install
```

**3 — Configurar las variables de entorno**

Copiar el archivo de ejemplo y completar los valores:
```bash
cp .env.example .env
```

**4 — Ejecutar las migraciones**
```bash
npx prisma migrate dev
```

**5 — Ejecutar el seed**
```bash
npx prisma db seed
```

**6 — Levantar el servidor**
```bash
npm run dev
```

El servidor quedará corriendo en `http://localhost:3000`.


## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DATABASE_URL=        # Connection string de PostgreSQL (Neon u otro proveedor)
PORT=3000            # Puerto en el que corre el servidor
FRONTEND_URL=        # URL del frontend (para configurar CORS)
```

> ⚠️ No subir el archivo `.env` al repositorio. Las credenciales se comparten por mensajería privada.


## 🗄️ Migraciones

Para crear y aplicar las migraciones de Prisma:

```bash
npx prisma migrate dev
```

Para regenerar el cliente de Prisma:

```bash
npx prisma generate
```


## 🌱 Seed

Para cargar los datos iniciales en la base de datos:

```bash
npx prisma db seed
```

Esto crea 32 registros de relojes de distintas marcas (Rolex, Omega, Longines, Cartier, Seiko, entre otras) con todos sus campos completos.


## 📡 Endpoints de la API


### Relojes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/items` | Obtener todos los relojes |
| GET | `/api/items/:id` | Obtener un reloj por ID |
| POST | `/api/items` | Crear un nuevo reloj |
| PUT | `/api/items/:id` | Actualizar un reloj existente |
| DELETE | `/api/items/:id` | Eliminar un reloj |

### Códigos HTTP

| Situación | Código |
|-----------|--------|
| GET / PUT exitoso | 200 |
| POST exitoso | 201 |
| DELETE exitoso | 204 |
| Body inválido | 400 |
| Recurso no encontrado | 404 |
| Error del servidor | 500 |

### ✨ Ejemplo — Crear un reloj

**Request:**
```
POST /api/items
Content-Type: application/json
```
```json
{
  "nombre": "Submariner Date",
  "marca": "Rolex",
  "precio": 10500.50,
  "materiales": ["Acero Oystersteel", "Cerámica"],
  "imagen": "https://ejemplo.com/submariner.jpg",
  "resistencia_agua": "Resistente 10ATM",
  "categoria": "Deportivo",
  "stock": 3,
  "destacado": true,
  "detalles_breve": "El reloj de buceo más icónico del mundo.",
  "detalles": "El Submariner es el referente de los relojes de buceo desde 1953. Con resistencia al agua de 300 metros y bisel giratorio unidireccional en cerámica negra."
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 33,
  "nombre": "Submariner Date",
  "marca": "Rolex",
  "precio": 10500.50,
  "materiales": ["Acero Oystersteel", "Cerámica"],
  "imagen": "https://ejemplo.com/submariner.jpg",
  "resistencia_agua": "Resistente 10ATM",
  "categoria": "Deportivo",
  "stock": 3,
  "destacado": true,
  "detalles_breve": "El reloj de buceo más icónico del mundo.",
  "detalles": "El Submariner es el referente de los relojes de buceo desde 1953. Con resistencia al agua de 300 metros y bisel giratorio unidireccional en cerámica negra.",
  "createdAt": "2026-06-09T12:00:00.000Z",
  "updatedAt": "2026-06-09T12:00:00.000Z"
}
```

### Ejemplo — Body inválido (400)

```json
{
  "error": "Datos inválidos",
  "details": [
    {
      "field": "nombre",
      "message": "El campo nombre es obligatorio"
    },
    {
      "field": "precio",
      "message": "El campo precio debe ser de tipo number"
    }
  ]
}
```

### Ejemplo — Recurso no encontrado (404)

```json
{
  "error": "Reloj no encontrado"
}
```

---

## 📂 Estructura del proyecto

```
PWA_Backend/
│
├── src/
│   ├── index.js                        # Punto de entrada y configuración de Express
│   ├── controllers/
│   │   └── RelojController.js          # Lógica de cada endpoint
│   ├── services/
│   │   └── RelojService.js             # Interacción con Prisma
│   ├── routes/
│   │   └── relojes.js                  # Definición de rutas
│   ├── validations/
│   │   ├── index.js                    # Orquestador de validaciones
│   │   ├── schemas.js                  # Esquemas por modelo
│   │   ├── validators.js               # Funciones helper de validación
│   │   └── constants.js                # Enums y valores permitidos
│   └── middlewares/
│       └── errorHandler.js             # Middleware global de errores
│
├── prisma/
│   ├── prismaClient.js                 # Instancia única de PrismaClient
│   ├── schema.prisma                   # Modelo de datos
│   ├── seed.js                         # Datos iniciales
│   └── migrations/                     # Migraciones generadas por Prisma
│
├── .env.example                        # Variables de entorno de ejemplo
├── .gitignore
├── vercel.json                         # Configuración de deploy en Vercel
├── package.json
└── README.md
```
