from factory import Faker
from django.test import TestCase
from dress_rental.models import Product
from dress_rental.tests.factories.product_factory import ProductFactory, CategoryFactory

class ProductTestCase(TestCase):
    def test_product_creator(self):
        # Test valid product instance
        # And correct creation of record product
        product = ProductFactory.create()
        self.assertIsInstance(product, Product)
        self.assertCountEqual(Product.objects.all(), [product])

    def test_fields(self):
        # Test valid fields
        title = Faker('text', max_nb_chars=60)
        reference = Faker('text', max_nb_chars=20)
        category =  CategoryFactory.create()

        product = Product.objects.create(title=title, 
                                         reference=reference, 
                                         category=category)

        self.assertEqual(product.title, title)
        self.assertEqual(product.reference, reference)
        self.assertEqual(product.category, category)
     
