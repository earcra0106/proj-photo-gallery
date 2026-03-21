import commonPrettierConfig from '@repo/prettier/common';
import backendPrettierConfig from '@repo/prettier/backend';

const prettierConfig = {
  ...commonPrettierConfig,
  ...backendPrettierConfig,
};

export default prettierConfig;