import json
from faker import Faker
from django.urls import reverse
from django.test import TestCase
from dress_rental.models import Customer
from dress_rental.tests.factories.customer_factory import CustomerFactory
from dress_rental.serializers.customer_serializer import customers_serializer

class TestListView(TestCase):
    def test_list_customers(self):
        # Test correct status
        # And correct serialized data
        [CustomerFactory.create() for _ in range(2)]

        url = reverse('list_customers')
        response = self.client.get(url)        

        json_response = json.loads(response.content)
        expected_data = customers_serializer(Customer.objects.all().order_by('-id'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json_response, expected_data)

    def test_create_customer(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('create_customer')
        response = self.client.post(url, data=json_data, content_type='application/json')

        self.assertEqual(response.status_code, 200)  
        self.assertTrue(Customer.objects.filter(identification=new_data['identification']).exists())
        self.assertTrue(Customer.objects.filter(first_name=new_data['firstName']).exists())
        self.assertTrue(Customer.objects.filter(last_name=new_data['lastName']).exists())
        self.assertTrue(Customer.objects.filter(email=new_data['email']).exists())
        self.assertTrue(Customer.objects.filter(contact=new_data['contact']).exists())
        self.assertTrue(Customer.objects.filter(second_contact=new_data['secondContact']).exists())
        self.assertTrue(Customer.objects.filter(address=new_data['address']).exists())

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response_data['message'], 'Record created successfully')

    def test_create_method_not_allow(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('create_customer')
        response = self.client.put(url, data=json_data, content_type='application/json')

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def test_create_invalid_data(self):
        new_data = self._valid_fields()
        new_data['identification'] = 'Invalid data'   
        json_data = json.dumps(new_data)
        url = reverse('create_customer')
        with self.assertRaises(AssertionError):
            response = self.client.post(url, data=json_data, content_type='application/json')

            response_data = json.loads(response.content.decode('utf-8'))
            
            self.assertEqual(response.status_code, 500)
            self.assertEqual(response_data['error'], 'method not allowed')

    def test_edit_customer(self):
        customer = CustomerFactory.create()
        new_data = self._valid_fields()
        new_data['id'] = customer.id
        json_data = json.dumps(new_data)
        url = reverse('edit_customer')
        response = self.client.put(url, data=json_data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        customer.refresh_from_db()
        self.assertEqual(customer.identification, new_data['identification'])
        self.assertEqual(customer.first_name, new_data['firstName'])
        self.assertEqual(customer.last_name, new_data['lastName'])
        self.assertEqual(customer.email, new_data['email'])
        self.assertEqual(customer.contact, new_data['contact'])
        self.assertEqual(customer.second_contact, new_data['secondContact'])
        self.assertEqual(customer.address, new_data['address'])

        response_data = json.loads(response.content.decode('utf-8'))
        
        self.assertEqual(response_data['message'], 'Record edited successfully')

    def test_edit_method_not_allow(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('edit_customer')
        response = self.client.post(url, data=json_data, content_type='application/json')

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def test_edit_invalid_data(self):
        new_data = self._valid_fields()
        new_data['identification'] = 'Invalid data'   
        json_data = json.dumps(new_data)
        url = reverse('edit_customer')
        with self.assertRaises(AssertionError):
            response = self.client.post(url, data=json_data, content_type='application/json')

            response_data = json.loads(response.content.decode('utf-8'))
            
            self.assertEqual(response.status_code, 500)
            self.assertEqual(response_data['error'], 'method not allowed')

    def test_delete_customer(self):
        customer = CustomerFactory.create()
        url = reverse('delete_customer', args=[customer.id])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, 200) 
        self.assertFalse(Customer.objects.filter(pk = customer.id).exists())

    def test_delete_method_not_allow(self):
        customer = CustomerFactory.create()
        url = reverse('delete_customer', args=[customer.id])
        response = self.client.post(url)

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def _valid_fields(self):
        fake = Faker()
        identification  = fake.random_int(min=1000000000, max=1030000000)
        first_name =  fake.first_name()
        last_name = fake.last_name()
        email = fake.email()
        contact = str(fake.random_int(min=3000000000, max=3030000000))
        second_contact = str(fake.random_int(min=3000000000, max=3030000000))
        address = fake.street_address()

        return {
            'identification': identification,
            'firstName': first_name,
            'lastName': last_name,
            'email': email,
            'contact': contact,
            'secondContact': second_contact,
            'address': address,
        }