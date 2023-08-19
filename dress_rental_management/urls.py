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
from dress_rental.views import customer, sale, product


urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_customer/', customer.create, name='create_customer'),
    path('delete_customer/<int:customer_id>/', customer.delete, name='delete_customer'),
    path('customers_list/', customer.index, name='customer_list'),
    path('create_product/', product.create, name='create_product'),
    path('delete_product/<int:product_id>/', product.delete, name='delete_product'),
    path('products_list/', product.index, name='product_list'),
    path('create_sale/', sale.create, name='create_sale'),
    path('delete_sale/<int:sale_id>/', sale.delete, name='delete_sale'),
    path('sales_list/', sale.index, name='sale_list'),
    path('sale_list_by_customer/<int:customer_id>/', sale.sale_list_by_customer, name='sale_list_by_customer'),    
]
