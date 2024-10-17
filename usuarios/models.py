from django.db import models
from django.contrib.auth.models import User

PERFIL_CHOICES = [
    ('ADMINISTRADOR', 'Administrador'),
    ('GERENTE', 'Gerente'),
    ('ATENDENTE', 'Atendente'),
    ('DEPARTAMENTAL', 'Departamental'),
    ('CIDADÃO', 'Cidadão'),
]

class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    perfil = models.CharField(max_length=15, choices=PERFIL_CHOICES)
    cpf = models.CharField(max_length=14, unique=True, null=True, blank=True)
    telefone = models.CharField(max_length=15)


    def __str__(self):
        return self.user.username