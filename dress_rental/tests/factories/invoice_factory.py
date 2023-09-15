import factory
from factory import Faker
from dress_rental.models import Invoice
from dress_rental.tests.factories.customer_factory import CustomerFactory

class InvoiceFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Invoice

    type = Faker('random_element', elements=[
                         choice[0] for choice in Invoice.OPTIONS])

    price = Faker('random_int', 
                  min=1000, 
                  max=9000)
    advance_payment = Faker('random_int', 
                            min=1000, 
                            max=9000)
    advance_payment_date = Faker('date_between', 
                                 start_date='-30d', 
                                 end_date='today')

    delivery_date = Faker('date_between', 
                          start_date='-30d', 
                          end_date='today')
    is_product_delivered = Faker('boolean')

    
    return_date = Faker('date_between', 
                        start_date='-30d', 
                        end_date='today')
    is_product_return = Faker('boolean')

    customer =  factory.SubFactory(CustomerFactory)