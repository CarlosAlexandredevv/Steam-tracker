const PREFIX = '[steam-track:action]';
const isDev = process.env.NODE_ENV === 'development';

type LogLevel = 'info' | 'warn' | 'error';

function log(
  level: LogLevel,
  action: string,
  payload: Record<string, unknown>,
) {
  const payloadStr = JSON.stringify(payload);
  const line = `${PREFIX} ${action} ${payloadStr}`;
  switch (level) {
    case 'info':
      console.log(line);
      break;
    case 'warn':
      console.warn(line);
      break;
    case 'error':
      console.error(line);
      break;
  }
}

function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      ...(isDev && { stack: error.stack }),
    };
  }
  return { raw: String(error) };
}

/**
 * Envolve uma server action com log de início, duração e resultado (sucesso ou erro).
 * Use em todas as actions para rastrear em prod.
 */
export async function withActionLog<T>(
  actionName: string,
  params: Record<string, unknown>,
  fn: () => Promise<T>,
): Promise<T> {
  const start = Date.now();
  log('info', actionName, { event: 'start', params });

  try {
    const result = await fn();
    const durationMs = Date.now() - start;
    const hasData =
      result !== null &&
      result !== undefined &&
      (Array.isArray(result) ? result.length : true);
    log('info', actionName, {
      event: 'end',
      ok: true,
      durationMs,
      resultSummary: Array.isArray(result)
        ? `array(${result.length})`
        : typeof result,
      hasData: !!hasData,
    });
    return result as T;
  } catch (error) {
    const durationMs = Date.now() - start;
    log('error', actionName, {
      event: 'end',
      ok: false,
      durationMs,
      error: serializeError(error),
    });
    throw error;
  }
}

/**
 * Log de falha quando a action retorna null/[] por erro (sem throw).
 * Chame antes de return null para manter rastreabilidade.
 */
export function logActionFailure(
  actionName: string,
  params: Record<string, unknown>,
  error: unknown,
) {
  log('warn', actionName, {
    event: 'failure',
    params,
    error: serializeError(error),
  });
}

/**
 * Log genérico para loadings — quando um loading.tsx é renderizado.
 * Use no topo do componente para confirmar que o loading está sendo exibido.
 */
export function logLoading(segment: string) {
  console.log(`${PREFIX.replace('action', 'loading')} segment=${segment}`);
}
