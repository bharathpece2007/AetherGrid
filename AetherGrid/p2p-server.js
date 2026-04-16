const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Allow cross-origin requests from the Vite frontend
app.use(cors({ origin: '*' }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// In-Memory Storage
let asks = [];
let bids = [];

// API Endpoints
app.get('/asks', (req, res) => {
  res.json(asks);
});

app.get('/bids', (req, res) => {
  res.json(bids);
});

app.post('/sell', (req, res) => {
  const { user_id, energy, price, distance } = req.body;
  
  const sellOffer = {
    id: `ask-${Date.now()}`,
    user_id: user_id || 'UNKNOWN',
    energy: energy || 1.0,
    price: price || 0.100,
    distance: distance || 0.0,
    timestamp: new Date().toISOString()
  };

  asks.push(sellOffer);
  
  // Emit to all connected clients
  io.emit('new_ask', sellOffer);
  console.log(`[P2P MARKET] New Sell Offer: ${energy}KW @ ${price}`);
  
  res.status(201).json(sellOffer);
});

app.post('/buy', (req, res) => {
  const { user_id, energy, price, distance } = req.body;
  
  const buyBid = {
    id: `bid-${Date.now()}`,
    user_id: user_id || 'UNKNOWN',
    energy: energy || 1.0,
    price: price || 0.100,
    distance: distance || 0.0,
    timestamp: new Date().toISOString()
  };

  bids.push(buyBid);
  
  // Emit to all connected clients
  io.emit('new_bid', buyBid);
  console.log(`[P2P MARKET] New Buy Bid: ${energy}KW @ ${price}`);
  
  res.status(201).json(buyBid);
});

// Socket.io Connection Logic
io.on('connection', (socket) => {
  console.log(`[CLIENT CONNECTED] ${socket.id}`);
  
  // Send current state to freshly connected client
  socket.emit('sync_market', { asks, bids });

  socket.on('disconnect', () => {
    console.log(`[CLIENT DISCONNECTED] ${socket.id}`);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`⚡ AetherGrid Minimal P2P Backend Server running on port ${PORT}`);
});
