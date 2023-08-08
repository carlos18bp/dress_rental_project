from django.contrib import admin
from .models.category import Category
from .models.customer import Customer
from .models.product import Product
from .models.sale import Sale

admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Sale)