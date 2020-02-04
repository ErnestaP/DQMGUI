const isDevelop = process.env.BABEL_ENV === "development";

module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        development: isDevelop,
      }
    ],
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 2
      }
    ],
  ],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs",
        "@babel/plugin-transform-runtime"
      ]
    }
  },
  plugins: [
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel",
    "@babel/plugin-proposal-object-rest-spread",
    ["transform-imports", {
      "@material-ui/core": {
        preventFullImport: true,
        transform: function importFromMaterialCore(importName) {
          if (importName === 'withStyles') return `@material-ui/core/styles/withStyles`;

          return `@material-ui/core/${importName}`;
        },
      },
      "@material-ui/icons": {
        preventFullImport: true,
        transform: function importFromMaterialIcons(importName) {
          return `@material-ui/icons/${importName}`;
        },
      },
      "material-ui-pickers": {
        preventFullImport: true,
      },
    }]
  ]
}
