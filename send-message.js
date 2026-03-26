const WebSocket = require('D:\\nvm\\nvm\\v22.22.0\\node_modules\\openclaw\\node_modules\\ws');

const ws = new WebSocket('ws://127.0.0.1:18789');

ws.on('open', function open() {
  console.log('Connected to gateway');
  
  // Try to send a message
  const msg = {
    jsonrpc: '2.0',
    id: 1,
    method: 'message.send',
    params: {
      channel: 'feishu',
      account: 'news_feishu',
      target: 'oc_52e66d5d1517744074949f1f1ca8f49f',
      message: '📰 晚间新闻速递 | 2026年3月25日\n\n🤖 AI大模型动态\n\n1. Anthropic推出Claude Code自动模式\nAnthropic今日宣布在Claude Code中推出全新的自动模式权限管理功能，为开发者提供介于默认保守配置与完全跳过权限之间的中间方案。\n\n2. OpenAI升级ChatGPT购物体验\nOpenAI正式推出ChatGPT全新购物功能，用户可直观浏览商品、进行并排参数对比。\n\n3. 快手可灵AI ARR已超3亿美元\n快手科技创始人程一笑透露，可灵AI的年化收入运行率已超过3亿美元。\n\n💻 科技行业热点\n\n1. 拼多多官宣新拼姆方案\n拼多多集团正式宣布组建新拼姆，未来三年投入1000亿元现金。\n\n2. 腾讯元宝派桌面版正式发布\n开启人+AI多人协同办公新范式。\n\n新闻来源：36氪、品玩'
    }
  };
  
  ws.send(JSON.stringify(msg));
  console.log('Sent message request');
});

ws.on('message', function message(data) {
  console.log('Received:', data.toString());
  ws.close();
});

ws.on('error', function error(err) {
  console.error('WebSocket error:', err);
});
