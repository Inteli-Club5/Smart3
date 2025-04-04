const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MAX_TOKENS = 150;
const TEMPERATURE = 0.7;

/**
 * Instruções padrão para a AI
 */
const DEFAULT_SYSTEM_PROMPT = `You are a professional assistant for an online Web3 education platform.`;

/**
 * Histórico das conversas com o chatbot organizados por userId
 */
const conversationHistories = {};

/**
 * Reseta o histórico da conversa de um usuário específico
 * @param {string} userId - ID do usuário
 */
export function resetConversation(userId) {
    conversationHistories[userId] = [
        { role: 'system', content: DEFAULT_SYSTEM_PROMPT }
    ];
    return conversationHistories[userId];
}

/**
 * Obtém o histórico da conversa para um usuário específico
 * @param {string} userId - ID do usuário
 * @returns {Array} - Histórico da conversa
 */
export function getConversationHistory(userId) {
    if (!conversationHistories[userId]) {
        resetConversation(userId);
    }
    return conversationHistories[userId];
}

/**
 * Envia um prompt usando a API da OpenAI e retorna uma resposta em formato de Promise.
 * Mantém o histórico da conversa para contexto por usuário.
 *
 * @param {string} prompt - O prompt a ser enviado para o GPT-4.
 * @param {string} userId - ID do usuário que está interagindo com o chatbot
 * @param {Object} options - Opções para a chamada da API.
 * @param {string} options.model - O modelo de IA a ser usado (padrão 'gpt-4').
 * @param {boolean} options.rememberContext - Se deve manter histórico da conversa (padrão true).
 * @returns {Promise<string>} - Resposta do GPT-4.
 * 
 * Exemplo de uso:
 * Para o usuário com ID "1234"
 * 
 * const response = await askGpt("Como funciona blockchain?", "1234");
 */
export async function askGpt(prompt, userId, {
    model = 'gpt-4',
    rememberContext = true,
    systemPrompt = DEFAULT_SYSTEM_PROMPT,
    ...otherParams
} = {}) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    // Obtém ou inicializa o histórico do usuário
    if (!conversationHistories[userId] && rememberContext) {
        resetConversation(userId);
    }

    const userHistory = conversationHistories[userId] || [];
    
    const messages = rememberContext
        ? [...userHistory, { role: 'user', content: prompt }]
        : [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }];

    const data = {
        model,
        messages,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        ...otherParams
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const result = await response.json();
        const assistantResponse = result.choices?.[0]?.message?.content?.trim() || '';

        // Atualiza o histórico da conversa se a opção de lembrar contexto estiver ativada
        if (rememberContext) {
            conversationHistories[userId].push({ role: 'user', content: prompt });
            conversationHistories[userId].push({ role: 'assistant', content: assistantResponse });

            // Previnindo token overflow limitando o histórico a 5 mensagens além do prompt do sistema
            if (conversationHistories[userId].length > 5) {
                // Manter o prompt padrão no início, e as últimas 5 mensagens
                conversationHistories[userId] = [
                    conversationHistories[userId][0],
                    ...conversationHistories[userId].slice(-5)
                ];
            }
        }

        return assistantResponse;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}

/**
 * Função para atualizar o systemprompt de um usuário específico
 * @param {string} newSystemPrompt - O novo prompt do sistema.
 * @param {string} userId - ID do usuário
 */
export function updateSystemPrompt(newSystemPrompt, userId) {
    if (!conversationHistories[userId]) {
        conversationHistories[userId] = [{ role: 'system', content: newSystemPrompt }];
        return;
    }
    
    if (conversationHistories[userId][0].role === 'system') {
        conversationHistories[userId][0].content = newSystemPrompt;
    } else {
        conversationHistories[userId].unshift({ role: 'system', content: newSystemPrompt });
    }
}

/**
 * Limpa históricos de conversas inativas para economizar memória
 * @param {number} maxAgeMinutes - Tempo máximo de inatividade em minutos
 */
export function cleanupInactiveConversations(maxAgeMinutes = 60) {
    const now = Date.now();
    Object.keys(conversationHistories).forEach(userId => {
        const lastActivity = conversationHistories[userId].lastActivity || 0;
        if ((now - lastActivity) > (maxAgeMinutes * 60 * 1000)) {
            delete conversationHistories[userId];
        }
    });
}