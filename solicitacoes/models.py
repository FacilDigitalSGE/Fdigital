from django.db import models
from django.contrib.auth.models import User  # Relacionado ao modelo de usuário padrão do Django
from usuarios.models import Perfil  # Relacionado ao perfil do usuário que inclui CPF/CNPJ e telefone

class Solicitacao(models.Model):
    STATUS_CHOICES = [
        ('aguardando_analise', 'Aguardando Análise'),
        ('em_analise', 'Em Análise'),
        ('com_pendencia', 'Com Pendência'),
        ('concluida', 'Concluída'),
        ('encaminhada', 'Encaminhada'),
        ('cancelada_sistema', 'Cancelada pelo Sistema'),
        ('cancelada_usuario', 'Cancelada pelo Usuário'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='solicitacoes')
    protocolo = models.CharField(max_length=25, unique=True)
    assunto = models.CharField(max_length=255)
    descricao = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='aguardando_analise')
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_conclusao = models.DateTimeField(null=True, blank=True)

    # Novos campos adicionados
    ultimo_analista = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='analisou_solicitacoes')
    requerente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requerente_solicitacoes')
    cpf_cnpj = models.CharField(max_length=14, blank=True, null=True)  # Puxado de Perfil
    telefone = models.CharField(max_length=15, blank=True, null=True)  # Puxado de Perfil
    
    inscricao_imobiliaria = models.CharField(max_length=8, blank=True, null=True)
    inscricao_mobiliaria = models.CharField(max_length=8, blank=True, null=True)
    cadastro = models.CharField(max_length=8, blank=True, null=True)
    def __str__(self):
        return self.protocolo

    def save(self, *args, **kwargs):
        """
        Sobrescreve o método save para garantir que os dados de CPF/CNPJ e telefone do
        requerente sejam populados a partir do perfil do usuário.
        """
        if self.requerente:
            perfil = Perfil.objects.filter(user=self.requerente).first()
            if perfil:
                self.cpf_cnpj = perfil.cpf
                self.telefone = perfil.telefone
        super(Solicitacao, self).save(*args, **kwargs)
