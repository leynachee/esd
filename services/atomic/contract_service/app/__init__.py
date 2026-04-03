from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    from app.routes.contract_routes import contract_bp
    app.register_blueprint(contract_bp)

    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            app.logger.warning(f"db.create_all() skipped: {e}")

    return app