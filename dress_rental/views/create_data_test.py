from django.http import JsonResponse
from django.core.management import call_command
from dress_rental.models import Category, Customer, Product, Invoice

def create(request, number_data_test):
    """
    Create view to return a JSON message reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON message reponse.
    :rtype: django.http.JsonResponse
    """

    if request.method == 'POST':
        try:
            _delete_records()
            _create_records(number_data_test)

            return JsonResponse({'message': 'Record deleted successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'method not allowed'}, status=405)

def _delete_records():
    Invoice.objects.all().delete()
    Customer.objects.all().delete()
    Product.objects.all().delete()
    Category.objects.all().delete()

def _create_records(number_data_test):    
    call_command('create_categories')
    call_command('create_products',
                    number_of_products=number_data_test*2)
    call_command('create_customers',
                    number_of_customers=number_data_test)
    call_command('create_invoices',
                    number_of_invoices=number_data_test)
