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


def loginUser():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user_data = User.find_by_email(email)

    if user_data is None:
        return jsonify({'error': 'User not found'}), 404

    if User.verify_password(user_data['password'], password):
        user_data['_id'] = str(user_data['_id'])
        user_data.pop('password', None)
        return jsonify({'message': f'Login successful {user_data['username']}', 'user': user_data}), 200
    else:
        return jsonify({'error': 'Invalid password'}), 401