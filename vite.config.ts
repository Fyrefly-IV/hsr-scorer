import { fileURLToPath, URL } from "node:url";

import { defineConfig, HtmlTagDescriptor } from "vite";
import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), injectCssAsStyleTag(), removeStylesheetLinks()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    cssCodeSplit: false,
  },
});

function injectCssAsStyleTag(): Plugin {
  return {
    name: "inject-css-as-style-tags",
    enforce: "post",
    apply: "build",
    transformIndexHtml(html, ctx) {
      const htmlTagDescriptors: HtmlTagDescriptor[] = [];
      const bundle = ctx.bundle;
      if (bundle == null) {
        return [];
      }

      Object.values(bundle)
        .filter((output) => output.fileName.endsWith(".css"))
        .forEach((output) => {
          if (output.type === "asset" && typeof output.source === "string") {
            htmlTagDescriptors.push({
              tag: "style",
              children: output.source,
              injectTo: "head",
            });
          }
        });

      return htmlTagDescriptors;
    },
  };
}

function removeStylesheetLinks(): Plugin {
  return {
    name: "remove-stylesheet-links",
    enforce: "post",
    apply: "build",
    transformIndexHtml(html, ctx) {
      return html.replaceAll(/<link\s+rel="stylesheet"(\s.*\s)href="(.*)\.css">/gi, "");
    },
  };
}
