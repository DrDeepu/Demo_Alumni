import json
import datetime
from flask import Blueprint,request
from Models.AdminPosts import AdminPosts

bp = Blueprint('filter_posts',__name__)

# @bp.route('/filter_fetch_posts',methods=['POST'])
@bp.route('/filter_posts',methods=['GET'])
def filter_posts():
    # print(request.json)
    data = request.json | {}
    if data.get('filter')=='0':
        print('0',AdminPosts.query.filter( AdminPosts.post_event_start_date > datetime.datetime.now()).all())
    elif data.get('filter')==True:
        print('true ',AdminPosts.query.filter(AdminPosts.post_event_end_date >= datetime.datetime.now().date(), AdminPosts.post_event_start_date <= datetime.datetime.now()).all())
    elif data.get('filter')==False:
        print('false ',AdminPosts.query.filter( AdminPosts.post_event_start_date < datetime.datetime.now(),AdminPosts.post_event_end_date < datetime.datetime.now()).all())
    
    return "Success"

