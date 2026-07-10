from rest_framework.exceptions import ValidationError


def validate_title(title):
    if not title.strip():
        raise ValidationError("Title cannot be empty.")

    if len(title) < 3:
        raise ValidationError("Title must be at least 3 characters long.")

    return title    