# js-websocket-client

A reconnect-able websocket client

# Example

```javascript
const { WebSocket } = require("js-websocket-client");

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
