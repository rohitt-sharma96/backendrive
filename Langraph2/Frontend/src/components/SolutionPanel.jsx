import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './SolutionPanel.css'

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '')
  return !inline && match ? (
    <SyntaxHighlighter
      style={oneDark}
      language={match[1]}
      PreTag="div"
      customStyle={{
        margin: '10px 0',
        borderRadius: '8px',
        fontSize: '12px',
        background: '#0d0f18',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '14px',
      }}
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>{children}</code>
  )
}

export default function SolutionPanel({ number, content, score, isWinner }) {
  const isHigh = score >= 9.0
  const isMax = score >= 9.5
  const colorClass = number === 1 ? 'sol-1' : 'sol-2'

  return (
    <div className={`solution-panel ${isWinner ? 'winner' : ''}`}>
      {/* Header */}
      <div className="solution-header">
        <div className="solution-header-left">
          <div className={`solution-number-badge ${colorClass}`}>
            S{number}
          </div>
          <div>
            <div className="solution-title">Solution {number}</div>
            <div className="solution-subtitle">AI-Generated Response</div>
          </div>
        </div>
        <div className={`solution-score-badge ${isMax ? 'score-max' : isHigh ? 'score-high' : ''}`}>
          <span className="score-star">★</span>
          {score}
        </div>
      </div>

      {/* Winner Banner */}
      {isWinner && (
        <div className="winner-banner">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
          Judge's Recommended Solution
        </div>
      )}

      {/* Content */}
      <div className="solution-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ code: CodeBlock }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
