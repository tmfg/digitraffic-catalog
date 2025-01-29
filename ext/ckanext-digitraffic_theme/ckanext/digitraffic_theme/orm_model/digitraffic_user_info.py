from typing import TypedDict, NotRequired, Self, Optional

from ckan.plugins import toolkit
import sqlalchemy as sa
from sqlalchemy.orm import relationship, Session

class DigitrafficUserInfoInput(TypedDict):
    phone: NotRequired[str]
    first_name: NotRequired[str]
    surname: NotRequired[str]
    country_of_residence: NotRequired[str]
    county: NotRequired[str]
    post_code: NotRequired[str]
    city: NotRequired[str]
    street_address: NotRequired[str]

class DigitrafficUserInfo(toolkit.BaseModel):
    __tablename__ = 'digitraffic_user_info'
    id = sa.Column('id', sa.Integer, primary_key=True)
    user_id = sa.Column('user', sa.Text, unique=True, nullable=False)
    phone = sa.Column('phone', sa.Text)
    first_name = sa.Column('first_name', sa.Text)
    surname = sa.Column('surname', sa.Text)
    country_of_residence = sa.Column('country_of_residence', sa.Text)
    county = sa.Column('county', sa.Text)
    post_code = sa.Column('post_code', sa.Text)
    city = sa.Column('city', sa.Text)
    street_address = sa.Column('street_address', sa.Text)

    ## Relationship without using a foreign key
    #user_id_rel = relationship('User',
    #                           foreign_keys=[user_id],
    #                              primaryjoin='User.id == DigitrafficUserInfo.user_id')

    def __init__(self, user_id: str, phone: str, first_name: str, surname: str, country_of_residence: str,
                 county: str, post_code: str, city: str, street_address: str):
        self.user_id = user_id
        self.phone = phone
        self.first_name = first_name
        self.surname = surname
        self.country_of_residence = country_of_residence
        self.county = county
        self.post_code = post_code
        self.city = city
        self.street_address = street_address

    @classmethod
    def get(cls, session: Session, user_id: str) -> Self:
        return (session.query(cls)
                .filter(cls.user_id == user_id)
                .first())

    @classmethod
    def upsert(cls, session: Session, user_id: str, user_data: DigitrafficUserInfoInput) -> Self:
        user_info = DigitrafficUserInfo.get(session, user_id)
        if user_info is not None:
            user_info.phone = user_data.get("phone")
            user_info.first_name = user_data.get("first_name")
            user_info.surname = user_data.get("surname")
            user_info.country_of_residence = user_data.get("country_of_residence")
            user_info.county = user_data.get("county")
            user_info.post_code = user_data.get("post_code")
            user_info.city = user_data.get("city")
            user_info.street_address = user_data.get("street_address")
        else:
            user_info = cls(
                user_id,
                user_data.get("phone"),
                user_data.get("first_name"),
                user_data.get("surname"),
                user_data.get("country_of_residence"),
                user_data.get("county"),
                user_data.get("post_code"),
                user_data.get("city"),
                user_data.get("street_address")
            )
            session.add(user_info)
        return user_info
