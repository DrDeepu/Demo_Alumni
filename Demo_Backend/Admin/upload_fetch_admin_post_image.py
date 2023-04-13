from flask import Blueprint
from flask import Response
from flask import request
from Variables.variables import (CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME
,CLOUDINARY_API_SECRET)
import cloudinary
import cloudinary.uploader
import cloudinary.api


bp = Blueprint('upload_fetch_admin_post_image',__name__)

cloudinary.config(
  cloud_name=CLOUDINARY_CLOUD_NAME,
  api_key=CLOUDINARY_API_KEY,
  api_secret=CLOUDINARY_API_SECRET
)

# Add Admin Post image to Cloudinary Folder Admin_Image_Preview to Preview the Image in Admin Post Modal Component
@bp.route('/upload_admin_post_image',methods=['GET','POST'])
def upload_admin_post_image():
    
    # print(request.files['file'])
    file =request.files['file']
    r_url=cloudinary.uploader.upload(file, public_id='post_image_preview',folder='/Admin_Image_Preview')
    print('R_URL ',r_url['url'])
    return Response("Successfully Uploaded Image")



# Fetch Admin Post Image from Cloudinary Folder Admin_Image_Preview to Preview the image in Admin Post Modal Component
@bp.route('/fetch_admin_post_image',methods=['GET','POST'])
def fetch_admin_post_image():
    # image_url = cloudinary.CloudinaryImage('my_custom_names').build_url()
    image_url = cloudinary.api.resource("/Admin_Image_Preview/post_image_preview",transformation={"width": 300, "height": 300})['url']
    i_image_url = cloudinary.api.resource("/Admin_Image_Preview/post_image_preview",transformation={"width": 300, "height": 300})
    # result_image =cloudinary.utils.cloudinary_url("my_custom_name", width = 200, height = 200)[0]
    # print(image_url)
    # print(i_image_url)
    return Response(image_url)
    # return Response(result_image)
