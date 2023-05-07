from Models.models import db
from Models.Base import Base


class User(db.Model,Base):
    __tablename__ = 'user'

    id = db.Column('id', db.Integer, primary_key=True)
    firstname = db.Column(db.String(40),nullable = False)
    lastname = db.Column(db.String(40),nullable = False)
    email = db.Column(db.String(100),unique=True,nullable = False)
    password = db.Column(db.LargeBinary,nullable = False)
    valid = db.Column(db.String(20),default=False)
    # valid = db.Column(db.Boolean,default=False)
    phone = db.Column(db.String(15))
    batch = db.Column(db.String(30))
    department = db.Column(db.String(50))
    join_date = db.Column(db.String(30))
    instaid = db.Column(db.String(30))
    gitid = db.Column(db.String(30))
    linkedinid = db.Column(db.String(30))
    domain = db.Column(db.String(30))
    profession = db.Column(db.String(40))
    company = db.Column(db.String(40))
    website = db.Column(db.String(50))
    user_profile_image_url = db.Column(db.String(250))
    is_admin = db.Column(db.Boolean)



    def __init__(self, firstname, lastname, email, password,valid='false',batch='',department='',join_date='',instaid='',gitid='',linkedinid='',domain='',profession='',company='',website='',user_profile_image_url='',is_admin=False):
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.password = password
        self.valid = valid
        self.batch = batch
        self.department = department
        self.join_date = join_date
        self.instaid = instaid
        self.gitid = gitid
        self.linkedinid = linkedinid
        self.domain = domain
        self.profession = profession
        self.company = company
        self.website = website
        self.user_profile_image_url = user_profile_image_url
        self.is_admin = is_admin

    def __repr__(self):
        return f'<User Email: {self.email}>'



