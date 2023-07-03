"""
Django settings for FarmRecord project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

import os, dotenv
from pathlib import Path


# Load environment variables from .env file
dotenv.load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-&n0_tu2n8-fcu0b*nfn^34#c50_!*+qrb_iqp$37+kttvj43*='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*', '.vercel.app', '.netlify.app', '.now.sh', '.ngrok.io', '0.tcp.in.ngrok.io', '192.168.1.7', '100.73.211.179']


CORS_ORIGIN_ALLOW_ALL = True

    # 'http://localhost:3000',  
CORS_ORIGIN_WHITELIST = [
    'https://farmrecord.vercel.app'
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders', 
    'Field',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'FarmRecord.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'FarmRecord.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': 'FarmRecord',
    #     'USER': 'postgres',
    #     'PASSWORD': 'pgadmin',
    #     'HOST': 'localhost',   
    # },
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': 'FarmRecord',
    #     'USER': 'postgres',
    #     'PASSWORD': 'pgadmin',
    #     'HOST': '0.tcp.in.ngrok.io',
    #     'PORT': os.environ.get('NGROK_DB_PORT'),
    # }, 
    
    # mongodb
    # 'default': {
    #     'ENGINE': 'djongo',
    #     'NAME': 'FarmRecord',
    #     'CLIENT': {
    #         'host': 'localhost',
    #         'port': 27017,
    #     } 
    # }
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'FarmRecord',
        # 'ENFORCE_SCHEMA': False,
        'CLIENT': {
            'host': 'mongodb+srv://pavankumartidke12345:Xs1yO4z24cLXhc6P@farmcluster.3vh3nss.mongodb.net/'
        }  
    }
}

# mongodb
# pavankumartidke12345
# Xs1yO4z24cLXhc6P

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

STATICFILES_DIRS =  [
    os.path.join(BASE_DIR, 'static')
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles_build', 'static')

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

MEDIA_URL = '/upload/'
MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'upload')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SESSION_COOKIE_AGE = 120000


