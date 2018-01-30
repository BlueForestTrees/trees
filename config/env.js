const envFile = process.env.NODE_ENV || 'development';
const env = require(`./env/${envFile}`).default;
export default env;
console.log(`   ==> `,env, ` <==`);