from flask import Blueprint
from controller.user_controller import registerUser

register_user = Blueprint('register_user',__name__)

@register_user.route('/api/v1/user/register',methods=['POST'])
def register():
    return registerUser()