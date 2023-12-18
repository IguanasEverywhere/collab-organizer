#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Coordinator

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        coord1 = Coordinator(
            username="Scott",
            organization="some school"
        )

        db.session.add(coord1)
        db.session.commit()

        print("Seeded!")
