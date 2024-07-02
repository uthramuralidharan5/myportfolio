# profiles/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.profile_list, name='profile_list'),
    path('profile/add/', views.add_profile, name='add_profile'),
    path('profile/<int:pk>/edit/', views.edit_profile, name='edit_profile'),
    path('profile/<int:pk>/delete/', views.delete_profile, name='delete_profile'),
]
