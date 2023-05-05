# @app.route('/get_registered_report',methods=['GET'])
# def get_registered_report():
#     batch_list = []
#     year_wise_data = {}
#     for i in User.query.all():
#         if i.email == "admin@email.com":
#             continue
#         date = i.batch.split('-')
#         batch_list.append({'year':date[0],'month':date[1],'date':date[2]})
#         year_wise_data[date[0]]=[
#         ]
#     for i in batch_list:
#             year_wise_data[i['year']].append(i['month'])
#     f = {}
#     t={}
#     for i in year_wise_data:
#         t[i] = f
#         for j in year_wise_data[i]:
#             # # print(i)
#             try:
#                 f[j]= f[j]+1
#             except:
#                 f[j]= 1
#             return f
#     # # print(t)
#     return year_wise_data