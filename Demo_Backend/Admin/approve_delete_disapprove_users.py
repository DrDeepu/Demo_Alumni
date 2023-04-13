import json
from flask import Blueprint
from flask import Response
from flask import Flask,request,jsonify
import cloudinary
import cloudinary.uploader
import cloudinary.api

from Models.models import db,User



bp = Blueprint('approve_delete_disapprove_users',__name__)

# Delete user by the email that the payload provides
@bp.route('/deleteuser',methods=['POST'])
def deleteuser():
    email = json.loads(request.data)['data']['email']
    user = User.query.filter(User.email==email).first()
    db.session.delete(user)
    db.session.commit()
    return Response("Successfully delete")


# Approve User Function
@bp.route('/approveuser',methods=['POST'])
def approveuser():
    email = json.loads(request.data)['data']['email']
    user = User.query.filter(User.email==email).first()
    user.valid = 'true'
    # db.session.delete(user)
    # db.session(user)
    db.session.commit()
    return jsonify(result = user.valid)


# Disapprove User Function
@bp.route('/disaproveuser',methods=['POST'])
def disaproveuser():
    email = json.loads(request.data)['data']['email']
    user = User.query.filter(User.email==email).first()
    user.valid = 'false'
    # db.session.delete(user)
    # db.session(user)
    db.session.commit()
    return jsonify(result = user.valid)

