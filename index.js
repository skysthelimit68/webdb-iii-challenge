const server = require('./api/server.js');


const port = 3000;

server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`)
})