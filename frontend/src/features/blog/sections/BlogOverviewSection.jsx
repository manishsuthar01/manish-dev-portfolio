import { useEffect, useState, useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import { runSync } from "@mdx-js/mdx"; 
import { MDXProvider } from "@mdx-js/react";
import { compileMDX } from "@/utils/renderMDX";
import { mdxComponents } from "@/components/mdx/index";

const BlogOverviewSection = ({ blog }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (blog?.content) {
      compileMDX(blog.content).then(setCode);
    }
  }, [blog?.content]);

  const Content = useMemo(() => {
    if (!code) return null;
    return runSync(code, runtime).default;
  }, [code]);

  if (!Content) return null;
  return (
    <section className="mx-auto max-w-7xl px-10 md:px-12 py-16 md:py-24 border-b border-border/50 bg-background/60">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-4 h-fit md:sticky md:top-32">
          <h4 className="font-jakarta text-[7px] md:text-xs uppercase tracking-[0.45em] text-muted-foreground/80 mb-6">
            Summary
          </h4>
          <p className="font-instrument text-lg md:text-xl italic leading-relaxed text-muted-foreground/80">
            {blog?.excerpt}
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="max-w-3xl">
            <div className="font-instrument"></div>
            <article className="prose prose-lg dark:prose max-w-none  prose-headings:font-jakarta prose-headings:font-bold prose-headings:text-foreground prose-headings:mb-4 prose-headings:mt-10  ">
              <Content components={mdxComponents} />
            </article>

            <div className="mt-20 pt-10 border-t border-border/40 flex items-center gap-5">
              <div className="h-12 w-12 rounded-full bg-foreground/5 flex items-center justify-center border border-border/50 text-lg">
                ✦
              </div>
              <div className="space-y-1">
                <p className="font-jakarta text-xs md:text-sm font-bold uppercase tracking-widest text-foreground">
                  Written by Manish Suthar
                </p>
                <p className="font-jakarta text-[10px] uppercase tracking-widest text-muted-foreground/50">
                  Full Stack Developer • India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogOverviewSection;
