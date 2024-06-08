export default async function runPrompt(
    prompt: string,
    n: number = 1
    /*
    size:
        | '256x256'
        | '512x512'
        | '1024x1024'
        | '1024x1792'
        | '1792x1024' = '512x512'
    */
) {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'dall-e-3',
            prompt,
            n
        })
    };

    const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        options
    );
    const data = await response.json();
    return data;
}
