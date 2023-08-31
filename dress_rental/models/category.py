from django.db import models

class Category(models.Model):
    OPTION_TYPE = (
        ('man', 'Hombre'),
        ('woman', 'Mujer'),
        ('boy','Niño'),
        ('girl', 'Niña'),
        ('girlfriend', 'Novias'),
        ('first_communion', 'Primera comunion'),
        ('quinceanera', '15 años'),
        ('accessories', 'Accesorios')
    )
    type = models.CharField(max_length=30, choices=OPTION_TYPE)

def __str__(self):
    return self.type
