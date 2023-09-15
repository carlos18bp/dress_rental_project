from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from dress_rental.models import Customer, Product, Invoice
from datetime import datetime
from dress_rental.serializers.invoice_serializer import invoices_serializer
import json

def index(request):
    """
    Index view to return a JSON invoices serialized reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON invoices serialized reponse.
    :rtype: django.http.JsonResponse
    """
    invoices = Invoice.objects.prefetch_related('customer', 'products').order_by('-id')

    return JsonResponse(invoices_serializer(invoices), safe=False)

def create(request):
    """
    Create view to return a JSON invoices serialized and status reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON invoices serialized and status reponse.
    :rtype: django.http.JsonResponse
    """
    if request.method == 'POST':
        try:
            params = json.loads(request.body.decode('utf-8'))

            new_invoice = Invoice.objects.create(
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
                new_invoice.products.add(product)

            return JsonResponse({'message': 'Record created successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'method not allowed'}, status=405)

def edit(request):
    """
    Edit view to return a JSON invoices serialized and status reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON invoices serialized and status reponse.
    :rtype: django.http.JsonResponse
    """
    if request.method == 'PUT':
        try:
            params = json.loads(request.body.decode('utf-8'))

            invoice = get_object_or_404(Invoice, id=params['id'])
        
            invoice.type =  'sale' if params['type'] == 'Venta' else 'rental'
            invoice.price = int(params['price'])
            invoice.advance_payment = int(params['advancePayment'])
            invoice.advance_payment_date = datetime.strptime(params['advancePaymentDate'], '%Y-%m-%d').date()
            invoice.is_product_delivered = bool(params['isProductDelivered'])
            invoice.delivery_date = datetime.strptime(params['deliveryDate'], '%Y-%m-%d').date()
            invoice.return_date = datetime.strptime(params['returnDate'], '%Y-%m-%d').date() if params['type'] == 'Alquiler' else None
            invoice.is_product_return = bool(params['isProductReturn'])

            invoice.customer = get_object_or_404(Customer, id=params['customerId'])
            
            invoice.products.clear()
            for product_id in params['productIds']:
                product = get_object_or_404(Product, id=product_id)
                is_product_in_invoice = invoice.products.filter(pk=product.pk).exists()
                if not is_product_in_invoice:
                    invoice.products.add(product)

            invoice.save()

            return JsonResponse({'message': 'Record edited successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
     

    return JsonResponse({'error': 'method not allowed'}, status=405)

def close_invoice(request, invoice_id):
    """
    Close invoice view to return a JSON message and status reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON message and status reponse.
    :rtype: django.http.JsonResponse
    """
    if request.method == 'PUT':
        try:
            invoice = get_object_or_404(Invoice, pk=invoice_id)
            invoice.is_product_return = True

            invoice.save()

            return JsonResponse({'message': 'Record Updated successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)     

    return JsonResponse({'error': 'method not allowed'}, status=405)


def delete(request, invoice_id):
    """
    Delete view to return a JSON message and status reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON message and status reponse.
    :rtype: django.http.JsonResponse
    """
    invoice = get_object_or_404(Invoice, pk=invoice_id)

    if request.method == 'DELETE':
        try:
            invoice.delete()
            return JsonResponse({'message': 'Record deleted successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'method not allowed'}, status=405)
