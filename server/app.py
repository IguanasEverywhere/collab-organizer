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
@app.route('/pianists')
@app.route('/events')
def index(id=0):
    return render_template("index.html")


class Coordinators(Resource):
    def get(self):
        all_coordinators = Coordinator.query.all()
        coordinator_dicts = [coordinator.to_dict() for coordinator in all_coordinators]

        response = make_response(coordinator_dicts, 200)
        return response

class CoordinatorInfo(Resource):
    def get(self, id):
        coordinator = Coordinator.query.filter(Coordinator.id==id).first()

        response = make_response(coordinator.to_dict(), 200)
        return response

    def patch(self, id):
        coordinator = Coordinator.query.filter(Coordinator.id==id).first()
        request_info = request.get_json()
        coordinator.viewModePreference = request_info['viewMode']

        db.session.commit()

class Pianists(Resource):
    def get(self):
        current_coord = session.get('logged_in_coordinator_id')

        all_pianists = Pianist.query.filter(Pianist.coordinator_id==current_coord).all()
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

        current_coord = session.get('logged_in_coordinator_id')

        all_students = Student.query.filter(Student.coordinator_id==current_coord).all()
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
        current_coord = session.get('logged_in_coordinator_id')

        all_events = Event.query.filter(Event.coordinator_id==current_coord).all()
        event_dicts = [event.to_dict() for event in all_events]

        response = make_response(event_dicts, 200)
        return response

class Login(Resource):
    def post(self):

        username = request.get_json()['username']
        coordinator = Coordinator.query.filter(Coordinator.username == username).first()

        password = request.get_json()['password']

        if coordinator.authenticate(password):
            session['logged_in_coordinator_id'] = coordinator.id
            response = make_response(coordinator.to_dict(), 200)
        else:
            response = make_response({"Error": "Login Failed"}, 401)

        return response

class Logout(Resource):
    def delete(self):
        session['logged_in_coordinator_id'] = None
        response = make_response({"Logged out": "Success"}, 200)
        return response


class CheckSession(Resource):
    def get(self):
        if session.get('logged_in_coordinator_id'):
            current_user = Coordinator.query.filter(Coordinator.id==session['logged_in_coordinator_id']).first()

            return current_user.to_dict(), 200
        else:
            return None


api.add_resource(Coordinators, '/api/coordinator', endpoint='/api/coordinator')
api.add_resource(Pianists, '/api/pianists', endpoint='/api/pianists')
api.add_resource(Students, '/api/students', endpoint='/api/students')
api.add_resource(Events, '/api/events', endpoint='/api/events')
api.add_resource(StudentInfo, '/api/students/<int:id>', endpoint='/api/students/<int:id>')
api.add_resource(PianistInfo, '/api/pianists/<int:id>', endpoint='/api/pianists/<int:id>')
api.add_resource(CoordinatorInfo, '/api/coordinator/<int:id>', endpoint='/api/coordinator/<int:id>')
api.add_resource(Login, '/api/login', endpoint='/api/login')
api.add_resource(Logout, '/api/logout', endpoint='/api/logout')
api.add_resource(CheckSession, '/api/check-session', endpoint='/api/check-session')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

