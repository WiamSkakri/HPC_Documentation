import React from 'react';

const CodeBlock = ({ children, className }) => {
  // Extract language from className (format: language-*)
  const language = className ? className.replace('language-', '') : '';
  
  return (
    <div className="code-block-wrapper">
      {language && (
        <div className="code-language">{language}</div>
      )}
      <pre className={className}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;