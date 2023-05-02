
const { validationResult } = require('express-validator');
const net = require('net');


const validateIPFormat = (req, res, next) => {
 
  if (!req.params.ip) {
    return res.status(400).json({ message: 'IP address parameter is missing' });
  }

  
  if (!net.isIP(req.params.ip)) {
    return res.status(400).json({ message: 'Invalid IP address format' });
  }


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error', errors: errors.array() });
  }


  next();
};


module.exports = validateIPFormat;