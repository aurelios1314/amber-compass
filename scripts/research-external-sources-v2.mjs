const endpoints = [
  { name: 'China95-P', url: 'http://pp.china95.net/paipan.asp' },
  { name: 'Yiyunpan-P', url: 'http://www.yiyunpan.com/bazi.asp' },
  { name: 'Yibaicha-P', url: 'http://www.yibaicha.com/bazi/' },
  { name: 'Zhimishuanming-P', url: 'https://www.zhimishuanming.com/bazi/' }
];

async function probe() {
  console.log('=== External BaZi Source Probing V2 ===\n');
  for (const ep of endpoints) {
    console.log(`Probing ${ep.name} (${ep.url})...`);
    try {
      const resp = await fetch(ep.url, {
        method: 'GET',
        headers: { 
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9'
        },
        signal: AbortSignal.timeout(15000)
      });
      console.log(`  - Status: ${resp.status}`);
      const text = await resp.text();
      const length = text.length;
      console.log(`  - Content Length: ${length}`);
      
      // Look for inputs
      const inputs = text.match(/name=["'](year|month|day|hour|sex|gender|min|year_n|month_n|day_n|hour_n|nian|yue|ri|shi)["']/gi);
      if (inputs) {
        console.log(`  - Potential Parameters: ${[...new Set(inputs.map(i => i.split('"')[1]))].join(', ')}`);
      }
      
      if (text.includes('action')) {
        const action = text.match(/action=["'](.*?)["']/i)?.[1];
        console.log(`  - Action found: ${action}`);
      }
    } catch (e) {
      console.log(`  - Error: ${e.message}`);
    }
    console.log('');
  }
}

probe();
