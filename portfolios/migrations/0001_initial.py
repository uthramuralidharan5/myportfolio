# Generated by Django 5.0.6 on 2024-06-12 06:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0002_remove_project_portfolio_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('work_experience', models.TextField(blank=True)),
                ('education', models.TextField(blank=True)),
                ('certifications', models.TextField(blank=True)),
                ('user_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='profiles.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='project_images/')),
                ('link', models.URLField(blank=True, null=True)),
                ('portfolio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projects', to='portfolios.portfolio')),
            ],
        ),
    ]
