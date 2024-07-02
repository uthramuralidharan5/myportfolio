from django import forms
from .models import Profile

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['name', 'role', 'email', 'bio', 'image', 'linkedin', 'twitter', 'added_by']

