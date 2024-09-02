import React, { useState } from 'react';
import axios from 'axios';

const VerifyForm = () => {
  const [file, setFile] = useState(null);
  const [creatorPublicKey, setCreatorPublicKey] = useState('');
  const [verificationResult, setVerificationResult] = useState('');
  const [error, setError] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePublicKeyChange = (event) => {
    setCreatorPublicKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !creatorPublicKey) {
      setError(true);
      setVerificationResult(
        "Please upload a file and enter the creator's public key."
      );
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('creatorPublicKey', creatorPublicKey);

    try {
      const response = await axios.post(
        'http://localhost:5001/verify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      if (response.data.isAuthentic) {
        setError(false);
        setVerificationResult('The content is authentic.');
      } else {
        setError(true);
        setVerificationResult('The content is not authentic.');
      }
    } catch (error) {
      console.error('Error verifying content:', error);
      setError(true);
      setVerificationResult('Failed to verify content.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Verify Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Creator Public Key:
          </label>
          <input
            type="text"
            value={creatorPublicKey}
            onChange={handlePublicKeyChange}
            className="w-full p-2 border rounded"
            placeholder="Enter creator's public key"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Verify
        </button>
      </form>
      {verificationResult && (
        <p className="{{ error ? 'text-red-600' : 'text-green-600' }}">
          {verificationResult}
        </p>
      )}
    </div>
  );
};

export default VerifyForm;
