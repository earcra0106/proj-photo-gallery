import commonPrettierConfig from '@repo/prettier-config/common';
import frontendPrettierConfig from '@repo/prettier-config/frontend';

const prettierConfig = {
  ...commonPrettierConfig,
  ...frontendPrettierConfig,
};

export default prettierConfig;
