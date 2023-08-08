from django.shortcuts import render, redirect
from ..models import Customer
from ..forms import CustomerForm

def index(request):
    customers = Customer.objects.all()
    return render(request, 'customer_list.html', { 'customers': customers })

def create(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = CustomerForm()

    return render(request, 'create_customer.html', {'form': form})

