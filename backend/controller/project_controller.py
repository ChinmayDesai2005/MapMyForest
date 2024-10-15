from flask import flash,request,jsonify
from DBmodels.projects_model import project_collection,Project
from bson import ObjectId

def createProject():
    data = request.get_json()
    project_name = data.get('project_name') 
    location = data.get('location')
    tree_images = data.get('tree_images', [])
    videoURL = data.get('videoURL')

    user_id = request.user_id

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

def accessAllProject():
    user_id = request.user_id

    if not user_id:
        return jsonify({'error': 'User Id not found please login again'}), 400
    
    project_group = list(project_collection.find({'user_id': user_id}))

    print (f'{project_group}')

    if not project_group:
        return jsonify({'error':'No Project found for the particular user'}), 200
    
    for project in project_group:
        project['_id'] = str(project['_id']) 

    return jsonify({
        'message': f'Project for the particular {user_id} found',
        'project_group': project_group
    }), 201

def findOneProjectAndUpdate():
    data = request.get_json()
    project_id = data.get('_id')

    if not ObjectId.is_valid(project_id):
        return jsonify({'error': 'Project with this id does not exists'})
    
    update_data = {
        'project_name': data.get('project_name'),
        'location': data.get('location'),
        'tree_images': data.get('tree_images'),
        'videoURL': data.get('videoURL')
    }

    update_data = {k: v for k, v in update_data.items() if v is not None}

    update_project = project_collection.find_one_and_update(
        {'_id':ObjectId(project_id)},
        {'$set': update_data},
        return_document=True
        )
    
    if not update_project:
        return jsonify({'error': 'Project with this ID does not exist'}), 404
    
    update_project['_id'] = str(update_project['_id'])
    
    return jsonify({
        'message': 'Project Updated Successfully',
        'updated_project': update_project
    }), 200

def AddorUpdateImages():
    data = request.get_json()
    project_id = data.get('_id')

    if not ObjectId.is_valid(project_id):
        return jsonify({'error': 'Invalid project ID'}), 400
    
    new_images = data.get('tree_images')

    if not new_images or not isinstance(new_images, list):
        return jsonify({'error': 'Please provide a valid list of new images'}), 400

    updated_project = project_collection.find_one_and_update(
        {'_id': ObjectId(project_id)},
        {'$push': {'tree_images': {'$each': new_images}}},
        return_document=True
    )

    if not updated_project:
        return jsonify({'error': 'Project with this ID does not exist'}), 404

    updated_project['_id'] = str(updated_project['_id'])

    return jsonify({
        'message': 'Images added/updated successfully',
        'updated_project': updated_project
    }), 200

#dont execute its not working some issue with recursion depth
def AddNewVideo():
    data = request.get_json()
    project_id = data.get('_id')

    if not ObjectId.is_valid(project_id):
        return jsonify({'error': 'Invalid project ID'}), 400

    video_url = data.get('videoURL')

    if not video_url:
        return jsonify({'error': 'Please provide a valid video URL'}), 400

    updated_video_project = project_collection.find_one_and_update(
        {'_id': ObjectId(project_id)},
        {'$set': {'videoURL': video_url}},
        return_document=True
    )

    if not updated_video_project:
        return jsonify({'error': 'Project with this ID does not exist'}), 404

    updated_video_project['_id'] = str(updated_video_project['_id'])

    return jsonify({
        'message': 'Video URL updated successfully',
        'updated_project': updated_video_project
    }), 200