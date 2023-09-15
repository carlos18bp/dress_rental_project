from django.db import models
from dress_rental.models import Customer, Product

class Invoice(models.Model):
    """
    Invoice model.

    :ivar type: type invoice.
    :vartype type: str
    :ivar price: price invoice.
    :vartype price: int
    :ivar advance_payment: advance payment invoice.
    :vartype advance_payment: int
    :ivar advance_payment_date: advance payment date invoice.
    :vartype advance_payment_date: datetime.date
    :ivar delivery_date: delivery date invoice.
    :vartype delivery_date: datetime.date
    :ivar is_product_delivered: is product delivered invoice?.
    :vartype is_product_delivered: bool
    :ivar return_date: return date invoice.
    :vartype return_date: datetime.date
    :ivar titis_product_returnle: is product return invoice?.
    :vartype is_product_return: bool
    :ivar products: products invoice.
    :vartype products: str
    :ivar customer: customer invoice.
    :vartype customer: str
    """

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

    products = models.ManyToManyField(Product, related_name='invoices')
    customer = models.ForeignKey(Customer, related_name='invoices', on_delete=models.PROTECT)

    def __str__(self):
        return self.type