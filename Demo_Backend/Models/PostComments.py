from Models.models import db
from Models.Base import Base


class PostComments(db.Model,Base):
    id = db.Column('id', db.Integer, primary_key=True)
    comment_text = db.Column(db.String(150), nullable=False)
    user_email = db.Column(db.String(150), nullable=False)
    post_id = db.Column(db.String(150), nullable=False)
    post_time = db.Column(db.String(100), nullable=False)
    
    def __init__(self,comment_text,user_email,post_id,post_time):
        self.comment_text = comment_text
        self.user_email = user_email
        self.post_id = post_id
        self.post_time = post_time

    def __repr__(self):
        return f'<PostComments Email: {self.user_email}>'