


echo "------------------------------------------------- BUILD START -------------------------------------------------"

python3.9 -m pip install psycopg2-binary
python3.9 -m pip install pymongo==3.12.3
python3.9 -m pip install djongo==1.3.2
python3.9 -m pip install -r requirements.txt
python3.9 manage.py collectstatic --noinput

echo "-------------------------------------------------- BUILD END --------------------------------------------------"


