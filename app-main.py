from email.policy import default
import json
from flask import Flask,request,jsonify
from datetime import timedelta,datetime,timezone
from flask import Response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (create_access_token, get_jwt,
 get_jwt_identity,unset_jwt_cookies, jwt_required, JWTManager)
from instabot import Bot
from flask_admin import Admin
from flask_admin.contrib.sqla  import ModelView
# bot = Bot()
# bot.login(username = '',password='')
app = Flask(__name__)

cors = CORS(app);

app.debug = True
app.secret_key = 'Something- Is-Not-Right'
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:root@localhost:5432/snm_database"
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# app.config['JWT_SECRET_KEY']="This-is-not-Real"
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
# jwt = JWTManager(app)


db = SQLAlchemy(app)

admin = Admin(app)


class User(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    firstname = db.Column(db.String(200),nullable = False)
    lastname = db.Column(db.String(200),nullable = False)
    email = db.Column(db.String(255),unique=True,nullable = False)
    phone = db.Column(db.String(15),nullable = False)
    password = db.Column(db.String(200),nullable = False)
    valid = db.Column(db.String(200),default=False)
    instaid = db.Column(db.String(200))
    gitid = db.Column(db.String(200))
    linkedinid = db.Column(db.String(200))
    domain = db.Column(db.String(200))
    profession = db.Column(db.String(200))
    company = db.Column(db.String(200))
    website = db.Column(db.String(200))
    
    
    
    

    def __init__(self, firstname, lastname, email, password,phone,valid='false',instaid='',gitid='',linkedinid='',domain='',profession='',company='',website=''):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.phone = phone
        self.valid = valid
        self.instaid = instaid
        self.gitid = gitid
        self.linkedinid = linkedinid
        self.domain = domain
        self.profession = profession
        self.company = company
        self.website = website
# with app.app_context():
#     db.create_all()

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(hours=1))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@app.route('/token',methods= ["GET","POST"])
# def create_token(email):
def create_token():
    email= json.loads(request.data)['data']['email']
    password = json.loads(request.data)['data']['password']
    user = db.one_or_404(db.select(User).filter_by(email=email,password=password))
    # email= json.loads(request.data)['data']['email']
    # password = json.loads(request.data)['data']['password']
    # email = request.json.get("email",None)
    # password = request.json.get("password",None)
    # print(email,password)
    # user = db.one_or_404(db.select(User).filter_by(email=email,password=password))
    # if not user:
    #     return 404
    # if email!='test' or password !='test':
    #     return {"msg":"Wrong Email or Password"},401
    if user:
        access_token = create_access_token(identity = email)
        response = {"access_token":access_token}
        return response,'Hi'
    else:
        return "ERROR OCCURED"

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/profile')
@jwt_required() # new line
def my_profile():
    print(get_jwt_identity())
    user_email = get_jwt_identity()
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




@app.route('/')
def home():
    return Response(['data','Hello There'])


@app.route('/add',methods=['GET','POST'])
def add():
    firstname = json.loads(request.data)['data']['firstname']
    lastname = json.loads(request.data)['data']['lastname']
    email= json.loads(request.data)['data']['email']
    password = json.loads(request.data)['data']['password']
    phone = json.loads(request.data)['data']['phone']
    user = User(firstname=firstname,lastname=lastname,email=email,phone=phone, password=password)
    # user = db.one_or_404(db.select(User).filter_by(firstname='Deepu'))
    # print(user)
    # user.firstname = 'Rahul'
    db.session.add(user)
    db.session.commit()
    return Response(['Data added Successfully'])


@app.route('/login',methods=['GET','POST'])
def login():
    email= json.loads(request.data)['data']['email']
    password = json.loads(request.data)['data']['password']
    user = db.one_or_404(db.select(User).filter_by(email=email,password=password))
    if user:
        response = create_token(email = email)
    print(user)
    return response
    


@app.route('/dashboard',methods=['GET','POST'])
@jwt_required() # new line
def dashboard():
    return Response(['Data added Successfully'])


@app.route('/admin',methods=['GET','POST'])
@jwt_required
def admin_panel():
    # print(User.query.all())
    users = User.query.all()
    # all_users()
    return users

@app.route('/admin_panel',methods=['GET','POST'])
def all_users():
    # print (User.query.all())
    user_data = {}
    for i in User.query.all():
        user_data[i.email]={'firstname':i.firstname,'lastname':i.lastname,'email':i.email,'phone':i.phone,
        }
        print(i.firstname)
    return user_data


@app.route('/deleteuser',methods=['GET','POST'])
def deleteuser():
    email = json.loads(request.data)['data']['email']
    user = User.query.filter(User.email==email).first()
    db.session.delete(user)
    db.session.commit()
    return Response("Successfully delete")
    # user = User.


admin.add_view(ModelView(User,db.session))

if __name__=='__main__':
    app.run()