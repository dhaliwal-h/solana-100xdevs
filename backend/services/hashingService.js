const crypto = require('crypto');

exports.generateHash = async (fileBuffer) => {
  try {
    // Create a SHA-256 hash of the content
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    return hash.digest('hex');
  } catch (error) {
    console.error('Error generating hash:', error);
    throw new Error('Failed to generate hash');
  }
};
