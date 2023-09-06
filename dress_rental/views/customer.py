from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from dress_rental.models import Customer
from dress_rental.serializers.customer_serializer import customers_serializer
import json

def index(request):
    customers = Customer.objects.all().order_by('-id')
    
    return JsonResponse(customers_serializer(customers), safe=False)

def create(request):    
    if request.method == 'POST':
        try:
            params = json.loads(request.body.decode('utf-8'))

            Customer.objects.create(
                identification = int(params['identification']),
                first_name = params['firstName'],
                last_name = params['lastName'],
                email = params['email'],
                contact = params['contact'],
                second_contact = params['secondContact'],
                address = params['address'],
            )

            return JsonResponse({'message': 'Record created successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'method not allowed'}, status=405)

def edit(request):    
    if request.method == 'PUT':
        try:
            params = json.loads(request.body.decode('utf-8'))
            customer = get_object_or_404(Customer, id=params['id'])

            customer.identification = int(params['identification'])
            customer.first_name = params['firstName']
            customer.last_name = params['lastName']
            customer.email = params['email']
            customer.contact = params['contact']
            customer.second_contact = params['secondContact']
            customer.address = params['address']

            customer.save()        

            return JsonResponse({'message': 'Record Edited successfully'}, status=200)   
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)  

    return JsonResponse({'error': 'method not allowed'}, status=405)

def delete(request, customer_id):
    customer = get_object_or_404(Customer, pk=customer_id)
        
    if request.method == 'DELETE':
        try:
            customer.delete()
            return JsonResponse({'message': 'Record deleted successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500) 
    
    return JsonResponse({'error': 'method not allowed'}, status=405)