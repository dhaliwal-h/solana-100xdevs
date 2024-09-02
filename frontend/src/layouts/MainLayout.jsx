import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollableLedger from '../components/ScrollableLedger';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Content Verification System</h1>
        </div>
      </header>

      <main className="flex-grow pb-20">
        <Outlet />
        <ScrollableLedger />
      </main>
      <footer className="bg-gray-800 text-white p-4 fixed bottom-0 left-0 w-full">
        <div className="container mx-auto text-center">
          <p>
            <a
              className="text-lime-300 hover:underline"
              href="https://dhaliwal.dev"
              target="_blank"
              rel="noreferrer"
            >
              dhaliwal-h
            </a>
            <> </>
            &copy; {new Date().getFullYear()} Content Verification System. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
