# profiles/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile  # Correct import

@receiver(post_save, sender=Profile)
def profile_post_save(sender, instance, created, **kwargs):
    if created:
        print(f'New profile created: {instance}')
