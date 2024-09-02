const {
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
} = require('@solana/web3.js');
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

exports.verifyHash = async (hash, creatorPublicKey) => {
  try {
    const publicKey = new PublicKey(creatorPublicKey);
    const memos = await connection.getSignaturesForAddress(publicKey);

    for (const memo of memos) {
      // Fetch the parsed transaction details
      const transaction = await connection.getParsedTransaction(memo.signature);

      if (transaction && transaction.meta && transaction.meta.logMessages) {
        // Check if any log messages include the hash
        if (transaction.meta.logMessages.some((log) => log.includes(hash))) {
          console.log('Hash found on the blockchain');
          return true;
        }
      }
    }

    console.log('Hash not found on the blockchain');
    return false;
  } catch (error) {
    console.error('Error verifying hash:', error);
    throw new Error('Failed to verify hash on Solana');
  }
};
