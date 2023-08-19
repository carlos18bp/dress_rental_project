from django.db import models
from .customer import Customer
from .product import Product

class Sale(models.Model):
    OPTIONS = (
        ('rental', 'Alquiler'),
        ('sale', 'Venta')
    )

    type = models.CharField(max_length=30, choices=OPTIONS)

    price = models.IntegerField()
    advance_payment = models.IntegerField()
    advance_payment_date = models.DateField()

    is_product_delivered = models.BooleanField(default=False)

    delivery_date = models.DateField()
    return_date = models.DateField(blank=True, null=True)

    is_return = models.BooleanField(default=True)

    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)