import random
from factory import Faker
from django.test import TestCase
from dress_rental.models import Customer
from dress_rental.tests.factories.customer_factory import CustomerFactory

class CustomerTestCase(TestCase):
    def test_customer_creator(self):
        # Test valid customer instance
        # And correct creation of record customer
        customer = CustomerFactory()
        self.assertIsInstance(customer, Customer)
        self.assertCountEqual(Customer.objects.all(), [customer])

    def test_fields(self):
        # Test valid fields
        valid_data = self._valid_fields()

        customer = Customer.objects.create(**valid_data)

        self.assertEqual(customer.identification, valid_data['identification'])
        self.assertEqual(customer.first_name, valid_data['first_name'])
        self.assertEqual(customer.last_name, valid_data['last_name'])
        self.assertEqual(customer.email, valid_data['email'])
        self.assertEqual(customer.contact, valid_data['contact'])
        self.assertEqual(customer.second_contact, valid_data['second_contact'])
        self.assertEqual(customer.address, valid_data['address'])
    
    def test_raises(self):
        # Test for invalid values in changes
        valid_data = self._valid_fields()

        with self.assertRaises(TypeError):
            valid_data['identification'] = Faker('text')
            Customer.objects.create(**valid_data)

        with self.assertRaises(TypeError):
            valid_data['email'] = Faker('text')
            Customer.objects.create(**valid_data)
            
    def _valid_fields(self):
        identification  = random.randint(1, 100)
        first_name = Faker('first_name')
        last_name = Faker('last_name')
        email = Faker('email')
        contact = Faker('phone_number')
        second_contact = Faker('phone_number')
        address = Faker('address')

        return {
            'identification': identification,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'contact': contact,
            'second_contact': second_contact,
            'address': address,
        }

    