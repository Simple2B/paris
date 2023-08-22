import requests

from config import config
from app.logger import log
from .chats import update_telegram_chat

cfg = config()

TELEGRAM_API_URL = f"https://api.telegram.org/bot{cfg.TELEGRAM_BOT_TOKEN}"


def send_message(chat_id: int, text: str):
    requests.post(
        TELEGRAM_API_URL + "/sendMessage", data={"chat_id": chat_id, "text": text}
    )
    log(log.INFO, f"Message sent to chat [{chat_id}]")


def processing_chats(res: dict):
    new_chat_flag: bool = res.get("my_chat_member")
    updates_chat_flag: bool = res.get("message", {}).get("new_chat_title")
    is_deleted: bool = res.get("message", {}).get("left_chat_member", {}).get(
        "id"
    ) == int(cfg.BOT_ID)
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
        update_telegram_chat(chat_id=chat_id, title=title, is_deleted=True)
    else:
        log(log.INFO, "No updates in chats")
