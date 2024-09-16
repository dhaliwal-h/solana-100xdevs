import axios from 'axios';

export const verifyContent = async (file, creatorPublicKey) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('creatorPublicKey', creatorPublicKey);

  try {
    const response = await axios.post('/api/verify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying content:', error);
    throw error;
  }
};
