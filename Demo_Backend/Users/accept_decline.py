import json
from flask import Blueprint
from flask import Response
from flask import Flask,request,jsonify
import cloudinary
import cloudinary.uploader
import cloudinary.api

from Models.models import db,User,PostAcceptUsers


bp = Blueprint('accept_decline',__name__)


@bp.route('/accept_decline',methods=['GET','POST'])
def accept_decline():
    if request.method=="POST":
        accept = json.loads(request.data)['accept']
        print(type(accept))
        email = json.loads(request.data)['email']
        post_id = json.loads(request.data)['post_id']
        user_id = User.query.filter_by(email=email).first().id
        print(accept,email,post_id,user_id)
        print(PostAcceptUsers.query.filter_by(user_id=user_id,post_id=post_id).exists())
        if accept==True:

                post_accept_user = PostAcceptUsers(user_id=user_id,post_id=post_id)
                db.session.add(post_accept_user)
                db.session.commit()

        elif accept==False:
            post_accept_user = PostAcceptUsers.query.filter_by(user_id=str(user_id),post_id=str(post_id))
            post_accept_user.delete()
            db.session.commit()
        return 'Succesffuly Done in Accept Decline'
    elif request.method =='GET':
        post_accepted_user = PostAcceptUsers.query.all()
        p_a_u=[]
        for i in post_accepted_user:
            p_a_u.append({'post_id':i.post_id,'user_id':i.user_id})
        return p_a_u

