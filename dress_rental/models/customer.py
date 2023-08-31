from django.db import models

class Customer(models.Model):
    identification  = models.IntegerField()
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField(blank=True, null=True)
    contact = models.CharField(max_length=40)
    second_contact = models.CharField(max_length=40, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)

def __str__(self):
    return self.first_name