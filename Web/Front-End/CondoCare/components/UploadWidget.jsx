import React, { useState } from 'react';

const UploadWidget = ({ onFileUploaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    handleUpload();
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: selectedFile.type });
        onFileUploaded(blob);
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default UploadWidget;
