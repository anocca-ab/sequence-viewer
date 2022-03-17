require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  extends: ['@rushstack/eslint-config/profile/web-app', '@rushstack/eslint-config/mixins/react'],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {
    react: {
      version: '17.0.2'
    }
  }
};
