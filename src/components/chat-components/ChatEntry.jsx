import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useImage from '../../hooks/useImage';

function DateViewer({ value }) {
    const now = new Date().toISOString();
    if (value.substr(0, 10) === now.substr(0, 10)) {
        return value.substr(11, 5);
    } else {
        return (
            value.substr(8, 2) +
            '/' +
            value.substr(5, 2) +
            '/' +
            value.substr(0, 4)
        );
    }
}


function ChatEntry({ contact, contactId }) {
    const avatar = useImage(contact?.avatar)
    const {id} = useParams()
    console.log(id)
    console.log(contactId)

    return (
        <Link className={`chat-entry ${contactId === contact?.id && "active"}`} to={`/profile/chat/${contact.id}`}>
            <div
                className="avatar"
                style={{ backgroundImage: `url(${avatar})` }}
            />
            <div className="info">
                <div className="top-row">
                    {<div className="contact-name">{contact.username}</div>}
                    {contact.lastMessage && (
                        <div className="date">
                            <DateViewer value={contact.lastMessage.date} />
                        </div>
                    )}
                </div>
                <div className="bottom-row">
                    {contact.lastMessage && (
                        <div className="message">
                            {contact.lastMessage.message}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ChatEntry;
