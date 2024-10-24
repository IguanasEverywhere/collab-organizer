from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class Coordinator(db.Model, SerializerMixin):
  __tablename__ = "coordinators"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, nullable=False)
  organization = db.Column(db.String, nullable=False)
  viewModePreference = db.Column(db.String, nullable=False)
  _password_hash = db.Column(db.String, nullable=False)

  @hybrid_property
  def password_hash(self):
    return self._password_hash

  @password_hash.setter
  def password_hash(self, password):
    password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = password_hash.decode('utf-8')

  def authenticate(self, password):
    return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

  serialize_rules = ('-events.coordinator',)

  events = db.relationship('Event', back_populates='coordinator', cascade='all, delete-orphan')


class Pianist(db.Model, SerializerMixin):
  __tablename__ = "pianists"

  serialize_rules = ('-events.pianist',)

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  role = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)

  @validates('email')
  def validate_email(self, key, email_address):
    if '@' not in email_address or '.' not in email_address:
      raise ValueError("Invalid Email Address")
    return email_address

  coordinator_id = db.Column(db.Integer, db.ForeignKey('coordinators.id'))

  events = db.relationship('Event', back_populates='pianist')

class Student(db.Model, SerializerMixin):
  __tablename__ = "students"

  serialize_rules = ('-events.student',)

  id = db.Column(db.Integer, primary_key=True)

  name = db.Column(db.String, nullable=False)
  instrument = db.Column(db.String, nullable=False)
  teacher = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)

  @validates('email')
  def validate_email(self, key, email_address):
    if '@' not in email_address or '.' not in email_address:
      raise ValueError("Invalid Email Address")
    return email_address

  coordinator_id = db.Column(db.Integer, db.ForeignKey('coordinators.id'))

  events = db.relationship('Event', back_populates='student', cascade='all, delete-orphan')

class Event(db.Model, SerializerMixin):
  __tablename__ = "events"

  serialize_rules = ('-student.events', '-pianist.events', '-coordinator.events',)

  id = db.Column(db.Integer, primary_key=True)

  event_type = db.Column(db.String, nullable=False)
  event_time = db.Column(db.DateTime, nullable=False)
  event_length = db.Column(db.Integer, nullable=False)
  location = db.Column(db.String, nullable=False)

  student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
  pianist_id = db.Column(db.Integer, db.ForeignKey('pianists.id'))
  coordinator_id = db.Column(db.Integer, db.ForeignKey('coordinators.id'))

  student = db.relationship('Student', back_populates='events')
  pianist = db.relationship('Pianist', back_populates='events')

  coordinator = db.relationship('Coordinator', back_populates='events')

