import React from 'react';
import { Label, Box, DropZone, Button } from '@adminjs/design-system';

const UploadImage = (props) => {
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
            <img 
              src={`/uploads/${path}`} 
              alt="Thumbnail" 
              style={{ maxWidth: '200px', marginBottom: '10px' }}
            />
            <Button onClick={() => onChange(property.path, null)}>Remove</Button>
          </Box>
        ) : (
          <p>Drag and drop an image here or click to select</p>
        )}
      </DropZone>
    </Box>
  );
};

export default UploadImage; 