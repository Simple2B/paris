from app import models as m
from app.logger import log
from app import db


def update_telegram_chat(chat_id: int, title: str, is_deleted: bool = False):
    """Update or create new TelegramChat object

    Args:
        chat_id (int): chat id
        title (str): chat title
        is_deleted (bool, optional): is chat deleted. Defaults to False.
    """
    with db.begin() as session:
        tg_chat: m.TelegramChat = session.scalar(
            m.TelegramChat.select().where(m.TelegramChat.chat_id == chat_id)
        )
        if not tg_chat:
            log(log.INFO, f"Creating new TelegramChat - [{chat_id}]")
            tg_chat = m.TelegramChat(chat_id=chat_id, title=title)
            session.add(tg_chat)
        else:
            if is_deleted:
                log(log.INFO, f"Deleting TelegramChat - [{chat_id}]")
                tg_chat.is_deleted = True
            else:
                log(
                    log.INFO,
                    f"Updating existing TelegramChat - [{chat_id}] to title [{title}]",
                )
                tg_chat.is_deleted = False
                tg_chat.total_tickets = title