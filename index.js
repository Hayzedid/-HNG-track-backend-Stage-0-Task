const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

const CAT_FACTS_API = 'https://catfact.ninja/fact';
const API_TIMEOUT = 5000; 

async function fetchCatFact() {
  try {
    const response = await axios.get(CAT_FACTS_API, {
      timeout: API_TIMEOUT,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'BackendWizards-ProfileAPI/1.0'
      }
    });
    
    return response.data.fact;
  } catch (error) {
    console.error('Error fetching cat fact:', error.message);
    
    // Fallback cat facts in case API is down
    const fallbackFacts = [
      "Cats have five toes on their front paws, but only four toes on their back paws.",
      "A group of cats is called a clowder.",
      "Cats spend 70% of their lives sleeping.",
      "A cat's purr vibrates at a frequency that promotes bone healing.",
      "Cats have a third eyelid called a nictitating membrane."
    ];
    
    const randomIndex = Math.floor(Math.random() * fallbackFacts.length);
    return fallbackFacts[randomIndex];
  }
}

// Profile endpoint
app.get('/me', async (req, res) => {
  try {
    
    res.setHeader('Content-Type', 'application/json');
    const catFact = await fetchCatFact();
    const timestamp = new Date().toISOString();

    const profileData = {
      status: "success",
      user: {
        email: "iazeez775@gmail.com", 
        name: "Idris Azeez", 
        stack: "Node.js/Express" 
      },
      timestamp: timestamp,
      fact: catFact
    };
    
    console.log('Profile endpoint accessed:', {
      timestamp,
      factLength: catFact.length,
      userAgent: req.get('User-Agent')
    });
    
    res.status(200).json(profileData);
    
  } catch (error) {
    console.error('Error in /me endpoint:', error);
    
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is healthy",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: "error",
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      "GET /me",
      "GET /health"
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Profile endpoint: http://localhost:${PORT}/me`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Started at: ${new Date().toISOString()}`);
});

module.exports = app;
