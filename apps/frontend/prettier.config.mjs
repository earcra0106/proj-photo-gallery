import commonPrettierConfig from '@repo/prettier/common';
import frontendPrettierConfig from '@repo/prettier/frontend';

const prettierConfig = {
  ...commonPrettierConfig,
  ...frontendPrettierConfig,
};

export default prettierConfig;
