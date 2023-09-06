import json

def products_with_categories_and_sales_serializer(products):
    products_serialized = []

    for product in products:
        product_data = {    
            'id': product.id,
            'title': product.title,
            'reference': product.reference,
            'categoryType': product.category.type,
            'categoryId': product.category.id,
            'sales': _get_sales_with_customer(product.sales.all()),
            'hasSale': True if product.sales.filter(type='sale').exists() else False,
            'hasRental': True if product.sales.filter(type='rental').exists() else False,
        }
        products_serialized.append(product_data)

    return json.dumps(products_serialized)

def _get_sales_with_customer(sales):
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
            'customer': {
                'id': sale.customer.id,
                'identification': sale.customer.identification,
            },
        }
        sales_serialized.append(sale_data)

    return sales_serialized