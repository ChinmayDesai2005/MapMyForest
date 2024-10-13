from concurrent.futures import ThreadPoolExecutor
from PIL import Image
import os
import base64
from io import BytesIO
from ultralytics import YOLO

MODEL_PATH = "model/best (2).pt"

# Assume `predict_trees(image)` is your YOLO prediction function
def predict_trees(image):
    # Your YOLO model inference logic here
    model = YOLO(MODEL_PATH)
    predictions = model.predict(image, conf=0.1, imgsz=640, augment=True, nms=True, iou=0.5)
    return predictions

def load_image(image_base64):
    return Image.open(BytesIO(base64.b64decode(image_base64)))

def predict_on_chunk(image_base64_chunk):
    predictions = []
    for image_base64 in image_base64_chunk:
        image = load_image(image_base64)
        prediction = predict_trees(image)
        predictions.append(prediction)
    return predictions

def parallel_predictions(images_base64, num_workers=4):
    chunk_size = max(len(images_base64) // num_workers, 1)
    chunks = [images_base64[i:i + chunk_size] for i in range(0, len(images_base64), chunk_size)]

    with ThreadPoolExecutor(max_workers=num_workers) as executor:
        results = list(executor.map(predict_on_chunk, chunks))

    # Flatten results if needed
    return [item for sublist in results for item in sublist]

# Example usage
# image_paths = ['test1.jpg', 'test-tree-image.jpg', "istockphoto-1359891916-612x612.jpg", "istockphoto-973060618-612x612.jpg", "Screenshot2024-10-03121717.png", "Screenshot 2024-10-02 201816.png", "Screenshot 2024-10-02 201538.png"]  # Your array of image paths
# images_base64 = []
# predictions = parallel_predictions(image_paths)