import { Button } from '@/components/ui/button';
import OptionsBar from './options-bar';

export default function TransferFooter() {
  return (
    <div className="mt-4 flex flex-col justify-between items-center gap-4">
      <OptionsBar className="w-full py-4" />
     
      <Button className="w-full py-4 bg-teal-500 text-white hover:bg-teal-700" data-testid="uploaderForm-transfer-button">
        Transfer
      </Button>
    </div>
  );
}