import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///tasks.db')
    # engine = db.create_engine("mysql+pymysql://root:password@localhost/Geeks4Geeks")
    SQLALCHEMY_TRACK_MODIFICATIONS = False