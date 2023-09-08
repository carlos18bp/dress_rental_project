def get_products(products):
    products_serialized = []

    for product in products:
        product_data = {    
            'id': product.id,
            'title': product.title,
            'reference': product.reference,
            'categoryType': product.category.type,
            'categoryId': product.category.id,
            'hasSale': True if product.sales.filter(type='Venta').exists() else False,
            'hasRental': True if product.sales.filter(type='Alquiler').exists() else False,
        }
        products_serialized.append(product_data)

    return products_serialized

def get_product_ids(products):
    products_serialized = []

    for product in products:
        products_serialized.append(product.id)

    return products_serialized




