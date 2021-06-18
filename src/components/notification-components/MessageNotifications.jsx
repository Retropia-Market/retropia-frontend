import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useNotifications from '../../hooks/useNotifications';

const MessageNotifications = () => {
    const [hide, setHide] = useState(false);
    const { messages } = useSelector((s) => s.notifications);

    const results_messages = useNotifications('noti/messages');

    return (
        <div className="notifications">
            <div className="icon-bubble">
                {results_messages &&
                    results_messages.length > 0 &&
                    messages !== 0 && (
                        <div className="bubble">
                            <div>{messages}</div>
                        </div>
                    )}
                <div className="icon" onClick={() => setHide(!hide)}>
                    <FontAwesomeIcon className="messages" icon={faCommentDots}>
                        ICON
                    </FontAwesomeIcon>
                </div>
            </div>
            {hide && messages > 0 && (
                <div className="pop-up">
                    {results_messages &&
                        results_messages
                            .reduce((acc, product) => {
                                if (acc.length !== 0) {
                                    for (let p of acc) {
                                        if (p.username === product.username) {
                                            p['notifications']++;
                                            return acc;
                                        }
                                    }
                                }
                                acc.push({
                                    id: product.user_id,
                                    username: product.username,
                                    notifications: 1,
                                });
                                return acc;
                            }, [])
                            .map((message) => {
                                return (
                                    <Link to={`/profile/chat/${message.id}`}>
                                        <span>
                                            Tienes {message.notifications}{' '}
                                            mensajes de {message.username}
                                        </span>
                                    </Link>
                                );
                            })}
                </div>
            )}
        </div>
    );
};

export default MessageNotifications;
