import React from 'react';

interface AnimationAdvancedControlsProps {
  timing: string;
  direction: string;
  fillMode: string;
  iterationCount: number | 'infinite';
  customBezier: { x1: number; y1: number; x2: number; y2: number };
  onTimingChange: (timing: string) => void;
  onDirectionChange: (direction: string) => void;
  onFillModeChange: (fillMode: string) => void;
  onIterationCountChange: (count: number | 'infinite') => void;
  onBezierChange: (bezier: { x1: number; y1: number; x2: number; y2: number }) => void;
}

export function AnimationAdvancedControls({
  timing,
  direction,
  fillMode,
  iterationCount,
  customBezier,
  onTimingChange,
  onDirectionChange,
  onFillModeChange,
  onIterationCountChange,
  onBezierChange,
}: AnimationAdvancedControlsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Timing Function</label>
        <select
          value={timing}
          onChange={(e) => onTimingChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="ease">Ease</option>
          <option value="linear">Linear</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="ease-in-out">Ease In Out</option>
          <option value="cubic-bezier">Custom Cubic Bezier</option>
        </select>
      </div>

      {timing === 'cubic-bezier' && (
        <div className="grid grid-cols-2 gap-4">
          {['x1', 'y1', 'x2', 'y2'].map((prop) => (
            <div key={prop}>
              <label className="block text-sm font-medium mb-1">{prop.toUpperCase()}</label>
              <input
                type="number"
                step="0.1"
                value={customBezier[prop as keyof typeof customBezier]}
                onChange={(e) => onBezierChange({ ...customBezier, [prop]: Number(e.target.value) })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Direction</label>
        <select
          value={direction}
          onChange={(e) => onDirectionChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="normal">Normal</option>
          <option value="reverse">Reverse</option>
          <option value="alternate">Alternate</option>
          <option value="alternate-reverse">Alternate Reverse</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Fill Mode</label>
        <select
          value={fillMode}
          onChange={(e) => onFillModeChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="none">None</option>
          <option value="forwards">Forwards</option>
          <option value="backwards">Backwards</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Iteration Count</label>
        <select
          value={iterationCount}
          onChange={(e) => onIterationCountChange(e.target.value === 'infinite' ? 'infinite' : Number(e.target.value))}
          className="w-full p-2 border rounded-md"
        >
          <option value="infinite">Infinite</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  );
}