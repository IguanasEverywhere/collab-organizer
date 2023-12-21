#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, render_template, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Coordinator, Pianist, Student, Event


# Views go here!
@app.route('/')
def index(id=0):
    return render_template("index.html")


class Coordinators(Resource):
    def get(self):
        all_coordinators = Coordinator.query.all()
        coordinator_dicts = [coordinator.to_dict() for coordinator in all_coordinators]

        response = make_response(coordinator_dicts, 200)
        return response

class Pianists(Resource):
    def get(self):
        all_pianists = Pianist.query.all()
        pianist_dicts = [pianist.to_dict() for pianist in all_pianists]

        response = make_response(pianist_dicts, 200)
        return response

class PianistInfo(Resource):
    def get(self, id):
        pianist = Pianist.query.filter(Pianist.id==id).first()
        pianist_dict = pianist.to_dict()

        response = make_response(pianist_dict, 200)
        return response


class Students(Resource):
    def get(self):
        all_students = Student.query.all()
        student_dicts = [student.to_dict() for student in all_students]

        response = make_response(student_dicts, 200)
        return response

class StudentInfo(Resource):
    def get(self, id):
        student = Student.query.filter(Student.id==id).first()
        student_info_dict = student.to_dict()
        response = make_response(student_info_dict, 200)

        return response


class Events(Resource):
    def get(self):
        #modify to include only events that match with coordinator id
        all_events = Event.query.all()
        event_dicts = [event.to_dict() for event in all_events]

        response = make_response(event_dicts, 200)
        return response


api.add_resource(Coordinators, '/api/coordinator', endpoint='/api/coordinator')
api.add_resource(Pianists, '/api/pianists', endpoint='/api/pianists')
api.add_resource(Students, '/api/students', endpoint='/api/students')
api.add_resource(Events, '/api/events', endpoint='/api/events')
api.add_resource(StudentInfo, '/api/students/<int:id>', endpoint='/api/students/<int:id>')
api.add_resource(PianistInfo, '/api/pianists/<int:id>', endpoint='/api/pianists/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

