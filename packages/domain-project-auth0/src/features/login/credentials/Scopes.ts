export const Scopes = {
  Scope2: 'scope_2',
  Scope3: 'scope_3',
} as const;

export type Scope = typeof Scopes[keyof typeof Scopes];