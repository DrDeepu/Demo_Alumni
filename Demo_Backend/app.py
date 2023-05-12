import json
import datetime
import bcrypt
import os
from flask import Flask,request
from flask import Response
from flask_cors import CORS
from flask_jwt_extended import (JWTManager,jwt_required,
get_jwt_identity,create_access_token)
from Variables.variables import (CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME
,CLOUDINARY_API_SECRET)
import cloudinary
import cloudinary.uploader
import cloudinary.api
from Models.models import db
from Models.AdminPosts import AdminPosts
from Models.PostComments import PostComments
from Models.User import User
from flask_jwt_extended import JWTManager
from Admin.upload_fetch_admin_post_image import bp as upload_fetch_admin_post_image
from Admin.approve_delete_disapprove_users import bp as approve_delete_disapprove_users
from PostComments.comments import bp as post_comments
from Users.accept_decline import bp as accept_decline
from Posts.filter_posts import bp as filter_posts
from Admin.admin_report import bp as admin_report
from Users.send_otp import bp as send_otp
from Variables.mail import mail
from flask_migrate import Migrate



app = Flask(__name__)
app.config['CORS_HEADERS'] = 'application/json'
app.debug = True
app.secret_key = 'Something-Is-Not-Right'


# Elephant SQL URI
# app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://fdbnntkj:wORnz0vouEjhYeYqDsNZuChsjieoa4uA@dumbo.db.elephantsql.com/fdbnntkj"

# PosgreSQL URI
# app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:root@localhost:5432/snm_database"

# Sqlite URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+ os.path.join(app.root_path,'snm_database.db')



app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

db.init_app(app)


migrate = Migrate(app, db)




cloudinary.config(
  cloud_name=CLOUDINARY_CLOUD_NAME,
  api_key=CLOUDINARY_API_KEY,
  api_secret=CLOUDINARY_API_SECRET
)


app.config["JWT_SECRET_KEY"] = "super-secret" 
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 60*180
jwt = JWTManager(app)



# SIGN UP API ROUTE
@app.route('/create_user',methods=['POST'])
def create_user():
    data = request.json | {}
    email = data.get('email')
    print(data)
    if not User.query.filter_by(email=email).first():
        salt = bcrypt.gensalt()
        pw_encode = data.get('password').encode('utf-8')
        hash_pw = bcrypt.hashpw(pw_encode,salt)
        data['password']=hash_pw
        data['user_profile_image_url']='https://res.cloudinary.com/dy59sbjqc/image/upload/v1683352248/Default_Images/guest-user_ct3tej.png'
        data['join_date']=datetime.datetime.now()
        User.create(**data)
        return {'status':200,'message':'User Registered Successfully'}
    else:
        return {'status':400,'message':'User email already exists'}


# LOGIN API ROUTE
@app.route('/login',methods=['POST'])
def login():
    data = request.json | {}
    email = data.get('email').lower()
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    pw_encode = password.encode('utf-8')
    if user :
        
        if (user.valid == 'false'):
            return {'status':400,'error':'Admin is yet to activate your account'}
        elif bcrypt.checkpw(pw_encode,user.password):
            access_token = create_access_token(identity={'email':email,'is_admin':user.is_admin})
            return {'user':user.firstname,'user_email':email,'access_token':access_token,'status':200}
        else:
            return {'status':400,'error':'Invalid Email or Password'}
    else:
        return {'status':400,'error':'User not Found'}
    # return 'response'


@app.route('/profile')
@jwt_required()
def my_profile():
    user_data = get_jwt_identity()
    user_email =  user_data['email']
    print(user_email)
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return ''
    response_body = {
       'firstname': user.firstname,
       'lastname': user.lastname,
       'email': user.email,
       'phone': user.phone,
       'batch':user.batch,
       'department':user.department,
       'instaid':user.instaid,
       'gitid':user.gitid,
       'linkedinid':user.linkedinid,
       'domain':user.domain,
       'company':user.company,
       'profession':user.profession,
       'company':user.company,
       'website':user.website,
       'user_profile_image_url':user.user_profile_image_url,
    }
    return response_body



@app.route('/save_profile_data',methods=["POST"])
@jwt_required()
def save_profile_data():
    data = request.json['data'] | {}
    print(data)
    email = data.get('email').lower()
    user = User.query.filter_by(email=email).first()
    url = ''
    IMAGE_URL= data.get('imageUrl')
    # if not user.user_profile_image_url :
    if  user.user_profile_image_url :
        print('NOT user.user_profile_image_url')
        if IMAGE_URL!=user.user_profile_image_url:
            print('IMAGE_URL!=user.user_profile_image_url')    
            url = cloudinary.uploader.upload(IMAGE_URL,folder='/Users')['url']
            print(url)
            user.user_profile_image_url=url
    else:
        if IMAGE_URL!=user.user_profile_image_url:
            print('IMAGE_URL!=user.user_profile_image_url SECOND')    
            public_id = user.user_profile_image_url.split('/Users/')[1].split('.')[0]
            url = cloudinary.uploader.upload(IMAGE_URL,public_id=public_id,folder='/Users')['url']
            user.user_profile_image_url=url
            print(url)
    user.firstname = data.get('firstName')
    user.lastname = data.get('lastName')
    user.phone = data.get('phoneNumber')
    user.department = data.get('department')
    user.instaid = data.get('instagramId')
    user.linkedinid = data.get('linkedinId')
    user.gitid = data.get('githubId')
    user.domain = data.get('domain')
    user.website = data.get('websiteUrl')

    user.profession = data.get('profession')
    user.company = data.get('companyName')
    # User(**data)

    db.session.add(user)
    db.session.commit()
    print(user.user_profile_image_url)
    return Response({'Updated Successfully'})

    # user = User.query


@app.route('/dashboard',methods=['GET','POST'])
@jwt_required()
def dashboard():
    return Response(['Data added Successfully'])




@app.route('/admin',methods=['GET','POST'])
@jwt_required()
def admin_panel():
    users = User.query.all()
    return users




@app.route('/all_users',methods=['GET','POST'])
# @jwt_required()
def all_users():
    user_data = {}
    for i in User.query.all():
        if i.email == 'admin@email.com':
            continue
        user_data[i.email] = {'firstname': i.firstname, 'lastname': i.lastname, 'email': i.email, 'phone': i.phone,
        'batch':i.batch,
        'department':i.department,
        'instaid':i.instaid,
        'gitid':i.gitid,
        'linkedinid':i.linkedinid,
        'domain':i.domain,
        'profession':i.profession,
        'company':i.company,
        'website':i.website,
        'user_profile_image_url':i.user_profile_image_url,
        # 'password':i.password,
        'valid':i.valid,}
    # print(user_data)
    return user_data


@app.route('/user_count',methods=['GET'])
# @jwt_required()
def user_count():
    # print(True)
    user_data = {}
    total_users = 0
    valid_users = 0
    not_valid_users = 0
    for i in User.query.all():
        if i.email == 'admin@email.com':
            continue
        if i.valid == 'false':
            not_valid_users += 1
        if i.valid == 'true':
            valid_users += 1
        total_users += 1
    user_data['total_users'] = total_users
    user_data['valid_users'] = valid_users
    user_data['not_valid_users'] = not_valid_users
    return user_data

app.register_blueprint(approve_delete_disapprove_users)


# Add Admin Post Data in AdminPost Table and Add Image to Cloudinary to Admin_Posts folder
@app.route('/upload_admin_post', methods=['GET', 'POST'])
def upload_admin_post():

    file = request.files['file']
    post_title=request.form['post_title']
    post_description=request.form['post_description']
    event_start_date = request.form['event_start_date']
    event_start_time = request.form['event_start_time']
    event_end_date = request.form['event_end_date']
    event_end_time = request.form['event_end_time']
    insta_check = request.form['insta_check']
    mail_check = request.form['mail_check']
    create_date = datetime.datetime.now()
    print(event_end_time)


    admin_image_url = cloudinary.uploader.upload(file,folder='/Admin_Posts')
    date_time = datetime.datetime.now()
    post_image_url = admin_image_url['url']
    post = AdminPosts(
    post_title=post_title,
    post_description=post_description, 
    post_date=date_time, 
    post_image_url= post_image_url, 
    post_event_start_date=event_start_date, 
    post_event_start_time=event_start_time, 
    post_event_end_date = event_end_date, 
    post_event_end_time= event_end_time,
    create_date=create_date,
    )
    db.session.add(post)
    db.session.commit()
    if mail_check == 'true':
        mail_data = json.loads(request.form['mailData'])
        mail_subject = mail_data['mailSubject']
        mail_title = mail_data['mailTitle']
        mail_description = mail_data['mailDescription']
        alumni = mail_data['alumni']
        if len(alumni) == 0:
            users = User.query.all()
            for i in users:
                if i.email == 'admin@email.com':
                    continue
                mail(image_url=post_image_url, mail_recipient_email=i.email,
                     recipient_name=i.firstname + ' ' + i.lastname, event_title=mail_title,
                     event_subject = mail_subject,
                     event_description=mail_description, event_start_date=event_start_date,
                     event_start_time=event_start_time, event_end_date=event_end_date, event_end_time=event_end_time)

        elif len(alumni) > 0:
            for i in alumni:
                mail(image_url=post_image_url, mail_recipient_email=i['email'],
                     recipient_name = i['firstname']+' '+i['lastname'], event_title=post_title,
                     event_description=post_description, event_start_date=event_start_date,
                     event_subject=mail_subject,
                     event_start_time=event_start_time, event_end_date=event_end_date, event_end_time=event_end_time)

    return Response("Successfully Created The Post")



# Fetch Admin Post Data from AdminPost Table and Fetch Image from Cloudinary Folder Admin_Posts
@app.route('/fetch_all_admin_post',methods=['GET','POST'])
def fetch_admin_post():
    post_data ={}
    for i in AdminPosts.query.all():
        post_data[i.id]={
            'post_id' : i.id,
            'post_title':i.post_title,
            'post_description':i.post_description,
            'post_date':i.post_date,
            'post_event_start_date':i.post_event_start_date,
            'post_event_start_time':i.post_event_start_time,
            'post_event_end_date':i.post_event_end_date,
            'post_event_end_time':i.post_event_end_time,
            'post_image_url':i.post_image_url
        }
    return post_data

@app.route('/delete_admin_post',methods=['GET','POST'])
def delete_admin_post_image():
    post_id = json.loads(request.data)['data']['post_id']
    # print(post_id)
    post_object = AdminPosts.query.get(post_id)
    image_url = post_object.post_image_url
    publicid = cloudinary.utils.cloudinary_url(image_url, type='upload')[0].split('/')[-1].split('.')[0]
    post_comment = PostComments.query.filter_by(post_id=str(post_id))
    post_comment.delete()
    db.session.commit()
    db.session.delete(post_object)
    db.session.commit()
    response = cloudinary.uploader.destroy('Admin_Posts/'+publicid)
    # print(image_url)
    return response



@app.route('/update_admin_post',methods=['GET','POST'])
def update_admin_post():
    post_id = json.loads(request.data)['data']['post_id']
    post_title = json.loads(request.data)['data']['post_title']
    post_description = json.loads(request.data)['data']['post_description']
    post_date = datetime.datetime.now()
    post_event_start_date = json.loads(request.data)['data']['post_event_start_date']
    post_event_start_time = json.loads(request.data)['data']['post_event_start_time']
    post_event_end_date = json.loads(request.data)['data']['post_event_end_date']
    post_event_end_time = json.loads(request.data)['data']['post_event_end_time']
    post_image_url = json.loads(request.data)['data']['post_image_url']
    admin_post = AdminPosts.query.get(post_id)
    admin_post.post_title = post_title
    admin_post.post_description = post_description
    admin_post.post_date = post_date
    admin_post.post_event_start_date = post_event_start_date
    admin_post.post_event_start_time = post_event_start_time
    admin_post.post_event_end_date = post_event_end_date
    admin_post.post_event_end_time = post_event_end_time
    admin_post.post_image_url = post_image_url
    db.session.commit()
    return Response("Successfully Updated")

#
app.register_blueprint(accept_decline)


# Upload and Fetch Image from Cloudinary (Single Post, which gives image url)
app.register_blueprint(upload_fetch_admin_post_image)

# Comment in Posts 
app.register_blueprint(post_comments)

# Admin Page Reports
app.register_blueprint(admin_report)


# app.register_blueprint(send_otp)

# Filter Fetch Posts 
app.register_blueprint(filter_posts)


# Upload User Image to Cloudinary
@app.route('/uploadimage',methods=['GET','POST'])
def uploadimage():
    file = request.files['file']
    global url
    value = 'kzsgvupe8ooitbik8d1l'
    url = 'http://res.cloudinary.com/dy59sbjqc/image/upload/v1680858857/Users/kzsgvupe8ooitbik8d1l.jpg'
    public_id = url.split('/Users/')[1].split('.')[0]
    return Response("Successfully Uploaded Image")


if __name__=='__main__':
    # app.run()
    app.run()