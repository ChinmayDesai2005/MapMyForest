from flask import flash,request,jsonify
from DBmodels.projects_model import project_collection,Project

def createProject():
    data = request.get_json()
    project_name = data.get('project_name') 
    location = data.get('location')
    tree_images = data.get('tree_images', [])
    videoURL = data.get('videoURL')

    user_id = request.user_id
    print(f"{user_id}")

    if project_collection.find_one({"project_name": project_name}):
        return jsonify({'error': 'Project by same name exists'}), 400
    
    new_project = Project(
        project_name=project_name,
        location=location,
        tree_images=tree_images,
        videoURL=videoURL,
        user_id=user_id  
    )

    project_collection.insert_one(new_project.to_dict())

    return jsonify({
        'message': f'Project "{project_name}" created successfully!',
        'project': new_project.to_dict()
    }), 201