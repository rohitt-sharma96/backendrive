import React, { useState } from 'react'

/**
 * Official Google Logo SVG matching Google Identity Services guidelines.
 * Dimensions: 18x18 (or 20x20), official multi-color 4-path G mark.
 * Colors:
 * - Blue:   #4285F4
 * - Green:  #34A853
 * - Yellow: #FBBC05
 * - Red:    #EA4335
 */
const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', flexShrink: 0 }}
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
    />
    <path
      fill="#FBBC05"
      d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
    />
  </svg>
)

/**
 * ContinueWithGoogle component compliant with Google Identity Services Branding Guidelines.
 *
 * Guidelines implemented:
 * 1. Official Google "G" logo without recoloring, distortion, or alteration.
 * 2. Approved text: "Continue with Google" (or "Sign in with Google" / "Sign up with Google").
 * 3. Typography: Roboto / Google Sans fallback, 14px, font-weight 500 (medium), Title Case.
 * 4. Google-standard theme specifications (Light with outline or GIS Neutral Dark).
 * 5. Minimum 40px height, clear space around the G logo, proper hover/active/focus states.
 *
 * @param {Object} props
 * @param {string} [props.href='/api/auth/google'] - Destination OAuth redirect URL
 * @param {function} [props.onClick] - Optional click handler (renders as <button> if provided without href)
 * @param {('light'|'dark')} [props.theme='light'] - 'light' (Standard white Google button) or 'dark' (GIS Neutral dark)
 * @param {('rounded'|'pill'|'rectangular')} [props.shape='rounded'] - Corner radius style
 * @param {string} [props.text='Continue with Google'] - Button copy
 * @param {boolean} [props.withDivider=false] - Whether to render an "or" divider above the button
 * @param {string} [props.dividerText='or'] - Text to display in divider
 * @param {string} [props.className] - Optional custom CSS class
 * @param {Object} [props.style] - Optional style overrides
 */
const ContinueWithGoogle = ({
  href = '/api/auth/google',
  onClick,
  theme = 'light',
  shape = 'rounded',
  text = 'Continue with Google',
  withDivider = false,
  dividerText = 'or',
  className = '',
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const isDark = theme === 'dark'

  // Corner radius per Google Identity spec
  const borderRadius =
    shape === 'pill' ? 9999 : shape === 'rectangular' ? 4 : 12

  // Base theme styles matching Google Identity Services
  const baseStyles = isDark
    ? {
        background: isActive ? '#282a2d' : isHovered ? '#202124' : '#131314',
        color: '#e3e3e3',
        border: `1px solid ${isHovered ? '#a8aaa8' : '#8e918f'}`,
        boxShadow: isHovered
          ? '0 1px 3px 0 rgba(0,0,0,0.4), 0 2px 6px 2px rgba(0,0,0,0.3)'
          : 'none',
      }
    : {
        background: isActive ? '#f1f3f4' : isHovered ? '#f8fafd' : '#ffffff',
        color: '#1f1f1f',
        border: `1px solid ${isHovered ? '#c6c6c6' : '#dadce0'}`,
        boxShadow: isHovered
          ? '0 1px 2px 0 rgba(60,64,67,0.30), 0 1px 3px 1px rgba(60,64,67,0.15)'
          : '0 1px 2px 0 rgba(0,0,0,0.05)',
      }

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: '100%',
    minHeight: 44,
    height: 44,
    padding: '0 16px',
    borderRadius,
    fontFamily:
      '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.25px',
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    boxSizing: 'border-box',
    transition: 'background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    outline: 'none',
    ...baseStyles,
    ...style,
  }

  const content = (
    <>
      <GoogleIcon />
      <span style={{ lineHeight: '1', whiteSpace: 'nowrap' }}>{text}</span>
    </>
  )

  const interactiveProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false)
      setIsActive(false)
    },
    onMouseDown: () => setIsActive(true),
    onMouseUp: () => setIsActive(false),
    onFocus: (e) => {
      e.currentTarget.style.outline = '2px solid #4285F4'
      e.currentTarget.style.outlineOffset = '2px'
    },
    onBlur: (e) => {
      e.currentTarget.style.outline = 'none'
    },
  }

  const buttonElement = onClick && !href ? (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
      className={className}
      aria-label={text}
      {...interactiveProps}
    >
      {content}
    </button>
  ) : (
    <a
      href={href}
      style={buttonStyle}
      className={className}
      aria-label={text}
      {...interactiveProps}
    >
      {content}
    </a>
  )

  if (withDivider) {
    return (
      <div style={{ width: '100%', marginTop: 20, marginBottom: 8 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12))',
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: '#71717a',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
            }}
          >
            {dividerText}
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.12))',
            }}
          />
        </div>
        {buttonElement}
      </div>
    )
  }

  return buttonElement
}

export default ContinueWithGoogle