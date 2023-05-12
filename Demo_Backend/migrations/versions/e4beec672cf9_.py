"""empty message

Revision ID: e4beec672cf9
Revises: 8afe13870844
Create Date: 2023-05-08 00:33:24.900780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e4beec672cf9'
down_revision = '8afe13870844'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('valid',
               existing_type=sa.VARCHAR(length=20),
               type_=sa.Boolean(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('valid',
               existing_type=sa.Boolean(),
               type_=sa.VARCHAR(length=20),
               existing_nullable=True)

    # ### end Alembic commands ###