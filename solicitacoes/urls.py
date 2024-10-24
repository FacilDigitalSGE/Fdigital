from django.urls import path
from . import views

urlpatterns = [
    path('solicitacoes/nova/', views.criar_solicitacao, name='criar_solicitacao'),
    path('analisar/', views.analisar_solicitacao, name='analisar_solicitacao'),
    path('novo-pedido/', views.protocolo_novo_pedido, name='protocolo_novo_pedido'),
    path('solicitacoes-analise/', views.solicitacoes_analise, name='solicitacoes_analise'),
    path('classificacao-solicitacoes/', views.classificacao_solicitacoes, name='classificacao_solicitacoes'),
    path('minhas/', views.minhas_solicitacoes, name='minhas_solicitacoes'),
    path('solicitacoes-para-analise/', views.solicitacoes_para_analise, name='solicitacoes_para_analise'),

    # Outras rotas do app solicitacoes podem ser adicionadas aqui
    
]