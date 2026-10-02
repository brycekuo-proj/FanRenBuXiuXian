const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const C = require('../data/runtime/continuity.js');
const store = () => {
  const map = new Map();
  return {getItem: k => map.has(k) ? map.get(k) : null,
    setItem: (k,v) => map.set(k,String(v)),
    removeItem: k => map.delete(k)};
};
test('存檔與閱讀偏好往返；損壞存檔不能讓遊戲崩潰', () => {
  const s = store(), m = C.freshMeta(), current = {sceneKey:'intro',state:{coins:3},run:{rngState:123},fate:C.newFate(123)};
  assert.equal(C.save(s,m,current),true);
  assert.equal(C.load(s).current.run.rngState,123);
  C.saveSettings(s,{font:'large',speed:'fast'});
  assert.deepEqual(C.readSettings(s), {font:'large',speed:'fast'});
  s.setItem(C.KEY, '{broken');
  assert.equal(C.load(s),null);
  assert.equal(C.save({setItem(){throw Error('blocked');}},m,current),false);
});
test('死亡情報去重並紀錄命簿；一次終局只呼叫一次記錄', () => {
  const death = {title:'山瘴', bookChapter:1, intel:'春末山霧貼地時要注意氣味與風向。',death:{epitaph:'他記得山霧，山霧不記得他。'}};
  let m = C.recordMemory(C.freshMeta(),'mist_death',death);
  assert.equal(m.deaths,1);
  m = C.recordMemory(m,'mist_death',death);
  assert.equal(m.memories.length,1);
  assert.equal(m.history.length,2);
  assert.equal(m.memories[0].clue.includes('選 A'),false);
});
test('不可透過 clamp 免費花不存在的貨幣', () => {
  const state={coins:0, spiritStone:1, merit:0, intel:20};
  assert.equal(C.costProblem({coinDelta:-1},state),'銅錢不足');
  assert.equal(C.costProblem({spiritStoneDelta:-2},state),'靈石不足');
  assert.equal(C.costProblem({meritDelta:-1},state),''); // 事件扣功不是購買成本
  assert.equal(C.costProblem({requires:{intel:21}},state),'條件不足');
  assert.equal(C.costProblem({qiDelta:-15, spiritStoneDelta:-1},state),'');
  assert.equal(C.costProblem({spiritStoneDelta:-1},state),'');
});
test('命線亂數可重現；權重0不會被當作1', () => {
  const a={rngState:0x11223344,drawCount:0},b={rngState:0x11223344,drawCount:0};
  const choices=[{next:'invalid',weight:0},{next:'true',weight:1}];
  for (let i=0;i<100;i++) assert.equal(C.chooseWeighted(choices,a),C.chooseWeighted(choices,b));
  assert.equal(a.drawCount,100);
  assert.equal(C.chooseWeighted(choices,{rngState:9}),'true');
  assert.equal(C.chooseWeighted([{next:'none',weight:0}],{rngState:9}),null);
  assert.deepEqual(C.newFate(1234),C.newFate(1234));
});
test('NPC 個人命簿限制 ID 並保留最新狀態', () => {
  const initial=C.recordNpc({}, {id:'he',status:'同行',note:'有債',chapter:5});
  const later=C.recordNpc(initial,{id:'he',status:'死亡',note:'殘壁',chapter:5});
  assert.equal(initial.he.status,'同行');
  assert.equal(later.he.status,'死亡');
  assert.equal(C.recordNpc(later,{id:'unknown',status:'死亡'}),later);
});
test('五章所有指向存在；NPC死亡不被判作主角死亡', () => {
  const context=vm.createContext({window:{}});
  for (const ch of [2,3,4,5]) vm.runInContext(fs.readFileSync(path.join(ROOT,'data/runtime','chapter'+ch+'_scenes.js'),'utf8'),context);
  const html=fs.readFileSync(path.join(ROOT,'fanren.html'),'utf8');
  const begin=html.indexOf('      const SCENES = {');
  const end=html.indexOf('\n      Object.assign(SCENES,',begin);
  assert.ok(begin>=0&&end>begin);
  vm.runInContext(html.slice(begin,end).replace('const SCENES =','globalThis.SCENES ='),context);
  const scenes={...context.SCENES, ...context.window.CHAPTER2_SCENES,...context.window.CHAPTER3_SCENES,...context.window.CHAPTER4_SCENES,...context.window.CHAPTER5_SCENES};
  let edges=0;
  const missing=[];
  for (const [key, scene] of Object.entries(scenes)) {
    let targets=[];
    for (const c of scene.choices||[]) {
      targets.push(c.next,...(c.nextPool||[]).map(x=>x.next),...(c.nextByState||[]).map(x=>x.next));
    }
    targets.push(scene.autoNext,scene.autoFailNext,scene.continueTo,...(scene.randomNexts||[]).map(x=>x.next));
    for(const target of targets.filter(Boolean)){
      if (!scenes[target]) missing.push(key+' -> '+target);
      edges++;
    }
  }
  assert.deepEqual(missing,[], 'missing scene destinations');
  assert.notEqual(scenes.ch5_cave_bells_bad.type,'death');
  assert.notEqual(scenes.ch5_lead_bridge_volunteer_death.type,'death');
  assert.equal(scenes.ch5_cave_he_dead.type,undefined);
  assert.ok(Object.keys(scenes).length>400);
  console.log('scene graph: '+Object.keys(scenes).length+' scenes, '+edges+' directed edges');
});
test('主程式含保存前判斷／終局去重／刷新續玩／工程模式隔離', () => {
  const src=fs.readFileSync(path.join(ROOT,'fanren.html'),'utf8');
  assert.match(src,/if \(!meetsRequirements\(choice\)\) return;/);
  assert.match(src,/if \(terminalRecorded !== sceneKey\)/);
  assert.match(src,/const oldSave = isDevMode \? null : C\.load\(storage\)/);
  assert.match(src,/if \(isDevMode\) return;\s*const ok = C\.save/);
  assert.match(src,/restart\(\); go\(isDevMode/);
  const marker='<script>\n    (() => {';
  const begin=src.indexOf(marker);
  assert.ok(begin>=0);
  const inline=src.slice(begin+8,src.indexOf('  </script>',begin));
  new vm.Script(inline);
});
