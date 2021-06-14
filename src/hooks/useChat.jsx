import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useChat() {
  const user = useSelector(s => s.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws', 'v1')
    ws.onopen = () => {
      ws.send(JSON.stringify({ auth: user.token }))
      console.log('hello')
    }
    ws.onmessage = e => {
      console.log(e)
      const message = JSON.parse(e.data)
      console.log('message:', message)
      dispatch({ type: 'ws/message', message, me: user.userData.id })
    }
    return () => {
      console.log('bye')
      ws.close()
    }
  }, [user, dispatch])
}