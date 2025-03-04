import { useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/CodeBlock';
import { getMdxSource, getAllPagesMetadata } from '../../lib/mdx';

const components = {
  code: CodeBlock,
  pre: (props) => <div {...props} />,
};

export default function Hpc2Page({ mdxSource, frontmatter, pages }) {
  useEffect(() => {
    // Use a dynamic import for the highlight.js styles
    try {
      import('highlight.js/styles/vs2015.css')
        .catch(() => console.warn('Could not load highlight.js CSS'));
    } catch (error) {
      console.warn('Error loading highlight.js CSS:', error);
    }
  }, []);

  return (
    <Layout title={frontmatter.title || 'HPC Guide'} pages={pages}>
      <article className="markdown-content">
        <MDXRemote {...mdxSource} components={components} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { mdxSource, frontmatter } = await getMdxSource('hpc2');
    const pages = getAllPagesMetadata();
    
    return {
      props: {
        mdxSource,
        frontmatter: frontmatter || {}, // Ensure frontmatter is never null
        pages: pages.map(page => ({
          ...page,
          title: page.title || page.slug // Ensure title is never undefined
        })),
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        mdxSource: null,
        frontmatter: {},
        pages: [],
      },
      // If you want to show an error page instead
      // notFound: true,
    };
  }
}