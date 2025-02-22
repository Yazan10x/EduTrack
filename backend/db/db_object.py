
import os
from pymongo import MongoClient
from pymongo.database import Database
import mongoengine as me

# Configuration and MongoDB Connection
MONGODB_KEY = os.getenv("MONGODB_KEY")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME")
if not MONGODB_KEY:
    raise ValueError("MONGODB_KEY environment variable not set")

# Connect to MongoDB using mongoengine
me.connect(db=MONGODB_DB_NAME, host=MONGODB_KEY)
