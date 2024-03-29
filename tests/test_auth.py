from app import mail
from app import models as m
from app import db
from tests.utils import register, login, logout


TEST_EMAIL = "saintkos117@gmail.com"


def test_auth_pages(client):
    response = client.get("/login")
    assert response.status_code == 200
    response = client.get("/logout")
    assert response.status_code == 302
    response = client.get("/forgot")
    assert response.status_code == 200


def test_forgot(client):
    response = client.post(
        "/forgot",
        data=dict(
            email=TEST_EMAIL,
        ),
        follow_redirects=True,
    )
    assert b"No registered user with this e-mail" in response.data

    user = m.User(
        username="sam",
        email=TEST_EMAIL,
        password="password",
    )
    user.save()
    with mail.record_messages() as outbox:
        response = client.post(
            "/forgot",
            data=dict(
                email=TEST_EMAIL,
            ),
            follow_redirects=True,
        )

        assert (
            b"Password reset successful. For set new password please check your e-mail."
            in response.data
        )
        user = db.session.scalar(
            m.User.select().where(m.User.email == TEST_EMAIL)
        )
        assert user

        assert len(outbox) == 1
        letter = outbox[0]
        assert letter.subject == "Reset password"
        assert ("/password_recovery/" + user.unique_id) in letter.html

    response = client.post(
        "/password_recovery/" + user.unique_id,
        data=dict(
            password="123456789",
            password_confirmation="123456789",
        ),
        follow_redirects=True,
    )
    assert b"Login successful." in response.data


def test_login_and_logout(client):
    # Access to logout view before login should fail.
    response = logout(client)
    register("sam", "sam@test.com")
    response = login(client, "sam")
    assert b"Login successful." in response.data
    # Incorrect login credentials should fail.
    response = login(client, "sam", "wrongpassword")
    assert b"Wrong user ID or password." in response.data
    # Correct credentials should login
    response = login(client, "sam")
    assert b"Login successful." in response.data
