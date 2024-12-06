const http=require("http");
const app = require("./app/app");
const colors=require("colors");

const server=http.createServer(app);


server.listen(process.env.PORT,()=>console.log(colors.blue(`Server is Listening on http://localhost:${process.env.PORT}`)));

