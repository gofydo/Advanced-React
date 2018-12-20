require('dotenv').config({ path: '.env'});
const createServer = require('./createServer');

const server = createServer();

// TODO use express middleware to handle cookies
// TODO Use epxress middleware to populate current user

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
}, env => {
    console.log(`Server is now running on port http://localhost:${env.port}`)
})
