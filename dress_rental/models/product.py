from django.db import models
from .category import Category

class Product(models.Model):
    title = models.CharField(max_length=40)
    reference = models.CharField(max_length=40)
    category = models.OneToOneField(Category, on_delete=models.CASCADE)
    measures = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.reference

    # Formato Json - Medidas:
    # { busto: Number,
    # cintura: Number,
    # cadera: Number,
    # primer Corte: Number,
    # segundo Corte: Number,
    # largo de Falda: Number,
    # largo de Manga: Number,
    # espalda: Number,
    # cisa: Number,
    # largo de Pantalón: Number,
    # contorno de Brazo: Number,
    # puño: Number,
    # talla de Pantalon: Number,
    # talla de Camisa: Number,
    # edad: Number,
    # estatura: Number,
    # fecha de prueba: Number,
    # diseñador: String,
    # observaciones: String,
    # referencia: Number,
    # vestido_largo: true | false,
    # vestido_corto: true | false
    # importado: true | false,
    # fabricado: true | false
    # }