from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Portfolio, Project
from profiles.models import UserProfile

@login_required
def portfolio_detail(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    portfolio, created = Portfolio.objects.get_or_create(user_profile=user_profile)
    return render(request, 'portfolios/portfolio_detail.html', {'portfolio': portfolio})

@login_required
def edit_portfolio(request):
    user_profile = request.user.userprofile
    portfolio, created = Portfolio.objects.get_or_create(user_profile=user_profile)
    if request.method == 'POST':
        form = PortfolioForm(request.POST, instance=portfolio)
        if form.is_valid():
            form.save()
            return redirect('portfolio_detail')
    else:
        form = PortfolioForm(instance=portfolio)
    return render(request, 'portfolios/edit_portfolio.html', {'form': form})

@login_required
def add_project(request):
    user_profile = request.user.userprofile
    portfolio = Portfolio.objects.get(user_profile=user_profile)
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            project = form.save(commit=False)
            project.portfolio = portfolio
            project.save()
            return redirect('portfolio_detail')
    else:
        form = ProjectForm()
    return render(request, 'portfolios/add_project.html', {'form': form})
