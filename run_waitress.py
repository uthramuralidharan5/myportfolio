import os
from waitress import serve
from django.core.wsgi import get_wsgi_application

# Set the environment variable for the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myportfolio.settings')

# Get the WSGI application
application = get_wsgi_application()

# Run the application with Waitress
if __name__ == '__main__':
    serve(application, listen='127.0.0.1:8000')
