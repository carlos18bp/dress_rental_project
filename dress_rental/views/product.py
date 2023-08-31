from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from dress_rental.models import Category, Product
import json

def index(request):
    products = Product.objects.all().reverse()
    
    return JsonResponse(_get_products_with_categories_and_sales(products), safe=False)

def create(request):
    if request.method == 'POST':
        try:
            params = json.loads(request.body.decode('utf-8'))
            
            Product.objects.create(
                title = params['title'],
                reference = params['reference'],
                category = get_object_or_404(Category, id=params['categoryId']),
            )

            return JsonResponse({'message': 'Record created successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'method not allowed'}, status=405)

def edit(request):
    if request.method == 'PUT':
        try:
            params = json.loads(request.body.decode('utf-8'))
            product = get_object_or_404(Product, id=params['id'])

            product.title = params['title']
            product.reference = params['reference']
            product.category = get_object_or_404(Category, id=params['categoryId'])

            product.save()        

            return JsonResponse({'message': 'Record Edited successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)   

    return JsonResponse({'error': 'method not allowed'}, status=405)

def delete(request, product_id):
    product = get_object_or_404(Product, pk=product_id)

    if request.method == 'DELETE':
        try:
            product.delete()
            return JsonResponse({'message': 'Record deleted successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'method not allowed'}, status=405)

def _get_products_with_categories_and_sales(products):
    products_serialized = []

    for product in products:
        product_data = {    
            'id': product.id,
            'title': product.title,
            'reference': product.reference,
            'categoryType': product.category.type,
            'categoryId': product.category.id,
            'sales': _get_sales_with_customer(product.sales.all()),
            'hasSale': True if product.sales.all() else False,
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
            'returnDate': sale.return_date.strftime('%Y-%m-%d'),
            'isProductReturn': sale.is_product_return,           
            'customer': {
                'id': sale.customer.id,
                'identification': sale.customer.identification,
            },
            'product': {
                'id': sale.customer.id,
            },
        }
        sales_serialized.append(sale_data)

    return sales_serialized