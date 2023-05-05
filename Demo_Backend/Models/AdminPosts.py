from Models.models import db
from Models.Base import Base


accepted_users = db.Table('accepted_users', db.Column('post_id', db.Integer, db.ForeignKey('admin_posts.id')),
                          db.Column('user_id', db.Integer, db.ForeignKey('user.id')))

class AdminPosts(db.Model,Base):
    id = db.Column('id', db.Integer, primary_key=True)
    post_title = db.Column(db.String(150),nullable = False)
    post_description = db.Column(db.String(300),nullable = False)
    post_date = db.Column(db.String(100),nullable = False)
    post_image_url = db.Column(db.String(200),nullable = False)
    post_event_start_date = db.Column(db.String(100),nullable=False)
    post_event_start_time = db.Column(db.String(100),nullable=False)
    post_event_end_date = db.Column(db.String(100),nullable=False)
    post_event_end_time = db.Column(db.String(100),nullable=False)
    create_date = db.Column(db.String(30))
    accepted_users = db.relationship("User", secondary = accepted_users, backref='accepted_posts')

    def __init__(self, post_title, post_description,create_date, post_date, post_image_url,post_event_start_time ,post_event_start_date,post_event_end_date,post_event_end_time):
        self.post_title = post_title
        self.post_description = post_description
        self.post_date = post_date
        self.post_image_url = post_image_url
        self.post_event_start_date = post_event_start_date
        self.post_event_start_time = post_event_start_time
        self.post_event_end_date = post_event_end_date
        self.post_event_end_time = post_event_end_time
        self.create_date = create_date
    def __repr__(self):
        return f'<Admin Post id : {self.id}, Admin Title : {self.post_title}>'