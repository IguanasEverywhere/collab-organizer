#!/usr/bin/env python3

# Standard library imports
from random import randint, choice

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Coordinator, Pianist, Student, Event

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
            organization="some school"
        )

        db.session.add(coord1)
        db.session.commit()

        for x in range(50):
            new_student = Student(
                name=fake.name(),
                instrument=choice(instruments),
                teacher=fake.name(),
                email=fake.email()
            )
            db.session.add(new_student)

        for x in range(10):
            new_pianist = Pianist(
                name=fake.name(),
                role=choice(roles),
                email=fake.email()
            )
            db.session.add(new_pianist)

        for x in range (20):
            new_event = Event(
                event_type = choice(event_types),
                event_length = choice(event_lengths),
                event_time = fake.date_time(),
                location = fake.address(),
                student_id = randint(1, 50),
                pianist_id = randint(1, 10),
                coordinator_id = 1,
            )
            db.session.add(new_event)

        db.session.commit()

        print("Seeded!")
