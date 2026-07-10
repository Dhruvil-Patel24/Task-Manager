from rest_framework import serializers
from .models import Task
from .validators import validate_title


class TaskSerializer(serializers.ModelSerializer):
    title = serializers.CharField(validators=[validate_title])

    class Meta:
        model = Task
        fields = [
            "id",
            "title",
            "description",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_status(self, value):
        valid_status = ["pending", "in_progress", "done"]

        if value not in valid_status:
            raise serializers.ValidationError(
                "Status must be pending, in_progress or done."
            )

        return value