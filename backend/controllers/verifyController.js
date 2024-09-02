const hashingService = require('../services/hashingService');
const solanaService = require('../services/solanaService');

exports.verifyContent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const hash = await hashingService.generateHash(fileBuffer);

    const { creatorPublicKey } = req.body;

    if (!creatorPublicKey) {
      return res.status(400).json({ error: 'Creator public key is required' });
    }

    const isAuthentic = await solanaService.verifyHash(hash, creatorPublicKey);

    if (isAuthentic) {
      res.json({ message: 'Content is authentic', isAuthentic: true });
    } else {
      res.json({ message: 'Content is not authentic', isAuthentic: false });
    }
  } catch (error) {
    console.error('Error verifying content:', error);
    res.status(500).json({ error: 'Failed to verify content' });
  }
};
