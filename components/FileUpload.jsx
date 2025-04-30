import React, { useState } from 'react';
import { Box, Button, FormGroup, Label } from '@adminjs/design-system';

const FileUpload = (props) => {
  const { property, record, onChange } = props;
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileUrl = e.target.result;
        onChange(property.name, fileUrl);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <Box>
        <input
          type="file"
          onChange={handleFileChange}
          accept="*/*"
        />
        {file && (
          <Box mt="md">
            <p>Selected file: {file.name}</p>
          </Box>
        )}
      </Box>
    </FormGroup>
  );
};

export default FileUpload; 