# Generated by Django 4.1.7 on 2023-06-15 19:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0002_rename_user_muser'),
        ('Field', '0014_remove_work_user_work_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='work',
            name='user',
        ),
        migrations.AddField(
            model_name='work',
            name='MUser',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='Auth.muser'),
        ),
    ]
