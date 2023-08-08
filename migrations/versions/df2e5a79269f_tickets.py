"""tickets

Revision ID: df2e5a79269f
Revises: 6a7135cb0174
Create Date: 2023-08-06 10:22:15.612925

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "df2e5a79269f"
down_revision = "6a7135cb0174"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "tickets_date",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("date", sa.DateTime(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.Column("total_tickets", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_tickets_date")),
    )
    op.create_table(
        "tickets_time",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("ticket_date_id", sa.Integer(), nullable=False),
        sa.Column("clock", sa.Time(), nullable=False),
        sa.Column(
            "floor",
            sa.Enum("FIRST", "SECOND", name="floor"),
            server_default="FIRST",
            nullable=False,
        ),
        sa.Column("tickets", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["ticket_date_id"],
            ["tickets_date.id"],
            name=op.f("fk_tickets_time_ticket_date_id_tickets_date"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_tickets_time")),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("tickets_time")
    op.drop_table("tickets_date")
    # ### end Alembic commands ###
