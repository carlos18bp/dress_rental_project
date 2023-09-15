import random
from factory import Faker
from faker import Faker
from django.test import TestCase
from dress_rental.models import Invoice
from dress_rental.tests.factories.customer_factory import CustomerFactory
from dress_rental.tests.factories.invoice_factory import InvoiceFactory
from dress_rental.tests.factories.product_factory import ProductFactory


class InvoiceTestCase(TestCase):
    def test_invoice_creator(self):
        # Test valid invoice instance
        # And correct creation of record invoice
        invoice = InvoiceFactory.create()     

        self.assertIsInstance(invoice, Invoice)
        self.assertCountEqual(Invoice.objects.all(), [invoice])

    def test_fields(self):
        # Test valid fields
        valid_data = self._valid_fields()

        invoice = Invoice.objects.create(**valid_data)

        product = ProductFactory.create()
        invoice.products.add(product)

        self.assertEqual(invoice.type, valid_data['type'])
        self.assertEqual(invoice.price, valid_data['price'])
        self.assertEqual(invoice.advance_payment, valid_data['advance_payment'])
        self.assertEqual(invoice.advance_payment_date, valid_data['advance_payment_date'])
        self.assertEqual(invoice.delivery_date, valid_data['delivery_date'])
        self.assertEqual(invoice.is_product_delivered, valid_data['is_product_delivered'])
        self.assertEqual(invoice.return_date, valid_data['return_date'])
        self.assertEqual(invoice.is_product_return, valid_data['is_product_return'])
        self.assertEqual(invoice.customer, valid_data['customer'])
        self.assertEqual(list(invoice.products.all()), [product])

    
    def test_raises(self):
        # Test for invalid values in changes
        fake = Faker()
        valid_data = self._valid_fields()

        with self.assertRaises(ValueError):
            valid_data['price'] = fake.word()
            Invoice.objects.create(**valid_data)
        
        with self.assertRaises(ValueError):
            valid_data['advance_payment'] = fake.word()
            Invoice.objects.create(**valid_data)
        
        with self.assertRaises(ValueError):
            valid_data['advance_payment_date'] = fake.word()
            Invoice.objects.create(**valid_data)

        with self.assertRaises(ValueError):
            valid_data['delivery_date'] = fake.word()
            Invoice.objects.create(**valid_data)

        with self.assertRaises(ValueError):
            valid_data['is_product_delivered'] = fake.word()
            Invoice.objects.create(**valid_data)

        with self.assertRaises(ValueError):
            valid_data['return_date'] = fake.word()
            Invoice.objects.create(**valid_data)

        with self.assertRaises(ValueError):
            valid_data['is_product_return'] = fake.word()
            Invoice.objects.create(**valid_data)

    def _valid_fields(self):
        fake = Faker()

        type = random.choice(['rental', 'sale'])

        price = random.randint(1, 100)
        advance_payment = random.randint(1, 100)
        advance_payment_date = fake.date_between(start_date='-30d', end_date='today')

        delivery_date = fake.date_between(start_date='-30d', end_date='today')
        is_product_delivered = fake.boolean()

        
        return_date = fake.date_between(start_date='-30d', end_date='today')
        is_product_return = fake.boolean()

        customer =  CustomerFactory.create()

        return {
            'type': type,
            'price': price,
            'advance_payment': advance_payment,
            'advance_payment_date': advance_payment_date,
            'delivery_date': delivery_date,
            'is_product_delivered': is_product_delivered,
            'return_date': return_date,
            'is_product_return': is_product_return,
            'customer': customer
        }

