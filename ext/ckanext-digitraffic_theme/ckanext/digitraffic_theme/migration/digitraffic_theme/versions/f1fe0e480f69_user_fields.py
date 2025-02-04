"""User fields

Revision ID: f1fe0e480f69
Revises: 
Create Date: 2025-01-23 10:44:20.271809

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "f1fe0e480f69"
down_revision = None
branch_labels = None
depends_on = None

DIGITRAFFIC_USER_INFO_TABLE = "digitraffic_user_info"


def upgrade():
    op.create_table(
        DIGITRAFFIC_USER_INFO_TABLE,
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column(
            "user",
            sa.Text,
            unique=True,
            nullable=False,
            comment="This column value should be the id of the core user table",
        ),
        sa.Column("phone", sa.Text),
        sa.Column("first_name", sa.Text),
        sa.Column("surname", sa.Text),
        sa.Column("country_of_residence", sa.Text),
        sa.Column("county", sa.Text),
        sa.Column("post_code", sa.Text),
        sa.Column("city", sa.Text),
        sa.Column("street_address", sa.Text),
    )


def downgrade():
    op.drop_table(DIGITRAFFIC_USER_INFO_TABLE)
