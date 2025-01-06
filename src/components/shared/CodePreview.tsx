import React from 'react';
import { Copy } from 'lucide-react';

interface CodePreviewProps {
  code: string;
}

export function CodePreview({ code }: CodePreviewProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative">
      <pre className="bg-gray-800 text-white p-3 rounded-lg text-sm whitespace-pre-wrap">{code}</pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
        title="Copy to clipboard"
      >
        <Copy size={16} />
      </button>
    </div>
  );
}