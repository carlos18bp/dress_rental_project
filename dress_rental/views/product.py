from django.shortcuts import render, redirect, get_object_or_404
from django.core import serializers
from django.http import JsonResponse
from ..models import Product
from ..forms import ProductForm

def index(request):
    products = Product.objects.all()
    products_serialized = serializers.serialize('json', products)
    
    return JsonResponse(products_serialized, safe=False)

def create(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = ProductForm()

    return render(request, 'create_product.html', {'form': form})

def delete(request, product_id):
    product = get_object_or_404(Product, pk=product_id)

    if request.method == 'POST':
        product.delete()
        return JsonResponse({'message': 'Record deleted successfully'}, status=200)
    
    return JsonResponse({'error': 'method not allowed'}, status=405)