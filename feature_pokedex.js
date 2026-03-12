// feature_pokedex.js : モンスター図鑑機能 (Added Farming Translations)

var pokedexState = { 
    active: false, 
    selectedSkin: null, 
    action: 'idle', 
    frame: 0, 
    tick: 0,
    animId: null
};

const actionNameMap = {
    ja: {
        idle: "待機", move: "移動", study: "勉強", train: "筋トレ", sleep: "睡眠",
        eat_dish: "食事", eat_raw: "つまみ食い", fish: "釣り", cook: "料理", smith: "鍛冶",
        explore: "探検", farm_plow: "耕す", farm_seed: "種まき", farm_water: "水やり", farm_pest: "退治", farm_harvest: "収穫"
    },
    en: {
        idle: "Idle", move: "Move", study: "Study", train: "Train", sleep: "Sleep",
        eat_dish: "Eat", eat_raw: "Snack", fish: "Fish", cook: "Cook", smith: "Smith",
        explore: "Explore", farm_plow: "Plow", farm_seed: "Seed", farm_water: "Water", farm_pest: "Pest", farm_harvest: "Harvest"
    }
};

function getLocalizedActionName(actionKey) {
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'ja';
    const map = actionNameMap[lang] || actionNameMap['ja'];
    return map[actionKey] || actionKey;
}

function openPokedex() {
    const el = document.getElementById('pokedexOverlay');
    if (!el) return;
    
    el.classList.add('active');
    pokedexState.active = true;
    
    updateDiscoveryCount();
    renderPokedexList();

    if (!pokedexState.selectedSkin && aiPet.discoveredMonsters && aiPet.discoveredMonsters.length > 0) {
        selectMonster(aiPet.discoveredMonsters[aiPet.discoveredMonsters.length - 1]);
    } else if (pokedexState.selectedSkin) {
        if (aiPet.discoveredMonsters.includes(pokedexState.selectedSkin)) {
            selectMonster(pokedexState.selectedSkin);
        } else if (aiPet.discoveredMonsters.length > 0) {
            selectMonster(aiPet.discoveredMonsters[0]);
        }
    }

    if (!pokedexState.animId) {
        pokedexLoop();
    }
}

function closePokedex() {
    const el = document.getElementById('pokedexOverlay');
    if (el) el.classList.remove('active');
    pokedexState.active = false;
    if (pokedexState.animId) {
        cancelAnimationFrame(pokedexState.animId);
        pokedexState.animId = null;
    }
}

function updateDiscoveryCount() {
    if (!aiPet.discoveredMonsters) aiPet.discoveredMonsters = [];
    const uniqueFound = [...new Set(aiPet.discoveredMonsters)];
    const count = uniqueFound.length;
    const countEl = document.getElementById('pokedexCount');
    if (countEl) countEl.innerText = `発見数: ${count}種`;
}

function renderPokedexList() {
    const listEl = document.getElementById('dex-list');
    if (!listEl) return;
    
    listEl.innerHTML = "";
    const iconSize = 50;

    for (let key in monsterBookData) {
        if (!aiPet.discoveredMonsters.includes(key)) continue;
        
        const btn = document.createElement('div');
        btn.style.width = iconSize + "px";
        btn.style.height = iconSize + "px";
        btn.style.flexShrink = "0";
        btn.style.border = "2px solid #444";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.position = "relative";
        btn.style.background = "#222";
        btn.style.display = "flex";
        btn.style.justifyContent = "center";
        btn.style.alignItems = "center";
        
        if (pokedexState.selectedSkin === key) {
            btn.style.borderColor = "#FFD700";
            btn.style.background = "#333";
        } else {
            btn.style.borderColor = "#4CAF50";
        }

        const iconCanvas = document.createElement('canvas');
        iconCanvas.width = iconSize - 4;
        iconCanvas.height = iconSize - 4;
        
        drawIconOnCanvas(iconCanvas, key);
        
        btn.appendChild(iconCanvas);
        btn.onclick = () => {
            selectMonster(key);
            renderPokedexList(); 
        };
        
        listEl.appendChild(btn);
    }
}

// ★修正: アニメーション設定が欠損しないように大元のJSONへ動的リンクさせる
function drawIconOnCanvas(canvas, type) {
    const ctx = canvas.getContext('2d');
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

    const scale = Math.min(canvas.width / f.sw, canvas.height / f.sh);
    const drawW = f.sw * scale;
    const drawH = f.sh * scale;
    const dx = (canvas.width - drawW) / 2;
    const dy = (canvas.height - drawH) / 2;

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, f.sx, f.sy, f.sw, f.sh, dx, dy, drawW, drawH);
}

function selectMonster(key) {
    pokedexState.selectedSkin = key;
    pokedexState.action = 'idle';
    pokedexState.frame = 0;

    const data = monsterBookData[key];
    const nameEl = document.getElementById('dex-name');
    const descEl = document.getElementById('dex-desc');
    const unknownEl = document.getElementById('dex-unknown');
    const canvasEl = document.getElementById('dexCanvas');
    const actionListEl = document.getElementById('dex-actions');

    if (!data) return;

    if (nameEl) nameEl.innerText = data.name;
    if (descEl) descEl.innerText = data.desc;
    if (unknownEl) unknownEl.style.display = 'none';
    if (canvasEl) canvasEl.style.display = 'block';

    if (actionListEl) {
        actionListEl.innerHTML = "";
        let conf = aiConfigs[key];
        // ★追加: 描画時と同様にアクションリストも大元の設定から引っ張る
        if (conf && conf.img && aiConfigs[conf.img] && aiConfigs[conf.img].actions) {
            conf = aiConfigs[conf.img];
        }
        
        if (conf && conf.actions) {
            Object.keys(conf.actions).forEach(act => {
                const btn = document.createElement('span');
                btn.innerText = getLocalizedActionName(act);
                btn.style.display = "inline-block";
                btn.style.padding = "4px 10px";
                btn.style.fontSize = "11px";
                btn.style.background = (pokedexState.action === act) ? "#FFC107" : "#444";
                btn.style.color = (pokedexState.action === act) ? "#000" : "#fff";
                btn.style.borderRadius = "15px";
                btn.style.cursor = "pointer";
                btn.style.margin = "2px 4px 2px 0";
                btn.style.transition = "0.2s";
                
                btn.onmouseover = () => { if(pokedexState.action !== act) btn.style.background = "#555"; };
                btn.onmouseout = () => { if(pokedexState.action !== act) btn.style.background = "#444"; };
                
                btn.onclick = () => {
                    pokedexState.action = act;
                    pokedexState.frame = 0;
                    Array.from(actionListEl.children).forEach(c => {
                        c.style.background = "#444"; c.style.color = "#fff";
                    });
                    btn.style.background = "#FFC107"; btn.style.color = "#000";
                };
                actionListEl.appendChild(btn);
            });
        }
    }

    // --- ここから放牧ボタンの追加処理 ---
    let grazeBtnContainer = document.getElementById('dex-graze-container');
    if (!grazeBtnContainer) {
        grazeBtnContainer = document.createElement('div');
        grazeBtnContainer.id = 'dex-graze-container';
        grazeBtnContainer.style.marginTop = "15px";
        actionListEl.parentNode.appendChild(grazeBtnContainer);
    }

    const discCount = (aiPet.discoveredMonsters && aiPet.discoveredMonsters.length) ? aiPet.discoveredMonsters.length : 0;
    const canGraze = (discCount >= 2);
    
    // 現在育成中のキャラクターか判定
    const isCurrentlyActive = (key === aiPet.currentSkin);
    
    // 既にいずれかのマップに配置済みか判定
    let alreadyGrazingMapId = -1;
    if (typeof grazingData !== 'undefined' && grazingData.maps) {
        for (let i = 0; i < grazingData.maps.length; i++) {
            if (grazingData.maps[i].pets && grazingData.maps[i].pets.some(p => p.currentSkin === key)) {
                alreadyGrazingMapId = i + 1;
                break;
            }
        }
    }

    if (!canGraze) {
        grazeBtnContainer.innerHTML = `
            <div style="padding: 10px; background: #333; color: #777; border-radius: 5px; font-size: 12px; text-align: center;">
                🔒 放牧マップ解放まで... あと ${2 - discCount} 種類発見が必要
            </div>
        `;
    } else if (isCurrentlyActive) {
        grazeBtnContainer.innerHTML = `
            <div style="padding: 10px; background: #ff9800; color: white; border-radius: 5px; font-size: 14px; text-align: center; font-weight: bold;">
                🚫 現在育成中のため放牧不可
            </div>
            <div style="font-size: 10px; color: #aaa; margin-top: 5px; text-align: center;">別の姿に進化・転生すると配置できるようになります</div>
        `;
    } else if (alreadyGrazingMapId !== -1) {
        // ==========================================
        // ★修正: 配置済みの場合は、そのマップへ「見に行く」ボタンに変更！
        // ==========================================
        grazeBtnContainer.innerHTML = `
            <button id="btn-graze-enter" style="width: 100%; padding: 10px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                👀 放牧マップ ${alreadyGrazingMapId} を見に行く
            </button>
        `;
        document.getElementById('btn-graze-enter').onclick = () => {
            if (typeof startGrazingMode === 'function') {
                startGrazingMode(alreadyGrazingMapId - 1); // 内部IDは0始まりのため-1
            }
        };
    } else {
        grazeBtnContainer.innerHTML = `
            <button id="btn-graze" style="width: 100%; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                🌿 このキャラクターを放牧する
            </button>
        `;
        document.getElementById('btn-graze').onclick = () => {
            if(typeof openGrazingMapSelect === 'function') {
                openGrazingMapSelect(key);
            }
        };
    }
}

function pokedexLoop() {
    if (!pokedexState.active) return;
    
    const dexCanvas = document.getElementById('dexCanvas');
    if (dexCanvas && pokedexState.selectedSkin) {
        const dexCtx = dexCanvas.getContext('2d');
        
        pokedexState.tick++;
        if (pokedexState.tick % 15 === 0) {
            pokedexState.frame = (pokedexState.frame + 1) % 3; 
        }

        dexCtx.fillStyle = '#111'; 
        dexCtx.fillRect(0, 0, dexCanvas.width, dexCanvas.height);
        
        dexCtx.strokeStyle = '#222';
        dexCtx.lineWidth = 1;
        dexCtx.beginPath();
        dexCtx.moveTo(0, dexCanvas.height/2); dexCtx.lineTo(dexCanvas.width, dexCanvas.height/2);
        dexCtx.moveTo(dexCanvas.width/2, 0); dexCtx.lineTo(dexCanvas.width/2, dexCanvas.height);
        dexCtx.stroke();

        drawPokedexSpriteInternal(dexCtx, pokedexState.selectedSkin, pokedexState.action, pokedexState.frame, dexCanvas.width/2, dexCanvas.height/2);
    }

    pokedexState.animId = requestAnimationFrame(pokedexLoop);
}

// ★究極修正：余計なごまかしを排除し、正しいアクション画像をストレートに適用する！
function drawPokedexSpriteInternal(ctx, type, action, frameIdx, cx, cy) {
    let conf = aiConfigs[type];
    if (!conf) return;

    if (conf.img && aiConfigs[conf.img] && aiConfigs[conf.img].actions) {
        conf = aiConfigs[conf.img];
    }

    // 1. 描画すべき画像のキー（ファイル名のもと）を決定
    let imgKey = conf.img || type;
    if (conf.actionImages && conf.actionImages[action]) {
        imgKey = conf.actionImages[action];
    }

    // 2. 画像オブジェクトを取得
    let img = images[imgKey];

    // 3. 画像がまだ読み込まれていない場合は、カタログからロードを開始する
    if (!img) {
        if (typeof window.dynamicImageCatalog !== 'undefined' && window.dynamicImageCatalog[imgKey]) {
            images[imgKey] = new Image();
            // ★修正：平置きなので、ファイル名をそのままsrcに入れる！
            images[imgKey].src = window.dynamicImageCatalog[imgKey];
        }
        // ★ロード中なので、今回は何も描画せずに待つ！
        return; 
    }

    // 4. ロードは開始したが、通信中でまだ完了していない場合も待つ
    if (!img.complete || img.naturalWidth === 0) return;

    // 5. ロード完了！あなたが設定した完璧な座標データで切り取って描画する
    const actionData = conf.actions[action] || conf.actions['idle'];
    if (!actionData) return;
    
    const f = actionData[frameIdx % actionData.length];
    
    const targetSize = 200; 
    let scaleW = targetSize / f.sw;
    let scaleH = targetSize / f.sh;
    let scale = Math.min(scaleW, scaleH);
    if (scale > 1.5) scale = 1.5;

    const drawW = f.sw * scale;
    const drawH = f.sh * scale;

    ctx.save();
    ctx.imageSmoothingEnabled = false; 
    ctx.translate(cx, cy);
    ctx.drawImage(img, f.sx, f.sy, f.sw, f.sh, -drawW/2, -drawH/2, drawW, drawH);
    ctx.restore();
}