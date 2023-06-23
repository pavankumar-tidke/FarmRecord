import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email configuration
sender_email = 'pavankumartidke@gmail.com'
receiver_email = 'pavankumargovindtidke21@gmail.com'
subject = 'Subject of the email'
message = 'Body of the email'

# Create a MIME message
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject
msg.attach(MIMEText(message, 'plain'))

# SMTP server configuration (for Gmail)
smtp_server = 'smtp.gmail.com'
smtp_port = 587
smtp_username = 'pavankumartidke@gmail.com'
smtp_password = 'Pavan@1980'

# Create an SMTP session
with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.starttls()
    server.login(smtp_username, smtp_password)
    server.send_message(msg)
    print('Email sent successfully.')
