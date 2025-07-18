import 'dotenv/config'
import app from "./app";
import SocketServer from "./middlewares/socket";

// init socket & attach user to socket
export const serverWithSocket = new SocketServer(app)


const PORT = process.env.PORT || 8080;
const httpServer = serverWithSocket.getHttpServer()
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
serverWithSocket.joinRoom()