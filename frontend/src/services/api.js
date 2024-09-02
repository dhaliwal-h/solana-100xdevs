import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

export const verifyContent = async (file, creatorPublicKey) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('creatorPublicKey', creatorPublicKey);

  try {
    const response = await axios.post(`${API_BASE_URL}/verify`, formData, {
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
