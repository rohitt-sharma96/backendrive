import SolutionPanel from './SolutionPanel'
import JudgePanel from './JudgePanel'
import './ChatMessage.css'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatMessage({ message, timestamp }) {
  const { problem, solution_1, solution_2, judge } = message
  const winner = judge.solution_2_score >= judge.solution_1_score ? 2 : 1

  return (
    <div className="message-group">
      {/* User Message */}
      <div className="user-message-wrap">
        <div className="user-message">
          <div className="user-message-bubble">{problem}</div>
          <div className="user-message-meta">
            <div className="user-avatar">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            You · {formatTime(timestamp)}
          </div>
        </div>
      </div>

      {/* AI Response Header */}
      <div>
        <div className="response-header">
          <div className="ai-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <path d="M12 17h.01"/>
            </svg>
          </div>
          <span className="response-label">AI Judge System</span>
          <span className="response-timestamp">{formatTime(timestamp)}</span>
        </div>

        {/* Solutions Grid */}
        <div className="results-grid">
          <SolutionPanel
            number={1}
            content={solution_1}
            score={judge.solution_1_score}
            isWinner={winner === 1}
          />
          <SolutionPanel
            number={2}
            content={solution_2}
            score={judge.solution_2_score}
            isWinner={winner === 2}
          />
        </div>
      </div>

      {/* Judge Panel */}
      <div className="judge-section">
        <JudgePanel judge={judge} />
      </div>
    </div>
  )
}
