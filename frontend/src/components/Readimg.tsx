type Props = {
  onFileSelect: (file: File | null) => void;
};

export const FileUpload = ({
      onFileSelect
    }: Props) => {
        const handleFileChange = (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = e.target.files?.[0] ?? null;

        onFileSelect(file);
};
    return (
    <div>

      <input
        type="file"
        accept=".wav"
        onChange={handleFileChange}
      />
    </div>
    );
};

export default FileUpload;