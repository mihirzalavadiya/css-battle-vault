import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div style={{ position: 'relative', maxWidth: '600px' }}>
      <button onClick={handleCopy} className="copy-button">
        {copied ? (
          <FiCheck size={18} color="#47A025" />
        ) : (
          <FiCopy size={18} color="#eeb100" />
        )}
      </button>

      <SyntaxHighlighter
        language="html"
        style={oneDark}
        wrapLongLines={true}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
