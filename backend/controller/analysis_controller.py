from flask import flash,request,jsonify
from DBmodels.analysis_model import analysis_collection,Analysis
from bson import ObjectId

def CreateNewOrUpdateAnalysis():
    data = request.get_json()
    project_id = data.get('project_id')
    analysis = data.get('analysis')
    user_id = request.user_id

    if not analysis_collection.find_one({'project_id':project_id}):
        new_analysis = Analysis(
            project_id= project_id,
            user_id= user_id,
            analysis= analysis
        )
        analysis_collection.insert_one(new_analysis.to_dict())
        # new_analysis['_id'] = str(inserted_analysis['_id'])

        return jsonify({
            'message': 'New analysis created successfully',
            'new_analysis': new_analysis.to_dict()
        }), 201

    update_analysis = {
        'project_id': project_id,
        'user_id': user_id,
        'analysis': analysis
    }

    updated_analysis = analysis_collection.find_one_and_update(
        {'project_id': project_id}, 
        {'$set': update_analysis},
        upsert=True,
        return_document=True 
    )

    if not updated_analysis:
        return jsonify({'error': 'Analysis could not be updated or created'}), 500

    updated_analysis['_id'] = str(updated_analysis['_id'])

    return jsonify({
        'message': 'Analysis created or updated successfully',
        'updated_analysis': updated_analysis
    }), 200