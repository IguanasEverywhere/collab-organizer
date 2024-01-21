from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!

class Coordinator(db.Model, SerializerMixin):
  __tablename__ = "Coordinators"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String)
  organization = db.Column(db.String)
  viewModePreference = db.Column(db.String)
  _password_hash = db.Column(db.String)

  @hybrid_property
  def password_hash(self):
    return self._password_hash

  @password_hash.setter
  def password_hash(self, password):
    password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = password_hash.decode('utf-8')

  def authenticate(self, password):
    return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

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

  events = db.relationship('Event', back_populates='student', cascade='all, delete-orphan')

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

