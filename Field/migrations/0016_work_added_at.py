# Generated by Django 4.1.7 on 2023-06-17 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Field', '0015_remove_work_user_work_muser'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='added_at',
            field=models.CharField(default='₹ 0 /-', max_length=50, null=True),
        ),
    ]
