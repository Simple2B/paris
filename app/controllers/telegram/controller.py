import json

import requests

from config import config
from app.logger import log
from app import models as m
from app import db
from .utils import send_message, processing_chats

cfg = config()

TELEGRAM_API_URL = f"https://api.telegram.org/bot{cfg.TELEGRAM_BOT_TOKEN}"

# scheduler should get updates at least once at day


def send_message_to_chats(text: str):
    with db.begin() as session:
        chats = session.query(m.TelegramChat).filter(
            m.TelegramChat.is_deleted == False  # noqa E712
        )
        for chat in chats:
            send_message(chat_id=chat.chat_id, text=text)


def get_updates():
    resp = requests.get(TELEGRAM_API_URL + "/getUpdates")
    data = json.loads(resp.text)
    results = data.get("result")
    for res in results:
        processing_chats(res)
    log(log.INFO, "Updates processed")
