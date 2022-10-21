from email.mime.image import MIMEImage
from functools import lru_cache
from django.contrib.staticfiles import finders

@lru_cache()
def logo_helphand():
    with open(finders.find('emails/helphand.png'), 'rb') as f:
        logo_data = f.read()
    print("cos")
    logo = MIMEImage(logo_data)
    logo.add_header('Content-ID', '<helphand>')
    return logo