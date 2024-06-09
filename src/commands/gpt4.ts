import runGpt4Prompt from '@/controllers/gpt4Controller';
import ICommand from '@/interfaces/ICommand';
import IMessage from '@/interfaces/IMessage';

export default {
    name: 'gpt4',
    description: 'Send raw prompt to GPT-4',
    options: [
        {
            name: 'prompt',
            description: 'Your prompt',
            required: true,
            type: 3
        },
        {
            name: 'private',
            description: 'Make the command result private',
            required: false,
            type: 5
        }
    ],
    run: async (client, message, args) => {
        message.channel.sendTyping();
        message.channel.send(
            (
                await runGpt4Prompt([
                    {role: 'user', content: args.join(' ')}
                ] as IMessage[])
            ).reverse()[0].content
        );
    },
    runSlash: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: interaction.options.getBoolean('private')
        });
        const prompt = interaction.options.getString('prompt');
        try {
            await interaction.editReply(
                (
                    await runGpt4Prompt([
                        {role: 'user', content: prompt}
                    ] as IMessage[])
                ).reverse()[0].content
            );
        } catch (error) {
            await interaction.followUp(
                'An error occurred while processing your request.'
            );
        }
    }
} as ICommand;
