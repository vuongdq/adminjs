import React from 'react';
import { Box, Link } from '@adminjs/design-system';

const UploadFileList = (props) => {
  const { record, property } = props;
  const path = record?.params[property.path];

  if (!path) {
    return null;
  }

  return (
    <Box>
      <Link href={`/uploads/${path}`} target="_blank">
        {path}
      </Link>
    </Box>
  );
};

export default UploadFileList; 