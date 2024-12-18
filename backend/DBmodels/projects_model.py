from pymongo import MongoClient
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI')

client = MongoClient(MONGODB_URI)

db = client.get_database('mapmyforest')
project_collection = db.get_collection('projects')

project_collection.create_index('project_name',unique=True)

class Project:
    def __init__(self, project_name, location, user_id,tree_images=None, videoURL=""):
        self.project_name = project_name
        self.location = location
        self.tree_images = tree_images if tree_images else []
        self.annotated_images = []
        self.videoURL= videoURL
        self.created_at = datetime.now()
        self.user_id = user_id

    def add_annotatedimage_data(self, url, count, percentage):
        annotated_image = {
            'url': url,
            'count': count,
            'percentage': percentage
        }
        self.annotated_images.append(annotated_image)

    def to_dict(self):
        return {
            'project_name': self.project_name,
            'location': self.location,
            'created_at': self.created_at.isoformat(),
            'tree_images': self.tree_images,
            'annotated_images': self.annotated_images,
            'videoURL': self.videoURL,
            'user_id': self.user_id 
        }