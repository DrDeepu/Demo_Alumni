from Models.models import db

class Base:
    @classmethod
    def create(cls, **kwargs):
        """Create record."""
        instance = cls(**kwargs)
        db.session.add(instance)

        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise
        return instance