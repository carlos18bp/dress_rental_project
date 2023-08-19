from django.shortcuts import render, get_object_or_404, redirect
import json
from django.http import JsonResponse
from ..models import Customer
from ..models import Sale
from ..forms import SaleForm

def index(request):
    sales = Sale.objects.select_related('customer', 'product')    

    return JsonResponse(_get_sales_with_customers_and_products(sales), safe=False)

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

def _get_sales_with_customers_and_products(sales):
    sales_serialized = []

    for sale in sales:
        sale_data = {        
            'id': sale.id,
            'type': sale.type,
            'price': sale.price,
            'advance_payment': sale.advance_payment,
            'advance_payment_date': sale.advance_payment_date.strftime('%Y-%m-%d'),
            'is_product_delivered': sale.is_product_delivered,
            'delivery_date': sale.delivery_date.strftime('%Y-%m-%d'),
            'return_date': sale.return_date.strftime('%Y-%m-%d'),            
            'customer': {
                'id': sale.customer.id,
                'identification': sale.customer.identification,
                'first_name': sale.customer.first_name,
                'last_name': sale.customer.last_name,
                'email': sale.customer.email,
                'phone_number': sale.customer.phone_number
            },
            'product': {
                'id': sale.product.id,
                'title': sale.product.title,
                'reference': sale.product.reference,
                'category': sale.product.category.type,
                'measures': sale.product.measures
            }
        }
        sales_serialized.append(sale_data)

    return json.dumps(sales_serialized)

def delete(request, sale_id):
    sale = get_object_or_404(Sale, pk=sale_id)

    if request.method == 'POST':
        sale.delete()
        return JsonResponse({'message': 'Record deleted successfully'}, status=200)
    
    return JsonResponse({'error': 'method not allowed'}, status=405)
    