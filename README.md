# kraken-wsclient-js

API wrapper for the Kraken [websocket API](https://docs.kraken.com/websockets/).

# Include WebSocket fot your platform

```
import {  KrakenWs } from 'kraken-wsclient';
require('nativescript-websockets');
KrakenWs.prototype.ws = WebSocket;
```