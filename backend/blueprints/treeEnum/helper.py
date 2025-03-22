from concurrent.futures import ThreadPoolExecutor
from ultralytics import YOLO
from deepforest import visualize
from deepforest import main
import os, base64, pandas
from io import BytesIO
from PIL import Image
import numpy as np

MODEL_PATH = "model/best (2).pt"

deepforest_model = None

def get_model():
    global deepforest_model
    if deepforest_model is None:
        deepforest_model = main.deepforest(config_args={"workers": 4})
        deepforest_model.use_release()
    return deepforest_model

def annotate_image(image, boxes_df):
    annotated = visualize.plot_predictions(np.array(image), boxes_df, color=(0, 165, 255))
    annotated = Image.fromarray(annotated, 'RGB')
    buffered = BytesIO()
    annotated.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

def calculate_green_cover(boxes_df, original_width, original_height):
    boxes_df["box_area"] = (boxes_df["xmax"] - boxes_df["xmin"]) * (boxes_df["ymax"] - boxes_df["ymin"])
    total_box_area = boxes_df["box_area"].sum()
    image_area = original_width * original_height
    return round((total_box_area / image_area) * 100, 4)

# Assume `predict_trees(image)` is your YOLO prediction function
def predict_trees(image):
    # Your YOLO model inference logic here
    model = YOLO(MODEL_PATH)
    predictions = model.predict(image, conf=0.1, imgsz=640, augment=True, nms=True, iou=0.5)
    return predictions

def predict_trees_df(model, image, patch_size):
    return model.predict_tile(image=np.array(image), patch_size=patch_size)

def load_image(image_base64):
    return Image.open(BytesIO(base64.b64decode(image_base64)))

def predict_on_chunk(model, image_base64_chunk, patch_size):
    predictions = []
    for image_base64 in image_base64_chunk:
        image = load_image(image_base64)
        prediction = predict_trees_df(model, image, patch_size)
        annotated = annotate_image(image, prediction)
        green_cover = calculate_green_cover(prediction, image.width, image.height)
        predictions.append({"url": annotated, "count": len(prediction), "percentage": green_cover})
    return predictions

def parallel_predictions(model, images_base64, patch_size=200, num_workers=4):
    chunk_size = max(len(images_base64) // num_workers, 1)
    chunks = [images_base64[i:i + chunk_size] for i in range(0, len(images_base64), chunk_size)]

    with ThreadPoolExecutor(max_workers=num_workers) as executor:
        results = list(executor.map(lambda chunk: predict_on_chunk(model, chunk, patch_size), chunks))
    return [item for sublist in results for item in sublist]

# Example usage
# image_paths = ['test1.jpg', 'test-tree-image.jpg', "istockphoto-1359891916-612x612.jpg", "istockphoto-973060618-612x612.jpg", "Screenshot2024-10-03121717.png", "Screenshot 2024-10-02 201816.png", "Screenshot 2024-10-02 201538.png"]  # Your array of image paths
# images_base64 = []
# predictions = parallel_predictions(image_paths)