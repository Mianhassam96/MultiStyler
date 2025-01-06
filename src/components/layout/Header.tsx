import React from 'react';
import { Wand2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wand2 className="h-8 w-8" />
            <h1 className="text-2xl font-bold tracking-tight">MultiStyler</h1>
          </div>
          <nav className="flex space-x-6">
            <a href="#features" className="hover:text-indigo-200 transition-colors">Features</a>
            <a href="#templates" className="hover:text-indigo-200 transition-colors">Templates</a>
            <a href="#docs" className="hover:text-indigo-200 transition-colors">Docs</a>
          </nav>
        </div>
      </div>
    </header>
  );
}