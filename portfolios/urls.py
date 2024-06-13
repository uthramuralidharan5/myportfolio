from django.urls import path
from . import views

urlpatterns = [
    path('edit/', views.edit_portfolio, name='edit_portfolio'),
    path('', views.portfolio_detail, name='portfolio_detail'),
    path('add/', views.add_project, name='add_project'),
]

