# Bienvenido al Proyecto de Seprise

La clínica de humanos que, por alguna razón inexplicable, tiene una temática de gatitos. Porque ¿quién no ama a los gatitos? 🐱✨

Este proyecto está dividido en dos partes: backend (nuestro pequeño motor que guarda todos los datos y lógica) y frontend (la cara bonita donde los usuarios interactúan).

Para poner en marcha este sistema, sigue los pasos a continuación. ¡Pronto tendrás a esta clínica humana de gatitos funcionando en tu máquina! Nya! 🐾

## Paso 1: Configura el Backend (FastAPI) 😺

### Instala las dependencias

Abre una terminal, navega hasta la carpeta `backend`, y corre el siguiente comando:

```bash
pip install -r requirements.txt
```

Esto instala todos los paquetes necesarios, desde FastAPI hasta el conector de MySQL. Sin estos ingredientes, nuestra API no funciona. Meow!

### Configura la base de datos

Crea un archivo `.env` en la carpeta `backend` con la siguiente información:

```plaintext
MYSQL_USER=tugato 
MYSQL_PASSWORD=tucontrasena
MYSQL_DB=clinica
MYSQL_HOST=localhost
MYSQL_PORT=3306
```

### Llena la base de datos con datos iniciales

Una vez configurada la base de datos, ejecuta el seeder para añadir datos iniciales:

```bash
python seed.py
```

### Inicia la aplicación

Corre este comando en la carpeta `backend`:

```bash
uvicorn main:app --reload
```

La API de FastAPI ahora estará en marcha en [http://localhost:8000](http://localhost:8000). ¡Los gatitos detrás de la pantalla están maullando de felicidad! Meow! 🐾

## Paso 2: Configura el Frontend (Vite + React) 🐈

### Instala las dependencias

En una nueva terminal, navega a la carpeta `frontend` y corre el siguiente comando:

```bash
npm install
```

### Levanta el servidor de desarrollo

Para ver el frontend en acción, ejecuta:

```bash
npm run dev
```

Esto pondrá el servidor de desarrollo en [http://localhost:5173](http://localhost:5173) (o el puerto que Vite elija). ¡Tendrás a la clínica humana gatuna lista para que los usuarios se registren y gestionen citas! Nya! 🐾

## Notas finales

- **Frontend**: Vite usa React y algunas bibliotecas geniales como React Hook Form y React Query.
- **Backend**: FastAPI, conectado a una base de datos MySQL usando SQLAlchemy y autenticación JWT.

¿Problemas? Si tu pantalla muestra errores, es posible que los gatitos hayan tropezado con algún cable. ¡Revisa las conexiones y vuelve a intentarlo! Meow! 🐾