import json
import datetime
from flask import Blueprint,request
from Models.AdminPosts import AdminPosts

bp = Blueprint('filter_posts',__name__)

@bp.route('/filter_posts',methods=['GET',"POST"])
def filter_posts():
    data = request.json | {}
    total_posts = {}
    posts = []
    if data.get('filter')=='0':
        print('0',AdminPosts.query.filter( AdminPosts.post_event_start_date > datetime.datetime.now()).all())
        posts = AdminPosts.query.filter( AdminPosts.post_event_start_date > datetime.datetime.now()).all()
    elif data.get('filter')==True:
        print('true ',AdminPosts.query.filter(AdminPosts.post_event_end_date >= datetime.datetime.now().date(), AdminPosts.post_event_start_date <= datetime.datetime.now()).all())
        posts = AdminPosts.query.filter(AdminPosts.post_event_end_date >= datetime.datetime.now().date(), AdminPosts.post_event_start_date <= datetime.datetime.now()).all()
    elif data.get('filter')==False:
        print('false ',AdminPosts.query.filter( AdminPosts.post_event_end_date < datetime.datetime.now()).all())
        posts = AdminPosts.query.filter( AdminPosts.post_event_end_date < datetime.datetime.now()).all()
    
    for i in posts:
        total_posts[i.id]={'post_title':i.post_title,
        'post_description':i.post_description,
        'post_date':i.post_date,
        'post_image_url':i.post_image_url,
        "post_event_start_date" : i.post_event_start_date,
        "post_event_start_time" : i.post_event_start_time,
        "post_event_end_date":i.post_event_end_date,
        "post_event_end_time":i.post_event_end_time,
        "post_id":i.id
        }
    print(total_posts)
    return total_posts

