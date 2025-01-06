import React, { useState } from 'react';
import { Copy, Plus, Minus, LayoutGrid } from 'lucide-react';
import { FlexItem } from '../types';
import { CodePreview } from './shared/CodePreview';

export function FlexboxGenerator() {
  const [containerProps, setContainerProps] = useState({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 1,
    padding: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: '0.5rem',
    minHeight: '16rem'
  });

  const [items, setItems] = useState<FlexItem[]>([
    { flex: '1', order: 0, alignSelf: 'auto', width: '4rem', height: '4rem', backgroundColor: '#6366f1' },
    { flex: '1', order: 0, alignSelf: 'auto', width: '4rem', height: '4rem', backgroundColor: '#8b5cf6' },
    { flex: '1', order: 0, alignSelf: 'auto', width: '4rem', height: '4rem', backgroundColor: '#a855f7' }
  ]);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('');

  const presets = {
    'Holy Grail': {
      container: { flexDirection: 'column', gap: 1 },
      items: [
        { flex: '0 0 auto', height: '4rem', width: '100%', backgroundColor: '#6366f1' },
        { flex: '1 1 auto', height: 'auto', width: '100%', backgroundColor: '#8b5cf6' },
        { flex: '0 0 auto', height: '4rem', width: '100%', backgroundColor: '#a855f7' }
      ]
    },
    'Sidebar': {
      container: { flexDirection: 'row', gap: 1 },
      items: [
        { flex: '0 0 12rem', height: '16rem', width: 'auto', backgroundColor: '#6366f1' },
        { flex: '1 1 auto', height: '16rem', width: 'auto', backgroundColor: '#8b5cf6' }
      ]
    },
    'Card Grid': {
      container: { flexWrap: 'wrap', gap: 1, justifyContent: 'space-between' },
      items: Array(6).fill(null).map(() => ({
        flex: '0 1 calc(33.333% - 0.5rem)',
        height: '8rem',
        width: 'auto',
        backgroundColor: '#6366f1'
      }))
    }
  };

  const applyPreset = (preset: keyof typeof presets) => {
    setSelectedPreset(preset);
    setContainerProps({ ...containerProps, ...presets[preset].container });
    setItems(presets[preset].items);
  };

  const addItem = () => {
    if (items.length < 8) {
      setItems([...items, {
        flex: '1',
        order: 0,
        alignSelf: 'auto',
        width: '4rem',
        height: '4rem',
        backgroundColor: '#6366f1'
      }]);
    }
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Advanced Flexbox Generator</h2>
        <div className="flex gap-2">
          <select
            value={selectedPreset}
            onChange={(e) => applyPreset(e.target.value as keyof typeof presets)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="">Load Preset</option>
            <option value="Holy Grail">Holy Grail Layout</option>
            <option value="Sidebar">Sidebar Layout</option>
            <option value="Card Grid">Card Grid</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border-2 border-dashed border-gray-200 p-4">
        <div style={containerProps} className="transition-all duration-200">
          {items.map((item, index) => (
            <div
              key={index}
              style={item}
              className="rounded-lg flex items-center justify-center text-white text-sm transition-all duration-200"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Container Properties</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Justify Content</label>
              <select
                value={containerProps.justifyContent}
                onChange={(e) => setContainerProps({ ...containerProps, justifyContent: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="flex-start">Flex Start</option>
                <option value="center">Center</option>
                <option value="flex-end">Flex End</option>
                <option value="space-between">Space Between</option>
                <option value="space-around">Space Around</option>
                <option value="space-evenly">Space Evenly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Align Items</label>
              <select
                value={containerProps.alignItems}
                onChange={(e) => setContainerProps({ ...containerProps, alignItems: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="flex-start">Flex Start</option>
                <option value="center">Center</option>
                <option value="flex-end">Flex End</option>
                <option value="stretch">Stretch</option>
                <option value="baseline">Baseline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Direction</label>
              <select
                value={containerProps.flexDirection}
                onChange={(e) => setContainerProps({ ...containerProps, flexDirection: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="row">Row</option>
                <option value="column">Column</option>
                <option value="row-reverse">Row Reverse</option>
                <option value="column-reverse">Column Reverse</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Flex Items</h3>
            {items.length < 8 && (
              <button
                onClick={addItem}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
              >
                <Plus size={16} />
                Add Item
              </button>
            )}
          </div>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Item {index + 1}</span>
                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    type="color"
                    value={item.backgroundColor}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index] = { ...item, backgroundColor: e.target.value };
                      setItems(newItems);
                    }}
                    className="w-full h-8 rounded"
                  />
                  <select
                    value={item.alignSelf}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[index] = { ...item, alignSelf: e.target.value };
                      setItems(newItems);
                    }}
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="auto">Auto</option>
                    <option value="flex-start">Flex Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">Flex End</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-indigo-600 hover:text-indigo-700"
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Gap: {containerProps.gap}rem</label>
            <input
              type="range"
              min="0"
              max="4"
              step="0.25"
              value={containerProps.gap}
              onChange={(e) => setContainerProps({ ...containerProps, gap: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Container Background</label>
            <input
              type="color"
              value={containerProps.backgroundColor}
              onChange={(e) => setContainerProps({ ...containerProps, backgroundColor: e.target.value })}
              className="w-full h-10"
            />
          </div>
        </div>
      )}

      <CodePreview
        code={`.container {
  display: flex;
  justify-content: ${containerProps.justifyContent};
  align-items: ${containerProps.alignItems};
  flex-direction: ${containerProps.flexDirection};
  flex-wrap: ${containerProps.flexWrap};
  gap: ${containerProps.gap}rem;
  padding: ${containerProps.padding}rem;
  background-color: ${containerProps.backgroundColor};
  border-radius: ${containerProps.borderRadius};
  min-height: ${containerProps.minHeight};
}

${items.map((item, index) => `
.item-${index + 1} {
  flex: ${item.flex};
  order: ${item.order};
  align-self: ${item.alignSelf};
  width: ${item.width};
  height: ${item.height};
  background-color: ${item.backgroundColor};
}`).join('\n')}`}
      />
    </div>
  );
}