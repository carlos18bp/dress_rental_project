from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from dress_rental.models import Category, Product
from dress_rental.serializers.product_serializer import products_with_categories_and_invoices_serializer
import json

def index(request):
    """
    Index view to return a JSON products serialized reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON products serialized reponse.
    :rtype: django.http.JsonResponse
    """
    products = Product.objects.all().order_by('-id')
    
    return JsonResponse(products_with_categories_and_invoices_serializer(products), safe=False)

def create(request):
    """
    Create view to return a JSON products serialized and status reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON products serialized and status reponse.
    :rtype: django.http.JsonResponse
    """
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
    """
    Edit view to return a JSON products serialized and status reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON products serialized and status reponse.
    :rtype: django.http.JsonResponse
    """
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
    """
    Delete view to return a JSON message and status reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON message and status reponse.
    :rtype: django.http.JsonResponse
    """
    product = get_object_or_404(Product, pk=product_id)

    if request.method == 'DELETE':
        try:
            product.delete()
            return JsonResponse({'message': 'Record deleted successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'method not allowed'}, status=405)