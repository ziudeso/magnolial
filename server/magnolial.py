import os
import json

from flask import Flask, request

from reactstub import reactstub
from model import MagnoliaModel, ModelException

from api import api

app = Flask(__name__)

app.register_blueprint(api, url_prefix="/api")

if os.path.exists('/etc/config.json'):
    with open('/etc/config.json') as config_file:
        config = json.load(config_file)

    app.config['SECRET_KEY'] = config.get('SECRET_KEY')
else:
    print("Warning, running without a secret")


@app.route("/", methods=['GET'])
def index():
    magnolia_id = request.args.get("magnolia_id", None)
    if magnolia_id is not None:
        try:
            with MagnoliaModel(magnolia_id, create=False) as magnolias:
                return reactstub("Magnolial", ["app/app.css", "app/font-awesome-4.5.0/css/font-awesome.min.css"], ["app/main.js"], bootstrap=json.dumps({
                    "magnolia_id": magnolia_id,
                    "magnolia": magnolias[0]
                }))
        except ModelException:
            return reactstub("Magnolial", ["app/app.css", "app/font-awesome-4.5.0/css/font-awesome.min.css"], ["app/main.js"], bootstrap=json.dumps({}))
    else:
        return reactstub("Magnolial", ["app/app.css", "app/font-awesome-4.5.0/css/font-awesome.min.css"], ["app/main.js"], bootstrap=json.dumps({}))


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
