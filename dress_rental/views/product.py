from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from dress_rental.models import Category, Product
from dress_rental.serializers.product_serializer import products_with_categories_and_sales_serializer
import json

def index(request):
    products = Product.objects.all().order_by('-id')
    
    return JsonResponse(products_with_categories_and_sales_serializer(products), safe=False)

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