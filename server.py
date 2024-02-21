from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app) #Cross Origin Resource Sharing

@app.route("/", methods=['GET'])
def index():
    return "hello world"


if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)

