import { useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../components/Layout';
import CodeBlock from '../components/CodeBlock';
import { getMdxSource } from '../lib/mdx';

const components = {
  code: CodeBlock,
  pre: (props) => <div {...props} />,
};

export default function Home({ mdxSource, frontmatter }) {
  useEffect(() => {
    // Load syntax highlighting on client side - use a dark theme
    import('highlight.js/styles/vs2015.css');
  }, []);

  return (
    <Layout title={frontmatter.title}>
      <article className="markdown-content">
        <MDXRemote {...mdxSource} components={components} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  const { mdxSource, frontmatter } = await getMdxSource('hpc-environment');
  
  return {
    props: {
      mdxSource,
      frontmatter,
    },
  };
}