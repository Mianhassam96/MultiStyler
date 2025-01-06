import React, { useState } from 'react';
import { Palette, Box, Sparkles, Square } from 'lucide-react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Tabs } from './components/shared/Tabs';
import { GradientGenerator } from './components/GradientGenerator';
import { AnimationGenerator } from './components/AnimationGenerator';
import { FlexboxGenerator } from './components/FlexboxGenerator';
import { BoxShadowGenerator } from './components/generators/BoxShadowGenerator';

const tabs = [
  { id: 'gradient', name: 'Gradient', icon: Palette },
  { id: 'animation', name: 'Animation', icon: Sparkles },
  { id: 'flexbox', name: 'Flexbox', icon: Box },
  { id: 'boxshadow', name: 'Box Shadow', icon: Square },
];

function App() {
  const [activeTab, setActiveTab] = useState('gradient');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="mt-6">
            {activeTab === 'gradient' && <GradientGenerator />}
            {activeTab === 'animation' && <AnimationGenerator />}
            {activeTab === 'flexbox' && <FlexboxGenerator />}
            {activeTab === 'boxshadow' && <BoxShadowGenerator />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;