#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, render_template, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Coordinator, Pianist


# Views go here!
@app.route('/')
def index(id=0):
    return render_template("index.html")

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'


class Coordinators(Resource):
    def get(self):
        all_coordinators = Coordinator.query.all()
        coordinator_dicts = [coordinator.to_dict() for coordinator in all_coordinators]

        response = make_response(coordinator_dicts, 200)
        return response


api.add_resource(Coordinators, '/api/coordinator', endpoint='/api/coordinator')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

