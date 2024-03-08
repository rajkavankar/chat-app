import { useState, useEffect } from "react"
import io from "socket.io-client"
import "./App.css"
const socket = io("http://localhost:5000")

function App() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("chat", { message })
    setMessage("")
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload])
      console.log(chat)
    })
  }, [chat])

  return (
    <div className='h-screen'>
      <form onSubmit={handleSubmit}>
        <input
          className='bg-slate-50'
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>submit</button>
      </form>

      <ul>
        {chat.map((chatitem, i) => (
          <li key={i}>{chatitem}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
