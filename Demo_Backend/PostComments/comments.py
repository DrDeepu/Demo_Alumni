import json
from Models.models import db
from Models.User import User
from Models.PostComments import PostComments
from flask import Blueprint,request
from sqlalchemy import desc
from datetime import datetime

bp = Blueprint('comments',__name__)

# User Comment Route
@bp.route('/post_comment',methods=['GET',"POST"])
def post_comment():
    data = request.json
    PostComments.create(post_time=datetime.now(),**data)
    return "Successfully added comment"


    

@bp.route('/get_comment',methods=['GET',"POST"])
def get_comment():
        post_id = json.loads(request.data)['post_id']
        comments = PostComments.query.filter_by(post_id=str(post_id)).order_by(desc(PostComments.post_time)).all()
        comment_data=[]
        for i in comments:
            user = User.query.filter_by(email=i.user_email).first()
            comment_data.append({'user_email':i.user_email,'comment_text':i.comment_text,'image_url':user.user_profile_image_url,'post_time':i.post_time})
        return comment_data