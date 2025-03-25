from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/tasks*": {
        "origins": ["http://localhost", "http://127.0.0.1"],
        "methods": ["GET", "POST", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

tasks = []

@app.route('/')
def home():
    return jsonify({"status": "API To-Do List funcionando"})

@app.route('/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'GET':
        return jsonify(tasks)
    elif request.method == 'POST':
        new_task = {"id": len(tasks) + 1, "text": request.json['text']}
        tasks.append(new_task)
        return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"message": "Tarea eliminada"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)