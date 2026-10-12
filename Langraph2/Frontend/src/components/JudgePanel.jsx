import './JudgePanel.css'

export default function JudgePanel({ judge }) {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge
  const winner = solution_2_score >= solution_1_score ? 2 : 1
  const winnerScore = winner === 2 ? solution_2_score : solution_1_score
  const maxScore = 10

  return (
    <div className="judge-panel">
      {/* Header */}
      <div className="judge-header">
        <div className="judge-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div>
          <div className="judge-title">AI Judge Evaluation</div>
          <div className="judge-subtitle">Comparative analysis & scoring</div>
        </div>
      </div>

      {/* Body */}
      <div className="judge-body">

        {/* Score Comparison */}
        <div className="score-comparison">
          {/* Solution 1 */}
          <div className={`score-card ${winner === 1 ? 'winner-card' : ''}`}>
            <div className="score-card-label">Solution 1</div>
            <div>
              <span className="score-card-value sol-1-color">{solution_1_score}</span>
              <span className="score-card-max"> / {maxScore}</span>
            </div>
            <div className="score-bar-wrap">
              <div className="score-bar-track">
                <div
                  className="score-bar-fill sol-1-bar"
                  style={{ width: `${(solution_1_score / maxScore) * 100}%` }}
                />
              </div>
              <span className="score-bar-label">{((solution_1_score / maxScore) * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Versus */}
          <div className="versus-divider">
            <div className="versus-line" />
            <span className="versus-text">VS</span>
            <div className="versus-line" />
          </div>

          {/* Solution 2 */}
          <div className={`score-card ${winner === 2 ? 'winner-card' : ''}`}>
            <div className="score-card-label">Solution 2</div>
            <div>
              <span className="score-card-value sol-2-color">{solution_2_score}</span>
              <span className="score-card-max"> / {maxScore}</span>
            </div>
            <div className="score-bar-wrap">
              <div className="score-bar-track">
                <div
                  className="score-bar-fill sol-2-bar"
                  style={{ width: `${(solution_2_score / maxScore) * 100}%` }}
                />
              </div>
              <span className="score-bar-label">{((solution_2_score / maxScore) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Winner Announcement */}
        <div className="winner-announcement">
          <span className="winner-trophy">🏆</span>
          <div className="winner-announcement-text">
            <div className="winner-announcement-title">
              Solution {winner} wins with a score of {winnerScore}/{maxScore}
            </div>
            <div className="winner-announcement-desc">
              {Math.abs(solution_2_score - solution_1_score).toFixed(1)} point difference — 
              {winner === 2 ? ' Solution 2 is preferred for its cleaner approach' : ' Solution 1 is preferred for its comprehensive coverage'}
            </div>
          </div>
        </div>

        {/* Reasoning Section */}
        <div className="reasoning-section">
          <div className="reasoning-title">Judge Reasoning</div>
          <div className="reasoning-grid">
            {/* Solution 1 Reasoning */}
            <div className="reasoning-card">
              <div className="reasoning-card-header">
                <div className="reasoning-card-dot dot-1" />
                <span className="reasoning-card-name">Solution 1</span>
                <span className="reasoning-card-score-pill pill-1">{solution_1_score}</span>
              </div>
              <p className="reasoning-card-text">{solution_1_reasoning}</p>
            </div>

            {/* Solution 2 Reasoning */}
            <div className="reasoning-card">
              <div className="reasoning-card-header">
                <div className="reasoning-card-dot dot-2" />
                <span className="reasoning-card-name">Solution 2</span>
                <span className="reasoning-card-score-pill pill-2">{solution_2_score}</span>
              </div>
              <p className="reasoning-card-text">{solution_2_reasoning}</p>
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="verdict-banner">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          This evaluation is AI-generated. Always review solutions independently before use.
        </div>

      </div>
    </div>
  )
}
