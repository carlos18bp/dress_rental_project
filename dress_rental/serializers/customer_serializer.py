from dress_rental.utils import get_products, get_product_ids
import json

def customers_serializer(customers):
    """
    Customer serializer.
    """
    customers_serialized = []

    for customer in customers:
        customer_data = {
            'id': customer.id,
            'identification': customer.identification,
            'firstName': customer.first_name,
            'lastName': customer.last_name,
            'email': customer.email,
            'contact': customer.contact,
            'secondContact': customer.second_contact,
            'address': customer.address,
            'invoices': _get_invoices_with_products(customer.invoices.all(), customer.id),
            'hasSale': True if customer.invoices.filter(type='sale').exists() else False,
            'hasRental': True if customer.invoices.filter(type='rental').exists() else False,
        }
        customers_serialized.append(customer_data)

    return json.dumps(customers_serialized)

def _get_invoices_with_products(invoices, customer_id):
    invoices_serialized = []

    for invoice in invoices:
        invoice_data = {
            'id': invoice.id,
            'type': 'Venta' if invoice.type == 'sale' else 'Alquiler',
            'price': invoice.price,
            'advancePayment': invoice.advance_payment,
            'advancePaymentDate': invoice.advance_payment_date.strftime('%Y-%m-%d'),
            'isProductDelivered': invoice.is_product_delivered,
            'deliveryDate': invoice.delivery_date.strftime('%Y-%m-%d'),
            'returnDate': invoice.return_date.strftime('%Y-%m-%d') if invoice.return_date else '',
            'isProductReturn': invoice.is_product_return,
            'products': get_products(invoice.products.all()),
            'productIds': get_product_ids(invoice.products.all()),
            'customerId': customer_id,
        }
        invoices_serialized.append(invoice_data)

    return invoices_serialized