from django.db import models
from profiles.models import UserProfile


class Portfolio(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    work_experience = models.TextField(blank=True)
    education = models.TextField(blank=True)
    certifications = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user_profile.user.username}'s Portfolio"


class Project(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
