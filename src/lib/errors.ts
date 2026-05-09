/**
 * Classes de erro customizadas do projeto HFerraz Automação.
 *
 * Nunca use `throw new Error('mensagem')` ou `throw 'string'` diretamente.
 * Sempre use uma das classes abaixo — ou crie uma nova aqui se necessário.
 *
 * @module lib/errors
 */

// ─── Base ─────────────────────────────────────────────────────────────────────

/**
 * Classe base para todos os erros customizados da aplicação.
 * Garante que `instanceof` funcione corretamente com transpilação TypeScript.
 */
export abstract class AppError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        // Necessário para que `instanceof` funcione após transpilação para ES5
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

// ─── Erros de validação ───────────────────────────────────────────────────────

/**
 * Erro de validação de dados de entrada.
 * Use quando um campo ou payload não atende às regras de negócio.
 *
 * @example
 * ```ts
 * throw new ValidationError('E-mail inválido', 'email')
 * ```
 */
export class ValidationError extends AppError {
    /**
     * @param message - Descrição legível do erro
     * @param field - Nome do campo que falhou na validação (opcional)
     */
    constructor(
        message: string,
        public readonly field?: string
    ) {
        super(message)
    }
}

// ─── Erros de rede ────────────────────────────────────────────────────────────

/**
 * Erro de comunicação com APIs externas ou internas.
 * Use quando uma requisição HTTP falha ou retorna status de erro.
 *
 * @example
 * ```ts
 * throw new NetworkError('Falha ao enviar formulário', 500)
 * ```
 */
export class NetworkError extends AppError {
    /**
     * @param message - Descrição legível do erro
     * @param statusCode - Código HTTP da resposta (ex: 404, 500)
     */
    constructor(
        message: string,
        public readonly statusCode: number
    ) {
        super(message)
    }
}

// ─── Erros de dados ───────────────────────────────────────────────────────────

/**
 * Erro de dados inválidos ou inesperados recebidos de fontes externas.
 * Use quando um payload não corresponde ao tipo esperado.
 *
 * @example
 * ```ts
 * if (!isUserData(response)) throw new InvalidDataError('Resposta da API malformada')
 * ```
 */
export class InvalidDataError extends AppError {
    constructor(message: string) {
        super(message)
    }
}

// ─── Erros de configuração ────────────────────────────────────────────────────

/**
 * Erro de configuração ausente ou inválida.
 * Use para variáveis de ambiente obrigatórias não definidas.
 *
 * @example
 * ```ts
 * if (!process.env.API_KEY) throw new ConfigurationError('API_KEY não definida')
 * ```
 */
export class ConfigurationError extends AppError {
    constructor(message: string) {
        super(message)
    }
}

// ─── Tipo utilitário para resultados de API ───────────────────────────────────

/**
 * Tipo discriminado para resultados de operações assíncronas.
 * Evita o uso de try/catch em toda a aplicação — prefira este padrão
 * para funções que podem falhar de forma previsível.
 *
 * @example
 * ```ts
 * async function submitContact(data: ContactFormData): Promise<ApiResult<void>> {
 *   try {
 *     await api.post('/contact', data)
 *     return { success: true, data: undefined }
 *   } catch {
 *     return { success: false, error: 'Falha ao enviar', code: 500 }
 *   }
 * }
 *
 * const result = await submitContact(formData)
 * if (!result.success) {
 *   console.error(result.error) // TypeScript sabe que `error` existe aqui
 * }
 * ```
 */
export type ApiResult<T> =
    | { success: true; data: T }
    | { success: false; error: string; code: number }
