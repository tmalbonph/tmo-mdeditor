module.exports = {
  name: 'markdown-editor',
  preset: '../../../../jest.config.js',
  transform: {
    '^.+\.[tj]sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../../coverage/libs/shared/util/markdown-editor'
};
