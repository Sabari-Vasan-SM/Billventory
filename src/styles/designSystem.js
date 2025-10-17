// Modern Design System - Shared Styles Configuration
export const colors = {
  // Primary Colors
  primary: '#001f3f',
  primaryLight: '#003d7a',
  primaryDark: '#001528',
  
  // Accent Colors
  accent: '#3b82f6',
  accentLight: '#60a5fa',
  accentDark: '#2563eb',
  
  // Neutrals
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Semantic Colors
  success: '#10b981',
  successLight: '#34d399',
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  error: '#ef4444',
  errorLight: '#f87171',
  info: '#3b82f6',
  infoLight: '#60a5fa',
  
  // Background
  background: '#f1f5f9',
  surface: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
};

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
};

export const animations = {
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Reusable style objects
export const card = {
  background: colors.surface,
  borderRadius: borderRadius.xl,
  boxShadow: shadows.md,
  padding: spacing.xl,
  transition: animations.transition.base,
};

export const button = {
  primary: {
    background: colors.primary,
    color: colors.white,
    padding: `${spacing.md} ${spacing.xl}`,
    borderRadius: borderRadius.md,
    border: 'none',
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
    cursor: 'pointer',
    transition: animations.transition.base,
    boxShadow: shadows.sm,
  },
  secondary: {
    background: colors.gray100,
    color: colors.gray700,
    padding: `${spacing.md} ${spacing.xl}`,
    borderRadius: borderRadius.md,
    border: 'none',
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
    cursor: 'pointer',
    transition: animations.transition.base,
  },
  danger: {
    background: colors.error,
    color: colors.white,
    padding: `${spacing.md} ${spacing.xl}`,
    borderRadius: borderRadius.md,
    border: 'none',
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
    cursor: 'pointer',
    transition: animations.transition.base,
    boxShadow: shadows.sm,
  },
};

export const input = {
  base: {
    width: '100%',
    padding: `${spacing.md} ${spacing.lg}`,
    border: `2px solid ${colors.gray200}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily,
    backgroundColor: colors.white,
    transition: animations.transition.base,
    outline: 'none',
    fontWeight: typography.fontWeight.medium,
  },
  focused: {
    borderColor: colors.primary,
    boxShadow: `0 0 0 3px rgba(0, 31, 63, 0.1)`,
  },
};

export const badge = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: borderRadius.full,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  success: {
    background: colors.successLight,
    color: colors.white,
  },
  warning: {
    background: colors.warningLight,
    color: colors.white,
  },
  error: {
    background: colors.errorLight,
    color: colors.white,
  },
  info: {
    background: colors.infoLight,
    color: colors.white,
  },
};
