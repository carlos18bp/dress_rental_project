import factory
from factory import Faker
from dress_rental.models import Customer

class CustomerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Customer

    identification  = Faker('random_int', 
                            min=1000000000, 
                            max=1030000000)
    first_name = Faker('first_name')
    last_name = Faker('last_name')
    email = Faker('email')
    contact = Faker('phone_number')
    second_contact = Faker('phone_number')
    address = Faker('address')