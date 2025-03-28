![image](https://github.com/user-attachments/assets/0cb12ccf-e1fb-4511-809d-43714074776c)# Agenda proyecto

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

