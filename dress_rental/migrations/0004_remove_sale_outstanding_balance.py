# Generated by Django 4.2.4 on 2023-08-22 02:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dress_rental', '0003_alter_sale_customer_alter_sale_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sale',
            name='outstanding_balance',
        ),
    ]