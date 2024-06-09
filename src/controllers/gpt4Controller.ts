import IMessage from '@/interfaces/IMessage';

export default async function runPrompt(history: IMessage[]) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4-1106-preview',
            messages: history
        })
    };

    const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        options
    );
    const data = await response.json();
    return [
        ...history,
        {role: 'assistant', content: data.choices[0].message.content}
    ] as IMessage[];
}
