import React from 'react';
import { Play, Pause } from 'lucide-react';

interface AnimationControlsProps {
  name: string;
  duration: number;
  delay: number;
  isPlaying: boolean;
  previewShape: 'square' | 'circle' | 'text';
  onNameChange: (name: string) => void;
  onDurationChange: (duration: number) => void;
  onDelayChange: (delay: number) => void;
  onPlayingChange: (isPlaying: boolean) => void;
  onShapeChange: (shape: 'square' | 'circle' | 'text') => void;
}

export function AnimationControls({
  name,
  duration,
  delay,
  isPlaying,
  previewShape,
  onNameChange,
  onDurationChange,
  onDelayChange,
  onPlayingChange,
  onShapeChange,
}: AnimationControlsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Preview Shape</label>
        <select
          value={previewShape}
          onChange={(e) => onShapeChange(e.target.value as 'square' | 'circle' | 'text')}
          className="w-full p-2 border rounded-md"
        >
          <option value="square">Square</option>
          <option value="circle">Circle</option>
          <option value="text">Text</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Animation Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Duration: {duration}s</label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Delay: {delay}s</label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={delay}
          onChange={(e) => onDelayChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <button
        onClick={() => onPlayingChange(!isPlaying)}
        className="w-full p-2 flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        {isPlaying ? 'Pause Animation' : 'Play Animation'}
      </button>
    </div>
  );
}