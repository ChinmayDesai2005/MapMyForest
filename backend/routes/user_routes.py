from flask import Blueprint
from controller.user_controller import registerUser,loginUser
from controller.analysis_controller import CreateNewOrUpdateAnalysis
from middlewares.auth_middleware import authenticate

register_user = Blueprint('register_user',__name__)
login_user = Blueprint('login_user',__name__)
create_new_or_update_analysis = Blueprint('create_new_or_update_analysis',__name__)

@register_user.route('/api/v1/user/register',methods=['POST'])
def register():
    return registerUser()

@login_user.route('/api/v1/user/login',methods=['POST'])
def login(): 
    return loginUser()

@create_new_or_update_analysis.route('/api/v1/project/analysis',methods=['POST'])
@authenticate
def CreateOrUpdateAnalysis(): 
    return CreateNewOrUpdateAnalysis()