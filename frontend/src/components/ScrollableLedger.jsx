import React from 'react';

const people = [
  // static for now but will be fetched from the public database in the future
  {
    name: 'Harsimran',
    publicKey: 'Het6geTKEDUkJpWzubQnYmLh6ncXcXej17WwCG7p1jcZ',
  },
  { name: 'Person B', publicKey: 'PublicKeyB' },
  { name: 'Person C', publicKey: 'PublicKeyC' },
  { name: 'Person D', publicKey: 'PublicKeyD' },
  { name: 'Person E', publicKey: 'PublicKeyE' },
];

const ScrollableLedger = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert('Public key copied to clipboard!'))
      .catch((err) => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4 text-center">Public Ledger</h1>
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {people.map((person, index) => (
            <li key={index} className="flex justify-between items-center p-4">
              <span>{person.name}</span>
              <span
                className="font-mono bg-gray-100 p-2 text-xs rounded cursor-pointer hover:bg-gray-200"
                onClick={() => copyToClipboard(person.publicKey)}
              >
                {person.publicKey}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScrollableLedger;
