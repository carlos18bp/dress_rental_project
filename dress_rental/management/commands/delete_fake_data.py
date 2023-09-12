from django.core.management.base import BaseCommand
from django.core.management import call_command
from dress_rental.models import Category, Customer, Product, Invoice

class Command(BaseCommand):
    help = 'Create rake records in the database'

    def handle(self, *args, **options):
        Invoice.objects.all().delete()
        Customer.objects.all().delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        

