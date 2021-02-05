module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 检测新文件末尾是否有空行
    'eol-last': 0,
    // 函数括号无空格
    'space-before-function-paren': 0,
    // 不检查分号
    'semi': 0
  }
}
