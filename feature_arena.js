// ==========================================
// ⚔️ エンドコンテンツ：闘技場システム (feature_arena.js)
// ==========================================

if (typeof window.DUNGEON_SPRITES !== 'undefined') {
    if (!window.DUNGEON_SPRITES["arena_robot"]) {
        window.DUNGEON_SPRITES["arena_robot"] = { "img": "robot_battle_enemy.png", "sx": 464, "sy": 67, "sw": 1854, "sh": 1370, "scale": 0.15 };
    }
    if (!window.DUNGEON_SPRITES["arena_fld_bg"]) {
        window.DUNGEON_SPRITES["arena_fld_bg"] = { "img": "battle_field.png", "sx": 0, "sy": 0, "sw": 2780, "sh": 1402, "scale": 0.5 };
    }
}

window.ARENA_ENEMIES = {
    "robot": { name: "鋼鉄のロボット", hp: 150, atk: 25, def: 10, spriteKey: "arena_robot" },
};

// ★すべての新コマンド・陣形・召喚スキルを登録
window.ARENA_SKILLS = {
    "たたかう": { type: "attack", cost: 0, power: 1.0, target: "single", name: "通常攻撃", allowedTypes: "all" },
    "かいふく": { type: "heal", cost: 10, power: 40, target: "self", name: "自己回復", allowedTypes: "all" },
    "ほのお":   { type: "magic", cost: 15, power: 1.5, target: "all", name: "灼熱の炎", allowedTypes: ["dragon", "magician", "ghost"] },
    "まもる":   { type: "defend", cost: 5, power: 0, target: "self", name: "防御態勢", allowedTypes: ["stone", "machine", "robot", "beetle"] },
    "いのる":   { type: "heal_all", cost: 20, power: 30, target: "party", name: "奇跡の祈り", allowedTypes: ["spirit", "magician", "bird", "seed"] },
    
    "うえ": { type: "move", dir: "up", cost: 0, name: "前進（前衛）", allowedTypes: "all" },
    "した": { type: "move", dir: "down", cost: 0, name: "後退（後衛）", allowedTypes: "all" },
    "ひだり": { type: "move", dir: "left", cost: 0, name: "左へ移動", allowedTypes: "all" },
    "みぎ": { type: "move", dir: "right", cost: 0, name: "右へ移動", allowedTypes: "all" },

    "筋トレ": { type: "buff", stat: "atk", cost: 5, name: "筋力アップ", allowedTypes: "all" },
    "勉強": { type: "buff", stat: "intel", cost: 5, name: "知力アップ", allowedTypes: "all" },
    "睡眠": { type: "sleep", cost: 0, name: "居眠り回復", allowedTypes: "all" },

    "冒険家": { type: "summon", master: "explore", cost: 15, name: "冒険家の呼出", allowedTypes: "all" },
    "漁師": { type: "summon", master: "fishing", cost: 15, name: "漁師の呼出", allowedTypes: "all" },
    "料理人": { type: "summon", master: "cooking", cost: 15, name: "料理人の呼出", allowedTypes: "all" },
    "農家": { type: "summon", master: "farming", cost: 15, name: "農家の呼出", allowedTypes: "all" },
    "建築士": { type: "summon", master: "building", cost: 15, name: "建築士の呼出", allowedTypes: "all" },
    "鍛冶師": { type: "summon", master: "smithing", cost: 15, name: "鍛冶師の呼出", allowedTypes: "all" },

    "建築": { type: "random_build", cost: 10, name: "即席建築", allowedTypes: "all" },
    "釣り": { type: "fishing", cost: 5, name: "フィッシング", allowedTypes: "all" },
    "探検": { type: "explore", cost: 10, name: "秘境探検", allowedTypes: "all" },
    "城":   { type: "call_rescue", cost: 20, name: "城の援軍要請", allowedTypes: "all" },
    "小屋": { type: "build_hut", cost: 10, name: "小屋立てこもり", allowedTypes: "all" },
    "橋":   { type: "build_bridge", cost: 10, name: "橋で距離を取る", allowedTypes: "all" },
    "畑":   { type: "build_farm", cost: 10, name: "畑の開墾", allowedTypes: "all" },
    
    "たべる": { type: "eat", cost: 0, name: "食料を食べる", allowedTypes: "all" },
    "そうび": { type: "equip", cost: 0, name: "武器を装備", allowedTypes: "all" },
    "はずす": { type: "unequip", cost: 0, name: "装備を外す", allowedTypes: "all" }
};

window.ARENA_STATE = {
    active: false, wave: 1, healPots: 3, party: [], enemies: [], log: [], autoMode: false, isProcessing: false,
    guests: [], farmTimer: 0
};
window.ARENA_RECEPTION_STATE = { party: [], available: [] };

// ==========================================
// 1. 受付画面
// ==========================================
window.openArenaReception = function() {
    if (typeof window.ARENA_RECEPTION_STATE === 'undefined' || !window.ARENA_RECEPTION_STATE) window.ARENA_RECEPTION_STATE = { party: [], available: [] };
    const encounterUi = document.getElementById('encounterOverlay'); if (encounterUi) encounterUi.classList.remove('active');
    const statusUi = document.getElementById('statusOverlay'); if (statusUi) statusUi.classList.remove('active');

    let ui = document.getElementById('arena-reception-ui');
    if (!ui) {
        ui = document.createElement('div'); ui.id = 'arena-reception-ui';
        ui.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(10,5,10,0.95); z-index: 50000; display: flex; flex-direction: column; align-items: center; color: white; font-family: sans-serif; overflow-y: auto;`;
        document.body.appendChild(ui);
    }
    
    let pwr = Math.floor(window.aiPet.stats.power || 10); let int = Math.floor(window.aiPet.stats.intel || 10);
    window.ARENA_RECEPTION_STATE.party = [{
        id: "me", name: window.aiPet.name || "現在のAI", skin: window.aiPet.currentSkin || 'robot',
        hp: Math.floor(100 + (pwr * 2)), maxHp: Math.floor(100 + (pwr * 2)), mp: Math.floor(int * 2), maxMp: Math.floor(int * 2),
        atk: Math.floor(10 + pwr * 0.5), def: Math.floor(5 + pwr * 0.2), intel: int,
        words: window.aiPet.apprentice && window.aiPet.apprentice.learnedWords ? [...window.aiPet.apprentice.learnedWords] : [],
        isMe: true
    }];

    window.ARENA_RECEPTION_STATE.available = [];
    let discovered = (window.aiPet && window.aiPet.discoveredMonsters) ? window.aiPet.discoveredMonsters : [];
    let savedStats = (window.aiPet && window.aiPet.savedGrazeStats) ? window.aiPet.savedGrazeStats : {};
    let pastId = 0;
    discovered.forEach(skinKey => {
        if (skinKey === window.aiPet.currentSkin) return;
        let sName = (typeof monsterBookData !== 'undefined' && monsterBookData[skinKey]) ? monsterBookData[skinKey].name : skinKey;
        let sPwr = Math.floor(Math.max(5, pwr - 5)); let sInt = Math.floor(Math.max(5, int - 5));
        let sWords = ["たたかう", "かいふく", ["ほのお", "まもる", "いのる"][Math.floor(Math.random() * 3)]];
        if (savedStats[skinKey]) {
            if (savedStats[skinKey].stats) { sPwr = Math.floor(savedStats[skinKey].stats.power || sPwr); sInt = Math.floor(savedStats[skinKey].stats.intel || sInt); }
            if (savedStats[skinKey].learnedWords && savedStats[skinKey].learnedWords.length > 0) sWords = [...savedStats[skinKey].learnedWords];
        }
        window.ARENA_RECEPTION_STATE.available.push({
            id: "past_" + pastId++, name: `幻影の${sName}`, skin: skinKey, hp: Math.floor(80 + sPwr), maxHp: Math.floor(80 + sPwr), mp: Math.floor(sInt * 2), maxMp: Math.floor(sInt * 2),
            atk: Math.floor(8 + sPwr * 0.4), def: 5, intel: sInt, words: sWords, isMe: false
        });
    });
    if (typeof window.renderArenaReception === 'function') window.renderArenaReception();
};

window.renderArenaReception = function() {
    let ui = document.getElementById('arena-reception-ui'); if (!ui) return;
    let rState = window.ARENA_RECEPTION_STATE;
    let partyHtml = rState.party.map((p, index) => `
        <div onclick="window.removeArenaPartyMember(${index})" style="background:#222; border:2px solid ${p.isMe ? '#4CAF50' : '#FFD700'}; border-radius:8px; padding:10px; width:150px; text-align:center; cursor:${p.isMe ? 'default' : 'pointer'}; position:relative;">
            <div style="font-size:16px; color:${p.isMe ? '#4CAF50' : '#FFD700'}; font-weight:bold; margin-bottom:5px;">${p.name}</div>
            <div style="font-size:12px; color:#aaa;">HP:${p.hp} / MP:${p.mp}</div>
            ${!p.isMe ? `<div style="position:absolute; top:-10px; right:-10px; background:red; color:white; border-radius:50%; width:20px; height:20px; font-weight:bold; line-height:20px;">×</div>` : ''}
        </div>
    `).join('');
    for(let i=rState.party.length; i<4; i++) partyHtml += `<div style="background:#111; border:2px dashed #555; border-radius:8px; padding:10px; width:150px; text-align:center; display:flex; align-items:center; justify-content:center; color:#555;">EMPTY</div>`;
    let availableHtml = rState.available.length > 0 ? rState.available.map((p, index) => `
        <div onclick="window.addArenaPartyMember(${index})" style="background:#1a1a1a; border:1px solid #444; border-radius:8px; padding:10px; width:140px; text-align:center; cursor:pointer;">
            <div style="font-size:14px; color:#fff; font-weight:bold; margin-bottom:5px;">${p.name}</div>
            <div style="font-size:12px; color:#888;">HP:${p.hp} / MP:${p.mp}</div>
            <div style="font-size:10px; color:#4fc3f7; margin-top:5px;">+ パーティへ</div>
        </div>
    `).join('') : `<div style="color:#888; text-align:center; width:100%; padding:20px;">図鑑に登録された仲間が見つかりません</div>`;

    ui.innerHTML = `
        <h1 style="color:#ff5252; font-size:36px; margin-top:30px; text-shadow: 0 0 10px red;">⚔️ 闘技場 受付 ⚔️</h1>
        <p style="font-size:14px; color:#ccc; margin-bottom:20px;">全滅すれば寿命が削られるデスマッチ...。挑む覚悟はあるか？</p>
        <div style="display:flex; width:90%; max-width:900px; gap:20px; margin-bottom:30px;">
            <div style="flex:1; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; border:2px solid #555;"><div style="font-size:18px; color:#4fc3f7; margin-bottom:15px; font-weight:bold; text-align:center;">▼ 出撃パーティ (最大4人)</div><div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">${partyHtml}</div></div>
            <div style="flex:1; background:rgba(0,0,0,0.5); padding:20px; border-radius:12px; border:2px solid #555; max-height: 300px; overflow-y:auto;"><div style="font-size:18px; color:#FFC107; margin-bottom:15px; font-weight:bold; text-align:center;">▼ 図鑑の仲間たち</div><div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">${availableHtml}</div></div>
        </div>
        <div style="display:flex; gap:20px;">
            <button onclick="window.commitArenaBattle()" style="padding:15px 40px; font-size:22px; font-weight:bold; background:#b71c1c; color:white; border:3px solid #ff5252; border-radius:8px; cursor:pointer; box-shadow: 0 0 15px rgba(255,0,0,0.5);">出陣する</button>
            <button onclick="document.getElementById('arena-reception-ui').style.display='none'; window.exitArenaFacility();" style="padding:15px 40px; font-size:22px; font-weight:bold; background:#444; color:white; border:3px solid #777; border-radius:8px; cursor:pointer;">やめておく</button>
        </div>
    `;
    ui.style.display = 'flex';
};

window.addArenaPartyMember = function(index) {
    if (window.ARENA_RECEPTION_STATE.party.length >= 4) { alert("パーティは最大4人までです！"); return; }
    window.ARENA_RECEPTION_STATE.party.push(window.ARENA_RECEPTION_STATE.available.splice(index, 1)[0]);
    window.renderArenaReception();
};
window.removeArenaPartyMember = function(index) {
    let member = window.ARENA_RECEPTION_STATE.party[index]; if (member.isMe) return; 
    window.ARENA_RECEPTION_STATE.party.splice(index, 1); window.ARENA_RECEPTION_STATE.available.push(member); window.renderArenaReception();
};
window.commitArenaBattle = function() {
    window.ARENA_STATE.party = JSON.parse(JSON.stringify(window.ARENA_RECEPTION_STATE.party)); 
    window.startArenaBattle();
};

// ==========================================
// 2. バトル開始演出＆画面構築
// ==========================================
window.startArenaBattle = function() {
    document.getElementById('arena-reception-ui').style.display = 'none';
    window.ARENA_STATE.wave = 1; window.ARENA_STATE.healPots = 3; window.ARENA_STATE.active = true; window.ARENA_STATE.autoMode = false; window.ARENA_STATE.isProcessing = false;
    let darkUI = document.createElement('div');
    darkUI.style.cssText = `position: fixed; top:0; left:0; width:100vw; height:100vh; background:black; z-index: 55000; display:flex; justify-content:center; align-items:center; color:#ff5252; font-size:36px; font-weight:bold; opacity:0; transition: opacity 1s;`;
    darkUI.innerText = "血湧き肉躍る狂宴の幕開けだ……！"; document.body.appendChild(darkUI);
    setTimeout(() => { darkUI.style.opacity = 1; }, 100);
    setTimeout(() => { darkUI.style.opacity = 0; setTimeout(() => { darkUI.remove(); window.initArenaBattleField(); }, 1000); }, 3000);
};

window.initArenaBattleField = function() {
    let ui = document.getElementById('arena-battle-ui');
    if (!ui) {
        ui = document.createElement('div'); ui.id = 'arena-battle-ui';
        ui.style.cssText = `position: fixed; top:0; left:0; width:100vw; height:100vh; background:url('battle_field.png') no-repeat center center; background-size:cover; z-index: 51000; display:flex; flex-direction:column; transition: box-shadow 0.1s, transform 0.1s;`;
        document.body.appendChild(ui);
    }
    ui.style.display = 'flex';
    window.startArenaWave();
};

window.startArenaWave = function() {
    let state = window.ARENA_STATE;
    state.log = [`【第 ${state.wave} 戦】 が始まった！`];
    state.autoMode = false;
    state.guests = [];
    state.farmTimer = 0;

    // ★隊列や状態・タイマーの初期化
    state.party.forEach((p, idx) => {
        p.row = 'front'; p.col = idx;
        p.buffAtk = 1.0; p.buffIntel = 1.0; p.isEquipped = false;
        p.isSleeping = false; p.shield = false; p.exploreTimer = 0; p.hutHp = 0;
    });

    state.enemies = [];
    let enemyCount = Math.min(3, 1 + Math.floor(state.wave / 2));
    let letters = ["A", "B", "C"];
    for(let i=0; i<enemyCount; i++) {
        let base = window.ARENA_ENEMIES["robot"]; 
        state.enemies.push({
            id: `e_${i}`, name: `${base.name} ${letters[i]}`, spriteKey: base.spriteKey,
            hp: base.hp + (state.wave * 20), maxHp: base.hp + (state.wave * 20), atk: base.atk + (state.wave * 5), def: base.def + (state.wave * 2)
        });
    }
    window.renderArenaBattle();
};

window.renderArenaBattle = function() {
    let ui = document.getElementById('arena-battle-ui'); if (!ui) return;
    let state = window.ARENA_STATE;

    let enemiesHtml = state.enemies.map(e => {
        let sp = (typeof window.DUNGEON_SPRITES !== 'undefined') ? window.DUNGEON_SPRITES[e.spriteKey] : null;
        let imgContent = sp ? `
            <div style="width:${sp.sw * (sp.scale||1)}px; height:${sp.sh * (sp.scale||1)}px; margin: 0 auto; position: relative; transition: all 0.2s; ${e.hp <= 0 ? 'opacity:0; transform:scale(0.5);' : ''}">
                <div class="${e.flash ? 'enemy-flash' : ''}" style="position: absolute; top: 0; left: 0; width: ${sp.sw}px; height: ${sp.sh}px; background: url('${sp.img}') -${sp.sx}px -${sp.sy}px; transform: scale(${sp.scale || 1}); transform-origin: top left;"></div>
            </div>` 
        : `<img src="robot_battle_enemy.png" class="${e.flash ? 'enemy-flash' : ''}" style="height: 250px; transition: all 0.2s; ${e.hp <= 0 ? 'opacity:0; transform:scale(0.5);' : ''}">`;

        return `<div id="ui_enemy_${e.id}" style="text-align:center; display:flex; flex-direction:column; align-items:center;">
            ${imgContent}<div style="background:rgba(0,0,0,0.7); color:white; font-weight:bold; padding:2px 8px; border-radius:4px; margin-top:10px; transition: opacity 0.2s; ${e.hp <= 0 ? 'opacity:0;' : ''}">${e.name}</div>
        </div>`;
    }).join('');

    // ★隊列UIの構築（前衛と後衛を分離、ゲストNPCも追加）
    let partyAndGuests = [];
    state.party.forEach(p => partyAndGuests.push({ ...p, isParty: true }));
    state.guests.forEach(g => {
        if (['farming', 'soldier', 'captain', 'king'].includes(g.type)) {
            let gName = g.type === 'farming' ? '🎃身代わりカボチャ' : (g.type === 'soldier' ? '⚔️城の兵士' : (g.type === 'captain' ? '🛡️城の隊長' : '👑王様'));
            partyAndGuests.push({ isParty: false, name: gName, hp: g.hp, maxHp: g.maxHp, mp: 0, maxMp: 0, row: 'front', col: 1.5, typeStr: g.type });
        }
    });

    let backRowHtml = ""; let frontRowHtml = "";
    partyAndGuests.forEach(p => {
        let isHidden = p.exploreTimer > 0;
        let wordsHtml = p.isParty ? (p.words || []).map(w => `<span style="display:inline-block; background:rgba(0,188,212,0.2); color:#00BCD4; border:1px solid #00BCD4; border-radius:4px; padding:2px 4px; margin:2px 2px 0 0; font-size:10px; white-space:nowrap;">${w}</span>`).join('') : '';
        let statusIcons = "";
        if (p.isParty) {
            if (p.buffAtk > 1.0) statusIcons += "💪"; if (p.buffIntel > 1.0) statusIcons += "🧠";
            if (p.isSleeping) statusIcons += "💤"; if (p.shield) statusIcons += "🧱"; if (p.hutHp > 0) statusIcons += "🏠";
            if (p.isEquipped) statusIcons += "🗡️";
        }
        let content = `
        <div style="order:${p.col}; width:130px; background:rgba(20,20,30,0.8); border:2px solid ${p.isParty ? '#555' : '#E91E63'}; padding:8px; border-radius:6px; display:flex; flex-direction:column; ${isHidden || p.hp <= 0 ? 'opacity:0.4;' : ''}">
            <div style="color:${p.hp <= 0 ? '#888' : (p.isParty ? '#FFD700' : '#E91E63')}; font-weight:bold; font-size:13px; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${p.name} <span style="font-size:12px;">${statusIcons}</span>
            </div>
            ${isHidden ? `<div style="color:#aaa; font-size:12px; font-weight:bold; text-align:center; margin:10px 0;">(探検中...)</div>` : `
                <div style="color:#76ff03; font-size:12px; font-weight:bold;">HP: ${Math.max(0, p.hp)}</div>
                ${p.isParty ? `<div style="color:#4fc3f7; font-size:12px; font-weight:bold; margin-bottom:4px;">MP: ${Math.max(0, p.mp)}</div>
                <div style="margin-top:auto; display:flex; flex-wrap:wrap; max-height:35px; overflow-y:auto;">${wordsHtml}</div>` : ''}
            `}
        </div>`;
        if (p.row === 'back') backRowHtml += content; else frontRowHtml += content;
    });

    let nonTargetGuestsHtml = state.guests.map(g => {
        if (['farming', 'soldier', 'captain', 'king'].includes(g.type)) return '';
        let emoji = "👤";
        if(g.type === 'explore') emoji = "🗺️"; if(g.type === 'fishing') emoji = "🎣";
        if(g.type === 'cooking') emoji = "🍲"; if(g.type === 'building') emoji = "🧱"; if(g.type === 'smithing') emoji = "🔨";
        return `<div style="background:#111; border:2px solid #E91E63; border-radius:50%; width:40px; height:40px; display:flex; justify-content:center; align-items:center; font-size:24px; box-shadow:0 0 10px #E91E63; margin-right:10px;" title="${g.type}">${emoji}</div>`;
    }).join('');

    let logHtml = state.log.slice(-4).map(l => `<div style="margin-bottom:4px;">${l}</div>`).join('');
    let isBusy = state.isProcessing || state.autoMode;

    ui.innerHTML = `
        <div style="position:absolute; top:20px; left:20px; background:rgba(0,0,0,0.7); color:white; padding:10px 20px; border-radius:8px; font-size:24px; font-weight:bold; border:2px solid #FFC107;">WAVE ${state.wave}</div>
        <div style="flex:1; display:flex; justify-content:center; align-items:center; gap:20px; padding-top:50px;">${enemiesHtml}</div>
        
        <div style="height:230px; background:rgba(0,0,0,0.85); border-top:4px solid #FFF; display:flex; padding:10px; gap:10px; position:relative;">
            <div style="position:absolute; top:-50px; right:20px; display:flex;">${nonTargetGuestsHtml}</div>
            <div style="flex:2; border:2px solid #444; border-radius:8px; padding:10px; font-size:16px; color:#FFF; line-height:1.5; overflow-y:hidden; display:flex; flex-direction:column; justify-content:flex-end;">${logHtml}</div>
            
            <div style="flex:4; display:flex; flex-direction:column; justify-content:center; gap:5px; border:1px solid #333; border-radius:8px; background:#111; padding:5px;">
                <div style="display:flex; justify-content:center; gap:10px; min-height:85px; align-items:center;">${backRowHtml}</div>
                <div style="display:flex; justify-content:center; gap:10px; min-height:85px; align-items:center;">${frontRowHtml}</div>
            </div>
            
            <div style="flex:1.5; display:flex; flex-direction:column; justify-content:center; gap:10px;">
                <button onclick="window.processArenaTurn()" ${isBusy ? 'disabled' : ''} style="padding:15px; font-size:18px; font-weight:bold; background:${isBusy ? '#555' : '#4CAF50'}; color:white; border:3px solid #FFF; border-radius:8px; cursor:${isBusy ? 'not-allowed' : 'pointer'};">▶ 1ターン</button>
                <button onclick="window.toggleArenaAuto()" ${state.isProcessing && !state.autoMode ? 'disabled' : ''} style="padding:15px; font-size:18px; font-weight:bold; background:${state.autoMode ? '#FF9800' : (state.isProcessing ? '#555' : '#2196F3')}; color:white; border:3px solid #FFF; border-radius:8px; cursor:${state.isProcessing && !state.autoMode ? 'not-allowed' : 'pointer'};">${state.autoMode ? '⏸ AUTO停止' : '⏩ AUTO進行'}</button>
            </div>
        </div>
    `;
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
window.toggleArenaAuto = function() { let state = window.ARENA_STATE; state.autoMode = !state.autoMode; window.renderArenaBattle(); if (state.autoMode && !state.isProcessing) window.processArenaTurn(); };

// 本格RPGエフェクト関数
window.showArenaEffect = function(targetId, typeStr) {
    let eDiv = document.getElementById(`ui_enemy_${targetId}`); if(!eDiv) return;
    eDiv.style.position = 'relative';
    let fxContainer = document.createElement('div'); fxContainer.style.cssText = `position:absolute; top:50%; left:50%; width:100px; height:100px; transform:translate(-50%, -50%); z-index:100; pointer-events:none;`; eDiv.appendChild(fxContainer);
    if (typeStr === 'beetle' || typeStr === 'seed') {
        let color = typeStr === 'seed' ? '#4CAF50' : '#FFF'; let shadow = typeStr === 'seed' ? '#8BC34A' : '#FFD700';
        let line1 = document.createElement('div'); let line2 = document.createElement('div');
        let baseStyle = `position:absolute; top:50%; left:50%; width:140px; height:6px; background:${color}; box-shadow:0 0 10px ${shadow}, 0 0 20px ${shadow}; border-radius:50%; transform-origin:center; opacity:0;`;
        line1.style.cssText = baseStyle + `transform:translate(-50%, -50%) rotate(45deg) scaleX(0); transition:transform 0.1s ease-out, opacity 0.1s;`; line2.style.cssText = baseStyle + `transform:translate(-50%, -50%) rotate(-45deg) scaleX(0); transition:transform 0.1s ease-out 0.05s, opacity 0.1s 0.05s;`;
        fxContainer.appendChild(line1); fxContainer.appendChild(line2);
        setTimeout(() => { line1.style.transform = 'translate(-50%, -50%) rotate(45deg) scaleX(1)'; line1.style.opacity = '1'; }, 10); setTimeout(() => { line2.style.transform = 'translate(-50%, -50%) rotate(-45deg) scaleX(1)'; line2.style.opacity = '1'; }, 60); setTimeout(() => { line1.style.opacity = '0'; line2.style.opacity = '0'; }, 200);
    } else if (typeStr === 'robot' || typeStr === 'stone') {
        let color = typeStr === 'robot' ? '#FF5722' : '#795548'; let blast = document.createElement('div');
        blast.style.cssText = `position:absolute; top:50%; left:50%; width:30px; height:30px; background:${color}; border-radius:50%; box-shadow:0 0 30px #FFC107, 0 0 50px #FF5252; transform:translate(-50%, -50%) scale(0.5); opacity:1; transition:all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);`; fxContainer.appendChild(blast);
        let spikes = document.createElement('div'); spikes.style.cssText = `position:absolute; top:50%; left:50%; width:120px; height:120px; background:repeating-conic-gradient(from 0deg, transparent 0deg 20deg, #FFEB3B 20deg 30deg); transform:translate(-50%, -50%) scale(0); opacity:1; border-radius:50%; transition:all 0.15s ease-out; mask-image:radial-gradient(circle, transparent 20%, black 70%); -webkit-mask-image:radial-gradient(circle, transparent 20%, black 70%);`; fxContainer.appendChild(spikes);
        setTimeout(() => { blast.style.transform = 'translate(-50%, -50%) scale(4)'; blast.style.opacity = '0'; spikes.style.transform = 'translate(-50%, -50%) scale(1.5)'; spikes.style.opacity = '0'; }, 10);
    } else if (typeStr === 'magician' || typeStr === 'ghost') {
        let color = typeStr === 'magician' ? '#E040FB' : '#673AB7'; let ring = document.createElement('div'); ring.style.cssText = `position:absolute; top:50%; left:50%; width:10px; height:10px; border:6px solid ${color}; border-radius:50%; box-shadow:0 0 20px ${color} inset, 0 0 20px ${color}; transform:translate(-50%, -50%) scale(12); opacity:0; transition:all 0.2s ease-in;`; fxContainer.appendChild(ring);
        let core = document.createElement('div'); core.style.cssText = `position:absolute; top:50%; left:50%; width:80px; height:80px; background:${color}; border-radius:50%; filter:blur(12px); transform:translate(-50%, -50%) scale(0); opacity:0; transition:all 0.15s ease-out 0.2s;`; fxContainer.appendChild(core);
        setTimeout(() => { ring.style.transform = 'translate(-50%, -50%) scale(0.5)'; ring.style.opacity = '1'; }, 10); setTimeout(() => { ring.style.opacity = '0'; core.style.transform = 'translate(-50%, -50%) scale(1.5)'; core.style.opacity = '1'; }, 200); setTimeout(() => { core.style.opacity = '0'; }, 350);
    } else if (typeStr === 'dragon') {
        let fire = document.createElement('div'); fire.style.cssText = `position:absolute; bottom:0; left:50%; width:90px; height:0px; background:linear-gradient(to top, #FFEB3B, #FF9800, #F44336, transparent); filter:blur(4px); transform:translateX(-50%); border-radius:40px 40px 0 0; transition:height 0.2s ease-out, opacity 0.2s ease-out 0.1s; opacity:1;`; fxContainer.appendChild(fire);
        setTimeout(() => { fire.style.height = '140px'; }, 10); setTimeout(() => { fire.style.opacity = '0'; }, 250);
    } else if (typeStr === 'spirit' || typeStr === 'bird' || typeStr === 'balloon') {
        let color = typeStr === 'spirit' ? '#00BCD4' : (typeStr === 'bird' ? '#81D4FA' : '#FFFFFF'); let wave = document.createElement('div'); wave.style.cssText = `position:absolute; top:50%; left:50%; width:20px; height:20px; border:6px solid ${color}; border-radius:50%; box-shadow:0 0 15px ${color}; transform:translate(-50%, -50%) scale(0.5); opacity:1; transition:all 0.25s ease-out;`; fxContainer.appendChild(wave);
        let wave2 = document.createElement('div'); wave2.style.cssText = `position:absolute; top:50%; left:50%; width:20px; height:20px; border:3px solid ${color}; border-radius:50%; transform:translate(-50%, -50%) scale(0.5); opacity:1; transition:all 0.3s ease-out 0.05s;`; fxContainer.appendChild(wave2);
        setTimeout(() => { wave.style.transform = 'translate(-50%, -50%) scale(7)'; wave.style.opacity = '0'; wave2.style.transform = 'translate(-50%, -50%) scale(9)'; wave2.style.opacity = '0'; }, 10);
    } else if (typeStr === 'machine') {
        let bolt = document.createElement('div'); bolt.style.cssText = `position:absolute; top:50%; left:50%; width:100px; height:100px; transform:translate(-50%, -50%);`; bolt.innerHTML = `<svg viewBox="0 0 100 100" style="width:100%; height:100%; filter:drop-shadow(0 0 8px #FFEB3B);"><polyline points="50,0 35,45 65,45 50,100" fill="none" stroke="#FFF" stroke-width="8" stroke-linejoin="miter"/></svg>`; bolt.style.opacity = '0'; bolt.style.transition = 'opacity 0.05s'; fxContainer.appendChild(bolt);
        setTimeout(() => { bolt.style.opacity = '1'; }, 10); setTimeout(() => { bolt.style.opacity = '0'; }, 60); setTimeout(() => { bolt.style.opacity = '1'; }, 100); setTimeout(() => { bolt.style.opacity = '0'; }, 180);
    } else {
        let hit = document.createElement('div'); hit.style.cssText = `position:absolute; top:50%; left:50%; width:80px; height:80px; background:radial-gradient(circle, #FFF 10%, #FF9800 50%, transparent 80%); transform:translate(-50%, -50%) scale(0); opacity:1; transition:all 0.15s ease-out;`; fxContainer.appendChild(hit);
        setTimeout(() => { hit.style.transform = 'translate(-50%, -50%) scale(2)'; hit.style.opacity = '0'; }, 10);
    }
    setTimeout(() => { fxContainer.remove(); }, 600);
};

// ★究極改修：全システムを統括する最強のターン処理
window.processArenaTurn = async function() {
    let state = window.ARENA_STATE;
    if (state.isProcessing) return;
    state.isProcessing = true;

    // --- ① ターン開始時：タイマー・ゲスト処理 ---
    let startLogs = [];
    
    // 畑の処理
    if (state.farmTimer > 0) {
        state.farmTimer--;
        if (state.farmTimer === 0) {
            if (Math.random() < 0.3) {
                startLogs.push(`しかし、設置した畑は虫に食い荒らされていた...(失敗)`);
            } else {
                state.party.forEach(p => { if(p.hp > 0){ p.hp = Math.min(p.maxHp, p.hp + 50); p.buffAtk += 0.2; }});
                startLogs.push(`【大豊作！】畑から作物が供給され、味方全員の体力回復＆攻撃アップ！🌱`);
            }
        }
    }

    for (let p of state.party) {
        if (p.hp <= 0) continue;
        
        // 探検タイマー
        if (p.exploreTimer > 0) {
            p.exploreTimer--;
            if (p.exploreTimer === 0) {
                if (p.exploreOriginalTurn === 2) {
                    p.hp = Math.min(p.maxHp, p.hp + 30); p.mp = Math.min(p.maxMp, p.mp + 20);
                    startLogs.push(`${p.name} が探検から帰還！見つけた食料で回復した！🍖`);
                } else if (p.exploreOriginalTurn === 3) {
                    let aliveEnemies = state.enemies.filter(e => e.hp > 0);
                    if (aliveEnemies.length > 0) {
                        let t = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                        t.hp -= 40; t.flash = true;
                        startLogs.push(`${p.name} が探検から帰還！拾った丸太を ${t.name} に投げつけ 40 ダメージ！🪵`);
                        setTimeout(()=>{ t.flash = false; window.renderArenaBattle(); }, 150);
                    }
                } else if (p.exploreOriginalTurn >= 4) {
                    state.party.forEach(pt => { pt.buffAtk += 0.5; pt.buffIntel += 0.5; });
                    startLogs.push(`【奇跡】${p.name} が探検から帰還！大いなる財宝の力で味方全員が超強化！💎`);
                }
            }
        }
        
        // 睡眠回復
        if (p.isSleeping && p.exploreTimer === 0) {
            p.hp = Math.min(p.maxHp, p.hp + Math.floor(p.maxHp * 0.2)); p.mp = Math.min(p.maxMp, p.mp + 15);
            startLogs.push(`${p.name} は眠って体力・MPを回復した！(💤)`);
        }
        // 小屋回復
        if (p.hutHp > 0 && p.exploreTimer === 0 && !p.isSleeping) {
            p.hp = Math.min(p.maxHp, p.hp + 15); p.mp = Math.min(p.maxMp, p.mp + 10);
            startLogs.push(`${p.name} は小屋の中で安全に回復した！(🏠)`);
        }
    }

    // 支援系ゲストの行動
    if (state.guests.some(g => g.type === 'cooking')) {
        state.party.forEach(p => { if(p.hp > 0 && p.exploreTimer === 0) p.hp = Math.min(p.maxHp, p.hp + 20); });
        startLogs.push(`料理人の特製スープで味方全員のHPが回復！(🍲)`);
    }
    if (state.guests.some(g => g.type === 'building')) {
        state.party.forEach(p => { if(p.hp > 0 && p.exploreTimer === 0) p.shield = true; });
        startLogs.push(`建築士が味方陣地に「防壁」を展開した！(🧱)`);
    }
    if (state.guests.some(g => g.type === 'king')) {
        state.party.forEach(p => { if(p.hp > 0) p.buffAtk += 0.1; });
        state.enemies.forEach(e => { if(e.hp > 0) e.def = Math.max(0, e.def - 2); });
        startLogs.push(`王様の号令！味方の攻撃力が上がり、敵の防御力が下がった！(👑)`);
    }

    if (startLogs.length > 0) {
        state.log.push(...startLogs.map(t => `<span style="color:#76ff03;">${t}</span>`));
        window.renderArenaBattle();
        await sleep(800);
    }

    // 攻撃系ゲストの行動
    let aliveEnemies = state.enemies.filter(e => e.hp > 0);
    for (let g of state.guests) {
        if (aliveEnemies.length === 0) break;
        let t = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        
        if (g.type === 'smithing') {
            t.hp -= 30; t.flash = true;
            state.log.push(`<span style="color:#FF9800;">鍛冶師のハンマー！ ${t.name} に 30 の固定ダメージ！(🔨)</span>`);
            window.renderArenaBattle(); await sleep(150); t.flash = false; window.renderArenaBattle(); await sleep(400);
        } else if (g.type === 'fishing') {
            t.hp -= 15; t.flash = true;
            state.log.push(`<span style="color:#00BCD4;">漁師の大物釣り！ ${t.name} に 15 のダメージ！(🎣)</span>`);
            window.renderArenaBattle(); await sleep(150); t.flash = false; window.renderArenaBattle(); await sleep(400);
        } else if (g.type === 'explore') {
            t.def = Math.max(0, t.def - 5);
            state.log.push(`<span style="color:#E040FB;">冒険家の罠！ ${t.name} の防御力が下がった！(🗺️)</span>`);
            window.renderArenaBattle(); await sleep(500);
        } else if (g.type === 'soldier') {
            t.hp -= 20; t.flash = true;
            state.log.push(`<span style="color:#FFF;">城の兵士の攻撃！ ${t.name} に 20 のダメージ！(⚔️)</span>`);
            window.renderArenaBattle(); await sleep(150); t.flash = false; window.renderArenaBattle(); await sleep(400);
        } else if (g.type === 'captain') {
            t.hp -= 35; t.flash = true;
            state.log.push(`<span style="color:#FFD700;">城の隊長の強撃！ ${t.name} に 35 のダメージ！(🛡️)</span>`);
            window.renderArenaBattle(); await sleep(150); t.flash = false; window.renderArenaBattle(); await sleep(400);
        }
    }

    // --- ② 味方パーティの行動 ---
    for (let p of state.party) {
        if (p.hp <= 0 || p.exploreTimer > 0 || p.isSleeping) continue; // 死亡・探検中・睡眠中はパス

        aliveEnemies = state.enemies.filter(e => e.hp > 0);
        if (aliveEnemies.length === 0) break;

        let skillName = p.words.length > 0 ? p.words[Math.floor(Math.random() * p.words.length)] : "たたかう";
        let skill = window.ARENA_SKILLS[skillName] || window.ARENA_SKILLS["たたかう"];
        let typeStr = p.skin.split('_')[0];

        if (skill.allowedTypes !== "all" && !skill.allowedTypes.includes(typeStr)) {
            state.log.push(`<span style="color:#4fc3f7;">${p.name} は「${skillName}」を使おうとした！</span>`); window.renderArenaBattle(); await sleep(400);
            state.log.push(`<span style="color:#aaa;">しかし、種族的に上手く扱えなかった...(失敗)</span>`); window.renderArenaBattle(); await sleep(600); continue;
        }
        if (p.mp < skill.cost) {
            state.log.push(`<span style="color:#4fc3f7;">${p.name} は「${skillName}」を使おうとした！</span>`); window.renderArenaBattle(); await sleep(400);
            state.log.push(`<span style="color:#aaa;">しかし、MPが足りない！(失敗)</span>`); window.renderArenaBattle(); await sleep(600); continue;
        }

        state.log.push(`<span style="color:#4fc3f7;">${p.name} は「${skillName}」を使った！</span>`);
        window.renderArenaBattle(); await sleep(400);
        p.mp -= skill.cost;

        // 【陣形移動スキル】
        if (skill.type === "move") {
            if (skill.dir === 'up') p.row = 'front';
            if (skill.dir === 'down') p.row = 'back';
            if (skill.dir === 'left') p.col = Math.max(0, p.col - 1);
            if (skill.dir === 'right') p.col = Math.min(3, p.col + 1);
            state.log.push(`<span style="color:#FFF;">素早く陣形を「${skill.name}」に変更した！</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        // 【バフ・睡眠スキル】
        else if (skill.type === "buff") {
            if (skill.stat === 'atk') p.buffAtk += 0.5;
            if (skill.stat === 'intel') p.buffIntel += 0.5;
            state.log.push(`<span style="color:#FFC107;">気合が入り、${skill.name}した！（効果アップ）</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "sleep") {
            p.isSleeping = true;
            state.log.push(`<span style="color:#aaa;">${p.name} は その場でぐっすり眠りについた...💤</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        // 【師匠召喚・救助スキル】
        else if (skill.type === "summon") {
            if (!state.guests.some(g => g.type === skill.master)) {
                let masterHP = skill.master === 'farming' ? 3 : 1; 
                state.guests.push({ type: skill.master, hp: masterHP, maxHp: masterHP });
                state.log.push(`<span style="color:#E91E63; font-weight:bold;">なんと！${skill.name}により師匠が駆けつけた！！</span>`);
            } else {
                state.log.push(`<span style="color:#aaa;">しかし、既に呼ばれていた！(失敗)</span>`);
            }
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "call_rescue") {
            let rTypes = ['soldier', 'soldier', 'captain', 'king'];
            let gType = rTypes[Math.floor(Math.random() * rTypes.length)];
            let gHp = gType === 'captain' ? 100 : (gType === 'soldier' ? 50 : 30);
            state.guests.push({ type: gType, hp: gHp, maxHp: gHp });
            state.log.push(`<span style="color:#FFD700; font-weight:bold;">城から援軍（${gType === 'soldier' ? '兵士' : (gType === 'captain' ? '隊長' : '王様')}）が到着した！</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        // 【特殊建築・探検・釣りスキル】
        else if (skill.type === "build_hut") {
            p.hutHp = 5;
            state.log.push(`<span style="color:#FFF;">${p.name} は頑丈な小屋に立てこもった！(🏠)</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "build_bridge") {
            state.party.forEach(pt => { if (pt.hp > 0 && pt.exploreTimer === 0) pt.row = 'back'; });
            state.log.push(`<span style="color:#00BCD4;">橋を架けて、味方全員が後衛に退避した！</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "build_farm") {
            state.farmTimer = 4;
            state.log.push(`<span style="color:#4CAF50;">急いで畑を耕した！(数ターン後に何かが起きるかも...)</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "random_build") {
            let rnd = Math.random();
            if (rnd < 0.25) { p.hutHp = 5; state.log.push(`<span style="color:#FFF;">小屋が完成し、中に立てこもった！</span>`); }
            else if (rnd < 0.5) { state.party.forEach(pt => pt.row = 'back'); state.log.push(`<span style="color:#00BCD4;">橋が完成し、全員で後衛に退避した！</span>`); }
            else if (rnd < 0.75) { state.farmTimer = 4; state.log.push(`<span style="color:#4CAF50;">畑が完成した！収穫を待とう...</span>`); }
            else { state.guests.push({ type: 'soldier', hp: 50, maxHp: 50 }); state.log.push(`<span style="color:#FFD700;">城の設備を作り、兵士を呼び込んだ！</span>`); }
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "explore") {
            p.exploreOriginalTurn = 2 + Math.floor(Math.random() * 3);
            p.exploreTimer = p.exploreOriginalTurn;
            state.log.push(`<span style="color:#E040FB;">「ちょっと探検してくる！」 ${p.name} は戦場から姿を消した...</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "fishing") {
            let r = Math.random();
            if (r < 0.33) {
                let t = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                t.hp -= 30; t.flash = true;
                state.log.push(`<span style="color:#00BCD4;">大物が釣れた！暴れる魚が ${t.name} に 30 のダメージ！🎣</span>`);
                window.renderArenaBattle(); await sleep(150); t.flash = false; window.renderArenaBattle(); await sleep(500);
            } else if (r < 0.66) {
                p.hp = Math.min(p.maxHp, p.hp + 40);
                state.log.push(`<span style="color:#76ff03;">新鮮な魚を刺身にして食べた！HP回復！🍣</span>`);
                window.renderArenaBattle(); await sleep(600);
            } else {
                state.log.push(`<span style="color:#aaa;">...空き缶が釣れた。無駄な時間を過ごした。(失敗)</span>`);
                window.renderArenaBattle(); await sleep(600);
            }
        }
        // 【アイテムスキル】
        else if (skill.type === "eat") {
            p.hp = Math.min(p.maxHp, p.hp + 50); p.mp = Math.min(p.maxMp, p.mp + 20);
            state.log.push(`<span style="color:#76ff03;">持っていた食料を食べた！HPとMPが大回復！🍖</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "equip") {
            p.buffAtk += 0.5; p.isEquipped = true;
            state.log.push(`<span style="color:#FFC107;">武器を構えた！攻撃力大幅アップ！🗡️</span>`);
            window.renderArenaBattle(); await sleep(600);
        }
        else if (skill.type === "unequip") {
            if (p.isEquipped) { p.buffAtk = Math.max(1.0, p.buffAtk - 0.5); p.isEquipped = false; state.log.push(`<span style="color:#aaa;">重い装備を外して身軽になった。</span>`); }
            else { state.log.push(`<span style="color:#aaa;">しかし何も装備していなかった。</span>`); }
            window.renderArenaBattle(); await sleep(600);
        }
        // 【攻撃・魔法スキル】
        else if (skill.type === "attack" || skill.type === "magic") {
            let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
            let targets = skill.target === "all" ? aliveEnemies : [target];
            
            for(let t of targets) { window.showArenaEffect(t.id, typeStr); }
            await sleep(350); 
            for(let t of targets) { t.flash = true; }
            window.renderArenaBattle(); await sleep(150);
            for(let t of targets) { t.flash = false; }
            window.renderArenaBattle();
            
            for(let t of targets) {
                let finalAtk = p.atk * p.buffAtk;
                if (skill.type === "magic") finalAtk = p.intel * p.buffIntel;
                let dmgMultiplier = 1.0;
                if (p.row === 'back' && skill.type === "attack") dmgMultiplier = 0.7; // 後衛の物理は威力減
                if (p.hutHp > 0) dmgMultiplier *= 0.8; // 小屋にいると威力少し減
                
                let dmg = Math.floor(finalAtk * skill.power * dmgMultiplier) - Math.floor(t.def * 0.5);
                dmg = Math.max(1, dmg); 
                t.hp -= dmg;
                state.log.push(`<span style="color:#FFF;">${t.name} に ${dmg} のダメージ！</span>`);
            }
            window.renderArenaBattle(); await sleep(700);
        } 
        // 【回復・補助スキル】
        else if (skill.type === "heal") {
            p.hp = Math.min(p.maxHp, p.hp + skill.power + Math.floor(p.intel * p.buffIntel * 0.5));
            state.log.push(`<span style="color:#76ff03;">${p.name} のHPが回復した！</span>`);
            window.renderArenaBattle(); await sleep(700);
        } else if (skill.type === "heal_all") {
            for (let pt of state.party) { if(pt.hp > 0 && pt.exploreTimer === 0) pt.hp = Math.min(pt.maxHp, pt.hp + skill.power + Math.floor(p.intel * p.buffIntel * 0.3)); }
            state.log.push(`<span style="color:#76ff03;">味方全員のHPが回復した！</span>`);
            window.renderArenaBattle(); await sleep(700);
        } else if (skill.type === "defend") {
            p.shield = true;
            state.log.push(`<span style="color:#FFF;">${p.name} は身を固めている！（次ダメージ半減）</span>`);
            window.renderArenaBattle(); await sleep(700);
        }
    }

    // --- ③ 敵の反撃（ヘイト・陣形システム） ---
    aliveEnemies = state.enemies.filter(e => e.hp > 0);
    for (let e of aliveEnemies) {
        
        // ターゲット候補の収集（生存中 ＆ 探検中ではない味方 ＋ タゲられるゲスト）
        let targets = [];
        state.party.forEach(p => { if (p.hp > 0 && p.exploreTimer === 0) targets.push({ obj: p, isGuest: false, row: p.row, col: p.col }); });
        state.guests.forEach(g => { if (g.hp > 0 && ['farming', 'soldier', 'captain', 'king'].includes(g.type)) targets.push({ obj: g, isGuest: true, type: g.type, row: 'front', col: 1.5 }); });
        
        if (targets.length === 0) break;

        // ヘイト（狙われやすさ）計算
        let hateList = targets.map(t => {
            let hate = 10;
            if (t.row === 'back') hate -= 6; // 後衛は狙われにくい
            if (t.isGuest) {
                if (t.type === 'captain') hate += 100; // 隊長は超絶タゲ引き受け
                if (t.type === 'farming') hate += 200; // カボチャは絶対狙われる
                if (t.type === 'soldier') hate += 5;
                if (t.type === 'king') hate += 5;
            } else {
                hate += (3 - t.col) * 2; // 左(0)なら+6、右(3)なら+0
            }
            return { target: t, hate: Math.max(1, hate) };
        });
        
        let totalHate = hateList.reduce((s, i) => s + i.hate, 0);
        let r = Math.random() * totalHate;
        let finalTargetData = hateList[0].target;
        for (let item of hateList) {
            r -= item.hate;
            if (r <= 0) { finalTargetData = item.target; break; }
        }

        let targetObj = finalTargetData.obj;
        let defValue = finalTargetData.isGuest ? 5 : targetObj.def;
        let dmg = Math.max(1, e.atk - Math.floor(defValue * 0.5));
        
        // 隊長の「かばう」処理（ターゲットが隊長以外の場合、確率で発動）
        let captain = state.guests.find(g => g.type === 'captain' && g.hp > 0);
        if (captain && !finalTargetData.isGuest && Math.random() < 0.5) {
            targetObj = captain;
            state.log.push(`<span style="color:#FFD700;">城の隊長が身を挺して ${finalTargetData.obj.name} をかばった！！🛡️</span>`);
            window.renderArenaBattle(); await sleep(500);
        }

        // 防御バリア・小屋のダメージカット
        if (!finalTargetData.isGuest) {
            if (targetObj.shield) {
                dmg = Math.floor(dmg / 2); targetObj.shield = false;
                state.log.push(`<span style="color:#00BCD4;">防壁がダメージを半減した！🧱</span>`);
            }
            if (targetObj.hutHp > 0) {
                dmg = Math.floor(dmg / 2); targetObj.hutHp--;
                state.log.push(`<span style="color:#FFF;">小屋がダメージを吸収した！🏠 (残り耐久:${targetObj.hutHp})</span>`);
                if(targetObj.hutHp <= 0) state.log.push(`<span style="color:#aaa;">小屋は壊れてしまった...</span>`);
            }
        }

        targetObj.hp -= dmg;
        let tName = finalTargetData.isGuest ? (targetObj.type === 'farming' ? '身代わりカボチャ' : (targetObj.type === 'soldier' ? '兵士' : (targetObj.type === 'captain' ? '隊長' : '王様'))) : targetObj.name;
        state.log.push(`<span style="color:#ff5252;">${e.name} の攻撃！ ${tName} は ${dmg} のダメージを受けた！</span>`);
        
        let ui = document.getElementById('arena-battle-ui');
        if (ui) { ui.classList.add('arena-shake', 'arena-damage-red'); setTimeout(() => ui.classList.remove('arena-shake', 'arena-damage-red'), 500); }

        window.renderArenaBattle();
        await sleep(800);
    }

    state.isProcessing = false;

    // --- ④ 勝敗判定とAUTOループ処理 ---
    let partyAlive = state.party.some(p => p.hp > 0);
    let enemyAlive = state.enemies.filter(e => e.hp > 0).length > 0;

    if (!partyAlive) {
        state.autoMode = false; window.renderArenaBattle(); await sleep(1000); window.endArena(false); 
    } else if (!enemyAlive) {
        state.log.push(`<span style="color:#FFD700; font-weight:bold;">第 ${state.wave} 戦、勝利！！</span>`);
        state.autoMode = false; window.renderArenaBattle(); await sleep(1500); window.showArenaInterval(); 
    } else {
        window.renderArenaBattle();
        if (state.autoMode && state.active) setTimeout(() => { if (window.ARENA_STATE.autoMode && window.ARENA_STATE.active) window.processArenaTurn(); }, 800);
    }
};

window.showArenaInterval = function() {
    let ui = document.getElementById('arena-interval-ui');
    if (!ui) {
        ui = document.createElement('div'); ui.id = 'arena-interval-ui';
        ui.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9); z-index: 52000; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; font-family: sans-serif;`;
        document.body.appendChild(ui);
    }
    let state = window.ARENA_STATE;

    let partyStatusHtml = state.party.map(p => `
        <div style="flex:1; background:rgba(20,20,30,0.8); border:2px solid #555; padding:10px; border-radius:6px; margin: 0 5px; min-width: 120px; ${p.hp <= 0 ? 'opacity:0.4;' : ''}">
            <div style="color:${p.hp <= 0 ? '#888' : '#FFD700'}; font-weight:bold; font-size:14px; margin-bottom:4px; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name}</div>
            <div style="color:#76ff03; font-size:13px; font-weight:bold; text-align:center;">HP: ${Math.max(0, p.hp)} / ${p.maxHp}</div>
            <div style="color:#4fc3f7; font-size:13px; font-weight:bold; text-align:center;">MP: ${Math.max(0, p.mp)} / ${p.maxMp}</div>
        </div>
    `).join('');

    ui.innerHTML = `
        <h2 style="color:#FFC107; font-size:36px; margin-bottom:10px;">🏆 第 ${state.wave} 戦 突破！</h2>
        <div style="font-size:18px; color:#ccc; margin-bottom:20px;">次の戦いへ進むか、ここで報酬を得て帰還するか選んでください。</div>
        <div style="display:flex; width:90%; max-width:800px; margin-bottom:25px; justify-content:center; flex-wrap:wrap; gap:5px;">${partyStatusHtml}</div>
        
        <div style="background:#222; padding:20px; border:2px solid #4CAF50; border-radius:8px; margin-bottom:30px; text-align:center;">
            <div style="font-size:20px; color:#4CAF50; font-weight:bold; margin-bottom:10px;">🧪 支給された回復薬: 残り ${state.healPots} 個</div>
            <button onclick="window.useArenaHeal()" ${state.healPots <= 0 ? 'disabled' : ''} style="padding:10px 20px; font-size:16px; background:${state.healPots > 0 ? '#388E3C' : '#555'}; color:white; border:none; border-radius:4px; cursor:${state.healPots > 0 ? 'pointer' : 'not-allowed'};">薬を使いパーティを全回復する</button>
        </div>

        <div style="display:flex; gap:20px;">
            <button onclick="window.nextArenaWave()" style="padding:15px 40px; font-size:22px; font-weight:bold; background:#b71c1c; color:white; border:3px solid #ff5252; border-radius:8px; cursor:pointer;">次の階級へ進む</button>
            <button onclick="window.endArena(true)" style="padding:15px 40px; font-size:22px; font-weight:bold; background:#444; color:white; border:3px solid #FF9800; border-radius:8px; cursor:pointer;">棄権して帰還する (寿命 -3)</button>
        </div>
    `;
    ui.style.display = 'flex';
};

window.useArenaHeal = function() {
    if (window.ARENA_STATE.healPots > 0) {
        window.ARENA_STATE.healPots--;
        window.ARENA_STATE.party.forEach(p => { if(p.hp > 0) { p.hp = p.maxHp; p.mp = p.maxMp; } });
        window.showArenaInterval(); window.renderArenaBattle();
    }
};
window.nextArenaWave = function() { document.getElementById('arena-interval-ui').style.display = 'none'; window.ARENA_STATE.wave++; window.startArenaWave(); };

window.endArena = function(isGiveUp) {
    let ui = document.getElementById('arena-battle-ui'); if (ui) ui.style.display = 'none';
    let intUi = document.getElementById('arena-interval-ui'); if (intUi) intUi.style.display = 'none';
    let state = window.ARENA_STATE; state.active = false; state.autoMode = false;
    let title = isGiveUp ? "🏳️ 闘技場 棄権" : "💀 闘技場 全滅...";
    let color = isGiveUp ? "#FF9800" : "#ff5252"; let penalty = isGiveUp ? 3 : 10;
    
    if (window.aiPet && typeof window.aiPet.lifespan !== 'undefined') window.aiPet.lifespan = Math.max(1, window.aiPet.lifespan - penalty);
    let rewardGold = state.wave * 500;
    if (window.aiPet) window.aiPet.gold = (window.aiPet.gold || 0) + rewardGold;
    if (typeof saveGameData === 'function') saveGameData();
    if (state.wave > 1 && typeof window.updateArenaRanking === 'function') window.updateArenaRanking(state.wave, state.party);

    let resUi = document.createElement('div');
    resUi.style.cssText = `position: fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.95); z-index: 60000; display:flex; flex-direction:column; justify-content:center; align-items:center; color:white;`;
    resUi.innerHTML = `
        <div style="background:#111; border:4px solid ${color}; padding:40px; border-radius:12px; text-align:center;">
            <h2 style="color:${color}; font-size:36px; margin-top:0;">${title}</h2>
            <div style="font-size:24px; margin-bottom:10px;">到達ウェーブ: <b>第 ${state.wave} 戦</b></div>
            <div style="color:#FFD700; font-size:20px; font-weight:bold; margin-bottom:20px;">報酬: ${rewardGold} G 獲得！</div>
            <div style="color:#aaa; font-size:16px; margin-bottom:30px; background:#222; padding:10px; border-radius:4px;">肉体の限界を超えた代償として...<br><span style="color:#ff5252; font-weight:bold;">寿命が ${penalty} 削られた！</span></div>
            <button onclick="this.parentElement.parentElement.remove(); window.exitArenaFacility();" style="padding:15px 40px; font-size:20px; background:#4CAF50; color:white; border:none; border-radius:8px; cursor:pointer;">
                城の外へ出る
            </button>
        </div>
    `;
    document.body.appendChild(resUi);
};

// ==========================================
// 5. アリーナ：ランキングUI（ワールドランキング統合版）
// ==========================================
window.renderArenaRankingList = async function() {
    const tStatus = document.getElementById('main-tab-status'); const tDungeon = document.getElementById('main-tab-dungeon'); const tArena = document.getElementById('main-tab-arena');
    if (tStatus) { tStatus.style.background = '#222'; tStatus.style.color = '#aaa'; tStatus.style.borderBottom = '3px solid transparent'; }
    if (tDungeon) { tDungeon.style.background = '#222'; tDungeon.style.color = '#aaa'; tDungeon.style.borderBottom = '3px solid transparent'; }
    if (tArena) { tArena.style.background = '#333'; tArena.style.color = '#FFF'; tArena.style.borderBottom = '3px solid #FF9800'; }

    const subStatus = document.getElementById('sub-tabs-status'); const subDungeon = document.getElementById('sub-tabs-dungeon');
    if (subStatus) subStatus.style.display = 'none'; if (subDungeon) subDungeon.style.display = 'none';

    const list = document.getElementById('ranking-list-container'); if(!list) return;
    list.innerHTML = `<div style="text-align:center; color:#aaa; margin-top:50px; font-size:18px;">📡 クラウドから闘技場の記録を取得中...</div>`;
    document.getElementById('ranking-detail-area').style.display = 'none'; 

    if (typeof window.fetchArenaRanking === 'function') {
        const rankList = await window.fetchArenaRanking(); window.arenaRankDataCache = rankList;
        if (!rankList || rankList.length === 0) { list.innerHTML = `<div style="text-align:center; color:#888; margin-top:50px; font-size:18px;">まだ記録がありません。<br>一番乗りを目指そう！</div>`; return; }

        let html = '';
        rankList.forEach((data, index) => {
            let rankIcon = `<span style="color:#888; font-size:20px; font-weight:bold;">${index + 1}位</span>`;
            if (index === 0) rankIcon = "<span style='color:#FFD700; font-size:24px; font-weight:bold; text-shadow:0 0 5px #FFD700;'>🥇 1位</span>";
            if (index === 1) rankIcon = "<span style='color:#C0C0C0; font-size:22px; font-weight:bold;'>🥈 2位</span>";
            if (index === 2) rankIcon = "<span style='color:#CD7F32; font-size:20px; font-weight:bold;'>🥉 3位</span>";

            let isMe = (data.playerId === localStorage.getItem('my_player_id')); let pName = data.playerName || "名無しプレイヤー"; if (isMe) pName = `✨ ${pName} (あなた)`;
            let leaderSkin = data.party && data.party.length > 0 ? data.party[0].skin : 'robot'; let typeIcon = leaderSkin.split('_')[0] === 'ghost' ? '👻' : '🤖'; let petNameStr = (typeof monsterBookData !== 'undefined' && monsterBookData[leaderSkin] ? monsterBookData[leaderSkin].name : leaderSkin);

            html += `
                <div style="background: ${isMe ? 'rgba(255, 152, 0, 0.15)' : '#222'}; border: 2px solid ${isMe ? '#FF9800' : '#444'}; border-radius: 8px; padding: 15px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display:flex; align-items:center; gap:20px;"><div style="width:80px; text-align:center;">${rankIcon}</div><div><div style="font-size:16px; font-weight:bold; cursor:pointer; color:#FF9800; text-decoration:underline; margin-bottom:4px;" onclick="window.openArenaPlayerDetail(${index})" title="クリックでパーティ詳細を見る">${pName}</div><div style="font-size:14px; color:#aaa;">リーダー: ${typeIcon} ${petNameStr}</div></div></div>
                    <div style="font-size:32px; font-weight:bold; color:#FF9800; text-shadow:0 2px 4px rgba(0,0,0,0.5);">WAVE ${data.wave}</div>
                </div>`;
        });
        list.innerHTML = html;
    }
};

window.openArenaPlayerDetail = function(index) {
    const detailArea = document.getElementById('ranking-detail-area'); const content = document.getElementById('ranking-detail-content'); const title = document.getElementById('ranking-detail-title');
    if(!detailArea || !content) return; const data = window.arenaRankDataCache[index]; if (!data) return;
    detailArea.style.display = 'flex'; title.innerHTML = `🏷️ ${data.playerName} のパーティ編成`;

    let partyHtml = (data.party || []).map(p => {
        let wordsHtml = (p.words || []).map(w => `<span style="display:inline-block; background:rgba(0,188,212,0.2); color:#00BCD4; border:1px solid #00BCD4; border-radius:4px; padding:2px 6px; margin:2px 4px 2px 0; font-size:11px; font-weight:bold;">${w}</span>`).join('');
        let pNameStr = typeof monsterBookData !== 'undefined' && monsterBookData[p.skin] ? monsterBookData[p.skin].name : p.skin;
        return `
            <div style="background:#1a1a1a; border:1px solid #555; border-left:4px solid ${p.isMe ? '#4CAF50' : '#FFD700'}; border-radius:6px; padding:12px; margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;"><div style="font-size:14px; font-weight:bold; color:${p.isMe ? '#4CAF50' : '#FFD700'};">${p.name} <span style="font-size:11px; color:#888;">(${pNameStr})</span></div><div style="font-size:11px; color:#76ff03; font-weight:bold;">HP: ${p.maxHp} / MP: ${p.maxMp}</div></div>
                <div style="display:flex; gap:10px; font-size:11px; color:#aaa; margin-bottom:8px; background:#222; padding:6px; border-radius:4px;"><span>⚔️ 攻撃: <span style="color:#FFF;">${p.atk}</span></span><span>🛡️ 防御: <span style="color:#FFF;">${p.def}</span></span><span>🧠 賢さ: <span style="color:#FFF;">${p.intel}</span></span></div>
                <div><div style="font-size:10px; color:#888; margin-bottom:2px;">▼ 記憶している言葉</div><div>${wordsHtml}</div></div>
            </div>`;
    }).join('');
    content.innerHTML = `<div style="font-size:18px; color:#FF9800; font-weight:bold; text-align:center; margin-bottom:15px; padding-bottom:10px; border-bottom:1px dashed #555;">到達記録: WAVE ${data.wave}</div>${partyHtml}`;
};

// ==========================================
// ★ 新規追加：闘技場（城）からAIを確実に退出させる処理
// ==========================================
window.exitArenaFacility = function() {
    if (window.aiPet) {
        // AIの状態を「退出中」に変更し、建物内のターゲットを消去する
        window.aiPet.actionState = 'exiting';
        window.aiPet.isIndoors = false;
        window.aiPet.interactionTarget = null;
        window.aiPet.indoorTarget = null;
        window.aiPet.visualAction = null;
        window.aiPet.message = "お城から出たよ！";
        window.aiPet.messageTimer = 120;
        
        // 予定リストに「城に行く」タスクが残っていれば消去する
        if (window.aiPet.schedule && window.aiPet.schedule.length > 0) {
            window.aiPet.schedule.shift(); 
        }
        
        // 画面の予定UIを更新
        if (typeof window.updateScheduleList === 'function') {
            window.updateScheduleList();
        }
    }
};