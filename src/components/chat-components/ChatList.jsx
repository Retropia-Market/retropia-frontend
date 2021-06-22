import { useSelector } from 'react-redux'

import useFetchChat from '../../hooks/useFetchChat'
import ChatEntry from './ChatEntry'

function ChatList() {
  const {userData} = useSelector(s=>s.user)
  useFetchChat(`http://localhost:8080/chats/${userData.id}/get-contacts`, 'fetch/contacts')
  const contactsObj = useSelector( s => s.contacts)
  const contacts = Object.values(contactsObj)

  return <aside className="chat-list">
    <div className="entries">
      {contacts?.map(contact => 
        <ChatEntry key={contact.id} contact={contact} />
      )}
    </div>
  </aside>
}

export default ChatList