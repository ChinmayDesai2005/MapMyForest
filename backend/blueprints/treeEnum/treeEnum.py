from flask import Blueprint, request
from PIL import Image
import base64, io, json
from ultralytics import YOLO
from blueprints.treeEnum.helper import parallel_predictions

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

    predictions = parallel_predictions(images)

    for idx, prediction in enumerate(predictions):
        prediction[0].save(filename=f"blueprints/treeEnum/output/result_{idx}.jpg")
    # print(predictions[0][0].save())

    # image = base64.b64decode(image)
    # image = Image.open(io.BytesIO(image))
    # image.convert('RGB').save("blueprints/treeEnum/input/input.jpg")
    
    # # Run model
    # model = YOLO("model/best (2).pt")
    # results = model.predict("blueprints/treeEnum/input/input.jpg", conf=conf, imgsz=640, augment=True, nms=True, iou=iou)

    # # Save image
    # for result in results:
    #     result.save(filename=f"blueprints/treeEnum/output/result.jpg")

    # # print(results) 

    # # Create B64 for result image
    response = []
    for i in range(len(predictions)):
        with open(f"./blueprints/treeEnum/output/result_{i}.jpg", "rb") as f:
            response.append({"annotated": base64.b64encode(f.read()).decode('utf-8'), "count": len(predictions[i][0].boxes)})

    #Generate response
    # response = {"annotated": annotatedImage, "count": len(results[0].boxes)}

    return json.dumps(response)
