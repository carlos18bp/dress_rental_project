from django.core.management.base import BaseCommand
from faker import Faker
import random
from datetime import date, timedelta
from dress_rental.models import Customer, Product, Invoice

class Command(BaseCommand):
    help = 'Create invoice records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_invoices', type=int, nargs='?', default=10)

    def handle(self, *args, **options):
        number_of_invoices = options['number_of_invoices']
        fake = Faker()
        customers = Customer.objects.all()
        products = Product.objects.all()

        for _ in range(number_of_invoices):
            product = random.choice(products)
            while product.invoices.filter(type='sale').exists():
                product = random.choice(products)

            customer = random.choice(customers)
            price = fake.random_int(min=0, max=999)
            is_product_delivered = fake.boolean()
            type = random.choice(['rental', 'sale'])

            invoices = Product.objects.get(pk = product.id).invoices.all()
            last_invoice = invoices.last()
            if last_invoice is not None:                
                delivery_date, return_date = self._generate_dates(fake, last_invoice.return_date)
                               
                while not self._check_create_invoice(delivery_date, return_date, last_invoice):
                    delivery_date, return_date = self._generate_dates(fake, last_invoice.return_date)
            else:
              delivery_date, return_date = self._generate_dates(fake, date.today())  
                    
            new_invoice = Invoice.objects.create(
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

            new_invoice.products.add(product)

            self.stdout.write(self.style.SUCCESS(f'Invoice "{new_invoice}" created'))

        print(f'"{len(Invoice.objects.all())}" invoice records created')

    def _generate_dates(self, fake, return_date_last_invoice):
        seed_delta = fake.random_int(min=2, max=6)
        delivery_date = fake.date_between(start_date = return_date_last_invoice + timedelta(days=1), 
                                          end_date = return_date_last_invoice + timedelta(days=seed_delta))
        return_date = fake.date_between(start_date = delivery_date + timedelta(days=1), 
                                        end_date = delivery_date + timedelta(days=seed_delta))
        return delivery_date, return_date

    def _check_create_invoice(self, delivery_date, return_date, invoice):        
        if invoice.type == 'rental':                
            if return_date < invoice.delivery_date:
                return True
            elif invoice.return_date < delivery_date:
                return True
            
        return False
