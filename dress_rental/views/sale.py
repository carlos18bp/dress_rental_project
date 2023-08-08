from django.shortcuts import render, get_object_or_404, redirect
from ..models import Customer
from ..models import Sale
from ..forms import SaleForm

def index(request):
    sales = Sale.objects.all()
    return render(request, 'sale_list.html', { 'sales': sales })

def sale_list_by_customer(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)
    sales = Sale.objects.filter(customer=customer)
    return render(request, 'sale_list.html', { 'customer': customer, 'sales': sales })

def create(request):
    if request.method == 'POST':
        form = SaleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = SaleForm()

    return render(request, 'create_sale.html', {'form': form})
    