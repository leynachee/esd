from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    from app.routes.contract_routes import contract_bp
    app.register_blueprint(contract_bp)

    with app.app_context():
        from app.models.contract_model import Contract
        db.create_all()

    return app