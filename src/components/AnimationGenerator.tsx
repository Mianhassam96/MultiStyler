import React, { useState, useEffect, useCallback } from 'react';
import { Keyframe } from '../types';
import { CodePreview } from './shared/CodePreview';
import { PreviewBox } from './shared/PreviewBox';
import { animationPresets } from './animation/AnimationPresets';
import { AnimationControls } from './animation/AnimationControls';
import { AnimationAdvancedControls } from './animation/AnimationAdvancedControls';
import { Wand2, Layout, Sparkles, Copy } from 'lucide-react';

export function AnimationGenerator() {
  const [name, setName] = useState('multistyler-animation');
  const [duration, setDuration] = useState(1);
  const [timing, setTiming] = useState('ease');
  const [iterationCount, setIterationCount] = useState<number | 'infinite'>('infinite');
  const [direction, setDirection] = useState<string>('normal');
  const [fillMode, setFillMode] = useState<string>('none');
  const [delay, setDelay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [previewShape, setPreviewShape] = useState<'square' | 'circle' | 'text'>('square');
  const [customBezier, setCustomBezier] = useState({ x1: 0.4, y1: 0, x2: 0.2, y2: 1 });
  const [showMultiplePreview, setShowMultiplePreview] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('');
  const [animationKey, setAnimationKey] = useState(0);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);

  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { 
      position: 0, 
      properties: { 
        transform: 'scale(1) rotate(0deg)', 
        opacity: '1', 
        backgroundColor: '#6366f1' 
      } 
    },
    { 
      position: 50, 
      properties: { 
        transform: 'scale(1.5) rotate(180deg)', 
        opacity: '0.5', 
        backgroundColor: '#a855f7' 
      } 
    },
    { 
      position: 100, 
      properties: { 
        transform: 'scale(1) rotate(360deg)', 
        opacity: '1', 
        backgroundColor: '#6366f1' 
      } 
    }
  ]);

  const animationConfig = {
    name,
    duration,
    timing,
    iterationCount,
    direction,
    fillMode,
    delay,
    customBezier,
    keyframes,
    selectedPreset
  };

  useEffect(() => {
    if (isPlaying) {
      setAnimationKey(prev => prev + 1);
    }
  }, [Object.values(animationConfig)]);

  const getAnimationStyle = useCallback(() => {
    const timingFunction = timing === 'cubic-bezier' 
      ? `cubic-bezier(${customBezier.x1}, ${customBezier.y1}, ${customBezier.x2}, ${customBezier.y2})`
      : timing;

    return {
      animation: isPlaying ? `${name} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode}` : 'none',
      willChange: 'transform, opacity, background-color'
    };
  }, [animationConfig, isPlaying]);

  const loadPreset = (preset: keyof typeof animationPresets) => {
    setSelectedPreset(preset);
    setKeyframes(animationPresets[preset]);
    setIsPlaying(true);
  };

  const copyKeyframesToClipboard = () => {
    const cssCode = `@keyframes ${name} {
${keyframes.map(kf => 
  `  ${kf.position}% {
    ${Object.entries(kf.properties).map(([prop, value]) => `${prop}: ${value};`).join('\n    ')}
  }`
).join('\n')}
}

.animated-element {
  animation: ${name} ${duration}s ${timing === 'cubic-bezier' 
    ? `cubic-bezier(${customBezier.x1}, ${customBezier.y1}, ${customBezier.x2}, ${customBezier.y2})`
    : timing} ${delay}s ${iterationCount} ${direction} ${fillMode};
}`;
    navigator.clipboard.writeText(cssCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Animation Studio</h2>
          <Sparkles className="h-5 w-5 text-indigo-500" />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowMultiplePreview(!showMultiplePreview)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors"
          >
            <Layout className="h-4 w-4" />
            {showMultiplePreview ? 'Single Preview' : 'Multiple Preview'}
          </button>
          <select
            onChange={(e) => loadPreset(e.target.value as keyof typeof animationPresets)}
            className="px-3 py-1.5 border rounded-md text-sm bg-white"
            value={selectedPreset}
          >
            <option value="">Load Preset</option>
            <option value="bounce">Bounce</option>
            <option value="pulse">Pulse</option>
            <option value="shake">Shake</option>
            <option value="flip">3D Flip</option>
            <option value="jello">Jello</option>
            <option value="swing">Swing</option>
          </select>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8">
        {showMultiplePreview ? (
          <div className="grid grid-cols-3 gap-8">
            {['square', 'circle', 'text'].map((shape) => (
              <div key={`${shape}-${animationKey}`} className="flex flex-col items-center gap-4">
                <div className="h-32 flex items-center justify-center">
                  <PreviewBox
                    key={animationKey}
                    shape={shape as 'square' | 'circle' | 'text'}
                    style={getAnimationStyle()}
                    text="MultiStyler"
                    className="shadow-lg"
                  />
                </div>
                <span className="text-sm font-medium capitalize">{shape}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center relative">
            <div className="absolute inset-0 grid grid-cols-4 gap-4 opacity-10 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-gray-300 rounded-lg" />
              ))}
            </div>
            <PreviewBox
              key={animationKey}
              shape={previewShape}
              style={getAnimationStyle()}
              text="MultiStyler"
              className="shadow-lg"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Animation Settings</h3>
          <AnimationControls
            name={name}
            duration={duration}
            delay={delay}
            isPlaying={isPlaying}
            previewShape={previewShape}
            onNameChange={setName}
            onDurationChange={setDuration}
            onDelayChange={setDelay}
            onPlayingChange={setIsPlaying}
            onShapeChange={setPreviewShape}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Advanced Options</h3>
          <AnimationAdvancedControls
            timing={timing}
            direction={direction}
            fillMode={fillMode}
            iterationCount={iterationCount}
            customBezier={customBezier}
            onTimingChange={setTiming}
            onDirectionChange={setDirection}
            onFillModeChange={setFillMode}
            onIterationCountChange={setIterationCount}
            onBezierChange={setCustomBezier}
          />
        </div>
      </div>

      <div className="relative">
        <CodePreview 
          code={`@keyframes ${name} {
${keyframes.map(kf => 
  `  ${kf.position}% {
    ${Object.entries(kf.properties).map(([prop, value]) => `${prop}: ${value};`).join('\n    ')}
  }`
).join('\n')}
}

.animated-element {
  animation: ${name} ${duration}s ${timing === 'cubic-bezier' 
    ? `cubic-bezier(${customBezier.x1}, ${customBezier.y1}, ${customBezier.x2}, ${customBezier.y2})`
    : timing} ${delay}s ${iterationCount} ${direction} ${fillMode};
}`} 
        />
        <button
          onClick={copyKeyframesToClipboard}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
}