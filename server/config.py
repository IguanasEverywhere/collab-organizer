# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

from flask_bcrypt import Bcrypt

import os
from dotenv import load_dotenv, find_dotenv
load_dotenv()
# load_dotenv(find_dotenv(".env"))


# Local imports

# Instantiate app, set attributes
app = Flask(__name__,
            static_url_path='',
            static_folder='../client/build',
            template_folder='../client/build')

#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



# works, but is in config file
#app.secret_key="placeholderkey"


app.secret_key=os.environ.get('SECRET_KEY')

print("SECRET KEY: ", os.environ.get('SECRET_KEY'))
print("DATABASE URI: ", os.environ.get('DATABASE_URI'))

app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)


bcrypt = Bcrypt(app)


# Instantiate CORS
CORS(app)
