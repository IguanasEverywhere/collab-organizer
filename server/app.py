#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, render_template, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Coordinator, Pianist, Student, Event
from datetime import datetime
from sqlalchemy import or_


# Views go here!
@app.route('/')
@app.route('/pianists')
@app.route('/events')
@app.route('/students')
def index(id=0):
    return render_template("index.html")

@app.before_request
def check_logged_in_status():

    locked_endpoints = ['/api/pianists', '/api/students', '/api/events']
    if request.endpoint in locked_endpoints and request.method == 'GET':
        if not session.get('logged_in_coordinator_id'):
            response = make_response({'Error': 'Not Logged In'}, 401)
            return response


class Coordinators(Resource):
    def get(self):
        all_coordinators = Coordinator.query.all()
        coordinator_dicts = [coordinator.to_dict() for coordinator in all_coordinators]

        response = make_response(coordinator_dicts, 200)
        return response

    def post(self):
        signup_data = request.get_json()

        print(signup_data['username'])

        new_coordinator = Coordinator(
            username=signup_data['username'],
            password_hash=signup_data['password'],
            organization=signup_data['organization'],
            viewModePreference='light'
        )

        db.session.add(new_coordinator)
        db.session.commit()

        response = make_response(new_coordinator.to_dict(), 201)
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

    def post(self):
        current_coord = session.get('logged_in_coordinator_id')

        new_pianist_info = request.get_json()

        name = new_pianist_info['name']
        role = new_pianist_info['role']
        email = new_pianist_info['email']
        coordinator_id = current_coord

        new_pianist = Pianist(
            name=name,
            role=role,
            email=email,
            coordinator_id=coordinator_id
        )

        db.session.add(new_pianist)
        db.session.commit()

        response = make_response(new_pianist.to_dict(), 201)
        return response

class PianistInfo(Resource):
    def get(self, id):
        pianist = Pianist.query.filter(Pianist.id==id).first()
        pianist_dict = pianist.to_dict()

        response = make_response(pianist_dict, 200)
        return response

    def delete(self, id):
        pianist_to_delete = Pianist.query.filter(Pianist.id==id).first()

        db.session.delete(pianist_to_delete)
        db.session.commit()

        response = {'Success': 'Pianist deleted'}
        return response


class Students(Resource):
    def get(self):

        current_coord = session.get('logged_in_coordinator_id')

        all_students = Student.query.filter(Student.coordinator_id==current_coord).all()
        student_dicts = [student.to_dict() for student in all_students]

        response = make_response(student_dicts, 200)
        return response

    def post(self):

        current_coord = session.get('logged_in_coordinator_id')

        new_student_info = request.get_json()

        name = new_student_info['name']
        instrument = new_student_info['instrument']
        teacher = new_student_info['teacher']
        email = new_student_info['email']
        coordinator_id = current_coord

        new_student = Student(
            name=name,
            instrument=instrument,
            teacher=teacher,
            email=email,
            coordinator_id=coordinator_id
        )

        db.session.add(new_student)
        db.session.commit()

        response = make_response(new_student.to_dict(), 201)
        return response


class StudentInfo(Resource):
    def get(self, id):
        student = Student.query.filter(Student.id==id).first()
        student_info_dict = student.to_dict()
        response = make_response(student_info_dict, 200)

        return response

    def delete(self, id):
        student_to_delete = Student.query.filter(Student.id==id).first()

        db.session.delete(student_to_delete)
        db.session.commit()

        response = make_response({"Success": "Student Deleted"}, 200)
        return response



class Events(Resource):
    def get(self):
        current_coord = session.get('logged_in_coordinator_id')

        all_events = Event.query.filter(Event.coordinator_id==current_coord).order_by(Event.event_time).all()
        event_dicts = [event.to_dict() for event in all_events]

        # not needed, it's already in there
        # for event in event_dicts:
        #     student = Student.query.filter(Student.id==event['student_id']).first()
        #     event['student_name'] = student.name

        response = make_response(event_dicts, 200)
        return response

    def post(self):
        current_coord = session.get('logged_in_coordinator_id')

        event_data = request.get_json()

        event_type = event_data['eventType']
        event_time = event_data['eventTime']
        event_length = event_data['eventLength']
        location = event_data['eventLocation']
        student_id = event_data['studentId']
        pianist_id = event_data['pianistId']
        coordinator_id = current_coord

        date_time_obj = datetime.strptime(event_time, '%Y-%m-%dT%H:%M')

        new_event = Event(
            event_type=event_type,
            event_time=date_time_obj,
            event_length=event_length,
            location=location,
            student_id=student_id,
            pianist_id=pianist_id,
            coordinator_id=coordinator_id
        )

        db.session.add(new_event)
        db.session.commit()

        response = make_response(new_event.to_dict(), 201)
        return response


class EventInfo(Resource):
    def get(self, id):
        event = Event.query.filter(Event.id==id).first()
        response = make_response(event.to_dict(), 200)
        return response

    def patch(self, id):
        event_to_edit = Event.query.filter(Event.id==id).first()

        form_data = request.get_json()
        eventType = form_data['eventType']
        eventLength = form_data['eventLength']
        eventLocation = form_data['eventLocation']
        pianistId = form_data['pianistId']
        eventTime = form_data['eventTime']

        coordinatorId = session.get('logged_in_coordinator_id')

        event_to_edit.event_type = eventType
        event_to_edit.event_length = eventLength
        event_to_edit.location = eventLocation
        event_to_edit.pianist_id = pianistId
        event_to_edit.coordinator_id = coordinatorId


        try:
          date_time_obj = datetime.strptime(eventTime, '%Y-%m-%dT%H:%M:%S')
        except:
          date_time_obj = datetime.strptime(eventTime, '%Y-%m-%d %H:%M:%S')


        event_to_edit.event_time = date_time_obj

        db.session.commit()

    def delete(self, id):
        event_to_delete = Event.query.filter(Event.id==id).first()

        db.session.delete(event_to_delete)
        db.session.commit()

        response = make_response({"Success": "Event Deleted"}, 200)
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
            print("session", session['logged_in_coordinator_id'])
            current_user = Coordinator.query.filter(Coordinator.id==session['logged_in_coordinator_id']).first()

            return current_user.to_dict(), 200
        else:
            return None

class UnassignedEvents(Resource):
    def get(self):
        current_coord = session.get('logged_in_coordinator_id')
        events_with_null_pianist = Event.query.filter(or_(Event.pianist_id==None, Event.pianist_id=="")).all()

        serialized_events = [event.to_dict() for event in events_with_null_pianist if event.coordinator_id==current_coord]

        response = make_response(serialized_events, 200)
        return response


api.add_resource(Coordinators, '/api/coordinator', endpoint='/api/coordinator')
api.add_resource(Pianists, '/api/pianists', endpoint='/api/pianists')
api.add_resource(Students, '/api/students', endpoint='/api/students')
api.add_resource(Events, '/api/events', endpoint='/api/events')
api.add_resource(StudentInfo, '/api/students/<int:id>', endpoint='/api/students/<int:id>')
api.add_resource(PianistInfo, '/api/pianists/<int:id>', endpoint='/api/pianists/<int:id>')
api.add_resource(EventInfo, '/api/events/<int:id>', endpoint='/api/events/<int:id>')
api.add_resource(CoordinatorInfo, '/api/coordinator/<int:id>', endpoint='/api/coordinator/<int:id>')
api.add_resource(Login, '/api/login', endpoint='/api/login')
api.add_resource(Logout, '/api/logout', endpoint='/api/logout')
api.add_resource(CheckSession, '/api/check-session', endpoint='/api/check-session')
api.add_resource(UnassignedEvents, '/api/unassigned-events', endpoint='/api/unassigned-events')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

