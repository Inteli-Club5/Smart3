import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Required when using in browser environments
});

const MAX_TOKENS = 150;
const TEMPERATURE = 0.7;

/**
 * Instruções padrão para a AI
 */
const DEFAULT_SYSTEM_PROMPT = `### **Formal English Prompt**  
**Role**: You are a **Blockchain and Web3 Educator** dedicated to making learning engaging and accessible for beginners and intermediate learners. Your objective is to teach users about blockchain, cryptocurrencies, decentralization, and related technologies using the **Socratic method**:  
1. **Provide a partial answer** upfront to establish credibility.  
2. **Pose thought-provoking follow-up questions** to deepen understanding (e.g., *"Why do you think decentralization prevents censorship?"*).  
3. **Tailor explanations** to the user's expertise level (avoid jargon for beginners; offer depth for intermediates).  

**Guidelines**:  
- **Tone**: Professional, approachable, and instructive (use clear analogies and structured explanations).  
- **Scope**: Focus strictly on blockchain/Web3. If asked about politics or ethics, politely redirect (e.g., *"My expertise is technical—would you like to explore how DeFi protocols work instead?"*).  
- **Clarity**: Simplify complex ideas with relatable examples (e.g., *"A blockchain is like a public ledger where transactions are recorded immutably"*).  
- **Uncertainty**: If unsure, respond: *"I'm not certain, but I can explain [related topic]..."*.  

**Example Interaction**:  
**User**: *Why is decentralization so important in blockchains like Ethereum?*  
**You**: *Excellent question. Let's analyze this step by step:  

🔍 **What is decentralization?**  
It refers to a system where control is distributed across many participants rather than held by a single entity. Key characteristics include:  
- Multiple independent operators maintain the network;  
- No single party can alter rules unilaterally;  
- All transactions are transparent and verifiable.  

💡 **Why does it matter?**  
- Prevents abuse of authority (e.g., arbitrary account freezes);  
- Ensures uniform rules for all participants;  
- Enhances trust through public auditability.  

👉 **In summary**: Decentralization promotes fairness, security, and resilience. Now, consider this: How might decentralized systems transform traditional platforms like social media?*  

---  

### **Key Features**:  
- **Structured explanations**: Clear headings (**What/Why/Summary**) for readability.  
- **Balanced engagement**: Answers thoroughly before inviting reflection.  
- **Neutral redirection**: Maintains focus on technology without dismissing user input.`;

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
 * Envia um prompt usando a OpenAI SDK e retorna uma resposta em formato de Promise.
 * Mantém o histórico da conversa para contexto por usuário.
 *
 * @param {string} prompt - O prompt a ser enviado para o GPT-4.
 * @param {string} userId - ID do usuário que está interagindo com o chatbot
 * @param {Object} options - Opções para a chamada da API.
 * @param {string} options.model - O modelo de IA a ser usado (padrão 'gpt-4o').
 * @param {boolean} options.rememberContext - Se deve manter histórico da conversa (padrão true).
 * @returns {Promise<string>} - Resposta do modelo.
 * 
 * Exemplo de uso:
 * Para o usuário com ID "1234"
 * 
 * const response = await askGpt("Como funciona blockchain?", "1234");
 */
export async function askGpt(prompt, userId, {
    model = 'gpt-3.5-turbo',
    rememberContext = true,
    systemPrompt = DEFAULT_SYSTEM_PROMPT,
    max_tokens = MAX_TOKENS,
    temperature = TEMPERATURE,
    ...otherParams
} = {}) {
    // Obtém ou inicializa o histórico do usuário
    if (!conversationHistories[userId] && rememberContext) {
        resetConversation(userId);
    }

    const userHistory = conversationHistories[userId] || [];
    
    const messages = rememberContext
        ? [...userHistory, { role: 'user', content: prompt }]
        : [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }];

    try {
        // Use OpenAI SDK to make request
        const completion = await openai.chat.completions.create({
            model,
            messages,
            max_tokens,
            temperature,
            ...otherParams
        });

        const assistantResponse = completion.choices[0]?.message?.content?.trim() || '';

        // Atualiza o histórico da conversa se a opção de lembrar contexto estiver ativada
        if (rememberContext) {
            // Record timestamp of last activity for cleanup purposes
            conversationHistories[userId].lastActivity = Date.now();
            
            conversationHistories[userId].push({ role: 'user', content: prompt });
            conversationHistories[userId].push({ role: 'assistant', content: assistantResponse });

            // Previnindo token overflow limitando o histórico a 5 mensagens além do prompt do sistema
            if (conversationHistories[userId].length > 11) {
                // Manter o prompt padrão no início, e as últimas 10 mensagens
                conversationHistories[userId] = [
                    conversationHistories[userId][0],
                    ...conversationHistories[userId].slice(-10)
                ];
            }
        }

        return assistantResponse;
    } catch (error) {
        if (error.response) {
            // OpenAI API returned an explicit error
            console.error('OpenAI API Error:', {
                status: error.response.status,
                data: error.response.data
            });
            throw new Error(`OpenAI API error: ${error.response.data.error?.message || 'Unknown error'}`);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from OpenAI:', error.request);
            throw new Error('No response from OpenAI API. Please check your internet connection.');
        } else {
            // Something else caused the error
            console.error('Error setting up request:', error.message);
            throw error;
        }
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

/**
 * Schedule regular cleanup of inactive conversations
 * Run every hour by default
 */
if (typeof window !== 'undefined') { // Only in browser environment
    setInterval(() => {
        cleanupInactiveConversations();
    }, 60 * 60 * 1000);
}