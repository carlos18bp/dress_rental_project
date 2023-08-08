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
    outstanding_balance = models.IntegerField(blank=True)

    is_product_delivered = models.BooleanField(default=False)

    delivery_date = models.DateField()
    return_date = models.DateField(blank=True, null=True)

    is_return = models.BooleanField(default=True)

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    

    def calculate_outstanding_balance(self):
        if self.price and self.advance_payment:
            self.outstanding_balance = self.price - self.advance_payment
        else:
            self.outstanding_balance = 0
    
    def save(self, *args, **kwargs):
        self.calculate_outstanding_balance()
        super(Sale, self).save(*args, **kwargs)