import React from 'react';
import { Box, Link } from '@adminjs/design-system';

const UploadFileList = (props) => {
  const { record, property } = props;
  const path = record?.params[property.path];

  if (!path) {
    return null;
  }

  // Xử lý đường dẫn để lấy tên file
  const fileName = path.replace(/^.*[\\\/]/, '');
  const filePath = `/uploads/${fileName}`;

  return (
    <Box>
      <Link href={filePath} target="_blank">
        {fileName}
      </Link>
    </Box>
  );
};

export default UploadFileList; 