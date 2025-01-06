import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { ColorStop } from '../types';
import { CodePreview } from './shared/CodePreview';
import { ColorPicker } from './shared/ColorPicker';

export function GradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#6366f1', position: 0 },
    { color: '#a855f7', position: 100 }
  ]);
  const [angle, setAngle] = useState(45);
  const [shape, setShape] = useState<'circle' | 'ellipse'>('circle');
  const [position, setPosition] = useState<string>('center');

  const addColorStop = () => {
    if (colorStops.length < 5) {
      const position = Math.round((colorStops[colorStops.length - 1].position + colorStops[0].position) / 2);
      setColorStops([...colorStops, { color: '#ffffff', position }].sort((a, b) => a.position - b.position));
    }
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
    }
  };

  const updateColorStop = (index: number, updates: Partial<ColorStop>) => {
    setColorStops(colorStops.map((stop, i) => 
      i === index ? { ...stop, ...updates } : stop
    ).sort((a, b) => a.position - b.position));
  };

  const getGradientStyle = () => {
    const stops = colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    
    switch (type) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${stops})`;
      case 'radial':
        return `radial-gradient(${shape} at ${position}, ${stops})`;
      case 'conic':
        return `conic-gradient(from ${angle}deg at ${position}, ${stops})`;
    }
  };

  const getCSSCode = () => {
    return `background: ${getGradientStyle()};`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Advanced Gradient Generator</h2>
        <div className="flex gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'linear' | 'radial' | 'conic')}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>
        </div>
      </div>

      <div className="h-32 rounded-lg" style={{ background: getGradientStyle() }}></div>

      <div className="space-y-4">
        {type !== 'linear' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Shape</label>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value as 'circle' | 'ellipse')}
                className="w-full p-2 border rounded-md"
              >
                <option value="circle">Circle</option>
                <option value="ellipse">Ellipse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="right">Right</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
              </select>
            </div>
          </div>
        )}

        {(type === 'linear' || type === 'conic') && (
          <div>
            <label className="block text-sm font-medium mb-1">Angle: {angle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        <div className="space-y-3">
          {colorStops.map((stop, index) => (
            <div key={index} className="flex items-center gap-4">
              <ColorPicker
                color={stop.color}
                onChange={(color) => updateColorStop(index, { color })}
              />
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) => updateColorStop(index, { position: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">{stop.position}%</div>
              </div>
              {colorStops.length > 2 && (
                <button
                  onClick={() => removeColorStop(index)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
          {colorStops.length < 5 && (
            <button
              onClick={addColorStop}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus size={16} />
              Add Color Stop
            </button>
          )}
        </div>
      </div>

      <CodePreview code={getCSSCode()} />
    </div>
  );
}