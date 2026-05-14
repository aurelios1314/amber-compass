const sources = [
  { name: 'China95 (元亨利贞)', url: 'http://pp.china95.net/' },
  { name: 'Yibaicha (易百查)', url: 'http://www.yibaicha.com/bazi/' },
  { name: 'Yiyunpan (易运盘)', url: 'http://www.yiyunpan.com/bazi.asp' },
  { name: 'Zhimishuanming (指迷算命)', url: 'https://www.zhimishuanming.com/bazi/' }
];

async function probe() {
  console.log('=== External BaZi Source Probing ===\n');
  for (const src of sources) {
    console.log(`Probing ${src.name} (${src.url})...`);
    try {
      const resp = await fetch(src.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
        signal: AbortSignal.timeout(10000)
      });
      const html = await resp.text();
      const formCount = (html.match(/<form/gi) || []).length;
      console.log(`  - Status: ${resp.status}`);
      console.log(`  - Forms found: ${formCount}`);
      
      // Extract form fields if found
      if (formCount > 0) {
        const firstForm = html.match(/<form[\s\S]*?<\/form>/i)?.[0] || '';
        const action = firstForm.match(/action=["'](.*?)["']/i)?.[1] || 'current_page';
        const method = firstForm.match(/method=["'](.*?)["']/i)?.[1] || 'GET';
        const inputs = Array.from(firstForm.matchAll(/name=["'](.*?)["']/gi)).map(m => m[1]);
        
        console.log(`  - Action: ${action}`);
        console.log(`  - Method: ${method}`);
        console.log(`  - Input Fields: ${[...new Set(inputs)].join(', ')}`);
      }
    } catch (e) {
      console.log(`  - Error: ${e.message}`);
    }
    console.log('');
  }
}

probe();
