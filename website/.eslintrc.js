module.exports = {
  extends: ['config/eslint'],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {
    react: {
      version: '17.0.2'
    }
  }
};
