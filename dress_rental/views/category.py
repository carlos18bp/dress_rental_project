from django.core import serializers
from django.http import JsonResponse
from dress_rental.models import Category

def index(request):
    categories = Category.objects.all()
    categories_serialized = serializers.serialize('json', categories)
    
    return JsonResponse(categories_serialized, safe=False)