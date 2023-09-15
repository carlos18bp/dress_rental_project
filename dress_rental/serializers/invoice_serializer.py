from dress_rental.utils import get_products, get_product_ids
import json

def invoices_serializer(invoices):
    """
    Invoice serializer.
    """
    invoices_serialized = []

    for invoice in invoices:
        invoice_data = {
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
            'products': get_products(invoice.products.all()),
            'productIds': get_product_ids(invoice.products.all()),
        }

        invoices_serialized.append(invoice_data)

    return json.dumps(invoices_serialized)


