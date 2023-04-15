"""
A program to send mail using outlook.com or gmail.com without using any browser.
"""
import smtplib
from email.message import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from .variables import MAIL_ID,MAIL_PASSWORD

email = EmailMessage()
def mail(image_url='',mail_recipient_email='',event_subject='',recipient_name='',event_title='',event_description='',event_start_date='',event_start_time='',event_end_date='',event_end_time=''):
    # Email configuration
    sender_email = MAIL_ID
    sender_password = MAIL_PASSWORD
    recipient_email = mail_recipient_email
    subject = event_subject

    # Calendar event configuration
    event_title = event_title
    # event_location = 'Virtual Meeting Room'
    event_start = event_start_date+event_start_time
    event_end = event_end_date+event_end_time
    event_description = event_description

    # Create the email message
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = subject

    # Create the HTML content for the email
    html_content = f"""
    <html>
    <head></head>
    <body>
    <h1>{event_title}</H1>
        <p>Hi, {recipient_name}</p>
        <p>Please find attached a meeting invitation for the following event:</p>
        <div align='center'><img src='{image_url}' width='100px' height='100px'/></div>
        <ul>
        <li>Start Time : {event_start_date} at {event_start_time}</li>
        <li>End Time : {event_end_date} at {event_end_time}</li>
        <li>Description: {event_description}</li>
        </ul>
        <a href='http://localhost:3000/userpostspage'>View Post in Alumni Site</a>
        <p>To accept the meeting invitation, simply click the "Accept" button in the attached calendar event.</p>
        <p>Regards,</p>
        <p>Admin</p>
        <p>Uka Tarsadia University</p>
    </body>
    </html>
    """

    # Attach the HTML content to the message
    html_part = MIMEText(html_content, 'html')
    message.attach(html_part)



    # DTEND:{event_end}
    # LOCATION:{event_location}

    # Create the iCalendar attachment for the calendar event
    ical_content = f"""BEGIN:VCALENDAR
    PRODID:-//Microsoft Corporation//Outlook 16.0 MIMEDIR//EN
    VERSION:2.0
    METHOD:REQUEST
    BEGIN:VEVENT
    DTSTART:{event_start}
    DESCRIPTION:{event_description}
    SUMMARY:{event_title}
    PRIORITY:5
    CLASS:PUBLIC
    TRANSP:OPAQUE
    STATUS:CONFIRMED
    SEQUENCE:0
    BEGIN:VALARM
    ACTION:DISPLAY
    DESCRIPTION:REMINDER
    TRIGGER;RELATED=START:-PT15M
    END:VALARM
    END:VEVENT
    END:VCALENDAR
    """

    ical_part = MIMEApplication(ical_content, _subtype='text/calendar', name='meeting.ics')
    message.attach(ical_part)

    # Connect to the SMTP server and send the email
    with smtplib.SMTP('smtp.office365.com', 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, message.as_string())
# mail()
