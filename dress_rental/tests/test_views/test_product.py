import json
from faker import Faker
from django.test import TestCase
from django.urls import reverse
from django.core import serializers
from dress_rental.models import Product
from dress_rental.tests.factories.product_factory import ProductFactory
from dress_rental.tests.factories.category_factory import CategoryFactory
from dress_rental.serializers.product_serializer import products_serializer

class TestListView(TestCase):
    def test_list_de_products(self):
        # Test correct status
        # And correct serialized data
        [ProductFactory.create() for _ in range(2)]

        url = reverse('list_products')
        response = self.client.get(url)        

        json_response = json.loads(response.content)
        expected_data = products_serializer(Product.objects.all().order_by('-id'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json_response, expected_data)

    def test_create_product(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('create_product')
        response = self.client.post(url, data=json_data, content_type='application/json')

        self.assertEqual(response.status_code, 200)  
        self.assertTrue(Product.objects.filter(title=new_data['title']).exists())
        self.assertTrue(Product.objects.filter(reference=new_data['reference']).exists())   
        self.assertTrue(Product.objects.filter(category=new_data['categoryId']).exists())
        
        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response_data['message'], 'Record created successfully')

    def test_create_method_not_allow(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('create_product')
        response = self.client.put(url, data=json_data, content_type='application/json')

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def test_create_invalid_data(self):
        new_data = self._valid_fields()
        new_data['categoryId'] = 'Invalid data'  
        json_data = json.dumps(new_data)
        url = reverse('create_product')
        with self.assertRaises(AssertionError):
            response = self.client.post(url, data=json_data, content_type='application/json')

            response_data = json.loads(response.content.decode('utf-8'))
            
            self.assertEqual(response.status_code, 500)
            self.assertEqual(response_data['error'], 'method not allowed')

    def test_edit_product(self):
        product = ProductFactory.create()
        new_data = self._valid_fields()
        new_data['id'] = product.id
        json_data = json.dumps(new_data)
        url = reverse('edit_product')
        response = self.client.put(url, data=json_data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
        product.refresh_from_db()
        self.assertEqual(product.title, new_data['title'])
        self.assertEqual(product.reference, new_data['reference'])
        self.assertEqual(product.category.id, new_data['categoryId'])

        response_data = json.loads(response.content.decode('utf-8'))
        
        self.assertEqual(response_data['message'], 'Record edited successfully')

    def test_edit_method_not_allow(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('edit_product')
        response = self.client.post(url, data=json_data, content_type='application/json')

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def test_edit_invalid_data(self):
        new_data = self._valid_fields()
        new_data['categoryId'] = 'Invalid data'   
        json_data = json.dumps(new_data)
        url = reverse('edit_product')
        with self.assertRaises(AssertionError):
            response = self.client.post(url, data=json_data, content_type='application/json')

            response_data = json.loads(response.content.decode('utf-8'))
            
            self.assertEqual(response.status_code, 500)
            self.assertEqual(response_data['error'], 'method not allowed')

    def test_delete_product(self):
        product = ProductFactory.create()
        url = reverse('delete_product', args=[product.id])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, 200) 
        self.assertFalse(Product.objects.filter(pk = product.id).exists())

    def test_delete_method_not_allow(self):
        product = ProductFactory.create()
        url = reverse('delete_product', args=[product.id])
        response = self.client.post(url)

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def _valid_fields(self):
        fake = Faker()
        title = fake.word()
        reference = 'P-'+ str(fake.random_int(min=100, max=999))
        category =  CategoryFactory.create()

        return {
            'title': title,
            'reference': reference,
            'categoryId': category.id
        }