import React from 'react';
import UploadForm from '../components/UploadForm';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Content Verification System
      </h1>
      <div className="flex flex-col items-center">
        <UploadForm />
        <div className="mt-8">
          <p className="text-center text-gray-700">
            Want to verify content?{' '}
            <Link to="/verify" className="text-blue-500 hover:underline">
              Go to Verification
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
