


echo " BUILD START"

python -m pip3 install -r requirements.txt
python manage.py collectstatic --noinput --clear

echo " BUILD END"


