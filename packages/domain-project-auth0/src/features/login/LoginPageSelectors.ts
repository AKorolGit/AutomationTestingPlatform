export const auth0LoginSelectors = {
  emailInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  submitButton: 'button[type="submit"][name="action"]',
  resetPassword: 'a[href*="password-reset-start"]',
} as const;