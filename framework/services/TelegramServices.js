import config from '../config/configTelegram.js'

const sendMessage = async (message) => {
  if (!config.enable) {
    return
  }

  if (!config.token || !config.chatId) {
    console.warn('Для отправки сообщений в телеграм нужно задать токен и ID чата')
    return
  }

  const response = await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: config.chatId,
      text: message
    })
  })
  console.log('response.status', response.status)
  console.log('data', await response.json())
  return response
}

export default {
  sendMessage
}