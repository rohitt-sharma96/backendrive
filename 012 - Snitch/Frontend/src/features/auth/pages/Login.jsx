import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

// ─── Icons ────────────────────────────────────────────────────────────────────

const EyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

// ─── Input Field Component ────────────────────────────────────────────────────

const Field = ({ label, id, icon, type = 'text', placeholder, value, onChange, right, required = true }) => {

  
  
  
  
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          color: '#a08e7a',
          fontSize: 11,
          letterSpacing: '0.06em',
          fontWeight: 500,
          textTransform: 'uppercase',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(13,15,18,0.7)',
          border: focused ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '14px 16px',
          boxShadow: focused ? '0 0 0 3px rgba(245,158,11,0.12)' : 'none',
          transition: 'border 0.18s, box-shadow 0.18s',
        }}
      >
        <span
          style={{
            color: focused ? '#f59e0b' : '#52525b',
            transition: 'color 0.18s',
            flexShrink: 0,
            display: 'flex',
          }}
        >
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={type === 'password' ? 'current-password' : 'email'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f9fafb',
            fontSize: 14,
            fontFamily: "'Hanken Grotesk', sans-serif",
          }}
        />
        {right}
      </div>
    </div>
  )
}

// ─── Brand Panel (desktop) ────────────────────────────────────────────────────

const FEATURES = [
  { icon: '◆', title: 'Seamless Access', desc: 'Secure authentication with high-speed atelier synchronization' },
  { icon: '◈', title: 'Atelier Management', desc: 'Manage your portfolio, customer inquiries, and sales flow' },
  { icon: '◉', title: 'Encrypted Security', desc: 'End-to-end credential hashing & session integrity' },
]

const BrandPanel = () => (
  <div
    className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
    style={{
      width: '42%',
      flexShrink: 0,
      background: '#09090b',
      backgroundImage:
        'radial-gradient(ellipse 90% 80% at -10% 0%, rgba(245,158,11,0.14) 0%, transparent 65%),' +
        'radial-gradient(ellipse 60% 60% at 110% 100%, rgba(245,158,11,0.06) 0%, transparent 60%)',
    }}
  >
    {/* Concentric decorative ambient rings */}
    {[
      { t: -120, l: -120, s: 400, o: 0.07 },
      { t: -60, l: -60, s: 280, o: 0.05 },
    ].map((r, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: r.t,
          left: r.l,
          width: r.s,
          height: r.s,
          borderRadius: '50%',
          border: `1px solid rgba(245,158,11,${r.o})`,
          pointerEvents: 'none',
        }}
      />
    ))}
    <div
      style={{
        position: 'absolute',
        bottom: -80,
        right: -80,
        width: 320,
        height: 320,
        borderRadius: '50%',
        border: '1px solid rgba(245,158,11,0.06)',
        pointerEvents: 'none',
      }}
    />

    {/* Top brand header & feature highlights */}
    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Brand identity */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: '0.22em',
              color: '#f59e0b',
              fontFamily: "'Outfit', sans-serif",
              lineHeight: 1,
            }}
          >
            SNITCH
          </span>
          <span
            style={{
              fontSize: 10,
              fontFamily: "'JetBrains Mono', monospace",
              color: '#ca8a04',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 4,
              padding: '2px 8px',
              letterSpacing: '0.1em',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
          >
            ATELIER
          </span>
        </div>
        <p style={{ fontSize: 15, color: '#a08e7a', fontFamily: "'Hanken Grotesk', sans-serif", letterSpacing: '0.04em', margin: 0 }}>
          Welcome back. Continue your curated experience.
        </p>
      </div>

      {/* Feature perks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#f59e0b',
                fontSize: 14,
              }}
            >
              {f.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <p style={{ color: '#f9fafb', fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 500, margin: 0 }}>
                {f.title}
              </p>
              <p style={{ color: '#6b7280', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 13, margin: 0 }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Luxury Member Testimonial */}
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'rgba(245,158,11,0.04)',
        border: '1px solid rgba(245,158,11,0.15)',
        borderLeft: '3px solid #f59e0b',
        borderRadius: 12,
        padding: '20px 20px 20px 22px',
      }}
    >
      <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} style={{ color: '#f59e0b', display: 'flex' }}>
            <StarIcon />
          </span>
        ))}
      </div>
      <p style={{ color: '#d8c3ad', fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 14, lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
        &ldquo;Managing bespoke inventory and client transactions has never been more refined.&rdquo;
      </p>
      <p style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginTop: 12, marginBottom: 0, letterSpacing: '0.04em' }}>
        — Clara M., Private Collector & Seller
      </p>
    </div>

    {/* Golden edge divider line */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.15) 30%, rgba(245,158,11,0.15) 70%, transparent)',
      }}
    />
  </div>
)

// ─── Mobile Top Bar ───────────────────────────────────────────────────────────

const MobileBar = () => (
  <div
    className="lg:hidden"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(9,9,11,0.9)',
      backdropFilter: 'blur(12px)',
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: '0.18em',
        color: '#f59e0b',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      SNITCH
    </span>
    <span
      style={{
        fontSize: 10,
        fontFamily: "'JetBrains Mono', monospace",
        color: '#ca8a04',
        background: 'rgba(245,158,11,0.1)',
        border: '1px solid rgba(245,158,11,0.2)',
        borderRadius: 4,
        padding: '3px 8px',
        letterSpacing: '0.08em',
        fontWeight: 500,
        textTransform: 'uppercase',
      }}
    >
      ATELIER
    </span>
  </div>
)

// ─── Login Component ──────────────────────────────────────────────────────────

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [rememberMe, setRememberMe] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email: form.email, password: form.password })
    console.log("LoggedIn")
    navigate("/")
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#09090b' }}>
      <MobileBar />

      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Left brand panel — desktop view */}
        <BrandPanel />

        {/* Right form panel */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#0e0e10',
            borderLeft: '1px solid rgba(255,255,255,0.04)',
            minWidth: 0,
          }}
        >
          {/* Utility Top Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 32px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                color: '#ca8a04',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Atelier Portal
            </span>
            <span style={{ fontSize: 12, color: '#6b7280', fontFamily: "'Hanken Grotesk', sans-serif" }}>
              Need help?{' '}
              <a
                href="#"
                style={{ color: '#f59e0b', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fbbf24')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#f59e0b')}
              >
                Concierge support
              </a>
            </span>
          </div>

          {/* Scrollable form area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 24px',
            }}
          >
            <div style={{ width: '100%', maxWidth: 440 }}>
              {/* Heading */}
              <div style={{ marginBottom: 32 }}>
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: '#f9fafb',
                    fontFamily: "'Outfit', sans-serif",
                    margin: '0 0 8px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Welcome Back
                </h1>
                <p style={{ fontSize: 14, color: '#6b7280', fontFamily: "'Hanken Grotesk', sans-serif", margin: 0 }}>
                  Enter your credentials to access your atelier account.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Email Field */}
                <Field
                  label="Email Address"
                  id="email"
                  type="email"
                  icon={<MailIcon />}
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={set('email')}
                />

                {/* Password Field */}
                <Field
                  label="Password"
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  icon={<LockIcon />}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={set('password')}
                  right={
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      style={{
                        color: showPw ? '#f59e0b' : '#52525b',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'color 0.18s',
                        flexShrink: 0,
                        display: 'flex',
                      }}
                      aria-label="Toggle password visibility"
                    >
                      {showPw ? <EyeOpen /> : <EyeOff />}
                    </button>
                  }
                />

                {/* Remember Me & Forgot Password Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 2,
                  }}
                >
                  {/* Remember Me Checkbox */}
                  <div
                    onClick={() => setRememberMe((v) => !v)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 5,
                        background: rememberMe ? '#f59e0b' : 'rgba(13,15,18,0.7)',
                        border: rememberMe ? '1.5px solid #f59e0b' : '1.5px solid rgba(255,255,255,0.2)',
                        boxShadow: rememberMe ? '0 0 8px rgba(245,158,11,0.3)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.18s',
                      }}
                    >
                      {rememberMe && <span style={{ color: '#09090b', display: 'flex' }}><CheckIcon /></span>}
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        color: rememberMe ? '#f9fafb' : '#a08e7a',
                        fontFamily: "'Hanken Grotesk', sans-serif",
                        transition: 'color 0.18s',
                      }}
                    >
                      Remember me
                    </span>
                  </div>

                  {/* Forgot Password Link */}
                  <a
                    href="#"
                    style={{
                      fontSize: 13,
                      color: '#a08e7a',
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      textDecoration: 'none',
                      transition: 'color 0.18s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f59e0b')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#a08e7a')}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  id="submit-login"
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    background: 'linear-gradient(135deg, #f59e0b, #ca8a04)',
                    color: '#09090b',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: '0.04em',
                    border: 'none',
                    borderRadius: 12,
                    padding: '15px 24px',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    opacity: submitting ? 0.65 : 1,
                    boxShadow: '0 4px 20px rgba(245,158,11,0.28)',
                    transition: 'all 0.2s',
                    marginTop: 8,
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.boxShadow = '0 6px 28px rgba(245,158,11,0.45)'
                      e.currentTarget.style.background = 'linear-gradient(135deg, #fbbf24, #d97706)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.28)'
                    e.currentTarget.style.background = 'linear-gradient(135deg, #f59e0b, #ca8a04)'
                  }}
                >
                  {submitting ? (
                    'Authenticating…'
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowIcon />
                    </>
                  )}
                </button>
              </form>

              {/* Security Badge */}
              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  color: '#52525b',
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                256-bit TLS encrypted session
              </div>

              {/* Sign up link */}
              <div
                style={{
                  marginTop: 28,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: 14, color: '#6b7280', fontFamily: "'Hanken Grotesk', sans-serif", margin: 0 }}>
                  Don&apos;t have an account?{' '}
                  <Link
                    to="/register"
                    style={{ color: '#f59e0b', fontWeight: 600, textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#fbbf24')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#f59e0b')}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div
            style={{
              padding: '14px 32px',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
              flexShrink: 0,
            }}
          >
            {['Privacy Protocol', 'Terms of Service', 'Concierge'].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontSize: 11,
                  color: '#4b5563',
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f59e0b')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login