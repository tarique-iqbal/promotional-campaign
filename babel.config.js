module.exports = {
  presets: [
    '@babel/preset-env',  // For ES features
    '@babel/preset-typescript',  // For TypeScript
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
  ],
};
