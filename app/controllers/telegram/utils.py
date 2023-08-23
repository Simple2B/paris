import requests

from config import config, ProductionConfig
from app.logger import log
from .chats import update_telegram_chat

cfg = config()


if isinstance(cfg, ProductionConfig):
    TELEGRAM_API_URL = f"https://api.telegram.org/bot{cfg.TELEGRAM_BOT_TOKEN}"
    BOT_ID = cfg.BOT_ID
else:
    raise Exception("Wrong config")


def send_message(chat_id: int, text: str):
    requests.post(
        TELEGRAM_API_URL + "/sendMessage", data={"chat_id": chat_id, "text": text}
    )
    log(log.INFO, f"Message sent to chat [{chat_id}]")


def processing_chats(res: dict):
    new_chat_flag = res.get("my_chat_member")
    updates_chat_flag = res.get("message", {}).get("new_chat_title")
    is_deleted: bool = res.get("message", {}).get("left_chat_member", {}).get(
        "id"
    ) == int(BOT_ID)
    if new_chat_flag:
        chat_id = new_chat_flag["chat"]["id"]
        title = new_chat_flag["chat"]["title"]
        update_telegram_chat(chat_id=chat_id, title=title)
    elif updates_chat_flag:
        chat_id = res["message"]["chat"]["id"]
        title = res["message"]["chat"]["title"]
        update_telegram_chat(chat_id=chat_id, title=title)
    elif is_deleted:
        chat_id = res["message"]["chat"]["id"]
        title = res["message"]["chat"]["title"]
        update_telegram_chat(chat_id=chat_id, title=title, is_deleted=True)
    else:
        log(log.INFO, "No updates in chats")
