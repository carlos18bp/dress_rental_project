import json
from django.test import TestCase
from dress_rental.models import Invoice
from dress_rental.serializers.invoice_serializer import invoices_serializer
from dress_rental.tests.factories.invoice_factory import InvoiceFactory
from dress_rental.tests.factories.product_factory import ProductFactory

class SerializerTestCase(TestCase):
    def test_serializer(self):
        expected_invoices = self._before_test()

        serializer = invoices_serializer(Invoice.objects.all())

        self.assertEqual(serializer, json.dumps(expected_invoices))

    def _before_test(self):

        product = ProductFactory.create()

        invoice = InvoiceFactory.create()
        invoice.products.add(product)

        return self._expected_invoice_data(invoice)


    def _expected_invoice_data(self, invoice):
        return [
            {
                'id': invoice.id,
                'type': 'Venta' if invoice.type == 'sale' else 'Alquiler',
                'price': invoice.price,
                'advancePayment': invoice.advance_payment,
                'advancePaymentDate': invoice.advance_payment_date.strftime('%Y-%m-%d'),
                'deliveryDate': invoice.delivery_date.strftime('%Y-%m-%d'),
                'isProductDelivered': invoice.is_product_delivered,
                'returnDate': invoice.return_date.strftime('%Y-%m-%d') if invoice.return_date else '',
                'isProductReturn': invoice.is_product_return,
                'customer': {
                    'id': invoice.customer.id,
                    'identification': invoice.customer.identification,
                    'firstName': invoice.customer.first_name,
                    'lastName': invoice.customer.last_name,
                    'email': invoice.customer.email,
                    'contact': invoice.customer.contact
                },
                'customerId': invoice.customer.id,
                'products': self._get_products(invoice.products.all().first()),
                'productIds': [invoice.products.all().first().id],
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