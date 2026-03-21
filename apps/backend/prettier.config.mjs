import commonPrettierConfig from '@repo/prettier-config/common';
import backendPrettierConfig from '@repo/prettier-config/backend';

const prettierConfig = {
  ...commonPrettierConfig,
  ...backendPrettierConfig,
};

export default prettierConfig;
