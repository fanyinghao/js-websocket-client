# simple-ws

[![NPM](https://img.shields.io/npm/v/simple-ws.svg)](https://www.npmjs.com/package/simple-ws)

A reconnect-able websocket client

# Example

```javascript
const { WebSocket } = require("simple-ws");

WebSocket.init({
  url: "wss://aaa.com",
  options: {
    headers: {
      Origin: "https://aaa.com",
      Authorization: "xxxx"
    }
  },
  onOpen: e => {
    console.log("Connected to server.");
  },
  onClose: e => {
    console.log(e);
  },
  onMessage: msg => {
    console.log(msg);
  },
  onError: e => {
    console.log(e);
  },
  onMessage: msg => {
    console.log(msg);
  }
});

WebSocket.send("ping");

WebSocket.close();
```
