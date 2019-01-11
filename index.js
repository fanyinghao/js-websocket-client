const WebSocket = require("ws");

const WS = {
  init: doInit,
  send: doSend,
  close: doClose
};

function doInit(options) {
  WS.options = options;
  WS.lastHeartBeat = new Date().getTime();
  WS.timeout = 8000;
  WS.status = 0;

  if (WS.checkInterval) clearInterval(WS.checkInterval);

  WS.websocket = new WebSocket(options.url, options.options);

  WS.websocket.onopen = function(event) {
    WS.status = 1;
    if (options.onOpen) options.onOpen(event);
  };
  WS.websocket.onclose = function(event) {
    WS.status = -1;
    if (options.onClose) options.onClose(event);
  };
  WS.websocket.onmessage = function(event) {
    onMessage(event);
    if (options.onMessage) options.onMessage(event);
  };
  WS.websocket.onerror = function(event) {
    if (options.onError) options.onError(event);
  };
  WS.checkInterval = setInterval(checkConnect, 5000);
}

function doSend(data) {
  WS.websocket.send(JSON.stringify(data));
}

function doClose() {
  WS.websocket.close();
}

function checkConnect() {
  if (WS.status === 0) return;
  if (new Date().getTime() - WS.lastHeartBeat > WS.timeout) {
    WS.websocket.close();
    if (WS.status === -1) reConnect();
  }
}

function onMessage(event) {
  WS.lastHeartBeat = new Date().getTime();
}

function reConnect() {
  console.log("socket trying to reconnect...");
  doInit(WS.options);
}

exports.WebSocket = WS;
