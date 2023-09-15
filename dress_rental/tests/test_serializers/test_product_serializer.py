import json
from django.test import TestCase
from dress_rental.models import Product
from dress_rental.serializers.product_serializer import products_serializer
from dress_rental.tests.factories.invoice_factory import InvoiceFactory
from dress_rental.tests.factories.product_factory import ProductFactory

class SerializerTestCase(TestCase):
    def test_serializer(self):
        expected_product = self._before_test()

        serializer = products_serializer(Product.objects.all())

        self.assertEqual(serializer, json.dumps(expected_product))

    def _before_test(self):
        product = ProductFactory.create()

        invoice = InvoiceFactory.create()
        invoice.products.add(product)

        return self._expected_product_data(product)
    
    def _expected_product_data(self, product):
        return [
            {
                'id': product.id,
                'title': product.title,
                'reference': product.reference,
                'categoryType': product.category.type,
                'categoryId': product.category.id,
                'invoices': self._get_invoices_with_customer(product.invoices.all().first()),
                'hasSale': True if product.invoices.filter(type='sale').exists() else False,
                'hasRental': True if product.invoices.filter(type='rental').exists() else False,
            }
        ]
    
    def _get_invoices_with_customer(self, invoice):
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
                'customer': 
                    {
                        'id': invoice.customer.id,
                        'identification': invoice.customer.identification,
                    }
            }
        ]