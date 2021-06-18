import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';

const MessageNotifications = () => {
    const user = useSelector((s) => s.user);
    const [hide, setHide] = useState(false);
    const [notifications, setNotifications] = useState(0);

    const [results_messages] = useFetch(
        'http://localhost:8080/api/notifications/messages',
        user
    );
    return (
        <div className="notifications">
            <div className="icon-bubble">
                <div className="bubble">
                    {results_messages && results_messages.length > 0 ? (
                        <div>{results_messages.length}</div>
                    ) : (
                        ''
                    )}
                </div>
                <div className="icon" onClick={() => setHide(!hide)}>
                    <FontAwesomeIcon className="messages" icon={faCommentDots}>
                        ICON
                    </FontAwesomeIcon>
                </div>
            </div>
            {hide && (
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
                                    <span>
                                        Tienes {message.notifications} mensajes
                                        de {message.username}
                                    </span>
                                );
                            })}
                </div>
            )}
        </div>
    );
};

export default MessageNotifications;
