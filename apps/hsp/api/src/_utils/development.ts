/**
 * Check if the current environment is a development environment
 */
export function isDevEnv(env?: string): boolean {
  const _env = env || process.env.ENV
  return _env === 'local' || _env === 'development' || _env === 'dev'
}
