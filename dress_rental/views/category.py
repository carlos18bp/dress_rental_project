from django.core import serializers
from django.http import JsonResponse
from dress_rental.models import Category

def index(request):
    """
    Index view to return a JSON categories serialized reponse.

    :param request: Django object request.
    :type request: django.http.HttpRequest

    :return: JSON categories serialized reponse.
    :rtype: django.http.JsonResponse
    """
    categories = Category.objects.all()
    categories_serialized = serializers.serialize('json', categories)
    
    return JsonResponse(categories_serialized, safe=False, status=200)