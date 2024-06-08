import runDallE3Prompt from '@/controllers/dallE3Controller';
import ICommand from '@/interfaces/ICommand';

export default {
    name: 'dall-e',
    description: 'Generate an image with Dall-E',
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
            (await runDallE3Prompt(args.join(' '))).data
                .map(item => item.url)
                .join('\n')
        );
    },
    runSlash: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: interaction.options.getBoolean('private')
        });
        const prompt = interaction.options.getString('prompt');
        try {
            await interaction.editReply(
                (await runDallE3Prompt(prompt)).data
                    .map(item => item.url)
                    .join('\n')
            );
        } catch (error) {
            await interaction.followUp(
                'An error occurred while processing your request.'
            );
        }
    }
} as ICommand;
