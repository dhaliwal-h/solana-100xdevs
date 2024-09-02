require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,
  solanaNetwork: process.env.SOLANA_NETWORK || 'devnet',
};
