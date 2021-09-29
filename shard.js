//if ever need sharding https://www.youtube.com/watch?v=q3-gmysnGYg&list=PLT2usuNCFnxWiv9DafkEu0RZcGYgADal7&index=12
require('dotenv').config();

const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', { token: process.env.token});

manager.on('shardCreate', shard => console.log(`Iniciando Shard ${shard.id}`));

manager.spawn();