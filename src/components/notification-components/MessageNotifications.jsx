import { faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import useNotifications from '../../hooks/useNotifications';
import { motion } from 'framer-motion';

const MessageNotifications = () => {
    const [hide, setHide] = useState(false);
    const { messages } = useSelector((s) => s.notifications);

    const results_messages = useNotifications('noti/messages');

    return (
        <div className="notifications-container">
            <div className="notifications">
                <motion.div className="icon-bubble">
                    {results_messages &&
                        results_messages.length > 0 &&
                        messages !== 0 && (
                            <div className="bubble">
                                <div>
                                    <span>{messages}</span>
                                </div>
                            </div>
                        )}
                    <div
                        className="icon-custom icon-fill"
                        onClick={() => setHide(!hide)}
                    >
                        <FontAwesomeIcon
                            className="messages"
                            icon={faCommentDots}
                        >
                            ICON
                        </FontAwesomeIcon>
                    </div>
                </motion.div>
            </div>
            {hide && (
                <motion.div
                    className="pop-up"
                    initial={{ opacity: 0, x: 0 }}
                    animate={{
                        opacity: 1,
                        x: -50,
                        y: 5,
                        transition: {
                            duration: 0.4,
                        },
                    }}
                >
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
                                    <Link
                                        to={`/profile/chat/${message.id}`}
                                        onClick={() => setHide(!hide)}
                                    >
                                        <span>
                                            <FormattedMessage
                                                id="notifications.message"
                                                values={{
                                                    notifications:
                                                        message.notifications,
                                                    username: message.username,
                                                }}
                                            />
                                        </span>
                                    </Link>
                                );
                            })}
                    {messages === 0 && (
                        <span onClick={() => setHide(!hide)}>
                            <FormattedMessage id="notifications.nothing" />
                        </span>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default MessageNotifications;
