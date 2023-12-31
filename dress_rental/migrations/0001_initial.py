# Generated by Django 4.2.4 on 2023-09-12 21:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('man', 'Hombre'), ('woman', 'Mujer'), ('boy', 'Niño'), ('girl', 'Niña'), ('girlfriend', 'Novias'), ('first_communion', 'Primera comunion'), ('quinceanera', '15 años'), ('accessories', 'Accesorios')], max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identification', models.IntegerField()),
                ('first_name', models.CharField(max_length=40)),
                ('last_name', models.CharField(max_length=40)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('contact', models.CharField(max_length=40)),
                ('second_contact', models.CharField(blank=True, max_length=40, null=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=40)),
                ('reference', models.CharField(max_length=40)),
                ('measures', models.JSONField(blank=True, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='dress_rental.category')),
            ],
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('rental', 'Alquiler'), ('sale', 'Venta')], max_length=30)),
                ('price', models.IntegerField()),
                ('advance_payment', models.IntegerField()),
                ('advance_payment_date', models.DateField()),
                ('delivery_date', models.DateField()),
                ('is_product_delivered', models.BooleanField(default=False)),
                ('return_date', models.DateField(blank=True, null=True)),
                ('is_product_return', models.BooleanField(default=False)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='invoices', to='dress_rental.customer')),
                ('products', models.ManyToManyField(related_name='invoices', to='dress_rental.product')),
            ],
        ),
    ]
