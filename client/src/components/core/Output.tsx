import React from 'react';

interface OutputProps {
  output: string;
}

const Output: React.FC<OutputProps> = ({ output }) => {
  return (
    <pre className="mt-6 bg-gray-800 text-white p-4 rounded-lg shadow-md overflow-auto whitespace-pre-wrap">
      {output}
    </pre>
  );
};

export default Output;
