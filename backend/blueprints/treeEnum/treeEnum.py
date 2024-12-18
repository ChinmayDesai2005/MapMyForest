from flask import Blueprint, request
from PIL import Image
import base64, io, json
from ultralytics import YOLO
from deepforest import main
from blueprints.treeEnum.helper import parallel_predictions, get_model

treeEnum = Blueprint("treeEnum", __name__, template_folder="templates")

@treeEnum.route("/")
def index():
    return "Tree Enumeration Model!"

@treeEnum.post("/enumerate")
def enumerateTrees():
    # TODO Clear previous output

    # Get image from request        
    images = json.loads(request.form['imagesb64'])
    conf = float(request.form['confidence'])
    iou = float(request.form['iou'])

    predictions = parallel_predictions(get_model(), images)

    #Generate response
    # response = {"annotated": annotatedImage, "count": len(results[0].boxes)}

    return json.dumps(predictions)
