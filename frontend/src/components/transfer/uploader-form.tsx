import TransferFooter from './transfer-footer';
import UploaderFiles from './uploader-files';
import UploaderFields from './uploader-fields';

export default function UploaderForm() {
  return (
    <div className="border border-gray-200 rounded-md p-4" data-testid="uploaderForm">
      <div className="relative overflow-y-auto h-fit">
      <div className="p-4">
        <UploaderFiles />
        <UploaderFields />
      </div>
        {/*Scrollbar */}
       {/* <div className="absolute right-0 top-0 bottom-0 w-2 bg-gray-200">
            <div className="bg-gray-400 w-full" style={{ height: '236.722px', transform: 'translateY(22.2785px)' }}></div>
        </div>*/}
      </div>
      <TransferFooter />
    </div>
  );
}