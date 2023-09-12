from django.db import models

class Customer(models.Model):
    """
    Customer model.

    :ivar identification: identification customer.
    :vartype identification: int
    :ivar first_name: first name customer.
    :vartype first_name: str
    :ivar last_name: last name customer.
    :vartype last_name: str
    :ivar email: email customer.
    :vartype email: str
    :ivar contact: contact customer.
    :vartype contact: str
    :ivar second_contact: second contact customer.
    :vartype second_contact: str
    :ivar address: address customer.
    :vartype address: str
    """

    identification  = models.IntegerField()
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(blank=True, null=True)
    contact = models.CharField(max_length=40)
    second_contact = models.CharField(max_length=40, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)

def __str__(self):
    return self.first_name