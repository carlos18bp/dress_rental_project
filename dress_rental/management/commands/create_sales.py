from django.core.management.base import BaseCommand
from faker import Faker
import random
from datetime import datetime
from datetime import date, timedelta
from dress_rental.models import Customer, Product, Sale

class Command(BaseCommand):
    help = 'Create sale records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_sales', type=int, nargs='?', default=10)

    def handle(self, *args, **options):
        number_of_sales = options['number_of_sales']
        fake = Faker()
        customers = Customer.objects.all()
        products = Product.objects.all()

        limit_date_iteration = 90000
        limit_product_iteration = 90000

        for _ in range(number_of_sales):
            product = random.choice(products)
            while product.sales.filter(type='sale').exists():
                product = random.choice(products)
                if (limit_product_iteration := limit_product_iteration - 1) == 0:
                    return

            customer = random.choice(customers)
            price = fake.random_int(min=0, max=999)
            is_product_delivered = fake.boolean()
            type = random.choice(['rental', 'sale'])

            seed_delta = 10
            delivery_date, return_date = self._generate_dates(fake, seed_delta)
            if type == 'rental':
                while not self._check_create_sale(delivery_date, return_date):
                    seed_delta += 3
                    delivery_date, return_date = self._generate_dates(fake, seed_delta)
                    if (limit_date_iteration := limit_date_iteration - 1) == 0:
                        return
                    
            new_sale = Sale.objects.create(
                type = type,
                price = price,
                advance_payment = fake.random_int(min=0, max=price),
                advance_payment_date = fake.date_between(start_date=date.today(), end_date=date.today() + timedelta(days=20)),
                delivery_date = delivery_date,
                is_product_delivered = is_product_delivered,                
                return_date = return_date  if type == 'rental' else None,
                is_product_return = fake.boolean() if is_product_delivered else False,
                customer = customer
            )

            new_sale.products.add(product)

            self.stdout.write(self.style.SUCCESS(f'Sale "{new_sale}" created'))

        print(f'"{len(Sale.objects.all())}" sale records created')

    def _generate_dates(self, fake, seed_delta):
        delivery_date = fake.date_between(start_date=date.today(), end_date=date.today() + timedelta(days=seed_delta))
        return_date = fake.date_between(start_date=delivery_date, end_date=delivery_date + timedelta(days=seed_delta*2))
        return delivery_date, return_date

    def _check_create_sale(self, delivery_date, return_date):
        sales = Sale.objects.all()
        for sale in sales:
            if sale.type == 'rental':                
                if return_date < sale.delivery_date:
                    return False
                elif sale.return_date < delivery_date:
                    return False
            
        return True
