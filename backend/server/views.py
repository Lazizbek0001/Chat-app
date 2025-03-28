from django.shortcuts import render
from rest_framework import viewsets 
from .models import Server
from .serializer import ServerSerializer
from rest_framework.response import Response

class ServerListView(viewsets.ViewSet):
    queryset = Server.objects.all() 

    def list(self, request):  # Correct indentation
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)
        if category:
            self.queryset = self.queryset.filter(category__name=category)
        if qty:
            self.queryset = self.queryset[: int(qty)]
        
            
        serializer = ServerSerializer(self.queryset, many=True)

        return Response(serializer.data)


