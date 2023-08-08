from django.db import models

class Customer(models.Model):
    identification  = models.IntegerField()
    first_name = models.CharField(max_length=40)
    last_name = models.CharField(max_length=40)
    email = models.EmailField()
    phone_number = models.CharField(max_length=40)

def __str__(self):
    return self.first_name