from django.core.management.base import BaseCommand
from faker import Faker
from dress_rental.models import Customer

class Command(BaseCommand):
    help = 'Create customer records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_customers', type=int, nargs='?', default=10)

    def handle(self, *args, **options):
        number_of_customers = options['number_of_customers']
        fake = Faker()  

        for _ in range(number_of_customers):
            new_customer = Customer.objects.create(
                identification = fake.random_int(min=1000000000, max=1030000000),
                first_name = fake.first_name(),
                last_name = fake.last_name(),
                email = fake.email(),
                contact = fake.random_int(min=3000000000, max=3030000000),
                second_contact = fake.random_int(min=3000000000, max=3030000000),
                address = fake.street_address(),
            )

            self.stdout.write(self.style.SUCCESS(f'Customer "{new_customer}" created'))
        
        print(f'"{len(Customer.objects.all())}" customer records created')