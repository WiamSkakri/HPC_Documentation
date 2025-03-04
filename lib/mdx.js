import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

const contentDirectory = path.join(process.cwd(), 'content');

export function getFiles() {
  return fs.readdirSync(contentDirectory);
}

export function getFileBySlug(slug) {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  
  return {
    source,
    frontmatter: {
      slug,
      ...data,
    },
    content,
  };
}

export async function getMdxSource(slug) {
  const { content, frontmatter } = getFileBySlug(slug);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeHighlight],
    },
    scope: frontmatter,
  });
  
  return { mdxSource, frontmatter };
}