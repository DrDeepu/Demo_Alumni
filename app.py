import json
import datetime
from django.http import Http404
from flask import Flask,request,jsonify
from flask import Response
from flask_cors import CORS
from flask import jsonify
from flask_admin import Admin
from flask_admin.contrib.sqla  import ModelView
from flask_jwt_extended import (JWTManager,jwt_required,
get_jwt_identity,create_access_token)
from variables import (CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME
,CLOUDINARY_API_SECRET)
import cloudinary
import cloudinary.uploader
import cloudinary.api
from Demo_Backend.Models.models import db,User,AdminPosts



# bot = Bot()
# bot.login(username = '',password='')
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'application/json'
app.debug = True
app.secret_key = 'Something- Is-Not-Right'
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
jwt = JWTManager(app)



# SIGN UP API ROUTE
@app.route('/create_user',methods=['POST'])
def create_user():
    firstname = json.loads(request.data)['data']['firstname']
    lastname = json.loads(request.data)['data']['lastname']
    email= json.loads(request.data)['data']['email']
    password = json.loads(request.data)['data']['password']
    phone = json.loads(request.data)['data']['phone']
    user = User(firstname=firstname,lastname=lastname,email=email,phone=phone, password=password)
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
        access_token = create_access_token(identity = email)
        return {'user':user.firstname,'user_email':email,'admin':True,'access_token':access_token}
    elif user.valid == 'true':
        access_token = create_access_token(identity = email)
        response = {'user':user.firstname,'user_email':email,'admin':False,'access_token':access_token}
        return response
    elif user.valid == 'true':
        return Http404({'error':'Admin is yet to approve your Account. Please wait till then.'})
    else:
        return Http404({'error':'User not Found'})
    # return response





@app.route('/profile')
@jwt_required()
def my_profile():
    user_email =  get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    response_body = {
       'firstname': user.firstname,
       'lastname': user.lastname,
       'phone': user.phone,
       'email': user.email,
       'gitid':user.gitid,
       'instaid':user.instaid,
       'domain':user.domain,
       'company':user.company,
       'profession':user.profession,
       'website':user.website,
       'jwt':get_jwt_identity()
    }
    if user.email == 'admin@email.com' and user.password == 'admin1':
        response_body['admin']=True
    else:
        response_body['admin']=False
    return response_body






@app.route('/dashboard',methods=['GET','POST'])
def dashboard():
    return Response(['Data added Successfully'])






@app.route('/admin',methods=['GET','POST'])
def admin_panel():
    # print(User.query.all())
    users = User.query.all()
    # all_users()
    return users




@app.route('/all_users',methods=['GET','POST'])
def all_users():
    # print (User.query.all())
    user_data = {}
    for i in User.query.all():
        user_data[i.email]={'firstname':i.firstname,'lastname':i.lastname,'email':i.email,'phone':i.phone,
        'valid':i.valid,}
    # count_data = {'total_users':total_users,'valid_users':valid_users,'not_valid_users':not_valid_users}
    return user_data


@app.route('/user_count',methods=['GET'])
def user_count():
    user_data = {}
    total_users = 0
    valid_users = 0
    not_valid_users = 0
    for i in User.query.all():
        if i.valid == 'false':
            not_valid_users+=1
        if i.valid == 'true':
            valid_users+=1
        total_users += 1
    user_data['total_users']=total_users
    user_data['valid_users']=valid_users
    user_data['not_valid_users']=not_valid_users
    return user_data



# Delete user by the email that the payload provides
@app.route('/deleteuser',methods=['POST'])
def deleteuser():
    email = json.loads(request.data)['data']['email']
    user = User.query.filter(User.email==email).first()
    db.session.delete(user)
    db.session.commit()
    return Response("Successfully delete")


# Approve User Function
@app.route('/approveuser',methods=['POST'])
def approveuser():
    email = json.loads(request.data)['data']['email']
    user = User.query.filter(User.email==email).first()
    user.valid = 'true'
    # db.session.delete(user)
    # db.session(user)
    db.session.commit()
    return jsonify(result = user.valid)


# Disapprove User Function
@app.route('/disaproveuser',methods=['POST'])
def disaproveuser():
    email = json.loads(request.data)['data']['email']
    user = User.query.filter(User.email==email).first()
    user.valid = 'false'
    # db.session.delete(user)
    # db.session(user)
    db.session.commit()
    return jsonify(result = user.valid)



# Add Admin Post Data in AdminPost Table and Add Image to Cloudinary to Admin_Posts folder
@app.route('/upload_admin_post',methods=['GET','POST'])
def upload_admin_post():

    file = request.files['file']
    post_title=request.form['post_title']
    post_description=request.form['post_description']
    print(file)
    print(post_title)
    print(post_description)
    admin_image_url = cloudinary.uploader.upload(file,folder='/Admin_Posts')
    print(admin_image_url['url'])
    date_time  = datetime.datetime.now()
    post_image_url = admin_image_url['url']
    post = AdminPosts(post_title=post_title,post_description=post_description,post_date=date_time,post_image_url=post_image_url)
    db.session.add(post)
    db.session.commit()
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
            'post_image_url':i.post_image_url
        }
    # image_url = cloudinary.CloudinaryImage('my_custom_names').build_url()
    # image_url = cloudinary.api.resource("/Admin_Posts/my_custom_name",transformation={"width": 300, "height": 300})['url']
    # i_image_url = cloudinary.api.resource("/Users/my_custom_name",transformation={"width": 300, "height": 300})
    # result_image =cloudinary.utils.cloudinary_url("my_custom_name", width = 200, height = 200)[0]
    return post_data
    # return Response(result_image)

@app.route('/delete_admin_post',methods=['GET','POST'])
def delete_admin_post_image():
    post_id = json.loads(request.data)['data']['post_id']
    print(post_id)
    post_object = AdminPosts.query.get(post_id)
    image_url = post_object.post_image_url
    publicid = cloudinary.utils.cloudinary_url(image_url, type='upload')[0].split('/')[-1].split('.')[0]
    # print(publicid)
    db.session.delete(post_object)
    db.session.commit()
    response = cloudinary.uploader.destroy('Admin_Posts/'+publicid)
    print(image_url)
    return response


# Add Admin Post image to Cloudinary Folder Admin_Image_Preview to Preview the Image in Admin Post Modal Component
@app.route('/upload_admin_post_image',methods=['GET','POST'])
def upload_admin_post_image():
    
    # print(request.files['file'])
    file =request.files['file']
    r_url=cloudinary.uploader.upload(file, public_id='post_image_preview',folder='/Admin_Image_Preview')
    print('R_URL ',r_url['url'])
    return Response("Successfully Uploaded Image")



# Fetch Admin Post Image from Cloudinary Folder Admin_Image_Preview to Preview the image in Admin Post Modal Component
@app.route('/fetch_admin_post_image',methods=['GET','POST'])
def fetch_admin_post_image():
    # image_url = cloudinary.CloudinaryImage('my_custom_names').build_url()
    image_url = cloudinary.api.resource("/Admin_Image_Preview/post_image_preview",transformation={"width": 300, "height": 300})['url']
    i_image_url = cloudinary.api.resource("/Admin_Image_Preview/post_image_preview",transformation={"width": 300, "height": 300})
    # result_image =cloudinary.utils.cloudinary_url("my_custom_name", width = 200, height = 200)[0]
    # print(image_url)
    # print(i_image_url)
    return Response(image_url)
    # return Response(result_image)



# Upload User Image to Cloudinary
@app.route('/uploadimage',methods=['GET','POST'])
def uploadimage():

    print(request.files['file'])
    file =request.files['file']
    global url
    url = cloudinary.uploader.upload(file,folder='/Users')['url']
    return Response("Successfully Uploaded Image")


# Fetch User Image from Cloudinary
@app.route('/fetchimage',methods=['GET','POST'])
def fetchimage():
    # image_url = cloudinary.CloudinaryImage('my_custom_names').build_url()
    # image_url = cloudinary.api.resource("/Users/my_custom_name",transformation={"width": 300, "height": 300})['url']
    
    image_url = cloudinary.api.resource("/Users/my_custom_name")['url']
    i_image_url = cloudinary.api.resource("/Users/my_custom_name",transformation={"width": 300, "height": 300})
    # result_image =cloudinary.utils.cloudinary_url("my_custom_name", width = 200, height = 200)[0]
    print(image_url)
    print(i_image_url)
    return Response(image_url)
    # return Response(result_image)













admin.add_view(ModelView(User,db.session))

if __name__=='__main__':
    app.run()