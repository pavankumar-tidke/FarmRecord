# Generated by Django 4.1.9 on 2023-07-08 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Field', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProdWork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prod_id', models.CharField(blank=True, max_length=20)),
                ('crop_name', models.CharField(blank=True, default='default_work_desc_<django.db.models.fields.CharField>', max_length=100)),
                ('crop_desc', models.CharField(blank=True, default='default_work_desc_<django.db.models.fields.CharField>', max_length=200)),
                ('sell_location', models.CharField(blank=True, default='default_work_location_<django.db.models.fields.CharField>', max_length=100)),
                ('crop_amount', models.CharField(blank=True, default='0', max_length=50)),
                ('crop_weight', models.CharField(blank=True, default='0', max_length=50)),
                ('added_at', models.CharField(blank=True, default='-', max_length=50)),
                ('edited_at', models.CharField(blank=True, default='-', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]