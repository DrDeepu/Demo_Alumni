import http
from urllib.error import HTTPError
from Models.models import PostComments,db,User
import json
from flask import Blueprint,Response,request
# from profanity_check import predict, predict_prob
# from profanity import profanity 
import flask
from sqlalchemy import desc
from datetime import datetime

bp = Blueprint('comments',__name__)

# User Comment Route
@bp.route('/post_comment',methods=['GET',"POST"])
def post_comment():
    post_id = json.loads(request.data)['data']['post_id']
    email = json.loads(request.data)['email']
    comment = json.loads(request.data)['data']['comment']
    # print(post_id,type(post_id))
    # print(email,type(email))
    # print(comment,type(comment))
    # sentence = profanity.censor(comment)
    # if comment==sentence:
    
    comment = PostComments(comment_text=comment,user_email=email,post_id=post_id,post_time=datetime.now())
    db.session.add(comment)
    db.session.commit()
    return "Successfully added comment"
    # elif comment!=sentence:
    #     return flask.abort(400,sentence)
    # else:
    #     return "Something else went wrong"


    

@bp.route('/get_comment',methods=['GET',"POST"])
def get_comment():
        post_id = json.loads(request.data)['post_id']
        # print('post_id_GET',post_id)
        comments = PostComments.query.filter_by(post_id=str(post_id)).order_by(desc(PostComments.post_time)).all()
        # print(comments)
        comment_data=[]
        for i in comments:
            user = User.query.filter_by(email=i.user_email).first()
            comment_data.append({'user_email':i.user_email,'comment_text':i.comment_text,'image_url':user.user_profile_image_url,'post_time':i.post_time})
            
            # print(i.comment_text)
        # print(comment_data)
        return comment_data