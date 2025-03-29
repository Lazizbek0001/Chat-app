# Generated by Django 5.1.6 on 2025-03-29 11:40

import server.models
import server.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_channel_banner_channel_icon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='channel',
            name='banner',
            field=models.ImageField(blank=True, null=True, upload_to=server.models.server_banner_upload_path, validators=[server.validators.validate_image_file_extension]),
        ),
        migrations.AlterField(
            model_name='channel',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to=server.models.server_icon_upload_path, validators=[server.validators.validate_icon_image_size, server.validators.validate_image_file_extension]),
        ),
    ]
