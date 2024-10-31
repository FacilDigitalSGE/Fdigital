from django.shortcuts import render, redirect
from django.utils import timezone
from .forms import SolicitacaoForm
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json


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

def novas_solicitacoes(request):
    table_data = [
        ["78550", "Análise de Documentos", "22/10/2024", "João Silva", "123.456.789-00", "(11) 98765-4321", "joao@email.com", "20/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': True, 'urgent': False}}}],
        ["78551", "Renovação de Licença", "23/10/2024", "Maria Santos", "987.654.321-00", "(11) 91234-5678", "maria@email.com", "21/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': False, 'urgent': True}}}],
        ["78552", "Alteração Cadastral", "24/10/2024", "Pedro Alves", "456.789.123-00", "(11) 94567-8901", "pedro@email.com", "22/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': False, 'urgent': False}}}]
    ]

    columns = ["Nº Protocolo", "Assunto", "Data Atribuição", "Solicitante", "CPF/CNPJ", "Telefone", "E-mail", "Data Entrada", "Prioridade"]

    return render(request, 'solicitacoes/novas_solicitacoes.html', {
        'table_data': table_data,
        'columns': columns
    })

def solicitacoes_analise(request):
    table_data = [
        ["2024001", "Maria Santos", "Análise de Documentação", "22/10/2024", "João Silva", "123.456.789-00", "20/10/2024", "25/10/2024", "19/10/2024", "Urgente", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': True, 'urgent': True}}}],
        ["2024002", "Pedro Alves", "Renovação de Licença", "23/10/2024", "Ana Costa", "987.654.321-00", "21/10/2024", "26/10/2024", "20/10/2024", "Normal", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': False, 'urgent': False}}}],
        ["2024003", "Carlos Lima", "Alteração Cadastral", "24/10/2024", "Lucas Mendes", "456.789.123-00", "22/10/2024", "27/10/2024", "21/10/2024", "Urgente", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': False, 'urgent': True}}}]
    ]
    
    columns = ["Protocolo", "Atendente", "Assunto", "Data Atribuição", "Requerente", "CPF/CNPJ", "Data Inclusão", "Data Devolução", "Data Entrada", "Classificação", "Prioridade"]
    
    return render(request, 'solicitacoes/solicitacoes_analise.html', {
        'table_data': table_data,
        'columns': columns
    })

def classificacao_solicitacoes(request):
    checkbox = mark_safe('<input type="checkbox" class="select-row">')
    
    table_data = [
        [checkbox, "2024001", "23/10/2024", "Maria Santos", "Pedido de Licenciamento", "João Silva", "Licenciamento DRM VRE", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': True, 'urgent': True}}}],
        [checkbox, "2024002", "24/10/2024", "Pedro Alves", "Renovação de Licença", "Ana Costa", "Licenciamento ITBI", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': False, 'urgent': False}}}],
        [checkbox, "2024003", "25/10/2024", "Carlos Lima", "Alteração Cadastral", "Lucas Mendes", "Licenciamento DRM VRE", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': True, 'urgent': False}}}]
    ]
    
    columns = ["Selecionar", "Protocolo", "Data Entrada", "Solicitante", "Assunto", "Último Analista", "Classificação", "Prioridade"]
    
    return render(request, 'solicitacoes/classificacao_solicitacoes.html', {
        'table_data': table_data,
        'columns': columns
    })
from django.utils.safestring import mark_safe

from django.shortcuts import render
from django.utils.safestring import mark_safe

from django.shortcuts import render
from django.utils.safestring import mark_safe

def minhas_solicitacoes(request):
    def get_status_html(status):
        icons = {
            'Aguardando análise': ('info', 'status-processed'),
            'Em análise': ('search', 'status-warning'),
            'Concluída': ('check-circle', 'status-success'),
            'Encaminhada': ('check-circle', 'status-success'),
            'Com Pendência': ('alert-circle', 'status-warning'),
            'Cancelada': ('x-circle', 'status-failed'),
            'Cancelada pelo Sistema': ('x-circle', 'status-failed'),  # Mesmo ícone e cor de 'Cancelada'
            'Cancelada pelo Usuário': ('x-circle', 'status-failed')   # Mesmo ícone e cor de 'Cancelada'
        }

        urls = {
            'Aguardando análise': 'aguardando_analise',
            'Em análise': 'solicitacao_em_analise',
            'Concluída': 'solicitacao_concluida',
            'Encaminhada': 'solicitacao_encaminhada',
            'Com Pendência': 'solicitacao_com_pendencia',
            'Cancelada': 'solicitacao_cancelada',           # URL para "Cancelada pelo Usuário"
            'Cancelada pelo Sistema': 'solicitacao_cancelada_sistema',  # Nova URL para "Cancelada pelo Sistema"
            'Cancelada pelo Usuário': 'solicitacao_cancelada'           # Mesma URL para "Cancelada pelo Usuário"
        }

        icon, class_name = icons.get(status, ('info', 'status-incomplete'))
        url_name = urls.get(status, '')

        return {
            'html': mark_safe(f'<span class="{class_name}"><i data-lucide="{icon}"></i> {status}</span>'),
            'url': url_name
        }

    # Dados das solicitações com os status específicos
    table_data = [
        ["54321", get_status_html("Aguardando análise"), "Requerimento de Alvará", "10/10/2024"],
        ["13579", get_status_html("Em análise"), "Solicitação de Licença", "29/09/2024"],
        ["13579", get_status_html("Com Pendência"), "Pedido de Isenção", "28/09/2024"],
        ["33445", get_status_html("Encaminhada"), "Autorização para Obra", "12/09/2024"],
        ["55667", get_status_html("Cancelada pelo Usuário"), "Cancelamento de Contrato", "10/09/2024"],  # Exibindo "Cancelada pelo Usuário"
        ["77889", get_status_html("Cancelada pelo Sistema"), "Solicitação de Transferência", "01/09/2024"],  # Exibindo "Cancelada pelo Sistema"
        ["11223", get_status_html("Concluída"), "Renovação de Licença", "15/09/2024"]
    ]

    columns = ["Inscrição/Cadastro", "Situação", "Assunto", "Data Solicitação"]

    return render(request, 'solicitacoes/minhas_solicitacoes.html', {
        'table_data': table_data,
        'columns': columns
    })


def solicitacoes_para_analise(request):
    table_data = [
        ["78550", "Análise de Documentos", "22/10/2024", "João Silva", "123.456.789-00", "(11) 98765-4321", "joao@email.com", "20/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': True, 'urgent': False}}}],
        ["78551", "Renovação de Licença", "23/10/2024", "Maria Santos", "987.654.321-00", "(11) 91234-5678", "maria@email.com", "21/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': False, 'urgent': True}}}],
        ["78552", "Alteração Cadastral", "24/10/2024", "Pedro Alves", "456.789.123-00", "(11) 94567-8901", "pedro@email.com", "22/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': True, 'urgent': True}}}]
    ]

    columns = ["Nº Protocolo", "Assunto", "Data Atribuição", "Solicitante", "CPF/CNPJ", "Telefone", "E-mail", "Data Entrada", "Prioridade"]

    return render(request, 'solicitacoes/solicitacoes_para_analise.html', {
        'table_data': table_data,
        'columns': columns
    })

def aguardando_analise_view(request):
      return render(request, 'solicitacoes/aguardando_analise.html')

def solicitacao_em_analise(request):
    return render(request, 'solicitacoes/em_analise.html')

def solicitacao_com_pendencia(request):
    return render(request, 'solicitacoes/com_pendencia.html')

def solicitacao_concluida(request):
    return render(request, 'solicitacoes/concluida.html')

def solicitacao_encaminhada(request):
    return render(request, 'solicitacoes/encaminhada.html')

def solicitacao_cancelada(request):
    return render(request, 'solicitacoes/cancelada.html')

def solicitacao_cancelada_sistema(request):
    return render(request, 'solicitacoes/cancelada_sistema.html')

from django.urls import reverse
from django.shortcuts import render

from django.urls import reverse
from django.shortcuts import render
from django.utils.safestring import mark_safe

def novas_solicitacoes(request):
    # Adicione links para a coluna "Nº Protocolo"
    table_data = [
        [mark_safe(f'<a href="{reverse("analisar_solicitacao")}?protocolo=78550">78550</a>'), "Análise de Documentos", "22/10/2024", "João Silva", "123.456.789-00", "(11) 98765-4321", "joao@email.com", "20/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': True, 'urgent': False}}}],
        [mark_safe(f'<a href="{reverse("analisar_solicitacao")}?protocolo=78551">78551</a>'), "Renovação de Licença", "23/10/2024", "Maria Santos", "987.654.321-00", "(11) 91234-5678", "maria@email.com", "21/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': False, 'urgent': True}}}],
        [mark_safe(f'<a href="{reverse("analisar_solicitacao")}?protocolo=78552">78552</a>'), "Alteração Cadastral", "24/10/2024", "Pedro Alves", "456.789.123-00", "(11) 94567-8901", "pedro@email.com", "22/10/2024", {'template': 'components/priority_column.html', 'context': {'priority': {'elderly': False, 'urgent': False}}}]
    ]

    columns = ["Nº Protocolo", "Assunto", "Data Atribuição", "Solicitante", "CPF/CNPJ", "Telefone", "E-mail", "Data Entrada", "Prioridade"]

    return render(request, 'solicitacoes/novas_solicitacoes.html', {
        'table_data': table_data,
        'columns': columns
    })



def toggle_urgent(request):
    data = json.loads(request.body)
    priority_id = data.get('priority_id')
    urgent = data.get('urgent')
    
    try:
        priority = Priority.objects.get(id=priority_id)
        priority.urgent = urgent
        priority.save()
        return JsonResponse({'success': True})
    except Priority.DoesNotExist:
        return JsonResponse({'success': False}, status=404)
