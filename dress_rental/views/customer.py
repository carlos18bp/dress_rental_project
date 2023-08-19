from django.shortcuts import render, redirect, get_object_or_404
from django.core import serializers
from django.http import JsonResponse
from ..models import Customer
from ..forms import CustomerForm

def index(request):
    customers = Customer.objects.all()
    customers_serialized = serializers.serialize('json', customers)
    
    return JsonResponse(customers_serialized, safe=False)

def create(request):
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = CustomerForm()

    return render(request, 'create_customer.html', {'form': form})

def delete(request, customer_id):
    customer = get_object_or_404(Customer, pk=customer_id)

    if request.method == 'POST':
        customer.delete()
        return JsonResponse({'message': 'Record deleted successfully'}, status=200)
    
    return JsonResponse({'error': 'method not allowed'}, status=405)
