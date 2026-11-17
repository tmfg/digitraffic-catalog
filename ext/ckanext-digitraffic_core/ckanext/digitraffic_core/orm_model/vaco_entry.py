from datetime import datetime
from typing import Optional

import sqlalchemy as sa
from ckan.plugins import toolkit


class VacoEntry(toolkit.BaseModel):
    """One request (entry) sent to VACO for one resource, and what came back."""

    __tablename__ = "vaco_entry"
    id = sa.Column("id", sa.Integer, primary_key=True)
    resource_id = sa.Column("resource_id", sa.Text, nullable=False)
    package_id = sa.Column("package_id", sa.Text, nullable=False)
    # Empty when VACO did not accept the request
    entry_public_id = sa.Column("entry_public_id", sa.Text)
    status = sa.Column("status", sa.Text)
    complete = sa.Column("complete", sa.Boolean, nullable=False, default=False)
    validation_status = sa.Column("validation_status", sa.Text)
    conversion_status = sa.Column("conversion_status", sa.Text)
    magic_link = sa.Column("magic_link", sa.Text)
    etag = sa.Column("etag", sa.Text)
    converted_resource_id = sa.Column("converted_resource_id", sa.Text)
    converted_file_checksum = sa.Column("converted_file_checksum", sa.Text)
    submitted_at = sa.Column("submitted_at", sa.DateTime(timezone=True), nullable=False)
    polled_at = sa.Column("polled_at", sa.DateTime(timezone=True))
    error = sa.Column("error", sa.Text)

    def __init__(
        self,
        resource_id: str,
        package_id: str,
        submitted_at: datetime,
        entry_public_id: Optional[str] = None,
        status: Optional[str] = None,
        complete: bool = False,
        magic_link: Optional[str] = None,
        error: Optional[str] = None,
    ):
        self.resource_id = resource_id
        self.package_id = package_id
        self.submitted_at = submitted_at
        self.entry_public_id = entry_public_id
        self.status = status
        self.complete = complete
        self.magic_link = magic_link
        self.error = error
