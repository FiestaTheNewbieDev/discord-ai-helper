import runGpt4Prompt from '@/controllers/gpt4Controller';
import runDallE3Prompt from '@/controllers/dallE3Controller';
import IMessage from '@/interfaces/IMessage';
import type IRequest from '@/interfaces/IRequest';

export default async (client, message) => {
    let instructions: string = `
    Follow these instructions:
    - IF you interpret user message as a request to generate an image, format your response as JSON object following this model:
    interface IPictureRequest {
        type: 'PICTURE';
        request: {
            prompt: string; # revised prompt in english
            n: number; # number of images to generate
        }
    }
    - ELSE IF you interpret user message as a request to generate a text, format your response as JSON object following this model:
    interface ITextRequest {
        type: 'TEXT';
    }
    `;

    const responseText = (
        await runGpt4Prompt([
            {role: 'system', content: instructions},
            {role: 'user', content: message.content}
        ] as IMessage[])
    ).reverse()[0].content;

    console.log(responseText);

    const response: IRequest = JSON.parse(responseText);
    switch (response.type) {
        case 'TEXT':
            instructions = `
            Follow these instructions:
            - Your name is EXCLUSIVELY ${client.user}
            `;

            return (
                await runGpt4Prompt([
                    {
                        role: 'system',
                        content: instructions
                    },
                    {role: 'user', content: message.content}
                ] as IMessage[])
            ).reverse()[0].content;
        case 'PICTURE':
            return (await runDallE3Prompt(response.request.prompt)).data
                .map(item => item.url)
                .join('\n');
        default:
            return 'ERROR ! ERROR ! ERROR !';
    }
};
