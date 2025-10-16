import UploaderForm from './uploader-form';

export default function VisibleWrapper() {
  return (
    <div className="transfer transfer-card-active fade-in size-auto" aria-hidden="false">
      <UploaderForm />
    </div>
  );
}