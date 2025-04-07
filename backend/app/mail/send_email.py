from smtplib import SMTP_SSL as SMTP
from app.core.settings import Settings
from email.message import EmailMessage



class Mailer:
    def __init__(self):
        self.settings = Settings()
        self.CLIENT = SMTP('smtp.gmail.com', 465)
        self.CLIENT.login(self.settings.EMAIL_USERNAME, self.settings.EMAIL_PASSWORD)
    
    def send_email(self, to, subject, body):
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['To'] = to
        msg['From'] = 'patriktamm04@gmail.com'
        msg.set_content(body)
        self.CLIENT.send_message(msg)