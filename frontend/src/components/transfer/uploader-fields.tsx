import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import { Textarea } from "../ui/textarea";

export default function UploaderFields() {
  return (
    <div className="space-y-4">
      <div className="flex items-center w-full">
          <div className="flex-1 border-b border-gray-300 pb-2">
             <Label htmlFor="autosuggest" className="text-sm text-gray-500">Email to</Label>
             <Input id="autosuggest" type="email" autoComplete="off" className="border-none focus:ring-0" />
          </div>
          {/* Recipient Limit */}
          <span className="ml-2 text-sm text-gray-500">0 of 3</span>
       </div>
        {/* Sender Email */}
        <div className="border-b border-gray-300 pb-2">
            <Label htmlFor="email" className="text-sm text-gray-500">Your email</Label>
            <Input id="email" type="email" autoComplete="off" className="border-none focus:ring-0" />
        </div>
        {/* Display Name */}
        <div className="border-b border-gray-300 pb-2">
            <Label htmlFor="displayName" className="text-sm text-gray-500">Title</Label>
            <Input id="displayName" type="text" autoComplete="off" maxLength={255} className="border-none focus:ring-0" />
        </div>
        {/* Message */}
        <div>
            <Label htmlFor="message" className="text-sm text-gray-500">Message</Label>
            <Textarea id="message" className="min-h-[100px] border-none focus:ring-0 resize-none" />
            <div className="hidden" /> {/* Shadow div, perhaps for overflow effect */}
        </div>
    </div>
  );
}