import React, { useState } from 'react';
import { CodePreview } from '../shared/CodePreview';

export function BoxShadowGenerator() {
  const [shadow, setShadow] = useState({
    offsetX: 0,
    offsetY: 4,
    blur: 6,
    spread: 0,
    color: '#00000033',
    inset: false,
  });

  const getShadowStyle = () => {
    const { offsetX, offsetY, blur, spread, color, inset } = shadow;
    return `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Box Shadow Generator</h2>

      <div className="h-32 flex items-center justify-center bg-gray-50 rounded-lg">
        <div
          className="w-24 h-24 bg-white rounded-lg"
          style={{ boxShadow: getShadowStyle() }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Offset X: {shadow.offsetX}px</label>
          <input
            type="range"
            min="-50"
            max="50"
            value={shadow.offsetX}
            onChange={(e) => setShadow({ ...shadow, offsetX: Number(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Offset Y: {shadow.offsetY}px</label>
          <input
            type="range"
            min="-50"
            max="50"
            value={shadow.offsetY}
            onChange={(e) => setShadow({ ...shadow, offsetY: Number(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Blur: {shadow.blur}px</label>
          <input
            type="range"
            min="0"
            max="100"
            value={shadow.blur}
            onChange={(e) => setShadow({ ...shadow, blur: Number(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spread: {shadow.spread}px</label>
          <input
            type="range"
            min="-50"
            max="50"
            value={shadow.spread}
            onChange={(e) => setShadow({ ...shadow, spread: Number(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <input
            type="color"
            value={shadow.color}
            onChange={(e) => setShadow({ ...shadow, color: e.target.value })}
            className="h-10 w-20"
          />
        </div>
        <div className="flex items-center">
          <label className="flex items-center space-x-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={shadow.inset}
              onChange={(e) => setShadow({ ...shadow, inset: e.target.checked })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Inset</span>
          </label>
        </div>
      </div>

      <CodePreview code={`box-shadow: ${getShadowStyle()};`} />
    </div>
  );
}