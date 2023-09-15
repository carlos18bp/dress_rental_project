from django.test import TestCase
from factory import Faker
from dress_rental.models import Category
from dress_rental.tests.factories.category_factory import CategoryFactory

class CategoryTestCase(TestCase):
    def test_category_creator(self):
        # Test valid category instance
        # And correct creation of record category
        category = CategoryFactory()

        self.assertIsInstance(category, Category)
        self.assertCountEqual(Category.objects.all(), [category])

    def test_fields(self):
        # Test valid fields
        category = Category.objects.create(type='man')

        self.assertEqual(category.type, 'man')