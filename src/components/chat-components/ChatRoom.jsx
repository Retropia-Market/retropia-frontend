import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';

import useChat from '../../hooks/useChat';
import useFetchChat from '../../hooks/useFetchChat';
// import useImage from '../../hooks/useImage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

function ChatRoom({ setContactId }) {
  useChat();
  const { id } = useParams();

  const user = useSelector((s) => s.user);
  useFetchChat(
    `https://api.retropia-market.com/chats/${user.userData.id}/get-messages/${id}`,
    'fetch/messages'
  );
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    fetch(
      'https://api.retropia-market.com/chats/' +
        user.userData.id +
        '/send-message/' +
        id,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.token,
        },
        body: JSON.stringify({ message }),
      }
    );
  };

  // const contact = useSelector((s) => s.contacts[id]);
  const messages = useSelector((s) => s.messages[id]) || [];
  // const avatar = useImage(contact?.avatar);

  return (
    <div className="chat-room">
      {/* {contact && (
        <header className="chat-header">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          <div className="username">{contact.username}</div>
        </header>
      )} */}
      <div className="messages">
        {messages.map((m) => (
          <div
            className={
              'message ' + (m.dst_id === parseInt(id) ? 'own' : 'remote')
            }
            key={m.id}
          >
            {m.message}
          </div>
        ))}
      </div>
      <form className="footer-chat" onSubmit={handleSubmit}>
        <div className="input">
          <input
            placeholder="Escribe aquí..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-button">
            <FontAwesomeIcon icon={faLocationArrow} size="2x"></FontAwesomeIcon>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatRoom;
