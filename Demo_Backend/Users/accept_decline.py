import json
from flask import Blueprint
from flask import Flask,request,jsonify

from Models.models import db,User,AdminPosts


bp = Blueprint('accept_decline',__name__)


@bp.route('/post_accept',methods=['POST'])
def post_accept():
    email = json.loads(request.data)['email']
    post_id = json.loads(request.data)['post_id']
    # print(email,post_id)
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
    print(email,post_id)
    post = AdminPosts.query.get(post_id)
    user = User.query.filter_by(email=email).first()
    accepted = user in post.accepted_users
    print('post_id : ',post_id,accepted,type(accepted))
    return {'accepted':accepted}

@bp.route('/get_attending_users',methods=['GET'])
def attending_users():
    post_id = json.loads(request.data)['post_id']