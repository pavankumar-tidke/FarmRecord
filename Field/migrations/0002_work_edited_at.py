# Generated by Django 4.1.7 on 2023-06-23 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Field', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='edited_at',
            field=models.CharField(default='-', max_length=50, null=True),
        ),
    ]
