// import runGpt4Prompt from '@/controllers/gpt4Controller';
// import runDallE3Prompt from '@/controllers/dallE3Controller';
// import IMessage from '@/interfaces/IMessage';
// import type IRequest from '@/interfaces/IRequest';

export default async (client, message) => {
    /*
    let instructions: string = `
    Follow these instructions:
    - ALWAYS return your response as JSON object following this model:
    type RequestType = 'TEXT' | 'PICTURE';
    interface IAbstractRequest {
        type: RequestType;
    }
    interface ITextRequest extends IAbstractRequest {
        type: 'TEXT';
    }
    interface IPictureRequest extends IAbstractRequest {
        type: 'PICTURE';
        request: {
            prompt: string;
            n: number;
        };
    }
    type IRequest = ITextRequest | IPictureRequest;
    - IF you interpret this message as a request to generate an image, set type as PICTURE and response as a revised prompt
    - ELSE set type as TEXT
    `;

    const response: IRequest = JSON.parse(
        (
            await runGpt4Prompt([
                {role: 'system', content: instructions},
                {role: 'user', content: message.content}
            ] as IMessage[])
        ).reverse()[0].content
    );
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
    */
};
