from django.test import TestCase
from django.urls import reverse
from django.core import serializers
from dress_rental.models import Category

class TestListView(TestCase):
    def test_list_de_categories(self):
        # Test correct status
        # And correct serialized data
        [Category.objects.create() for _ in range(2)]

        url = reverse('list_categories')
        response = self.client.get(url)        

        response_data = response.json()
        categories_serialized = serializers.serialize('json', Category.objects.all())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data, categories_serialized)