import json

import requests

from config import config
from app.logger import log
from app import models as m
from .chats import update_telegram_chat, get_all_chats

cfg = config()

API_URL = f"https://api.telegram.org/bot{cfg.TELEGRAM_BOT_TOKEN}"

# scheduler should get updates at least once at day


def processing_chats(res: dict):
    new_chat_flag: bool = res.get("my_chat_member")
    updates_chat_flag: bool = res.get("message", {}).get("new_chat_title")
    is_deleted: bool = res.get("message", {}).get("left_chat_member").get("id") == int(
        cfg.BOT_ID
    )
    if new_chat_flag:
        chat_id = new_chat_flag.get("chat").get("id")
        title = new_chat_flag.get("chat").get("title")
        update_telegram_chat(chat_id=chat_id, title=title)
    elif updates_chat_flag:
        chat_id = res.get("message").get("chat").get("id")
        title = res.get("message").get("chat").get("title")
        update_telegram_chat(chat_id=chat_id, title=title)
    elif is_deleted:
        chat_id = res.get("message").get("chat").get("id")
        title = res.get("message").get("chat").get("title")
        update_telegram_chat(chat_id=chat_id, is_deleted=True)
    else:
        log(log.INFO, "No updates in chats")


def send_message_to_chats(text: str):
    chats: m.TelegramChat = get_all_chats()
    for chat in chats:
        send_message(chat_id=chat.chat_id, text=text)


def send_message(chat_id: int, text: str):
    requests.post(API_URL + "/sendMessage", data={"chat_id": chat_id, "text": text})


def get_updates():
    resp = requests.get(API_URL + "/getUpdates")
    data = json.loads(resp.text)
    results = data.get("result")
    if results:
        for res in results:
            processing_chats(res)
    else:
        log(log.INFO, "No updates")
    log(log.INFO, "Updates processed")
