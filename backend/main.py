from flask import Flask
from dotenv import load_dotenv
import os

# ENV Vars
PORT = os.environ['PORT']

# Blueprints
from blueprints.treeEnum.treeEnum import treeEnum

load_dotenv()

app = Flask(__name__)
app.register_blueprint(treeEnum)

if __name__ == "__main__":
    app.run(port=PORT, debug=True)