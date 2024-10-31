from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import RegistroForm

def register(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')  # Substitua pela URL correta após o login
    else:
        form = RegistroForm()
    return render(request, 'usuarios/register.html', {'form': form})
