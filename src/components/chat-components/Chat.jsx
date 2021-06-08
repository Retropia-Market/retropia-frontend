import { Switch, Route, Redirect } from 'react-router-dom'

import ChatList from './ChatList'
import ChatRoom from './ChatRoom'

function Chat({user}) {

  if (!Object.keys(user).length) {
    return <Redirect to="/" />;
  }

  return <div className="chat">
    <ChatList />
        <Switch>
          <Route path="/profile/chat" exact>
            <div className="dbc welcome">
              Selecciona una conversación para continuar
            </div>
          </Route>
          <Route path="/profile/chat/:id" exact>
            <ChatRoom />
          </Route>
        </Switch>
  </div>
}

export default Chat