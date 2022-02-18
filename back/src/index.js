const ServerExpress = require("./server");

const start = async () => {
  const server = new ServerExpress();
  server.start();
};

start();
