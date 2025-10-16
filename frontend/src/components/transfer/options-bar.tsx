import { Button } from "@/components/ui/button";
import { Calendar, ChevronUp, MoreHorizontal } from 'lucide-react';

export default function OptionsBar({className}: {className?: string}) {
  return (
    <div className="flex items-center space-x-2 w-full" data-testid="options-bar">
      <div className='flex-[5]'>
          <span aria-haspopup="true" aria-expanded="false" className="relative w-full">
          <Button variant="outline" className="flex items-center space-x-2" data-testid="expiry-setting-selector">
            <Calendar className="text-gray-500 size={20} strokeWidth={1.5}" />
            <p className="text-sm">3 days</p>
            <ChevronUp className="text-gray-500 size={16} strokeWidth={1.5}" />
          </Button>
          </span>
      </div>
      {/*Option Button Expiry Selector */}
      <div className="flex-[1]">
        <Button variant="ghost" className="p-1">
        <MoreHorizontal 
            size={20} 
            fill="currentColor" 
            stroke="none" 
            strokeWidth={0} 
        />
        </Button>
      </div> 
    </div>
  );
}