const { Connection, clusterApiUrl } = require('@solana/web3.js');

const network = process.env.SOLANA_NETWORK || 'devnet';

const connection = new Connection(clusterApiUrl(network), 'confirmed');

module.exports = connection;
