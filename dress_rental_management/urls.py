"""dress_rental_management URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from dress_rental.views import category, customer, product, sale

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_customer/', customer.create, name='create_customer'),
    path('edit_customer/', customer.edit, name='edit_customer'),
    path('delete_customer/<int:customer_id>/', customer.delete, name='delete_customer'),
    path('list_customers/', customer.index, name='list_customers'),
    path('create_product/', product.create, name='create_product'),
    path('edit_product/', product.edit, name='edit_product'),
    path('delete_product/<int:product_id>/', product.delete, name='delete_product'),
    path('list_products/', product.index, name='list_products'),
    path('create_sale/', sale.create, name='create_sale'),
    path('edit_sale/', sale.edit, name='edit_sale'),
    path('delete_sale/<int:sale_id>/', sale.delete, name='delete_sale'),
    path('list_sales/', sale.index, name='list_sales'),
    path('close_sale/<int:sale_id>/', sale.close_sale, name='close_sale'),
    path('list_categories/', category.index, name='list_categories'),  
]
