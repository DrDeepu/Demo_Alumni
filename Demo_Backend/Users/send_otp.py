import json
import random
from flask import Blueprint,Flask,request,jsonify
from Models.models import db,User,AdminPosts
import smtplib
from datetime import datetime
from email.message import EmailMessage
from Variables.variables import MAIL_ID,MAIL_PASSWORD


email = EmailMessage()


bp = Blueprint('send_otp',__name__)

@bp.route('/send_otp',methods=['POST'])
def send_otp():
    email = json.loads(request.data)['email']
    global random_id,time
    if not User.query.filter_by(email=email).count():
        random_id = int(' '.join([str(random.randint(111111, 999999))]))
        time = datetime.now()
        smtp_connect = smtplib.SMTP(host="smtp.office365.com", port=587)
        my_mail_id = MAIL_ID
        my_password = MAIL_PASSWORD
        email["Subject"] = 'Alumni OTP Verification'
        email["From"] = my_mail_id
        email["to"] = email
        email_content = f"""Your OTP is {random_id}. And it is valid for 10 minutes."""
        email.set_content(email_content)
        smtp_connect.login(my_mail_id, my_password)
        smtp_connect.send_message(email)
        smtp_connect.quit()
        return 'Otp Send'
    else:
        return 'No Users Found'


@bp.route('/verify_otp',methods=['POST'])
def verify_otp():
    otp = json.loads(request.data)['otp']
    if datetime.now() - time <= 600:
        if random_id == otp:
            return "Verified"
        else:
            return 'Invalid Otp'
    else:
        return 'Time Expired'


@bp.route('/change_password',methods=['POST'])
def change_password():
    email = json.loads(request.data)['email']
    password = json.loads(request.data)['password']
    user = User.query.filter_by(email=email).first()
    user.password = password
    db.session.add(user)
    db.session.commit()
    return 'Password Changed'
