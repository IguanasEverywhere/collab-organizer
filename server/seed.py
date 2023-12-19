#!/usr/bin/env python3

# Standard library imports
from random import randint, choice

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Coordinator, Pianist, Student

if __name__ == '__main__':
    instruments = ["violin", "viola", "cello", "double bass", "flute", "oboe", "clarinet", "bassoon", "saxophone", "trumpet", "french horn", "tuba", "trombone", "voice"]

    roles = ["student", "TA", "staff"]

    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        Coordinator.query.delete()
        Pianist.query.delete()
        Student.query.delete()


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

        db.session.commit()

        print("Seeded!")
