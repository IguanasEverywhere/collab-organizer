from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Coordinator(db.Model, SerializerMixin):
  __tablename__ = "Coordinators"

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String)
  organization = db.Column(db.String)

class Pianist(db.Model, SerializerMixin):
  __tablename__ = "Pianists"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  role = db.Column(db.String)
  email = db.Column(db.String)

class Student(db.Model, SerializerMixin):
  __tablename__ = "Students"

  id = db.Column(db.Integer, primary_key=True)

  name = db.Column(db.String)
  instrument = db.Column(db.String)
  teacher = db.Column(db.String)
  email = db.Column(db.String)

class Event(db.Model, SerializerMixin):
  __tablename__ = "Events"

  id = db.Column(db.Integer, primary_key=True)

  event_type = db.Column(db.String)
  event_time = db.Column(db.DateTime)
  event_length = db.Column(db.Integer)
  location = db.Column(db.String)

