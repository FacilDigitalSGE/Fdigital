from django.urls import path
from django.contrib.auth.views import LogoutView, LoginView
from .views import register  # Alterando para importar a função correta

urlpatterns = [
    path('login/', LoginView.as_view(template_name='usuarios/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('register/', register, name='register'),  # Atualizando para usar a função register
]
