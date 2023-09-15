import json

def products_serializer(products):
    """
    Product serializer.
    """
    products_serialized = []

    for product in products:
        product_data = {
            'id': product.id,
            'title': product.title,
            'reference': product.reference,
            'categoryType': product.category.type,
            'categoryId': product.category.id,
            'invoices': _get_invoices_with_customer(product.invoices.all()),
            'hasSale': True if product.invoices.filter(type='sale').exists() else False,
            'hasRental': True if product.invoices.filter(type='rental').exists() else False,
        }
        products_serialized.append(product_data)

    return json.dumps(products_serialized)

def _get_invoices_with_customer(invoices):
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
            'customer': {
                'id': invoice.customer.id,
                'identification': invoice.customer.identification,
            },
        }
        invoices_serialized.append(invoice_data)

    return invoices_serialized