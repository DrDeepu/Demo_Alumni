import json
from flask import Blueprint
from flask import request

from Models.models import db
from Models.AdminPosts import AdminPosts
from Models.User import User


bp = Blueprint('accept_decline',__name__)


@bp.route('/post_accept',methods=['POST'])
def post_accept():
    email = json.loads(request.data)['email']
    post_id = json.loads(request.data)['post_id']
    # (email,post_id)
    post = AdminPosts.query.get(post_id)
    user = User.query.filter_by(email=email).first()
    post.accepted_users.append(user)
    # post.accepted_users.extend(user)
    db.session.add(post)
    db.session.commit()
    return 'Successfully Inserted Data in AdminPost Table'


@bp.route('/post_decline',methods=['POST'])
def post_decline():
    email = json.loads(request.data)['email']
    post_id = json.loads(request.data)['post_id']
    post = AdminPosts.query.get(post_id)
    user = User.query.filter_by(email=email).first()
    post.accepted_users.remove(user)
    db.session.add(post)
    db.session.commit()
    return "Successfully removed the data from the AdminPost Table"


@bp.route('/get_accept_decline',methods=['POST'])
def accept_decline():
    email = json.loads(request.data)['email']
    post_id = json.loads(request.data)['post_id']
    (email,post_id)
    post = AdminPosts.query.get(post_id)
    user = User.query.filter_by(email=email).first()
    accepted = user in post.accepted_users
    ('post_id : ',post_id,accepted,type(accepted))
    return {'accepted':accepted}

@bp.route('/get_attending_users',methods=['GET','POST'])
def get_attending_users():
    post_id = json.loads(request.data)['post_id']
    (post_id)
    post = AdminPosts.query.get(post_id)
    # db.session.close()
    attending_users_list = [{'users':[],'count':''}]
    if post.accepted_users:
        for i in post.accepted_users:
            attending_users_list[0]['users'].append({'first_name':i.firstname,'last_name':i.lastname,'image_url':i.user_profile_image_url})
        attending_users_list[0]['count']=len(post.accepted_users)
        return attending_users_list
    return attending_users_list
