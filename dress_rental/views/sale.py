from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from dress_rental.models import Customer, Product, Sale
from datetime import datetime
from dress_rental.serializers.sale_serializer import sales_with_customers_and_products_serializer
import json

def index(request):
    sales = Sale.objects.prefetch_related('customer', 'products').order_by('-id')
    
    return JsonResponse(sales_with_customers_and_products_serializer(sales), safe=False)

def create(request):
    if request.method == 'POST':
        try:
            params = json.loads(request.body.decode('utf-8'))['sale']

            new_sale = Sale.objects.create(
                    type = 'sale' if params['type'] == 'Venta' else 'rental',
                    price = int(params['price']),
                    advance_payment = int(params['advancePayment']),
                    advance_payment_date = datetime.strptime(params['advancePaymentDate'], '%Y-%m-%d').date(),
                    is_product_delivered = bool(params['isProductDelivered']),
                    delivery_date = datetime.strptime(params['deliveryDate'], '%Y-%m-%d').date(),
                    return_date = datetime.strptime(params['returnDate'], '%Y-%m-%d').date() if params['type'] == 'Alquiler' else None,
                    is_product_return = bool(params['isProductReturn']),
                    customer = get_object_or_404(Customer, id=params['customerId']),
                )
            
            for product_id in params['productIds']:
                product = get_object_or_404(Product, id=product_id)
                new_sale.products.add(product)

            return JsonResponse({'message': 'Record created successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'method not allowed'}, status=405)

def edit(request):
    if request.method == 'PUT':
        try:
            params = json.loads(request.body.decode('utf-8'))['sale']

            sale = get_object_or_404(Sale, id=params['id'])
        
            sale.type =  'sale' if params['type'] == 'Venta' else 'rental'
            sale.price = int(params['price'])
            sale.advance_payment = int(params['advancePayment'])
            sale.advance_payment_date = datetime.strptime(params['advancePaymentDate'], '%Y-%m-%d').date()
            sale.is_product_delivered = bool(params['isProductDelivered'])
            sale.delivery_date = datetime.strptime(params['deliveryDate'], '%Y-%m-%d').date()
            sale.return_date = datetime.strptime(params['returnDate'], '%Y-%m-%d').date() if params['type'] == 'Alquiler' else None
            sale.is_product_return = bool(params['isProductReturn'])

            sale.customer = get_object_or_404(Customer, id=params['customerId'])
            
            sale.products.clear()
            for product_id in params['productIds']:
                product = get_object_or_404(Product, id=product_id)
                is_product_in_sale = sale.products.filter(pk=product.pk).exists()
                if not is_product_in_sale:
                    sale.products.add(product)

            sale.save()

            return JsonResponse({'message': 'Record Edited successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
     

    return JsonResponse({'error': 'method not allowed'}, status=405)

def close_sale(request, sale_id):
    if request.method == 'PUT':
        try:
            sale = get_object_or_404(Sale, pk=sale_id)
            sale.is_product_return = True

            sale.save()

            return JsonResponse({'message': 'Record Updated successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)     

    return JsonResponse({'error': 'method not allowed'}, status=405)


def delete(request, sale_id):
    sale = get_object_or_404(Sale, pk=sale_id)

    if request.method == 'DELETE':
        try:
            sale.delete()
            return JsonResponse({'message': 'Record deleted successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'method not allowed'}, status=405)
