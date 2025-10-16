'use client'
import { useState } from 'react'

interface WidgetSelectorSectionProps {
  onWidgetTypeChange: (widgetType: 'standard' | 'streaming') => void
}

const WidgetSelectorSection = ({ onWidgetTypeChange }: WidgetSelectorSectionProps) => {
  const [widgetType, setWidgetType] = useState<'standard' | 'streaming'>('streaming')

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
    <h3 className="text-lg font-semibold mb-4">Choose Widget Type</h3>
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => setWidgetType('standard')}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          widgetType === 'standard'
            ? 'bg-teal-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Standard Chat
      </button>
      <button
        onClick={() => setWidgetType('streaming')}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          widgetType === 'streaming'
            ? 'bg-teal-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Streaming Chat ⚡
      </button>
    </div>
    <p className="text-xs text-gray-500 mt-4">
      {widgetType === 'streaming' 
        ? 'Real-time streaming responses with SSE' 
        : 'Traditional request-response chat'}
    </p>
  </div>
  )
}

export default WidgetSelectorSection