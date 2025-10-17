'use client';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { CirclePlus, FolderPlus, Zap  } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext';
import FileInput from './file-input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function UploaderFiles() {
  const { token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setSuccess('Files uploaded successfully');
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    onError: (error: AxiosError) => {
      setError((error.response?.data as { message?: string })?.message || 'Failed to upload files');
      setSuccess(null);
    },
  });

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setError(null);
      setSuccess(null);
      uploadMutation.mutate(Array.from(files));
    }
  };
  
  return (
    <div className="mb-4">
      <form>
        <FileInput type="file" />
        <FileInput type="folder" />
      </form>
      <div className={cn("flex justify-center space-x-4")}>
        {/* add files button */}
        <div 
          className={
            cn("flex flex-col items-center p-4 border border-dashed border-teal-300 rounded-md cursor-pointer hover:bg-teal-50", error && "border-red-500", success && "border-green-500")}
            onClick={handleFileInputClick}
            onKeyDown={(e) => e.key === 'Enter' && handleFileInputClick()}
            role="button"
            tabIndex={0}
          >
           <CirclePlus className="w-8 h-8 mb-2 text-teal-700" />
          <span className="text-gray-700 font-medium">Add files</span>
          <FileInput type='file' onChange={handleFileChange} />
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="p-3 bg-green-100 border border-green-200 rounded-md">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}
           {/*} <Button
            variant="outline"
            onClick={handleFileInputClick}
            disabled={uploadMutation.isPending}
            className="w-full"
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Upload Files'}
          </Button>*/}
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