from flask import Blueprint
from controller.user_controller import registerUser,loginUser

register_user = Blueprint('register_user',__name__)
login_user = Blueprint('login_user',__name__)

@register_user.route('/api/v1/user/register',methods=['POST'])
def register():
    return registerUser()

@login_user.route('/api/v1/user/login',methods=['POST'])
def login(): 
    return loginUser()