"""task

Revision ID: 740fbf35a793
Revises: 623673a2c254
Create Date: 2023-08-11 15:18:48.061655

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "740fbf35a793"
down_revision = "623673a2c254"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "scheduler_config",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.Column("evening_start", sa.Time(), nullable=False),
        sa.Column("morning_start", sa.Time(), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_scheduler_config")),
    )
    op.create_table(
        "tasks",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.Column(
            "status",
            sa.Enum("AWAITING", "PROCESSING", "ERROR", "DONE", name="taskstatus"),
            nullable=False,
        ),
        sa.Column("time", sa.DateTime(), nullable=False),
        sa.Column("name", sa.String(length=64), nullable=False),
        sa.Column("job_id", sa.String(length=64), nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_tasks")),
        sa.UniqueConstraint("job_id", name=op.f("uq_tasks_job_id")),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("tasks")
    op.drop_table("scheduler_config")
    # ### end Alembic commands ###
