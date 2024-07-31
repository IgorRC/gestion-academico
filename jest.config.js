module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'node',
    transformIgnorePatterns: [
      'node_modules/(?!(bson)/)' // Añadir cualquier otro módulo necesario aquí
    ],
  };
  