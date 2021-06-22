import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';

import MainBackground from '../MainBackground'
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

function Chat({ user }) {
    const [contactId, setContactId] = useState()


    if (!Object.keys(user).length) {
        return <Redirect to="/" />;
    }
    
    return (
        <div className="chat">
            <ChatList contacId={contactId}/>
            <Switch>
                <Route path="/profile/chat" exact>
                    <div className="dbc-welcome">
                        <MainBackground className="chat-background"/> 
                        {/* <FormattedMessage className="chat-welcome" id="chat.welcome" /> */}
                    </div>
                </Route>
                <Route path="/profile/chat/:id" exact>
                    <ChatRoom setContactId={setContactId}/>
                </Route>
            </Switch>
        </div>
    );
}

export default Chat;
