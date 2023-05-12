from flask import Blueprint
from Models.User import User

bp = Blueprint('admin_report',__name__)

@bp.route('/year_wise_report',methods=['GET'])
def year_wise_report():
    all_users = User.query.all()
    data = []
    for i in all_users:
        if i.is_admin == True:
            continue
        data.append(i.join_date.split(' ')[0].split('-')[0])
    result = {}
    for i in data:
        list_data = []
        for j in all_users:
            if j.is_admin == True:
                continue
            if i == j.join_date.split(' ')[0].split('-')[0]:
                list_data.append(j.join_date.split(' ')[0].split('-')[1])
        result[i]=list_data
    final_result = {}
    for i in result:
        month = {'01':0,'02':0,'03':0,'04':0,
        "05":0,"06":0,"07":0,"08":0,"09":0,"10":0,"11":0,"12":0
        }
        for j in result[i]:
            month[j]=month[j]+1
            # print(j)
        final_result[i]=month
        # print({i:month})
        # print(i)
    # print(result)
    
    return final_result
    