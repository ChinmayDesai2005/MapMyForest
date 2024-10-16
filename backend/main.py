from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
import os

load_dotenv()

# ENV Vars
PORT = os.environ['PORT']

# Blueprints
from blueprints.treeEnum.treeEnum import treeEnum
from routes.user_routes import register_user,login_user,create_new_or_update_analysis, fetch_analysis
from routes.project_routes import create_project, access_all_project, find_one_project_and_update, add_or_update_image, add_new_video

app = Flask(__name__)
CORS(app,supports_credentials=True)
# CORS(app,origins=["http://localhost:5173"])

app.register_blueprint(treeEnum)
app.register_blueprint(register_user)
app.register_blueprint(login_user)
app.register_blueprint(create_new_or_update_analysis)
app.register_blueprint(fetch_analysis)
app.register_blueprint(create_project)
app.register_blueprint(access_all_project)
app.register_blueprint(find_one_project_and_update)
app.register_blueprint(add_or_update_image)
app.register_blueprint(add_new_video)

if __name__ == "__main__":
    app.run(port=PORT, debug=True)