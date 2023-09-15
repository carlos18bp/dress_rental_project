import factory
from dress_rental.models import Category

class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    type = factory.Faker('random_element', elements=[
                         choice[0] for choice in Category.OPTION_TYPE])
