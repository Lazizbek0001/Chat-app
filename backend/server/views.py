from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count
from .models import Server
from .serializer import ServerSerializer
from .schema import server_list_docs

class ServerListView(viewsets.ViewSet):
    """ViewSet for retrieving a filtered list of servers."""

    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        """Retrieve a filtered list of servers based on query parameters."""

        # 🔐 Require authentication for ALL requests
        if not request.user.is_authenticated:
            raise AuthenticationFailed("Authentication required to access this resource.")

        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_server_id = request.query_params.get("by_server_id")
        with_num_members = request.query_params.get("with_num_members") == "true"

        # If filtering by user or server ID, ensure user is authenticated
        if by_user:
            self.queryset = self.queryset.filter(member=request.user.id)

        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_server_id:
            try:
                by_server_id = int(by_server_id)
            except (ValueError, TypeError):
                raise ValidationError(detail="Invalid server ID format.")

            server = Server.objects.filter(id=by_server_id).first()
            if not server:
                raise ValidationError(detail=f"Server with id {by_server_id} does not exist")

            self.queryset = Server.objects.filter(id=by_server_id)

        if qty:
            try:
                qty = int(qty)
                self.queryset = self.queryset[:qty]
            except ValueError:
                raise ValidationError(detail="Invalid quantity format.")

        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)
