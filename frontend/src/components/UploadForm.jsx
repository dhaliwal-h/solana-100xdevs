import React, { useState } from 'react';
import * as web3 from '@solana/web3.js';
import { Buffer } from 'buffer';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        console.log('Connected to wallet:', resp.publicKey.toString());
        setWalletAddress(resp.publicKey.toString());
      } catch (err) {
        console.error('Error connecting to wallet:', err);
      }
    } else {
      alert('Phantom Wallet not found. Please install it.');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const generateHash = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !walletAddress) {
      setFailMessage('Please upload a file and connect your wallet.');
      setSuccessMessage('');
      return;
    }

    // Generate hash of the file
    const hash = await generateHash(file);
    console.log('Hash:', hash);
    console.log('Hash Size:', hash.length);
    // Create a transaction with the Memo Program to store the hash
    const connection = new web3.Connection(
      web3.clusterApiUrl('devnet'),
      'confirmed'
    );
    const memoProgramId = new web3.PublicKey(
      'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'
    );
    const { blockhash } = await connection.getLatestBlockhash();
    const transaction = new web3.Transaction().add(
      new web3.TransactionInstruction({
        keys: [
          {
            pubkey: new web3.PublicKey(walletAddress),
            isSigner: true,
            isWritable: false,
          },
        ],
        programId: memoProgramId,
        data: Buffer.from(hash),
      })
    );
    transaction.recentBlockhash = blockhash;
    console.log('Wallet Address:', walletAddress);
    transaction.feePayer = new web3.PublicKey(walletAddress);
    console.log('Transaction:', transaction);
    try {
      const { signature } = await window.solana.signAndSendTransaction(
        transaction
      );
      console.log('Transaction Signature:', signature);
      await connection.confirmTransaction(signature);

      setSuccessMessage(
        `Success: Hash stored on-chain with signature ${signature}`
      );
      setFailMessage('');
    } catch (error) {
      console.error('Error uploading content:', error);
      setFailMessage('Failed to upload content.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Upload Content</h2>
      <button
        onClick={connectWallet}
        className="mb-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-center text-green-500">{successMessage}</p>
      )}
      {failMessage && (
        <p className="mt-4 text-center text-red-500">{successMessage}</p>
      )}
    </div>
  );
};

export default UploadForm;
