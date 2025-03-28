from django.shortcuts import render
from rest_framework import viewsets  # Fixed typo
from .models import Server

class ServerListView(viewsets.ViewSet):
    queryset = Server.objects.all()  # Correct indentation

    def list(self, request):  # Correct indentation
        category = request.query_params.get("category")

        if category:
            self.queryset = self.queryset.filter(category=category)  # Fixed indentation

