#! /usr/bin/env bash


echo "------------------------------------------------- BUILD START -------------------------------------------------"

python3.9 -m pip install psycopg2-binary
python3.9 -m pip install pymongo==3.12.3
python3.9 -m pip install djongo --upgrade
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput --clear

echo "-------------------------------------------------- BUILD END --------------------------------------------------"


