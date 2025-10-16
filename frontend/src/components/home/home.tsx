'use client'
import { useState } from 'react'
import FeaturesSection from '@/components/home/features-section'
import TechStackSection from '@/components/home/tech-stack-section'
import WidgetSelectorSection from '@/components/home/widget-selector-section'
import ApiEndpointSection from '@/components/home/api-endpoint-section'
import ChatWidget from '@/components/layouts/chat-widget'
import ChatWidgetStreaming from '@/components/layouts/chat-widget-streaming'
import VisibleWrapper from '@/components/transfer'

const Home = () => {
    const [widgetType, setWidgetType] = useState<'standard' | 'streaming'>('streaming')
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <VisibleWrapper/>
         <FeaturesSection />
        {/*<TechStackSection /> */}
         <WidgetSelectorSection onWidgetTypeChange={setWidgetType} />
           {/* API Endpoints */}
         {/*<ApiEndpointSection />*/}


         {/* Chat Widget */}
         {/*widgetType === 'standard' ? (
           <ChatWidget
             apiUrl="http://localhost:8000/api/v1"
             title="PKA Assistant"
             placeholder="Ask me anything..."
             primaryColor="#3B82F6"
             position="bottom-right"
           />
         ) : (
           <ChatWidgetStreaming
             apiUrl="http://localhost:8000/api/v1"
             title="PKA Assistant (Streaming)"
             placeholder="Ask me anything..."
             primaryColor="#8B5CF6"
             position="bottom-right"
             useStreaming={true}
           />
         )*/}
  </div>
  )
}

export default Home