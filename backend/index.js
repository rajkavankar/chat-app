import express from "express"
import cors from "cors"
import { Server } from "socket.io"
import { createServer } from "http"

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})
app.use(cors())

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>")
})

io.on("connection", (socket) => {
  console.log("a user connected", socket.id)
  socket.on("chat", (message) => {
    console.log(message)
    io.emit("chat", message.message)
  })
})

server.listen(5000, () => {
  console.log("server running at http://localhost:5000")
})
