import interractiveChatController from '@/controllers/interractiveChatController';
import ICommand from '@/interfaces/ICommand';
import IEvent from '@/interfaces/IEvent';

const prefix = '!';

export default {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (message.author.bot) return;

        if (message.content.startsWith(prefix)) {
            const args = message.content
                .slice(prefix.length)
                .trim()
                .split(/ +/g);
            const commandName = args.shift().toLowerCase();
            if (commandName.length === 0) return;

            const command: ICommand = client.commands.get(commandName);
            if (command) command.run(client, message, args);
            return;
        }

        if (message.mentions.has(client.user)) {
            message.channel.sendTyping();
            message.channel.send(
                await interractiveChatController(client, message)
            );
        }
    }
} as IEvent;
