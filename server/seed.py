#!/usr/bin/env python3

# Standard library imports
from random import randint, choice

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Coordinator, Pianist, Student, Event
from datetime import datetime

if __name__ == '__main__':
    instruments = ["violin", "viola", "cello", "double bass", "flute", "oboe", "clarinet", "bassoon", "saxophone", "trumpet", "french horn", "tuba", "trombone", "voice"]

    roles = ["student", "TA", "staff"]

    event_types = ["Junior Recital", "Senior Recital", "Jury", "Masterclass"]
    event_lengths = [30, 45, 60, 90]

    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        Coordinator.query.delete()
        Pianist.query.delete()
        Student.query.delete()
        Event.query.delete()


        coord1 = Coordinator(
            username="Scott",
            organization="Brock Family Music",
            viewModePreference="light",
            password_hash="mypw123"
        )
        coord2 = Coordinator(
            username="Doreen",
            organization="University of Iowa",
            viewModePreference="dark",
            password_hash="hello456"
        )

        db.session.add(coord1)
        db.session.add(coord2)


        for x in range(30):
            new_student = Student(
                name=fake.name(),
                instrument=choice(instruments),
                teacher=fake.name(),
                email=fake.email(),
                coordinator_id=1
            )
            db.session.add(new_student)

        for x in range(10):
            new_student = Student(
                name=fake.name(),
                instrument=choice(instruments),
                teacher=fake.name(),
                email=fake.email(),
                coordinator_id=2
            )
            db.session.add(new_student)

        for x in range(6):
            new_pianist = Pianist(
                name=fake.name(),
                role=choice(roles),
                email=fake.email(),
                coordinator_id=1
            )
            db.session.add(new_pianist)

        for x in range(4):
            new_pianist = Pianist(
                name=fake.name(),
                role=choice(roles),
                email=fake.email(),
                coordinator_id=2
            )
            db.session.add(new_pianist)

        for x in range (20):
            # random_datetime_str = fake.date_time().strftime('%Y-%m-%d %H:%M')
            # random_datetime = datetime.strptime(random_datetime_str, '%Y-%m-%d %H:%M')
            # print(random_datetime)
            new_event = Event(
                event_type = choice(event_types),
                event_length = choice(event_lengths),
                event_time = fake.date_time(),
                location = fake.address(),
                student_id = randint(1, 30),
                pianist_id = randint(1, 6),
                coordinator_id = 1,
            )
            db.session.add(new_event)

        for x in range (20):
            new_event = Event(
                event_type = choice(event_types),
                event_length = choice(event_lengths),
                event_time = fake.date_time(),
                location = fake.address(),
                student_id = randint(31, 40),
                pianist_id = randint(7, 10),
                coordinator_id = 2,
            )
            db.session.add(new_event)

        db.session.commit()

        print("Seeded!")
