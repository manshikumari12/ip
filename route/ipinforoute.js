const express = require('express');
const axios = require('axios');
const redis = require('redis');
const { promisify } = require('util');
const validateIPFormat = require('../middleware/ipvali');

const client = redis.createClient(process.env.REDIS_URL);


const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);


const router = express.Router();


router.get('/:ip/city', validateIPFormat, async (req, res, next) => {
  try {
    const ip = req.params.ip;

    const cachedIPInfo = await getAsync(ip);
    if (cachedIPInfo) {
     
      const { city } = JSON.parse(cachedIPInfo);
      return res.json({ city });
    }

    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { city } = response.data;

  urs
    await setexAsync(ip, 21600, JSON.stringify(response.data));

    // return the city
    res.json({ city });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;