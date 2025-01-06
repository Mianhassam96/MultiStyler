import React from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-20"
      />
    </div>
  );
}