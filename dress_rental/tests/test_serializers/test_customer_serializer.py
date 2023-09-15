import json
from django.test import TestCase
from dress_rental.models import Customer
from dress_rental.serializers.customer_serializer import customers_serializer
from dress_rental.tests.factories.customer_factory import CustomerFactory
from dress_rental.tests.factories.invoice_factory import InvoiceFactory
from dress_rental.tests.factories.product_factory import ProductFactory

class SerializerTestCase(TestCase):
    def test_serializer(self):
        expected_customers = self._before_test()

        serializer = customers_serializer(Customer.objects.all())

        self.assertEqual(serializer, json.dumps(expected_customers))

    def _before_test(self):
        customer = CustomerFactory.create()

        product = ProductFactory.create()

        invoice = InvoiceFactory.create(customer=customer)
        invoice.products.add(product)

        return self._expected_customer_data(customer)

    def _expected_customer_data(self, customer):
        return [
            {
                'id': customer.id,
                'identification': customer.identification,
                'firstName': customer.first_name,
                'lastName': customer.last_name,
                'email': customer.email,
                'contact': customer.contact,
                'secondContact': customer.second_contact,
                'address': customer.address,
                'invoices': self._get_invoices_with_products(customer.invoices.all().first(), customer.id),
                'hasSale': True if customer.invoices.filter(type='sale').exists() else False,
                'hasRental': True if customer.invoices.filter(type='rental').exists() else False,
            }
        ]

    def _get_invoices_with_products(self, invoice, customer_id):
        return [
            {
                'id': invoice.id,
                'type': 'Venta' if invoice.type == 'sale' else 'Alquiler',
                'price': invoice.price,
                'advancePayment': invoice.advance_payment,
                'advancePaymentDate': invoice.advance_payment_date.strftime('%Y-%m-%d'),
                'isProductDelivered': invoice.is_product_delivered,
                'deliveryDate': invoice.delivery_date.strftime('%Y-%m-%d'),
                'returnDate': invoice.return_date.strftime('%Y-%m-%d') if invoice.return_date else '',
                'isProductReturn': invoice.is_product_return,
                'products': self._get_products(invoice.products.all().first()),
                'productIds': [invoice.products.all().first().id],
                'customerId': customer_id,
            }
        ]
    
    def _get_products(self, product):
        return [
            {    
                'id': product.id,
                'title': product.title,
                'reference': product.reference,
                'categoryType': product.category.type,
                'categoryId': product.category.id,
                'hasSale': True if product.invoices.filter(type='sale').exists() else False,
                'hasRental': True if product.invoices.filter(type='rental').exists() else False,
            }
        ]
