import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useChat() {
  const user = useSelector(s => s.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws', 'v1')
    ws.onopen = () => {
      ws.send(JSON.stringify({ auth: user.token }))
    }
    ws.onmessage = e => {
      const message = JSON.parse(e.data)
      dispatch({ type: 'ws/message', message, me: user.userData.id })
    }
    return () => {
      ws.close()
    }
  }, [user, dispatch])
}