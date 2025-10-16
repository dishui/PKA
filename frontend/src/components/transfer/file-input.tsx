interface FileInputProps {
    type: 'file' | 'folder';
  }
  
  export default function FileInput({ type }: FileInputProps) {
    const isFolder = type === 'folder';
    return (
      <input
        type="file"
        multiple
        aria-hidden="true"
        data-testid={isFolder ? undefined : 'file-input'}
        {...(isFolder ? { webkitdirectory: 'webkitdirectory', directory: 'directory' } : {})}
        className="hidden"
      />
    );
  }