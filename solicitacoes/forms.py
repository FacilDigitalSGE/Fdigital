from django import forms
from .models import Solicitacao

class SolicitacaoForm(forms.ModelForm):
    class Meta:
        model = Solicitacao
        fields = ['assunto', 'descricao', 'inscricao_imobiliaria', 'inscricao_mobiliaria', 'cadastro']
        
        widgets = {
            'assunto': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Digite o assunto da solicitação',
            }),
            'descricao': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Descreva sua solicitação...',
            }),
            'inscricao_imobiliaria': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Inscrição Imobiliária',
            }),
            'inscricao_mobiliaria': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Inscrição Mobiliária',
            }),
            'cadastro': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Cadastro',
            }),
        }

    def __init__(self, *args, **kwargs):
        super(SolicitacaoForm, self).__init__(*args, **kwargs)
        self.fields['assunto'].label = 'Assunto da Solicitação'
        self.fields['descricao'].label = 'Descrição da Solicitação'
        self.fields['inscricao_imobiliaria'].label = 'Inscrição Imobiliária'
        self.fields['inscricao_mobiliaria'].label = 'Inscrição Mobiliária'
        self.fields['cadastro'].label = 'Cadastro'
