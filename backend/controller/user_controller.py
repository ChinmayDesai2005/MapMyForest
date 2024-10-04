from flask import request,jsonify
from DBmodels.user_model import user_collection,User;

def registerUser():
    data = request.get_json()

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.find_by_email(email):
        return jsonify({'error': 'Email already exists'}), 400
    
    new_user = User(username=username, email=email, password=password)

    user_collection.insert_one(new_user.to_dict())

    return jsonify({
        'message': f'User {username} registered Successfully!',
        'user': {
            'username': new_user.username,
            'email': new_user.email
        }
    }),201