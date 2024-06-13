from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import UserProfileForm
from .models import UserProfile


@login_required
@login_required
def profile_detail(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    return render(request, 'profiles/profile_detail.html', {'user_profile': user_profile})

@login_required
def edit_profile(request):
    user_profile, created = UserProfile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        form = UserProfileForm(request.POST, instance=user_profile)
        if form.is_valid():
            form.save()
            return redirect('profile_detail')
    else:
        form = UserProfileForm(instance=user_profile)
    return render(request, 'profiles/edit_profile.html', {'form': form})

@login_required
def profile_detail(request):
    user_profile = UserProfile.objects.get(user=request.user)
    return render(request, 'profiles/profile_detail.html', {'user_profile': user_profile})
