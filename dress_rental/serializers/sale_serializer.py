from dress_rental.utils import get_products, get_product_ids
import json

def sales_with_customers_and_products_serializer(sales):
    sales_serialized = []

    for sale in sales:
        sales_serialized.append(sale_serializer(sale))

    return json.dumps(sales_serialized)

def sale_serializer(sale):
    return {
        'id': sale.id,
        'type': 'Venta' if sale.type == 'sale' else 'Alquiler',
        'price': sale.price,
        'advancePayment': sale.advance_payment,
        'advancePaymentDate': sale.advance_payment_date.strftime('%Y-%m-%d'),
        'deliveryDate': sale.delivery_date.strftime('%Y-%m-%d'),
        'isProductDelivered': sale.is_product_delivered,
        'returnDate': sale.return_date.strftime('%Y-%m-%d') if sale.return_date else '',
        'isProductReturn': sale.is_product_return,
        'customer': {
            'id': sale.customer.id,
            'identification': sale.customer.identification,
            'firstName': sale.customer.first_name,
            'lastName': sale.customer.last_name,
            'email': sale.customer.email,
            'contact': sale.customer.contact
        },
        'customerId': sale.customer.id,
        'products': get_products(sale.products.all()),
        'productIds': get_product_ids(sale.products.all()),
    }


