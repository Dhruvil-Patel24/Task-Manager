from rest_framework import generics
from rest_framework.exceptions import ValidationError
from .models import Task
from .serializers import TaskSerializer


class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    VALID_STATUS = [
        "pending",
        "in_progress",
        "done",
    ]

    def get_queryset(self):

        queryset = Task.objects.all().order_by("created_at")

        status = self.request.query_params.get("status")

        if status:

            if status not in self.VALID_STATUS:
                raise ValidationError(
                    {
                        "status": "Invalid status. Choose from pending, in_progress or done."
                    }
                )

            queryset = queryset.filter(status=status)

        return queryset


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer