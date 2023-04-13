import json
import datetime
from django.http import Http404

from flask import Flask,request
from flask import Response
from flask_cors import CORS
from flask import jsonify
from flask_admin import Admin
from flask_admin.contrib.sqla  import ModelView
from flask_jwt_extended import (JWTManager,jwt_required,
get_jwt_identity,create_access_token)
from Variables.variables import (CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME
,CLOUDINARY_API_SECRET)
import cloudinary
import cloudinary.uploader
import cloudinary.api
from Models.models import db,User,AdminPosts,PostComments,PostAcceptUsers
from flask_jwt_extended import JWTManager
from Admin.upload_fetch_admin_post_image import bp as upload_fetch_admin_post_image
from Admin.approve_delete_disapprove_users import bp as approve_delete_disapprove_users
from PostComments.comments import bp as post_comments
from Users.accept_decline import bp as accept_decline
from Variables.mail import mail


# bot = Bot()
# bot.login(username = '',password='')
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'application/json'
app.debug = True
app.secret_key = 'Something-Is-Not-Right'
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:root@localhost:5432/snm_database"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

# db = SQLAlchemy(app)
db.init_app(app)

admin = Admin(app)

cloudinary.config(
  cloud_name=CLOUDINARY_CLOUD_NAME,
  api_key=CLOUDINARY_API_KEY,
  api_secret=CLOUDINARY_API_SECRET
)


app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 60*180
jwt = JWTManager(app)
# jwt.init_app(app)



# SIGN UP API ROUTE
@app.route('/create_user',methods=['POST'])
def create_user():
    firstname = json.loads(request.data)['data']['firstname']
    lastname = json.loads(request.data)['data']['lastname']
    email= json.loads(request.data)['data']['email']
    password = json.loads(request.data)['data']['password']
    phone = json.loads(request.data)['data']['phone']
    image_url = 'https://res.cloudinary.com/dy59sbjqc/image/upload/v1681290246/Users/Blank-Avatar_ava9yt.png'
    user = User(firstname=firstname,lastname=lastname,email=email,phone=phone, password=password,user_profile_image_url=image_url)
    db.session.add(user)
    db.session.commit()
    return Response(['Data added Successfully'])


# LOGIN API ROUTE
@app.route('/login',methods=['GET','POST'])
def login():
    email= json.loads(request.data)['data']['email']
    password = json.loads(request.data)['data']['password']
    user = db.one_or_404(db.select(User).filter_by(email=email,password=password))
    print(user.email)
    if user.email == 'admin@email.com':
        access_token = create_access_token(identity=email)
        return {'user':user.firstname,'user_email':email,'admin':True,'access_token':access_token}
    elif user.valid == 'true':
        access_token = create_access_token(identity=email)
        response = {'user':user.firstname,'user_email':email,'admin':False,'access_token':access_token}
        return response
    elif user.valid == 'true':
        return Http404({'error':'Admin is yet to approve your Account. Please wait till then.'})
    else:
        return Http404({'error':'User not Found'})
    # return response

@app.route('/access_user_validation',methods=['GET'])
@jwt_required()
def access_user_validation():
    access_user = get_jwt_identity()
    print('Acess User ',access_user)
    return {'access_user':access_user}


@app.route('/profile')
@jwt_required()
def my_profile():
    user_email =  get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    # print(user.website)
    response_body = {
       'firstname': user.firstname,
       'lastname': user.lastname,
       'email': user.email,
       'phone': user.phone,
        # 'password':user.password,
       'instaid':user.instaid,
       'gitid':user.gitid,
       'linkedinid':user.linkedinid,
       'domain':user.domain,
       'company':user.company,
       'profession':user.profession,
       'company':user.company,
       'website':user.website,
       'user_profile_image_url':user.user_profile_image_url,
       'jwt':get_jwt_identity()
    }
    print(user.user_profile_image_url)
    if user.email == 'admin@email.com' and user.password == 'admin1':
        response_body['admin']=True
    else:
        response_body['admin']=False
    return response_body


@app.route('/save_profile_data',methods=["POST"])
# @jwt_required
def save_profile_data():
    
    email = json.loads(request.data)['data']['email']
    user = User.query.filter_by(email=email).first()
    url = ''
    IMAGE_URL= json.loads(request.data)['data']['imageUrl']
    print(user.user_profile_image_url)
    print(IMAGE_URL)
    if not user.user_profile_image_url:
        print('not present')
        url = cloudinary.uploader.upload(IMAGE_URL,folder='/Users')['url']
        # print(url)
    else:
        print('present')
        public_id = user.user_profile_image_url.split('/Users/')[1].split('.')[0]
        url = cloudinary.uploader.upload(IMAGE_URL,public_id=public_id,folder='/Users')['url']
        # print(url)
    print(json.loads(request.data)["data"]["websiteUrl"])
    user.firstname = json.loads(request.data)['data']['firstName']
    user.lastname = json.loads(request.data)['data']['lastName']
    user.phone = json.loads(request.data)['data']['phoneNumber']
    user.instaid = json.loads(request.data)['data']['instagramId']
    user.linkedinid = json.loads(request.data)['data']['linkedinId']
    user.gitid = json.loads(request.data)['data']['githubId']
    user.domain = json.loads(request.data)['data']['domain']
    user.website = json.loads(request.data)['data']['websiteUrl']

    user.profession = json.loads(request.data)['data']['profession']
    user.company = json.loads(request.data)['data']['companyName']
    user.user_profile_image_url=url
    # print(user.user_profile_image_url)
    db.session.commit()
    print(user.user_profile_image_url)
    print(url)
    # print(user.firstname)
    return Response({'Updated Successfully'})

    # user = User.query


@app.route('/dashboard',methods=['GET','POST'])
@jwt_required()
def dashboard():
    return Response(['Data added Successfully'])




@app.route('/admin',methods=['GET','POST'])
@jwt_required()
def admin_panel():
    # print(User.query.all())
    # print(get_jwt_identity())
    users = User.query.all()
    # all_users()
    return users




@app.route('/all_users',methods=['GET','POST'])
# @jwt_required()
def all_users():
    # print (User.query.all())
    # print(get_jwt_identity())
    user_data = {}
    for i in User.query.all():
        if i.email == 'admin@email.com':
            continue
        user_data[i.email]={'firstname':i.firstname,'lastname':i.lastname,'email':i.email,'phone':i.phone,
        # 'password':i.password,
        'instaid':i.instaid,
        'gitid':i.gitid,
        'linkedinid':i.linkedinid,
        'domain':i.domain,
        'profession':i.profession,
        'company':i.company,
        'website':i.website,
        'user_profile_image_url':i.user_profile_image_url,
        'valid':i.valid,}
    return user_data


@app.route('/user_count',methods=['GET'])
# @jwt_required()
def user_count():
    # if get_jwt_identity() == 'admin@email.com':
        print(True)
        user_data = {}
        total_users = 0
        valid_users = 0
        not_valid_users = 0
        for i in User.query.all():
            if i.email == 'admin@email.com':
                continue
            if i.valid == 'false':
                not_valid_users+=1
            if i.valid == 'true':
                valid_users+=1
            total_users += 1
        user_data['total_users']=total_users
        user_data['valid_users']=valid_users
        user_data['not_valid_users']=not_valid_users
        return user_data
    # else:
    #     return Http404


app.register_blueprint(approve_delete_disapprove_users)


# Add Admin Post Data in AdminPost Table and Add Image to Cloudinary to Admin_Posts folder
@app.route('/upload_admin_post',methods=['GET','POST'])
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
    print(post_title,type(post_title))
    print(post_description,type(post_description))
    print(event_start_date,type(event_start_date))
    print(event_start_time,type(event_start_time))
    print(event_end_date,type(event_end_date))
    print(event_end_time,type(event_end_time))
    print(insta_check,type(insta_check))
    print(mail_check,type(mail_check))
    # print(insta_check,type(insta_check))
    # print(mail_check,type(mail_check))

    admin_image_url = cloudinary.uploader.upload(file,folder='/Admin_Posts')
    # print(admin_image_url['url'])
    date_time  = datetime.datetime.now()
    post_image_url = admin_image_url['url']
    post = AdminPosts(post_title=post_title,post_description=post_description,post_date=date_time,post_image_url=post_image_url,post_event_start_date=event_start_date,post_event_start_time=event_start_time,post_event_end_date = event_end_date,post_event_end_time= event_end_time)
    db.session.add(post)
    db.session.commit()
    # if(mail_check=='true' ):
    #     users = User.query.all()    
    #     for i in users:
    #         if i.email == 'admin@email.com':
    #             continue
    #         mail(image_url=post_image_url,mail_recipient_email=i.email,recipient_name =i.firstname+' '+i.lastname,event_title=post_title,event_description=post_description,event_start_date=event_start_date,event_start_time=event_start_time,event_end_date=event_end_date,event_end_time=event_end_time)
    # mail(mail_recipient='deepukumarpu@outlook.com',event_title=post_title,event_description=post_description,event_start_date=event_start_date,event_start_time=event_start_time,event_end_date=event_end_date,event_end_time=event_end_time)
            
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
    # return Response(result_image)

@app.route('/delete_admin_post',methods=['GET','POST'])
def delete_admin_post_image():
    post_id = json.loads(request.data)['data']['post_id']
    print(post_id)
    post_object = AdminPosts.query.get(post_id)
    image_url = post_object.post_image_url
    publicid = cloudinary.utils.cloudinary_url(image_url, type='upload')[0].split('/')[-1].split('.')[0]
    post_comment = PostComments.query.filter_by(post_id=str(post_id))
    post_comment.delete()
    db.session.commit()
    db.session.delete(post_object)
    db.session.commit()
    response = cloudinary.uploader.destroy('Admin_Posts/'+publicid)
    print(image_url)
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


app.register_blueprint(accept_decline)


# Upload and Fetch Image from Cloudinary (Single Post, which gives image url)
app.register_blueprint(upload_fetch_admin_post_image)


app.register_blueprint(post_comments)


# Upload User Image to Cloudinary
@app.route('/uploadimage',methods=['GET','POST'])
def uploadimage():

    print(request.files['file'])
    file =request.files['file']
    global url
    # value = 'Admin_Image_Preview/kzsgvupe8ooitbik8d1l'.split('/')[1]
    value = 'kzsgvupe8ooitbik8d1l'
    url = 'http://res.cloudinary.com/dy59sbjqc/image/upload/v1680858857/Users/kzsgvupe8ooitbik8d1l.jpg'
    # url = cloudinary.uploader.upload(file,public_id=value,folder='/Users')['url']
    public_id = url.split('/Users/')[1].split('.')[0]
    print(public_id)
    response = cloudinary.uploader.upload(file,public_id=public_id,folder='/Users')
    print(response)


    # print(image_url)
    # url =cloudinary.uploader.upload(image_url,public_id=value,folder='/Admin_Image_Preview')

    return Response("Successfully Uploaded Image")


# Fetch User Image from Cloudinary
@app.route('/fetchimage',methods=['GET','POST'])
def fetchimage():
    # image_url = cloudinary.CloudinaryImage('my_custom_names').build_url()
    # image_url = cloudinary.api.resource("/Users/my_custom_name",transformation={"width": 300, "height": 300})['url']
    # print('URL',url)
    value = 'kzsgvupe8ooitbik8d1l'
    # image_url = cloudinary.api.resource(public_id=value,folder='/Users')
    # print(image_url)
    # image_url = cloudinary.api.resource("/Users/my_custom_name")['url']
    # image_url = cloudinary.api.resource("/Users/my_custom_name")['public_id']
    # i_image_url = cloudinary.api.resource("/Users/my_custom_name",transformation={"width": 300, "height": 300})
    # result_image =cloudinary.utils.cloudinary_url("my_custom_name", width = 200, height = 200)[0]
    # print(image_url)
    # print(i_image_url)
    return Response('image_url')
    # return Response(result_image)













admin.add_view(ModelView(User,db.session))

if __name__=='__main__':
    app.run()