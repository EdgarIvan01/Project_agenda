# Agenda proyecto

Este proyecto es una aplicación web que utiliza un frontend basado en **Nginx** y un backend desarrollado con **Python Flask** que esta conectado a una Base de datos **Postgres**. Los tres componentes están dockerizados para facilitar su implementación y gestión.

## Estructura del proyecto

El proyecto se divide en Tres partes principales:

1. **Frontend**: Se sirve desde un contenedor Docker basado en la imagen `nginx:alpine`.
2. **Backend**: Se desarrolla en Python con Flask y se ejecuta en un contenedor Docker.
3. **Data base**: Se desarrrolla en un contenedor de Docker con una imagen postgres.

## Requisitos previos

- Docker instalado en su equipo.
- Docker Compose (opcional, pero recomendado para gestionar varios contenedores).

  ## Configuración del proyecto

### 1. Frontend (Nginx)

El frontend se crea utilizando la imagen `nginx:alpine`. Los archivos estáticos (HTML, CSS, JS) se sirven directamente desde Nginx.

- **Dockerfile** (para el frontend):
```Dockerfile
FROM nginx:alpine
COPY index.html script.js /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

La carpeta `frontend` contiene los archivos estáticos que se entregan al cliente.

### 2. Backend (Python Flask)

El backend se desarrolla en Python con el framework Flask. Se ejecuta en un contenedor Docker.

- **Dockerfile** (para el backend):
```Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"] 
```
- El archivo `app.py` contiene la lógica del servidor Flask.
- El archivo `requirements.txt` contiene las dependencias de Python necesarias.

### 3. Data Base (Postgres)

La base de datos se desarrolla con una imagen de Postgres con una tabla definida asi.

``` SQL
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL
);
```
### 4. Docker Compose

Para facilitar la gestión de ambos contenedores, puede usar Docker Compose. A continuación, se muestra un ejemplo de un archivo `docker-compose.yml`:

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=development
    networks:
      - todo-network

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - todo-network

  database:
    image: postgres:13
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=todo_db
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - todo-network

networks:
  todo-network:
    driver: bridge

volumes:
  db_data:
```

### Ejecución
1. Clona este repositorio en tu equipo local.

```cmd
git clone https://github.com/Edgarivan01/Project_agenda.git
cd Project_agenda
```
2. Crea y ejecuta los contenedores con Docker Compose:

```cmd
docker-compose up --build
```
3. Accede a la aplicación:
- Frontend: Abre tu navegador y visita `http://localhost`.
- Backend: Puedes acceder a la API en `http://localhost:5000`.
- Base de datos: Postgres está en el puerto `http://localhost:5432`.

## Estructura de carpetas

```txt
your-repository/
├── frontend/
│ ├── Dockerfile
│ ├── index.html
│ └── script.js
├── backend/
│ ├── Dockerfile
│ ├── app.py
│ └── requirements.txt
├── Database/
│ ├── init.sql
└── docker-compose.yml
```
