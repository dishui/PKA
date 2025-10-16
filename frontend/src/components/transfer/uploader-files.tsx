import { CirclePlus, FolderPlus, Zap  } from 'lucide-react'
import FileInput from './file-input';
import { Button } from '../ui/button';

export default function UploaderFiles() {
  return (
    <div className="mb-4">
      <form>
        <FileInput type="file" />
        <FileInput type="folder" />
      </form>
      <div className="flex justify-center space-x-4">
        {/* add files button */}
        <div className="flex flex-col items-center p-4 border border-dashed border-teal-300 rounded-md cursor-pointer hover:bg-teal-50">
           <CirclePlus className="w-8 h-8 mb-2 text-teal-700" />
          <span className="text-gray-700 font-medium">Add files</span>
        </div>
        {/* add folders button */}
        <div className="flex flex-col items-center p-4 border border-dashed border-teal-300 rounded-md cursor-pointer hover:bg-teal-50">
          <FolderPlus className="w-8 h-8 mb-2 text-teal-700" />
          <span className="text-gray-700 font-medium">Add folders</span>
        </div>
      </div>
      {/* file size upsell */}
      <div className="mt-4 flex items-center justify-between bg-yellow-100 p-2 rounded-md" data-testid="UploaderFileSizeBanner_Container">
        <span className="text-sm text-gray-700" data-testid="UploaderFileSizeBanner_Span">Get unlimited transfers</span>
        <Button variant="link" className="text-teal-500 flex items-center" asChild>
          <a href="#" data-testid="file-size-limit-transfer-upsell">
            <Zap className="mr-1" size={20} fill="currentColor" stroke="none" />
            Increase limit
          </a>
        </Button>
      </div>
    </div>
  );
}