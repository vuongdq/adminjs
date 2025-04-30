import React from 'react';
import { Label, Box, DropZone, Button } from '@adminjs/design-system';

const UploadFile = (props) => {
  const { property, onChange, record } = props;
  const path = record?.params[property.path] || '';

  const handleDropZoneChange = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      onChange(property.path, file);
    }
  };

  return (
    <Box>
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange}>
        {path ? (
          <Box>
            <p>Current file: {path}</p>
            <Button onClick={() => onChange(property.path, null)}>Remove</Button>
          </Box>
        ) : (
          <p>Drag and drop a file here or click to select</p>
        )}
      </DropZone>
    </Box>
  );
};

export default UploadFile; 