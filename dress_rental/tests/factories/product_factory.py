import factory
from factory import Faker
from dress_rental.models import Product
from dress_rental.tests.factories.category_factory import CategoryFactory

class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    title = Faker('text', max_nb_chars=60)
    reference = Faker('text', max_nb_chars=20)
    category =  factory.SubFactory(CategoryFactory)