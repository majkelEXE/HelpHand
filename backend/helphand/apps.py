from django.apps import AppConfig
from django_rest_passwordreset.signals import reset_password_token_created

class HelphandConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'helphand'

    def ready(self):
        from . import signals
        reset_password_token_created.connect(signals.password_reset_token_created)