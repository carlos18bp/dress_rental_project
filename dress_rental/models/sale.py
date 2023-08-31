from django.db import models
from dress_rental.models import Customer, Product

class Sale(models.Model):
    OPTIONS = (
        ('rental', 'Alquiler'),
        ('sale', 'Venta')
    )

    type = models.CharField(max_length=30, choices=OPTIONS)

    price = models.IntegerField()
    advance_payment = models.IntegerField()
    advance_payment_date = models.DateField()

    delivery_date = models.DateField()
    is_product_delivered = models.BooleanField(default=False)

    
    return_date = models.DateField(blank=True, null=True)
    is_product_return = models.BooleanField(default=False)

    products = models.ManyToManyField(Product, related_name='sales')
    customer = models.ForeignKey(Customer, related_name='sales', on_delete=models.PROTECT)

    def __str__(self):
        return self.type