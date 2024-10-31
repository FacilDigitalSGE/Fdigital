from django.db import models
from django.contrib.auth.models import User

# Definindo as opções de perfil
PERFIL_CHOICES = [
    ('ADMINISTRADOR', 'Administrador'),
    ('GERENTE', 'Gerente'),
    ('ATENDENTE', 'Atendente'),
    ('DEPARTAMENTAL', 'Departamental'),
    ('CIDADÃO', 'Cidadão'),
]

# Modelo de Perfil que estende as informações do User
class Perfil(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Cria uma relação um-para-um com User
    perfil = models.CharField(max_length=15, choices=PERFIL_CHOICES)  # Campo para o tipo de perfil
    cpf = models.CharField(max_length=14, unique=True, null=True, blank=True)  # CPF com restrição de unicidade
    telefone = models.CharField(max_length=15, blank=True, null=True)  # Campo de telefone que pode ser nulo

    def __str__(self):
        return self.user.username  # Retorna o nome de usuário
