from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    email = models.EmailField()
    bio = models.TextField()
    image = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    added_by = models.CharField(max_length=100)

    def __str__(self):
        return self.name


