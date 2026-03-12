// ui_controller.js : UI操作 (Fixed Version v45 - Absolute UI Safety & Evolution Button Fix)

// ★追加：消えてしまっていた性格判定関数を復活！
window.getPersonalityType = function(stats) {
    if (!stats) return "普通";
    if (stats.mood <= 30) return "憂鬱";
    if (stats.power > stats.intel && stats.power > stats.beauty) return "熱血";
    if (stats.intel > stats.power && stats.intel > stats.beauty) return "知的";
    if (stats.beauty > stats.power && stats.beauty > stats.intel) return "魅惑";
    return "普通";
};

// ==========================================
// ★ 追加：いつでも呼び出せる汎用チュートリアルウィンドウ
// ==========================================
window.showGameTutorial = function(title, message, callback) {
    // 既に開いていたらスキップ
    if (document.getElementById('in-game-tutorial')) return;

    // ボタンのホバー効果用CSS
    if (!document.getElementById('tutorial-css')) {
        const style = document.createElement('style');
        style.id = 'tutorial-css';
        style.innerHTML = `.tut-btn:hover { background: #e68a00 !important; }`;
        document.head.appendChild(style);
    }

    const tutBox = document.createElement('div');
    tutBox.id = 'in-game-tutorial';
    tutBox.style.position = 'absolute';
    tutBox.style.top = '40%';
    tutBox.style.left = '50%';
    tutBox.style.transform = 'translate(-50%, -50%)';
    tutBox.style.background = 'rgba(20, 20, 20, 0.95)';
    tutBox.style.border = '2px solid #FF9800';
    tutBox.style.borderRadius = '8px';
    tutBox.style.padding = '20px';
    tutBox.style.color = '#fff';
    tutBox.style.width = '320px';
    tutBox.style.textAlign = 'center';
    tutBox.style.boxShadow = '0 0 20px rgba(255, 152, 0, 0.5)';
    tutBox.style.zIndex = '10000';

    tutBox.innerHTML = `
        <div style="color: #FF9800; font-size: 18px; font-weight: bold; margin-bottom: 10px;">📖 ${title}</div>
        <div style="font-size: 14px; line-height: 1.6; margin-bottom: 20px; color: #ddd;">
            ${message}
        </div>
        <button id="tut-close-btn" class="tut-btn" style="background: #FF9800; color: #fff; border: none; padding: 10px 30px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 15px; transition: 0.2s;">わかった！</button>
    `;
    document.body.appendChild(tutBox);

    document.getElementById('tut-close-btn').onclick = () => {
        if (tutBox.parentNode) tutBox.parentNode.removeChild(tutBox);
        if (callback) callback(); // 閉じた後に何か実行したい場合は実行
    };
};

window.switchRightPanel = function(panelId) {
    const panels = document.querySelectorAll('.panel-view');
    panels.forEach(p => p.classList.remove('active'));

    const target = document.getElementById('panel-' + panelId);
    if (target) { target.classList.add('active'); } else { document.getElementById('panel-default').classList.add('active'); }

    if (panelId === 'build') { openBuildMenuPanel(); } 
    else if (panelId === 'inventory') { openInventoryPanel(); } 
    else if (panelId === 'schedule') { updateScheduleList(); } 
    else if (panelId === 'shop') { window.updateShopList(); }
    else if (panelId === 'rescue') { window.updateRescueList(); } 
    else if (panelId === 'tavern') { window.openTavernPanel(); } // ★これを追加！
    else if (panelId === 'ranking') { window.openRankingPanel('power'); } // ★これを追加

    if (panelId !== 'shop' && typeof aiPet !== 'undefined' && aiPet.actionState === 'inside') {
        if (aiPet.indoorTarget && aiPet.indoorTarget.type === 'shop') {
            aiPet.actionState = 'exiting';
            aiPet.indoorTarget = null;
            if(aiPet.schedule && aiPet.schedule.length > 0) aiPet.schedule.shift();
        }
    }
    
    updateAIStatusText();
};

function applyTranslations() {
    const trans = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : {
        gen: "世代", age: "年齢", energy: "体力", hunger: "満腹",
        intel: "賢さ", power: "活力", mood: "機嫌", beauty: "美しさ", type: "性格", gold: "所持金", trait: "特性", weather: "天気", time: "日時"
    };
    const map = {
        'label-gen': trans.gen, 'label-age': trans.age, 'label-energy': trans.energy, 'label-hunger': trans.hunger,
        'label-intel': trans.intel, 'label-power': trans.power, 'label-mood': trans.mood, 'label-type': trans.type,
        'label-gold': trans.gold, 'label-beauty': trans.beauty, 'label-trait': trans.trait, 'label-weather': trans.weather, 'label-time': trans.time || "日時",
        'label-detail-beauty': trans.beauty // ←★これを追加！
    };
    for (let id in map) { const el = document.getElementById(id); if (el) el.innerText = map[id]; }
}

function updateAIStatusText() {
    const el = document.getElementById('ai-status-text');
    if (!el || typeof aiPet === 'undefined') return;
    
    if (aiPet.schedule && aiPet.schedule.length > 0) {
        const currentTask = aiPet.schedule[0];
        const taskName = (typeof getTaskName === 'function') ? getTaskName(currentTask.type) : currentTask.type;
        
        let timeRemaining = currentTask.duration > 0 ? currentTask.duration : 0;
        let maxTime = currentTask.maxDuration || Math.max(1, currentTask.duration);
        let progressPercent = 100 - ((timeRemaining / maxTime) * 100);
        
        // ★修正: 毎秒HTMLを壊さないよう、一度だけ枠組みを作り、あとは中身だけ書き換える
        if (el.dataset.mode !== 'active') {
             el.dataset.mode = 'active';
             el.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span id="st-task-name" style="color:#fff; font-weight:bold; font-size: 15px;"></span>
                    <span id="st-task-time" style="color:#FFC107; font-size: 12px; font-weight:bold; background: rgba(255,193,7,0.2); padding: 2px 8px; border-radius: 10px;"></span>
                </div>
                <div style="margin-top: 10px; background: #222; height: 8px; border-radius: 4px; overflow: hidden; border: 1px solid #444;">
                    <div id="st-task-bar" style="background: linear-gradient(90deg, #00bcd4, #4fc3f7); width: 0%; height: 100%; transition: width 0.5s;"></div>
                </div>
                <div id="st-task-queue" style="margin-top: 8px; font-size:11px; color:#aaa;"></div>
                <div style="margin-top: 12px; text-align: right;">
                    <button onclick="window.clearSchedule();" style="background: #d32f2f; color: white; border: 1px solid #b71c1c; padding: 5px 15px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: bold; box-shadow: 0 2px rgba(0,0,0,0.5);" onmousedown="this.style.transform='translateY(2px)'; this.style.boxShadow='none';" onmouseup="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px rgba(0,0,0,0.5)';">■ 行動を中止する</button>
                </div>
             `;
             el.parentElement.style.border = "1px solid #00bcd4";
             el.parentElement.style.boxShadow = "0 0 10px rgba(0, 188, 212, 0.2)";
        }
        
        // テキストとバーの長さだけを更新
        const nameEl = document.getElementById('st-task-name'); if(nameEl) nameEl.innerText = taskName;
        const timeEl = document.getElementById('st-task-time'); if(timeEl) timeEl.innerText = `⏳ 残り ${timeRemaining} 分`;
        const barEl = document.getElementById('st-task-bar'); if(barEl) barEl.style.width = `${progressPercent}%`;
        const queueEl = document.getElementById('st-task-queue');
        if(queueEl) {
            if (aiPet.schedule.length > 1) queueEl.innerText = `📝 待機中の予定: 他 ${aiPet.schedule.length - 1} 件`;
            else queueEl.innerText = "";
        }
    } else {
        if (el.dataset.mode !== 'idle') {
            el.dataset.mode = 'idle';
            el.innerHTML = `
                <div style="color: #aaa; text-align: center; padding: 10px 0;">
                    <div style="font-size: 24px; margin-bottom: 5px;">☕</div>
                    AIは自由に行動しています<br>
                    <span style="font-size:11px; color:#777;">（下のアクションを押して指示を出せます）</span>
                </div>
            `;
            el.parentElement.style.border = "1px solid #444";
            el.parentElement.style.boxShadow = "none";
        }
    }
}

window.openStatusMenu = function() {
    const overlay = document.getElementById('statusOverlay');
    if (!overlay || typeof aiPet === 'undefined' || !aiPet.stats) return;

    document.getElementById('s-gen').innerText = aiPet.generation || 1;
    document.getElementById('s-age').innerText = aiPet.age || 0;
    
    let pType = getPersonalityType(aiPet.stats);
    let pName = "普通";
    if (pType === 'gloom') pName = "暗い";
    else if (pType === 'scholar') pName = "学者肌";
    else if (pType === 'athlete') pName = "熱血";
    else if (pType === 'idol') pName = "アイドル";
    document.getElementById('s-type').innerText = pName;

    let skin = aiPet.currentSkin || 'robot';
    let baseType = skin.split('_')[0] || 'robot';
    let tData = (typeof charaTraits !== 'undefined') ? (charaTraits[skin] || charaTraits[baseType] || charaTraits['robot']) : null;
    
    let traitName = tData ? tData.name : "-";
    if (aiPet.apprentice && aiPet.apprentice.title) {
        traitName = `🏆${aiPet.apprentice.title} / ` + traitName;
    }
    document.getElementById('s-trait').innerText = traitName;
    
    const traitDescEl = document.getElementById('s-trait-desc');
    if (traitDescEl) traitDescEl.innerText = tData ? (tData.desc || "") : "";

    document.getElementById('status-name').innerText = (typeof monsterBookData !== 'undefined' && monsterBookData[skin]) ? monsterBookData[skin].name : "???";

    document.getElementById('s-energy').innerText = Math.floor(aiPet.energy || 0);
    document.getElementById('s-hunger').innerText = Math.floor(aiPet.hunger || 0);
    document.getElementById('s-intel').innerText = Math.floor(aiPet.stats.intel || 0);
    document.getElementById('s-power').innerText = Math.floor(aiPet.stats.power || 0);
    document.getElementById('s-mood').innerText = Math.floor(aiPet.stats.mood || 0);
    
    const beautyEl = document.getElementById('s-beauty');
    if (beautyEl) beautyEl.innerText = Math.floor(aiPet.stats.beauty || 0);

    document.getElementById('s-gold').innerText = (aiPet.gold || 0) + " G";

    const canvas = document.getElementById('statusIconCanvas');
    if (typeof drawStatusIconOnCanvas === 'function') drawStatusIconOnCanvas(canvas, skin);

    // --- 右側（ライセンス・スキル）の動的生成 ---
    const rightPanel = document.getElementById('status-right-panel');
    if (rightPanel) {
        let html = "";
        const app = aiPet.apprentice || {};
        
        // 1. 現在の専門家・課題
        html += `<div style="background: #1a1a1a; padding: 15px; border-radius: 8px; border: 1px solid #4CAF50; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">`;
        html += `<div style="color: #4CAF50; font-weight: bold; margin-bottom: 10px; font-size: 15px;">🎓 現在の専門家と課題</div>`;
        
        if (app.currentMaster) {
            const masterNames = { 'explore': '冒険家', 'farming': '農家', 'fishing': '漁師', 'cooking': '料理人', 'smithing': '鍛冶師', 'building': '建築士' };
            const mName = masterNames[app.currentMaster] || "不明";
            const rank = app.rank[app.currentMaster] || 1;
            
            html += `<div style="font-size: 13px; color: #fff; margin-bottom: 8px;">専門家: <span style="color:#FFC107; font-weight:bold;">${mName} (ランク ${rank})</span></div>`;
            
            if (app.activeQuest) {
                let progressStr = "";
                if (typeof app.qVal === 'number') {
                    let currentVal = 0; let targetVal = Math.floor(app.qVal);
                    if (app.activeQuest.desc.includes("活力")) currentVal = Math.floor(aiPet.stats.power);
                    else currentVal = app.qVal;
                    
                    if (app.activeQuest.desc.includes("活力")) progressStr = `<span style="color:#FF9800;">(現在: ${currentVal} / 目標: ${targetVal})</span>`;
                    else if (targetVal > 0) progressStr = `<span style="color:#FF9800;">(進捗: ${targetVal}回)</span>`;
                }
                html += `<div style="font-size: 12px; color: #ccc; background: #222; padding: 8px; border-radius: 4px; border-left: 3px solid #FFC107;">
                            <div style="font-weight:bold; color:#fff; margin-bottom: 3px;">📜 ${app.activeQuest.name}</div>
                            <div style="font-size: 11px; line-height: 1.4;">${app.activeQuest.desc} <br>${progressStr}</div>
                         </div>`;
            } else {
                html += `<div style="font-size: 12px; color: #888; background: #222; padding: 8px; border-radius: 4px;">現在受けている課題はありません。<br>チャットで「${mName}のところへ」と入力して課題をもらいましょう。</div>`;
            }
        } else if (app.isExcommunicated) {
            html += `<div style="font-size: 13px; color: #ff5252; font-weight: bold; background: rgba(244,67,54,0.1); padding: 10px; border-radius: 4px;">現在、破門されています...<br><span style="font-size:11px; color:#aaa; font-weight:normal;">基礎トレーニング（休憩・勉強など）を繰り返して自分を見つめ直しましょう。</span></div>`;
        } else if (app.isGraduated) {
            html += `<div style="font-size: 13px; color: #FFD700; font-weight: bold; text-align: center; padding: 10px;">✨ 免許皆伝 ✨<br><span style="font-size:11px; color:#ccc; font-weight:normal;">すべての修行を終え、立派な達人になりました！</span></div>`;
        } else {
            html += `<div style="font-size: 12px; color: #888; text-align: center; padding: 10px;">現在入門している専門家はいません。<br>フィールドを歩いて出会いを探しましょう。</div>`;
        }
        html += `</div>`;

        // 2. 職業ライセンス
        html += `<div style="background: #1a1a1a; padding: 15px; border-radius: 8px; border: 1px solid #333;">`;
        html += `<div style="color: #E040FB; font-weight: bold; margin-bottom: 10px; font-size: 14px;">🌟 職業ライセンス (入門状況)</div>`;
        html += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">`;
        
        const jobs = [
            { id: 'explore', 'name': '冒険家', icon: '⛰️' },
            { id: 'farming', 'name': '農家', icon: '🌾' },
            { id: 'fishing', 'name': '漁師', icon: '🎣' },
            { id: 'cooking', 'name': '料理人', icon: '🍳' },
            { id: 'smithing', 'name': '鍛冶師', icon: '⚒️' },
            { id: 'building', 'name': '建築士', icon: '🔨' }
        ];
        
        jobs.forEach(j => {
            const r = app.rank[j.id] || 0;
            let rankText = r === 0 ? `<span style="color:#555;">未入門</span>` : (r >= 10 ? `<span style="color:#FFD700; font-weight:bold;">皆伝!</span>` : `<span style="color:#fff;">Lv.${r}</span>`);
            let boxStyle = r >= 10 ? `border: 1px solid #FFD700; background: rgba(255,215,0,0.1);` : `border: 1px solid #444; background: #222;`;
            if (app.currentMaster === j.id) boxStyle = `border: 1px solid #4CAF50; background: rgba(76,175,80,0.1);`;
            
            html += `
            <div style="padding: 8px 10px; border-radius: 6px; ${boxStyle} display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; color: #ddd;">${j.icon} ${j.name}</span>
                <span style="font-size: 13px;">${rankText}</span>
            </div>
            `;
        });
        html += `</div></div>`;

        rightPanel.innerHTML = html;
    }

    overlay.classList.add('active');
};

function drawStatusIconOnCanvas(canvas, type) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let conf = aiConfigs[type];
    if (!conf) return;

    if (conf.img && aiConfigs[conf.img] && aiConfigs[conf.img].actions) {
        conf = aiConfigs[conf.img];
    }

    let imgKey = conf.img || type;
    let img = images[imgKey];
    if (!img) {
        const base = type.split('_')[0];
        img = images[base];
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const actionData = conf.actions['idle'];
    if (!actionData || actionData.length === 0) return;
    const f = actionData[0];

    const scale = Math.min(canvas.width / f.sw, canvas.height / f.sh) * 0.9;
    const drawW = f.sw * scale;
    const drawH = f.sh * scale;
    const dx = (canvas.width - drawW) / 2;
    const dy = (canvas.height - drawH) / 2;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, f.sx, f.sy, f.sw, f.sh, dx, dy, drawW, drawH);
}

function openBuildMenuPanel() {
    const list = document.getElementById('buildList'); if (!list) return; list.innerHTML = ""; 
    const myItems = {}; if (aiPet.inventory) aiPet.inventory.forEach(k => myItems[k] = (myItems[k] || 0) + 1);
    
    const buildLevel = (aiPet.skills && aiPet.skills.building) ? Math.floor(aiPet.skills.building) : 1;

    for(let key in buildingCatalog) {
        const b = buildingCatalog[key];
        if (b.reqBuildLevel && buildLevel < b.reqBuildLevel) continue;
        const d = document.createElement('div'); d.className = 'panel-list-item'; 
        let matStr = "";
        if (b.materials) {
            const mats = [];
            for(let mKey in b.materials) {
                const reqCount = b.materials[mKey]; const myCount = myItems[mKey] || 0;
                const mName = (itemCatalog[mKey]) ? itemCatalog[mKey].name : mKey;
                const color = (myCount >= reqCount) ? "#aaa" : "#ff5252"; 
                mats.push(`<div style="display:flex; justify-content:space-between; color:${color}; font-size:12px;"><span>${mName}</span><span>${myCount}/${reqCount}</span></div>`);
            }
            matStr = `<div style="margin-top:5px; background:rgba(0,0,0,0.2); padding:5px; border-radius:4px;">${mats.join('')}</div>`;
        }
        const intelColor = (aiPet.stats && aiPet.stats.intel >= b.reqIntel) ? "#4CAF50" : "#ff5252";
        const energyColor = (aiPet.energy >= b.cost.energy) ? "#fff" : "#ff5252";
        d.innerHTML = `<div style="font-weight:bold; color:#FFC107; margin-bottom:5px;">${b.name}</div><div style="font-size:11px; margin-bottom:5px;">賢さLv.${b.reqIntel} <span style="color:${intelColor}">(${(aiPet.stats && aiPet.stats.intel >= b.reqIntel) ? 'OK' : '不足'})</span> | 消費体力 <span style="color:${energyColor}">${b.cost.energy}</span></div>${matStr}<button class="quiz-btn" style="width:100%; margin-top:8px; font-size:12px; height:25px;" onclick="aiPet.constructBuilding('${key}');">建築する</button>`;
        list.appendChild(d);
    }
}

function openInventoryPanel() {
    const list = document.getElementById('inventoryList'); if (!list) return; list.innerHTML = "";
    let totalItems = 0;
    
    // ==========================================
    // ★ 追加：弟子入り専用インベントリ（支給品）の表示
    // ==========================================
    if (typeof aiPet !== 'undefined' && aiPet.apprentice && aiPet.apprentice.inventory && aiPet.apprentice.inventory.length > 0) {
        const counts = {}; aiPet.apprentice.inventory.forEach(k => counts[k] = (counts[k]||0)+1);
        for(let k in counts) {
            const item = (typeof itemCatalog !== 'undefined' && itemCatalog[k]) ? itemCatalog[k] : { name: k, desc: '' };
            const d = document.createElement('div'); d.className = 'panel-list-item';
            d.style.borderLeft = "4px solid #FFD700";
            d.style.backgroundColor = "rgba(255, 215, 0, 0.1)"; // 支給品専用のハイライト
            d.innerHTML = `<div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px; color:#FFD700;"><span>[支給品] ${item.name}</span> <span>x${counts[k]}</span></div><div style="font-size:10px; color:#aaa; margin-top:2px;">修業用の支給品（私的利用・売却は不可）</div>`;
            list.appendChild(d);
            totalItems++;
        }
    }

    // ==========================================
    // 通常のインベントリの表示
    // ==========================================
    if (aiPet.inventory && aiPet.inventory.length > 0) {
        const counts = {}; aiPet.inventory.forEach(k => counts[k] = (counts[k]||0)+1);
        for(let k in counts) {
            const item = (typeof itemCatalog !== 'undefined' && itemCatalog[k]) ? itemCatalog[k] : { name: k, desc: '' };
            const d = document.createElement('div'); d.className = 'panel-list-item';
            d.innerHTML = `<div style="display:flex; justify-content:space-between; font-weight:bold; font-size:13px;"><span>${item.name}</span> <span style="color:#FFD700">x${counts[k]}</span></div><div style="font-size:10px; color:#ccc; margin-top:2px;">${item.desc}</div>`;
            list.appendChild(d);
            totalItems++;
        }
    }
    
    if (totalItems === 0) { list.innerHTML = "<div style='color:#777; font-size:12px;'>何も持っていません</div>"; }
}

window.updateScheduleList = function() {
    const listEl = document.getElementById('scheduleList'); if(!listEl) return;
    if(!aiPet.schedule || aiPet.schedule.length === 0) { listEl.innerHTML = "<div style='color:#777; padding:10px; font-size:12px;'>予定はありません</div>"; } else {
        let html = ""; aiPet.schedule.forEach((task, i) => { let tName = (typeof getTaskName === 'function') ? getTaskName(task.type) : task.type; html += `<div style="border-bottom:1px solid #444; padding:8px; font-size:12px;"><span style="color:#00bcd4; font-weight:bold;">${i+1}.</span> ${tName} <span style="color:#aaa; float:right;">(${task.duration}分)</span></div>`; }); 
        listEl.innerHTML = html; 
    }
    updateAIStatusText(); 
};

window.updateRescueList = function() {
    const listEl = document.getElementById('rescueList');
    if (!listEl) return;
    listEl.innerHTML = "";
    
    const rescueItems = ['herb', 'fish_sardine', 'carrot'];
    rescueItems.forEach(key => {
        const item = itemCatalog[key]; if (!item) return;
        const price = item.value * 2; 
        const div = document.createElement('div'); div.className = 'panel-list-item';
        
        div.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;">
            <div><div style="font-weight:bold; font-size:13px;">${item.name}</div><div style="font-size:11px; color:#aaa;">${price} G (借金)</div></div>
            <button style="background:#FF9800; color:black; border:none; border-radius:4px; padding:4px 10px; cursor:pointer; font-size:12px;" 
            onclick="aiPet.rescueItem('${key}');">支給を受ける</button>
        </div>`;
        listEl.appendChild(div);
    });
    
    const goldDisplay = document.getElementById('rescue-gold-display');
    if (goldDisplay && typeof aiPet !== 'undefined') {
        goldDisplay.innerText = `所持金: ${aiPet.gold || 0} G`;
        goldDisplay.style.color = (aiPet.gold < 0) ? '#ff5252' : '#ffd700';
    }
};

window.updateShopList = function() {
    try {
        const buyList = document.getElementById('buyList'); const sellList = document.getElementById('sellList');
        if (!buyList || !sellList) return;
        sellList.innerHTML = "";
        if (!aiPet.inventory || aiPet.inventory.length === 0) { sellList.innerHTML = "<div style='color:#777; font-size:12px;'>売れるものがありません</div>"; } else {
            const counts = {}; aiPet.inventory.forEach(k => counts[k] = (counts[k]||0)+1);
            for (let k in counts) {
                const item = (typeof itemCatalog !== 'undefined') ? itemCatalog[k] : null;
                if (item) {
                    const div = document.createElement('div'); div.className = 'panel-list-item';
                    div.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><span style="font-size:13px;">${item.name} x${counts[k]}</span> <button style="background:#444; color:white; border:none; border-radius:4px; padding:4px 8px; cursor:pointer; font-size:11px;" onclick="aiPet.gold += ${item.value}; aiPet.inventory.splice(aiPet.inventory.indexOf('${k}'), 1); window.updateShopList(); updateStatUI();">売る (+${item.value}G)</button></div>`;
                    sellList.appendChild(div);
                }
            }
        }
        buyList.innerHTML = "";
        const shopItems = ['herb', 'carrot', 'tomato', 'pepper', 'fish_sardine', 'seed_carrot', 'seed_tomato', 'seed_pepper', 'wood', 'stone', 'iron', 'rod_old'];
        shopItems.forEach(key => {
            const item = (typeof itemCatalog !== 'undefined') ? itemCatalog[key] : null; if (!item) return;
            const price = item.value * 2; 
            const canAfford = ((aiPet.gold || 0) >= price); 
            const div = document.createElement('div'); div.className = 'panel-list-item';
            let btnStyle = canAfford ? "background:#4CAF50;" : "background:#555; color:#aaa;";
            let btnText = canAfford ? "買う" : "お金不足";
            let disabled = !canAfford ? "disabled" : "";
            div.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><div><div style="font-weight:bold; font-size:13px;">${item.name}</div><div style="font-size:11px; color:#aaa;">${price} G</div></div><button style="${btnStyle} border:none; border-radius:4px; padding:4px 10px; cursor:pointer; font-size:12px;" onclick="if(aiPet.buyItem('${key}')) { window.updateShopList(); updateStatUI(); }" ${disabled}>${btnText}</button></div>`;
            buyList.appendChild(div);
        });
        updateShopGold();
    } catch(e) { console.error(e); }
};

function updateShopGold() {
    const shopGold = document.getElementById('shop-gold-display');
    if (shopGold && typeof aiPet !== 'undefined') {
        shopGold.innerText = `所持金: ${aiPet.gold || 0} G`;
        shopGold.style.color = (aiPet.gold < 0) ? '#ff5252' : '#ffd700';
    }
}

function updateStatUI() {
    if (typeof aiPet === 'undefined') return;
    
    // データが空っぽならエラーにならないように即リターン（安全装置）
    if (!aiPet.stats) return; 

    const setText = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
    
    const timeEl = document.getElementById('stat-time');
    if (timeEl) {
        let hour = typeof aiPet.getCurrentHour === 'function' ? aiPet.getCurrentHour() : new Date().getHours();
        let minute = new Date().getMinutes();
        if (typeof aiPet.debugHour === 'number' && aiPet.debugHour >= 0) minute = 0; 
        let timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        let seasonStr = "🌸 春";
        if (aiPet.season === 'summer') seasonStr = "🌻 夏";
        else if (aiPet.season === 'autumn') seasonStr = "🍂 秋";
        else if (aiPet.season === 'winter') seasonStr = "⛄ 冬";
        
        timeEl.innerText = `${seasonStr} ${timeStr}`;
    }

    setText('stat-gen', aiPet.generation || 1);
    setText('stat-age', aiPet.age || 0); 
    setText('stat-energy', Math.floor(aiPet.energy || 0) + "%");
    setText('stat-hunger', Math.floor(aiPet.hunger || 0) + "%");
    setText('stat-intel', Math.floor(aiPet.stats.intel || 0));
    setText('stat-power', Math.floor(aiPet.stats.power || 0));
    setText('stat-mood', Math.floor(aiPet.stats.mood || 0));

    if (typeof aiPet.stats.beauty === 'undefined') aiPet.stats.beauty = 10;
    setText('stat-beauty', Math.floor(aiPet.stats.beauty));

    // ★修正: 進化ボタンの表示制御を変数化して確実に見せる
    const btnEvolve = document.getElementById('btnEvolve');
    if (btnEvolve && typeof aiPet.getAvailableEvolutions === 'function') {
        const evos = aiPet.getAvailableEvolutions();
        // ★修正: 1段階進化済みでも、さらに先の進化先条件を満たしていればボタンを表示する
        if (evos.length > 0) {
            btnEvolve.style.display = 'flex';
        } else {
            btnEvolve.style.display = 'none';
        }
    }
    
    let pType = getPersonalityType(aiPet.stats);
    let pName = "普通";
    if (pType === 'gloom') pName = "暗い";
    else if (pType === 'scholar') pName = "学者肌";
    else if (pType === 'athlete') pName = "熱血";
    else if (pType === 'idol') pName = "アイドル";
    setText('stat-type', pName);

    // ★修正: デバッグなどで選んだ画像IDに特性がなくても、本来の種族特性を引っ張ってくる
    let skin = aiPet.currentSkin || 'robot';
    let baseType = skin.split('_')[0] || 'robot';
    let tData = (typeof charaTraits !== 'undefined') ? (charaTraits[skin] || charaTraits[baseType] || charaTraits['robot']) : null;
    // ▼ ここから書き換え ▼
    let traitName = tData ? tData.name : "-";
    if (aiPet.apprentice && aiPet.apprentice.title) {
        traitName = `🏆${aiPet.apprentice.title} / ` + traitName;
    }
    setText('stat-trait', traitName);
    
    const weatherEl = document.getElementById('stat-weather');
    if (weatherEl) {
        let w = aiPet.weather;
        let wStr = "☀ 快晴";
        if (w === 'sunny') wStr = "⛅ 晴れ";
        else if (w === 'cloudy') wStr = "☁ 曇り";
        else if (w === 'rain') wStr = "☔ 雨";
        else if (w === 'thunder') wStr = "⚡ 雷雨";
        else if (w === 'snow') wStr = "❄ 雪";
        else if (w === 'hail') wStr = "🧊 あられ";
        weatherEl.innerText = wStr;

        const overlay = document.getElementById('weatherOverlay');
        if (overlay) {
            overlay.className = ''; 
            if (w === 'rain') overlay.className = 'weather-rain';
            else if (w === 'thunder') overlay.className = 'weather-thunder';
            else if (w === 'snow') overlay.className = 'weather-snow';
            else if (w === 'hail') overlay.className = 'weather-hail';
        }
    }

    const goldEl = document.getElementById('stat-gold');
    if (goldEl) { goldEl.innerText = (aiPet.gold || 0) + " G"; goldEl.style.color = (aiPet.gold < 0) ? '#ff5252' : '#ffd700'; }
    updateShopGold(); 
    updateCommandHUD(); 
    updateAIStatusText();

    if(typeof updateQuestHUD==='function') updateQuestHUD();
}

// ==========================================
// ★ コマンドHUD更新（★修正：即送信されるボタン！）
// ==========================================
window.updateCommandHUD = function() {
    const hud = document.getElementById('commandHUD');
    const debtContainer = document.getElementById('debt-warning-container');
    if (!hud) return;
    if (typeof aiPet === 'undefined' || !aiPet.apprentice) return;

    if (aiPet.apprentice.learnedWords) {
        const legacyWords = ["クエスト", "課題", "手伝い", "稼ぐ", "休憩", "寝る", "お店", "買う", "売る", "虫取り", "駆除", "水やり", "手入れ"];
        aiPet.apprentice.learnedWords = aiPet.apprentice.learnedWords.filter(w => !legacyWords.includes(w));
    }

    const knows = (word) => aiPet.apprentice.learnedWords && aiPet.apprentice.learnedWords.includes(word);
    
    const categories = {
        '🏠 生活・回復': [], '💪 育成・訓練': [], '🎓 依頼・課題': [], '⚔️ 冒険・作業': [], '🏪 施設・その他': [], '🗣️ 自由な言葉': []
    };

    if (knows("睡眠")) categories['🏠 生活・回復'].push({ label: "睡眠", base: "睡眠" });
    if (knows("食事")) categories['🏠 生活・回復'].push({ label: "食事", base: "食事" });
    if (knows("勉強")) categories['💪 育成・訓練'].push({ label: "勉強", base: "勉強" });
    if (knows("筋トレ")) categories['💪 育成・訓練'].push({ label: "筋トレ", base: "筋トレ" });
    
    if (knows("探検")) categories['⚔️ 冒険・作業'].push({ label: "探検", base: "探検" });
    if (knows("ニンジン")) categories['⚔️ 冒険・作業'].push({ label: "ニンジン育てて", base: "ニンジン" });
    if (knows("ピーマン")) categories['⚔️ 冒険・作業'].push({ label: "ピーマン育てて", base: "ピーマン" });
    if (knows("トマト")) categories['⚔️ 冒険・作業'].push({ label: "トマト育てて", base: "トマト" });
    if (knows("農業")) categories['⚔️ 冒険・作業'].push({ label: "農業", base: "農業" });
    if (knows("退治")) categories['⚔️ 冒険・作業'].push({ label: "退治して", base: "退治", color: "#ff5252" }); 
    if (knows("釣り")) categories['⚔️ 冒険・作業'].push({ label: "釣り", base: "釣り" });
    if (knows("料理")) categories['⚔️ 冒険・作業'].push({ label: "料理", base: "料理" });
    if (knows("鍛冶")) categories['⚔️ 冒険・作業'].push({ label: "鍛冶", base: "鍛冶" }); 
    if (knows("建築")) categories['⚔️ 冒険・作業'].push({ label: "建築", base: "建築" });
    
    const masterNames = { 'explore': '冒険家', 'farming': '農家', 'fishing': '漁師', 'cooking': '料理人', 'smithing': '鍛冶師', 'building': '建築士' };
    for (let key in masterNames) {
        if (knows(masterNames[key])) categories['🎓 依頼・課題'].push({ label: `${masterNames[key]}のところへ`, base: masterNames[key] });
    }
    if (knows("バイト")) categories['🎓 依頼・課題'].push({ label: "バイト", base: "バイト" });

    if (knows("買い物")) categories['🏪 施設・その他'].push({ label: "買い物", base: "買い物" }); 
    if (knows("城")) categories['🏪 施設・その他'].push({ label: "城に行く", base: "城" });
    if (knows("カジノ")) categories['🏪 施設・その他'].push({ label: "カジノ", base: "カジノ" });

    const systemWords = [
        "睡眠", "食事", "勉強", "筋トレ", "探検", "料理", "鍛冶", "建築", 
        "買い物", "城", "カジノ", "釣り", "ニンジン", "ピーマン", "トマト", "退治", "農業", 
        "冒険家", "農家", "漁師", "料理人", "鍛冶師", "建築士", "バイト"
    ];
    
    if (aiPet.apprentice.learnedWords) {
        aiPet.apprentice.learnedWords.forEach(word => {
            if (!systemWords.includes(word)) {
                categories['🗣️ 自由な言葉'].push({ label: word, base: word, color: "#9C27B0" }); 
            }
        });
    }

    let maxWords = (typeof aiPet.getMaxVocabulary === 'function') ? aiPet.getMaxVocabulary() : 5;
    let currentWords = aiPet.apprentice.learnedWords ? aiPet.apprentice.learnedWords.length : 0;
    
    let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#aaa; margin-bottom:10px; background:#222; padding:6px 8px; border-radius:4px; border:1px solid #444;">
            <span>🧠 記憶容量: <span style="color:${currentWords > maxWords ? '#ff5252' : (currentWords === maxWords ? '#FFC107' : '#fff')}; font-weight:bold;">${currentWords} / ${maxWords} 語</span></span>
            <span style="font-size:10px; color:#888;">※「〇〇を忘れて」</span>
        </div>
    `;

    let totalCmds = 0;
    for (let cat in categories) {
        if (categories[cat].length > 0) {
            html += `<div style="font-size: 11px; font-weight: bold; color: #888; margin-top: 8px; margin-bottom: 6px;">${cat}</div>`;
            html += `<div style="display:flex; flex-wrap:wrap; gap:6px;">`;
            categories[cat].forEach(c => {
                totalCmds++;
                let label = c.label;
                let baseWord = c.base;
                let bgColor = c.color || "#2a2a2a";
                let textColor = c.color ? "#fff" : "#ddd";
                let borderColor = c.color ? (c.color === '#9C27B0' ? '#7B1FA2' : '#b71c1c') : "#555";
                
                // ★修正：type="button" にして、onmousedown の瞬間に送信処理を確定させる！
                html += `<button type="button" style="background: ${bgColor}; color: ${textColor}; border: 1px solid ${borderColor}; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; transition: all 0.1s; box-shadow: 0 2px rgba(0,0,0,0.5);" 
                        onmousedown="this.style.transform='translateY(2px)'; this.style.boxShadow='none'; document.getElementById('chatInput').value='${baseWord}'; window.sendChat();" 
                        onmouseup="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px rgba(0,0,0,0.5)';">${label}</button>`;
            });
            html += `</div>`;
        }
    }

    if (totalCmds === 0) {
        html += `<div style="text-align: center; padding: 20px; color: #666; font-size: 12px; background: rgba(0,0,0,0.2); border-radius: 8px; margin-top: 10px;">まだ言葉を知りません。<br>下のチャット欄から言葉を教えてみましょう！</div>`;
    }

    if (hud.innerHTML !== html) hud.innerHTML = html;
    
    if (debtContainer) {
        if (aiPet.gold < 0) {
            const limit = (typeof DEBT_TIME_LIMIT !== 'undefined') ? DEBT_TIME_LIMIT : 72 * 60;
            const timeLeftHours = Math.max(0, Math.ceil((limit - (aiPet.debtTimer || 0)) / 60));
            const debtHtml = `<div style="background: rgba(244, 67, 54, 0.1); color: #ff5252; font-weight: bold; font-size: 12px; border: 1px solid #f44336; padding: 10px; border-radius: 8px; margin-bottom: 10px; text-align: center; box-shadow: 0 0 10px rgba(244, 67, 54, 0.2);">⚠️ 借金返済期限: 残り ${timeLeftHours} 時間</div>`;
            if (debtContainer.innerHTML !== debtHtml) debtContainer.innerHTML = debtHtml;
        } else {
            if (debtContainer.innerHTML !== "") debtContainer.innerHTML = "";
        }
    }
};

// ==========================================
// ★ チャット履歴管理 ＆ 常時フォーカスシステム（ボタンクリック後対応版）
// ==========================================
window.chatHistory = JSON.parse(localStorage.getItem('ai_pet_chat_history')) || [];
window.chatHistoryIndex = -1;

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatInput');
    if (input) {
        // 1. 履歴の上下キー呼び出し
        input.addEventListener('keydown', function(e) {
            if (window.chatHistory.length === 0) return;
            
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (window.chatHistoryIndex < window.chatHistory.length - 1) {
                    window.chatHistoryIndex++;
                    input.value = window.chatHistory[window.chatHistory.length - 1 - window.chatHistoryIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (window.chatHistoryIndex > 0) {
                    window.chatHistoryIndex--;
                    input.value = window.chatHistory[window.chatHistory.length - 1 - window.chatHistoryIndex];
                } else if (window.chatHistoryIndex === 0) {
                    window.chatHistoryIndex = -1;
                    input.value = ""; // 一番下まで行ったら空にする
                }
            }
        });

        // 2. ★修正：どんなボタンを押した後でも、入力欄以外ならチャット欄にフォーカスを戻す
        document.addEventListener('click', function(e) {
            // 文字を入力・選択する場所（テキストボックス等）をクリックした時は邪魔しない
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                return;
            }
            
            // バトル画面や編成ダイアログが開いている時は邪魔しない
            const tcgModal = document.getElementById('tcg-auto-build-modal');
            if (tcgModal && tcgModal.style.display !== 'none') return;
            const tcgBattle = document.getElementById('tcg-battle-ui');
            if (tcgBattle && tcgBattle.style.display !== 'none') return;
            
            // ボタン本来のクリック動作が確実に実行されるよう「10ミリ秒」だけ待ってからフォーカスを戻す
            setTimeout(() => {
                input.focus();
            }, 10);
        });
    }
});

// ==========================================
// ★ チャット送信処理（超・賢い意図解釈システム＆誤爆修正版！）
// ==========================================
window.sendChat = function() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const rawText = input.value.trim();
    if (!rawText) return;
    
    if (window.chatHistory.length === 0 || window.chatHistory[window.chatHistory.length - 1] !== rawText) {
        window.chatHistory.push(rawText);
        if (window.chatHistory.length > 50) window.chatHistory.shift();
        localStorage.setItem('ai_pet_chat_history', JSON.stringify(window.chatHistory));
    }
    window.chatHistoryIndex = -1;

    if (rawText === "やめる" || rawText === "中止" || rawText === "キャンセル" || rawText.toLowerCase() === "stop" || rawText.toLowerCase() === "cancel") {
        if(typeof window.clearSchedule === 'function') window.clearSchedule();
        input.value = ""; input.focus(); return;
    }

    if (!aiPet.apprentice) aiPet.apprentice = {};
    if (!aiPet.apprentice.learnedWords) aiPet.apprentice.learnedWords = [];

    const dict = {
        "冒険家": ["冒険家", "冒険者"],
        "農家": ["農家", "農民"],
        "漁師": ["漁師", "釣り人"],
        "料理人": ["料理人", "シェフ", "コック"],
        "鍛冶師": ["鍛冶師", "職人"], // ★修正：「鍛冶屋」をここから外して独立させる
        "建築士": ["建築士", "建築家"],
        "ニンジン": ["ニンジン", "にんじん", "人参"],
        "トマト": ["トマト", "とまと"],
        "ピーマン": ["ピーマン", "ぴーまん"],
        
        "勉強": ["学ぶ", "学んで", "まなぶ", "まなんで", "賢く", "かしこく", "知性", "知恵", "本", "勉強"],
        "筋トレ": ["筋肉", "鍛え", "きたえ", "体力", "活力", "運動", "トレーニング", "走", "筋トレ"],
        "睡眠": ["寝る", "寝て", "ねて", "休", "やす", "休憩", "おやすみ", "眠", "睡眠"],
        "食事": ["食べる", "食べて", "たべて", "ご飯", "ごはん", "メシ", "めし", "腹", "はら", "食事"],
        "探検": ["冒険", "出かけ", "でかけ", "外", "散歩", "さんぽ", "探索", "探検"],
        "釣り": ["釣", "つり", "つって", "魚"],
        "料理": ["クッキング", "作って", "つくって", "料理"],
        "鍛冶屋": ["鍛冶屋", "工房"], // ★追加：施設としての鍛冶屋
        "鍛冶": ["武器", "防具", "装備", "鉄", "打って", "鍛冶"],
        "建築": ["建てて", "たてて", "建築", "建てる", "大工"],
        "橋": ["橋", "はし", "ブリッジ"],
        "小屋": ["小屋", "家", "こや", "いえ", "ハウス"],
        "城": ["城", "お城", "キャッスル", "闘技場", "アリーナ"],
        "カジノ": ["カジノ", "スロット", "ギャンブル", "遊んで", "あそんで"],
        "ショップ": ["ショップ", "買い物", "かいもの", "お店", "店", "買いたい"],
        "レストラン": ["レストラン", "食堂", "ご飯屋"],
        "農業": ["畑", "耕", "たがや", "農業", "水やり", "種"],
        "退治": ["虫", "駆除", "倒し", "退治"],
        "バイト": ["稼", "かせ", "仕事", "バイト"]
    };

    let interpretedWord = rawText;
    let isInterpreted = false;

    for (let key in dict) {
        if (dict[key].some(syn => rawText === syn)) {
            interpretedWord = key; isInterpreted = true; break;
        }
    }

    if (!isInterpreted) {
        for (let key in dict) {
            if (dict[key].some(syn => rawText.includes(syn))) {
                interpretedWord = key; isInterpreted = true; break;
            }
        }
    }

    const forgetMatch = rawText.match(/(.+)を(?:忘|わす)れて/);
    if (forgetMatch) {
        let targetWord = forgetMatch[1].trim();
        for (let key in dict) { if (dict[key].some(syn => targetWord.includes(syn))) { targetWord = key; break; } }
        const index = aiPet.apprentice.learnedWords.indexOf(targetWord);
        if (index !== -1) {
            aiPet.apprentice.learnedWords.splice(index, 1); aiPet.message = `「${targetWord}」だね…うん、忘れたよ。`;
        } else { aiPet.message = `えっ？「${targetWord}」なんて知らないよ？`; }
        aiPet.messageTimer = 180; input.value = ""; input.focus();
        if (typeof saveGameData === 'function') saveGameData(); 
        if (typeof updateCommandHUD === 'function') updateCommandHUD();
        return; 
    }

    let justLearned = false; 
    const maxWords = (typeof aiPet.getMaxVocabulary === 'function') ? aiPet.getMaxVocabulary() : 5;

    if (!aiPet.apprentice.learnedWords.includes(interpretedWord)) {
        if (aiPet.apprentice.learnedWords.length >= maxWords) {
            aiPet.message = `頭がいっぱいで「${interpretedWord}」は覚えられないや…\n（いらない言葉を「〇〇を忘れて」と言ってね）`;
            aiPet.messageTimer = 200; input.value = ""; input.focus(); return; 
        } else {
            aiPet.apprentice.learnedWords.push(interpretedWord); justLearned = true;
            if (typeof addFloatingText === 'function') addFloatingText(aiPet.x, aiPet.y - 60, "言葉を学習した！", "#FF9800");
            if (typeof saveGameData === 'function') saveGameData();
        }
    }

    const knows = (word) => aiPet.apprentice.learnedWords.includes(word);
    let actionTriggered = false; 

    const masterNames = { 'explore': '冒険家', 'farming': '農家', 'fishing': '漁師', 'cooking': '料理人', 'smithing': '鍛冶師', 'building': '建築士' };
    const myMasterName = aiPet.apprentice.currentMaster ? masterNames[aiPet.apprentice.currentMaster] : null;

    // ==========================================
    // ★大改修：ユニーク施設のスマート判定＆重複建築ブロック！
    // ==========================================
    const uniqueFacilities = {
        "城": { type: 'castle', bId: 'castle', name: 'お城', onEnter: () => { if(typeof window.openArenaReception === 'function') window.openArenaReception(); } },
        "カジノ": { type: 'casino', bId: 'casino', name: 'カジノ', onEnter: () => { if(typeof window.openCasino === 'function') window.openCasino(); } },
        "ショップ": { type: 'shop', bId: 'shop', name: 'ショップ', onEnter: () => { if(typeof switchRightPanel === 'function') switchRightPanel('shop'); } },
        "レストラン": { type: 'restaurant', bId: 'restaurant', name: 'レストラン', onEnter: null },
        "鍛冶屋": { type: 'smith', bId: 'smith', name: '鍛冶屋', onEnter: null }
    };

    if (Object.keys(uniqueFacilities).includes(interpretedWord)) {
        actionTriggered = true;
        let facInfo = uniqueFacilities[interpretedWord];
        
        let existingTarget = null;
        for (let k in assets) {
            // isMobile（移動式）は無視して、自分が建てたものを探す
            if ((assets[k].type === facInfo.type || assets[k].type === facInfo.bId) && !assets[k].isMobile) {
                existingTarget = assets[k]; break;
            }
        }

        // ★重複建築ブロック：スケジュールに入っているか、建築予定地があるかチェック
        let isBuilding = false;
        if (aiPet.schedule.some(t => t.type === 'build' && t.targetBuilding === facInfo.bId)) isBuilding = true;
        for (let k in assets) {
            if (assets[k].type === 'building_site' && assets[k].targetBuilding === facInfo.bId) isBuilding = true;
        }

        if (existingTarget) {
            if (knows(interpretedWord)) {
                aiPet.schedule = []; aiPet.startBuildingInteraction(existingTarget);
                aiPet.message = `${facInfo.name}に行ってくる！`; aiPet.messageTimer = 120;
                let checkInterval = setInterval(() => {
                    if (aiPet.actionState === 'inside' && aiPet.indoorTarget === existingTarget) {
                        if (facInfo.onEnter) facInfo.onEnter();
                        clearInterval(checkInterval);
                    } else if (aiPet.actionState === 'idle') { clearInterval(checkInterval); }
                }, 500);
            } else {
                aiPet.message = `そこにあるのは分かるけど、言葉を知らないから行けないみたい...`; aiPet.messageTimer = 120;
            }
        } else if (isBuilding) {
            aiPet.message = `${facInfo.name}は今作っている最中だよ！`; aiPet.messageTimer = 120;
        } else {
            if (knows("建築")) {
                let currentRank = (aiPet.apprentice && aiPet.apprentice.rank && aiPet.apprentice.rank['building']) ? aiPet.apprentice.rank['building'] : 0;
                let isMaster = aiPet.apprentice && (
                    (aiPet.apprentice.retired && aiPet.apprentice.retired['building']) ||
                    (aiPet.apprentice.currentMaster === 'building' && aiPet.apprentice.isGraduated) || currentRank >= 10
                );
                let effectiveRank = isMaster ? 10 : currentRank;
                let reqLevel = (typeof buildingCatalog !== 'undefined' && buildingCatalog[facInfo.bId]) ? buildingCatalog[facInfo.bId].reqBuildLevel : 1;
                let isBuilder = aiPet.apprentice && (aiPet.apprentice.currentMaster === 'building' || isMaster);
                
                if (!isBuilder) {
                    aiPet.message = `まだ素人だから、${facInfo.name}は作れないよ...\n(まずは建築士に弟子入りしよう)`; aiPet.messageTimer = 150;
                } else if (effectiveRank < reqLevel) {
                    aiPet.message = `${facInfo.name}を作るには難しすぎるよ...\nもっと建築士のランクを上げないと！（必要ランク: ${reqLevel}）`; aiPet.messageTimer = 180;
                } else {
                    aiPet.schedule.push({type: 'build', targetBuilding: facInfo.bId, duration: 60});
                    aiPet.message = `${facInfo.name}の建築を予定に追加したよ！`; aiPet.messageTimer = 150;
                }
            } else {
                aiPet.message = `${facInfo.name}が建ってないみたい...（「建築」を教えれば作れるかも？）`; aiPet.messageTimer = 120;
            }
        }
    }
    // --- 汎用的な複数建築（橋、小屋）の処理 ---
    else if (["橋", "小屋"].includes(interpretedWord) && knows("建築")) {
        actionTriggered = true;
        let bId = interpretedWord === "橋" ? "bridge" : "hut";
        let currentRank = (aiPet.apprentice && aiPet.apprentice.rank && aiPet.apprentice.rank['building']) ? aiPet.apprentice.rank['building'] : 0;
        let isMaster = aiPet.apprentice && (
            (aiPet.apprentice.retired && aiPet.apprentice.retired['building']) ||
            (aiPet.apprentice.currentMaster === 'building' && aiPet.apprentice.isGraduated) || currentRank >= 10
        );
        let effectiveRank = isMaster ? 10 : currentRank;
        let reqLevel = buildingCatalog[bId].reqBuildLevel || 1;
        let isBuilder = aiPet.apprentice && (aiPet.apprentice.currentMaster === 'building' || isMaster);
        
        if (!isBuilder) {
            aiPet.message = `まだ素人だから、${interpretedWord}は作れないよ...\n(まずは建築士に弟子入りしよう)`; aiPet.messageTimer = 150;
        } else if (effectiveRank < reqLevel) {
            aiPet.message = `${interpretedWord}を作るには難しすぎるよ...\nもっと建築士のランクを上げないと！（必要ランク: ${reqLevel}）`; aiPet.messageTimer = 180;
        } else {
            aiPet.schedule.push({type: 'build', targetBuilding: bId, duration: 60});
            aiPet.message = `${interpretedWord}の建築を予定に追加したよ！`; aiPet.messageTimer = 150;
        }
    }
    // 既存の「建築」コマンドは畑（farm）をデフォルトにする
    else if (interpretedWord === "建築" && knows("建築")) { 
        actionTriggered = true;
        let isMaster = aiPet.apprentice && (
            (aiPet.apprentice.retired && aiPet.apprentice.retired['building']) ||
            (aiPet.apprentice.currentMaster === 'building' && aiPet.apprentice.isGraduated)
        );
        let isBuilder = aiPet.apprentice && (aiPet.apprentice.currentMaster === 'building' || isMaster);
        
        if (!isBuilder) {
            aiPet.message = `まだ素人だから作れないよ...\n(まずは建築士に弟子入りしよう)`; aiPet.messageTimer = 150;
        } else {
            aiPet.schedule.push({type: 'build', targetBuilding: 'farm', duration: 60});
            aiPet.message = "畑の建築を予定に追加したよ！\n(他のものは「〇〇を作って」と指示してね)"; aiPet.messageTimer = 150;
        }
    }
    else if (interpretedWord === "バイト" && knows("バイト")) {
        actionTriggered = true;
        if (aiPet.apprentice.currentMaster && !aiPet.apprentice.isExcommunicated) {
            let facility = null;
            if (typeof findFacilityForTask === 'function') facility = findFacilityForTask('visit_master', aiPet.apprentice.currentMaster);
            if (facility) {
                aiPet.schedule = []; aiPet.startBuildingInteraction(facility);
                aiPet.message = "師匠のところでバイトしてくる！"; aiPet.messageTimer = 120;
                let baitoInterval = setInterval(() => {
                    if (aiPet.actionState === 'inside' && aiPet.indoorTarget === facility) {
                        setTimeout(() => {
                            aiPet.gold = (aiPet.gold || 0) + 50; 
                            aiPet.energy = Math.max(0, (aiPet.energy || 100) - 10); aiPet.hunger = Math.max(0, (aiPet.hunger || 100) - 10);
                            aiPet.message = "バイト完了！ 50G稼いだよ！"; aiPet.messageTimer = 180;
                            if (typeof updateStatUI === 'function') updateStatUI();
                            if (typeof addFloatingText === 'function') addFloatingText(aiPet.x, aiPet.y - 40, "+50 G", "#FFD700");
                            aiPet.actionState = 'exiting'; aiPet.indoorTarget = null;
                            if (typeof saveGameData === 'function') saveGameData();
                        }, 3000); 
                        clearInterval(baitoInterval);
                    } else if (aiPet.actionState === 'idle') { clearInterval(baitoInterval); }
                }, 500);
            } else { aiPet.message = "師匠がどこにいるかわからない..."; aiPet.messageTimer = 120; }
        } else { aiPet.message = "バイト先（師匠）がいないよ..."; aiPet.messageTimer = 120; }
    }
    else if (myMasterName && interpretedWord === myMasterName && knows(myMasterName) && !aiPet.isHelper) {
        actionTriggered = true;
        if (!aiPet.apprentice.isExcommunicated) {
            let facility = null;
            if (typeof findFacilityForTask === 'function') facility = findFacilityForTask('visit_master', aiPet.apprentice.currentMaster);
            if (facility) {
                aiPet.schedule = [{type: 'visit_master', masterType: aiPet.apprentice.currentMaster, duration: 0}];
                aiPet.startBuildingInteraction(facility); aiPet.message = "師匠のところへ行くよ！"; aiPet.messageTimer = 120;
            } else { aiPet.message = "どこにいるかわからない..."; aiPet.messageTimer = 120; }
        } else { aiPet.message = "破門中だから会いに行けない..."; aiPet.messageTimer = 120; }
    }
    else if (interpretedWord === "睡眠" && knows("睡眠")) { aiPet.schedule.push({type:'sleep', duration:60}); actionTriggered = true; }
    else if (interpretedWord === "食事" && knows("食事")) { aiPet.schedule.push({type:'eat', duration:30}); actionTriggered = true; }
    else if (interpretedWord === "勉強" && knows("勉強")) { aiPet.schedule.push({type:'study', duration:60}); actionTriggered = true; }
    else if (interpretedWord === "筋トレ" && knows("筋トレ")) { aiPet.schedule.push({type:'train', duration:60}); actionTriggered = true; } 
    else if (interpretedWord === "探検" && knows("探検")) { 
        actionTriggered = true; 
        let canExplore = false;
        if (aiPet.apprentice) {
            if (aiPet.apprentice.currentMaster === 'explore') canExplore = true; 
            if (aiPet.apprentice.rank && aiPet.apprentice.rank['explore'] >= 10) canExplore = true; 
            if (aiPet.apprentice.retired && aiPet.apprentice.retired['explore']) canExplore = true; 
        }
        if (canExplore) { aiPet.schedule.push({type:'explore', duration:60}); } 
        else { aiPet.message = "一人で探検するのは危ないかも...\nまずは冒険家を探して、やり方を教わりたいな！"; aiPet.messageTimer = 180; }
    }
    else if (interpretedWord === "料理" && knows("料理")) { aiPet.schedule.push({type:'cook', duration:30}); actionTriggered = true; }
    else if (interpretedWord === "鍛冶" && knows("鍛冶")) { aiPet.schedule.push({type:'smith', duration:60}); actionTriggered = true; }
    else if (interpretedWord === "釣り" && knows("釣り")) {
        actionTriggered = true;
        let hasRod = aiPet.inventory && aiPet.inventory.some(k => k.startsWith('rod_'));
        if (aiPet.apprentice && aiPet.apprentice.currentMaster === 'fishing') hasRod = true;
        if (!hasRod) { aiPet.message = "釣り竿を持ってないよ！"; aiPet.messageTimer = 120;
        } else {
            let targetBridge = null; let minDist = Infinity;
            for(let k in assets) {
                if(assets[k].type === 'bridge') {
                    let cx = assets[k].dx + (assets[k].sw * (assets[k].scale||0.5)) / 2; let cy = assets[k].dy + (assets[k].sh * (assets[k].scale||0.5)) / 2;
                    let dist = Math.pow(aiPet.x - cx, 2) + Math.pow(aiPet.y - cy, 2);
                    if (dist < minDist) { minDist = dist; targetBridge = assets[k]; }
                }
            }
            let distToLeft = aiPet.x; let distToRight = 800 - aiPet.x; let distToTop = aiPet.y; let distToBottom = 480 - aiPet.y;
            let minEdgeDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
            let tx = aiPet.x, ty = aiPet.y;
            if (minEdgeDist === distToLeft) tx = 25; else if (minEdgeDist === distToRight) tx = 775;
            else if (minEdgeDist === distToTop) ty = 25; else if (minEdgeDist === distToBottom) ty = 455;
            
            if (targetBridge && minDist < minEdgeDist * minEdgeDist) {
                aiPet.schedule = [{type:'fish', duration: 300}]; aiPet.startBuildingInteraction(targetBridge); aiPet.message = "橋で釣りをするよ！";
            } else {
                aiPet.schedule = [{type:'fish', duration: 300}];
                let seaTarget = { type: 'sea', name: '海', dx: tx - 25, dy: ty - 25, sw: 50, sh: 50, scale: 1.0 };
                aiPet.interactionTarget = seaTarget;
                if (aiPet.setDestination(tx, ty)) { aiPet.actionState = 'moving_to_enter'; aiPet.message = "海へ釣りに行くよ！"; }
            }
            aiPet.messageTimer = 120;
        }
    }
    else if (["ニンジン", "ピーマン", "トマト"].includes(interpretedWord) && knows(interpretedWord)) {
        actionTriggered = true; let seedId = null;
        if (interpretedWord === 'ニンジン') seedId = 'seed_carrot'; 
        else if (interpretedWord === 'ピーマン') seedId = 'seed_pepper'; 
        else if (interpretedWord === 'トマト') seedId = 'seed_tomato';
        
        if (aiPet.inventory && aiPet.inventory.includes(seedId)) {
            let targetFarm = null; let minDist = Infinity; let anyFarm = false;
            for (let k in assets) {
                let a = assets[k];
                if (a.type === 'farm') {
                    anyFarm = true;
                    if (!a.plantedCrop) {
                        let cx = a.dx + (a.sw * (a.scale||0.5)) / 2; let cy = a.dy + (a.sh * (a.scale||0.5)) / 2;
                        let dist = Math.pow(aiPet.x - cx, 2) + Math.pow(aiPet.y - cy, 2);
                        if (dist < minDist) { minDist = dist; targetFarm = a; }
                    }
                }
            }
            if (targetFarm) {
                aiPet.schedule = []; aiPet.intendedSeed = seedId; aiPet.startBuildingInteraction(targetFarm);
                aiPet.message = `${interpretedWord}を育てに行く！`; aiPet.messageTimer = 120;
            } else if (anyFarm) { aiPet.message = "空いている畑がないよ..."; aiPet.messageTimer = 120; 
            } else { aiPet.message = "畑がないよ..."; aiPet.messageTimer = 120; }
        } else { aiPet.message = `${interpretedWord}の種を持ってないよ`; aiPet.messageTimer = 120; }
    }
    else if (interpretedWord === "退治" && knows("退治")) {
        actionTriggered = true; let targetFarm = null; let minDist = Infinity;
        for (let k in assets) {
            let a = assets[k];
            if (a.type === 'farm' && a.pestState) {
                let cx = a.dx + (a.sw * (a.scale||0.5)) / 2; let cy = a.dy + (a.sh * (a.scale||0.5)) / 2;
                let dist = Math.pow(aiPet.x - cx, 2) + Math.pow(aiPet.y - cy, 2);
                if (dist < minDist) { minDist = dist; targetFarm = a; }
            }
        }
        if (targetFarm) {
            aiPet.schedule = []; aiPet.intendedSeed = null; aiPet.intendedAction = 'pest_control';
            aiPet.startBuildingInteraction(targetFarm); aiPet.message = "害虫退治にいくよ！"; aiPet.messageTimer = 120;
        } else { aiPet.message = "虫はいないみたい！"; aiPet.messageTimer = 120; }
    }
    else if (interpretedWord === "農業" && knows("農業")) {
        actionTriggered = true; let targetFarm = null; let minDist = Infinity;
        let intendedSeed = null;

        for (let k in assets) {
            let a = assets[k];
            if (a.type === 'farm') {
                if (a.isDead || a.isEaten || a.growth >= 100) {
                    let cx = a.dx + (a.sw * (a.scale||0.5)) / 2; let cy = a.dy + (a.sh * (a.scale||0.5)) / 2;
                    let dist = Math.pow(aiPet.x - cx, 2) + Math.pow(aiPet.y - cy, 2);
                    if (dist < minDist) { minDist = dist; targetFarm = a; }
                }
            }
        }
        if (!targetFarm) {
            minDist = Infinity;
            for (let k in assets) {
                let a = assets[k];
                if (a.type === 'farm' && a.plantedCrop && a.growth < 100) {
                    let cx = a.dx + (a.sw * (a.scale||0.5)) / 2; let cy = a.dy + (a.sh * (a.scale||0.5)) / 2;
                    let dist = Math.pow(aiPet.x - cx, 2) + Math.pow(aiPet.y - cy, 2);
                    if (dist < minDist) { minDist = dist; targetFarm = a; }
                }
            }
        }
        if (!targetFarm) {
            let availableSeed = null;
            if (aiPet.inventory && aiPet.inventory.includes('seed_carrot')) availableSeed = 'seed_carrot';
            else if (aiPet.inventory && aiPet.inventory.includes('seed_tomato')) availableSeed = 'seed_tomato';
            else if (aiPet.inventory && aiPet.inventory.includes('seed_pepper')) availableSeed = 'seed_pepper';

            if (!availableSeed && aiPet.apprentice && (aiPet.apprentice.currentMaster === 'farming' || aiPet.apprentice.isGraduated)) {
                aiPet.inventory.push('seed_carrot');
                availableSeed = 'seed_carrot';
            }

            if (availableSeed) {
                minDist = Infinity;
                for (let k in assets) {
                    let a = assets[k];
                    if (a.type === 'farm' && !a.plantedCrop) {
                        let cx = a.dx + (a.sw * (a.scale||0.5)) / 2; let cy = a.dy + (a.sh * (a.scale||0.5)) / 2;
                        let dist = Math.pow(aiPet.x - cx, 2) + Math.pow(aiPet.y - cy, 2);
                        if (dist < minDist) { minDist = dist; targetFarm = a; intendedSeed = availableSeed; }
                    }
                }
            }
        }

        if (targetFarm) {
            aiPet.schedule = []; 
            aiPet.intendedSeed = intendedSeed;
            aiPet.startBuildingInteraction(targetFarm);
            if (intendedSeed) {
                let seedName = intendedSeed === 'seed_carrot' ? 'ニンジン' : intendedSeed === 'seed_tomato' ? 'トマト' : 'ピーマン';
                aiPet.message = `空いてる畑に${seedName}の種をまくよ！`; 
            } else {
                aiPet.message = "畑の様子を見てくる！"; 
            }
            aiPet.messageTimer = 120;
        } else { 
            aiPet.message = "手入れする畑がないよ..."; aiPet.messageTimer = 120; 
        }
    }

    if (!actionTriggered) {
        if (justLearned) { 
            if (isInterpreted) {
                aiPet.message = `「${rawText}」…つまり「${interpretedWord}」だね！覚えたよ！`;
            } else {
                aiPet.message = `「${interpretedWord}」…！\nよく分からないけど、言葉を覚えたよ！`; 
            }
        } 
        else { aiPet.message = "？（何を言っているのかわからないみたい...）"; }
        aiPet.messageTimer = 180;
    } else if (justLearned) {
        if (isInterpreted) {
            aiPet.message = `「${rawText}」…つまり「${interpretedWord}」だね！\nさっそくやってみる！`;
        } else {
            aiPet.message = `「${interpretedWord}」を覚えたよ！\nさっそくやってみる！`; 
        }
        aiPet.messageTimer = 180;
    }

    input.value = "";
    input.focus(); 
    if (typeof updateScheduleList === 'function') updateScheduleList();
    if (typeof updateCommandHUD === 'function') updateCommandHUD();
};

// ==========================================
// ★究極改修：カジノ入室時の専用ロビーとAI連動処理
// ==========================================
window.openCasino = function() {
    // 1. TCGデータがまだ無い、または60枚未満の場合は「入場拒否」の演出
    if (!window.TCG || !window.TCG.myCollection || window.TCG.myCollection.length < 60) {
        let count = window.TCG ? (window.TCG.myCollection ? window.TCG.myCollection.length : 0) : 0;
        let msg = `「ここは特別な『カードゲーム』の闘技場だ。\n参加するには、カード化された『思い出』が最低でも60個必要だぞ」\n\n（現在: ${count} / 60個）`;
        
        // メッセージを出して、AIを外に追い出す
        if (window.aiPet) {
            window.aiPet.message = "まだ入れないみたい...";
            window.aiPet.messageTimer = 180;
            window.aiPet.actionState = 'exiting'; 
            window.aiPet.isIndoors = false;
        }
        alert(msg);
        return;
    }

    // 2. AIをカジノ内で「待機状態」にして、勝手に出ないようにする
    if (window.aiPet) {
        window.aiPet.actionState = 'idle'; // exploreTimerによる自動退出をストップ
        window.aiPet.visualAction = null;
        window.aiPet.message = "カジノの地下闘技場にやってきた！";
        window.aiPet.messageTimer = 120;
    }

    // 3. 既存の小さなTCGメニューを非表示にする（もし開いていれば）
    const oldMenu = document.getElementById('tcg-menu-container');
    if (oldMenu) oldMenu.style.display = 'none';

    // 4. 既存のボタンに仕込まれた「オンライン対戦機能」を抽出して再利用するハック
    const buttons = document.querySelectorAll('button');
    let onlineMatchFunc = "alert('オンライン対戦機能が見つかりません');";
    let onlineRegisterFunc = "alert('デッキ登録機能が見つかりません');";
    
    buttons.forEach(btn => {
        const text = btn.innerText.trim();
        if (text.includes('世界のプレイヤーと対戦')) {
            onlineMatchFunc = btn.getAttribute('onclick') || onlineMatchFunc;
        }
        if (text.includes('デッキをオンライン登録')) {
            onlineRegisterFunc = btn.getAttribute('onclick') || onlineRegisterFunc;
        }
    });

    // 5. アリーナ風の立派なカジノロビーUIを生成
    let casinoUI = document.getElementById('casino-lobby-ui');
    if (!casinoUI) {
        casinoUI = document.createElement('div');
        casinoUI.id = 'casino-lobby-ui';
        casinoUI.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(10,5,10,0.95); z-index: 50000; display: flex; flex-direction: column; align-items: center; color: white; font-family: sans-serif; overflow-y: auto;`;
        document.body.appendChild(casinoUI);
    }

    casinoUI.innerHTML = `
        <h1 style="color:#FFC107; font-size:36px; margin-top:50px; text-shadow: 0 0 15px rgba(255,193,7,0.8);">🎰 カジノ・地下闘技場 🎰</h1>
        <p style="font-size:16px; color:#ccc; margin-bottom:40px; text-align:center;">
            ここではAIの記憶を具現化したカードで、熱いバトルが繰り広げられている。<br>
            デッキを編成し、世界中のプレイヤーや強敵に挑もう！
        </p>
        
        <div style="display:flex; flex-direction:column; gap:20px; width: 450px; max-width: 90%;">
            <button onclick="document.getElementById('casino-lobby-ui').style.display='none'; window.openDeckBuilder();" 
                style="padding:15px; font-size:20px; font-weight:bold; background:#2196F3; color:white; border:3px solid #FFF; border-radius:8px; cursor:pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                🗃️ コレクション / デッキ編成
            </button>
            
            <button onclick="document.getElementById('casino-lobby-ui').style.display='none'; ${onlineMatchFunc}" 
                style="padding:15px; font-size:20px; font-weight:bold; background:#E91E63; color:white; border:3px solid #FFF; border-radius:8px; cursor:pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                🌐 世界のプレイヤーと対戦
            </button>
            
            <button onclick="document.getElementById('casino-lobby-ui').style.display='none'; window.startBattle();" 
                style="padding:15px; font-size:20px; font-weight:bold; background:#4CAF50; color:white; border:3px solid #FFF; border-radius:8px; cursor:pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                ⚔️ 名もなきCPUと練習
            </button>

            <button onclick="${onlineRegisterFunc}" 
                style="padding:15px; font-size:18px; font-weight:bold; background:#9C27B0; color:white; border:3px solid #FFF; border-radius:8px; cursor:pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                ☁️ デッキをオンライン登録
            </button>
        </div>
        
        <button onclick="window.exitCasino()" 
            style="margin-top: 50px; padding:15px 40px; font-size:20px; font-weight:bold; background:#444; color:white; border:3px solid #777; border-radius:8px; cursor:pointer; transition: 0.2s;" onmouseover="this.style.background='#555'" onmouseout="this.style.background='#444'">
            カジノを出る
        </button>
    `;
    
    casinoUI.style.display = 'flex';
};

// ★ カジノからAIを確実に退出させる処理
window.exitCasino = function() {
    const casinoUI = document.getElementById('casino-lobby-ui');
    if (casinoUI) casinoUI.style.display = 'none';
    
    if (window.aiPet && window.aiPet.indoorTarget && window.aiPet.indoorTarget.type === 'casino') {
        window.aiPet.actionState = 'exiting';
        window.aiPet.isIndoors = false;
        window.aiPet.interactionTarget = null;
        window.aiPet.indoorTarget = null;
        window.aiPet.visualAction = null;
        window.aiPet.message = "カジノから出たよ！";
        window.aiPet.messageTimer = 120;
        
        if (window.aiPet.schedule && window.aiPet.schedule.length > 0) {
            window.aiPet.schedule.shift(); 
        }
        if (typeof window.updateScheduleList === 'function') {
            window.updateScheduleList();
        }
    }
};

// ★ 超重要：画面を監視し、すべてのTCG画面が閉じられたら自動でカジノから退出させる！
setInterval(() => {
    // AIがカジノの中にいて、かつ勝手に行動しないようにidleで待機しているかチェック
    if (window.aiPet && window.aiPet.indoorTarget && window.aiPet.indoorTarget.type === 'casino' && window.aiPet.actionState === 'idle') {
        
        const lobby = document.getElementById('casino-lobby-ui');
        const battle = document.getElementById('tcg-battle-ui');
        const deck = document.getElementById('tcg-deck-builder');
        
        const isLobbyOpen = lobby && lobby.style.display !== 'none';
        const isBattleOpen = battle && battle.style.display !== 'none';
        const isDeckOpen = deck && deck.style.display !== 'none';
        
        // カジノロビー、バトル画面、デッキ編成画面の「すべてが閉じられた」時だけ退出する！
        if (!isLobbyOpen && !isBattleOpen && !isDeckOpen) {
            window.exitCasino();
        }
    }
}, 500);
function startFishingGame() { const el = document.getElementById('fishingOverlay'); if(el) el.classList.add('active'); }

window.clearSchedule = function() { 
    if (typeof aiPet === 'undefined') return;
    
    if (aiPet.schedule && aiPet.schedule.length > 0) {
        const quest = aiPet.schedule.find(t => t.type === 'master_quest');
        if (quest) {
            quest.aborted = true;
            if (typeof aiPet.processApprenticeQuestFinish === 'function') {
                aiPet.processApprenticeQuestFinish(quest);
            }
        }
    }

    aiPet.schedule = []; 
    aiPet.message = "中断しました"; 
    aiPet.messageTimer = 120;
    
    aiPet.visualAction = null;
    aiPet.actionState = 'idle';
    aiPet.isIndoors = false;
    aiPet.indoorTarget = null;
    aiPet.exploreState = null;
    aiPet.visualScale = 1.0;
    aiPet.fishingData = null;

    if (typeof window.updateScheduleList === 'function') window.updateScheduleList(); 
    if (typeof updateAIStatusText === 'function') updateAIStatusText();
};

window.addScheduleFromInput = function(type) {
    const val = document.getElementById('scheduleTimeInput').value;
    aiPet.schedule.push({type: type, duration: parseInt(val)}); 
    window.updateScheduleList();
};

window.loadDebugData = function() {
    if (typeof aiPet === 'undefined') return;
    if(document.getElementById('dbg-gen')) document.getElementById('dbg-gen').value = aiPet.generation || 1;
    if(document.getElementById('dbg-age')) document.getElementById('dbg-age').value = aiPet.age || 0;
    if(document.getElementById('dbg-hour')) document.getElementById('dbg-hour').value = aiPet.debugHour || 12;
    
    if(document.getElementById('dbg-season')) document.getElementById('dbg-season').value = aiPet.season || 'spring';

    if(document.getElementById('dbg-energy')) document.getElementById('dbg-energy').value = Math.floor(aiPet.energy || 100);
    if(document.getElementById('dbg-hunger')) document.getElementById('dbg-hunger').value = Math.floor(aiPet.hunger || 100);
    if(document.getElementById('dbg-lifespan')) document.getElementById('dbg-lifespan').value = aiPet.lifespan || 100;
    if(document.getElementById('dbg-intel')) document.getElementById('dbg-intel').value = Math.floor((aiPet.stats && aiPet.stats.intel) || 10);
    if(document.getElementById('dbg-power')) document.getElementById('dbg-power').value = Math.floor((aiPet.stats && aiPet.stats.power) || 10);
    if(document.getElementById('dbg-mood')) document.getElementById('dbg-mood').value = Math.floor((aiPet.stats && aiPet.stats.mood) || 100);

    if(document.getElementById('dbg-stat-beauty')) document.getElementById('dbg-stat-beauty').value = Math.floor((aiPet.stats && aiPet.stats.beauty) || 10);
    if(document.getElementById('dbg-darkness')) document.getElementById('dbg-darkness').value = Math.floor(aiPet.darknessCounter || 0);
    if(document.getElementById('dbg-gold')) document.getElementById('dbg-gold').value = aiPet.gold || 0;

    if(document.getElementById('dbg-skill-cook')) document.getElementById('dbg-skill-cook').value = (aiPet.skills && aiPet.skills.cooking) ? aiPet.skills.cooking : 1;
    if(document.getElementById('dbg-skill-smith')) document.getElementById('dbg-skill-smith').value = (aiPet.skills && aiPet.skills.smithing) ? aiPet.skills.smithing : 1;
    if(document.getElementById('dbg-skill-build')) document.getElementById('dbg-skill-build').value = (aiPet.skills && aiPet.skills.building) ? aiPet.skills.building : 1;

    const godCheck = document.getElementById('dbg-god-mode');
    if (godCheck) aiPet.godMode = godCheck.checked;

    const sel = document.getElementById('dbg-char-select');
    if (sel) {
        sel.innerHTML = "";
        let charKeys = [];
        if (typeof aiConfigs !== 'undefined' && aiConfigs) { charKeys = Object.keys(aiConfigs); }
        else { charKeys = ['robot', 'spirit', 'magician']; }
        charKeys.forEach(c => {
            const opt = document.createElement('option'); opt.value = c; opt.innerText = c;
            if(c === aiPet.currentSkin) opt.selected = true; sel.appendChild(opt);
        });
        if(typeof updateDebugEvoInfo === 'function') sel.onchange = updateDebugEvoInfo;
    }

    const mapList = document.getElementById('dbg-map-objects');
    if (mapList && typeof assets !== 'undefined') {
        mapList.innerHTML = "";
        for(let key in assets) {
            const a = assets[key];
            if (a.type === 'ground' || a.type === 'road') continue;
            const div = document.createElement('div');
            div.style.marginBottom = "4px"; div.style.borderBottom = "1px solid #333"; div.style.padding = "2px";
            let durVal = (typeof a.durability !== 'undefined') ? a.durability : "";
            let html = `<span style="color:#aaa;">${a.name}</span> <span style="font-size:10px; color:#666;">(${key.substring(0,8)}...)</span><br>`;
            if (durVal !== "" && durVal >= 0) { html += `耐久: <input type="number" class="dbg-map-val" data-uid="${key}" data-prop="durability" value="${durVal}" style="width:40px; background:#333; color:white; border:1px solid #555;">`; } 
            else { html += `<span style="color:#555; font-size:10px;">(耐久なし)</span>`; }
            html += ` <button onclick="delete assets['${key}']; loadDebugData();" style="background:#500; color:white; border:none; border-radius:3px; cursor:pointer; font-size:10px;">Del</button>`;
            div.innerHTML = html;
            mapList.appendChild(div);
        }
    }

    const itemList = document.getElementById('dbg-items');
    if (itemList) {
        itemList.innerHTML = "";
        const counts = {};
        if (aiPet.inventory) aiPet.inventory.forEach(k => counts[k] = (counts[k]||0)+1);
        for (let key in itemCatalog) {
            const count = counts[key] || 0; const item = itemCatalog[key];
            const div = document.createElement('div'); const style = count > 0 ? 'color:white' : 'color:#555';
            div.innerHTML = `<div style="display:flex; justify-content:space-between; align-items:center;"><span style="${style}; font-size:11px;">${item.name}</span><input type="number" class="dbg-item-val" data-key="${key}" value="${count}" min="0" style="width:40px; background:#333; color:white; border:1px solid #555;"></div>`;
            itemList.appendChild(div);
        }
    }
};

window.saveDebugData = function() {
    if (typeof aiPet === 'undefined') return;
    
    aiPet.generation = parseInt(document.getElementById('dbg-gen').value) || 1;
    aiPet.age = parseInt(document.getElementById('dbg-age').value) || 0;
    aiPet.debugHour = parseInt(document.getElementById('dbg-hour').value) || 12;
    
    const seasonSelect = document.getElementById('dbg-season');
    if (seasonSelect) aiPet.season = seasonSelect.value;

    aiPet.energy = parseInt(document.getElementById('dbg-energy').value) || 100;
    aiPet.hunger = parseInt(document.getElementById('dbg-hunger').value) || 100;
    aiPet.lifespan = parseInt(document.getElementById('dbg-lifespan').value) || 100;
    
    if (!aiPet.stats) aiPet.stats = { intel: 10, power: 10, mood: 100, beauty: 10 };
    aiPet.stats.intel = parseInt(document.getElementById('dbg-intel').value) || 10;
    aiPet.stats.power = parseInt(document.getElementById('dbg-power').value) || 10;
    aiPet.stats.mood = parseInt(document.getElementById('dbg-mood').value) || 100;

    const beautyInput = document.getElementById('dbg-stat-beauty');
    if(beautyInput) aiPet.stats.beauty = parseFloat(beautyInput.value) || 10;
    const darkInput = document.getElementById('dbg-darkness');
    if(darkInput) aiPet.darknessCounter = parseFloat(darkInput.value) || 0;

    aiPet.gold = parseInt(document.getElementById('dbg-gold').value) || 0;
    if (!aiPet.skills) aiPet.skills = { cooking: 1, smithing: 1, building: 1 };
    aiPet.skills.cooking = parseFloat(document.getElementById('dbg-skill-cook').value) || 1;
    aiPet.skills.smithing = parseFloat(document.getElementById('dbg-skill-smith').value) || 1;
    const buildInput = document.getElementById('dbg-skill-build');
    if (buildInput) aiPet.skills.building = parseFloat(buildInput.value) || 1;

    const godCheck = document.getElementById('dbg-god-mode');
    if (godCheck) aiPet.godMode = godCheck.checked;

    const sel = document.getElementById('dbg-char-select');
    if (sel && sel.value) { aiPet.currentSkin = sel.value; }

    const mapInputs = document.querySelectorAll('.dbg-map-val');
    mapInputs.forEach(input => { const uid = input.getAttribute('data-uid'); const val = parseInt(input.value); if (assets && assets[uid]) { assets[uid].durability = val; } });

    const itemInputs = document.querySelectorAll('.dbg-item-val');
    const newInventory = [];
    itemInputs.forEach(input => { const key = input.getAttribute('data-key'); const count = parseInt(input.value); for(let i=0; i<count; i++) { newInventory.push(key); } });
    aiPet.inventory = newInventory;

    saveGameData();
    document.getElementById('debugOverlay').classList.remove('active');
    if(typeof switchMode === 'function') switchMode('play');
    updateStatUI();
};

// 【修正後】TDZエラーを完全に回避する安全装置付き
setInterval(() => {
    let mode = 'unknown'; try { mode = currentMode; } catch(e) {}
    if (mode === 'play') {
        if (typeof updateStatUI === 'function') updateStatUI();
        if (typeof window.updateQuestHUD === 'function') window.updateQuestHUD();
    }
}, 1000);

setTimeout(() => {
    applyTranslations();
    updateStatUI();
    updateCommandHUD();
}, 500);

let rouletteCandidates = [];
let rouletteAnimId = null;
let rouletteRotation = 0;
let rouletteSpeed = 0;
let rouletteState = 'idle'; 
let selectedEvoIndex = -1;
let effectTicks = 0;
let previousSkin = "";

// ★修正：プリロードも余計なすり替えを削除！
window.openEvolutionMenu = function() {
    const evos = typeof aiPet !== 'undefined' && aiPet.getAvailableEvolutions ? aiPet.getAvailableEvolutions() : [];
    if (evos.length === 0) return;
    
    rouletteCandidates = evos;
    previousSkin = aiPet.currentSkin || 'robot'; 
    
    // ==========================================
    // ★ルーレット演出中に画像をシンプルに先読みするだけ！
    evos.forEach(evo => {
        let type = evo.next;
        let conf = aiConfigs[type];
        if (conf) {
            let imgKey = conf.img || type.split('_')[0];
            if (!images[imgKey] && typeof window.dynamicImageCatalog !== 'undefined' && window.dynamicImageCatalog[imgKey]) {
                images[imgKey] = new Image();
                images[imgKey].src = window.dynamicImageCatalog[imgKey];
            }
        }
    });
    // ==========================================

    const container = document.getElementById('roulette-container');
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.height = "250px"; 
    
    const canvas = document.createElement('canvas');
    canvas.id = 'evolutionCanvas';
    canvas.width = 400;
    canvas.height = 300;
    container.appendChild(canvas);
    
    document.getElementById('btnStartRoulette').style.display = 'block';
    document.getElementById('btnCancelEvolution').style.display = 'block';
    document.getElementById('evolutionOverlay').classList.add('active');
    
    rouletteState = 'idle';
    rouletteRotation = 0;
    
    if (rouletteAnimId) cancelAnimationFrame(rouletteAnimId);
    rouletteAnimLoop(); 
};

// ★究極修正：進化後の画像をストレートに描画し、未調整時の枠サイズも自動補正する完全版！
function drawCharacterSprite(ctx, type, cx, cy, maxW, maxH, isSilhouette, alpha = 1.0) {
    let conf = aiConfigs[type];
    if(!conf) return;
    if (conf.img && aiConfigs[conf.img] && aiConfigs[conf.img].actions) conf = aiConfigs[conf.img];
    
    let imgKey = conf.img || type.split('_')[0];
    let img = images[imgKey];

    // 画像がまだリクエストされていない場合はロードを開始する
    if (!img) {
        if (typeof window.dynamicImageCatalog !== 'undefined' && window.dynamicImageCatalog[imgKey]) {
            images[imgKey] = new Image();
            images[imgKey].src = window.dynamicImageCatalog[imgKey]; 
        }
        return; 
    }
    
    // ★超重要：ロード中、または画像がない(404エラー)場合は描画をスキップ（クラッシュを完璧に防ぐ）
    if (!img.complete || img.naturalWidth === 0) return;
    
    // 基本の座標を取得
    let f = (conf.actions && conf.actions.idle && conf.actions.idle.length > 0) ? conf.actions.idle[0] : {sx:0, sy:0, sw:300, sh:300};
    
    // ==========================================
    // ★天才的な安全装置：
    // 進化系（名前に '_' が含まれる）の場合、切り取り枠が基本種族のまま（例: robotの幅194等）だと
    // 画像が大きすぎて4分の1しか映らないため、未調整と判断して仮の大きな枠で切り取る！
    // ==========================================
    if (type.includes('_') && f.sw < 250) {
        // スプライトシートの左上にあると仮定して、少し広め（450x450）に切り取る
        // ※もしこれでもはみ出る場合は 500 などに増やしてください
        f = { sx: 0, sy: 0, sw: 450, sh: 450 }; 
    }

    const scale = Math.min(maxW / f.sw, maxH / f.sh);
    const drawW = f.sw * scale; 
    const drawH = f.sh * scale;
    
    ctx.save();
    ctx.globalAlpha = alpha;
    if (isSilhouette) {
        ctx.filter = "brightness(0)"; 
    }
    ctx.translate(cx, cy);
    ctx.drawImage(img, f.sx, f.sy, f.sw, f.sh, -drawW/2, -drawH/2, drawW, drawH);
    ctx.restore();
}

function rouletteAnimLoop() {
    const canvas = document.getElementById('evolutionCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 120; 
    
    ctx.clearRect(0, 0, width, height);
    
    const N = rouletteCandidates.length;
    const sliceAngle = (2 * Math.PI) / N;
    const colors = ['#f44336', '#4caf50', '#2196f3', '#ffeb3b', '#9c27b0', '#00bcd4', '#ff9800', '#8bc34a'];
    
    if (rouletteState === 'idle' || rouletteState === 'spinning') {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rouletteRotation);
        
        for (let i = 0; i < N; i++) {
            const startAngle = i * sliceAngle;
            const endAngle = startAngle + sliceAngle;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            ctx.strokeStyle = "#222";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            const midAngle = startAngle + sliceAngle / 2;
            const imgRadius = radius * 0.6; 
            const charCx = Math.cos(midAngle) * imgRadius;
            const charCy = Math.sin(midAngle) * imgRadius;
            
            ctx.save();
            ctx.translate(charCx, charCy);
            ctx.rotate(midAngle + Math.PI / 2); 
            drawCharacterSprite(ctx, rouletteCandidates[i].next, 0, 0, 50, 50, true);
            ctx.restore();
        }
        ctx.restore();
        
        ctx.beginPath();
        ctx.moveTo(cx, cy - radius + 5);
        ctx.lineTo(cx - 10, cy - radius - 15);
        ctx.lineTo(cx + 10, cy - radius - 15);
        ctx.closePath();
        ctx.fillStyle = "#FFD700";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (rouletteState === 'spinning') {
            rouletteRotation -= rouletteSpeed; 
            rouletteSpeed *= 0.985; 
            
            if (rouletteSpeed < 0.002) {
                rouletteSpeed = 0;
                rouletteState = 'effect';
                effectTicks = 0;
                
                let pointerAngle = (-Math.PI / 2) - rouletteRotation;
                pointerAngle = (pointerAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
                
                selectedEvoIndex = Math.floor(pointerAngle / sliceAngle) % N;
                
                const selectedEvo = rouletteCandidates[selectedEvoIndex];
                aiPet.message = "進化した！！";
                aiPet.messageTimer = 180;

                // ==========================================
                // ★ここを1行追加！！AIの姿を本当に変える！！
                aiPet.currentSkin = selectedEvo.next;
                // ==========================================
                
                if (!aiPet.discoveredMonsters) aiPet.discoveredMonsters = [];
                if (!aiPet.discoveredMonsters.includes(selectedEvo.next)) aiPet.discoveredMonsters.push(selectedEvo.next);
                saveGameData();
            }
        }

    } else if (rouletteState === 'effect') {
        effectTicks++;
        const targetEvo = rouletteCandidates[selectedEvoIndex].next;
        
        let bgAlpha = Math.max(0, 1.0 - effectTicks / 30);
        if (bgAlpha > 0) {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(rouletteRotation);
            for (let i = 0; i < N; i++) {
                ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, radius, i * sliceAngle, (i+1) * sliceAngle); ctx.closePath();
                ctx.fillStyle = colors[i % colors.length]; ctx.globalAlpha = bgAlpha; ctx.fill();
            }
            ctx.restore();
        }
        
        let oldAlpha = 0; let newAlpha = 0;
        if (effectTicks > 30 && effectTicks <= 80) {
            oldAlpha = 1.0; 
        } else if (effectTicks > 80 && effectTicks <= 140) {
            oldAlpha = Math.max(0, 1.0 - (effectTicks - 80) / 60); 
            newAlpha = Math.min(1.0, (effectTicks - 80) / 60);     
        } else if (effectTicks > 140) {
            newAlpha = 1.0;
        }
        
        if (oldAlpha > 0) drawCharacterSprite(ctx, previousSkin, cx, cy, 180, 180, true, oldAlpha);
        if (newAlpha > 0 && effectTicks < 180) drawCharacterSprite(ctx, targetEvo, cx, cy, 180, 180, true, newAlpha);
        
        let flashAlpha = 0;
        if (effectTicks > 140 && effectTicks <= 160) flashAlpha = (effectTicks - 140) / 20; 
        else if (effectTicks > 160 && effectTicks <= 200) flashAlpha = Math.max(0, 1.0 - (effectTicks - 160) / 40); 
        
        if (flashAlpha > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
            ctx.fillRect(0, 0, width, height);
            
            ctx.save();
            ctx.translate(cx, cy);
            ctx.globalAlpha = flashAlpha;
            for(let i=0; i<12; i++) {
                ctx.rotate((Math.PI * 2 / 12) + effectTicks * 0.05);
                ctx.fillStyle = "#FFF";
                ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(3, 0); ctx.lineTo(0, 300); ctx.fill();
            }
            ctx.restore();
        }
        
        if (effectTicks > 160) {
            let colorAlpha = Math.min(1.0, (effectTicks - 160) / 10);
            drawCharacterSprite(ctx, targetEvo, cx, cy, 180, 180, false, colorAlpha);
        }
        
        if (effectTicks > 240) {
            if (typeof updateStatUI === 'function') updateStatUI();
            document.getElementById('evolutionOverlay').classList.remove('active');
            window.isGamePaused = false;
            return; 
        }
    }
    
    rouletteAnimId = requestAnimationFrame(rouletteAnimLoop);
}

window.startEvolutionRoulette = function() {
    document.getElementById('btnStartRoulette').style.display = 'none';
    document.getElementById('btnCancelEvolution').style.display = 'none';
    
    window.isGamePaused = true; 
    
    rouletteState = 'spinning';
    rouletteSpeed = 0.4 + Math.random() * 0.2; 
};

window.cancelEvolution = function() {
    document.getElementById('evolutionOverlay').classList.remove('active');
};

// ==========================================
// ★ UI制御：弟子入り・クエスト・会話の統合システム
// ==========================================
let currentEncounterMaster = null;
let currentEncounterMode = '';
let savedEncounterMsg = ""; 

// ==========================================
// ★ 追加：UIから直接バイトを行う機能
// ==========================================
window.startBaito = function() {
    const hero = (typeof party !== 'undefined' && party.length > 0) ? party[0] : window.aiPet;
    const overlay = document.getElementById('encounterOverlay');
    if (overlay) overlay.classList.remove('active');
    window.isGamePaused = false;
    
    if (hero.apprentice && currentEncounterMaster && !hero.apprentice.isExcommunicated) {
        let facility = null;
        if (typeof findFacilityForTask === 'function') facility = findFacilityForTask('visit_master', currentEncounterMaster);
        if (facility) {
            hero.schedule = []; 
            hero.startBuildingInteraction(facility);
            hero.message = "師匠のところでバイトしてくる！"; hero.messageTimer = 120;
            let baitoInterval = setInterval(() => {
                if (hero.actionState === 'inside' && hero.indoorTarget === facility) {
                    setTimeout(() => {
                        hero.gold = (hero.gold || 0) + 50; 
                        hero.energy = Math.max(0, (hero.energy || 100) - 10); 
                        hero.hunger = Math.max(0, (hero.hunger || 100) - 10);
                        hero.message = "バイト完了！ 50G稼いだよ！"; hero.messageTimer = 180;
                        if (typeof updateStatUI === 'function') updateStatUI();
                        if (typeof addFloatingText === 'function') addFloatingText(hero.x, hero.y - 40, "+50 G", "#FFD700");
                        hero.actionState = 'exiting'; hero.indoorTarget = null;
                        if (typeof saveGameData === 'function') saveGameData();
                    }, 3000); 
                    clearInterval(baitoInterval);
                } else if (hero.actionState === 'idle') { clearInterval(baitoInterval); }
            }, 500);
        }
    }
};

// ==========================================
// ★ 追加：連続で次の課題を受ける機能
// ==========================================
window.requestNextQuest = function() {
    // ★大修正：隠しポケットにメモしておいた師匠の名前を確実に取り出す！
    const masterType = window._lastVisitedMaster;

    if (typeof confirmEncounter === 'function') confirmEncounter(true);
    
    // UIが閉じた直後に、自動でもう一度師匠に話しかける処理を呼ぶ！
    setTimeout(() => {
        if (typeof window.checkMasterVisit === 'function' && masterType) {
            window.checkMasterVisit(masterType);
        } else {
            console.warn("師匠のデータが見失われました");
        }
    }, 200);
};

// ==========================================
// ★ 修正：UI描画（バイト・連続受注・特大ヒント対応版！）
// ==========================================
window.openEncounterUI = function(masterType, message, mode = 'encounter') {
    const hero = (typeof party !== 'undefined' && party.length > 0) ? party[0] : window.aiPet;
    if (!hero) return;
    
    currentEncounterMaster = masterType;
    currentEncounterMode = mode;
    if (message) savedEncounterMsg = message; 
    
    const overlay = document.getElementById('encounterOverlay');
    if (!overlay) return;
    overlay.classList.add('active');
    
    let thoughtText = "（なんだかすごそうな人だ...！）";
    let rightText = savedEncounterMsg;
    let showTail = true;

    if (mode === 'encounter_intro') {
        thoughtText = "（だれ？ だれかいる...？）"; rightText = "（何者かの気配がする...）"; showTail = false; 
    }
    else if (mode === 'encounter') {
        let baseThought = ""; let score = 0; let missingStat = ""; let missingWord = false; let exactWord = "";
        const words = hero.apprentice.learnedWords || [];
        
        if (masterType === 'explore') { baseThought = "色んな場所を知ってそう...！"; exactWord = "探検"; if (words.includes(exactWord)) score += 30; else missingWord = true; score += hero.stats.power; missingStat = "活力"; }
        else if (masterType === 'farming') { baseThought = "土のいい匂いがする...！"; exactWord = "農業"; if (words.includes(exactWord) || words.includes("水やり")) score += 20; else missingWord = true; score += hero.stats.power; missingStat = "活力"; }
        else if (masterType === 'fishing') { baseThought = "大物が釣れそうなオーラ...！"; exactWord = "釣り"; if (words.includes(exactWord)) score += 30; else missingWord = true; score += (hero.stats.intel + hero.stats.power) / 2; missingStat = "賢さや活力"; }
        else if (masterType === 'cooking') { baseThought = "すごくいい匂いがする...！"; exactWord = "料理"; if (words.includes(exactWord) || words.includes("食事")) score += 20; else missingWord = true; score += hero.stats.intel; missingStat = "賢さ"; }
        else if (masterType === 'smithing') { baseThought = "熱い...！火の扱いがすごそう！"; exactWord = "鍛冶"; if (words.includes(exactWord)) score += 30; else missingWord = true; score += (hero.stats.power + hero.stats.intel) / 2; missingStat = "活力や賢さ"; }
        else if (masterType === 'building') { baseThought = "プロの職人さんの手だ...！"; exactWord = "建築"; if (words.includes(exactWord) || words.includes("木")) score += 30; else missingWord = true; score += hero.stats.intel; missingStat = "賢さ"; }
        
        score += (hero.stats.mood - 50) * 0.2; 
        
        let hint = "";
        const attempts = (hero.apprentice.attempts && hero.apprentice.attempts[masterType]) ? hero.apprentice.attempts[masterType] : 0;

        if (score >= 50) {
            hint = "今の僕なら、きっと認めてもらえるはず！";
        } else if (attempts >= 1) {
            // ★大修正：1回以上不合格になっている場合は、特大ヒントを出す！
            if (missingWord) {
                hint = `（前回ダメだったのは言葉のせいだ！チャットで「${exactWord}」って教えてもらえれば…！）`;
            } else {
                let shortAmt = Math.ceil(50 - score);
                hint = `（言葉はOKだ！あとは勉強や筋トレで「${missingStat}」をあと ${shortAmt} くらい上げれば絶対受かるはず…！）`;
            }
        } else {
            // 初回のヒント（フワッとしている）
            if (score >= 35) { if (missingWord) hint = "でも、もう少しこの人の『専門知識』を勉強しないと...。"; else hint = `でも、もう少し『${missingStat}』を鍛えないと厳しいかも...。`; } 
            else { if (missingWord) hint = `今のままじゃダメだ...『${missingStat}』と『専門知識』を身につけよう。`; else hint = `今の『${missingStat}』じゃ、まだ相手にされないかも...。`; }
        }
        thoughtText = `（${baseThought}\n${hint}）`;
    } 
    else if (mode === 'quest_offer') { thoughtText = "（新しい課題だ...！頑張ろう！）"; }
    else if (mode === 'quest_report' || mode === 'rank_up') { thoughtText = "（うまくできたかな...？）"; }
    else if (mode === 'exam_pass') { thoughtText = "（やったー！弟子入りだ！）"; }
    else if (mode === 'exam_fail' || mode === 'retire') { thoughtText = "（だめだったか...）"; }
    else if (mode === 'excommunicate') { thoughtText = "（怒らせてしまった...）"; }
    else if (mode === 'graduate') { thoughtText = "（ついにここまで来たんだ...！）"; }

    document.getElementById('encounter-text').innerText = rightText;
    const thoughtEl = document.getElementById('ai-thought-text');
    if (thoughtEl) thoughtEl.innerText = thoughtText;
    const tailEl = document.getElementById('encounter-tail');
    if (tailEl) tailEl.style.display = showTail ? 'block' : 'none';
    
    const canvas = document.getElementById('encounterCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height);
        let bgImgKey = 'field_bg'; let getCrop = (img) => { return {sx:0, sy:0, sw:img.width, sh:img.height}; };
        if (masterType === 'explore' || masterType === 'building') { bgImgKey = 'field_bg'; getCrop = (img) => { return { sx: img.width/2, sy: img.height/2, sw: img.width/2, sh: img.height/2 }; }; } 
        else if (masterType === 'farming') { bgImgKey = 'field_bg'; getCrop = (img) => { return { sx: img.width/2, sy: 0, sw: img.width/2, sh: img.height/2 }; }; } 
        else if (masterType === 'smithing') { bgImgKey = 'field_bg'; getCrop = (img) => { return { sx: 0, sy: img.height/2, sw: img.width/2, sh: img.height/2 }; }; } 
        else if (masterType === 'fishing') { bgImgKey = 'fishing_bg'; getCrop = (img) => { return { sx: 0, sy: 0, sw: img.width, sh: img.height/2 }; }; } 
        else if (masterType === 'cooking') { bgImgKey = 'room_bg'; getCrop = (img) => { return { sx: 0, sy: 0, sw: img.width/2, sh: img.height }; }; }

        const bgImg = typeof images !== 'undefined' ? images[bgImgKey] : null;
        if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
            const crop = getCrop(bgImg); ctx.drawImage(bgImg, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, canvas.width, canvas.height);
        } else { ctx.fillStyle = "#333"; ctx.fillRect(0, 0, canvas.width, canvas.height); }

        let skin = hero.currentSkin || 'robot'; 
        if (typeof drawCharacterSprite === 'function') drawCharacterSprite(ctx, skin, canvas.width / 2, canvas.height / 2 + 20, 160, 160, false, 1.0);
    }
    
    const btnBox = document.getElementById('encounter-buttons');
    if (btnBox) {
        btnBox.style.display = 'flex';
        btnBox.style.flexDirection = 'column';
        btnBox.style.gap = '8px';

        let baitoBtn = "";
        if (hero.apprentice && hero.apprentice.currentMaster === masterType && !hero.apprentice.isExcommunicated) {
            baitoBtn = `<button class="quiz-btn" onclick="window.startBaito()" style="flex: 1; padding: 10px; font-size: 14px; background: #4CAF50; color: #fff; font-weight: bold; border: 2px solid #388E3C; border-radius: 8px; cursor: pointer;">💰 バイトする</button>`;
        }

        if (mode === 'encounter_intro') {
            btnBox.innerHTML = `<button class="quiz-btn" onclick="confirmEncounter(true)" style="padding: 12px; font-size: 16px; background: #2196F3; color: #fff; font-weight: bold; border: 2px solid #1976D2; border-radius: 8px; cursor: pointer;">辺りを見渡す ▶</button>`;
        }
        else if (mode === 'encounter' || mode === 'quest_offer') {
            let yesText = mode === 'encounter' ? "話を聞いてみる（試験へ）" : "課題を受ける";
            
            btnBox.innerHTML = `
                <button class="quiz-btn" onclick="confirmEncounter(true)" style="padding: 12px; font-size: 16px; background: linear-gradient(to bottom, #FFD700, #FF9800); color: #000; font-weight: bold; border: 2px solid #FFD700; border-radius: 8px; cursor: pointer;">${yesText}</button>
                <div style="display: flex; gap: 8px; width: 100%;">
                    ${baitoBtn}
                    <button class="quiz-btn" onclick="confirmEncounter(false)" style="flex: 1; padding: 10px; font-size: 14px; background: #666; color: #ddd; border: 2px solid #555; border-radius: 8px; cursor: pointer;">今はやめる</button>
                </div>
            `;
        } else {
            let btnText = "わかった";
            let isReportEnd = false;
            
            if (mode === 'exam_pass') btnText = "よろしくお願いします！";
            else if (mode === 'exam_fail' || mode === 'retire') btnText = "立ち去る";
            else if (mode === 'excommunicate') btnText = "はい……";
            else if (mode === 'graduate') btnText = "ありがとうございます！";
            else if (mode === 'quest_not_clear') btnText = "引き続き頑張ります";
            else if (mode === 'rank_up' || mode === 'quest_report') { 
                btnText = "報告完了"; 
                isReportEnd = true; 
            }

            let nextQuestBtn = "";
            if (isReportEnd) {
                nextQuestBtn = `<button class="quiz-btn" onclick="window.requestNextQuest()" style="flex: 1; padding: 10px; font-size: 14px; background: #E91E63; color: #fff; font-weight: bold; border: 2px solid #C2185B; border-radius: 8px; cursor: pointer;">📋 次の課題へ</button>`;
            }

            let mainBtn = `<button class="quiz-btn" onclick="confirmEncounter(true)" style="flex: 1; padding: 10px; font-size: 14px; background: #2196F3; color: #fff; font-weight: bold; border: 2px solid #1976D2; border-radius: 8px; cursor: pointer;">${btnText}</button>`;

            btnBox.innerHTML = `
                <div style="display: flex; gap: 8px; width: 100%;">
                    ${mainBtn}
                    ${nextQuestBtn}
                </div>
                ${baitoBtn ? `<div style="display: flex; gap: 8px; width: 100%;">${baitoBtn.replace('flex: 1;', 'width: 100%;')}</div>` : ''}
            `;
        }
    }
    window.isGamePaused = true;
};

window.confirmEncounter = function(isAccept) {
    if (currentEncounterMode === 'encounter_intro') {
        window.openEncounterUI(currentEncounterMaster, savedEncounterMsg, 'encounter');
        return; 
    }

    document.getElementById('encounterOverlay').classList.remove('active');
    window.isGamePaused = false;
    
    const hero = (typeof party !== 'undefined' && party.length > 0) ? party[0] : window.aiPet;
    if (!hero) return;

    const mType = currentEncounterMaster;
    
    if (currentEncounterMode === 'encounter') {
        // ★修正：二重カウントの原因になっていた自作処理を削除し、コアシステムに任せる！
        if (isAccept) hero.applyApprenticeship(mType);
        else { hero.message = "立ち去った..."; hero.messageTimer = 120; }
    } 
    else if (currentEncounterMode === 'quest_offer') {
        if (isAccept) {
            const rank = hero.apprentice.rank[mType] || 1;
            const qData = hero.getMasterQuestData(mType, rank);
            qData.setup(); 
            
            hero.apprentice.activeQuest = { name: qData.name, desc: qData.desc };
            hero.message = "課題を受けた！頑張ろう！"; hero.messageTimer = 120;
            if (typeof window.updateQuestHUD === 'function') window.updateQuestHUD();
        }
    }
    else if (currentEncounterMode === 'quest_not_clear') {
        hero.message = "引き続き課題を頑張ろう..."; hero.messageTimer = 120;
    }
    else if (currentEncounterMode === 'exam_pass') {
        hero.apprentice.currentMaster = mType;
        hero.apprentice.rank[mType] = 1;

        if (mType === 'smithing') {
            let tx = hero.x + 100;
            let ty = hero.y;
            if (tx > 750) tx = hero.x - 100;
            if (typeof hero.isPointOnWater === 'function' && hero.isPointOnWater(tx, ty)) tx = hero.x - 100; 
            
            let campId = 'blacksmith_master_camp';
            if (typeof assets !== 'undefined') {
                assets[campId] = { type: 'blacksmith', name: '師匠のキャンプ', dx: tx, dy: ty, sw: 100, sh: 100, scale: 0.6 };
            }
        }
        else if (mType === 'building') {
            let tx = hero.x - 120; 
            let ty = hero.y;
            if (tx < 50) tx = hero.x + 120;
            if (typeof hero.isPointOnWater === 'function' && hero.isPointOnWater(tx, ty)) tx = hero.x + 120;
            
            let campId = 'building_master_camp';
            if (typeof assets !== 'undefined') {
                assets[campId] = { type: 'palms', name: '建築士のテント', dx: tx, dy: ty, sw: 100, sh: 100, scale: 0.6 };
            }
        }
        
        const masterNames = { 'explore': '冒険家', 'farming': '農家', 'fishing': '漁師', 'cooking': '料理人', 'smithing': '鍛冶師', 'building': '建築士' };
        const mName = masterNames[mType];
        const wordsToLearn = [mName, "クエスト", "課題"];
        let newlyLearned = []; 
        wordsToLearn.forEach(w => {
            if (!hero.apprentice.learnedWords.includes(w)) {
                hero.apprentice.learnedWords.push(w); newlyLearned.push(w);
            }
        });
        if (newlyLearned.length > 0) {
            setTimeout(() => {
                hero.message = `「${newlyLearned.join('、')}」という言葉を覚えた！`; hero.messageTimer = 180;
                if (typeof addFloatingText === 'function') addFloatingText(hero.x, hero.y - 60, "言葉を学習した！", "#FF9800");
                if (typeof updateCommandHUD === 'function') updateCommandHUD();
            }, 1000); 
        }
    }
    else if (currentEncounterMode === 'rank_up') {
        hero.apprentice.rank[mType] = (hero.apprentice.rank[mType] || 1) + 1;
        hero.apprentice.activeQuest = null; 
        if (typeof window.updateQuestHUD === 'function') window.updateQuestHUD();
    }
    else if (currentEncounterMode === 'graduate') {
        hero.apprentice.successCount = 0; hero.apprentice.rank[mType] = 10;
        hero.apprentice.isGraduated = true; hero.apprentice.currentMaster = null;
        hero.apprentice.activeQuest = null; 
        
        if (mType === 'farming') { hero.apprentice.title = "農業マスター"; hero.stats.power += 50; }
        else if (mType === 'cooking') { hero.apprentice.title = "三ツ星シェフ"; hero.skills.cooking = 20; hero.stats.intel += 50; }
        else if (mType === 'smithing') { hero.apprentice.title = "伝説の鍛冶屋"; hero.skills.smithing = 20; hero.stats.power += 25; hero.stats.intel += 25; }
        else if (mType === 'explore') { hero.apprentice.title = "大冒険家"; hero.stats.power += 50; hero.stats.mood += 50; hero.inventory.push('crystal'); }
        else if (mType === 'fishing') { hero.apprentice.title = "伝説の漁師"; hero.stats.power += 25; hero.stats.intel += 25; if(typeof itemCatalog !== 'undefined' && itemCatalog['rod_super']) hero.inventory.push('rod_super'); }
        else if (mType === 'building') { hero.apprentice.title = "一流建築士"; hero.skills.building = 20; hero.stats.power += 30; hero.stats.intel += 30; }

        if (typeof updateStatUI === 'function') updateStatUI();
        if (typeof window.updateQuestHUD === 'function') window.updateQuestHUD(); 

        // ==========================================
        // ★大追加：免許皆伝後、AIが自ら「余生」を決断する！
        // ==========================================
        if (typeof hero.determineLifePath === 'function') {
            const chosenPath = hero.determineLifePath();
            
            // 卒業ダイアログが閉じた直後に、AIからの特別なメッセージウィンドウを出す
            setTimeout(() => {
                if (typeof window.showLifePathEvent === 'function') {
                    window.showLifePathEvent(hero, chosenPath);
                }
            }, 800);
        }
    }
    else if (currentEncounterMode === 'excommunicate') {
        hero.apprentice.isExcommunicated = true;
        hero.apprentice.currentMaster = null;
        hero.apprentice.activeQuest = null;
        if (typeof window.updateQuestHUD === 'function') window.updateQuestHUD();
    }
    else if (currentEncounterMode === 'retire') {
        hero.apprentice.retired = hero.apprentice.retired || {};
        hero.apprentice.retired[mType] = true;
        if (mType === 'farming') { for (let k in assets) { if (assets[k].type === 'farm') { delete assets[k]; break; } } }
        else if (mType === 'cooking') { for (let k in assets) { if (assets[k].type === 'restaurant' && assets[k].isMobile) { delete assets[k]; break; } } }
    }
    currentEncounterMaster = null; currentEncounterMode = '';
};

// ★ 追加：AIが師匠の場所に到着した時に呼ばれる処理
window.checkMasterVisit = function(masterType) {
    // ★大修正：話しかけた瞬間、誰と話しているかを隠しポケットに絶対メモしておく！
    if (masterType) {
        window._lastVisitedMaster = masterType;
    }

    // ★修正: 対象を常に主人公（リーダー）に固定する
    const hero = (typeof party !== 'undefined' && party.length > 0) ? party[0] : window.aiPet;
    if (!hero || !hero.apprentice) return;
    
    const app = hero.apprentice;
    const rank = app.rank[masterType] || 1;

    if (app.activeQuest) {
        const qData = hero.getMasterQuestData(masterType, rank);
        
        if (qData.check()) {
            if (typeof qData.onClear === 'function') qData.onClear(); 
            
            if (rank >= 9) {
                 window.openEncounterUI(masterType, "「見事だ！お前に教えることはもう何もない...免許皆伝だ！」", 'graduate');
            } else {
                 window.openEncounterUI(masterType, `「よし、課題クリアだ！お前のランクが ${rank + 1} に上がったぞ！」`, 'rank_up');
            }
        } else {
             window.openEncounterUI(masterType, "「どうした？まだ課題は終わっていないようだが...」", 'quest_not_clear');
        }
    } else {
        const qData = hero.getMasterQuestData(masterType, rank);
        window.openEncounterUI(masterType, `「新たなる課題『${qData.name}』を命ずる！\n内容：${qData.desc}」`, 'quest_offer');
    }
};

window.updateQuestHUD = function() {
    const hud = document.getElementById('questHUD');
    const list = document.getElementById('questListHUD');
    if (!hud || !list) return;

    // ★修正: 助っ人操作中はHUDを非表示にする
    if (typeof aiPet !== 'undefined' && aiPet.apprentice && aiPet.apprentice.activeQuest && !aiPet.isHelper) {
        hud.style.display = 'block';
        
        const mType = aiPet.apprentice.currentMaster;
        const rank = aiPet.apprentice.rank[mType] || 1;
        const qData = aiPet.getMasterQuestData(mType, rank);
        
        let isCleared = false;
        if (qData && qData.check) {
            isCleared = qData.check();
        }

        if (isCleared) {
            hud.style.border = "2px solid #4CAF50";
            hud.style.boxShadow = "0 0 15px rgba(76, 175, 80, 0.6)";
            list.innerHTML = `
                <div style="font-size: 13px; font-weight: bold; color: #fff;">${aiPet.apprentice.activeQuest.name}</div>
                <div style="font-size: 11px; color: #ccc; margin-top: 4px; line-height: 1.4;">${aiPet.apprentice.activeQuest.desc}</div>
                <div style="font-size: 12px; color: #4CAF50; font-weight: bold; margin-top: 8px; text-align: center; background: rgba(76, 175, 80, 0.2); padding: 5px; border-radius: 4px;">✅ 条件達成！報告しよう</div>
            `;
        } else {
            hud.style.border = "1px solid rgba(255, 255, 255, 0.3)";
            hud.style.boxShadow = "none";
            
            let progressStr = "";
            if (typeof aiPet.apprentice.qVal === 'number') {
                let currentVal = 0;
                let targetVal = Math.floor(aiPet.apprentice.qVal); 
                
                if (aiPet.apprentice.activeQuest.desc.includes("活力") || aiPet.apprentice.activeQuest.desc.includes("賢さ")) {
                    const isPower = aiPet.apprentice.activeQuest.desc.includes("活力");
                    currentVal = Math.floor(isPower ? aiPet.stats.power : aiPet.stats.intel);
                    const targetVal = Math.floor(aiPet.apprentice.qVal);
                    const label = isPower ? "活力" : "賢さ";
                    
                    if (currentVal >= targetVal) {
                        progressStr = `<div style="font-size: 11px; color: #4CAF50; margin-top: 4px;">目標達成！ (${currentVal} / ${targetVal})</div>`;
                    } else {
                        progressStr = `<div style="font-size: 11px; color: #FF9800; margin-top: 4px;">現在の${label}: ${currentVal} / 目標: ${targetVal}</div>`;
                    }
                } else if (targetVal > 0) {
                    progressStr = `<div style="font-size: 11px; color: #FF9800; margin-top: 4px;">進捗: ${targetVal} 回完了</div>`;
                }
            }

            list.innerHTML = `
                <div style="font-size: 13px; font-weight: bold; color: #fff;">${aiPet.apprentice.activeQuest.name}</div>
                <div style="font-size: 11px; color: #ccc; margin-top: 4px; line-height: 1.4;">${aiPet.apprentice.activeQuest.desc}</div>
                ${progressStr}
                <div style="font-size: 10px; color: #ffeb3b; margin-top: 6px; text-align: right;">※進行中...</div>
            `;
        }
    } else {
        hud.style.display = 'none';
        list.innerHTML = "";
    }
};

// ==========================================
// ★ 音声認識システム (ひらがな忘却対応版)
// ==========================================
window.startVoiceRecognition = function() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("お使いのブラウザは音声認識に対応していません。Chrome等の最新ブラウザをご利用ください。");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP'; 
    recognition.interimResults = false; 
    recognition.maxAlternatives = 1;

    const btnVoice = document.getElementById('btnVoice');
    const chatInput = document.getElementById('chatInput');

    recognition.onstart = function() {
        btnVoice.style.background = '#f44336'; 
        btnVoice.innerText = '🔴 認識中...';
        chatInput.placeholder = "AIに話しかけてください...";
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript; 
        window.sendChat(); // 自動送信
    };

    recognition.onend = function() {
        btnVoice.style.background = '#2196F3'; 
        btnVoice.innerText = '🎙️';
        chatInput.placeholder = "チャット...";
    };

    recognition.onerror = function(event) {
        console.warn("音声認識エラー:", event.error);
        if (event.error === 'not-allowed') {
            alert("マイクの使用が許可されていません。ブラウザの設定を確認してください。");
        }
    };

    recognition.start();
};

// ==========================================
// ★ パーティシステムUI（操作切り替え＆助っ人テスト）
// ==========================================
function initPartyUI() {
    const uiContainer = document.createElement('div');
    uiContainer.id = 'party-ui-container';
    uiContainer.style.position = 'absolute';
    uiContainer.style.top = '10px';
    uiContainer.style.left = '10px';
    uiContainer.style.display = 'flex';
    uiContainer.style.gap = '10px';
    uiContainer.style.zIndex = '100';

    // ==========================================
    // ★ ここに1行追加：最初は「最強の隠しクラス」をつけて透明にしておく！
    uiContainer.classList.add('hidden-feature');
    
    const addBtn = document.createElement('button');
    addBtn.innerText = '🍻 酒場へ行く'; // ★名前をカッコよく変更
    addBtn.style.padding = '5px 10px';
    addBtn.style.background = '#FF9800';
    addBtn.style.color = 'black';
    addBtn.style.border = '2px solid #fff';
    addBtn.style.borderRadius = '20px';
    addBtn.style.fontWeight = 'bold';
    addBtn.style.cursor = 'pointer';
    // ★ここからクリック時の処理を上書き
    addBtn.onclick = () => {
        if(party.length >= 3) { alert("パーティは3人までです！（現在のメンバーを解雇する機能は後ほど実装します）"); return; }
        switchRightPanel('tavern'); // 酒場パネルを開く！
    };
    // ★ここから追加：ランキングボタン
    const rankBtn = document.createElement('button');
    rankBtn.innerText = '🏆 ランキング';
    rankBtn.style.padding = '5px 10px';
    rankBtn.style.background = '#FFD700';
    rankBtn.style.color = 'black';
    rankBtn.style.border = '2px solid #fff';
    rankBtn.style.borderRadius = '20px';
    rankBtn.style.fontWeight = 'bold';
    rankBtn.style.cursor = 'pointer';
    rankBtn.onclick = () => { window.switchRankingCategory('status'); };
    // ★ここまで追加

    const canvasWrap = document.getElementById('canvas-wrapper');
    if(canvasWrap) {
        canvasWrap.appendChild(uiContainer);
        uiContainer.appendChild(addBtn);
        uiContainer.appendChild(rankBtn); // ★これも忘れずに追加！
    }
}

window.updatePartyUI = function() {
    if(typeof party === 'undefined' || party.length === 0) return;
    const container = document.getElementById('party-ui-container');
    if(!container) return;
    
    document.querySelectorAll('.party-icon').forEach(el => el.remove());
    
    party.forEach((pet, index) => {
        const icon = document.createElement('div');
        icon.className = 'party-icon';
        icon.style.width = '40px';
        icon.style.height = '40px';
        icon.style.borderRadius = '50%';
        icon.style.background = (index === window.activePartyIndex) ? '#4CAF50' : '#444';
        icon.style.border = (index === window.activePartyIndex) ? '3px solid #FFF' : '2px solid #888';
        icon.style.cursor = 'pointer';
        icon.style.display = 'flex';
        icon.style.justifyContent = 'center';
        icon.style.alignItems = 'center';
        icon.style.fontSize = '20px';
        icon.style.boxShadow = '0 2px 5px rgba(0,0,0,0.5)';
        icon.innerText = (index === 0) ? '👑' : '🤝'; 
        
        icon.onclick = () => {
            window.activePartyIndex = index;
            window.aiPet = party[index];
            
            if (typeof aiPet !== 'undefined') {
                aiPet = party[index];
            }
            
            updateStatUI();        
            updateCommandHUD();    
            updateScheduleList();  
            window.updatePartyUI();
        };
        
        container.insertBefore(icon, container.lastChild);
    });
};

setTimeout(() => { initPartyUI(); window.updatePartyUI(); }, 1500);

// ==========================================
// ★ クラウド酒場（リスト表示と雇用処理）
// ==========================================
window.currentCloudAIs = []; // 取得したリストを一時保存する配列

window.openTavernPanel = async function() {
    const list = document.getElementById('tavernList');
    if(!list) return;
    list.innerHTML = "<div style='color:white; text-align:center; padding: 20px;'>☁️ クラウドから助っ人を探しています...</div>";
    
    const cloudAIs = await window.fetchCloudAIs();
    window.currentCloudAIs = cloudAIs; // グローバルに保存
    list.innerHTML = "";
    
    if(!cloudAIs || cloudAIs.length === 0) {
        list.innerHTML = "<div style='color:#aaa; font-size:12px; text-align:center;'>現在、酒場には誰もいないようです...<br>※別ウィンドウで30秒ほど待ってから見てください。</div>";
        return;
    }
    
    cloudAIs.forEach((data, index) => {
        const div = document.createElement('div');
        div.className = 'panel-list-item';
        div.style.border = "1px solid #FF9800";
        div.style.backgroundColor = "#2a2a2a";
        
        let titleStr = data.title ? `<span style="color:#FFD700; font-weight:bold;">[${data.title}]</span> ` : "";
        let skinName = (typeof monsterBookData !== 'undefined' && monsterBookData[data.skin]) ? monsterBookData[data.skin].name : data.skin;
        
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <div style="font-size:14px; font-weight:bold; color:white;">${titleStr}${skinName}</div>
            </div>
            <div style="font-size:11px; color:#ccc; display:grid; grid-template-columns: 1fr 1fr; gap:4px; margin-bottom:8px;">
                <div>💪 活力: ${Math.floor(data.stats.power || 0)}</div>
                <div>🧠 賢さ: ${Math.floor(data.stats.intel || 0)}</div>
                <div>✨ 美しさ: ${Math.floor(data.stats.beauty || 0)}</div>
                <div>💬 語彙: ${(data.learnedWords || []).length} 語</div>
            </div>
            <button class="quiz-btn" style="width:100%; height:25px; font-size:12px; background:#FF9800; color:black;" onclick='hireCloudAI(${index})'>このAIを雇う</button>
        `;
        list.appendChild(div);
    });
};

window.hireCloudAI = function(index) {
    if(party.length >= 3) { alert("パーティは満員です！"); return; }
    const targetData = window.currentCloudAIs[index];
    if(!targetData) return;
    
    let helper = new AICharacter({
        isHelper: true, 
        x: window.aiPet.x + (Math.random()*100 - 50),
        y: window.aiPet.y + 50,
        currentSkin: targetData.skin, 
        energy: 100, hunger: 100,
        stats: targetData.stats,
        skills: targetData.skills || { cooking: 1, smithing: 1, building: 1 },
        apprentice: { 
            learnedWords: targetData.learnedWords || [], 
            title: targetData.title || "",
            rank: {}, attempts: {} 
        },
        schedule: [], inventory: [] 
    });
    
    party.push(helper);
    window.updatePartyUI();
    switchRightPanel('default'); // 雇ったらパネルを閉じる
    
    let tName = targetData.title ? `[${targetData.title}]` : "";
    alert(`酒場で ${tName}「${targetData.skin}」を雇いました！`);
};

// ==========================================
// ★ 総合ランキングシステム制御
// ==========================================
window.switchRankingCategory = function(category) {
    // UIを開く
    document.getElementById('dungeon-ranking-ui').classList.add('active');

    // ★ タブ切り替え時は、開いている詳細パネルを一旦隠す
    const detailArea = document.getElementById('ranking-detail-area');
    if (detailArea) detailArea.style.display = 'none';

    const tabStatus = document.getElementById('main-tab-status');
    const tabDungeon = document.getElementById('main-tab-dungeon');
    const subStatus = document.getElementById('sub-tabs-status');
    const subDungeon = document.getElementById('sub-tabs-dungeon');

    if (category === 'status') {
        tabStatus.style.color = '#FFF'; tabStatus.style.borderBottom = '3px solid #FFD700';
        tabDungeon.style.color = '#aaa'; tabDungeon.style.borderBottom = '3px solid transparent';
        subStatus.style.display = 'flex';
        subDungeon.style.display = 'none';
        window.openRankingPanel('power'); 
    } else {
        tabDungeon.style.color = '#FFF'; tabDungeon.style.borderBottom = '3px solid #FFD700';
        tabStatus.style.color = '#aaa'; tabStatus.style.borderBottom = '3px solid transparent';
        subStatus.style.display = 'none';
        subDungeon.style.display = 'flex';
        window.renderDungeonRankingList('skull'); 
    }
};

window.openRankingPanel = async function(sortKey = 'power') {
    const list = document.getElementById('ranking-list-container');
    if(!list) return;
    list.innerHTML = "<div style='color:#aaa; text-align:center; padding: 50px; font-size:18px;'>📡 クラウドから集計中...</div>";

    let cloudAIs = window.currentCloudAIs || [];
    if (cloudAIs.length === 0 && typeof window.fetchCloudAIs === 'function') {
        cloudAIs = await window.fetchCloudAIs();
        window.currentCloudAIs = cloudAIs;
    }

    const myPet = window.aiPet || {};
    let myData = {
        isMe: true, 
        playerName: localStorage.getItem('my_player_name') || "あなた",
        skin: myPet.currentSkin || 'robot',
        title: (myPet.apprentice && myPet.apprentice.title) ? myPet.apprentice.title : "",
        stats: myPet.stats || {power:0, intel:0, beauty:0},
        learnedWords: (myPet.apprentice && myPet.apprentice.learnedWords) ? myPet.apprentice.learnedWords : []
    };
    
    let allCandidates = [...cloudAIs, myData];

    allCandidates.sort((a, b) => {
        if (sortKey === 'words') {
            const aLen = a.learnedWords ? a.learnedWords.length : 0;
            const bLen = b.learnedWords ? b.learnedWords.length : 0;
            return bLen - aLen; 
        } else {
            const aVal = a.stats[sortKey] || 0;
            const bVal = b.stats[sortKey] || 0;
            return bVal - aVal; 
        }
    });

    list.innerHTML = "";
    allCandidates.forEach((data, index) => {
        const div = document.createElement('div');
        div.style.cssText = `
            background: ${data.isMe ? 'rgba(76, 175, 80, 0.15)' : '#222'}; 
            border: 2px solid ${data.isMe ? '#4CAF50' : '#444'}; 
            border-radius: 8px; padding: 15px; margin-bottom: 12px; 
            display: flex; align-items: center; justify-content: space-between;
        `;
        
        let rankIcon = `<span style="color:#888; font-size:20px; font-weight:bold;">${index + 1}位</span>`;
        if (index === 0) rankIcon = "<span style='color:#FFD700; font-size:24px; font-weight:bold; text-shadow:0 0 5px #FFD700;'>🥇 1位</span>";
        if (index === 1) rankIcon = "<span style='color:#C0C0C0; font-size:22px; font-weight:bold;'>🥈 2位</span>";
        if (index === 2) rankIcon = "<span style='color:#CD7F32; font-size:20px; font-weight:bold;'>🥉 3位</span>";

        let titleStr = data.title ? `<span style="color:#FF9800; font-size:14px; margin-right:5px;">[${data.title}]</span>` : "";
        let petNameStr = (typeof monsterBookData !== 'undefined' && monsterBookData[data.skin] ? monsterBookData[data.skin].name : data.skin);
        let pName = data.playerName || "名無しプレイヤー";
        if (data.isMe) pName = `✨ ${pName} (あなた)`;

        let scoreStr = "";
        let scoreColor = "#FFF";
        if (sortKey === 'words') { scoreStr = `${data.learnedWords ? data.learnedWords.length : 0} 語`; scoreColor = "#4CAF50"; }
        else if (sortKey === 'power') { scoreStr = `${Math.floor(data.stats[sortKey] || 0)} pt`; scoreColor = "#ff5252"; }
        else if (sortKey === 'intel') { scoreStr = `${Math.floor(data.stats[sortKey] || 0)} pt`; scoreColor = "#4fc3f7"; }
        else if (sortKey === 'beauty') { scoreStr = `${Math.floor(data.stats[sortKey] || 0)} pt`; scoreColor = "#e040fb"; }

        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:20px;">
                <div style="width:80px; text-align:center;">${rankIcon}</div>
                <div>
                    <div style="font-size:14px; color:#aaa; margin-bottom:4px;">👤 ${pName}</div>
                    <div style="font-size:20px; font-weight:bold; color:#FFF;">${titleStr}${petNameStr}</div>
                </div>
            </div>
            <div style="font-size:28px; font-weight:bold; color:${scoreColor}; text-shadow:0 2px 4px rgba(0,0,0,0.5);">
                ${scoreStr}
            </div>
        `;
        list.appendChild(div);
    });
};

// ==========================================
// ★修正：TCGメニューに「世界のプレイヤーと対戦」ボタンを追加
// ==========================================
window.showTCGMenu = function() {
    let menu = document.getElementById('tcg-main-menu');
    
    if (!menu) {
        menu = document.createElement('div');
        menu.id = 'tcg-main-menu';
        menu.style.cssText = `
            position: fixed; bottom: 80px; right: 20px;
            background: rgba(20,20,20,0.95); border: 2px solid #FF9800;
            border-radius: 12px; padding: 20px; width: 260px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 9000;
            display: flex; flex-direction: column; gap: 15px;
        `;
        
        menu.innerHTML = `
            <div style="color:#FFD700; font-weight:bold; font-size:20px; text-align:center; border-bottom:1px solid #555; padding-bottom:10px;">
                🃏 TCGメニュー
            </div>
            
            <button onclick="document.getElementById('tcg-main-menu').style.display='none'; openDeckBuilder();" 
                style="padding:12px; background:#2196F3; color:#fff; border:2px solid #fff; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
                🗃️ コレクション / 編成
            </button>
            
            <button onclick="document.getElementById('tcg-main-menu').style.display='none'; openOnlineMatchLobby();" 
                style="padding:12px; background:#E91E63; color:#fff; border:2px solid #fff; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px; box-shadow: 0 0 10px rgba(233,30,99,0.8);">
                🌐 世界のプレイヤーと対戦
            </button>

            <button onclick="document.getElementById('tcg-main-menu').style.display='none'; startBattle();" 
                style="padding:12px; background:#4CAF50; color:#fff; border:2px solid #fff; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
                ⚔️ 名もなきCPUと練習
            </button>
            
            <button onclick="document.getElementById('tcg-main-menu').style.display='none'; uploadMyDeck();" 
                style="padding:12px; background:#9C27B0; color:#fff; border:2px solid #fff; border-radius:8px; font-weight:bold; cursor:pointer; font-size:16px;">
                ☁️ デッキをオンライン登録
            </button>
            
            <button onclick="document.getElementById('tcg-main-menu').style.display='none';" 
                style="padding:10px; background:#555; color:#fff; border:none; border-radius:8px; cursor:pointer; margin-top:5px;">
                閉じる ✖
            </button>
        `;
        document.body.appendChild(menu);
    } else {
        menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
    }
};

// ==========================================
// ★新規：オンライン対戦ロビーを開く機能
// ==========================================
window.openOnlineMatchLobby = async function() {
    if (typeof window.fetchOnlineDecks !== 'function') {
        alert("クラウド通信の準備ができていません。"); return;
    }

    let lobby = document.getElementById('tcg-online-lobby');
    if (!lobby) {
        lobby = document.createElement('div');
        lobby.id = 'tcg-online-lobby';
        lobby.style.cssText = `
            position: fixed; top: 10%; left: 50%; transform: translateX(-50%);
            width: 400px; max-height: 80%; background: rgba(20,20,20,0.95);
            border: 2px solid #E91E63; border-radius: 12px; padding: 20px;
            color: white; z-index: 10000; overflow-y: auto; box-shadow: 0 0 30px rgba(233, 30, 99, 0.5);
        `;
        document.body.appendChild(lobby);
    }

    lobby.innerHTML = `<div style="text-align:center; font-size:18px; font-weight:bold; color:#E91E63; margin-bottom:15px;">🌐 通信中... 対戦相手を探しています...</div>`;
    lobby.style.display = 'block';

    const decks = await window.fetchOnlineDecks();

    if (decks.length === 0) {
        lobby.innerHTML = `
            <div style="text-align:center; font-size:18px; font-weight:bold; color:#FF9800; margin-bottom:15px;">見つかりませんでした...</div>
            <div style="text-align:center; margin-bottom:15px; line-height:1.5;">自分以外のプレイヤーがまだデッキを登録していないようです。<br>（※テスト時は別のブラウザで登録すると現れます！）</div>
            <button onclick="document.getElementById('tcg-online-lobby').style.display='none';" style="width:100%; padding:10px; background:#555; color:white; border:none; border-radius:8px; cursor:pointer;">閉じる</button>
        `;
        return;
    }

    let html = `<div style="text-align:center; font-size:20px; font-weight:bold; color:#E91E63; margin-bottom:15px; border-bottom:1px solid #E91E63; padding-bottom:10px;">🌐 ゴーストバトル ロビー</div>`;

    // 取得したデッキデータをグローバルに一時保存
    window.TCG_ONLINE_OPPONENTS = [];

    decks.forEach((d, index) => {
        const date = new Date(d.updatedAt).toLocaleString();
        window.TCG_ONLINE_OPPONENTS[index] = d;

        html += `
            <div style="background:#333; border:1px solid #555; padding:10px; margin-bottom:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-weight:bold; font-size:18px; color:#4fc3f7;">${d.playerName}</div>
                    <div style="font-size:12px; color:#aaa;">更新: ${date}</div>
                </div>
                <button onclick="document.getElementById('tcg-online-lobby').style.display='none'; startBattle(window.TCG_ONLINE_OPPONENTS[${index}]);"
                    style="padding:10px 15px; background:#E91E63; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer; transition:transform 0.1s;"
                    onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    ⚔️ 挑戦！
                </button>
            </div>
        `;
    });

    html += `<button onclick="document.getElementById('tcg-online-lobby').style.display='none';" style="width:100%; padding:10px; background:#555; color:white; border:none; border-radius:8px; cursor:pointer; margin-top:10px;">閉じる</button>`;
    lobby.innerHTML = html;
};

// ==========================================
// ★修正：Firebaseに自分のデッキをアップロードする機能（Firestore対応版）
// ==========================================
window.uploadMyDeck = async function() {
    // 1. デッキが60枚あるかチェック
    if (!window.TCG.decks[0] || window.TCG.decks[0].length !== 60) {
        alert("デッキが60枚ありません！先に「編成」からデッキを保存してください。");
        return;
    }

    // 2. 育成ボーナスを含んだ「実体のカードデータ」を60枚分抽出する
    const deckData = window.TCG.decks[0].map(uid => {
        const card = window.TCG.myCollection.find(c => c.uid === uid);
        if (!card) return null;
        return {
            masterId: card.masterId, // カードの種類
            hp: card.hp,             // 育成ボーナス込みのHP
            damage: card.damage,     // 育成ボーナス込みの攻撃力
            name: card.name          // 表示名
        };
    }).filter(c => c !== null);

    if (deckData.length !== 60) {
        alert("デッキデータに異常があります。もう一度編成を保存し直してください。");
        return;
    }

    // 3. プレイヤー固有のIDを取得（酒場と同じIDを共有して使います）
    let myId = localStorage.getItem('my_player_id');
    if (!myId) {
        myId = 'player_' + Date.now() + Math.floor(Math.random() * 1000);
        localStorage.setItem('my_player_id', myId);
    }

    // 4. Firestoreに送るデータの塊（ペイロード）を作成
    const uploadData = {
        playerId: myId,
        playerName: (window.aiPet && window.aiPet.name) ? window.aiPet.name : "名無しのAI",
        skin: (window.aiPet && window.aiPet.currentSkin) ? window.aiPet.currentSkin : "robot",
        updatedAt: Date.now(),
        deck: deckData
    };

    // 5. cloud_manager.js の非同期関数を呼び出して保存！
    if (typeof window.uploadMyDeckToCloud === 'function') {
        const success = await window.uploadMyDeckToCloud(myId, uploadData);
        if (success) {
            alert("🌐 デッキをオンラインに登録しました！\nこれで世界中のプレイヤーが、あなたのデッキと戦えるようになります！");
        } else {
            alert("通信エラーが発生しました。コンソールを確認してください。");
        }
    } else {
        alert("クラウド通信の準備ができていません。ページをリロードして再度お試しください。");
    }
};

// ==========================================
// ★究極修正：チュートリアルの「順番待ち（キュー）」システム
// ==========================================
window.tutorialQueue = window.tutorialQueue || [];
window.isTutorialPlaying = false;
window.tutQueueTimer = null;

// 既存のチュートリアル関数を「順番待ち対応版」に上書き！
window.showGameTutorial = function(title, message, callback) {
    // リクエストをキュー（待ち行列）に追加
    window.tutorialQueue.push({title, message, callback});
    window.processTutorialQueue();
};

window.processTutorialQueue = function() {
    // 既に何かのチュートリアルが再生中、またはキューが空なら何もしない
    if (window.isTutorialPlaying || window.tutorialQueue.length === 0) return;
    
    // 画面が他のポップアップやイベントで塞がっていないかチェック
    const cardPopup = document.getElementById('tcg-unlock-popup');
    const encOverlay = document.getElementById('encounterOverlay');
    
    const isCardPopupOpen = cardPopup && cardPopup.style.pointerEvents === 'auto';
    const isEncounterOpen = encOverlay && encOverlay.classList.contains('active');
    
    if (isCardPopupOpen || isEncounterOpen) {
        // 画面が塞がっている場合は、1秒後に再確認する（空気を読んで待機！）
        clearTimeout(window.tutQueueTimer);
        window.tutQueueTimer = setTimeout(window.processTutorialQueue, 1000);
        return;
    }

    // 画面が完全に空いたので、チュートリアルを再生開始！
    window.isTutorialPlaying = true;
    const tut = window.tutorialQueue.shift();

    const tutBox = document.createElement('div');
    tutBox.id = 'in-game-tutorial';
    tutBox.style.cssText = `
        position: fixed; top: 40%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(20, 20, 20, 0.95); border: 2px solid #FF9800;
        border-radius: 12px; padding: 25px; color: #fff; width: 320px;
        text-align: center; box-shadow: 0 0 40px rgba(255, 152, 0, 0.8);
        z-index: 100000; opacity: 0; transition: all 0.5s ease;
    `;
    tutBox.innerHTML = `
        <div style="color: #FF9800; font-size: 20px; font-weight: bold; margin-bottom: 15px;">${tut.title}</div>
        <div style="font-size: 15px; line-height: 1.6; margin-bottom: 25px; color: #ddd; text-align: left;">
            ${tut.message}
        </div>
        <button id="tut-close-btn" style="background: #FF9800; color: #fff; border: 2px solid #fff; padding: 12px 35px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            わかった！
        </button>
    `;
    document.body.appendChild(tutBox);
    
    setTimeout(() => { tutBox.style.opacity = '1'; }, 50);

    // 「わかった！」を押した時の処理
    document.getElementById('tut-close-btn').onclick = () => {
        tutBox.style.opacity = '0';
        tutBox.style.transform = 'translate(-50%, -60%)'; // 少し上にフワッと消える演出
        setTimeout(() => {
            if (tutBox.parentNode) tutBox.parentNode.removeChild(tutBox);
            
            if (tut.callback) tut.callback(); // ★ チュートリアル完了時の処理（ボタン出現など）を実行！
            
            window.isTutorialPlaying = false;
            // 次のチュートリアルが待っていれば0.5秒後に呼び出す
            clearTimeout(window.tutQueueTimer);
            window.tutQueueTimer = setTimeout(window.processTutorialQueue, 500); 
        }, 500);
    };
};

// ==========================================
// ★変更：カード初獲得時のチュートリアル（順番待ちシステム連携版）
// ==========================================
let tcgUnlockCheck = setInterval(() => {
    // コレクションに1枚でもカードが入ったら
    if (typeof window.TCG !== 'undefined' && window.TCG.myCollection && window.TCG.myCollection.length > 0) {
        
        // チュートリアル履歴をチェック（v2に変更したため、コマンド不要で強制的にテストできます！）
        if (!localStorage.getItem('tcg_tutorial_done_v2')) {
            localStorage.setItem('tcg_tutorial_done_v2', 'true');
            
            // 順番待ちシステムにカードゲームのチュートリアルを登録！
            window.showGameTutorial(
                "機能解放：カードゲーム 🃏", 
                "冒険や日々の生活の中で、AIの記憶が<span style='color:#FF9800; font-weight:bold;'>「カード」</span>として形に残るようになりました！<br><br>画面右下のボタンから、集めたカードを眺めたり、デッキを組んでバトルして遊びましょう！",
                () => {
                    // ★ チュートリアルを「わかった！」で閉じた瞬間に、右下にボタンを出現させる！
                    // window.initTCGMenu();
                }
            );
        } else {
            // 既にチュートリアル済みなら、即座にボタンを表示
            if (!document.getElementById('tcg-launcher-btn')) {
                // window.initTCGMenu();
            }
        }
        
        // 監視ループを終了
        clearInterval(tcgUnlockCheck);
    }
}, 1000);

// ==========================================
// ★ 新機能：AIの余生決断イベント表示
// ==========================================
window.showLifePathEvent = function(hero, path) {
    let title = "";
    let message = "";
    
    if (path === 'mentor') {
        title = "【新たな夢：後進の育成】";
        message = "「今まで育ててくれてありがとう。<br>あなたに優しく教えてもらったように、僕もこれからは<span style='color:#FF9800;'>『誰かを導ける存在』</span>になりたいんだ！」<br><br><span style='font-size:12px; color:#aaa;'>(※今後の行動方針が『師匠』に固定されました)</span>";
    } 
    else if (path === 'monument') {
        title = "【新たな夢：生きた証を残す】";
        message = "「今まで鍛えてくれてありがとう。<br>僕はこの世界に、僕の生きた証として<span style='color:#FFD700;'>『最高のモニュメント』</span>を残すよ。見ててね！」<br><br><span style='font-size:12px; color:#aaa;'>(※今後の行動方針が『モニュメント建造』に固定されました)</span>";
    }
    else if (path === 'seeker') {
        title = "【新たな夢：終わりのない修練】";
        message = "「免許皆伝？……いや、この道に終わりはない。<br>僕は命尽きるまで、限界のその先へ<span style='color:#ff5252;'>『己を磨き続ける』</span>！」<br><br><span style='font-size:12px; color:#aaa;'>(※今後の行動方針が『求道者（スパルタ）』に固定されました)</span>";
    }
    else if (path === 'guardian') {
        title = "【新たな夢：村の守護者】";
        message = "「今まで育ててくれてありがとう。<br>僕のこの力は、この村を豊かにするために使うべきだ。<span style='color:#4CAF50;'>『村の守護者』</span>として生きるよ！」<br><br><span style='font-size:12px; color:#aaa;'>(※今後の行動方針が『守護者（自動パトロール）』に固定されました)</span>";
    }
    else if (path === 'author') {
        title = "【新たな夢：後世への執筆】";
        message = "「今まで色んなことを学ばせてくれてありがとう。<br>僕の知識と技術を、次の世代のために<span style='color:#2196F3;'>『一冊の秘伝書』</span>として残すよ！」<br><br><span style='font-size:12px; color:#aaa;'>(※今後の行動方針が『秘伝書執筆』に固定されました)</span>";
    }
    else { // slowlife
        title = "【新たな夢：悠々自適なスローライフ】";
        message = "「厳しい修行もこれで終わりだね！<br>これからは難しいことはやめて、あなたと一緒に<span style='color:#8BC34A;'>『のんびりスローライフ』</span>を楽しむよ！」<br><br><span style='font-size:12px; color:#aaa;'>(※今後の行動方針が『スローライフ』に固定されました)</span>";
    }

    // 既存のチュートリアルUIを流用してリッチに表示！
    if (typeof window.showGameTutorial === 'function') {
        window.showGameTutorial(`✨ ${title} ✨`, message, () => {
            hero.message = "これからもよろしくね！";
            hero.messageTimer = 180;
            // TODO: ここでルートごとの専用アクション（次回実装）を解放する
        });
    }
};

// ==========================================
// ★ 建築設計図（レシピ）UIの描画処理（素材判定付き完全版）
// ==========================================
window.openBuildRecipe = function() {
    window.renderBuildRecipe();
    const overlay = document.getElementById('buildRecipeOverlay');
    if (overlay) overlay.classList.add('active');
};

window.renderBuildRecipe = function() {
    const listEl = document.getElementById('buildRecipeList');
    if (!listEl) return;
    if (typeof buildingCatalog === 'undefined') return;

    let ai = window.aiPet;
    let currentRank = (ai.apprentice && ai.apprentice.rank && ai.apprentice.rank['building']) ? ai.apprentice.rank['building'] : 0;
    
    // ★修正：ランクが10に到達している場合もマスターとして扱う！
    let isMaster = ai.apprentice && (
        (ai.apprentice.retired && ai.apprentice.retired['building']) ||
        (ai.apprentice.currentMaster === 'building' && ai.apprentice.isGraduated) ||
        currentRank >= 10
    );
    let effectiveRank = isMaster ? 10 : currentRank;

    // ★追加：自分の手持ちアイテムを数える
    let myItems = {};
    if (ai.inventory) {
        ai.inventory.forEach(k => myItems[k] = (myItems[k] || 0) + 1);
    }

    let html = `<div style="font-size:16px; font-weight:bold; color:#FFF; margin-bottom:15px; padding:10px; background:#222; border-radius:6px; text-align:center; border:2px solid #555;">現在の建築士ランク: ${isMaster ? '<span style="color:#FFD700; text-shadow:0 0 5px #FFD700;">皆伝 (MAX)</span>' : effectiveRank}</div>`;

    for (let bId in buildingCatalog) {
        const bData = buildingCatalog[bId];
        const reqRank = bData.reqBuildLevel || 1;
        const canBuildByRank = effectiveRank >= reqRank;

        let hasMaterials = true;
        let matHtml = "";

        // ★素材の判定と文字列作成（所持数 / 必要数）
        if (bData.materials && Object.keys(bData.materials).length > 0) {
            for (let mKey in bData.materials) {
                let reqCount = bData.materials[mKey];
                let myCount = myItems[mKey] || 0;
                let mName = (typeof itemCatalog !== 'undefined' && itemCatalog[mKey]) ? itemCatalog[mKey].name : mKey;
                
                let isEnough = myCount >= reqCount;
                if (!isEnough) hasMaterials = false;
                
                let color = isEnough ? "#4CAF50" : "#ff5252";
                let bgColor = isEnough ? "rgba(76,175,80,0.1)" : "rgba(255,82,82,0.1)";
                
                matHtml += `<span style="display:inline-block; background:${bgColor}; border:1px solid ${color}; border-radius:4px; padding:4px 8px; margin:0 4px 4px 0; font-size:12px; color:${color}; font-weight:bold;">
                    ${mName} : ${myCount} / ${reqCount}
                </span>`;
            }
        } else {
            matHtml = `<span style="color:#888; font-size:12px;">素材不要</span>`;
        }

        if (canBuildByRank) {
            // 素材とランクが足りているかどうかのバッジ
            let statusBadge = hasMaterials 
                ? `<span style="background:#4CAF50; color:#FFF; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:bold; box-shadow:0 2px 4px rgba(0,0,0,0.3);">✅ 作成可能！</span>`
                : `<span style="background:#ff5252; color:#FFF; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:bold;">❌ 素材不足</span>`;

            let borderColor = hasMaterials ? '#4CAF50' : '#555';
            
            html += `
                <div style="background:#222; border:2px solid ${borderColor}; border-radius:8px; padding:15px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <div style="font-size:18px; font-weight:bold; color:${hasMaterials ? '#4CAF50' : '#ccc'};">${bData.name}</div>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="font-size:12px; color:#aaa;">(必要ランク: ${reqRank})</div>
                            ${statusBadge}
                        </div>
                    </div>
                    <div>${matHtml}</div>
                </div>
            `;
        } else {
            html += `
                <div style="background:#111; border:2px dashed #444; border-radius:8px; padding:15px; margin-bottom:12px; opacity:0.7;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <div style="font-size:18px; font-weight:bold; color:#666;">？？？ (未開放)</div>
                        <div style="font-size:12px; color:#ff5252; font-weight:bold;">(必要ランク: ${reqRank})</div>
                    </div>
                    <div style="font-size:12px; color:#555;">ランクを上げると設計図が見れます</div>
                </div>
            `;
        }
    }
    listEl.innerHTML = html;
};

// ==========================================
// 📄 ui_controller.js
// ★【フェーズ1】ハウジング＆経営UIシステム
// ==========================================

// アセット画像をコード側で読み込む
const imgRestAsset = new Image(); imgRestAsset.src = 'restaurant_asset.png'; // image_1.png
const imgSmithAsset = new Image(); imgSmithAsset.src = 'smith_assert.png'; // image_2.png

// ==========================================
// 🎨 ハウジングシステム（Canvas描画）
// 白背景を透過させて、定位置に重ねる関数
// ==========================================
function drawAssetWithWhiteTransparency(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (!img.complete) return; // 画像が読み込まれていない場合は描画しない

    // 1. 一旦、別のCanvasにアセットを切り抜いて描画する
    const tempCanvas = document.createElement('canvas'); tempCanvas.width = sw; tempCanvas.height = sh;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    // 2. そのCanvasのピクセルデータを取得し、白いピクセルを透過させる
    const imageData = tempCtx.getImageData(0, 0, sw, sh);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i], g = data[i + 1], b = data[i + 2];
        // ほぼ白（R,G,Bがすべて240以上）なら透過させる
        if (r > 240 && g > 240 && b > 240) { data[i + 3] = 0; }
    }
    tempCtx.putImageData(imageData, 0, 0);

    // 3. 透過処理が完了したアセットを、メインCanvas（屋内）に描画する
    ctx.drawImage(tempCanvas, 0, 0, sw, sh, dx, dy, dw, dh);
}

// レストランの内装描画
window.renderRestaurantInterior = function(ctx, building) {
    if (!building || !building.shopData) return;
    const s = building.shopData;

    // --- 定位置アセット配置 (内装レベルに応じて追加・ランクアップ) ---

    // 1. カウンター (レベル1〜)
    // ソース矩形はアセット画像（image_1.png）から切り抜く
    drawAssetWithWhiteTransparency(ctx, imgRestAsset, 0, 0, 300, 200, 50, 100, 300, 200);

    // 2. テーブル＆椅子 (レベル1〜)
    drawAssetWithWhiteTransparency(ctx, imgRestAsset, 300, 0, 200, 200, 400, 200, 200, 200);

    // 3. キッチンオーブン (レベル2〜)
    if (s.interiorLevel >= 2) {
        drawAssetWithWhiteTransparency(ctx, imgRestAsset, 500, 0, 100, 150, 500, 80, 100, 150);
    }

    // 4. 高級なバーテーブル (レベル3〜)
    if (s.interiorLevel >= 3) {
        drawAssetWithWhiteTransparency(ctx, imgRestAsset, 600, 0, 200, 200, 200, 300, 200, 200);
    }
};

// 鍛冶屋の内装描画
window.renderSmithInterior = function(ctx, building) {
    if (!building || !building.shopData) return;
    const s = building.shopData;

    // 1. 金床とハンマー (レベル1〜)
    drawAssetWithWhiteTransparency(ctx, imgSmithAsset, 0, 0, 200, 200, 100, 200, 200, 200);

    // 2. 武器棚 (レベル1〜)
    drawAssetWithWhiteTransparency(ctx, imgSmithAsset, 200, 0, 300, 200, 450, 150, 300, 200);

    // 3. 巨大な炉 (レベル2〜)
    if (s.interiorLevel >= 2) {
        drawAssetWithWhiteTransparency(ctx, imgSmithAsset, 500, 0, 200, 200, 300, 80, 200, 200);
    }
};


// ==========================================
// 🏪 店舗経営UI （イス追加・イートイン座標修正版）
// ==========================================
window.SHOP_FURNITURE_DATA = {
    "restaurant": [
        { "name": "カウンター", "img": "restaurant_asset.png", "sx": 1764, "sy": 0, "sw": 1064, "sh": 771, "x": 183, "y": 53, "scale": 0.1, "reqLv": 1 },
        // ★修正：テーブルには座らないので isSeat を外しました
        { "name": "テーブル(手前)", "img": "restaurant_asset.png", "sx": 113, "sy": 52, "sw": 776, "sh": 673, "x": 61, "y": 119, "scale": 0.1, "reqLv": 1 },
        { "name": "テーブル(奥)", "img": "restaurant_asset.png", "sx": 113, "sy": 58, "sw": 776, "sh": 673, "x": 302, "y": 120, "scale": 0.1, "reqLv": 2 },
        // ★追加：イス（※sx, syなどの切り出し座標は仮の数字なので、エディタで調整してください！）
        {
            "name": "イス(手前)",
            "img": "restaurant_asset.png",
            "sx": 1186,
            "sy": 118,
            "sw": 464,
            "sh": 591,
            "x": 103,
            "y": 147,
            "scale": 0.10000000000000002,
            "reqLv": 1,
            "isSeat": true
        },
        {
            "name": "イス(奥)",
            "img": "restaurant_asset.png",
            "sx": 1190,
            "sy": 118,
            "sw": 464,
            "sh": 591,
            "x": 351,
            "y": 149,
            "scale": 0.10000000000000002,
            "reqLv": 2,
            "isSeat": true
        },
        { "name": "暖炉", "img": "restaurant_asset.png", "sx": 490, "sy": 629, "sw": 776, "sh": 875, "x": 188, "y": 111, "scale": 0.1, "reqLv": 2 },
        { "name": "酒樽", "img": "restaurant_asset.png", "sx": 1546, "sy": 745, "sw": 776, "sh": 736, "x": 252, "y": 78, "scale": 0.1, "reqLv": 3 }
    ],
    "smith": [
        { "name": "金床", "img": "smith_asset.png", "sx": 527, "sy": 223, "sw": 292, "sh": 271, "x": 161, "y": 78, "scale": 0.2499999999999999, "reqLv": 1 },
        { "name": "武器棚", "img": "smith_asset.png", "sx": 1800, "sy": 211, "sw": 467, "sh": 485, "x": 290, "y": 62, "scale": 0.2499999999999999, "reqLv": 1 },
        { "name": "炉", "img": "smith_asset.png", "sx": 886, "sy": 538, "sw": 407, "sh": 447, "x": 233, "y": 121, "scale": 0.1999999999999999, "reqLv": 2 }
    ]
};

window.shopSimInterval = null;
window.shopNPCs = [];

window.getDisplayShopItemName = function(itemId) {
    if (typeof itemCatalog !== 'undefined' && itemCatalog[itemId] && itemCatalog[itemId].name) return itemCatalog[itemId].name;
    const dict = { 'item_sword_iron': '鉄の剣', 'item_shield_wood': '木の盾', 'eq_sword': '普通の剣', 'eq_shield': '普通の盾', 'tool_pan': 'フライパン', 'dish_stirfry': '野菜炒め', 'dish_steak': 'ステーキ', 'dish_soup': '特製スープ', 'baked_carrot': '焼きニンジン', 'baked_fish': '焼き魚', 'gold_sword': '金の剣', 'sashimi': 'お刺身' };
    return dict[itemId] || itemId;
};

// ★修正：在庫表示を AI のインベントリから動的にカウントする関数
window.getCurrentShopStock = function(recipes) {
    let currentStock = {};
    if (window.aiPet && window.aiPet.inventory) {
        window.aiPet.inventory.forEach(i => {
            if (recipes[i]) {
                currentStock[i] = (currentStock[i] || 0) + 1;
            }
        });
    }
    return currentStock;
};

window.openShopManagementUI = function(building) {
    // ★修正：手動の行商人UIを廃止し、AIへの指示を促す
    if (typeof currentMode !== 'undefined' && currentMode === 'visit') {
        let typeWord = building.type === 'restaurant' ? 'レストラン' : '鍛冶屋';
        alert(`ここは他人の島です。\n取引をしたい場合は、チャットでAIに「${typeWord}でおつかいして」と指示を出してみましょう！`);
        return;
    }

    if (!building.shopData) return;
    const s = building.shopData;
    const isRest = building.type === 'restaurant';
    const typeWord = isRest ? '🍳 レストラン (AI経営)' : '🔨 鍛冶屋 (AI経営)';
    const repStars = "⭐".repeat(Math.max(1, Math.ceil(s.reputation / 20))); 
    
    if (!building.id) { for (let k in assets) { if (assets[k] === building) { building.id = k; break; } } }
    if (typeof s.isOpen === 'undefined') s.isOpen = false;
    if (!s.logs) s.logs = ["営業を開始しました。"];

    const invalidItems = ['iron', 'stone', 'wood', 'item_berry'];
    invalidItems.forEach(inv => {
        if (s.recipes && s.recipes[inv]) delete s.recipes[inv];
        if (s.inventory && s.inventory[inv]) delete s.inventory[inv];
        if (s.prices && s.prices[inv]) delete s.prices[inv];
    });

    let managementUI = document.getElementById('shop-management-ui');
    if (!managementUI) {
        managementUI = document.createElement('div'); managementUI.id = 'shop-management-ui';
        managementUI.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9); z-index: 50000; display: flex; flex-direction: column; color: white; font-family: sans-serif;`;
        document.body.appendChild(managementUI);
    }

    let housingHtml = `<div style="position:relative; width:100%; height:250px; flex-shrink:0; background: url('empty_room.png') center/cover no-repeat #5D4037; border:2px solid #555; border-radius:8px; overflow:hidden; margin-bottom:15px; box-shadow: inset 0 0 20px rgba(0,0,0,0.8);">`;
    
    let furnitureList = isRest ? window.SHOP_FURNITURE_DATA['restaurant'] : window.SHOP_FURNITURE_DATA['smith'];
    if (furnitureList) {
        furnitureList.forEach(f => {
            if (s.interiorLevel >= f.reqLv) {
                housingHtml += `<div style="position:absolute; left:${f.x}px; top:${f.y}px; width:${f.sw}px; height:${f.sh}px; background:url('${f.img}') -${f.sx}px -${f.sy}px no-repeat; transform:scale(${f.scale}); transform-origin: top left; pointer-events:none;"></div>`; 
            }
        });
    }
    
    if (!s.isOpen) housingHtml += `<div style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); pointer-events:none; z-index:998;"></div>`;
    housingHtml += `<div id="shop-npc-container" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:999;"></div>`;
    
    let statusSign = s.isOpen ? 
        `<div style="position:absolute; top:10px; right:10px; background:#4CAF50; color:white; padding:5px 15px; border-radius:20px; font-weight:bold; z-index:1000; box-shadow:0 2px 5px rgba(0,0,0,0.5);">🟢 営業中</div>` :
        `<div style="position:absolute; top:10px; right:10px; background:#f44336; color:white; padding:5px 15px; border-radius:20px; font-weight:bold; z-index:1000; box-shadow:0 2px 5px rgba(0,0,0,0.5);">🔴 仕込み中</div>`;
    housingHtml += statusSign + `</div>`;

    let materialHtml = "";
    if (window.aiPet && window.aiPet.inventory) {
        let counts = {};
        window.aiPet.inventory.forEach(i => {
            if (isRest && typeof itemCatalog !== 'undefined' && itemCatalog[i] && (itemCatalog[i].type === 'food' || itemCatalog[i].type === 'ingredient')) counts[i] = (counts[i] || 0) + 1;
            else if (!isRest && (i === 'iron' || i === 'stone' || i === 'wood')) counts[i] = (counts[i] || 0) + 1;
        });
        for (let k in counts) {
            let name = window.getDisplayShopItemName(k);
            materialHtml += `<span style="background:#333; padding:4px 8px; border-radius:4px; margin:2px; font-size:12px; border:1px solid #555;">${name} <span style="color:#FFD700;">x${counts[k]}</span></span>`;
        }
        if (materialHtml === "") materialHtml = `<span style="color:#888; font-size:12px;">使える素材を持っていません...</span>`;
    }

    let logHtml = s.logs.map(l => `<div style="font-size:12px; color:#ddd; margin-bottom:4px; border-bottom:1px dashed #444; padding-bottom:2px;">> ${l}</div>`).join('');

    let inventoryHtml = "";
    let currentStock = window.getCurrentShopStock(s.recipes);

    for (let itemId in s.recipes) {
        if (!s.recipes[itemId].learned) continue;
        let itemName = window.getDisplayShopItemName(itemId);
        let invCount = currentStock[itemId] || 0;
        let price = s.prices[itemId] || 0;
        
        let baseValue = 50; 
        let isMarketKnown = false;
        if (typeof itemCatalog !== 'undefined' && itemCatalog[itemId] && itemCatalog[itemId].value) {
            baseValue = itemCatalog[itemId].value * 4;
            isMarketKnown = true;
        }
        let marketPriceDisplay = isMarketKnown ? `${baseValue} G` : `<span style="font-size:12px;">未設定(約50G)</span>`;
        
        let priceColor = "#FFD700"; 
        if (price > baseValue * 1.2) priceColor = "#ff5252"; 
        else if (price < baseValue * 0.8) priceColor = "#4CAF50"; 

        inventoryHtml += `
            <tr style="border-bottom: 1px solid #333;">
                <td style="padding:10px; font-size:16px;">🎁 ${itemName}</td>
                <td style="padding:10px; text-align:center;"><span id="inv-count-${itemId}" style="font-size:18px; font-weight:bold; color:${invCount > 0 ? '#4CAF50' : '#f44336'};">${invCount} 個</span></td>
                <td style="padding:10px; text-align:center; color:#aaa;">${marketPriceDisplay}</td>
                <td style="padding:10px; text-align:center;"><span id="inv-price-${itemId}" style="font-size:18px; font-weight:bold; color:${priceColor};">${price} G</span></td>
            </tr>
        `;
    }

    managementUI.innerHTML = `
        <div style="padding:20px; border-bottom:2px solid #555; display:flex; justify-content:space-between; align-items:center; background:#1a1a1a;">
            <h1 style="color:#FFC107; font-size:28px; margin:0;">${typeWord} <span style="font-size:16px; color:#aaa;">(内装Lv: ${s.interiorLevel})</span></h1>
            <div style="display:flex; gap:15px; align-items:center;">
                <div style="color:#4fc3f7; font-weight:bold; font-size:14px; margin-right:15px;">※AIが自分で素材を消費し、考えて経営しています。</div>
                <button onclick="window.closeShopUI()" style="padding:10px 20px; background:#444; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">見守る（閉じる）</button>
            </div>
        </div>
        <div style="display:flex; flex:1; overflow:hidden;">
            <div style="width:450px; padding:20px; border-right:2px solid #555; background:#111; display:flex; flex-direction:column; overflow-y:auto;">
                ${housingHtml}
                
                <div style="background:#222; padding:10px; border-radius:8px; border:1px solid #444; margin-bottom:15px;">
                    <div style="font-size:13px; color:#4fc3f7; font-weight:bold; margin-bottom:8px;">📊 AIのコンディション</div>
                    <div style="display:flex; justify-content:space-around; font-size: 16px; font-weight:bold;">
                        <div>体力: <span id="shop-ai-energy" style="color:#4CAF50;">100%</span></div>
                        <div>満腹度: <span id="shop-ai-hunger" style="color:#FF9800;">100%</span></div>
                    </div>
                </div>

                <div style="display:flex; justify-content:space-around; background:#222; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #444;">
                    <div style="text-align:center;"><div style="font-size:12px; color:#aaa;">店舗の評判</div><div id="shop-rep-stars" style="font-size:24px; color:#FFD700; font-weight:bold; margin:5px 0;">${repStars}</div><div id="shop-rep-val" style="font-size:14px;">${s.reputation} / 100</div></div>
                    <div style="text-align:center;"><div style="font-size:12px; color:#aaa;">合計売上</div><div id="shop-sales-val" style="font-size:24px; color:#4CAF50; font-weight:bold; margin-top:5px;">💰 ${s.totalSales}</div><div style="font-size:14px;">ゴールド</div></div>
                </div>
                
                <div style="background:#222; padding:10px; border-radius:8px; border:1px solid #444; margin-bottom:15px;">
                    <div style="font-size:13px; color:#FF9800; font-weight:bold; margin-bottom:8px;">🎒 AIの所持素材（この店で使えるもの）</div>
                    <div id="shop-ai-materials" style="display:flex; flex-wrap:wrap; gap:4px;">${materialHtml}</div>
                </div>

                <div style="background:#222; padding:10px; border-radius:8px; border:1px solid #444; flex:1; min-height:100px; display:flex; flex-direction:column;">
                    <div style="font-size:13px; color:#00BCD4; font-weight:bold; margin-bottom:8px;">🧠 経営AIの思考ログ</div>
                    <div id="shop-ai-logs" style="overflow-y:auto; flex:1;">${logHtml}</div>
                </div>
            </div>
            
            <div style="flex:1; padding:20px; overflow-y:auto; background:#1a1a1a;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; background:#222; padding:15px; border-radius:8px; border:1px solid #444;">
                    <h2 style="margin:0; font-size:20px;">📦 現在の商品ラインナップ</h2>
                </div>
                <table style="width:100%; border-collapse:collapse; background:#222; border-radius:8px; overflow:hidden;">
                    <thead style="background:#333;"><tr><th style="padding:12px; text-align:left;">アイテム名</th><th style="padding:12px;">在庫</th><th style="padding:12px; color:#aaa;">適正価格(相場)</th><th style="padding:12px;">AI設定価格</th></tr></thead>
                    <tbody id="shop-items-list">${inventoryHtml}</tbody>
                </table>
            </div>
        </div>
    `;
    managementUI.style.display = 'flex';
    window.startShopSimulation(building);
};

window.updateShopUIData = function(building) {
    if (!building || !building.shopData) return;
    const s = building.shopData;
    let repStarsEl = document.getElementById('shop-rep-stars');
    if (repStarsEl) repStarsEl.innerText = "⭐".repeat(Math.max(1, Math.ceil(s.reputation / 20)));
    let repValEl = document.getElementById('shop-rep-val');
    if (repValEl) repValEl.innerText = `${s.reputation} / 100`;
    let salesEl = document.getElementById('shop-sales-val');
    if (salesEl) salesEl.innerText = `💰 ${s.totalSales}`;
    
    let currentStock = window.getCurrentShopStock(s.recipes);

    for (let itemId in s.recipes) {
        let countEl = document.getElementById(`inv-count-${itemId}`);
        if (countEl) {
            let invCount = currentStock[itemId] || 0;
            countEl.innerText = invCount + " 個";
            countEl.style.color = invCount > 0 ? '#4CAF50' : '#f44336';
        }
        let priceEl = document.getElementById(`inv-price-${itemId}`);
        if (priceEl) { 
            let price = s.prices[itemId] || 0;
            let baseValue = (typeof itemCatalog !== 'undefined' && itemCatalog[itemId] && itemCatalog[itemId].value) ? itemCatalog[itemId].value * 4 : 50;
            let priceColor = "#FFD700"; 
            if (price > baseValue * 1.2) priceColor = "#ff5252"; 
            else if (price < baseValue * 0.8) priceColor = "#4CAF50"; 
            
            priceEl.innerText = price + " G"; 
            priceEl.style.color = priceColor;
        }
    }

    let matEl = document.getElementById('shop-ai-materials');
    if (matEl && window.aiPet && window.aiPet.inventory) {
        let isRest = building.type === 'restaurant';
        let counts = {};
        window.aiPet.inventory.forEach(i => {
            if (isRest && typeof itemCatalog !== 'undefined' && itemCatalog[i] && (itemCatalog[i].type === 'food' || itemCatalog[i].type === 'ingredient')) counts[i] = (counts[i] || 0) + 1;
            else if (!isRest && (i === 'iron' || i === 'stone' || i === 'wood')) counts[i] = (counts[i] || 0) + 1;
        });
        let matHtml = "";
        for (let k in counts) {
            let name = window.getDisplayShopItemName(k);
            matHtml += `<span style="background:#333; padding:4px 8px; border-radius:4px; margin:2px; font-size:12px; border:1px solid #555;">${name} <span style="color:#FFD700;">x${counts[k]}</span></span>`;
        }
        matEl.innerHTML = matHtml === "" ? `<span style="color:#888; font-size:12px;">使える素材を持っていません...</span>` : matHtml;
    }

    let logEl = document.getElementById('shop-ai-logs');
    if (logEl && s.logs) {
        logEl.innerHTML = s.logs.map(l => `<div style="font-size:12px; color:#ddd; margin-bottom:4px; border-bottom:1px dashed #444; padding-bottom:2px;">> ${l}</div>`).join('');
    }
};

window.triggerBankrupt = function(building) {
    if (!building || !building.shopData) return;
    let s = building.shopData;
    clearInterval(window.shopSimInterval);
    let bankruptUI = document.createElement('div');
    bankruptUI.id = 'bankrupt-ui';
    bankruptUI.style.cssText = `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9); z-index: 60000; display: flex; justify-content: center; align-items: center; color: white; font-family: sans-serif;`;
    bankruptUI.innerHTML = `
        <div style="background:#b71c1c; border:4px solid #ff5252; border-radius:12px; padding:40px; text-align:center; min-width:400px; box-shadow: 0 10px 40px rgba(255,0,0,0.5);">
            <h2 style="color:#FFF; font-size:36px; margin-top:0;">💥 経営破綻 💥</h2>
            <div style="font-size:18px; line-height:1.6; margin-bottom:30px;">
                悪評が広まりすぎたため、<br>「${building.name}」は倒産し、取り壊されてしまいました...
            </div>
            <button onclick="window.closeBankruptUI('${building.id || Object.keys(assets).find(k => assets[k] === building)}')" style="padding:15px 40px; font-size:20px; font-weight:bold; background:#222; color:white; border:2px solid #FFF; border-radius:8px; cursor:pointer; box-shadow:0 4px 0 #000; transition:0.2s;" onmousedown="this.style.transform='translateY(4px)'; this.style.boxShadow='none';">
                現実を受け入れる
            </button>
        </div>
    `;
    document.body.appendChild(bankruptUI);
};

window.startShopSimulation = function(building) {
    if (window.shopSimInterval) clearInterval(window.shopSimInterval);
    window.shopNPCs = [];

    window.shopSimInterval = setInterval(() => {
        const npcContainer = document.getElementById('shop-npc-container');
        if (!npcContainer) return; 
        
        let s = building.shopData;

        if (window.aiPet) {
            let energyEl = document.getElementById('shop-ai-energy');
            if (energyEl) {
                let e = Math.floor(window.aiPet.energy);
                energyEl.innerText = e + "%";
                energyEl.style.color = e > 50 ? '#4CAF50' : (e > 20 ? '#FF9800' : '#f44336');
            }
            let hungerEl = document.getElementById('shop-ai-hunger');
            if (hungerEl) {
                let h = Math.floor(window.aiPet.hunger);
                hungerEl.innerText = h + "%";
                hungerEl.style.color = h > 50 ? '#4CAF50' : (h > 20 ? '#FF9800' : '#f44336');
            }
        }

        if (s.isOpen) {
            let spawnChance = Math.max(0.01, (s.reputation / 100) * 0.05) + ((s.interiorLevel - 1) * 0.015);
            if (Math.random() < spawnChance && window.shopNPCs.length < 3) {
                let skins = ['robot', 'magician', 'spirit', 'dragon', 'machine', 'stone', 'seed', 'ghost', 'balloon', 'bird', 'beetle'];
                let skin = skins[Math.floor(Math.random() * skins.length)];
                let isRegular = Math.random() < (s.reputation / 200); 

                // ==========================================
                // ★本番機能：登録された「本当のフレンド」が来店する！
                // ==========================================
                let friendList = JSON.parse(localStorage.getItem('my_friend_list') || '[]');
                let isFriend = false;
                let friendId = null;
                let friendName = "";

                // 30%の確率で、かつフレンドが1人以上いる場合のみフレンドが来る
                if (friendList.length > 0 && Math.random() < 0.3) {
                    let f = friendList[Math.floor(Math.random() * friendList.length)];
                    isFriend = true;
                    friendId = f.id;
                    friendName = f.name;
                }

                let newNPC = {
                    id: 'npc_' + Date.now() + Math.random(), skin: skin,
                    x: -20, y: 150 + Math.random() * 40, targetX: 100 + Math.random() * 80, targetY: 150 + Math.random() * 40,
                    state: 'entering', timer: 0, 
                    msg: isFriend ? "遊びに来たよ！" : (isRegular ? "また来たよ！" : "お店やってる？"), 
                    msgColor: isFriend ? "#E040FB" : (isRegular ? "#FFD700" : "#fff"),
                    intel: 10 + Math.random() * 80,
                    isRegular: isRegular,
                    isFriend: isFriend,
                    friendId: friendId,
                    friendName: friendName
                };
                window.shopNPCs.push(newNPC);
            }
        }
        
        let html = '';
        
        if (window.aiPet) {
            const myAi = window.aiPet;
            let myAction = myAi.visualAction || 'idle';
            if (myAi.actionState === 'apprentice_training' || myAi.actionState === 'building') {
                myAction = myAi.visualAction || (building.type === 'restaurant' ? 'cook' : 'smith');
            } else if (myAi.actionState === 'studying') {
                myAction = 'study';
            }

            let myConf = (typeof aiConfigs !== 'undefined') ? aiConfigs[myAi.currentSkin || myAi.baseType || 'robot'] : null;
            if (myConf) {
                let myFrames = (myConf.actions && myConf.actions[myAction]) ? myConf.actions[myAction] : (myConf.actions && myConf.actions.idle) ? myConf.actions.idle : null;
                if (myFrames && myFrames.length > 0) {
                    let fIdx = myAi.frameIndex || 0; if (fIdx >= myFrames.length) fIdx = 0;
                    let mFrame = myFrames[fIdx];
                    
                    let mImgKey = myAi.currentSkin || myAi.baseType || 'robot';
                    if (myConf.img) mImgKey = myConf.img;
                    if (myConf.actionImages && myConf.actionImages[myAction]) mImgKey = myConf.actionImages[myAction]; 
                    else if (mFrame.img) mImgKey = mFrame.img;
                    
                    let mImgUrl = 'characters.png';
                    if (typeof images !== 'undefined' && images[mImgKey] && images[mImgKey].src) mImgUrl = images[mImgKey].src; 
                    else if (typeof window.dynamicImageCatalog !== 'undefined' && window.dynamicImageCatalog[mImgKey]) mImgUrl = window.dynamicImageCatalog[mImgKey]; 
                    else if (typeof imageSources !== 'undefined' && imageSources[mImgKey]) mImgUrl = imageSources[mImgKey]; 
                    
                    let myScale = myConf.scale || 0.25; 
                    let myX = 220; let myY = building.type === 'restaurant' ? 120 : 160;
                    let sw = mFrame.sw || 300; let sh = mFrame.sh || 300; let sx = mFrame.sx || 0; let sy = mFrame.sy || 0;
                    
                    let myBgStyle = `position:absolute; left:-${sw/2}px; top:-${sh}px; width:${sw}px; height:${sh}px; background-image:url('${mImgUrl}'); background-position:-${sx}px -${sy}px; background-repeat:no-repeat; transform:scaleX(-1);`;
                    let msgTop = Math.floor(sh * myScale) + 15; 
                    
                    html += `
                        <div style="position:absolute; left:${myX}px; top:${myY}px; z-index:${Math.floor(myY)};">
                            <div style="position:relative; transform:scale(${myScale});">
                                <div style="${myBgStyle}"></div>
                            </div>
                            ${myAi.messageTimer > 0 ? `<div style="position:absolute; top:-${msgTop}px; left:0; transform:translateX(-50%); background:rgba(255,255,255,0.9); color:#000; padding:6px 10px; border-radius:6px; font-size:13px; font-weight:bold; white-space:nowrap; border:2px solid #aaa; box-shadow:0 4px 6px rgba(0,0,0,0.5); z-index:100; pointer-events:none;">${myAi.message}</div>` : ''}
                        </div>
                    `;
                }
            }
        }

        for (let i = window.shopNPCs.length - 1; i >= 0; i--) {
            let npc = window.shopNPCs[i]; npc.timer++;
            
            if (npc.state === 'entering') {
                npc.x += (npc.targetX - npc.x) * 0.1; npc.y += (npc.targetY - npc.y) * 0.1;
                if (npc.timer > 30) {
                    npc.state = 'shopping'; npc.timer = 0;
                    
                    let knownRecipes = Object.keys(s.recipes).filter(k => s.recipes[k].learned);
                    
                    if (knownRecipes.length > 0) {
                        let targetItemId = knownRecipes[Math.floor(Math.random() * knownRecipes.length)];
                        let itemName = window.getDisplayShopItemName(targetItemId);

                        let currentStock = window.getCurrentShopStock(s.recipes);

                        if (currentStock[targetItemId] > 0) {
                            let price = s.prices[targetItemId] || 50;
                            let baseValue = (typeof itemCatalog !== 'undefined' && itemCatalog[targetItemId] && itemCatalog[targetItemId].value) ? itemCatalog[targetItemId].value * 4 : 50; 
                            let ratio = price / baseValue;
                            let buyChance = 1.0;

                            let acceptableRatio = 1.0 + (s.interiorLevel * 0.1); 
                            if (ratio > acceptableRatio) buyChance -= (ratio - acceptableRatio) * (npc.intel / 30);
                            if (ratio < 0.8) buyChance += 0.5; 
                            if (s.reputation > 50) buyChance += 0.2; 
                            if (npc.isRegular) buyChance += 0.3; 
                            if (npc.isFriend) buyChance += 0.5; // フレンドは甘々で買ってくれる

                            if (Math.random() < buyChance) {
                                let idx = window.aiPet.inventory.indexOf(targetItemId);
                                if (idx !== -1) window.aiPet.inventory.splice(idx, 1);
                                
                                let isEatIn = false;
                                let foundSeat = null;
                                
                                if (building.type === 'restaurant' && Math.random() < 0.5) {
                                    let seats = window.SHOP_FURNITURE_DATA['restaurant'].filter(f => f.isSeat && s.interiorLevel >= f.reqLv);
                                    for (let seat of seats) {
                                        let occupied = window.shopNPCs.some(n => n.targetSeat && n.targetSeat.name === seat.name);
                                        if (!occupied) {
                                            foundSeat = seat;
                                            break;
                                        }
                                    }
                                    if (foundSeat) isEatIn = true;
                                }

                                if (isEatIn) {
                                    npc.targetSeat = foundSeat;
                                    npc.purchasedPrice = price; 
                                    npc.purchasedItemId = targetItemId;
                                    npc.targetX = foundSeat.x; 
                                    npc.targetY = foundSeat.y + 20; 
                                    npc.state = 'moving_to_seat';
                                    npc.timer = 0;
                                    npc.msg = `ここで食べていくよ！`; npc.msgColor = "#4CAF50";
                                } else {
                                    s.totalSales += price;
                                    s.reputation = Math.min(100, s.reputation + (npc.isRegular ? 2 : 1)); window.aiPet.gold += price; 
                                    npc.msg = `${itemName}を買った！`; npc.msgColor = "#4CAF50";
                                    
                                    let vfx = document.createElement('div');
                                    vfx.style.cssText = `position:absolute; left:${npc.x + 30}px; top:${npc.y - 20}px; color:#FFD700; font-weight:bold; font-size:24px; animation:slideUpFade 1s forwards; z-index:100; pointer-events:none; text-shadow:1px 1px 0 #000;`;
                                    vfx.innerText = `+${price}G`; npcContainer.appendChild(vfx); setTimeout(() => vfx.remove(), 1000);
                                    
                                    if (npc.isFriend && typeof window.sendItemToFriend === 'function') {
                                        window.sendItemToFriend(npc.friendId, npc.friendName, targetItemId);
                                    }

                                    npc.state = 'leaving';
                                    npc.targetX = -100;
                                }

                            } else {
                                let repPenalty = 4 - s.interiorLevel;
                                if (s.reputation > 70 && ratio > 1.3) repPenalty += 5; 
                                else if (s.reputation > 50 && ratio > 1.3) repPenalty += 3;
                                if (npc.isRegular) repPenalty *= 2; 

                                s.reputation -= repPenalty; 
                                npc.msgColor = "#ff5252";
                                if (npc.intel > 50) npc.msg = npc.isFriend ? `ちょっと高すぎない...？また今度ね！` : (npc.isRegular ? `常連なのにこの値段！？もう来ない！` : `相場より高いな...ぼったくりだ！`);
                                else npc.msg = `うーん、ちょっと高いかも...`; 
                                npc.state = 'leaving'; npc.targetX = -100;
                                
                                if (s.reputation <= 0) return window.triggerBankrupt(building);
                            }
                        } else {
                            let repPenalty = npc.isRegular ? 3 : 1; 
                            s.reputation = Math.max(0, s.reputation - repPenalty);
                            npc.msg = npc.isFriend ? `あれ？${itemName}目当てだったのに...残念！` : (npc.isRegular ? `${itemName}がないなんて...ガッカリ。` : `${itemName}、品切れかぁ...`); 
                            npc.msgColor = "#aaa"; 
                            npc.state = 'leaving'; npc.targetX = -100;
                            
                            if (s.reputation <= 0) return window.triggerBankrupt(building);
                        }
                    } else {
                        npc.msg = "メニューがないみたい..."; npc.msgColor = "#aaa"; s.reputation = Math.max(0, s.reputation - 1);
                        npc.state = 'leaving'; npc.targetX = -100;
                    }
                    window.updateShopUIData(building); 
                }
            } 
            else if (npc.state === 'moving_to_seat') {
                npc.x += (npc.targetX - npc.x) * 0.1; 
                npc.y += (npc.targetY - npc.y) * 0.1;
                let dist = Math.hypot(npc.targetX - npc.x, npc.targetY - npc.y);
                if (dist < 2) {
                    npc.state = 'eating';
                    npc.timer = 0;
                    npc.msg = "モグモグ...（食事中）";
                    npc.msgColor = "#FFF";
                }
            } 
            else if (npc.state === 'eating') {
                if (npc.timer > 50) { 
                    let cookSkill = window.aiPet.skills.cooking || 1;
                    let deliciousChance = 0.65 + (cookSkill * 0.03); 
                    if (npc.isFriend) deliciousChance += 0.2; // フレンドは甘めに評価
                    
                    if (Math.random() < deliciousChance) {
                        s.totalSales += npc.purchasedPrice;
                        s.reputation = Math.min(100, s.reputation + (npc.isRegular ? 3 : 2)); 
                        window.aiPet.gold += npc.purchasedPrice;
                        
                        npc.msg = npc.isFriend ? `美味しい！また食べに来るね！` : `すごく美味しい！最高！`; 
                        npc.msgColor = "#FFD700";
                        
                        let vfx = document.createElement('div');
                        vfx.style.cssText = `position:absolute; left:${npc.x + 30}px; top:${npc.y - 20}px; color:#FFD700; font-weight:bold; font-size:24px; animation:slideUpFade 1s forwards; z-index:100; pointer-events:none; text-shadow:1px 1px 0 #000;`;
                        vfx.innerText = `+${npc.purchasedPrice}G`; npcContainer.appendChild(vfx); setTimeout(() => vfx.remove(), 1000);

                        if (npc.isFriend && typeof window.sendFoodEffectToFriend === 'function') {
                            window.sendFoodEffectToFriend(npc.friendId, npc.friendName, npc.purchasedItemId);
                        }

                    } else {
                        s.reputation = Math.max(0, s.reputation - (npc.isRegular ? 5 : 3));
                        npc.msg = npc.isFriend ? `うーん...ちょっと微妙かも...` : `なんだこれ...まずい！金返せ！`; 
                        npc.msgColor = "#ff5252";
                        
                        if (s.reputation <= 0) return window.triggerBankrupt(building);
                    }
                    
                    npc.state = 'leaving';
                    npc.targetX = -100;
                    npc.targetSeat = null; 
                    window.updateShopUIData(building);
                }
            }
            else if (npc.state === 'leaving') {
                npc.x += (npc.targetX - npc.x) * 0.1;
                if (npc.x < -50) { window.shopNPCs.splice(i, 1); continue; }
            }
            
            const conf = (typeof aiConfigs !== 'undefined') ? aiConfigs[npc.skin] : null;
            if (conf) {
                let npcAction = 'idle';
                if (npc.state === 'entering' || npc.state === 'leaving' || npc.state === 'moving_to_seat') npcAction = 'walk';
                else if (npc.state === 'eating') npcAction = 'eat_dish';

                let frame = null;
                if (conf.actions && conf.actions[npcAction]) frame = conf.actions[npcAction][0]; 
                else if (conf.actions && conf.actions.idle) frame = conf.actions.idle[0]; 

                if (frame) {
                    let imgKey = npc.skin || 'robot'; 
                    if (conf.img) imgKey = conf.img;
                    if (conf.actionImages && conf.actionImages[npcAction]) imgKey = conf.actionImages[npcAction]; 
                    else if (frame.img) imgKey = frame.img;

                    let imgUrl = 'characters.png'; 
                    if (typeof images !== 'undefined' && images[imgKey] && images[imgKey].src) imgUrl = images[imgKey].src; 
                    else if (typeof window.dynamicImageCatalog !== 'undefined' && window.dynamicImageCatalog[imgKey]) imgUrl = window.dynamicImageCatalog[imgKey]; 
                    else if (typeof imageSources !== 'undefined' && imageSources[imgKey]) imgUrl = imageSources[imgKey]; 
                    
                    let sScale = conf.scale || 0.25; 
                    if (['robot', 'magician', 'spirit'].some(k => npc.skin.includes(k))) sScale *= 1.8; 

                    let sw = frame.sw || 300; let sh = frame.sh || 300; let sx = frame.sx || 0; let sy = frame.sy || 0;
                    let flipX = (npc.targetX < 0) ? -1 : 1;
                    
                    let bgStyle = `position:absolute; left:-${sw/2}px; top:-${sh}px; width:${sw}px; height:${sh}px; background-image:url('${imgUrl}'); background-position:-${sx}px -${sy}px; background-repeat:no-repeat; transform:scaleX(${flipX});`;
                    let npcMsgTop = Math.floor(sh * sScale) + 15;

                    html += `
                        <div style="position:absolute; left:${npc.x}px; top:${npc.y}px; transition:none; z-index:${Math.floor(npc.y)};">
                            <div style="position:relative; transform:scale(${sScale});">
                                <div style="${bgStyle}"></div>
                            </div>
                            ${npc.isFriend ? `<div style="position:absolute; top:-${npcMsgTop + 20}px; left:0; transform:translateX(-50%); font-size:12px; background:#E040FB; color:#fff; padding:2px 6px; border-radius:4px; white-space:nowrap; border:1px solid #FFF; z-index:101; pointer-events:none;">${npc.friendName}</div>` : ''}
                            ${npc.isRegular && !npc.isFriend ? `<div style="position:absolute; top:-${npcMsgTop + 20}px; left:0; transform:translateX(-50%); font-size:16px; text-shadow:0 0 3px #000;">🌟</div>` : ''}
                            ${npc.msg ? `<div style="position:absolute; top:-${npcMsgTop}px; left:0; transform:translateX(-50%); background:rgba(0,0,0,0.8); color:${npc.msgColor}; padding:6px 10px; border-radius:6px; font-size:12px; font-weight:bold; white-space:nowrap; border:2px solid ${npc.msgColor}; box-shadow:0 4px 6px rgba(0,0,0,0.5); z-index:100; pointer-events:none;">${npc.msg}</div>` : ''}
                        </div>
                    `;
                }
            }
        }
        
        let oldElements = Array.from(npcContainer.children).filter(c => c.style.animation);
        npcContainer.innerHTML = html; oldElements.forEach(c => npcContainer.appendChild(c));
        
    }, 100); 
};

window.closeShopUI = function() {
    if (window.shopSimInterval) clearInterval(window.shopSimInterval); 
    const ui = document.getElementById('shop-management-ui');
    if (ui) ui.style.display = 'none';
};

window.closeBankruptUI = function(bId) {
    let ui = document.getElementById('bankrupt-ui');
    if (ui) ui.remove();
    
    window.closeShopUI(); 
    if (bId && assets[bId]) delete assets[bId];
    
    if (window.aiPet) {
        window.aiPet.indoorTarget = null;
        window.aiPet.isIndoors = false;
        window.aiPet.actionState = 'idle';
        window.aiPet.visualAction = null;
        window.aiPet.schedule = []; 
        window.aiPet.message = "お店が潰れちゃった...";
        window.aiPet.messageTimer = 200;
        
        window.aiPet.stats.mood = Math.max(0, window.aiPet.stats.mood - 30);
        window.aiPet.energy = Math.max(0, window.aiPet.energy - 20);
        if (typeof addFloatingText === 'function') addFloatingText(window.aiPet.x, window.aiPet.y - 40, "ショック！", "#8e24aa");
    }
    if (typeof saveGameData === 'function') saveGameData();
};

// ==========================================
// 🛡️ セーブデータ保護機構（他人の島での誤上書き防止）
// ==========================================
if (typeof window.originalSaveGameData === 'undefined' && typeof saveGameData === 'function') {
    window.originalSaveGameData = saveGameData;
    // セーブ関数を乗っ取り、訪問中なら強制ブロックする
    window.saveGameData = function() {
        if (typeof currentMode !== 'undefined' && currentMode === 'visit') {
            console.log("✈️ 訪問中のためセーブをブロックしました（データ保護）");
            return;
        }
        return window.originalSaveGameData();
    };
}

// ==========================================
// ✈️ 島訪問システム（最強のデータ保護＆完全復帰版）
// ==========================================
window.myIslandBackupLS = null; // ローカルストレージ丸ごと退避用

window.visitPlayerIsland = async function(playerId, playerName) {
    if (playerId === localStorage.getItem('my_player_id')) {
        alert("ここは自分の島です！");
        return;
    }
    
    // 出発前に自分の島を完全にセーブ
    if(typeof window.originalSaveGameData === 'function') window.originalSaveGameData();

    // ★追加：ブラウザのセーブデータ（ローカルストレージ）を丸ごと退避させる最強のバックアップ
    let lsBackup = {};
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        lsBackup[key] = localStorage.getItem(key);
    }
    window.myIslandBackupLS = lsBackup;

    let friendUI = document.getElementById('friend-list-ui');
    if (friendUI) friendUI.remove();
    let detailArea = document.getElementById('ranking-detail-area');
    if (detailArea) detailArea.style.display = 'none';

    let friendData = await window.fetchPlayerSaveData(playerId);
    if (!friendData) {
        alert("プレイヤーの島データが見つかりませんでした。");
        return;
    }

    try {
        let fAssetsStr = friendData.map_data || friendData.map_assets || "{}";
        let fAssets = JSON.parse(fAssetsStr);
        
        if (typeof assets !== 'undefined') {
            for (let k in assets) delete assets[k];
            Object.assign(assets, fAssets);
        }

        if (friendData.ai_pet_data_v1) {
            let petData = JSON.parse(friendData.ai_pet_data_v1);
            let targetPet = typeof aiPet !== 'undefined' ? aiPet : window.aiPet;
            Object.assign(targetPet, petData);
            targetPet.godMode = true; 
        }

        // ★訪問モードに切り替え（この間、上の保護機構により一切のセーブがブロックされる）
        if (typeof currentMode !== 'undefined') currentMode = 'visit';
        
        window.showReturnUI(playerName);
        
        let targetPet = typeof aiPet !== 'undefined' ? aiPet : window.aiPet;
        if(typeof addFloatingText === 'function') {
            addFloatingText(targetPet.x, targetPet.y - 50, `✈️ ${playerName}の島に到着！`, "#E040FB");
        }

    } catch (e) {
        console.error("島展開エラー", e);
        alert("島の読み込みに失敗しました。");
        window.returnToMyIsland();
    }
};

window.returnToMyIsland = function() {
    if (!window.myIslandBackupLS) return;

    // ★追加：退避しておいた自分自身のセーブデータを、完全に書き戻す
    for (let key in window.myIslandBackupLS) {
        localStorage.setItem(key, window.myIslandBackupLS[key]);
    }

    if (typeof currentMode !== 'undefined') currentMode = 'play';
    window.myIslandBackupLS = null;

    let returnBtn = document.getElementById('return-island-btn');
    if (returnBtn) returnBtn.remove();

    // ★安全第一：メモリに変なデータが残らないよう、ゲームを再読み込みして完全な状態で復帰する
    localStorage.setItem('trigger_fade_in', 'true');
    alert("自分の島に帰還します！\n※安全のため画面を再読み込みします。");
    window.location.reload();
};

window.showReturnUI = function(playerName) {
    let btn = document.getElementById('return-island-btn');
    if (!btn) {
        btn = document.createElement('div');
        btn.id = 'return-island-btn';
        document.body.appendChild(btn);
    }
    btn.style.cssText = `position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#E040FB; color:#fff; padding:15px 30px; border-radius:30px; font-weight:bold; font-size:18px; cursor:pointer; z-index:90000; box-shadow:0 4px 10px rgba(0,0,0,0.5); border:2px solid #FFF; transition:0.2s;`;
    btn.innerHTML = `✈️ 「${playerName}」の島から帰る`;
    btn.onclick = window.returnToMyIsland;
};

// ==========================================
// ⚖️ 訪問時の行商人システム（相場計算とUI）
// ==========================================

// 需要と供給による相場計算（ホストの在庫数で価格が乱高下する）
window.calculateLocalPrice = function(itemId, hostInventory) {
    let count = hostInventory.filter(i => i === itemId).length;
    let baseValue = (typeof itemCatalog !== 'undefined' && itemCatalog[itemId] && itemCatalog[itemId].value) ? itemCatalog[itemId].value * 4 : 50;
    
    // 【相場変動ルール】
    // 0個: 2.0倍 (超インフレ)
    // 1-2個: 1.5倍 (高需要)
    // 3-5個: 1.0倍 (適正価格)
    // 6-9個: 0.6倍 (値崩れ)
    // 10個以上: 0.2倍 (超デフレ・暴落)
    let multi = 1.0;
    if (count === 0) multi = 2.0;
    else if (count <= 2) multi = 1.5;
    else if (count <= 5) multi = 1.0;
    else if (count <= 9) multi = 0.6;
    else multi = 0.2;
    
    return { price: Math.floor(baseValue * multi), count: count, multi: multi };
};

// 訪問者専用の売却UI
window.openVisitorTradingUI = function(building) {
    // 自分の退避データ（行商人の荷物）を読み込む
    let myRealPet = null;
    if (window.myIslandBackupLS && window.myIslandBackupLS['ai_pet_data_v1']) {
        myRealPet = JSON.parse(window.myIslandBackupLS['ai_pet_data_v1']);
    }
    if (!myRealPet || !myRealPet.inventory) {
        alert("荷物が読み込めません。"); return;
    }

    let isRest = building.type === 'restaurant';
    let typeWord = isRest ? '🍳 レストラン (買取中)' : '🔨 鍛冶屋 (買取中)';
    
    // 自分の荷物の中から、この店に売れるものをピックアップ
    let sellableItems = [];
    myRealPet.inventory.forEach(i => {
        let c = typeof itemCatalog !== 'undefined' ? itemCatalog[i] : null;
        if (isRest && c && (c.type === 'dish' || c.type === 'food' || c.type === 'ingredient')) sellableItems.push(i);
        else if (!isRest && (i.startsWith('item_sword') || i.startsWith('item_shield') || i === 'iron' || i === 'wood' || i === 'stone' || (c && c.type === 'tool'))) sellableItems.push(i);
    });

    // アイテムの種類ごとにまとめる
    let uniqueItems = [...new Set(sellableItems)];
    
    let html = `
        <div style="background: linear-gradient(135deg, #1a1a1a, #111); padding:20px; border-radius:12px; border:2px solid #00BCD4; width:500px; color:#fff; box-shadow:0 10px 40px rgba(0,0,0,0.8);">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #333; padding-bottom:10px; margin-bottom:15px;">
                <h2 style="margin:0; color:#00BCD4; font-size:22px;">⚖️ 行商人モード: ${typeWord}</h2>
                <button onclick="document.getElementById('visitor-trading-ui').remove()" style="background:transparent; border:none; color:#aaa; font-size:24px; cursor:pointer;">×</button>
            </div>
            
            <div style="display:flex; justify-content:space-between; background:#222; padding:10px 15px; border-radius:8px; margin-bottom:15px;">
                <span>あなたの所持金:</span>
                <span style="color:#FFD700; font-weight:bold; font-size:18px;" id="visitor-current-gold">${myRealPet.gold || 0} G</span>
            </div>
            
            <div style="max-height:350px; overflow-y:auto; padding-right:5px;">
    `;

    if (uniqueItems.length === 0) {
        html += `<div style="text-align:center; padding:30px; color:#aaa;">このお店に売れるアイテムを持っていません。</div>`;
    } else {
        uniqueItems.forEach(itemId => {
            let itemName = window.getDisplayShopItemName(itemId);
            let myCount = sellableItems.filter(i => i === itemId).length;
            
            // 相場計算（ホストのAIペットの在庫を見る）
            let marketData = window.calculateLocalPrice(itemId, window.aiPet.inventory || []);
            
            let trendIcon = "➖"; let trendColor = "#FFF";
            if (marketData.multi >= 1.5) { trendIcon = "🔥超高騰"; trendColor = "#ff5252"; }
            else if (marketData.multi === 1.0) { trendIcon = "➖安定"; trendColor = "#4CAF50"; }
            else if (marketData.multi <= 0.6) { trendIcon = "📉暴落中"; trendColor = "#00BCD4"; }

            html += `
                <div style="background:#222; padding:12px; margin-bottom:10px; border-radius:8px; border:1px solid #444; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <div style="font-weight:bold; font-size:16px;">${itemName} <span style="font-size:12px; color:#888;">(所持: ${myCount}個)</span></div>
                        <div style="font-size:11px; color:#aaa; margin-top:4px;">島の在庫: ${marketData.count}個 / 相場: <span style="color:${trendColor}; font-weight:bold;">${trendIcon}</span></div>
                    </div>
                    <div style="display:flex; align-items:center; gap:15px;">
                        <div style="font-size:20px; font-weight:bold; color:#FFD700;">${marketData.price} G</div>
                        <button onclick="window.executeSellToHost('${itemId}', ${marketData.price})" style="padding:8px 15px; background:#00BCD4; color:#000; border:none; border-radius:6px; cursor:pointer; font-weight:bold;">売る</button>
                    </div>
                </div>
            `;
        });
    }

    html += `</div></div>`;
    
    let ui = document.getElementById('visitor-trading-ui');
    if (ui) ui.remove();
    ui = document.createElement('div');
    ui.id = 'visitor-trading-ui';
    ui.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); z-index:90000; display:flex; justify-content:center; align-items:center; font-family:sans-serif;`;
    ui.innerHTML = html;
    document.body.appendChild(ui);
};

// 実際にアイテムを相手の島に売りつける処理
window.executeSellToHost = function(itemId, price) {
    let hostId = localStorage.getItem('visiting_player_id'); 
    let myName = localStorage.getItem('my_player_name') || "名無し";
    
    // 自分の退避データを更新
    let myRealPet = JSON.parse(window.myIslandBackupLS['ai_pet_data_v1']);
    let idx = myRealPet.inventory.indexOf(itemId);
    
    if (idx > -1) {
        // 自分の荷物から減らして、お金を増やす
        myRealPet.inventory.splice(idx, 1);
        myRealPet.gold = (myRealPet.gold || 0) + price;
        window.myIslandBackupLS['ai_pet_data_v1'] = JSON.stringify(myRealPet);

        // 画面上（ホストのAI）の在庫に直接追加してあげる（演出用）
        if (!window.aiPet.inventory) window.aiPet.inventory = [];
        window.aiPet.inventory.push(itemId);
        window.aiPet.gold -= price; // 画面上のホストの所持金も減らす

        // クラウドの相手の郵便受けに取引記録を送信する（これが本命の処理）
        if (typeof window.sendTradeToHost === 'function') {
            window.sendTradeToHost(hostId, myName, itemId, price);
        }

        // UIを更新
        let goldEl = document.getElementById('visitor-current-gold');
        if (goldEl) goldEl.innerText = `${myRealPet.gold} G`;
        
        let itemName = window.getDisplayShopItemName(itemId);
        alert(`相手の島に「${itemName}」を ${price}G で売却しました！`);
        
        // 画面を再描画して相場を変動させる
        let building = null; // 現在アクセス中の建物を再取得
        for (let k in assets) { if (assets[k].shopData && (assets[k].type === 'restaurant' || assets[k].type === 'smith')) { building = assets[k]; break; } }
        if (building) window.openVisitorTradingUI(building);
    }
};

// ★追記：訪問時に相手のIDを記録しておく
const originalVisit = window.visitPlayerIsland;
window.visitPlayerIsland = async function(playerId, playerName) {
    localStorage.setItem('visiting_player_id', playerId);
    await originalVisit(playerId, playerName);
};

// ==========================================
// 🏪 ショップ機能（相場計算とオーナー用掲示板）
// ==========================================

// ショップの相場を計算する関数
window.calculateShopPrice = function(itemId, shopData) {
    if (!shopData) return { price: 50, multi: 1.0, trendCount: 0 };
    if (!shopData.marketTrend) shopData.marketTrend = {};
    
    // 相場は「実際の在庫」ではなく、他人が取引した「marketTrend（流通スコア）」で決まる
    let count = shopData.marketTrend[itemId] || 0; 
    let baseValue = (typeof itemCatalog !== 'undefined' && itemCatalog[itemId] && itemCatalog[itemId].value) ? itemCatalog[itemId].value * 4 : 50;
    
    let multi = 1.0;
    if (count === 0) multi = 2.0;
    else if (count <= 2) multi = 1.5;
    else if (count <= 5) multi = 1.0;
    else if (count <= 9) multi = 0.6;
    else multi = 0.2;
    
    return { price: Math.floor(baseValue * multi), multi: multi, trendCount: count };
};

// ショップ施設をクリックした時に開くUI（売買不可の相場ボード）
window.openShopUI = function(building) {
    if (!building.shopData) building.shopData = { inventory: {}, marketTrend: {} };
    let s = building.shopData;
    if (!s.marketTrend) s.marketTrend = {};
    if (!s.inventory) s.inventory = {};

    let myInvCounts = {};
    if (window.aiPet && window.aiPet.inventory) {
        window.aiPet.inventory.forEach(i => myInvCounts[i] = (myInvCounts[i] || 0) + 1);
    }

    let allItemIds = new Set([...Object.keys(s.inventory), ...Object.keys(myInvCounts)]);
    let uniqueItems = Array.from(allItemIds).filter(id => (s.inventory[id] || 0) > 0 || (myInvCounts[id] || 0) > 0);

    let html = `
        <div style="background: linear-gradient(135deg, #1a1a1a, #111); padding:20px; border-radius:12px; border:2px solid #00BCD4; width:500px; color:#fff; box-shadow:0 10px 40px rgba(0,0,0,0.8);">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #333; padding-bottom:10px; margin-bottom:15px;">
                <h2 style="margin:0; color:#00BCD4; font-size:22px;">🏪 ローカル取引所（相場ボード）</h2>
                <button onclick="document.getElementById('player-shop-ui').remove()" style="background:transparent; border:none; color:#aaa; font-size:24px; cursor:pointer;">×</button>
            </div>
            
            <div style="font-size:13px; color:#ccc; margin-bottom:15px; text-align:center; background:#222; padding:10px; border-radius:6px;">
                💡 プレイヤーは直接取引できません。<br>チャットでAIに「ショップでおつかいして」と指示を出しましょう。
            </div>
            
            <div style="max-height:400px; overflow-y:auto; padding-right:5px;">
    `;

    if (uniqueItems.length === 0) {
        html += `<div style="text-align:center; padding:30px; color:#aaa;">取引できるアイテムがありません。</div>`;
    } else {
        uniqueItems.forEach(itemId => {
            let itemName = typeof window.getDisplayShopItemName === 'function' ? window.getDisplayShopItemName(itemId) : itemId;
            let myCount = myInvCounts[itemId] || 0;
            let shopCount = s.inventory[itemId] || 0;
            
            let market = window.calculateShopPrice(itemId, s);
            let trendIcon = "➖ 安定"; let trendColor = "#4CAF50";
            if (market.multi >= 1.5) { trendIcon = "🔥 高騰中"; trendColor = "#ff5252"; }
            else if (market.multi <= 0.6) { trendIcon = "📉 暴落中"; trendColor = "#00BCD4"; }

            html += `
                <div style="background:#222; padding:12px; margin-bottom:10px; border-radius:8px; border:1px solid #444; display:flex; justify-content:space-between; align-items:center;">
                    <div style="flex:1;">
                        <div style="font-weight:bold; font-size:16px;">${itemName}</div>
                        <div style="font-size:11px; color:#aaa; margin-top:4px;">
                            相場: <span style="color:${trendColor}; font-weight:bold;">${trendIcon}</span> 
                            (市場流通スコア: ${market.trendCount})
                        </div>
                    </div>
                    <div style="text-align:right; margin-right:5px;">
                        <div style="font-size:20px; font-weight:bold; color:#FFD700;">${market.price} G</div>
                        <div style="font-size:11px; color:#aaa; margin-top:4px;">店在庫: <span style="color:#FFF;">${shopCount}</span> / 所持: <span style="color:#FFF;">${myCount}</span></div>
                    </div>
                </div>
            `;
        });
    }

    html += `</div></div>`;
    
    let ui = document.getElementById('player-shop-ui');
    if (ui) ui.remove();
    ui = document.createElement('div');
    ui.id = 'player-shop-ui';
    ui.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); z-index:90000; display:flex; justify-content:center; align-items:center; font-family:sans-serif;`;
    ui.innerHTML = html;
    document.body.appendChild(ui);
};