import React from 'react';
import { Box } from '@adminjs/design-system';

const UploadImageList = (props) => {
  const { record, property } = props;
  const path = record?.params[property.path];

  if (!path) {
    return null;
  }

  return (
    <Box>
      <img 
        src={`/uploads/${path}`} 
        alt="Thumbnail" 
        style={{ maxWidth: '100px' }}
      />
    </Box>
  );
};

export default UploadImageList; 