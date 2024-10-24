from django.shortcuts import render, redirect
from django.utils import timezone
from .forms import SolicitacaoForm

def criar_solicitacao(request):
    if request.method == 'POST':
        form = SolicitacaoForm(request.POST, request.FILES)  # Adiciona suporte para arquivos
        if form.is_valid():
            form.save()
            return redirect('listar_solicitacoes')  # Redireciona após salvar (ajuste a rota conforme necessário)
    else:
        form = SolicitacaoForm()

    today = timezone.now().strftime('%d/%m/%Y')  # Obtém a data atual
    return render(request, 'solicitacoes/criar_solicitacao.html', {'form': form, 'today': today})

def analisar_solicitacao(request):
    return render(request, 'solicitacoes/analisar_solicitacao.html')

def protocolo_novo_pedido(request):
    return render(request, 'solicitacoes/protocolo_novo_pedido.html')

def solicitacoes_analise(request):
    return render(request, 'solicitacoes/solicitacoes_analise.html')

def classificacao_solicitacoes(request):
    return render(request, 'solicitacoes/classificacao_solicitacoes.html')

def minhas_solicitacoes(request):
    return render(request, 'solicitacoes/minhas_solicitacoes.html')


def solicitacoes_para_analise(request):
    return render(request, 'solicitacoes/solicitacoes_para_analise.html')
