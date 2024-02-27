require("react-scripts/config/env");

const path = require("path");

module.exports = {
  devServer: {
    port: 3000,
    host: "localhost",
  },
  webpack: {
    alias: {
      "@constants": path.resolve(__dirname, "src/app/Constants"),
      "@services": path.resolve(__dirname, "src/app/Services"),
      "@slices": path.resolve(__dirname, "src/app/Slices"),
      "@app": path.resolve(__dirname, "src/app"),
      "@components": path.resolve(__dirname, "@components/Button"),
      "@hooks": path.resolve(__dirname, "src/common/Hooks"),
      "@utils": path.resolve(__dirname, "src/common/Utils"),
      "@common": path.resolve(__dirname, "src/common"),
      "@auth": path.resolve(__dirname, "src/features/Auth"),
      "@admin": path.resolve(__dirname, "src/features/Admin"),
      "@client": path.resolve(__dirname, "src/features/Client"),
    },
  },
};
