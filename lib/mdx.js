import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

const contentDirectory = path.join(process.cwd(), 'content');

// Get all MDX files in the content directory
export function getAllFiles() {
  const files = fs.readdirSync(contentDirectory);
  return files.filter(file => file.endsWith('.mdx'));
}

// Get metadata for all pages for the sidebar
export function getAllPagesMetadata() {
  const files = getAllFiles();
  
  return files.map(filename => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.mdx$/, '');
    
    return {
      slug,
      title: data.title || slug, // Provide a fallback title if title is undefined
      description: data.description || '',
    };
  });
}

// Get the content and frontmatter for a specific file
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

// Process MDX content
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