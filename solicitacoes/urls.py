from django.urls import path
from . import views



urlpatterns = [
    path('nova/', views.criar_solicitacao, name='criar_solicitacao'),
    path('analisar/', views.analisar_solicitacao, name='analisar_solicitacao'),
    path('novo-pedido/', views.protocolo_novo_pedido, name='protocolo_novo_pedido'),
    path('analise/', views.solicitacoes_analise, name='solicitacoes_analise'),
    path('classificacao/', views.classificacao_solicitacoes, name='classificacao_solicitacoes'),
    path('minhas/', views.minhas_solicitacoes, name='minhas_solicitacoes'),
    path('para-analise/', views.solicitacoes_para_analise, name='solicitacoes_para_analise'),
    path('aguardando/', views.aguardando_analise_view, name='aguardando_analise'),
    path('em-analise/', views.solicitacao_em_analise, name='solicitacao_em_analise'),
    path('com-pendencia/', views.solicitacao_com_pendencia, name='solicitacao_com_pendencia'),
    path('concluida/', views.solicitacao_concluida, name='solicitacao_concluida'),
    path('encaminhada/', views.solicitacao_encaminhada, name='solicitacao_encaminhada'),
    path('cancelada/', views.solicitacao_cancelada, name='solicitacao_cancelada'),
    path('cancelada-sistema/', views.solicitacao_cancelada_sistema, name='solicitacao_cancelada_sistema'),
    path('novas-solicitacoes/', views.novas_solicitacoes, name='novas_solicitacoes'),
    path('api/toggle-urgent/', views.toggle_urgent, name='toggle_urgent'),

]    
