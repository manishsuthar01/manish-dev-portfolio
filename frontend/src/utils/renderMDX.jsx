import { compile } from "@mdx-js/mdx";

export async function compileMDX(mdx) {
  const code = await compile(mdx, {
    outputFormat: "function-body",
    development: false,
  });

  return String(code);
}