import React from 'react';
import VerifyForm from '../components/VerifyForm';
import { Link } from 'react-router-dom';

const Verify = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Verify Content Authenticity
      </h1>
      <div className="flex flex-col items-center">
        <VerifyForm />
        <div className="mt-8">
          <p className="text-center text-gray-700">
            Want to upload content?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Go to Upload
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
