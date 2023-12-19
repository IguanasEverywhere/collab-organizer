from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Coordinator(db.Model, SerializerMixin):
  __tablename__ = "Coordinators"

  serialize_rules = ('-students.coordinator', '-pianists.coordinator, -events.coordinator',)

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String)
  organization = db.Column(db.String)

  students = db.relationship('Student', back_populates='coordinator')
  pianists = db.relationship('Pianist', back_populates='coordinator')
  events = db.relationship('Event', back_populates='coordinator')

class Pianist(db.Model, SerializerMixin):
  __tablename__ = "Pianists"

  serialize_rules = ('-students.pianists', '-events.pianist', '-coordinator.pianists',)

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  role = db.Column(db.String)
  email = db.Column(db.String)

  coordinator_id = db.Column(db.Integer, db.ForeignKey('Coordinators.id'))

  students = db.relationship('Student', back_populates='pianists')
  events = db.relationship('Event', back_populates='pianist')

  coordinator = db.relationship('Coordinator', back_populates='pianists')

class Student(db.Model, SerializerMixin):
  __tablename__ = "Students"

  serialize_rules = ('-events.student', '-pianists.students, -coordinator.students',)

  id = db.Column(db.Integer, primary_key=True)

  name = db.Column(db.String)
  instrument = db.Column(db.String)
  teacher = db.Column(db.String)
  email = db.Column(db.String)

  coordinator_id = db.Column(db.Integer, db.ForeignKey('Coordinators.id'))

  events = db.relationship('Event', back_populates='student')
  pianists = db.relationship('Pianist', back_populates='students')

  coordinator = db.relationship('Coordinator', back_populates='students')

class Event(db.Model, SerializerMixin):
  __tablename__ = "Events"

  serialize_rules = ('-student.events', '-pianist.events, -coordinator.events',)

  id = db.Column(db.Integer, primary_key=True)

  event_type = db.Column(db.String)
  event_time = db.Column(db.DateTime)
  event_length = db.Column(db.Integer)
  location = db.Column(db.String)

  student_id = db.Column(db.Integer, db.ForeignKey('Students.id'))
  pianist_id = db.Column(db.Integer, db.ForeignKey('Pianists.id'))
  coordinator_id = db.Column(db.Integer, db.ForeignKey('Coordinators.id'))

  student = db.relationship('Student', back_populates='events')
  pianist = db.relationship('Pianist', back_populates='events')
  coordinator = db.relationship('Coordinator', back_populates='events')

