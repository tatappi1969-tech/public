// feature_pokedex.js : モンスター図鑑機能 (Added Farming Translations)

// ==========================================
// 📖 進化ツリー型：図鑑リストの2段階レイアウト対応
// ==========================================

// ★追加：selectedBase (現在選択中の基本種) を状態として保持する
var pokedexState = { 
    active: false, 
    selectedSkin: null, 
    selectedBase: null, // ←追加
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

// ==========================================
// 📖 修正版：図鑑UIの展開（レイアウト崩れ完全解消パッチ）
// ==========================================
function openPokedex() {
    const el = document.getElementById('pokedexOverlay');
    if (!el) return;
    
    // ヘッダー部分のレイアウト調整
    const header = el.querySelector('.overlay-header');
    if (header) {
        header.style.display = "flex";
        header.style.justifyContent = "space-between";
        header.style.alignItems = "center";
        header.style.padding = "10px 20px";
        
        const title = header.querySelector('h2');
        if (title) {
            title.style.margin = "0";
            title.style.flex = "1";
            title.style.textAlign = "left";
        }
        
        const countEl = document.getElementById('pokedexCount');
        if (countEl) {
            countEl.style.fontSize = "16px";
            countEl.style.fontWeight = "bold";
            countEl.style.color = "#FFD700";
            countEl.style.marginRight = "15px";
            countEl.style.whiteSpace = "nowrap"; 
        }
    }

    // ★究極修正1：モーダル（枠）自体の「高さ固定縛り」を解除して、中身に合わせて広がるようにする！
    const content = el.querySelector('.overlay-content') || el.firstElementChild;
    if (content) {
        content.style.width = "90vw"; 
        content.style.maxWidth = "900px";
        content.style.height = "auto"; // ←コレが一番重要（固定高さをやめる）
        content.style.maxHeight = "95vh"; 
        content.style.display = "flex";
        content.style.flexDirection = "column";
        content.style.paddingBottom = "20px"; // 下の余白を確保
    }

    // ★究極修正2：上部（キャンバス＋説明文）のエリアが潰されないように保護する
    const listEl = document.getElementById('dex-list');
    if (listEl && listEl.previousElementSibling) {
        const topSection = listEl.previousElementSibling;
        topSection.style.flexShrink = "0"; // 縮小を禁止
        topSection.style.minHeight = "350px"; // 最低限の高さを確保
        topSection.style.marginBottom = "15px"; 
    }

    el.classList.add('active');
    pokedexState.active = true;
    
    updateDiscoveryCount();

    if (!pokedexState.selectedSkin && aiPet.discoveredMonsters && aiPet.discoveredMonsters.length > 0) {
        selectMonster(aiPet.discoveredMonsters[aiPet.discoveredMonsters.length - 1]);
    } else if (pokedexState.selectedSkin) {
        if (aiPet.discoveredMonsters.includes(pokedexState.selectedSkin)) {
            selectMonster(pokedexState.selectedSkin);
        } else if (aiPet.discoveredMonsters.length > 0) {
            selectMonster(aiPet.discoveredMonsters[0]);
        }
    }
    
    if (pokedexState.selectedSkin) {
        pokedexState.selectedBase = pokedexState.selectedSkin.split('_')[0];
    }

    renderPokedexList();

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

// ==========================================
// 📖 修正版：下部リスト（2段階ツリー型表示）
// ==========================================
function renderPokedexList() {
    const listEl = document.getElementById('dex-list');
    if (!listEl) return;
    
    // ★究極修正3：リストが絶対配置（absolute）で浮いて重ならないように relative に固定する
    listEl.style.position = "relative"; 
    listEl.style.bottom = "auto";
    listEl.style.display = "flex";
    listEl.style.flexDirection = "column";
    listEl.style.gap = "10px";
    listEl.style.padding = "15px";
    listEl.style.overflowY = "visible"; // 内部スクロールは不要（枠全体が広がるため）
    listEl.style.flexShrink = "0"; 
    listEl.style.height = "auto"; // 高さを中身に合わせる
    listEl.style.background = "#1a1a1a"; 
    listEl.style.borderRadius = "8px";
    listEl.style.border = "1px solid #333";

    listEl.innerHTML = "";

    const allBases = ["robot", "spirit", "magician", "bird", "machine", "stone", "balloon", "ghost", "beetle", "seed", "dragon"];
    if (!aiPet.discoveredMonsters || aiPet.discoveredMonsters.length === 0) aiPet.discoveredMonsters = ['robot'];
    
    let discoveredBases = [...new Set(aiPet.discoveredMonsters.map(k => k.split('_')[0]))];
    discoveredBases.sort((a,b) => allBases.indexOf(a) - allBases.indexOf(b)); 

    if (!pokedexState.selectedBase || !discoveredBases.includes(pokedexState.selectedBase)) {
        pokedexState.selectedBase = pokedexState.selectedSkin ? pokedexState.selectedSkin.split('_')[0] : discoveredBases[0];
    }

    // 上段：基本種のタブ領域
    const baseTabs = document.createElement('div');
    baseTabs.style.display = "flex";
    baseTabs.style.flexWrap = "wrap"; 
    baseTabs.style.justifyContent = "center";
    baseTabs.style.gap = "8px";
    baseTabs.style.borderBottom = "2px dashed #444";
    baseTabs.style.paddingBottom = "15px";

    const baseIconSize = 46; 

    discoveredBases.forEach(base => {
        const btn = document.createElement('div');
        btn.style.width = baseIconSize + "px";
        btn.style.height = baseIconSize + "px";
        btn.style.flexShrink = "0";
        btn.style.border = "2px solid #444";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.position = "relative";
        btn.style.background = "#222";
        btn.style.display = "flex";
        btn.style.justifyContent = "center";
        btn.style.alignItems = "center";
        btn.style.transition = "transform 0.1s, border-color 0.1s, background 0.1s";
        
        btn.onmouseover = () => { btn.style.transform = "scale(1.1)"; };
        btn.onmouseout = () => { btn.style.transform = "scale(1)"; };

        if (pokedexState.selectedBase === base) {
            btn.style.borderColor = "#FF9800"; 
            btn.style.background = "#4e342e";
            btn.style.boxShadow = "0 0 10px rgba(255,152,0,0.6)";
        } else {
            btn.style.borderColor = "#555";
        }

        const iconCanvas = document.createElement('canvas');
        iconCanvas.width = baseIconSize - 4;
        iconCanvas.height = baseIconSize - 4;
        drawIconOnCanvas(iconCanvas, base); 
        
        btn.appendChild(iconCanvas);
        btn.onclick = () => {
            pokedexState.selectedBase = base;
            let variants = aiPet.discoveredMonsters.filter(k => k.split('_')[0] === base);
            if (variants.length > 0) {
                selectMonster(variants[0]);
            }
            renderPokedexList(); 
        };
        baseTabs.appendChild(btn);
    });

    listEl.appendChild(baseTabs);

    // 下段：派生種一覧領域
    const variantList = document.createElement('div');
    variantList.style.display = "flex";
    variantList.style.flexWrap = "wrap"; 
    variantList.style.justifyContent = "center";
    variantList.style.gap = "12px";
    variantList.style.paddingTop = "5px";
    
    const variantIconSize = 54;

    let currentVariants = aiPet.discoveredMonsters.filter(k => k.split('_')[0] === pokedexState.selectedBase);
    
    currentVariants.forEach(key => {
        const btn = document.createElement('div');
        btn.style.width = variantIconSize + "px";
        btn.style.height = variantIconSize + "px";
        btn.style.flexShrink = "0";
        btn.style.border = "2px solid #444";
        btn.style.borderRadius = "8px";
        btn.style.cursor = "pointer";
        btn.style.position = "relative";
        btn.style.background = "#222";
        btn.style.display = "flex";
        btn.style.justifyContent = "center";
        btn.style.alignItems = "center";
        btn.style.transition = "transform 0.1s, border-color 0.1s";
        
        btn.onmouseover = () => { btn.style.transform = "scale(1.1)"; };
        btn.onmouseout = () => { btn.style.transform = "scale(1)"; };
        
        if (pokedexState.selectedSkin === key) {
            btn.style.borderColor = "#FFD700"; 
            btn.style.background = "#333";
            btn.style.boxShadow = "0 0 10px rgba(255,215,0,0.5)";
        } else {
            btn.style.borderColor = "#4CAF50"; 
        }

        const iconCanvas = document.createElement('canvas');
        iconCanvas.width = variantIconSize - 4;
        iconCanvas.height = variantIconSize - 4;
        drawIconOnCanvas(iconCanvas, key);
        
        btn.appendChild(iconCanvas);
        btn.onclick = () => {
            selectMonster(key);
            renderPokedexList(); 
        };
        variantList.appendChild(btn);
    });

    listEl.appendChild(variantList);
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