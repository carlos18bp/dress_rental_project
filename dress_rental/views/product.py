from django.shortcuts import render, redirect
from ..models import Product
from ..forms import ProductForm

def index(request):
    products = Product.objects.all()
    return render(request, 'product_list.html', { 'products': products })

def create(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = ProductForm()

    return render(request, 'create_product.html', {'form': form})