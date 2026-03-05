/**
 * Design Tokens - Centralized color and sizing system
 * Ensures consistency across the application
 */

export const colors = {
  // Primary Brand Colors
  primary: "#3B82F6", // Blue
  primaryLight: "#DBEAFE",
  primaryDark: "#1E40AF",

  // Secondary Colors
  secondary: "#8B5CF6", // Purple
  secondaryLight: "#EDE9FE",
  secondaryDark: "#6D28D9",

  // Status Colors
  success: "#10B981", // Green
  warning: "#F59E0B", // Amber
  danger: "#EF4444", // Red
  info: "#0EA5E9", // Cyan

  // Neutral Colors
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Semantic Colors
  text: {
    primary: "#1F2937",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    disabled: "#D1D5DB",
  },
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
  },
  border: "#E5E7EB",
};

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "2.5rem", // 40px
  "3xl": "3rem", // 48px
};

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "2rem", // 32px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

export const borderRadius = {
  sm: "0.375rem", // 6px
  base: "0.5rem", // 8px
  md: "0.75rem", // 12px
  lg: "1rem", // 16px
  xl: "1.5rem", // 24px
  full: "9999px",
};

export const transitions = {
  fast: "150ms ease-in-out",
  base: "200ms ease-in-out",
  slow: "300ms ease-in-out",
};
