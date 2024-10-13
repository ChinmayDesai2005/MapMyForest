from flask import Blueprint
from controller.project_controller import createProject
from middlewares.auth_middleware import authenticate

create_project = Blueprint('create_project',__name__)

@create_project.route('/api/v1/project/createproject',methods=['POST'])
@authenticate
def create():
    return createProject()