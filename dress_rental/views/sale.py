from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from dress_rental.models import Customer, Product, Sale
from datetime import datetime
import json

def index(request):
    sales = Sale.objects.prefetch_related('customer', 'products').order_by('-id')
    
    return JsonResponse(_get_sales_with_customers_and_products(sales), safe=False)

def list_sales_by_customer(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)
    sales = Sale.objects.filter(customer=customer)
    return render(request, 'sale_list.html', { 'customer': customer, 'sales': sales })

def create(request):
    if request.method == 'POST':
        try:
            params = json.loads(request.body.decode('utf-8'))['sale']
            print(params)

            new_sale = Sale.objects.create(
                    type = 'sale' if params['type'] == 'Venta' else 'rental',
                    price = int(params['price']),
                    advance_payment = int(params['advancePayment']),
                    advance_payment_date = datetime.strptime(params['advancePaymentDate'], '%Y-%m-%d').date(),
                    is_product_delivered = bool(params['isProductDelivered']),
                    delivery_date = datetime.strptime(params['deliveryDate'], '%Y-%m-%d').date(),
                    return_date = datetime.strptime(params['returnDate'], '%Y-%m-%d').date(),
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
            print(params)

            sale = get_object_or_404(Sale, id=params['id'])
        
            sale.type =  'sale' if params['type'] == 'Venta' else 'rental'
            sale.price = int(params['price'])
            sale.advance_payment = int(params['advancePayment'])
            sale.advance_payment_date = datetime.strptime(params['advancePaymentDate'], '%Y-%m-%d').date()
            sale.is_product_delivered = bool(params['isProductDelivered'])
            sale.delivery_date = datetime.strptime(params['deliveryDate'], '%Y-%m-%d').date()
            sale.return_date = datetime.strptime(params['returnDate'], '%Y-%m-%d').date()
            sale.is_return = bool(params['isProductReturn'])

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

def delete(request, sale_id):
    sale = get_object_or_404(Sale, pk=sale_id)

    if request.method == 'DELETE':
        try:
            sale.delete()
            return JsonResponse({'message': 'Record deleted successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'method not allowed'}, status=405)

def _get_sales_with_customers_and_products(sales):
    sales_serialized = []

    for sale in sales:
        sale_data = {        
            'id': sale.id,
            'type': 'Venta' if sale.type == 'sale' else 'Alquiler',
            'price': sale.price,
            'advancePayment': sale.advance_payment,
            'advancePaymentDate': sale.advance_payment_date.strftime('%Y-%m-%d'),
            'deliveryDate': sale.delivery_date.strftime('%Y-%m-%d'),
            'isProductDelivered': sale.is_product_delivered,            
            'returnDate': sale.return_date.strftime('%Y-%m-%d'),
            'isProductReturn': sale.is_product_return,           
            'customer': {
                'id': sale.customer.id,
                'identification': sale.customer.identification,
                'firstName': sale.customer.first_name,
                'lastName': sale.customer.last_name,
                'email': sale.customer.email,
                'contact': sale.customer.contact
            },
            'products': _get_products(sale.products.all()),
            'productIds': _get_product_ids(sale.products.all()),
        }
        sales_serialized.append(sale_data)

    return json.dumps(sales_serialized)

def _get_products(products):
    products_serialized = []

    for product in products:
        product_data = {    
            'id': product.id,
            'title': product.title,
            'reference': product.reference,
            'categoryType': product.category.type,
            'categoryId': product.category.id,
            'hasSale': True if product.sales.all() else False,
        }
        products_serialized.append(product_data)

    return products_serialized

def _get_product_ids(products):
    products_serialized = []

    for product in products:
        products_serialized.append(product.id)

    return products_serialized
