from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    firstname = db.Column(db.String(200),nullable = False)
    lastname = db.Column(db.String(200),nullable = False)
    email = db.Column(db.String(255),unique=True,nullable = False)
    phone = db.Column(db.String(15),nullable = False)
    password = db.Column(db.String(200),nullable = False)
    valid = db.Column(db.String(20),default=False)
    instaid = db.Column(db.String(200))
    gitid = db.Column(db.String(200))
    linkedinid = db.Column(db.String(200))
    domain = db.Column(db.String(200))
    profession = db.Column(db.String(200))
    company = db.Column(db.String(200))
    website = db.Column(db.String(200))
    user_profile_image_url = db.Column(db.String(300))

    def __init__(self, firstname, lastname, email, password,phone,valid='false',instaid='',gitid='',linkedinid='',domain='',profession='',company='',website='',user_profile_image_url=''):
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
        self.user_profile_image_url = user_profile_image_url


class AdminPosts(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    post_title = db.Column(db.String(150),nullable = False)
    post_description = db.Column(db.String(300),nullable = False)
    post_date = db.Column(db.String(100),nullable = False)
    post_image_url = db.Column(db.String(200),nullable = False)
    post_event_start_date = db.Column(db.String(100),nullable=False)
    post_event_start_time = db.Column(db.String(100),nullable=False)
    post_event_end_date = db.Column(db.String(100),nullable=False)
    post_event_end_time = db.Column(db.String(100),nullable=False)
    # post_in_insta = 


    def __init__(self, post_title, post_description, post_date, post_image_url,post_event_start_time ,post_event_start_date,post_event_end_date,post_event_end_time):
        self.post_title = post_title
        self.post_description = post_description
        self.post_date = post_date
        self.post_image_url = post_image_url
        self.post_event_start_date = post_event_start_date
        self.post_event_start_time = post_event_start_time
        self.post_event_end_date = post_event_end_date
        self.post_event_end_time = post_event_end_time

class PostComments(db.Model):
    id = db.Column('id',db.Integer,primary_key=True)
    comment_text = db.Column(db.String(150),nullable=False)
    user_email = db.Column(db.String(150),nullable=False)
    post_id = db.Column(db.String(150),nullable=False)
    post_time = db.Column(db.String(100),nullable=False)
    
    def __init__(self,comment_text,user_email,post_id,post_time):
        self.comment_text = comment_text
        self.user_email = user_email
        self.post_id = post_id
        self.post_time = post_time


class PostAcceptUsers(db.Model):
    id = db.Column('id',db.Integer,primary_key=True)
    user_id = db.Column(db.String(150),nullable=False)
    post_id = db.Column(db.String(150),nullable=False)
    accept = db.Column(db.String(10),nullable=False)


    def __init__(self,user_id,post_id,accept):
        self.user_id = user_id
        self.post_id = post_id
        self.accept = accept

# class Chat(db.Model):
#     id = db.Column('id',db.Integer,primary_key=True)
#     user_id_one = db.Column(db.String(150),nullable=False)
#     user_id_two = db.Column(db.String(150),nullable=False)
#     chat_time = db.Column(db.String(150),nullable=False)

#     def __init__(self,user_id_one,user_id_two,chat_time):
#         self.user_id_one = user_id_one
#         self.user_id_two = user_id_two
#         self.chat_time = chat_time
        