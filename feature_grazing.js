// ===== feature_grazing.js (Ultimate Edition v6: マップ選択UI＆ステータス引継ぎ搭載版) =====

let backupMainAssets = null;
let currentGrazingMapId = -1;
let grazingCameraIndex = 0; 

window.isGrazingUpdate = false;
const originalSaveGameData = window.saveGameData;
window.saveGameData = function() {
    if (window.isGrazingUpdate) return;
    
    // ==========================================
    // ★仕様4: 育成中キャラの最新ステータスと「語彙」を自動記録
    // ==========================================
    if (typeof aiPet !== 'undefined' && aiPet.currentSkin) {
        if (!aiPet.savedGrazeStats) aiPet.savedGrazeStats = {};
        aiPet.savedGrazeStats[aiPet.currentSkin] = {
            skills: JSON.parse(JSON.stringify(aiPet.skills || {})),
            stats: JSON.parse(JSON.stringify(aiPet.stats || {})),
            // ★新規追加：図鑑登録（セーブ）時の覚えている言葉も一緒に記録！
            learnedWords: (aiPet.apprentice && aiPet.apprentice.learnedWords) ? JSON.parse(JSON.stringify(aiPet.apprentice.learnedWords)) : []
        };
    }
    
    if (typeof originalSaveGameData === 'function') originalSaveGameData();
};

const originalAddFloatingText = window.addFloatingText;
window.addFloatingText = function(x, y, text, color) {
    if (window.isGrazingUpdate) return;
    if (typeof originalAddFloatingText === 'function') originalAddFloatingText(x, y, text, color);
};

function injectMethods(targetPet) {
    if (typeof targetPet.update !== 'function') {
        const source = window.aiPet || aiPet;
        for (let key in source) {
            if (typeof source[key] === 'function') targetPet[key] = source[key];
        }
    }
    targetPet.workFarm = function() {}; 
}

// ==========================================
// ★仕様3: 放牧マップの選択UIと段階的解放
// ==========================================
window.openGrazingMapSelect = function(skinKey) {
    let ui = document.getElementById('grazing-map-select-ui');
    if (!ui) {
        ui = document.createElement('div');
        ui.id = 'grazing-map-select-ui';
        document.body.appendChild(ui);
    }

    let discCount = (aiPet.discoveredMonsters || []).length;
    let reqs = [2, 4, 6, 8, 10]; // マップ1〜5の解放条件（図鑑登録数）
    
    // 足りないマップデータを5つまで自動生成
    while(grazingData.maps.length < 5) {
        grazingData.maps.push({ id: grazingData.maps.length, isInitialized: false, assets: {}, pets: [], stash: [], lastOfflineTime: Date.now() });
    }

    let html = `<div style="background:rgba(0,0,0,0.85); padding:20px; border:2px solid #4CAF50; border-radius:8px; color:white; width: 320px; text-align:center; box-shadow: 0 4px 15px rgba(0,0,0,0.7);">`;
    html += `<h3 style="margin-top:0; color:#4CAF50;">${skinKey} の配置先を選択</h3>`;

    for (let i = 0; i < 5; i++) {
        let req = reqs[i];
        let mapObj = grazingData.maps[i];
        let isUnlocked = discCount >= req;
        let count = mapObj.pets ? mapObj.pets.length : 0;

        if (isUnlocked) {
            let status = mapObj.isInitialized ? `配置: ${count}/3体` : "未開拓 (エディタ)";
            let disabled = (count >= 3) ? "disabled" : "";
            let color = (count >= 3) ? "#555" : "#4CAF50";
            html += `<button ${disabled} onclick="confirmGrazingPlacement(${i}, '${skinKey}')" style="width:100%; padding:12px; margin-bottom:8px; background:${color}; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:14px;">
                        放牧マップ ${i+1} (${status})
                     </button>`;
        } else {
            html += `<button disabled style="width:100%; padding:12px; margin-bottom:8px; background:#333; color:#777; border:1px dashed #555; border-radius:5px; font-size:14px;">
                        🔒 マップ ${i+1} (図鑑${req}種類で解放)
                     </button>`;
        }
    }

    html += `<button onclick="document.getElementById('grazing-map-select-ui').style.display='none'" style="margin-top:10px; width:100%; padding:10px; background:#f44336; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">キャンセル</button>`;
    html += `</div>`;

    ui.innerHTML = html;
    ui.style.display = 'flex';
    ui.style.position = 'fixed';
    ui.style.top = '0'; ui.style.left = '0'; ui.style.width = '100%'; ui.style.height = '100%';
    ui.style.backgroundColor = 'rgba(0,0,0,0.6)';
    ui.style.justifyContent = 'center'; ui.style.alignItems = 'center';
    ui.style.zIndex = '20000';
};

window.confirmGrazingPlacement = function(mapId, skinKey) {
    document.getElementById('grazing-map-select-ui').style.display = 'none';
    const targetMap = grazingData.maps[mapId];

    if (!targetMap.isInitialized) {
        if (confirm(`マップ ${mapId+1} はまだ未開拓です。\nマップエディタを起動して、初期配置を行いますか？`)) {
            startGrazingEditor(mapId, skinKey);
        }
    } else {
        if (targetMap.pets.length < 3) {
            const newPet = createGrazingPet(skinKey);
            targetMap.pets.push(newPet);
            alert(`${skinKey} をマップ ${mapId+1} に配置しました！`);
        } else {
            alert("このマップはいっぱいです！（最大3体）");
            return;
        }
        startGrazingMode(mapId);
    }
};

function createGrazingPet(skinKey) {
    const pet = JSON.parse(JSON.stringify(aiPet)); 
    injectMethods(pet); 
    pet.x = 400 + (Math.random() - 0.5) * 100; pet.y = 240 + (Math.random() - 0.5) * 100;
    pet.targetX = pet.x; pet.targetY = pet.y;
    pet.baseType = skinKey.split('_')[0]; pet.currentSkin = skinKey;
    pet.actionState = 'idle'; pet.visualAction = null; pet.schedule = []; 
    pet.inventory = ['rod_norm', 'carrot', 'tomato', 'iron', 'iron', 'seed_carrot', 'seed_pepper', 'seed_tomato']; 
    
    // ==========================================
    // ★仕様4: セーブデータから最終ステータスを読み込む
    // （※アップデート前の古いキャラは基本値からスタートします）
    // ==========================================
    let saved = (aiPet.savedGrazeStats && aiPet.savedGrazeStats[skinKey]) ? aiPet.savedGrazeStats[skinKey] : null;

    pet.baseSkills = saved ? JSON.parse(JSON.stringify(saved.skills)) : JSON.parse(JSON.stringify(pet.skills || { building: 1, cooking: 1, smithing: 1 }));
    pet.baseFixedStats = saved ? JSON.parse(JSON.stringify(saved.stats)) : JSON.parse(JSON.stringify(pet.stats || { intel: 10, power: 10, mood: 100, beauty: 10 }));
    
    pet.message = "ここはどこだろう？"; pet.messageTimer = 180;
    pet.idleTimer = 0; pet.frameIndex = 0; pet.tick = 0; pet.godMode = true; 
    return pet;
}

window.updateGrazingLoop = function() {
    const activeMap = typeof grazingData !== 'undefined' ? grazingData.maps[currentGrazingMapId] : null;
    if (!activeMap) return;
    
    let mainPetBackup = aiPet; 
    window.isGrazingUpdate = true; 
    
    activeMap.pets.forEach((pet, index) => {
        try {
            if (typeof injectMethods === 'function') injectMethods(pet);
            aiPet = pet; window.aiPet = pet; 
            
            let mapAssets = activeMap.assets;
            let smithTargets = []; let cookTargets = []; let farmTiles = []; let exploreTargets = [];
            for (let k in mapAssets) {
                const a = mapAssets[k];
                if (a.type === 'blacksmith') smithTargets.push(a);
                if (a.type === 'restaurant' || a.type === 'hut' || a.type === 'house') cookTargets.push(a);
                if (a.type === 'farm') farmTiles.push({id: k, data: a});
                if (a.type === 'nature' || a.type === 'building' || a.type === 'mountain') exploreTargets.push(a);
            }

            if (pet.actionState === 'idle' && pet.schedule.length > 0) pet.schedule = []; 

            if (pet.actionState === 'idle' && pet.schedule.length === 0) {
                if (Math.random() < 0.02) { 
                    let acts = ['rest', 'eat'];
                    if (exploreTargets.length > 0) acts.push('explore');
                    if (cookTargets.length > 0 && pet.inventory.some(i => ['carrot', 'tomato', 'pepper', 'fish_sardine'].includes(i))) acts.push('cook');
                    if (smithTargets.length > 0 && pet.inventory.includes('iron')) acts.push('smith');
                    if (pet.inventory.some(k => k.startsWith('rod_'))) acts.push('fish');
                    if (farmTiles.length > 0) { acts.push('farm'); acts.push('farm'); }

                    let buildableKeys = [];
                    if (typeof buildingCatalog !== 'undefined') {
                        const bLevel = (pet.skills && pet.skills.building) ? Math.floor(pet.skills.building) : 1;
                        const myItems = {}; 
                        if (pet.inventory) pet.inventory.forEach(k => myItems[k] = (myItems[k] || 0) + 1);
                        for (let bKey in buildingCatalog) {
                            const b = buildingCatalog[bKey];
                            if (b.reqBuildLevel && bLevel < b.reqBuildLevel) continue; 
                            let canAfford = true;
                            if (b.materials) {
                                for (let mKey in b.materials) { if ((myItems[mKey] || 0) < b.materials[mKey]) { canAfford = false; break; } }
                            }
                            if (canAfford) { buildableKeys.push(bKey); buildableKeys.push(bKey); }
                        }
                    }
                    if (buildableKeys.length > 0) acts.push('build');

                    const act = acts[Math.floor(Math.random() * acts.length)];

                    if (act === 'fish') {
                        pet.interactionTarget = { type: 'sea', name: '海', dx: 0, dy: 0, sw: 50, sh: 50 };
                        pet.setDestination(25, 25); pet.actionState = 'moving';
                        pet.schedule.push({ type: 'fish', duration: 300, maxDuration: 300 }); 
                        pet.message = "釣りに行くぞ！"; pet.messageTimer = 120;
                    } else if (act === 'farm') {
                        let target = farmTiles[Math.floor(Math.random() * farmTiles.length)];
                        pet.interactionTarget = target.data; pet.intendedAction = 'water'; 
                        pet.setDestination(target.data.dx + 25, target.data.dy + 25); pet.actionState = 'moving';
                        pet.schedule.push({ type: 'farming_work', targetId: target.id, duration: 150, maxDuration: 150 });
                        pet.message = "畑の世話だ！"; pet.messageTimer = 120;
                    } else if (act === 'cook') {
                        let target = cookTargets[Math.floor(Math.random() * cookTargets.length)];
                        pet.indoorTarget = target;
                        pet.setDestination(target.dx + 25, target.dy + 25); pet.actionState = 'moving_to_enter';
                        pet.schedule.push({ type: 'cook', targetId: target.id, duration: 200, maxDuration: 200 });
                        pet.message = "料理するぞ！"; pet.messageTimer = 120;
                    } else if (act === 'smith') {
                        let target = smithTargets[Math.floor(Math.random() * smithTargets.length)];
                        pet.indoorTarget = target;
                        pet.setDestination(target.dx + 25, target.dy + 25); pet.actionState = 'moving_to_enter';
                        pet.schedule.push({ type: 'smith', targetId: target.id, duration: 200, maxDuration: 200 });
                        pet.message = "カンカン...！"; pet.messageTimer = 120;
                    } else if (act === 'build') {
                        let bKey = buildableKeys[Math.floor(Math.random() * buildableKeys.length)];
                        pet.setDestination(100 + Math.random() * 600, 100 + Math.random() * 300); pet.actionState = 'moving';
                        pet.schedule.push({ type: 'build', buildKey: bKey, duration: 200, maxDuration: 200 });
                        pet.message = "ここを開拓するぞ！"; pet.messageTimer = 120;
                    } else if (act === 'explore') {
                        let target = exploreTargets[Math.floor(Math.random() * exploreTargets.length)];
                        pet.indoorTarget = target;
                        pet.setDestination(target.dx + 25, target.dy + 25); pet.actionState = 'moving_to_enter';
                        pet.schedule.push({ type: 'explore', duration: 150, maxDuration: 150 });
                        pet.message = "探検だ！"; pet.messageTimer = 120;
                    } else {
                        pet.setDestination(pet.x + (Math.random() - 0.5) * 100, pet.y + (Math.random() - 0.5) * 100); pet.actionState = 'moving';
                        let type = act === 'eat' ? 'eating' : 'sleeping';
                        pet.schedule.push({ type: type, duration: 100, maxDuration: 100 });
                    }
                }
            }

            if ((pet.actionState === 'moving' || pet.actionState === 'moving_to_enter') && pet.schedule.length > 0) {
                let dist = Math.hypot(pet.x - pet.targetX, pet.y - pet.targetY);
                if (dist < 60 || (pet.pathQueue && pet.pathQueue.length === 0)) {
                    let taskType = pet.schedule[0].type;
                    if (taskType === 'fish') pet.actionState = 'fishing';
                    else if (taskType === 'farming_work') pet.actionState = 'farming_work';
                    else if (taskType === 'cook') { pet.actionState = 'camping'; pet.visualAction = 'cook'; pet.isIndoors = true; }
                    else if (taskType === 'smith') { pet.actionState = 'camping'; pet.visualAction = 'smith'; pet.isIndoors = true; }
                    else if (taskType === 'explore') { pet.actionState = 'inside'; pet.isIndoors = true; }
                    else if (taskType === 'build') { pet.actionState = 'building'; }
                    else if (taskType === 'eating') { pet.actionState = 'eating'; }
                    else if (taskType === 'sleeping') { pet.actionState = 'sleeping'; }
                }
            }

            if (pet.schedule.length > 0 && pet.actionState !== 'moving' && pet.actionState !== 'moving_to_enter') {
                let currentTask = pet.schedule[0];
                currentTask.duration -= 1;

                if (currentTask.duration <= 0) {
                    let t = currentTask.type;
                    
                    if (t === 'farming_work') {
                        let a = mapAssets[currentTask.targetId]; 
                        if (a && a.type === 'farm') {
                            if (a.isDead || a.isEaten) { a.plantedCrop = null; a.growth = 0; a.isDead = false; a.isEaten = false; }
                            else if (!a.plantedCrop) {
                                a.plantedCrop = 'carrot'; 
                                let seeds = pet.inventory.filter(i => i.startsWith('seed_'));
                                if (seeds.length > 0) {
                                    let seed = seeds[0];
                                    pet.inventory.splice(pet.inventory.indexOf(seed), 1);
                                    if(seed === 'seed_pepper') a.plantedCrop = 'pepper';
                                    if(seed === 'seed_tomato') a.plantedCrop = 'tomato';
                                }
                                a.growth = 0; a.waterLevel = 100;
                            }
                            else if (a.growth >= 100) {
                                let crop = a.plantedCrop;
                                if (Math.random() < 0.3) crop = 'high_' + crop;
                                pet.inventory.push(crop);
                                a.plantedCrop = null; a.growth = 0;
                            }
                            else { a.waterLevel = 100; a.pestState = false; }
                        }
                    } 
                    else if (t === 'build' && currentTask.buildKey) {
                        let bKey = currentTask.buildKey; let bd = buildingCatalog[bKey];
                        if (bd) {
                            if (bd.materials) {
                                for (let mKey in bd.materials) {
                                    for(let i=0; i<bd.materials[mKey]; i++) {
                                        let idx = pet.inventory.indexOf(mKey);
                                        if (idx !== -1) pet.inventory.splice(idx, 1);
                                    }
                                }
                            }
                            let uid = bKey + '_' + Date.now();
                            mapAssets[uid] = {
                                img: catalog[bKey].img || 'field', sx: catalog[bKey].sx, sy: catalog[bKey].sy, sw: catalog[bKey].sw, sh: catalog[bKey].sh,
                                dx: pet.x, dy: pet.y, scale: catalog[bKey].scale || 0.5, type: bKey, name: bd.name
                            };
                        }
                    }
                    else if (t === 'fish') { pet.inventory.push(['fish_sardine', 'fish_squid', 'fish_tuna', 'trash_boot'][Math.floor(Math.random() * 4)]); }
                    else if (t === 'cook') { 
                        let ing = pet.inventory.findIndex(i => ['carrot', 'tomato', 'pepper', 'fish_sardine'].includes(i));
                        if (ing !== -1) pet.inventory.splice(ing, 1);
                        pet.inventory.push('dish_salad'); 
                    }
                    else if (t === 'smith') { 
                        let iron = pet.inventory.indexOf('iron');
                        if (iron !== -1) pet.inventory.splice(iron, 1);
                        pet.inventory.push('eq_sword'); 
                    }
                    else if (t === 'explore') { pet.inventory.push(['stone', 'wood', 'iron', 'seed_carrot', 'coin'][Math.floor(Math.random() * 5)]); }

                    pet.schedule.shift(); pet.actionState = 'idle'; pet.visualAction = null; pet.isIndoors = false;
                    pet.interactionTarget = null; pet.indoorTarget = null; pet.message = "";
                }
            }

            if (pet.actionState === 'farming_work') pet.exploreTimer = 0; 
            if (typeof pet.update === 'function') pet.update(); 
            if (pet.message && (pet.message.includes('UP') || pet.message.includes('アップ') || pet.message.includes('回復') || pet.message.includes('上がった'))) pet.message = "♪"; 

            if (pet.baseSkills) pet.skills = JSON.parse(JSON.stringify(pet.baseSkills));
            if (pet.baseFixedStats) pet.stats = JSON.parse(JSON.stringify(pet.baseFixedStats));
            pet.energy = 100; pet.hunger = 100; 
            if (typeof pet.darknessCounter !== 'undefined') pet.darknessCounter = 0; 

        } catch(e) { console.error("[Grazing] AI Update Error:", e); } finally { aiPet = mainPetBackup; window.aiPet = mainPetBackup; }
    });
    window.isGrazingUpdate = false; 
};

window.getGrazingCameraTarget = function() {
    const activeMap = grazingData.maps[currentGrazingMapId];
    if (activeMap && activeMap.pets.length > 0) {
        if (grazingCameraIndex >= activeMap.pets.length) grazingCameraIndex = 0;
        return activeMap.pets[grazingCameraIndex];
    }
    return { x: 400, y: 240 };
};

window.startGrazingMode = function(mapId) {
    backupMainAssets = JSON.parse(JSON.stringify(assets));
    currentGrazingMapId = mapId;
    const activeMap = grazingData.maps[mapId];
    assets = activeMap.assets; 

    const now = Date.now();
    if (activeMap.lastOfflineTime && activeMap.pets && activeMap.pets.length > 0) {
        let offlineSeconds = Math.floor((now - activeMap.lastOfflineTime) / 1000);
        if (offlineSeconds > 60) {
            let cycles = Math.floor(offlineSeconds / 60); 
            if (cycles > 120) cycles = 120; 
            
            let lootCount = 0;
            activeMap.pets.forEach(pet => {
                for(let i=0; i<cycles; i++) {
                    if (Math.random() < 0.25) { 
                        let lootTable = ['stone', 'wood', 'iron', 'carrot', 'fish_sardine', 'coin', 'seed_carrot'];
                        pet.inventory.push(lootTable[Math.floor(Math.random() * lootTable.length)]);
                        lootCount++;
                    }
                }
            });
            if (lootCount > 0) {
                alert(`【放置ボーナス】\n本編を遊んでいる間（またはオフラインの間）に、\n放牧AIたちが ${lootCount} 個のアイテムを拾い集めておいてくれました！\n\n※ 右上の「アイテム一括回収」から本編へ持ち帰れます`);
            }
        }
    }
    activeMap.lastOfflineTime = now; 

    if(typeof closePokedex === 'function') closePokedex();
    switchMode('grazing');
    const sidePanel = document.getElementById('side-panel');
    if (sidePanel) sidePanel.style.display = 'none';
    showGrazingUI();
};

function showGrazingUI() {
    let ui = document.getElementById('grazing-view-ui');
    if (!ui) {
        ui = document.createElement('div'); ui.id = 'grazing-view-ui';
        ui.style.position = 'fixed'; ui.style.top = '10px'; ui.style.right = '10px'; ui.style.zIndex = '10000';
        document.body.appendChild(ui);
    }
    ui.innerHTML = `
        <div style="background: rgba(0,0,0,0.8); padding: 15px; border-radius: 8px; color: white; border: 2px solid #4CAF50; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            <h3 style="margin:0 0 10px 0; color: #4CAF50; font-size: 16px;">🌿 放牧マップ ${currentGrazingMapId + 1}</h3>
            <button onclick="changeGrazingCamera()" style="width: 100%; margin-bottom: 8px; padding: 8px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">📷 カメラ切り替え (Target: ${grazingCameraIndex + 1})</button>
            <button onclick="collectGrazingItems()" style="width: 100%; margin-bottom: 8px; padding: 8px; background: #FF9800; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">🎁 アイテム一括回収</button>
            <button onclick="exitGrazingMode()" style="width: 100%; padding: 8px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">🔙 本編に戻る</button>
        </div>
    `;
    ui.style.display = 'block';
}

window.collectGrazingItems = function() {
    const activeMap = grazingData.maps[currentGrazingMapId];
    if (!activeMap || !activeMap.pets || activeMap.pets.length === 0) return;

    let collectedItems = {};
    let totalCount = 0;

    activeMap.pets.forEach(pet => {
        let newInventory = [];
        pet.inventory.forEach(item => {
            if (item.startsWith('rod_')) {
                newInventory.push(item);
            } else {
                aiPet.inventory.push(item);
                collectedItems[item] = (collectedItems[item] || 0) + 1;
                totalCount++;
            }
        });
        
        if (!newInventory.some(i => i.startsWith('seed_'))) newInventory.push('seed_carrot');
        pet.inventory = newInventory;
    });

    if (totalCount > 0) {
        let msg = `🎁 放牧AIたちが集めたアイテム（計 ${totalCount}個）を本編に回収しました！\n\n`;
        for (let k in collectedItems) {
            let itemName = k;
            if (typeof itemCatalog !== 'undefined' && itemCatalog[k]) itemName = itemCatalog[k].name;
            else if (typeof catalog !== 'undefined' && catalog[k]) itemName = catalog[k].name;
            msg += `・${itemName} × ${collectedItems[k]}\n`;
        }
        alert(msg);
        window.isGrazingUpdate = false; if (typeof originalSaveGameData === 'function') originalSaveGameData(); window.isGrazingUpdate = true;
    } else {
        alert("回収できるアイテムがまだありません。\nもう少し作業を待ってみましょう！");
    }
};

window.changeGrazingCamera = function() {
    const activeMap = grazingData.maps[currentGrazingMapId];
    if (activeMap) { grazingCameraIndex = (grazingCameraIndex + 1) % activeMap.pets.length; showGrazingUI(); }
};

window.exitGrazingMode = function() {
    const activeMap = grazingData.maps[currentGrazingMapId];
    if (activeMap) activeMap.lastOfflineTime = Date.now(); 

    assets = backupMainAssets; backupMainAssets = null;
    const ui = document.getElementById('grazing-view-ui'); if (ui) ui.style.display = 'none';
    const sidePanel = document.getElementById('side-panel'); if (sidePanel) sidePanel.style.display = ''; 
    window.isGrazingUpdate = false; if (typeof originalSaveGameData === 'function') originalSaveGameData();
    switchMode('play');
};

function startGrazingEditor(mapId, skinKey) {
    backupMainAssets = JSON.parse(JSON.stringify(assets)); currentGrazingMapId = mapId;
    if (Object.keys(grazingData.maps[mapId].assets).length === 0) assets = generateBlankGrazingMap(); else assets = grazingData.maps[mapId].assets;
    if(typeof closePokedex === 'function') closePokedex();
    switchMode('grazing_editor'); showGrazingEditorUI();
    alert(`【放牧マップ ${mapId+1} エディタ】\n発見済みの施設を配置してください。\n完了したら「保存して放牧を開始する」ボタンを押してください。`);
}

function showGrazingEditorUI() {
    let ui = document.getElementById('grazing-editor-ui');
    if (!ui) {
        ui = document.createElement('div'); ui.id = 'grazing-editor-ui';
        ui.style.position = 'fixed'; ui.style.top = '20px'; ui.style.left = '50%'; ui.style.transform = 'translateX(-50%)'; ui.style.zIndex = '10000';
        ui.innerHTML = `<button onclick="finishGrazingEditor()" style="padding: 15px 30px; font-size: 18px; font-weight: bold; background: #FF9800; color: white; border: 2px solid white; border-radius: 8px; cursor: pointer;">💾 マップを保存して放牧を開始する</button>`;
        document.body.appendChild(ui);
    }
    ui.style.display = 'block';
}

window.finishGrazingEditor = function() {
    grazingData.maps[currentGrazingMapId].assets = JSON.parse(JSON.stringify(assets));
    grazingData.maps[currentGrazingMapId].isInitialized = true;
    assets = backupMainAssets; backupMainAssets = null;
    window.isGrazingUpdate = false; if (typeof originalSaveGameData === 'function') originalSaveGameData();
    const ui = document.getElementById('grazing-editor-ui'); if (ui) ui.style.display = 'none';
    switchMode('play'); alert("放牧マップの作成が完了しました！");
};

function generateBlankGrazingMap() {
    const newAssets = {};
    for (let r = 0; r < 22; r++) {
        for (let c = 0; c < 18; c++) {
            let dx = c * 50 - 25; let dy = r * 25 - 25; if (r % 2 === 1) dx += 25;
            newAssets["bg_" + r + "_" + c] = { img: 'terrain', sx: 77, sy: 88, sw: 585, sh: 585, dx: dx, dy: dy, scale: 0.1, type: 'ground', name: 'grass1' };
        }
    }
    return newAssets;
}