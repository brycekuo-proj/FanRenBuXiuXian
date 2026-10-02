#!/usr/bin/env python3
"""真實 Chromium 瀏覽器煙霧測試，不能取代真人閱讀。"""
import json
from playwright.sync_api import sync_playwright
BASE='http://127.0.0.1:28765/fanren.html'
with sync_playwright() as p:
    browser=None
    for channel in ('chrome','chromium'):
        try:
            browser=p.chromium.launch(channel=channel,headless=True)
            break
        except Exception:
            pass
    if not browser: browser=p.chromium.launch(headless=True)
    page=browser.new_page(viewport={'width':390,'height':844})
    errors=[]
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.goto(BASE,wait_until='domcontentloaded')
    page.locator('#skipTextBtn').click()
    page.locator('[data-choice-index="0"]').wait_for(timeout=7000)
    snap=lambda: json.loads(page.evaluate("localStorage.getItem('fanren.continuity.v1')"))
    assert snap()['current']['sceneKey']=='intro'
    page.locator('[data-font-size="large"]').click()
    page.locator('[data-reading-speed="fast"]').click()
    page.reload(wait_until='domcontentloaded')
    assert page.locator('#gameRoot').evaluate("(el)=>el.classList.contains('font-large')")
    assert page.locator('[data-reading-speed="fast"]').get_attribute('aria-pressed')=='true'
    page.evaluate("""() => {let s=JSON.parse(localStorage.getItem('fanren.continuity.v1'));
      s.current.sceneKey='sect_stairs_death';s.current.terminalRecorded=null;s.current.pendingAuto=null;s.current.state.coins=0;
      localStorage.setItem('fanren.continuity.v1',JSON.stringify(s));}""")
    page.reload(wait_until='domcontentloaded')
    page.locator('.tombstone').wait_for(timeout=7000)
    assert snap()['meta']['deaths']==1
    page.reload(wait_until='domcontentloaded')
    assert snap()['meta']['deaths']==1 and len(snap()['meta']['history'])==1
    page.locator('#chapterBtn').click()
    assert snap()['current']['sceneKey']=='start_choice' and snap()['current']['state']['coins']==3
    assert snap()['meta']['incarnations']==2 and snap()['meta']['deaths']==1
    page.evaluate("""() => {let s=JSON.parse(localStorage.getItem('fanren.continuity.v1'));
      s.current.sceneKey='sect_arrive_poor';s.current.state.coins=0;
      localStorage.setItem('fanren.continuity.v1',JSON.stringify(s));}""")
    page.reload(wait_until='domcontentloaded')
    page.locator('#skipTextBtn').click()
    button=page.get_by_role('button',name='把最後銅錢買饅頭，先活過今天')
    button.wait_for(timeout=7000)
    assert button.is_disabled()
    before=page.evaluate("localStorage.getItem('fanren.continuity.v1')")
    page.goto(BASE+'?dev=1&chapter=5',wait_until='domcontentloaded')
    assert '第五章' in page.locator('#gameTitleBar').inner_text()
    assert page.evaluate("localStorage.getItem('fanren.continuity.v1')")==before
    assert not errors,errors
    print('BROWSER PASS: reload, reader settings, death once, restart, coin gate, dev isolation; 0 page errors')
    browser.close()
