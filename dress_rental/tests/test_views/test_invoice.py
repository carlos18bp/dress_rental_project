import json
import random
from faker import Faker
from datetime import date, datetime, timedelta
from django.test import TestCase
from django.urls import reverse
from dress_rental.models import Invoice
from dress_rental.tests.factories.customer_factory import CustomerFactory
from dress_rental.tests.factories.invoice_factory import InvoiceFactory
from dress_rental.tests.factories.product_factory import ProductFactory
from dress_rental.serializers.invoice_serializer import invoices_serializer

class TestListView(TestCase):
    def test_list_de_invoices(self):
        # Test correct status
        # And correct serialized data
        [InvoiceFactory.create() for _ in range(2)]

        url = reverse('list_invoices')
        response = self.client.get(url)        

        json_response = json.loads(response.content)
        expected_data = invoices_serializer(Invoice.objects.all().order_by('-id'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(json_response, expected_data)

    def test_create_invoice(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('create_invoice')
        response = self.client.post(url, 
                                    data=json_data, 
                                    content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            Invoice.objects
            .filter(type='sale' if new_data['type'] == 'Venta' else 'rental')
            .exists()
        )
        self.assertTrue(Invoice.objects.filter(price=new_data['price']).exists())   
        self.assertTrue(
            Invoice.objects
            .filter(advance_payment=new_data['advancePayment'])
            .exists()
        )
        self.assertTrue(
            Invoice.objects
            .filter(advance_payment_date=new_data['advancePaymentDate'])
            .exists()
        )
        self.assertTrue(
            Invoice.objects
            .filter(delivery_date=new_data['deliveryDate'])
            .exists()
        )
        self.assertTrue(
            Invoice.objects
            .filter(is_product_delivered=new_data['isProductDelivered'])
            .exists()
        )
        self.assertTrue(
            Invoice.objects
            .filter(return_date=new_data['returnDate'])
            .exists()
        ) 
        self.assertTrue(
            Invoice.objects
            .filter(is_product_return=new_data['isProductReturn'])
            .exists()
        )   
        self.assertTrue(
            Invoice.objects
            .filter(customer=new_data['customerId'])
            .exists()
        )
        self.assertTrue(
            Invoice.objects
            .filter(products=new_data['productIds'][0])
            .exists()
            )
        self.assertTrue(
            Invoice.objects
            .filter(products=new_data['productIds'][1])
            .exists()
        )
        
        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response_data['message'], 'Record created successfully')

    def test_create_method_not_allow(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('create_invoice')
        response = self.client.put(url, 
                                   data=json_data, 
                                   content_type='application/json')

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def test_create_invalid_data(self):
        new_data = self._valid_fields()
        new_data['customerId'] = 'Invalid data'  
        json_data = json.dumps(new_data)
        url = reverse('create_invoice')
        with self.assertRaises(AssertionError):
            response = self.client.post(url, 
                                        data=json_data, 
                                        content_type='application/json')

            response_data = json.loads(response.content.decode('utf-8'))
            
            self.assertEqual(response.status_code, 500)
            self.assertEqual(response_data['error'], 'method not allowed')

    def test_edit_invoice(self):
        invoice = InvoiceFactory.create()
        new_data = self._valid_fields()
        new_data['id'] = invoice.id
        json_data = json.dumps(new_data)
        url = reverse('edit_invoice')
        response = self.client.put(url, 
                                   data=json_data, 
                                   content_type='application/json')

        self.assertEqual(response.status_code, 200)
        invoice.refresh_from_db()
        self.assertEqual(
            invoice.type, 'sale' 
            if new_data['type'] == 'Venta' else 'rental'
        )
        self.assertEqual(invoice.price, new_data['price'])
        self.assertEqual(
            invoice.advance_payment, 
            new_data['advancePayment']
        )
        self.assertEqual(
            invoice.advance_payment_date, 
            datetime.strptime(new_data['advancePaymentDate'], '%Y-%m-%d').date()
        )
        self.assertEqual(
            invoice.delivery_date, 
            datetime.strptime(new_data['deliveryDate'], '%Y-%m-%d').date()
        )
        self.assertEqual(
            invoice.is_product_delivered, 
            new_data['isProductDelivered']
        )
        self.assertEqual(
            invoice.return_date, 
            datetime.strptime(new_data['returnDate'], '%Y-%m-%d').date() 
            if new_data['type'] == 'Alquiler' else None
        )
        self.assertEqual(
            invoice.is_product_return, 
            new_data['isProductReturn']
        )
        self.assertEqual(invoice.customer.id, new_data['customerId'])
        self.assertEqual(
            invoice.products.all().first().id, 
            new_data['productIds'][0]
        )
        self.assertEqual(
            invoice.products.all().last().id, 
            new_data['productIds'][1]
        )

        response_data = json.loads(response.content.decode('utf-8'))
        
        self.assertEqual(response_data['message'], 'Record edited successfully')

    def test_edit_method_not_allow(self):
        new_data = self._valid_fields()        
        json_data = json.dumps(new_data)
        url = reverse('edit_invoice')
        response = self.client.post(url, 
                                    data=json_data, 
                                    content_type='application/json')

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def test_edit_invalid_data(self):
        new_data = self._valid_fields()
        new_data['customerId'] = 'Invalid data'   
        json_data = json.dumps(new_data)
        url = reverse('edit_invoice')
        with self.assertRaises(AssertionError):
            response = self.client.post(url, 
                                        data=json_data, 
                                        content_type='application/json')

            response_data = json.loads(response.content.decode('utf-8'))
            
            self.assertEqual(response.status_code, 500)
            self.assertEqual(response_data['error'], 'method not allowed')

    def test_delete_invoice(self):
        invoice = InvoiceFactory.create()
        url = reverse('delete_invoice', args=[invoice.id])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, 200) 
        self.assertFalse(Invoice.objects.filter(pk = invoice.id).exists())

    def test_delete_method_not_allow(self):
        invoice = InvoiceFactory.create()
        url = reverse('delete_invoice', args=[invoice.id])
        response = self.client.post(url)

        response_data = json.loads(response.content.decode('utf-8'))

        self.assertEqual(response.status_code, 405)
        self.assertEqual(response_data['error'], 'method not allowed')

    def _valid_fields(self):
        fake = Faker()
        type = random.choice(['Venta', 'Alquiler'])
        price = fake.random_int(min=0, max=999)
        advance_payment = fake.random_int(min=0, max=price)
        advance_payment_date = fake.date_between(start_date=date.today(), 
                                                 end_date=date.today() + timedelta(days=20))
        delivery_date = fake.date_between(start_date=date.today(), 
                                          end_date=date.today() + timedelta(days=20))
        is_product_delivered = fake.boolean()          
        return_date = fake.date_between(start_date=date.today(), 
                                        end_date=date.today() + timedelta(days=20))
        is_product_return = fake.boolean()
        customer = CustomerFactory.create()
        product_1 = ProductFactory.create()
        product_2 = ProductFactory.create()

        return {
            'type': type,
            'price': price,
            'advancePayment': advance_payment,
            'advancePaymentDate': str(advance_payment_date),
            'deliveryDate': str(delivery_date),
            'isProductDelivered': is_product_delivered,
            'returnDate': str(return_date) if type == 'Alquiler' else None,
            'isProductReturn': is_product_return,
            'customerId': customer.id,
            'productIds': [product_1.id, product_2.id]
        }