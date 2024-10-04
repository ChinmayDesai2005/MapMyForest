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
    conf = float(request.form['confidence'])
    iou = float(request.form['iou'])
    image = base64.b64decode(image)
    image = Image.open(io.BytesIO(image))
    image.convert('RGB').save("blueprints/treeEnum/input/input.jpg")
    
    # Run model
    model = YOLO("model/best (2).pt")
    results = model.predict("blueprints/treeEnum/input/input.jpg", conf=conf, imgsz=640, augment=True, nms=True, iou=iou)

    # Save image
    for result in results:
        result.save(filename=f"blueprints/treeEnum/output/result.jpg")

    # print(results) 

    # Create B64 for result image
    with open("./blueprints/treeEnum/output/result.jpg", "rb") as f:
        annotatedImage = base64.b64encode(f.read()).decode('utf-8')

    #Generate response
    response = {"annotated": annotatedImage, "count": len(results[0].boxes)}

    return json.dumps(response)
