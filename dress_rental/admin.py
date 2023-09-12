from django.contrib import admin
from .models.category import Category
from .models.customer import Customer
from .models.product import Product
from .models.invoice import Invoice

admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Invoice)