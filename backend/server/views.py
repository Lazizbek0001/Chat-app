from django.shortcuts import render
from rest_framework import viewsets  # Fixed typo
from .models import Server
from .serializer import ServerSerializer
from rest_framework.response import Response

class ServerListView(viewsets.ViewSet):
    queryset = Server.objects.all()  # Correct indentation

    def list(self, request):  # Correct indentation
        category = request.query_params.get("category")

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        serializer = ServerSerializer(self.queryset, many=True)

        return Response(serializer.data)


