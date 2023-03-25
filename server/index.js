const http = require("http");
const app = require("./app");

let port = process.env.PORT || "3000";
app.set(port);

const server = http.createServer(app);

server.listen(port, () => console.log("Server is working"));
