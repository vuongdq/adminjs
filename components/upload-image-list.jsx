import React from 'react';
import { Box } from '@adminjs/design-system';

const UploadImageList = (props) => {
  const { record, property } = props;
  const path = record?.params[property.path];

  if (!path) {
    return null;
  }

  // Xử lý đường dẫn để lấy tên file
  const fileName = path.replace(/^.*[\\\/]/, '');
  const imagePath = `/uploads/${fileName}`;

  return (
    <Box>
      <img 
        src={imagePath} 
        alt="Thumbnail" 
        style={{ maxWidth: '100px' }}
      />
    </Box>
  );
};

export default UploadImageList; 