import 'dotenv/config'
import app from './app';

console.log("process.env.PORT", process.env.PORT);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});