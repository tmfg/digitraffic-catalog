"""VACO entries: validation and conversion requests and their state

Revision ID: 5d2b8e7c4a19
Revises: f1fe0e480f69
Create Date: 2026-11-04 10:00:00.000000

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "5d2b8e7c4a19"
down_revision = "f1fe0e480f69"
branch_labels = None
depends_on = None

VACO_ENTRY_TABLE = "vaco_entry"


def upgrade():
    op.create_table(
        VACO_ENTRY_TABLE,
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("resource_id", sa.Text, nullable=False),
        sa.Column("package_id", sa.Text, nullable=False),
        sa.Column("entry_public_id", sa.Text),
        sa.Column("status", sa.Text),
        sa.Column("complete", sa.Boolean, nullable=False, server_default=sa.false()),
        sa.Column("validation_status", sa.Text),
        sa.Column("conversion_status", sa.Text),
        sa.Column("magic_link", sa.Text),
        sa.Column("etag", sa.Text),
        sa.Column("converted_resource_id", sa.Text),
        sa.Column("converted_file_checksum", sa.Text),
        sa.Column("submitted_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("polled_at", sa.DateTime(timezone=True)),
        sa.Column("error", sa.Text),
    )
    op.create_index(
        "idx_vaco_entry_resource_id_submitted_at",
        VACO_ENTRY_TABLE,
        ["resource_id", "submitted_at"],
    )


def downgrade():
    op.drop_table(VACO_ENTRY_TABLE)
