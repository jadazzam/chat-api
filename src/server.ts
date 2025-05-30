import 'dotenv/config'
import {initSocket} from "./middlewares/socket";
import app from "./app";

// init socket & attach user to socket
const serverWithSocket = initSocket(app)

const PORT = process.env.PORT || 8080;

serverWithSocket.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});