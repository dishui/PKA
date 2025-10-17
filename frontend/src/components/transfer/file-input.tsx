'use client';
import { forwardRef, InputHTMLAttributes } from "react";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'file' | 'folder';
  }
  
  const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ type, ...props }, ref) => {
    const isFolder = type === 'folder';
    return (
      <input
        type="file"
        multiple
        aria-hidden="true"
        data-testid={isFolder ? undefined : 'file-input'}
        {...(isFolder ? { webkitdirectory: 'webkitdirectory', directory: 'directory' } : {})}
        className="hidden"
        ref={ref}
        {...props}
      />
    );
  });

  FileInput.displayName = 'FileInput';

  export default FileInput;