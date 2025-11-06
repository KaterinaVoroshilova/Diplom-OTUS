export default Object.freeze({
  enable: process.env.TELEGRAM_ENABLE === 'true',
  token: process.env.TELEGRAM_TOKEN,
  chatId: process.env.TELEGRAM_CHAT_ID,
})

