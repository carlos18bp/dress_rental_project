from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Create rake records in the database'

    def add_arguments(self, parser):
        parser.add_argument('number_of_records', type=int, nargs='?', default=16)

    def handle(self, *args, **options):
        number_of_records = options['number_of_records']
        call_command('create_categories')
        call_command('create_products', number_of_products=number_of_records*4)
        call_command('create_customers', number_of_customers=number_of_records)
        call_command('create_sales', number_of_sales=number_of_records)