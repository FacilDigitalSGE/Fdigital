from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Perfil, PERFIL_CHOICES

class RegistroForm(UserCreationForm):
    perfil = forms.ChoiceField(choices=PERFIL_CHOICES, label="Perfil")
    cpf = forms.CharField(max_length=14, label="CPF")
    telefone = forms.CharField(max_length=15, label="Telefone")

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'perfil', 'cpf', 'telefone']

    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
            perfil = Perfil(
                user=user,
                perfil=self.cleaned_data['perfil'],
                cpf=self.cleaned_data['cpf'],
                telefone=self.cleaned_data['telefone']
            )
            perfil.save()
        return user
