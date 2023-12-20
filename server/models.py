from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Coordinator(db.Model, SerializerMixin):
  __tablename__ = "Coordinators"

  # getting rid of relationships for now...relating to students also had relation to events and coordinator, but events also had relationship to coordinator. Adding -coordinator to each table was insufficient, maybe because relationships are traversed even if not serialized?


  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String)
  organization = db.Column(db.String)

  # students = db.relationship('Student', back_populates='coordinator')
  # pianists = db.relationship('Pianist', back_populates='coordinator')
  # events = db.relationship('Event', back_populates='coordinator')

class Pianist(db.Model, SerializerMixin):
  __tablename__ = "Pianists"

  serialize_rules = ('-events.pianist',)

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  role = db.Column(db.String)
  email = db.Column(db.String)

  coordinator_id = db.Column(db.Integer, db.ForeignKey('Coordinators.id'))

  events = db.relationship('Event', back_populates='pianist')

class Student(db.Model, SerializerMixin):
  __tablename__ = "Students"

  serialize_rules = ('-events.student',)

  id = db.Column(db.Integer, primary_key=True)

  name = db.Column(db.String)
  instrument = db.Column(db.String)
  teacher = db.Column(db.String)
  email = db.Column(db.String)

  coordinator_id = db.Column(db.Integer, db.ForeignKey('Coordinators.id'))

  events = db.relationship('Event', back_populates='student')

class Event(db.Model, SerializerMixin):
  __tablename__ = "Events"

  serialize_rules = ('-student.events', '-pianist.events',)

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

