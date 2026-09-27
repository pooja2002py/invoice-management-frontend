@echo off
cd /d %~dp0..\backend
python -m venv venv
call venv\Scripts\activate
python -m pip install -r requirements.txt
if not exist .env copy .env.example .env
python manage.py migrate
python manage.py seed_defaults
python manage.py createsuperuser
pause
