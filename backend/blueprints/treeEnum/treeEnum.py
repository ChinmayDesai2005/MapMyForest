from flask import Blueprint, request
from PIL import Image
import base64, io, json
from ultralytics import YOLO

treeEnum = Blueprint("treeEnum", __name__, template_folder="templates")

@treeEnum.route("/")
def index():
    return "Tree Enumeration Model!"

@treeEnum.post("/enumerate")
def enumerate():
    # TODO Clear previous output

    # Get image from request
    image = request.form['imageb64']
    image = base64.b64decode(image)
    image = Image.open(io.BytesIO(image))
    image.convert('RGB').save("backend/blueprints/treeEnum/input/input.jpg")
    
    # Run model
    model = YOLO("backend/model/best.pt")
    results = model.predict("backend/blueprints/treeEnum/input/input.jpg", conf=0.15)

    # Save image
    for result in results:
        result.save(filename=f"backend/blueprints/treeEnum/output/result.jpg")

    # print(results) 

    # Create B64 for result image
    with open("backend/blueprints/treeEnum/output/result.jpg", "rb") as f:
        annotatedImage = base64.b64encode(f.read()).decode('utf-8')

    #Generate response
    response = {"annotated": annotatedImage, "count": len(results[0].boxes)}

    return json.dumps(response)
