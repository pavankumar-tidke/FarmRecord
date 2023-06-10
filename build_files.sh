#!/usr/bin/env bash



echo " BUILD START"

python3 -m pip install -r requirments.txt
python3 manage.py collectstatic --noinput --clear

echo " BUILD END"


