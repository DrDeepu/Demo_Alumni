import json
import bcrypt
from flask import Blueprint,request,Response
from itsdangerous import URLSafeSerializer
from Models.models import db
from Models.User import User
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from Variables.variables import MAIL_ID,MAIL_PASSWORD


SECRET_KEY = 'THIS_is_LAST_message'

bp = Blueprint('send_otp',__name__)


def first_result():
    print('processing')
    return {'status': 699, 'message': 'We are processing your request'}

def final_result():
    print('Mail Send')
    return {'status': 700, 'message': 'We are processing your request'}

@bp.route('/valid_user',methods=['POST'])
def valid_user():
    email = json.loads(request.data)['email']
    if (User.query.filter_by(email=email).count()) != 0:
        return "We are processing your request"
    else:
        return Response(status=400)

@bp.route('/send_otp',methods=['GET','POST'])
def send_otp():
    email = json.loads(request.data)['email']
    # # print(email)
    # email = 'deepu2946@email.com'
    # if (User.query.filter_by(email=email).count()) != 0:
        # first_result()
        # email = json.loads(request.data)['email']
    date_format = '%Y-%m-%d %H:%M:%S'
    time = datetime.now().strftime(date_format)
    data = {'email':email,'time':time}
    serializer = URLSafeSerializer(SECRET_KEY)
    token = serializer.dumps(data)
    smtp_connect = smtplib.SMTP(host="smtp.office365.com", port=587)
    smtp_connect.starttls()
    my_mail_id = MAIL_ID
    my_password = MAIL_PASSWORD
    body = f"""<h2 align='center'>OTP for Reset Password</h2>
           <p>Please click on Change Password below for Resetting password. <br>Note : Link is valid for 10 minutes
           </p><br>
           <a href='http://localhost:3000/reset_password/?token={token}'>Change Password</a>"""
    msg = MIMEMultipart('alternative')
    msg["Subject"] = 'Alumni reset password'
    msg["From"] = my_mail_id
    msg["to"] = email
    html_body = MIMEText(body, 'html')
    msg.attach(html_body)
    smtp_connect.login(my_mail_id, my_password)
    smtp_connect.sendmail(my_mail_id, email, msg.as_string())
    smtp_connect.quit()
    return 'Mail Send'



@bp.route('/change_password',methods=['POST'])
def change_password():
    token = json.loads(request.data)['token']
    if token:
        date_format = '%Y-%m-%d %H:%M:%S'
        current_time = datetime.now()
        serializer = URLSafeSerializer(SECRET_KEY)
        token_time = datetime.strptime(serializer.loads(token)['time'],date_format)
        if (current_time-token_time).total_seconds()<=600:
            email = serializer.loads(token)['email']
            password = json.loads(request.data)['password']
            user = User.query.filter_by(email=email).first()
            salt = bcrypt.gensalt()
            pw_encode = password.encode('utf-8')
            hash_pw = bcrypt.hashpw(pw_encode, salt)
            user.password = hash_pw
            db.session.add(user)
            db.session.commit()
            return 'Password Changed Successfully'
        else:
            return 'Token Expired'
    else:
        return Response(status=400)