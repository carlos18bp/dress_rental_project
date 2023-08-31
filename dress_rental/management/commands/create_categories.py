from django.core.management.base import BaseCommand, CommandError
from dress_rental.models import Category

class Command(BaseCommand):
    help = 'Create category records in the database'

    def handle(self, *args, **options):
        categories = [
            ('man', 'Hombre'),
            ('woman', 'Mujer'),
            ('boy', 'Niño'),
            ('girl', 'Niña'),
            ('girlfriend', 'Novias'),
            ('first_communion', 'Primera comunión'),
            ('quinceanera', '15 años'),
            ('accessories', 'Accesorios'),
        ]

        for option_value, option_label in categories:
            created = Category.objects.get_or_create(
                type = option_label,
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Category "{option_label}" created'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Category "{option_label}" already exists'))

        print(f'"{len(Category.objects.all())}" category records created')