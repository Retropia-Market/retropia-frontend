import { Switch, Route } from 'react-router-dom'

import ChatList from './ChatList'
import ChatRoom from './ChatRoom'

function Chat() {
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