from django.core.management.base import BaseCommand
from django.core.management import call_command
from faker import Faker
import random
import json
from datetime import date, timedelta
from dress_rental.models import Category, Product

class Command(BaseCommand):
    help = 'Create product records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_products', type=int, nargs='?', default=30)

    def handle(self, *args, **options):
        number_of_products = options['number_of_products']
        fake = Faker()
        call_command('create_categories')
        categories = Category.objects.all()

        for _ in range(number_of_products):
            category = random.choice(categories)
            measures = {
                'busto': fake.random_int(min=10, max=100),
                'cintura': fake.random_int(min=10, max=100),
                'cadera': fake.random_int(min=10, max=100),
                'primer_corte': fake.random_int(min=10, max=100),
                'segundo_corte': fake.random_int(min=10, max=100),
                'largo_falda': fake.random_int(min=10, max=100),
                'largo_manga': fake.random_int(min=10, max=100),
                'espalda': fake.random_int(min=10, max=100),
                'cisa': fake.random_int(min=10, max=100),
                'largo_pantalón': fake.random_int(min=10, max=100),
                'contorno_brazo': fake.random_int(min=10, max=100),
                'puno': fake.random_int(min=10, max=100),
                'talla_pantalon': fake.random_int(min=10, max=100),
                'talla_camisa': fake.random_int(min=10, max=100),
                'edad': fake.random_int(min=10, max=100),
                'estatura': fake.random_int(min=10, max=100),
                'fecha_prueba': fake.date_between(start_date=date.today(), end_date=date.today() + timedelta(days=60)),
                'disenador': fake.text(max_nb_chars=15),
                'observaciones': fake.text(max_nb_chars=15),
                'referencia': fake.random_int(min=10, max=100),
                'vestido_largo': fake.boolean(),
                'vestido_corto': fake.boolean(),
                'importado': fake.boolean(),
                'fabricado': fake.boolean(),
            }

            new_product = Product.objects.create(
                title = fake.word(),
                reference='P-'+ str(fake.random_int(min=100, max=999)),
                category = category,
                measures = json.dumps(measures, default=str)
            )

            self.stdout.write(self.style.SUCCESS(f'Product "{new_product}" created'))
        
        print(f'"{len(Product.objects.all())}" product records created')
