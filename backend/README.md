# pp2-clinica

## Para iniciar la Applicacion:

1. Install requirements

```bash
pip install -r requirements.txt
```

2. Configure database credentials in a new .env file

```bash
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_DB=clinica
MYSQL_HOST=localhost
MYSQL_PORT=3306
```

3. Run seeder

```bash
python seed.py
```

4. Run application

```bash
uvicorn main:app --reload
```
