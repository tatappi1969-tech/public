// ==========================================
// 🛡️ 島防衛シミュレーション（feature_defense.js）完全版
// ==========================================

window.DEFENSE_CONFIG = {
    maxDeploy: 5, triggerChance: 0.3,
    baseSpeed: { 'robot': 3, 'ghost': 4, 'balloon': 2, 'stone': 2, 'machine': 4, 'bird': 5, 'dragon': 3, 'seed': 2, 'magician': 3, 'spirit': 4, 'beetle': 2 },
    facilities: {
        'castle': { name: '王城', maxHp: 2000, rebuildCost: 50000, effect: 'def_up', desc: '防御力大アップ' },
        'house': { name: '農家', maxHp: 500, rebuildCost: 2000, effect: 'heal_10', desc: '毎ターンHP10%回復' },
        'restaurant': { name: 'レストラン', maxHp: 600, rebuildCost: 5000, effect: 'heal_20', desc: '毎ターンHP20%回復' },
        'smith': { name: '鍛冶屋', maxHp: 800, rebuildCost: 8000, effect: 'atk_up', desc: '攻撃力アップ' },
        'casino': { name: 'カジノ', maxHp: 1000, rebuildCost: 30000, effect: 'money_up', desc: '戦闘報酬アップ' },
        'shop': { name: 'ショップ', maxHp: 600, rebuildCost: 4000 },
        'farm': { name: '畑', maxHp: 300, rebuildCost: 1000 },
        'bridge': { name: '橋', maxHp: 400, rebuildCost: 1500 }
    }
};

window.DEFENSE_SKILL_DB = {
    'robot': [ { req: 0, name: 'アイアンナックル', type: 'melee', power: 1.2, range: 1, effect: 'impact' }, { req: 40, name: 'ロケットパンチ', type: 'shoot', power: 1.5, range: 2, effect: 'beam' }, { req: 100, name: '殲滅レーザー', type: 'shoot', power: 2.5, range: 4, effect: 'beam' } ],
    'spirit': [ { req: 0, name: '精霊の光', type: 'shoot', power: 1.1, range: 2, effect: 'beam' }, { req: 50, name: 'ホーリーレイ', type: 'shoot', power: 1.6, range: 3, effect: 'beam' }, { req: 120, name: 'スターダスト', type: 'shoot', power: 2.8, range: 4, effect: 'explosion' } ],
    'bird': [ { req: 0, name: 'つつく', type: 'melee', power: 1.2, range: 1, effect: 'slash' }, { req: 40, name: 'ウィンドカッター', type: 'shoot', power: 1.4, range: 3, effect: 'slash' }, { req: 100, name: 'トルネード', type: 'shoot', power: 2.2, range: 3, effect: 'explosion' } ],
    'dragon': [ { req: 0, name: 'かみつく', type: 'melee', power: 1.3, range: 1, effect: 'slash' }, { req: 60, name: 'ファイアブレス', type: 'shoot', power: 1.8, range: 3, effect: 'explosion' }, { req: 150, name: 'メテオストライク', type: 'shoot', power: 3.0, range: 5, effect: 'explosion' } ],
    'ghost': [ { req: 0, name: 'おどかす', type: 'melee', power: 1.1, range: 1, effect: 'impact' }, { req: 40, name: 'ポルターガイスト', type: 'shoot', power: 1.5, range: 3, effect: 'explosion' }, { req: 100, name: 'カオティックフレア', type: 'shoot', power: 2.5, range: 4, effect: 'beam' } ],
    'default': [ { req: 0, name: 'たいあたり', type: 'melee', power: 1.1, range: 1, effect: 'impact' }, { req: 50, name: '気合弾', type: 'shoot', power: 1.5, range: 2, effect: 'beam' } ]
};

window.DEFENSE_STATE = { 
    isActive: false, isEmergency: false, emergencyTimer: null, 
    deployedParty: [], enemies: [], facilities: [], turn: 1, autoMode: false, animMode: true, activeUnit: null, 
    moveHighlights: [], attackHighlights: [],
    waveConfig: { totalToSpawn: 0, spawnedSoFar: 0, turnsUntilNextSpawn: 0 },
    mode: 'normal', mockTarget: null
};

if (typeof window.wait === 'undefined') window.wait = ms => new Promise(r => setTimeout(r, ms));

window.getGridPixelPos = function(gx, gy) {
    if (typeof gx !== 'number' || isNaN(gx)) gx = 10;
    if (typeof gy !== 'number' || isNaN(gy)) gy = 6;
    let currentAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
    let castle = Object.values(currentAssets).find(a => a && a.type === 'castle');
    let cdx = 400, cdy = 240; 
    if (castle) {
        let sc = castle.scale !== undefined ? castle.scale : 0.5;
        cdx = castle.dx + (castle.sw * sc) / 2; cdy = castle.dy + (castle.sh * sc) / 2 + 20; 
    }
    let cGx = 10; let cGy = 6;
    let diffGx = gx - cGx; let diffGy = gy - cGy;
    let px = cdx + (diffGx * 50); let py = cdy + (diffGy * 25);
    let castleOdd = (cGy % 2 !== 0); let targetOdd = (gy % 2 !== 0);
    if (!castleOdd && targetOdd) px += 25; if (castleOdd && !targetOdd) px -= 25;
    return { x: px, y: py };
};

window.isTerrainPassable = function(gx, gy) {
    let currentAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
    let isLand = false; let isWater = false;
    Object.values(currentAssets).forEach(a => {
        if (a && a.gridX === gx && a.gridY === gy) {
            if (['water', 'sea', 'river', 'water3'].includes(a.type)) isWater = true;
            else if (['ground', 'road', 'bridge', 'farm', 'castle', 'house', 'restaurant', 'smith', 'shop', 'casino'].includes(a.type)) isLand = true;
        }
    });
    if (isWater && !isLand) return false; 
    if (isLand) return true; 
    return false; 
};

window.getValidLandGrids = function() {
    let currentAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
    let grids = []; let gridSet = new Set();
    Object.values(currentAssets).forEach(a => {
        if (a && ['ground', 'road', 'bridge', 'farm'].includes(a.type)) {
            let gx = a.gridX; let gy = a.gridY;
            if (gx !== undefined && gy !== undefined) {
                let key = gx + ',' + gy;
                if (!gridSet.has(key) && window.isTerrainPassable(gx, gy)) { gridSet.add(key); grids.push({x: gx, y: gy}); }
            }
        }
    });
    if (grids.length === 0) grids.push({x: 10, y: 6}); 
    return grids;
};

window.isGridOccupied = function(gx, gy) {
    if (window.DEFENSE_STATE.castleGrid && gx === window.DEFENSE_STATE.castleGrid.x && gy === window.DEFENSE_STATE.castleGrid.y) return true; 
    let p = window.DEFENSE_STATE.deployedParty.some(u => u.gridX === gx && u.gridY === gy && u.hp > 0);
    let e = window.DEFENSE_STATE.enemies.some(u => u.gridX === gx && u.gridY === gy && u.hp > 0);
    let f = window.DEFENSE_STATE.facilities.some(fac => fac.gridX === gx && fac.gridY === gy && fac.hp > 0);
    return p || e || f;
};

window.getMovableGrids = function(unit) {
    let speed = Math.min(unit.speed, 8); let cx = unit.gridX; let cy = unit.gridY; let grids = [];
    for (let x = cx - speed; x <= cx + speed; x++) {
        for (let y = cy - speed; y <= cy + speed; y++) {
            let dist = Math.abs(x - cx) + Math.abs(y - cy); if (dist > speed) continue; 
            if (!window.isTerrainPassable(x, y)) continue; 
            if (window.isGridOccupied(x, y) && (x !== cx || y !== cy)) continue; 
            grids.push({x, y});
        }
    }
    return grids;
};

window.getAttackableGrids = function(unit) {
    let cx = unit.gridX; let cy = unit.gridY; let maxRange = unit.maxRange || 1; let grids = [];
    for (let x = cx - maxRange; x <= cx + maxRange; x++) {
        for (let y = cy - maxRange; y <= cy + maxRange; y++) {
            let dist = Math.abs(x - cx) + Math.abs(y - cy); if (dist > maxRange || dist === 0) continue; 
            grids.push({x, y});
        }
    }
    return grids;
};

window.calculateSRPGPath = function(unit, targetX, targetY) {
    let speed = Math.min(unit.speed, 8); let curX = unit.gridX; let curY = unit.gridY; let bestX = curX; let bestY = curY;
    let minDist = Math.abs(curX - targetX) + Math.abs(curY - targetY);
    for (let x = curX - speed; x <= curX + speed; x++) {
        for (let y = curY - speed; y <= curY + speed; y++) {
            let dist = Math.abs(x - curX) + Math.abs(y - curY); if (dist > speed) continue; 
            if (!window.isTerrainPassable(x, y)) continue; 
            if (window.isGridOccupied(x, y)) continue; 
            
            let tDist = Math.abs(x - targetX) + Math.abs(y - targetY);
            if (tDist < minDist) { minDist = tDist; bestX = x; bestY = y; }
        }
    }
    if (Math.abs(curX - targetX) + Math.abs(curY - targetY) <= unit.maxRange) return {x: curX, y: curY};
    if (window.DEFENSE_STATE.castleGrid && targetX === window.DEFENSE_STATE.castleGrid.x && targetY === window.DEFENSE_STATE.castleGrid.y) {
        if (Math.abs(curX - targetX) + Math.abs(curY - targetY) <= unit.maxRange) return {x: curX, y: curY};
        if (bestX === targetX && bestY === targetY) {
            bestX = (curX < targetX) ? targetX - 1 : (curX > targetX) ? targetX + 1 : targetX;
            bestY = (curY < targetY) ? targetY - 1 : (curY > targetY) ? targetY + 1 : targetY;
        }
    }
    return {x: bestX, y: bestY};
};

window.showDefenseMessage = async function(text, color) {
    let msg = document.createElement('div');
    msg.style.cssText = `position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); font-size:48px; font-weight:bold; color:${color}; text-shadow: 0 4px 10px rgba(0,0,0,0.8), 0 0 20px ${color}, 0 0 40px ${color}; z-index:60000; opacity:0; transition:opacity 0.2s; pointer-events:none; white-space:nowrap; font-family:sans-serif; letter-spacing:4px;`;
    msg.innerText = text; document.body.appendChild(msg);
    requestAnimationFrame(() => msg.style.opacity = '1'); await window.wait(1500); msg.style.opacity = '0'; await window.wait(300); msg.remove();
};

window.startDefenseMonitor = function() {
    setInterval(() => {
        if (window.DEFENSE_STATE.isActive || window.DEFENSE_STATE.isEmergency) return;
        let currentAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
        let hasCastle = Object.values(currentAssets).some(a => a && a.type === 'castle');
        if (hasCastle && Math.random() < window.DEFENSE_CONFIG.triggerChance) window.triggerEmergency();
    }, 60000); 
};

window.triggerEmergency = function() {
    if (window.DEFENSE_STATE.isEmergency) return;
    window.DEFENSE_STATE.isEmergency = true;
    
    let marquee = document.getElementById('emergency-marquee');
    if (!marquee) {
        marquee = document.createElement('div'); marquee.id = 'emergency-marquee';
        marquee.style.cssText = `position:fixed; top:60px; left:0; width:100vw; background:rgba(255,0,0,0.85); color:white; font-size:24px; font-weight:bold; padding:10px 0; z-index:40000; overflow:hidden; white-space:nowrap; border-top:2px solid #FFEB3B; border-bottom:2px solid #FFEB3B; box-shadow:0 0 20px red; pointer-events:none;`;
        let style = document.createElement('style'); style.innerHTML = `@keyframes alert-marquee { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }`;
        document.head.appendChild(style); document.body.appendChild(marquee);
    }
    marquee.innerHTML = `<div style="display:inline-block; padding-left:20px; animation:alert-marquee 12s linear infinite;">🚨 【緊急防衛クエスト】島に魔物が接近中！「王城」へ向かい迎撃せよ！！（放置すると施設が破壊されます） 🚨</div>`;
    marquee.style.display = 'block';

    window.DEFENSE_STATE.facilities = [];
    let currentAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
    let castleAsset = Object.values(currentAssets).find(a => a && a.type === 'castle');
    let cx = 10; let cy = 6; 

    Object.values(currentAssets).forEach(a => {
        if (a) {
            if (a === castleAsset) { a.gridX = cx; a.gridY = cy; } 
            else if (castleAsset) {
                let diffPx = a.dx - castleAsset.dx; let diffPy = a.dy - castleAsset.dy;
                let dGy = Math.round(diffPy / 25); let oddOffset = (dGy % 2 !== 0) ? 25 : 0;
                let dGx = Math.round((diffPx - oddOffset) / 50);
                a.gridX = cx + dGx; a.gridY = cy + dGy;
            }
        }
    });

    Object.keys(currentAssets).forEach(key => {
        let a = currentAssets[key];
        let validTypes = Object.keys(window.DEFENSE_CONFIG.facilities);
        if (a && validTypes.includes(a.type)) {
            let conf = window.DEFENSE_CONFIG.facilities[a.type];
            window.DEFENSE_STATE.facilities.push({ id: key, type: a.type, name: conf.name, team: 'facility', gridX: a.gridX, gridY: a.gridY, hp: conf.maxHp, maxHp: conf.maxHp });
        }
    });

    if (window.DEFENSE_STATE.emergencyTimer) clearInterval(window.DEFENSE_STATE.emergencyTimer);
    
    window.DEFENSE_STATE.emergencyTimer = setInterval(() => {
        if (window.DEFENSE_STATE.isEmergency && !window.DEFENSE_STATE.isActive) {
            let targetFac = window.DEFENSE_STATE.facilities.find(f => f.hp > 0 && f.type !== 'castle'); 
            if (!targetFac) targetFac = window.DEFENSE_STATE.facilities.find(f => f.hp > 0);
            
            if (targetFac) {
                targetFac.hp -= 50; 
                if (typeof floatingTexts !== 'undefined') {
                    let pos = window.getGridPixelPos(targetFac.gridX, targetFac.gridY);
                    floatingTexts.push({ text: `-50`, x: pos.x, y: pos.y - 50, color: "#ff5252", life: 60, dy: -1 });
                }
                
                if (targetFac.hp <= 0) {
                    if (targetFac.type === 'castle') {
                        clearInterval(window.DEFENSE_STATE.emergencyTimer);
                        marquee.style.display = 'none'; window.DEFENSE_STATE.isEmergency = false;
                        alert("防衛を放置したため、王城が陥落してしまいました..."); window.executeAbandon(); 
                    } else {
                        let delAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
                        if (delAssets[targetFac.id]) delete delAssets[targetFac.id];
                    }
                }
            }
        }
    }, 30000); 
};

if (typeof window.originalOpenArenaReception === 'undefined') {
    window.originalOpenArenaReception = window.openArenaReception;
}
window.openArenaReception = function() {
    if (window.DEFENSE_STATE.isActive) return; 

    let currentWave = window.aiPet.defenseWave || 1;
    let isEndlessUnlocked = currentWave > 10;
    let isEmergency = window.DEFENSE_STATE.isEmergency;

    let arenaHtml = `<button onclick="this.parentElement.parentElement.remove(); window.originalOpenArenaReception();" style="padding:15px; font-size:20px; font-weight:bold; background:#1976D2; color:white; border:3px solid #2196F3; border-radius:8px; cursor:pointer; width:100%; margin-bottom:15px;">⚔️ 闘技場（アリーナ）</button>`;

    let emergencyHtml = isEmergency ?
        `<button onclick="this.parentElement.parentElement.remove(); window.openDefenseSortieUI('normal');" style="padding:15px; font-size:20px; font-weight:bold; background:#b71c1c; color:white; border:3px solid #ff5252; border-radius:8px; cursor:pointer; box-shadow: 0 0 15px rgba(255,0,0,0.5); width:100%; margin-bottom:15px;">🚨 緊急防衛クエストに出撃</button>` :
        `<div style="padding:15px; font-size:18px; color:#888; background:#222; border:2px dashed #444; border-radius:8px; text-align:center; margin-bottom:15px;">現在、島の平和は保たれています</div>`;

    let endlessHtml = isEndlessUnlocked ?
        `<button onclick="this.parentElement.parentElement.remove(); window.openDefenseSortieUI('endless');" style="padding:15px; font-size:20px; font-weight:bold; background:#4A148C; color:white; border:3px solid #E040FB; border-radius:8px; cursor:pointer; box-shadow: 0 0 15px rgba(224,64,251,0.5); width:100%; margin-bottom:15px;">♾️ エンドレス防衛戦（限界突破）</button>` :
        `<div style="padding:15px; font-size:16px; color:#555; background:#111; border:2px solid #333; border-radius:8px; text-align:center; margin-bottom:15px;">🔒 エンドレス防衛戦（WAVE10クリアで解放）</div>`;

    let choiceUi = document.createElement('div');
    choiceUi.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9); z-index: 55000; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; font-family: sans-serif;`;
    choiceUi.innerHTML = `
        <div style="background:#1a1a1a; border:4px solid #FFD700; border-radius:12px; padding:30px; width:80%; max-width:500px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
            <h2 style="color:#FFD700; font-size:32px; margin-top:0; margin-bottom:25px; border-bottom:2px solid #444; padding-bottom:10px;">🏰 王城 総合受付</h2>
            ${arenaHtml}
            ${emergencyHtml}
            ${endlessHtml}
            <button onclick="this.parentElement.parentElement.remove(); document.getElementById('dungeon-ranking-ui').classList.add('active'); window.switchRankingCategory('defense');" style="padding:15px; font-size:18px; font-weight:bold; background:#004D40; color:#fff; border:2px solid #00695C; border-radius:8px; cursor:pointer; width:100%; margin-bottom:20px;">👥 フレンド模擬戦（ランキングから選択）</button>
            <button onclick="this.parentElement.parentElement.remove();" style="padding:12px; font-size:16px; background:#444; color:white; border:2px solid #777; border-radius:8px; cursor:pointer; width:100%;">退出する</button>
        </div>
    `;
    document.body.appendChild(choiceUi);
};

window.assignSkillsToUnit = function(unit, pwr, int) {
    let statTotal = pwr + int; let skinBase = unit.skin ? unit.skin.split('_')[0] : 'robot';
    let skillList = window.DEFENSE_SKILL_DB[skinBase] || window.DEFENSE_SKILL_DB['default'];
    unit.skills = skillList.filter(s => statTotal >= s.req);
    if (unit.skills.length === 0) unit.skills = [window.DEFENSE_SKILL_DB['default'][0]]; 
    unit.maxRange = Math.max(...unit.skills.map(s => s.range));
    unit.minRange = Math.min(...unit.skills.map(s => s.range)); 
};

window.startMockBattlePrep = function(index) {
    let targetData = window.arenaRankDataCache ? window.arenaRankDataCache[index] : null;
    if (!targetData) return;
    
    let rankingUi = document.getElementById('dungeon-ranking-ui');
    if (rankingUi) rankingUi.classList.remove('active');
    
    window.DEFENSE_STATE.mockTarget = targetData;
    window.openDefenseSortieUI('mock');
};

window.openDefenseSortieUI = function(mode) {
    window.DEFENSE_STATE.nextMode = mode || 'normal';
    
    let ui = document.getElementById('defense-sortie-ui');
    if (!ui) {
        ui = document.createElement('div'); ui.id = 'defense-sortie-ui';
        ui.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(20,10,10,0.95); z-index: 60000; display: flex; flex-direction: column; align-items: center; color: white; font-family: sans-serif; overflow-y: auto;`;
        document.body.appendChild(ui);
    }
    
    // ★ 修正：出撃メンバー（meとpast）に元ステータスの `pwr` を持たせておく！
    let pwr = Math.floor(window.aiPet.stats.power || 10); let int = Math.floor(window.aiPet.stats.intel || 10);
    let baseSpd = window.DEFENSE_CONFIG.baseSpeed[window.aiPet.currentSkin ? window.aiPet.currentSkin.split('_')[0] : 'robot'] || 3;
    
    let currentAI = {
        id: "me", name: window.aiPet.name || "現在のAI", skin: window.aiPet.currentSkin || 'robot',
        hp: Math.floor(100 + (pwr * 2)), maxHp: Math.floor(100 + (pwr * 2)),
        atk: Math.floor(10 + pwr * 0.5), def: Math.floor(5 + pwr * 0.2), intel: int, pwr: pwr, speed: Math.floor(baseSpd + (pwr * 0.1) + (int * 0.1)), isMe: true
    };
    window.assignSkillsToUnit(currentAI, pwr, int);

    let availableAIs = [];
    let discovered = (window.aiPet && window.aiPet.discoveredMonsters) ? window.aiPet.discoveredMonsters : [];
    let savedStats = (window.aiPet && window.aiPet.savedGrazeStats) ? window.aiPet.savedGrazeStats : {};
    let pastId = 0;
    
    discovered.forEach(skinKey => {
        if (skinKey === window.aiPet.currentSkin) return;
        let sName = (typeof monsterBookData !== 'undefined' && monsterBookData[skinKey]) ? monsterBookData[skinKey].name : skinKey;
        let sPwr = 10; let sInt = 10;
        if (savedStats[skinKey] && savedStats[skinKey].stats) { sPwr = Math.floor(savedStats[skinKey].stats.power || sPwr); sInt = Math.floor(savedStats[skinKey].stats.intel || sInt); }
        let bSpd = window.DEFENSE_CONFIG.baseSpeed[skinKey.split('_')[0]] || 3;

        let pastAI = {
            id: "past_" + pastId++, name: `${sName}`, skin: skinKey, 
            hp: Math.floor(80 + sPwr * 2), maxHp: Math.floor(80 + sPwr * 2),
            atk: Math.floor(8 + sPwr * 0.4), def: 5, intel: sInt, pwr: sPwr, speed: Math.floor(bSpd + (sPwr * 0.1) + (sInt * 0.1)), isMe: false
        };
        window.assignSkillsToUnit(pastAI, sPwr, sInt); availableAIs.push(pastAI);
    });

    window.DEFENSE_STATE.preDeployed = [currentAI]; window.DEFENSE_STATE.availableRoster = availableAIs;
    window.renderDefenseSortieUI();
};

window.renderDefenseSortieUI = function() {
    let ui = document.getElementById('defense-sortie-ui'); if (!ui) return;
    let max = window.DEFENSE_CONFIG.maxDeploy; let party = window.DEFENSE_STATE.preDeployed; let roster = window.DEFENSE_STATE.availableRoster;
    
    let isEndless = window.DEFENSE_STATE.nextMode === 'endless';
    let isMock = window.DEFENSE_STATE.nextMode === 'mock';

    let partyHtml = party.map((p, index) => `
        <div onclick="window.removeDefenseMember(${index})" style="background:#222; border:2px solid ${p.isMe ? '#4CAF50' : '#E040FB'}; border-radius:8px; padding:10px; width:160px; text-align:center; cursor:${p.isMe ? 'default' : 'pointer'}; position:relative;">
            <div style="font-size:14px; color:${p.isMe ? '#4CAF50' : '#E040FB'}; font-weight:bold;">${p.name}</div>
            <div style="font-size:12px; color:#ddd; margin-top:4px;">HP: ${p.hp} / ${p.maxHp}</div>
            <div style="font-size:11px; color:#aaa; margin-top:2px;">移動: ${p.speed} | 射程: ${p.minRange}～${p.maxRange}</div>
            <button onclick="event.stopPropagation(); window.showDefenseUnitDetails('party', ${index})" style="margin-top:8px; padding:4px 10px; font-size:11px; background:#333; border:1px solid #777; color:white; border-radius:4px; cursor:pointer; width:100%;">📊 詳細を見る</button>
            ${!p.isMe ? `<div style="position:absolute; top:-10px; right:-10px; background:red; color:white; border-radius:50%; width:22px; height:22px; font-weight:bold; line-height:22px; box-shadow:0 2px 5px rgba(0,0,0,0.5);">×</div>` : ''}
        </div>
    `).join('');
    for(let i = party.length; i < max; i++) partyHtml += `<div style="background:#111; border:2px dashed #555; border-radius:8px; padding:10px; width:160px; display:flex; align-items:center; justify-content:center; color:#555; font-size:14px; font-weight:bold;">出撃枠 ${i+1}</div>`;

    let rosterHtml = roster.length > 0 ? roster.map((p, index) => `
        <div onclick="window.addDefenseMember(${index})" style="background:#1a1a1a; border:1px solid #444; border-radius:8px; padding:10px; width:150px; text-align:center; cursor:pointer; position:relative;">
            <div style="font-size:12px; color:#fff; font-weight:bold;">${p.name}</div>
            <div style="font-size:11px; color:#aaa; margin-top:4px;">HP: ${p.hp}</div>
            <div style="font-size:10px; color:#888; margin-top:2px;">移動: ${p.speed} | 射程: ${p.minRange}～${p.maxRange}</div>
            <button onclick="event.stopPropagation(); window.showDefenseUnitDetails('roster', ${index})" style="margin-top:8px; padding:4px 10px; font-size:11px; background:#333; border:1px solid #555; color:#ddd; border-radius:4px; cursor:pointer; width:100%;">📊 詳細</button>
            <div style="font-size:11px; color:#FF9800; margin-top:6px; font-weight:bold;">+ 迎撃部隊へ</div>
        </div>
    `).join('') : `<div style="color:#888; width:100%; text-align:center; padding-top:20px;">出撃可能な過去の戦力がいません</div>`;

    let currentWave = window.aiPet.defenseWave || 1;
    let totalE = Math.min(3 + currentWave * 2, 15);
    let bestRecord = window.aiPet.bestEndlessWave || 0;
    
    let headerInfo = '';
    if (isEndless) {
        headerInfo = `<h1 style="color:#E040FB; font-size:32px; margin-top:30px;">♾️ エンドレス防衛戦</h1>
                      <p style="font-size:16px; color:#ccc;">限界突破サバイバル（最高到達記録：<span style="color:#FFD700; font-weight:bold;">WAVE ${bestRecord}</span>）</p>`;
    } else if (isMock) {
        let tName = window.DEFENSE_STATE.mockTarget ? window.DEFENSE_STATE.mockTarget.playerName : "ライバル";
        headerInfo = `<h1 style="color:#00E5FF; font-size:32px; margin-top:30px;">👥 模擬戦</h1>
                      <p style="font-size:16px; color:#ccc;">VS <span style="color:#FFF; font-weight:bold;">${tName}</span> の防衛パーティ</p>`;
    } else {
        headerInfo = `<h1 style="color:#FFD700; font-size:32px; margin-top:30px;">👑 王様「島を防衛せよ！」</h1>
                      <p style="font-size:16px; color:#ccc;">現在の防衛ウェーブ：<span style="color:#FF5252; font-weight:bold; font-size:20px;">${currentWave}</span> （予想敵戦力: 約 ${totalE} 体）</p>`;
    }

    let btnColor = isEndless ? '#4A148C' : (isMock ? '#006064' : '#b71c1c');
    let btnBorder = isEndless ? '#E040FB' : (isMock ? '#00E5FF' : '#ff5252');
    let btnText = isMock ? '⚔️ 模擬戦開始' : '⚔️ 出撃する';

    ui.innerHTML = `
        <button onclick="document.getElementById('defense-sortie-ui').remove(); window.openArenaReception();" style="position:absolute; top:20px; right:20px; background:#444; border:none; padding:10px 20px; color:white; border-radius:8px; cursor:pointer; font-weight:bold;">キャンセル</button>
        ${headerInfo}
        <div style="display:flex; width:95%; max-width:1000px; gap:20px; margin-bottom:30px;">
            <div style="flex:1; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; border:2px solid #555;"><div style="font-size:18px; color:#4fc3f7; margin-bottom:15px; font-weight:bold;">▼ 迎撃部隊（最大 ${max} 体）</div><div style="display:flex; gap:10px; flex-wrap:wrap;">${partyHtml}</div></div>
            <div style="flex:1; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; border:2px solid #555; max-height:400px; overflow-y:auto;"><div style="font-size:18px; color:#FFC107; margin-bottom:15px; font-weight:bold;">▼ 待機中の相棒たち（タップで追加）</div><div style="display:flex; gap:10px; flex-wrap:wrap;">${rosterHtml}</div></div>
        </div>
        <div style="display:flex; gap:20px; margin-bottom:40px;">
            <button onclick="window.startDefenseSimulation()" style="padding:15px 60px; font-size:24px; font-weight:bold; background:${btnColor}; color:white; border:3px solid ${btnBorder}; border-radius:8px; cursor:pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.5); transition:transform 0.1s;">${btnText}</button>
        </div>
    `;
    ui.style.display = 'flex';
};

window.showDefenseUnitDetails = function(listType, index) {
    let unit = listType === 'party' ? window.DEFENSE_STATE.preDeployed[index] : window.DEFENSE_STATE.availableRoster[index];
    if (!unit) return;

    let skillsHtml = unit.skills.map(s => {
        let typeColor = s.type === 'melee' ? '#FF9800' : '#00E5FF';
        let typeName = s.type === 'melee' ? '格闘' : '射撃';
        return `
            <div style="background:#111; margin-bottom:8px; padding:10px; border-left:4px solid ${typeColor}; border-radius:4px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <div style="color:${typeColor}; font-weight:bold; font-size:16px;">${s.name}</div>
                    <div style="background:#333; padding:2px 6px; border-radius:4px; font-size:10px; color:#ddd;">${typeName}</div>
                </div>
                <div style="display:flex; gap:15px; color:#ccc; font-size:13px;">
                    <div>💥 威力倍率: <span style="color:#fff; font-weight:bold;">x${s.power.toFixed(1)}</span></div>
                    <div>🎯 射程: <span style="color:#fff; font-weight:bold;">${s.range}</span></div>
                </div>
            </div>
        `;
    }).join('');

    let modal = document.createElement('div');
    modal.id = 'def-unit-modal';
    modal.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:65000; display:flex; justify-content:center; align-items:center;`;
    
    modal.innerHTML = `
        <div style="background:#222; border:2px solid #777; border-radius:12px; padding:25px; width:90%; max-width:450px; color:white; font-family:sans-serif; position:relative; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
            <button onclick="this.parentElement.parentElement.remove()" style="position:absolute; top:15px; right:15px; background:#f44336; color:white; border:none; border-radius:4px; padding:8px 12px; cursor:pointer; font-weight:bold; font-size:16px;">✕ 閉じる</button>
            <h2 style="color:#FFD700; margin-top:0; font-size:24px; margin-bottom:20px; border-bottom:1px solid #444; padding-bottom:10px;">${unit.name} <span style="font-size:14px; color:#aaa; font-weight:normal;">のステータス</span></h2>
            <div style="display:flex; background:#1a1a1a; padding:15px; border-radius:8px; margin-bottom:20px; border:1px solid #333;">
                <div style="flex:1; border-right:1px solid #444; padding-right:15px;">
                    <div style="color:#aaa; font-size:12px; margin-bottom:2px;">耐久 (HP)</div><div style="font-size:20px; font-weight:bold; color:#4CAF50; margin-bottom:10px;">${unit.hp} <span style="font-size:14px; color:#888;">/ ${unit.maxHp}</span></div>
                    <div style="color:#aaa; font-size:12px; margin-bottom:2px;">攻撃力 (ATK)</div><div style="font-size:18px; font-weight:bold; margin-bottom:10px;">${unit.atk}</div>
                    <div style="color:#aaa; font-size:12px; margin-bottom:2px;">防御力 (DEF)</div><div style="font-size:18px; font-weight:bold;">${unit.def}</div>
                </div>
                <div style="flex:1; padding-left:15px;">
                    <div style="color:#aaa; font-size:12px; margin-bottom:2px;">移動力 (SPD)</div><div style="font-size:20px; font-weight:bold; color:#2196F3; margin-bottom:10px;">${unit.speed} <span style="font-size:12px; color:#888; font-weight:normal;">マス</span></div>
                    <div style="color:#aaa; font-size:12px; margin-bottom:2px;">賢さ (INT)</div><div style="font-size:18px; font-weight:bold; margin-bottom:10px;">${unit.intel}</div>
                    <div style="color:#aaa; font-size:12px; margin-bottom:2px;">射程範囲</div><div style="font-size:18px; font-weight:bold; color:#FF9800;">${unit.minRange} ～ ${unit.maxRange}</div>
                </div>
            </div>
            <h3 style="color:#4CAF50; font-size:18px; margin-bottom:10px; border-left:4px solid #4CAF50; padding-left:10px;">習得済みの技</h3>
            <div style="max-height:220px; overflow-y:auto; padding-right:10px; background:#1a1a1a; padding:10px; border-radius:8px; border:1px solid #333;">${skillsHtml}</div>
        </div>
    `;
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
};

window.addDefenseMember = function(index) {
    if (window.DEFENSE_STATE.preDeployed.length >= window.DEFENSE_CONFIG.maxDeploy) return;
    window.DEFENSE_STATE.preDeployed.push(window.DEFENSE_STATE.availableRoster.splice(index, 1)[0]);
    window.renderDefenseSortieUI();
};
window.removeDefenseMember = function(index) {
    let member = window.DEFENSE_STATE.preDeployed[index];
    if (member.isMe) return; 
    window.DEFENSE_STATE.preDeployed.splice(index, 1);
    window.DEFENSE_STATE.availableRoster.push(member);
    window.renderDefenseSortieUI();
};

window.generateEnemyWave = function(wave, count) {
    let enemies = []; 
    let discovered = (window.aiPet && window.aiPet.discoveredMonsters) ? window.aiPet.discoveredMonsters : ['robot'];
    if (discovered.length === 0) discovered = ['robot'];
    for (let i = 0; i < count; i++) {
        let pwr = Math.floor(10 + wave * 1.5); let int = Math.floor(8 + wave * 1.2);
        let randomSkin = discovered[Math.floor(Math.random() * discovered.length)];
        let sName = (typeof monsterBookData !== 'undefined' && monsterBookData[randomSkin]) ? monsterBookData[randomSkin].name : randomSkin;
        let e = { name: `幻影の${sName}`, skin: randomSkin, hp: 80 + pwr, maxHp: 80 + pwr, atk: 10 + Math.floor(pwr * 0.4), def: 5, intel: int, speed: 3, team: 'enemy', isBoss: false, gridX: -100, gridY: -100 };
        window.assignSkillsToUnit(e, pwr, int); enemies.push(e);
    }
    return enemies;
};

window.spawnReinforcements = async function(requestCount) {
    let cfg = window.DEFENSE_STATE.waveConfig;
    if (window.DEFENSE_STATE.mode !== 'endless' && cfg.spawnedSoFar >= cfg.totalToSpawn) return; 

    let count = window.DEFENSE_STATE.mode === 'endless' ? requestCount : Math.min(requestCount, cfg.totalToSpawn - cfg.spawnedSoFar);
    let currentWave = window.DEFENSE_STATE.mode === 'endless' ? (window.aiPet.currentEndlessWave || 1) : (window.aiPet.defenseWave || 1);
    let newEnemies = window.generateEnemyWave(currentWave, count);
    
    let landGrids = window.getValidLandGrids();
    let cx = window.DEFENSE_STATE.castleGrid.x; let cy = window.DEFENSE_STATE.castleGrid.y;
    
    if (count > 0 && cfg.spawnedSoFar > 0) {
        await window.showDefenseMessage("⚠️ 敵の増援が接近中！", "#FF9800");
    }

    for (let i = 0; i < newEnemies.length; i++) {
        let e = newEnemies[i]; 
        e.id = `enemy_${cfg.spawnedSoFar + i}`; 
        
        landGrids.sort((a,b) => {
            let dA = Math.abs(a.x - cx) + Math.abs(a.y - cy);
            let dB = Math.abs(b.x - cx) + Math.abs(b.y - cy);
            return (dB + Math.random()*5) - (dA + Math.random()*5); 
        });

        let spawnPos = { x: cx, y: cy };
        for (let j=0; j<landGrids.length; j++) {
            if (!window.isGridOccupied(landGrids[j].x, landGrids[j].y)) { spawnPos = landGrids[j]; break; }
        }
        
        e.gridX = spawnPos.x; e.gridY = spawnPos.y;
        window.DEFENSE_STATE.enemies.push(e); 
        window.DEFENSE_STATE.activeUnit = e; 
        window.addDefenseLog(`・敵増援 [${e.name}] が出現！`); 
        await window.wait(300);
    }
    
    cfg.spawnedSoFar += count;
    cfg.turnsUntilNextSpawn = 3; 
    window.DEFENSE_STATE.activeUnit = null;
};

window.startDefenseSimulation = function() {
    if (window.DEFENSE_STATE.emergencyTimer) clearInterval(window.DEFENSE_STATE.emergencyTimer);
    document.getElementById('defense-sortie-ui').style.display = 'none';
    let marquee = document.getElementById('emergency-marquee'); if (marquee) marquee.style.display = 'none';
    
    let style = document.getElementById('def-hide-style');
    if (!style) { style = document.createElement('style'); style.id = 'def-hide-style'; document.head.appendChild(style); }
    style.innerHTML = `#nav, #aiStatus, #info-column, #gameControls, #action-buttons-row, #chat-input-row, .main-toolbar, #toolbar, .mobile-only-btn, #main-tab-container, .tabs, #tabs, .main-tab, .sub-tab { display: none !important; }`;

    window.currentMode = 'defense';
    window.DEFENSE_STATE.mode = window.DEFENSE_STATE.nextMode || 'normal';

    // ★修正：ランキング用に今回の出撃パーティを「完全な状態」で記録
    window.aiPet.lastDefenseParty = JSON.parse(JSON.stringify(window.DEFENSE_STATE.preDeployed));

    if (window.aiPet) {
        window.aiPet.isIndoors = false; window.aiPet.indoorTarget = null; window.aiPet.actionState = 'idle'; window.aiPet.visualAction = 'idle'; window.aiPet.messageTimer = 0; window.aiPet.message = "";
        if (!window._originalAiPetUpdate && typeof window.aiPet.update === 'function') {
            window._originalAiPetUpdate = window.aiPet.update;
            window.aiPet.update = function(dt) { if (window.currentMode === 'defense') return; if (window._originalAiPetUpdate) window._originalAiPetUpdate.call(this, dt); };
        }
    }
    
    window.DEFENSE_STATE.isActive = true; window.DEFENSE_STATE.turn = 1; window.DEFENSE_STATE.autoMode = false; window.DEFENSE_STATE.animMode = true; window.DEFENSE_STATE.isProcessingPhase = true; 
    window.DEFENSE_STATE.deployedParty = []; window.DEFENSE_STATE.enemies = []; window.DEFENSE_STATE.moveHighlights = []; window.DEFENSE_STATE.attackHighlights = [];
    
    window.createDefenseControls(); window.initDefenseGridMap();
};

window.initDefenseGridMap = async function() {
    window.DEFENSE_STATE.facilities = [];
    let currentAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
    let castleAsset = Object.values(currentAssets).find(a => a && a.type === 'castle');
    let cx = 10; let cy = 6; 
    window.DEFENSE_STATE.castleGrid = {x: cx, y: cy};

    Object.keys(currentAssets).forEach(key => {
        let a = currentAssets[key];
        let validTypes = Object.keys(window.DEFENSE_CONFIG.facilities);
        if (a && validTypes.includes(a.type)) {
            let conf = window.DEFENSE_CONFIG.facilities[a.type];
            let loadedFac = window.DEFENSE_STATE.facilities.find(f => f.id === key);
            let currentHp = loadedFac ? loadedFac.hp : conf.maxHp;
            window.DEFENSE_STATE.facilities.push({ id: key, type: a.type, name: conf.name, team: 'facility', gridX: a.gridX, gridY: a.gridY, hp: currentHp, maxHp: conf.maxHp });
        }
    });

    if (window.DEFENSE_STATE.facilities.length === 0) window.DEFENSE_STATE.facilities.push({ id: 'fallback', type: 'castle', name: '王城(仮)', team: 'facility', gridX: cx, gridY: cy, hp: 2000, maxHp: 2000 });

    window.renderUnitOnGrid = function(unit) {}; window.renderFacilityOnGrid = function(fac) {};

    if (window.DEFENSE_STATE.mode === 'endless') {
        window.aiPet.currentEndlessWave = 1;
        await window.showDefenseMessage("♾️ ENDLESS BATTLE START", "#E040FB");
    } else if (window.DEFENSE_STATE.mode === 'mock') {
        await window.showDefenseMessage("👥 MOCK BATTLE START", "#00E5FF");
    } else {
        await window.showDefenseMessage("⚔️ DEFENSE BATTLE START", "#FFD700");
    }

    let landGrids = window.getValidLandGrids();
    let preParty = window.DEFENSE_STATE.preDeployed || [];
    for (let i = 0; i < preParty.length; i++) {
        let p = preParty[i]; p.team = 'player';
        
        landGrids.sort((a,b) => { return (Math.abs(a.x - cx) + Math.abs(a.y - cy)) - (Math.abs(b.x - cx) + Math.abs(b.y - cy)); });
        let spawnPos = { x: cx, y: cy };
        for (let j=0; j<landGrids.length; j++) {
            if (!window.isGridOccupied(landGrids[j].x, landGrids[j].y)) { spawnPos = landGrids[j]; break; }
        }
        
        p.gridX = spawnPos.x; p.gridY = spawnPos.y;
        window.DEFENSE_STATE.deployedParty.push(p); window.DEFENSE_STATE.activeUnit = p; 
        window.addDefenseLog(`・味方 [${p.name}] が防衛ラインに到着！`); await window.wait(200); 
    }

    // ★ 修正：模擬戦時は相手の「完全なステータスと技」をそのまま復元する
    if (window.DEFENSE_STATE.mode === 'endless') {
        window.DEFENSE_STATE.waveConfig = { totalToSpawn: 99999, spawnedSoFar: 0, turnsUntilNextSpawn: 0 };
        await window.spawnReinforcements(4); 
    } else if (window.DEFENSE_STATE.mode === 'mock') {
        window.DEFENSE_STATE.waveConfig = { totalToSpawn: 0, spawnedSoFar: 0, turnsUntilNextSpawn: 0 }; 
        let targetParty = window.DEFENSE_STATE.mockTarget.party || [];
        
        for (let i = 0; i < targetParty.length; i++) {
            let pData = targetParty[i];
            let e = {
                id: `mock_enemy_${i}`, name: `[幻影] ${pData.name || '不明'}`, skin: pData.skin || 'robot',
                hp: pData.maxHp || 100, maxHp: pData.maxHp || 100,
                atk: pData.atk || 10, def: pData.def || 5,
                intel: pData.intel || 10, speed: pData.speed || 3,
                team: 'enemy', isBoss: false, gridX: -100, gridY: -100
            };
            
            // 保存されていた pwr (またはatkからの逆算)を使って本来の強力な技を持たせる
            let ePwr = pData.pwr !== undefined ? pData.pwr : Math.floor((e.atk - 10) * 2);
            window.assignSkillsToUnit(e, ePwr, e.intel);
            
            landGrids.sort((a,b) => {
                let dA = Math.abs(a.x - cx) + Math.abs(a.y - cy);
                let dB = Math.abs(b.x - cx) + Math.abs(b.y - cy);
                return (dB + Math.random()*2) - (dA + Math.random()*2); 
            });
            let spawnPos = { x: cx, y: cy };
            for (let j=0; j<landGrids.length; j++) {
                if (!window.isGridOccupied(landGrids[j].x, landGrids[j].y)) { spawnPos = landGrids[j]; break; }
            }
            e.gridX = spawnPos.x; e.gridY = spawnPos.y;
            window.DEFENSE_STATE.enemies.push(e); window.DEFENSE_STATE.activeUnit = e; 
            window.addDefenseLog(`・敵陣営 [${e.name}] が配置された！`); await window.wait(200);
        }
    } else {
        let currentWave = window.aiPet.defenseWave || 1;
        let totalE = Math.min(3 + currentWave * 2, 15);
        window.DEFENSE_STATE.waveConfig = { totalToSpawn: totalE, spawnedSoFar: 0, turnsUntilNextSpawn: 0 };
        await window.spawnReinforcements(3 + Math.floor(currentWave / 3)); 
    }
    
    window.DEFENSE_STATE.activeUnit = null; 
    window.addDefenseLog(`▼ 防衛戦 第 1 ターン開始`);
    
    await window.showDefenseMessage("🔵 PLAYER PHASE", "#2196F3");
    window.DEFENSE_STATE.phase = 'player'; window.DEFENSE_STATE.isProcessingPhase = false; 
    
    if (window.DEFENSE_STATE.autoMode) setTimeout(() => { window.processPhaseAI(); }, 500);
};

window.createDefenseControls = function() {
    let controls = document.getElementById('defense-controls');
    if (!controls) {
        controls = document.createElement('div'); controls.id = 'defense-controls';
        controls.style.cssText = `position:fixed; bottom:20px; left:50%; transform:translateX(-50%); width:800px; max-width:95vw; height:120px; background:rgba(0,0,0,0.85); border:2px solid #555; border-radius:8px; display:grid; grid-template-columns: 2fr 1fr; z-index:50000; box-shadow:0 0 20px rgba(0,0,0,0.8);`;
        document.body.appendChild(controls);
    }
    if (!document.getElementById('defense-log')) {
        let log = document.createElement('div'); log.id = 'defense-log';
        log.style.cssText = `padding:10px; font-size:14px; color:#aaa; font-family:sans-serif; overflow-y:auto; line-height:1.5;`;
        controls.appendChild(log);
    }
    if (!document.getElementById('defense-btns')) {
        let btns = document.createElement('div'); btns.id = 'defense-btns';
        btns.style.cssText = `display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:6px; border-left:2px solid #444; padding:10px;`;
        btns.innerHTML = `
            <button id="def-btn-auto" onclick="window.toggleDefenseAuto()" style="width:48%; padding:8px 0; font-weight:bold; font-size:12px; background:#444; color:white; border:none; border-radius:4px; cursor:pointer;">AUTO OFF</button>
            <button id="def-btn-anim" onclick="window.toggleDefenseAnim()" style="width:48%; padding:8px 0; font-weight:bold; font-size:12px; background:#FF9800; color:white; border:none; border-radius:4px; cursor:pointer;">演出 ON</button>
            <button id="def-btn-skip" onclick="window.skipDefenseTurn()" style="width:100%; padding:8px 0; font-weight:bold; font-size:14px; background:#2196F3; color:white; border:none; border-radius:4px; cursor:pointer;">1フェイズ進む</button>
            <button onclick="window.giveUpDefense()" style="width:100%; padding:6px 0; font-size:11px; background:#b71c1c; color:white; border:none; border-radius:4px; cursor:pointer;">撤退する</button>
        `;
        controls.appendChild(btns);
    }
    controls.style.display = 'grid'; let log = document.getElementById('defense-log'); if (log) log.innerHTML = '';
};

window.toggleDefenseAuto = function() {
    let btn = document.getElementById('def-btn-auto'); window.DEFENSE_STATE.autoMode = !window.DEFENSE_STATE.autoMode;
    if (window.DEFENSE_STATE.autoMode) { btn.innerText = "AUTO ON"; btn.style.background = "#4CAF50"; if (!window.DEFENSE_STATE.isProcessingPhase) window.processPhaseAI(); } 
    else { btn.innerText = "AUTO OFF"; btn.style.background = "#444"; }
};

window.toggleDefenseAnim = function() {
    let btn = document.getElementById('def-btn-anim'); window.DEFENSE_STATE.animMode = !window.DEFENSE_STATE.animMode;
    if (window.DEFENSE_STATE.animMode) { btn.innerText = "演出 ON"; btn.style.background = "#FF9800"; } else { btn.innerText = "演出 OFF"; btn.style.background = "#444"; }
};

window.skipDefenseTurn = function() { if (window.DEFENSE_STATE.autoMode) return; if (window.DEFENSE_STATE.isProcessingPhase) return; window.processPhaseAI(); };
window.addDefenseLog = function(msg) { let log = document.getElementById('defense-log'); if (log) { log.innerHTML += `<div>${msg}</div>`; log.scrollTop = log.scrollHeight; } };

window.processPhaseAI = async function() {
    if (window.DEFENSE_STATE.isProcessingPhase) return; window.DEFENSE_STATE.isProcessingPhase = true;
    let phase = window.DEFENSE_STATE.phase; let units = (phase === 'player') ? window.DEFENSE_STATE.deployedParty : window.DEFENSE_STATE.enemies;
    let aliveUnits = units.filter(u => u.hp > 0); aliveUnits.sort((a,b) => b.speed - a.speed);

    for (let i = 0; i < aliveUnits.length; i++) {
        let unit = aliveUnits[i]; if (!window.DEFENSE_STATE.isActive) break;
        window.DEFENSE_STATE.activeUnit = unit; await window.thinkDefenseAI(unit);
        if (!window.DEFENSE_STATE.isActive) break; await window.wait(300); 
    }

    if (!window.DEFENSE_STATE.isActive) return;
    window.DEFENSE_STATE.activeUnit = null; 

    if (window.DEFENSE_STATE.phase === 'player') {
        window.DEFENSE_STATE.phase = 'enemy'; await window.showDefenseMessage("🔴 ENEMY PHASE", "#f44336"); window.addDefenseLog(`🔴 敵フェイズ`);
        window.DEFENSE_STATE.isProcessingPhase = false; if (window.DEFENSE_STATE.autoMode) setTimeout(() => { window.processPhaseAI(); }, 500);
    } else {
        window.DEFENSE_STATE.turn++; window.DEFENSE_STATE.phase = 'player';
        window.addDefenseLog(`▼ 防衛戦 第 ${window.DEFENSE_STATE.turn} ターン開始`); 

        if (window.DEFENSE_STATE.mode === 'normal') {
            let cfg = window.DEFENSE_STATE.waveConfig;
            if (cfg.spawnedSoFar < cfg.totalToSpawn) {
                cfg.turnsUntilNextSpawn--;
                let aliveEnemies = window.DEFENSE_STATE.enemies.filter(e => e.hp > 0);
                if (cfg.turnsUntilNextSpawn <= 0 || aliveEnemies.length === 0) {
                    await window.spawnReinforcements(Math.min(3, cfg.totalToSpawn - cfg.spawnedSoFar));
                }
            }
        }

        await window.showDefenseMessage("🔵 PLAYER PHASE", "#2196F3");
        window.addDefenseLog(`🔵 味方フェイズ`); window.DEFENSE_STATE.isProcessingPhase = false;
        if (window.DEFENSE_STATE.autoMode) setTimeout(() => { window.processPhaseAI(); }, 500);
    }
};

window.thinkDefenseAI = async function(unit) {
    let isPlayer = (unit.team === 'player');
    let targetList = isPlayer ? window.DEFENSE_STATE.enemies : [...window.DEFENSE_STATE.deployedParty, ...window.DEFENSE_STATE.facilities];
    
    let validTargets = []; let ax = unit.gridX; let ay = unit.gridY;

    targetList.forEach(t => {
        if (t.hp <= 0) return;
        let dist = Math.abs(ax - t.gridX) + Math.abs(ay - t.gridY);
        let usableSkills = unit.skills.filter(s => s.range >= dist);
        if (usableSkills.length > 0) {
            usableSkills.sort((a,b) => b.power - a.power); validTargets.push({ target: t, dist: dist, skill: usableSkills[0] });
        }
    });

    window.DEFENSE_STATE.moveHighlights = window.getMovableGrids(unit); await window.wait(400); 

    if (validTargets.length > 0) {
        window.DEFENSE_STATE.moveHighlights = []; 
        validTargets.sort((a,b) => (a.target.type === 'castle' ? -1 : (b.target.type === 'castle' ? 1 : a.dist - b.dist)));
        window.DEFENSE_STATE.attackHighlights = window.getAttackableGrids(unit); await window.wait(400);
        await window.executeDefenseBattle(unit, validTargets[0].target, validTargets[0].skill);
        window.DEFENSE_STATE.attackHighlights = []; return;
    }

    let moveTarget = null; let minDist = 9999;
    targetList.forEach(t => {
        if (t.hp <= 0) return;
        let dist = Math.abs(ax - t.gridX) + Math.abs(ay - t.gridY);
        if (t.type === 'castle') { moveTarget = t; minDist = dist - 1000; } else if (dist < minDist) { moveTarget = t; minDist = dist; }
    });

    if (moveTarget) {
        let nextGrid = window.calculateSRPGPath(unit, moveTarget.gridX, moveTarget.gridY);
        if (nextGrid && (nextGrid.x !== unit.gridX || nextGrid.y !== unit.gridY)) {
            unit.gridX = nextGrid.x; unit.gridY = nextGrid.y; await window.wait(400); 
            window.DEFENSE_STATE.moveHighlights = []; 
            ax = unit.gridX; ay = unit.gridY; let afterMoveTargets = [];
            targetList.forEach(t => {
                if (t.hp <= 0) return;
                let dist = Math.abs(ax - t.gridX) + Math.abs(ay - t.gridY);
                let usableSkills = unit.skills.filter(s => s.range >= dist);
                if (usableSkills.length > 0) { usableSkills.sort((a,b) => b.power - a.power); afterMoveTargets.push({ target: t, dist: dist, skill: usableSkills[0] }); }
            });
            if (afterMoveTargets.length > 0) {
                window.DEFENSE_STATE.attackHighlights = window.getAttackableGrids(unit); await window.wait(400);
                afterMoveTargets.sort((a,b) => (a.target.type === 'castle' ? -1 : (b.target.type === 'castle' ? 1 : a.dist - b.dist)));
                await window.executeDefenseBattle(unit, afterMoveTargets[0].target, afterMoveTargets[0].skill);
                window.DEFENSE_STATE.attackHighlights = [];
            }
        }
    }
    window.DEFENSE_STATE.moveHighlights = []; 
};

window.getCutsceneSpriteHtml = function(u, direction) {
    if (u.team === 'facility') {
        let emoji = '🏠'; if (u.type === 'castle') emoji = '🏰'; if (u.type === 'restaurant') emoji = '🏪'; if (u.type === 'smith') emoji = '⚒️'; if (u.type === 'casino') emoji = '🎰';
        return `<div style="font-size:150px; filter:drop-shadow(0 10px 20px rgba(0,0,0,0.8));">${emoji}</div>`;
    }
    let type = u.skin ? u.skin.split('_')[0] : 'robot'; let conf = (typeof aiConfigs !== 'undefined') ? aiConfigs[type] : null;
    let imgKey = (conf && conf.img) ? conf.img : type; let img = (typeof images !== 'undefined') ? images[imgKey] || images['robot'] : null;
    let iw = img ? img.naturalWidth : 1000; let frame = {sx:0, sy:0, sw:300, sh:300};
    if (conf && conf.actions && conf.actions['move']) frame = conf.actions['move'][0] || frame;

    let sc = 1.2; let filter = u.team === 'enemy' ? 'brightness(0.6) sepia(1) hue-rotate(-50deg) saturate(3)' : 'none';
    return `<div style="width:${frame.sw * sc}px; height:${frame.sh * sc}px; overflow:hidden; position:relative; filter:${filter};">
                <div style="transform: scaleX(${direction}); width:100%; height:100%;"><img src="${img ? img.src : ''}" style="position:absolute; top:-${frame.sy * sc}px; left:-${frame.sx * sc}px; width:${iw * sc}px; max-width:none;"></div>
            </div>`;
};

window.showDefenseCutscene = async function(act, def, damageVal, skill, canCounter, counterDmg, counterSkill) {
    if (!window.DEFENSE_STATE.animMode) return; 

    let cutUi = document.createElement('div'); cutUi.id = 'def-cutscene';
    cutUi.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:70000; display:flex; flex-direction:column; overflow:hidden; font-family:sans-serif; transition:opacity 0.2s; background: linear-gradient(to bottom, #1976D2, #81D4FA);`;
    
    let leftUnit = act; let rightUnit = def;
    let leftIsPlayer = leftUnit.team === 'player'; let rightIsPlayer = rightUnit.team === 'player';
    let leftHp = leftUnit.hp; let rightHp = rightUnit.hp;

    cutUi.innerHTML = `
        <div id="cut-speedlines" style="position:absolute; top:0; left:-50%; width:200%; height:100%; background: repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.6) 80px, rgba(255,255,255,0.6) 120px); transform: skewX(-20deg); opacity:0; transition:opacity 0.1s;"></div>
        <style>@keyframes slide-speed { 0% { transform: skewX(-20deg) translateX(0); } 100% { transform: skewX(-20deg) translateX(-160px); } } @keyframes shake-hit { 0% {transform:translate(15px,15px)} 25% {transform:translate(-15px,-15px)} 50% {transform:translate(15px,-15px)} 75% {transform:translate(-15px,15px)} 100% {transform:translate(0,0)} }</style>
        <div style="position:absolute; top:20px; left:20px; width:40%; background:rgba(0,0,50,0.8); border:3px solid ${leftIsPlayer?'#4CAF50':'#ff5252'}; border-radius:10px; padding:10px; color:white; box-shadow:0 5px 15px rgba(0,0,0,0.5); z-index:70010;">
            <div style="font-size:24px; font-weight:bold; color:${leftIsPlayer?'#4CAF50':'#ff5252'}; margin-bottom:5px;">${leftUnit.name}</div>
            <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:2px;"><span>HP</span><span id="hud-l-hp-text">${leftHp} / ${leftUnit.maxHp||leftUnit.hp}</span></div>
            <div style="width:100%; height:15px; background:#333; border-radius:5px; overflow:hidden;"><div id="hud-l-hp-bar" style="width:${(leftHp/(leftUnit.maxHp||leftUnit.hp))*100}%; height:100%; background:${leftIsPlayer?'#4CAF50':'#ff5252'}; transition:width 0.3s ease-out;"></div></div>
        </div>
        <div style="position:absolute; top:20px; right:20px; width:40%; background:rgba(50,0,0,0.8); border:3px solid ${rightIsPlayer?'#4CAF50':'#ff5252'}; border-radius:10px; padding:10px; color:white; box-shadow:0 5px 15px rgba(0,0,0,0.5); z-index:70010;">
            <div style="font-size:24px; font-weight:bold; color:${rightIsPlayer?'#4CAF50':'#ff5252'}; margin-bottom:5px; text-align:right;">${rightUnit.name}</div>
            <div style="display:flex; justify-content:space-between; font-size:14px; margin-bottom:2px;"><span>HP</span><span id="hud-r-hp-text">${rightHp} / ${rightUnit.maxHp||rightUnit.hp}</span></div>
            <div style="width:100%; height:15px; background:#333; border-radius:5px; overflow:hidden; transform:scaleX(-1);"><div id="hud-r-hp-bar" style="width:${(rightHp/(rightUnit.maxHp||rightUnit.hp))*100}%; height:100%; background:${rightIsPlayer?'#4CAF50':'#ff5252'}; transition:width 0.3s ease-out;"></div></div>
        </div>
        <div id="cut-actor-stage" style="position:absolute; top:20%; left:0; width:100%; height:60%; display:flex; justify-content:center; align-items:center; z-index:70001;"></div>
        <div id="cut-flash" style="position:absolute; top:0; left:0; width:100%; height:100%; background:white; z-index:70002; opacity:0; pointer-events:none;"></div>
        <div id="cut-dmg-text" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) scale(0); font-size:150px; font-weight:bold; color:#ff5252; font-style:italic; text-shadow: 0 0 20px #000, 4px 4px 0 #fff; opacity:0; z-index:70020; pointer-events:none;">0</div>
        <div style="position:absolute; bottom:20px; left:50%; transform:translateX(-50%); width:80%; max-width:800px; background:rgba(0,0,20,0.9); border:4px solid #2196F3; border-radius:10px; padding:20px; color:white; font-size:28px; font-weight:bold; box-shadow:0 10px 30px rgba(0,0,0,0.8); z-index:70020;">
            <div id="cut-dialogue" style="letter-spacing:2px;"></div>
        </div>
    `;
    document.body.appendChild(cutUi);

    let stage = document.getElementById('cut-actor-stage'); let dialogue = document.getElementById('cut-dialogue'); let speedlines = document.getElementById('cut-speedlines'); let dmgText = document.getElementById('cut-dmg-text');

    const playAnimPhase = async (aUnit, dUnit, damageVal, useSkill, isCounter) => {
        let isActLeft = aUnit === leftUnit; let actDir = isActLeft ? 1 : -1;
        let verb = useSkill.type === 'shoot' ? 'いっけぇぇぇ！！' : 'おおおおぉッ！！';
        dialogue.innerHTML = isCounter ? `${aUnit.name}「甘いッ！ 反撃だ！！」<br><span style="color:#FFC107;">『${useSkill.name}』！！</span>` : `${aUnit.name}「${verb}」<br><span style="color:#00E5FF;">『${useSkill.name}』！！</span>`;
        stage.innerHTML = window.getCutsceneSpriteHtml(aUnit, actDir);
        let actorDiv = stage.firstElementChild; actorDiv.style.transform = `translateX(${isActLeft ? '-50vw' : '50vw'})`; 
        await window.wait(50);
        actorDiv.style.transition = 'transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1)'; actorDiv.style.transform = 'translateX(0)';
        await window.wait(600);

        if (useSkill.type === 'melee') {
            speedlines.style.opacity = '1'; speedlines.style.animation = 'slide-speed 0.2s infinite linear'; actorDiv.style.transition = 'transform 0.15s ease-in'; actorDiv.style.transform = `translateX(${isActLeft ? '100vw' : '-100vw'}) scale(1.2)`;
            await window.wait(150); speedlines.style.opacity = '0'; speedlines.style.animation = 'none';
        } else {
            actorDiv.style.transition = 'transform 0.1s ease-out, filter 0.1s'; actorDiv.style.transform = `translateX(${isActLeft ? '-40px' : '40px'}) scale(1.05)`; actorDiv.querySelector('div').style.filter = 'brightness(1.5) drop-shadow(0 0 20px cyan)'; 
            await window.wait(200);
        }

        stage.innerHTML = window.getCutsceneSpriteHtml(dUnit, isActLeft ? -1 : 1); 
        let targetDiv = stage.firstElementChild; let fxDiv = document.createElement('div'); cutUi.appendChild(fxDiv);
        
        if (useSkill.effect === 'slash') {
            let rot = isActLeft ? 45 : -45; fxDiv.style.cssText = `position:absolute; top:50%; left:50%; width:150vw; height:50px; background:white; box-shadow:0 0 40px yellow; border-radius:50%; z-index:70005;`; fxDiv.animate([{ transform: `translate(-50%,-50%) rotate(${rot}deg) scaleX(0)`, opacity: 1 }, { transform: `translate(-50%,-50%) rotate(${rot}deg) scaleX(1)`, opacity: 1, offset: 0.5 }, { transform: `translate(-50%,-50%) rotate(${rot}deg) scaleX(1.5) scaleY(0)`, opacity: 0 }], { duration: 300, fill: 'forwards', easing: 'ease-out' });
        } else if (useSkill.effect === 'beam') {
            fxDiv.style.cssText = `position:absolute; top:50%; left:0; width:100vw; height:250px; background:linear-gradient(to bottom, transparent, cyan, white, cyan, transparent); box-shadow:0 0 50px cyan; mix-blend-mode:screen; z-index:70005;`; fxDiv.animate([{ transform: `translateY(-50%) scaleY(0)`, opacity: 1 }, { transform: `translateY(-50%) scaleY(1.2)`, opacity: 1, offset: 0.2 }, { transform: `translateY(-50%) scaleY(0)`, opacity: 0 }], { duration: 400, fill: 'forwards', easing: 'ease-out' });
        } else if (useSkill.effect === 'explosion') {
            fxDiv.style.cssText = `position:absolute; top:50%; left:50%; width:400px; height:400px; background:radial-gradient(circle, white 10%, yellow 30%, red 70%, transparent 100%); border-radius:50%; mix-blend-mode:screen; z-index:70005;`; fxDiv.animate([{ transform: `translate(-50%,-50%) scale(0)`, opacity: 1, filter: 'brightness(2)' }, { transform: `translate(-50%,-50%) scale(1.5)`, opacity: 1, filter: 'brightness(1)', offset: 0.5 }, { transform: `translate(-50%,-50%) scale(2.5)`, opacity: 0, filter: 'brightness(0.5)' }], { duration: 500, fill: 'forwards', easing: 'ease-out' });
        } else {
            fxDiv.style.cssText = `position:absolute; top:50%; left:50%; width:300px; height:300px; background:radial-gradient(circle, white 0%, transparent 70%); border-radius:50%; z-index:70005;`; fxDiv.animate([{ transform: `translate(-50%,-50%) scale(0)`, opacity: 1 }, { transform: `translate(-50%,-50%) scale(1)`, opacity: 1, offset: 0.5 }, { transform: `translate(-50%,-50%) scale(1.5)`, opacity: 0 }], { duration: 300, fill: 'forwards', easing: 'ease-out' });
        }
        
        let flash = document.getElementById('cut-flash'); flash.style.transition = 'none'; flash.style.opacity = '0.8'; setTimeout(() => { flash.style.transition = 'opacity 0.4s'; flash.style.opacity = '0'; }, 50);
        targetDiv.style.animation = 'shake-hit 0.3s'; targetDiv.style.filter = "brightness(2) sepia(1) hue-rotate(-50deg) saturate(5)";
        dmgText.innerText = damageVal; dmgText.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.1s'; dmgText.style.transform = 'translate(-50%,-50%) scale(1)'; dmgText.style.opacity = '1';

        if (dUnit === leftUnit) { 
            leftHp = Math.max(0, leftHp - damageVal); document.getElementById('hud-l-hp-text').innerText = `${leftHp} / ${leftUnit.maxHp||leftUnit.hp}`; document.getElementById('hud-l-hp-bar').style.width = `${(leftHp / (leftUnit.maxHp||leftUnit.hp)) * 100}%`;
        } else { 
            rightHp = Math.max(0, rightHp - damageVal); document.getElementById('hud-r-hp-text').innerText = `${rightHp} / ${rightUnit.maxHp||rightUnit.hp}`; document.getElementById('hud-r-hp-bar').style.width = `${(rightHp / (rightUnit.maxHp||rightUnit.hp)) * 100}%`;
        }
        await window.wait(1000);
        fxDiv.remove(); dmgText.style.transform = 'translate(-50%,-50%) scale(0)'; dmgText.style.opacity = '0'; stage.innerHTML = '';
    };

    await window.wait(200); await playAnimPhase(act, def, damageVal, skill, false);
    if (canCounter) { await window.wait(200); await playAnimPhase(def, act, counterDmg, counterSkill, true); }
    cutUi.style.opacity = '0'; await window.wait(200); cutUi.remove();
};

window.executeDefenseBattle = async function(attacker, defender, actSkill) {
    let dmg = Math.max(1, Math.floor(attacker.atk * actSkill.power) - Math.floor((defender.def || 0) * 0.5));
    let canCounter = false; let counterDmg = 0; let counterSkill = null;
    if (defender.hp - dmg > 0 && defender.team !== 'facility') {
        let dist = Math.abs(attacker.gridX - defender.gridX) + Math.abs(attacker.gridY - defender.gridY);
        let usableCounterSkills = defender.skills.filter(s => s.range >= dist);
        if (usableCounterSkills.length > 0) {
            canCounter = true; usableCounterSkills.sort((a,b) => b.power - a.power); counterSkill = usableCounterSkills[0];
            counterDmg = Math.max(1, Math.floor(defender.atk * counterSkill.power) - Math.floor((attacker.def || 0) * 0.5));
        }
    }

    if (window.DEFENSE_STATE.animMode) await window.showDefenseCutscene(attacker, defender, dmg, actSkill, canCounter, counterDmg, counterSkill);

    defender.hp -= dmg;
    let color = attacker.team === 'player' ? '#4CAF50' : '#ff5252';
    window.addDefenseLog(`<span style="color:${color};">${attacker.name}の『${actSkill.name}』！ ${defender.name} に ${dmg} のダメージ！</span>`);

    if (!window.DEFENSE_STATE.animMode) {
        let mainUi = document.getElementById('main-container'); if (mainUi) { mainUi.classList.add('arena-shake'); setTimeout(() => mainUi.classList.remove('arena-shake'), 300); }
        let pos = window.getGridPixelPos(defender.gridX, defender.gridY);
        if (typeof floatingTexts !== 'undefined') floatingTexts.push({ text: `-${dmg}`, x: pos.x, y: pos.y - 50, color: "#ff5252", life: 60, dy: -1 });
        attacker.visualAction = 'move'; await window.wait(300); attacker.visualAction = 'idle'; await window.wait(200);
    }

    if (canCounter) {
        attacker.hp -= counterDmg;
        let cColor = defender.team === 'player' ? '#4CAF50' : '#ff5252';
        window.addDefenseLog(`<span style="color:${cColor};">${defender.name}の反撃『${counterSkill.name}』！ ${attacker.name} に ${counterDmg} のダメージ！</span>`);
        if (!window.DEFENSE_STATE.animMode) {
            let pos = window.getGridPixelPos(attacker.gridX, attacker.gridY);
            if (typeof floatingTexts !== 'undefined') floatingTexts.push({ text: `-${counterDmg}`, x: pos.x, y: pos.y - 50, color: "#ff5252", life: 60, dy: -1 });
            defender.visualAction = 'move'; await window.wait(300); defender.visualAction = 'idle'; await window.wait(200);
        }
    }

    const checkDeath = async (unit) => {
        if (unit.hp <= 0) {
            window.addDefenseLog(`<span style="color:#FFC107; font-weight:bold;">${unit.name} は撃破された...！</span>`);
            if (unit.type === 'castle' && window.DEFENSE_STATE.mode !== 'mock') {
                window.DEFENSE_STATE.isActive = false; setTimeout(() => { window.endDefenseBattle(false); }, 1000);
            } else if (unit.team === 'enemy') {
                let aliveEnemies = window.DEFENSE_STATE.enemies.filter(e => e.hp > 0);
                let cfg = window.DEFENSE_STATE.waveConfig;
                
                if (aliveEnemies.length === 0) {
                    if (window.DEFENSE_STATE.mode === 'mock') {
                        window.DEFENSE_STATE.isActive = false; setTimeout(() => { window.endDefenseBattle(true); }, 1000);
                    } else if (window.DEFENSE_STATE.mode === 'endless') {
                        window.aiPet.currentEndlessWave++;
                        cfg.spawnedSoFar = 0; 
                        await window.showDefenseMessage(`WAVE ${window.aiPet.currentEndlessWave} 到達！`, "#E040FB");
                        window.addDefenseLog(`【WAVE CLEAR】 さらに強力な敵が接近中...！`);
                        await window.wait(1000);
                        await window.spawnReinforcements(3 + Math.floor(window.aiPet.currentEndlessWave / 2));
                    } else {
                        if (cfg.spawnedSoFar >= cfg.totalToSpawn) { 
                            window.DEFENSE_STATE.isActive = false; setTimeout(() => { window.endDefenseBattle(true); }, 1000); 
                        }
                    }
                }
            } else if (unit.team === 'player' && (window.DEFENSE_STATE.mode === 'endless' || window.DEFENSE_STATE.mode === 'mock')) {
                let alivePlayers = window.DEFENSE_STATE.deployedParty.filter(p => p.hp > 0);
                if (alivePlayers.length === 0) {
                    window.DEFENSE_STATE.isActive = false; setTimeout(() => { window.endDefenseBattle(false); }, 1000);
                }
            }
        }
    };
    await checkDeath(defender);
    if (canCounter && window.DEFENSE_STATE.isActive) await checkDeath(attacker);
};

window.endDefenseBattle = async function(isWin) {
    if (window.DEFENSE_STATE.emergencyTimer) clearInterval(window.DEFENSE_STATE.emergencyTimer);
    window.DEFENSE_STATE.isActive = false;
    await window.wait(500);
    
    let overlay = document.createElement('div'); overlay.id = 'def-result-overlay';
    overlay.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:80000; display:flex; justify-content:center; align-items:center; flex-direction:column; font-family:sans-serif;`;
    document.body.appendChild(overlay);

    if (window.DEFENSE_STATE.mode === 'mock') {
        let tName = window.DEFENSE_STATE.mockTarget ? window.DEFENSE_STATE.mockTarget.playerName : "ライバル";
        overlay.innerHTML = `
            <div style="background:#222; border:4px solid #00E5FF; border-radius:12px; padding:40px; text-align:center; box-shadow:0 0 30px #00E5FF; width:80%; max-width:600px;">
                <h1 style="color:#00E5FF; font-size:36px; margin-bottom:10px;">${isWin ? '🎉 模擬戦 勝利！' : '💀 模擬戦 敗北...'}</h1>
                <p style="color:#fff; font-size:18px; margin-bottom:30px;">${tName} のパーティとの戦闘訓練が終了しました。</p>
                <button onclick="window.closeDefenseResult(); window.openArenaReception();" style="padding:15px 50px; font-size:22px; font-weight:bold; background:#004D40; color:white; border:none; border-radius:8px; cursor:pointer;">受付へ戻る</button>
            </div>
        `;
    } else if (window.DEFENSE_STATE.mode === 'endless') {
        let reachedWave = window.aiPet.currentEndlessWave || 1;
        let bestRecord = window.aiPet.bestEndlessWave || 0;
        let isNewRecord = reachedWave > bestRecord;
        if (isNewRecord) window.aiPet.bestEndlessWave = reachedWave; 
        
        overlay.innerHTML = `
            <div style="background:#222; border:4px solid #E040FB; border-radius:12px; padding:40px; text-align:center; box-shadow:0 0 30px #E040FB; width:80%; max-width:600px;">
                <h1 style="color:#E040FB; font-size:36px; margin-bottom:10px;">💀 全滅...サバイバル終了 💀</h1>
                <p style="color:#fff; font-size:18px; margin-bottom:30px;">圧倒的な戦力の前に、防衛部隊は倒れました。</p>
                <div style="background:#111; border:2px solid #555; border-radius:8px; padding:20px; margin-bottom:30px;">
                    <div style="color:#aaa; font-size:16px;">到達ウェーブ</div>
                    <div style="color:#FFD700; font-size:42px; font-weight:bold; text-shadow:0 0 10px #FFD700;">WAVE ${reachedWave}</div>
                    ${isNewRecord ? `<div style="color:#ff5252; font-weight:bold; margin-top:10px; animation:shake-hit 0.5s infinite;">🏆 NEW RECORD!</div>` : ''}
                </div>
                <button onclick="window.closeDefenseResult()" style="padding:15px 50px; font-size:22px; font-weight:bold; background:#4A148C; color:white; border:none; border-radius:8px; cursor:pointer;">島へ戻る</button>
            </div>
        `;
    } else {
        if (isWin) {
            window.aiPet.defenseWave = (window.aiPet.defenseWave || 1) + 1; window.showDefenseResultUI(overlay);
        } else {
            window.showRebuildUI(overlay);
        }
    }
};

window.showDefenseResultUI = function(overlay) {
    let currentWave = window.aiPet.defenseWave - 1;
    overlay.innerHTML = `
        <div style="background:#222; border:4px solid #FFD700; border-radius:12px; padding:40px; text-align:center; box-shadow:0 0 30px #FFD700; width:80%; max-width:600px;">
            <h1 style="color:#FFD700; font-size:40px; margin-bottom:10px;">🎖️ 防衛成功！ 🎖️</h1>
            <p style="color:#fff; font-size:20px; margin-bottom:30px;">見事、魔物の群れから島を守り抜きました！</p>
            <div style="background:#111; border:2px solid #555; border-radius:8px; padding:20px; margin-bottom:30px;">
                <div style="color:#aaa; font-size:16px;">クリアしたウェーブ</div><div style="color:#FF5252; font-size:36px; font-weight:bold;">WAVE ${currentWave}</div>
            </div>
            <button onclick="window.closeDefenseResult()" style="padding:15px 50px; font-size:22px; font-weight:bold; background:#2196F3; color:white; border:none; border-radius:8px; cursor:pointer;">島へ戻る</button>
        </div>
    `;
};

window.showRebuildUI = function(overlay) {
    let destroyed = window.DEFENSE_STATE.facilities.filter(f => f.hp <= 0);
    let currentMoney = window.money !== undefined ? window.money : (window.aiPet && window.aiPet.money ? window.aiPet.money : 0);

    if (destroyed.length === 0) {
        overlay.innerHTML = `<div style="background:#222; border:4px solid #F44336; border-radius:12px; padding:40px; text-align:center;"><h1 style="color:#F44336;">防衛戦終了</h1><p style="color:#fff;">破壊された施設はありませんでした。</p><button onclick="window.closeDefenseResult()" style="padding:15px 40px; font-size:20px; cursor:pointer;">島へ戻る</button></div>`;
        return;
    }

    let listHtml = destroyed.map(f => {
        let conf = window.DEFENSE_CONFIG.facilities[f.type]; let cost = conf ? conf.rebuildCost : 5000;
        return `<label style="display:flex; justify-content:space-between; align-items:center; background:#1a1a1a; padding:15px; border:1px solid #444; border-radius:6px; margin-bottom:10px; cursor:pointer;"><div style="display:flex; align-items:center; gap:15px;"><input type="checkbox" class="rebuild-checkbox" data-id="${f.id}" data-cost="${cost}" onchange="window.updateRebuildCost()" style="width:20px; height:20px; cursor:pointer;"><span style="color:#fff; font-size:18px; font-weight:bold;">${f.name}</span></div><div style="color:#FFC107; font-size:18px;">${cost} G</div></label>`;
    }).join('');

    overlay.innerHTML = `
        <div style="background:#222; border:4px solid #F44336; border-radius:12px; padding:40px; text-align:center; box-shadow:0 0 30px #F44336; width:90%; max-width:700px; max-height:90vh; overflow-y:auto;">
            <h1 style="color:#F44336; font-size:36px; margin-bottom:10px;">☠️ 島が荒れ果ててしまった... ☠️</h1>
            <p style="color:#ccc; font-size:16px; margin-bottom:20px;">魔物の攻撃により、いくつかの施設が破壊されました。<br>所持金を支払うことで直ちに復興できますが、<strong style="color:#ff5252;">復興しない施設は島から完全に消滅します。</strong></p>
            <div style="text-align:right; color:#fff; font-size:18px; margin-bottom:10px;">現在の所持金：<span style="color:#FFC107;">${currentMoney} G</span></div>
            <div style="background:#111; padding:15px; border-radius:8px; margin-bottom:20px; max-height:300px; overflow-y:auto; text-align:left;">${listHtml}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; background:#333; padding:15px; border-radius:8px; margin-bottom:30px;">
                <div style="color:#fff; font-size:20px;">復興費用の合計：</div><div id="rebuild-total-cost" style="color:#FFC107; font-size:28px; font-weight:bold;">0 G</div>
            </div>
            <div style="display:flex; gap:20px; justify-content:center;">
                <button id="btn-rebuild-exec" onclick="window.executeRebuild()" style="padding:15px 30px; font-size:20px; font-weight:bold; background:#4CAF50; color:white; border:none; border-radius:8px; cursor:pointer;">選択した施設を復興</button>
                <button onclick="window.executeAbandon()" style="padding:15px 30px; font-size:20px; font-weight:bold; background:#444; color:#aaa; border:2px solid #666; border-radius:8px; cursor:pointer;">復興を諦める</button>
            </div>
        </div>
    `;
};

window.updateRebuildCost = function() {
    let checkboxes = document.querySelectorAll('.rebuild-checkbox'); let total = 0;
    checkboxes.forEach(cb => { if (cb.checked) total += parseInt(cb.dataset.cost); });
    let currentMoney = window.money !== undefined ? window.money : (window.aiPet && window.aiPet.money ? window.aiPet.money : 0);
    let costText = document.getElementById('rebuild-total-cost'); let execBtn = document.getElementById('btn-rebuild-exec');
    costText.innerText = `${total} G`;
    if (total > currentMoney) { costText.style.color = '#ff5252'; execBtn.style.opacity = '0.5'; execBtn.style.pointerEvents = 'none'; execBtn.innerText = '所持金が足りません'; } 
    else { costText.style.color = '#FFC107'; execBtn.style.opacity = '1'; execBtn.style.pointerEvents = 'auto'; execBtn.innerText = '選択した施設を復興'; }
};

window.executeRebuild = function() {
    let checkboxes = document.querySelectorAll('.rebuild-checkbox'); let totalCost = 0; let toDelete = [];
    checkboxes.forEach(cb => { if (cb.checked) totalCost += parseInt(cb.dataset.cost); else toDelete.push(cb.dataset.id); });
    let currentMoney = window.money !== undefined ? window.money : (window.aiPet && window.aiPet.money ? window.aiPet.money : 0);
    if (totalCost > currentMoney) return; 
    
    if (typeof window.money !== 'undefined') window.money -= totalCost;
    else if (window.aiPet && typeof window.aiPet.money !== 'undefined') window.aiPet.money -= totalCost;
    if (typeof updateStatusUI === 'function') updateStatusUI();

    let currentAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
    toDelete.forEach(id => { if (currentAssets && currentAssets[id]) delete currentAssets[id]; });
    
    if (totalCost > 0) alert(`${totalCost}G 支払って施設を復興しました！\n（チェックしなかった施設は消滅しました）`);
    else if (toDelete.length > 0) alert("破壊された施設はすべて消滅しました...");
    window.closeDefenseResult();
};

window.executeAbandon = function() {
    if (confirm("本当にすべての復興を諦めますか？\n（破壊された施設は完全に島から消滅します）")) {
        let destroyed = window.DEFENSE_STATE.facilities.filter(f => f.hp <= 0);
        let currentAssets = (typeof assets !== 'undefined') ? assets : (window.assets || {});
        destroyed.forEach(f => { if (currentAssets && currentAssets[f.id]) delete currentAssets[f.id]; });
        alert("破壊された施設はすべて消滅しました...");
        window.closeDefenseResult();
    }
};

window.closeDefenseResult = function() {
    let overlay = document.getElementById('def-result-overlay'); if (overlay) overlay.remove();
    window._executeGiveUp(); 
};

window.giveUpDefense = function(skipConfirm = false) {
    if (skipConfirm) {
        window._executeGiveUp(); return;
    }
    
    let isMock = window.DEFENSE_STATE.mode === 'mock';
    let titleTxt = isMock ? "模擬戦の終了" : "撤退の確認";
    let descTxt = isMock ? "模擬戦を中止して受付に戻りますか？<br>（※ペナルティはありません）" : "城を捨てて撤退しますか？<br>（※城は破壊され、敗北扱いになります）";
    let btnTxt = isMock ? "中止する" : "撤退する";
    let btnColor = isMock ? "#006064" : "#b71c1c";
    let bdColor = isMock ? "#00E5FF" : "#ff5252";

    let modal = document.createElement('div');
    modal.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:90000; display:flex; justify-content:center; align-items:center;`;
    modal.innerHTML = `
        <div style="background:#222; border:3px solid ${bdColor}; border-radius:12px; padding:30px; width:80%; max-width:400px; text-align:center; color:white; font-family:sans-serif; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
            <h2 style="color:${bdColor}; margin-top:0; margin-bottom:15px; font-size:24px;">${titleTxt}</h2>
            <p style="font-size:16px; color:#ccc; margin-bottom:25px; line-height:1.5;">${descTxt}</p>
            <div style="display:flex; gap:15px; justify-content:center;">
                <button id="btn-giveup-yes" style="flex:1; padding:12px; font-size:18px; font-weight:bold; background:${btnColor}; color:white; border:none; border-radius:6px; cursor:pointer;">${btnTxt}</button>
                <button id="btn-giveup-no" style="flex:1; padding:12px; font-size:18px; font-weight:bold; background:#555; color:white; border:none; border-radius:6px; cursor:pointer;">キャンセル</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('btn-giveup-yes').onclick = () => {
        modal.remove();
        if (isMock) { window.endDefenseBattle(false); } 
        else { window._executeGiveUp(); }
    };
    document.getElementById('btn-giveup-no').onclick = () => { modal.remove(); };
};

window._executeGiveUp = function() {
    if (window.DEFENSE_STATE.emergencyTimer) clearInterval(window.DEFENSE_STATE.emergencyTimer);
    window.DEFENSE_STATE.isActive = false; window.DEFENSE_STATE.isEmergency = false; window.currentMode = 'play'; 
    let controls = document.getElementById('defense-controls'); if (controls) controls.style.display = 'none';
    let style = document.getElementById('def-hide-style'); if (style) style.innerHTML = '';
    if (typeof render === 'function') render();
};

window.renderDefenseRankingList = async function(mode = 'normal') {
    const tabNormal = document.getElementById('rank-tab-def-normal');
    const tabEndless = document.getElementById('rank-tab-def-endless');
    
    if (tabNormal && tabEndless) {
        if (mode === 'normal') {
            tabNormal.style.background = '#4CAF50'; tabNormal.style.color = '#fff'; tabNormal.style.border = 'none';
            tabEndless.style.background = '#222'; tabEndless.style.color = '#E040FB'; tabEndless.style.border = '1px solid #E040FB';
        } else {
            tabEndless.style.background = '#E040FB'; tabEndless.style.color = '#fff'; tabEndless.style.border = 'none';
            tabNormal.style.background = '#222'; tabNormal.style.color = '#4CAF50'; tabNormal.style.border = '1px solid #4CAF50';
        }
    }

    const list = document.getElementById('ranking-list-container');
    if(!list) return;
    
    list.style.display = 'block'; list.style.width = '100%';
    list.innerHTML = `<div style="text-align:center; color:#FFF; margin-top:50px; font-size:18px; font-weight:bold;">📡 防衛記録を取得中...</div>`;
    
    let detailArea = document.getElementById('ranking-detail-area');
    if (detailArea) detailArea.style.display = 'none'; 

    let rankList = [];
    let myId = localStorage.getItem('my_player_id') || 'local_me';
    let myName = (window.aiPet && window.aiPet.name) ? window.aiPet.name : '現在のAI';
    let mySkin = (window.aiPet && window.aiPet.currentSkin) ? window.aiPet.currentSkin : 'robot';
    
    let recordWave = 0;
    if (mode === 'normal') {
        recordWave = (window.aiPet && window.aiPet.defenseWave) ? window.aiPet.defenseWave - 1 : 0;
    } else {
        recordWave = (window.aiPet && window.aiPet.bestEndlessWave) ? window.aiPet.bestEndlessWave : 0;
    }

    // ★デフォルトのダミーパーティ（出撃記録がない場合）
    let pwr = Math.floor(window.aiPet.stats.power || 10); 
    let int = Math.floor(window.aiPet.stats.intel || 10);
    let myParty = window.aiPet && window.aiPet.lastDefenseParty ? window.aiPet.lastDefenseParty : [{ 
        skin: mySkin, name: myName, 
        hp: Math.floor(100 + (pwr * 2)), maxHp: Math.floor(100 + (pwr * 2)), 
        atk: Math.floor(10 + pwr * 0.5), def: Math.floor(5 + pwr * 0.2), 
        intel: int, pwr: pwr, speed: 3 
    }];
    
    if (recordWave > 0) rankList.push({ playerId: myId, playerName: myName, wave: recordWave, party: myParty });

    rankList.sort((a, b) => b.wave - a.wave);
    window.arenaRankDataCache = rankList; 

    if (!rankList || rankList.length === 0) {
        list.innerHTML = `<div style="text-align:center; color:#888; margin-top:50px; font-size:18px;">まだ記録がありません。<br>王城から出撃して島を防衛しよう！</div>`;
        return;
    }

    let html = '';
    rankList.forEach((data, index) => {
        let rankIcon = `<span style="color:#888; font-size:20px; font-weight:bold;">${index + 1}位</span>`;
        if (index === 0) rankIcon = "<span style='color:#FFD700; font-size:24px; font-weight:bold; text-shadow:0 0 5px #FFD700;'>🥇 1位</span>";
        
        let isMe = (data.playerId === myId);
        let pName = data.playerName || "名無しプレイヤー";
        if (isMe) pName = `✨ ${pName} (あなた)`;
        
        let leaderSkin = (data.party && data.party.length > 0 && data.party[0].skin) ? data.party[0].skin : 'robot';
        let typeIcon = leaderSkin.split('_')[0] === 'ghost' ? '👻' : '🤖'; 
        let petNameStr = (typeof monsterBookData !== 'undefined' && monsterBookData[leaderSkin] ? monsterBookData[leaderSkin].name : leaderSkin);

        let themeColor = mode === 'normal' ? '#4CAF50' : '#E040FB';

        html += `
            <div style="background: ${isMe ? 'rgba(76, 175, 80, 0.15)' : '#222'}; border: 2px solid ${isMe ? themeColor : '#444'}; border-radius: 8px; padding: 15px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                <div style="display:flex; align-items:center; gap:20px;">
                    <div style="width:80px; text-align:center;">${rankIcon}</div>
                    <div>
                        <div style="font-size:16px; font-weight:bold; color:${themeColor}; margin-bottom:4px;">${pName}</div>
                        <div style="font-size:14px; color:#aaa;">リーダー: ${typeIcon} ${petNameStr}</div>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:20px;">
                    <div style="font-size:32px; font-weight:bold; color:${themeColor}; text-shadow:0 2px 4px rgba(0,0,0,0.5);">WAVE ${data.wave || 1}</div>
                    <button onclick="window.startMockBattlePrep(${index})" style="background:#004D40; color:white; border:1px solid #00E5FF; border-radius:4px; padding:8px 12px; font-weight:bold; cursor:pointer; white-space:nowrap; transition:0.2s;">⚔️ 挑む</button>
                </div>
            </div>
        `;
    });
    list.innerHTML = html;
};