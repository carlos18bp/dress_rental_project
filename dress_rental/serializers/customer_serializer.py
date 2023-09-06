from dress_rental.utils import get_products, get_product_ids
import json

def customers_serializer(customers):
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
            'sales': _get_sales_with_products(customer.sales.all(), customer.id),
            'hasSale': True if customer.sales.filter(type='sale').exists() else False,
            'hasRental': True if customer.sales.filter(type='rental').exists() else False,
        }
        customers_serialized.append(customer_data)

    return json.dumps(customers_serialized)

def _get_sales_with_products(sales, customer_id):
    sales_serialized = []

    for sale in sales:
        sale_data = {        
            'id': sale.id,
            'type': 'Venta' if sale.type == 'sale' else 'Alquiler',
            'price': sale.price,
            'advancePayment': sale.advance_payment,
            'advancePaymentDate': sale.advance_payment_date.strftime('%Y-%m-%d'),
            'isProductDelivered': sale.is_product_delivered,
            'deliveryDate': sale.delivery_date.strftime('%Y-%m-%d'),
            'returnDate': sale.return_date.strftime('%Y-%m-%d') if sale.return_date else '',
            'isProductReturn': sale.is_product_return,
            'products': get_products(sale.products.all()),
            'productIds': get_product_ids(sale.products.all()),
            'customerId': customer_id,
        }
        sales_serialized.append(sale_data)

    return sales_serialized