import pkg from "./package.json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === 'production';
const banner = {
  banner() {
    return `/*! ${pkg.name} ${pkg.version}*/`;
  },
};
export default {
  input: "lib/index.js",
  output: [
    {
      file: "dist/mobile-text-selection.umd.js",
      format: "umd",
      name: "TextSelection",
    },
    {
      file: "dist/mobile-text-selection.esm.js",
      format: "esm",
      name: "TextSelection",
    },
  ],
  plugins: [
    isProduction && terser(),
    banner,
    // 这两个要按顺序
    // 没有这两个就创建不出babel helper函数 会报__create_class是undefined
    nodeResolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**", // 防止打包node_modules下的文件
      babelHelpers: "runtime", // 使plugin-transform-runtime生效
    }),
  ],
};
