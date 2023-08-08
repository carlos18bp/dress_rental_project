from django import forms
from .models import Customer, Sale, Product

class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['identification', 'first_name', 'last_name', 'email', 'phone_number']

class SaleForm(forms.ModelForm):
    class Meta:
        model = Sale
        fields = ['type', 
                  'price', 
                  'advance_payment', 
                  'advance_payment_date', 
                  'outstanding_balance',
                  'delivery_date',
                  'return_date',
                  'product',
                  'customer']
        
class ProductForm(forms.ModelForm):
   class Meta:
      model = Product
      fields = ['title', 'reference', 'category', 'measures']