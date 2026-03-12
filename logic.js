// logic.js : ゲームのロジック（AIの行動、セーブ、オフライン経過など）

// カタログの読み込み
let catalog;
try {
    let savedCatalog = JSON.parse(localStorage.getItem('map_catalog_v1'));
    if (savedCatalog) {
        catalog = savedCatalog;
        
        // defaultCatalog (data.js) にある項目は、強制的に最新データで上書きする
        for (let key in defaultCatalog) {
            catalog[key] = JSON.parse(JSON.stringify(defaultCatalog[key]));
        }
        
    } else { 
        catalog = JSON.parse(JSON.stringify(defaultCatalog)); 
    }
} catch(e) { 
    catalog = JSON.parse(JSON.stringify(defaultCatalog)); 
}

// 自然マップ生成関数
function generateNatureMap() {
    const newAssets = {};
    const canvasWidth = 800;
    const canvasHeight = 480;

    // --- 設定値 ---
    const stepX = 50;        // 横の移動量
    const stepY = 25;        // 縦の移動量
    const oddOffsetX = 25;   // 奇数行のズレ

    // ループ回数の計算
    const rows = Math.ceil(canvasHeight / stepY) + 2;
    const cols = Math.ceil(canvasWidth / stepX) + 2;

    const useScale = 0.1;

    // 1. 地面レイヤー (交互配置)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let dx = c * stepX;
            let dy = r * stepY;
            if (r % 2 === 1) { dx += oddOffsetX; }
            dx -= 25; dy -= 25;

            const uid = "bg_" + r + "_" + c;
            const grassType = ['grass1', 'grass2', 'grass3'][Math.floor(Math.random() * 3)];
            const data = catalog[grassType] || defaultCatalog[grassType];
            
            newAssets[uid] = {
                img: data.img, sx: data.sx, sy: data.sy, sw: data.sw, sh: data.sh,
                dx: dx, dy: dy, scale: useScale, type: 'ground', name: data.name, flip: false
            };
        }
    }
    
    // 2. 川の生成
    for (let c = 0; c < cols; c++) {
        const r = 8; 
        let dx = c * stepX;
        let dy = r * stepY;
        if (r % 2 === 1) dx += oddOffsetX;
        dx -= 25; dy -= 25;

        const uid = "bg_" + r + "_" + c;
        const waterType = 'water1';
        const data = catalog[waterType] || defaultCatalog[waterType];
        
        newAssets[uid] = {
            img: data.img, sx: data.sx, sy: data.sy, sw: data.sw, sh: data.sh,
            dx: dx, dy: dy, scale: useScale, type: 'water', name: data.name, flip: false
        };
    }

    // 3. 自然オブジェクト
    const spawnConfig = { mountain: 4, palms: 6 };
    for (let typeKey in spawnConfig) {
        const count = spawnConfig[typeKey];
        const data = catalog[typeKey] || defaultCatalog[typeKey];
        if (!data) continue;

        for (let i = 0; i < count; i++) {
            const r = Math.floor(Math.random() * (rows - 4)) + 2;
            const c = Math.floor(Math.random() * (cols - 2)) + 1;
            if (r === 8) continue;

            const uid = typeKey + "_" + Date.now() + Math.random();
            let dx = c * stepX;
            let dy = r * stepY;
            if (r % 2 === 1) dx += oddOffsetX;
            dx -= 25 + (Math.random() * 20 - 10);
            dy -= 40; 

            newAssets[uid] = {
                img: data.img, sx: data.sx, sy: data.sy, sw: data.sw, sh: data.sh,
                dx: dx, dy: dy, scale: 0.5, 
                type: data.type || 'nature', name: data.name,
                resources: (facilityData[typeKey] ? 5 : -1), flip: false
            };
        }
    }
    return newAssets;
}

// 読み込み時にデータがなければ自然マップを生成
let assets = JSON.parse(localStorage.getItem('map_data_v6')) || generateNatureMap();

// --- 育成AIデータ ---
let savedPet = JSON.parse(localStorage.getItem('ai_pet_data_v1'));

const initBaseType = 'robot'; 
const initTrait = charaTraits[initBaseType]; 

let aiPet = savedPet || {
    x: 400, y: 240, targetX: 400, targetY: 240,
    baseType: initBaseType, currentSkin: initBaseType,
    generation: 1, age: 0, 
    lifespan: initTrait.lifespan, 
    visualAction: null, visualActionTimer: 0,
    skills: { cooking: 0, smithing: 0 },
    shopExp: 0, shopLevel: 1, shopBalance: 0,
    debugHour: -1,
    targetProject: "",
    castleRank: 1, questBoard: [], activeQuests: [], casinoCoins: 0,
    inventory: [], facilityProgress: {}, discoveredItems: {},
    gold: 0, exploreState: { depth: 0, maxDepth: 0, currentFacility: null },
    frameIndex: 1, frameStep: 1, tick: 0, exploreTimer: 0,
    stats: { intel: 10, power: 10, mood: 10 },
    energy: 100, hunger: 100,
    message: "", messageTimer: 0,
    schedule: [], lastSaveTime: Date.now(), flip: false
};

// 互換性チェック
if (typeof aiPet.visualAction === 'undefined') aiPet.visualAction = null;
if (typeof aiPet.visualActionTimer === 'undefined') aiPet.visualActionTimer = 0;
if (typeof aiPet.targetProject === 'undefined') aiPet.targetProject = "";
if (typeof aiPet.debugHour === 'undefined') aiPet.debugHour = -1;
if (typeof aiPet.castleRank === 'undefined') aiPet.castleRank = 1;
if (!aiPet.questBoard) aiPet.questBoard = [];
if (!aiPet.activeQuests) aiPet.activeQuests = [];
if (aiPet.activeQuest) { aiPet.activeQuests.push(aiPet.activeQuest); delete aiPet.activeQuest; aiPet.activeQuest = null; }
if (typeof aiPet.casinoCoins === 'undefined') aiPet.casinoCoins = 0;
if (!aiPet.skills) aiPet.skills = { cooking: 0, smithing: 0 };
if (typeof aiPet.shopExp === 'undefined') aiPet.shopExp = 0;
if (typeof aiPet.shopLevel === 'undefined') aiPet.shopLevel = 1;
if (typeof aiPet.shopBalance === 'undefined') aiPet.shopBalance = 0;
if (typeof aiPet.exploreTimer === 'undefined') aiPet.exploreTimer = 0;
if (!aiPet.inventory) aiPet.inventory = [];
if (!aiPet.exploreState) aiPet.exploreState = { depth: 0, maxDepth: 0, currentFacility: null };
if (typeof aiPet.gold === 'undefined') aiPet.gold = 0;
if (!aiPet.facilityProgress) aiPet.facilityProgress = {};
if (!aiPet.discoveredItems) aiPet.discoveredItems = {};
if (!aiPet.schedule) aiPet.schedule = [];
if (!aiPet.lastSaveTime) aiPet.lastSaveTime = Date.now();
if (typeof aiPet.flip === 'undefined') aiPet.flip = false;
if (typeof aiPet.energy === 'undefined') aiPet.energy = 100;
if (typeof aiPet.hunger === 'undefined') aiPet.hunger = 100;
if (typeof aiPet.weather === 'undefined') aiPet.weather = 'sunny';
if (typeof aiPet.weatherTimer === 'undefined') aiPet.weatherTimer = 0;
if (typeof aiPet.lifespan === 'undefined') {
    const trait = charaTraits[aiPet.baseType] || charaTraits['robot'];
    aiPet.lifespan = trait.lifespan || 100;
}

aiPet.idleTimer = 0; aiPet.actionState = 'idle'; 
aiPet.interactionTarget = null; aiPet.interactionTimer = 0; aiPet.visualScale = 1.0; 
aiPet.weather = 'sunny'; aiPet.weatherTimer = 0;

const weatherTypes = [
    { id: 'sunny',    name: '快晴', icon: '☀', effect: null },
    { id: 'cloudy',   name: '曇り', icon: '☁', effect: 'cloudy' },
    { id: 'rain',     name: '雨',   icon: '☔', effect: 'rain' },
    { id: 'thunder',  name: '雷',   icon: '⚡', effect: 'thunder' },
    { id: 'snow',     name: '雪',   icon: '⛄', effect: 'snow' },
    { id: 'hail',     name: 'あられ', icon: '🌨', effect: 'hail' },
    { id: 'clear',    name: '晴れ', icon: '🌤', effect: null }
];

aiPet.updateWeather = function() {
    this.weatherTimer++;
    if (this.weatherTimer > 1200) { 
        this.weatherTimer = 0;
        const r = Math.random();
        let next = 'clear';
        if (r < 0.4) next = 'clear'; else if (r < 0.6) next = 'sunny'; else if (r < 0.8) next = 'cloudy';
        else if (r < 0.9) next = 'rain'; else if (r < 0.95) next = 'snow'; else if (r < 0.98) next = 'thunder'; else next = 'hail';
        this.weather = next;
        if (next === 'rain' || next === 'thunder') this.message = "雨が降ってきた！";
        else if (next === 'snow') this.message = "雪だ！";
        else if (next === 'clear' && (this.weather === 'rain' || this.weather === 'thunder')) this.message = "雨が上がったね";
    }
    if (this.weather === 'rain' || this.weather === 'thunder') {
        for (let uid in assets) {
            const a = assets[uid];
            if (a.type === 'farm' && a.plantedCrop && a.growth < 100) a.growth += 0.05; 
        }
    }
};

function getTaskName(type) {
    if(type==='study') return "勉強"; if(type==='train') return "筋トレ"; if(type==='rest') return "睡眠"; 
    if(type==='explore') return "探検"; if(type==='eat') return "食事"; if(type==='project') return "計画実行";
    return type;
}

function getPersonalityType(stats) {
    const maxVal = Math.max(stats.intel, stats.power, stats.mood);
    if (maxVal <= 15) return 'average';
    if (stats.mood < 20) return 'gloom';
    if (stats.intel === maxVal) return 'scholar';
    if (stats.power === maxVal) return 'athlete';
    if (stats.mood === maxVal) return 'idol';
    return 'average';
}

function resetIdle() { aiPet.idleTimer = 0; if(aiPet.actionState === 'moving') aiPet.actionState = 'idle'; }

function saveGameData() {
    aiPet.lastSaveTime = Date.now();
    localStorage.setItem('map_catalog_v1', JSON.stringify(catalog));
    localStorage.setItem('ai_configs_v8', JSON.stringify(aiConfigs));
    localStorage.setItem('map_data_v6', JSON.stringify(assets));
    localStorage.setItem('ai_pet_data_v1', JSON.stringify(aiPet));
}

function getSmartDialogue(type, param) {
    const intel = aiPet.stats.intel;
    if (intel < 20) {
        if (type === 'move') return `てくてく... (${param}へ)`;
        if (type === 'item') return `あった！ (${param})`;
        if (type === 'no_item') return `ない... (${param})`;
        if (type === 'progress') return ["あるく！", "なにかいる...", "くらい...", "ごーごー！"][Math.floor(Math.random()*4)];
        if (type === 'danger') return `いたい！ (敵が強い)`;
        if (type === 'retreat') return `おうちかえる... (限界)`;
        if (type === 'clear') return `やったー！ (制覇)`;
        if (type === 'farm_plant') return `うめた！ (${param})`;
        if (type === 'farm_water') return `おおきくなあれ`;
        if (type === 'farm_harvest') return `とれた！ (${param})`;
        if (type === 'craft') return `できたー！ (${param})`;
    } else if (intel < 50) {
        if (type === 'move') return `${param}に行くよ！`;
        if (type === 'item') return `${param}を見つけた！`;
        if (type === 'no_item') return `${param}がないよ`;
        if (type === 'progress') return ["順調だよ", "奥に進むよ", "まだ行ける！"][Math.floor(Math.random()*3)];
        if (type === 'danger') return `敵が強い...逃げたい`;
        if (type === 'retreat') return `もう疲れた、帰ろう`;
        if (type === 'clear') return `一番奥まで着いたよ！`;
        if (type === 'farm_plant') return `${param}を植えたよ`;
        if (type === 'farm_water') return `お水あげるね`;
        if (type === 'farm_harvest') return `${param}を収穫したよ！`;
        if (type === 'craft') return `${param}を作ったよ！`;
    } else {
        if (type === 'move') return `${param}へ移動中...`;
        if (type === 'item') return `${param}を入手しました。`;
        if (type === 'no_item') return `${param}を所持していません。`;
        if (type === 'progress') return `地下${param}階: 探索継続中。`;
        if (type === 'danger') return `警告: 敵性存在と交戦中。`;
        if (type === 'retreat') return `リソース不足。帰還します。`;
        if (type === 'clear') return `最深部到達。任務完了。`;
        if (type === 'farm_plant') return `${param}の作付け完了。`;
        if (type === 'farm_water') return `育成作業を実行。`;
        if (type === 'farm_harvest') return `${param}を収穫しました。`;
        if (type === 'craft') return `${param}の作成に成功。`;
    }
    return param; 
}

function getActionEfficiency(type) {
    let multiplier = 0.3; let facilityName = "なし";
    let hasHouse = false; let hasStudy = false; let hasGym = false;
    for (let key in assets) {
        const t = assets[key].type;
        if (t === 'hut' || t === 'house' || t === 'castle') hasHouse = true;
        if (t === 'school' || t === 'library' || t === 'castle') hasStudy = true; 
        if (t === 'gym' || t === 'blacksmith' || t === 'castle') hasGym = true;
    }
    if (type === 'rest' || type === 'sleep') { if (hasHouse) { multiplier = 1.2; facilityName = "家"; } } 
    else if (type === 'study') { if (hasStudy) { multiplier = 1.0; facilityName = "書斎"; } else if (hasHouse) { multiplier = 0.6; facilityName = "家"; } } 
    else if (type === 'train') { if (hasGym) { multiplier = 1.0; facilityName = "ジム"; } else if (hasHouse) { multiplier = 0.6; facilityName = "家"; } } 
    else { multiplier = 1.0; }
    return { rate: multiplier, facility: facilityName };
}

aiPet.executeProject = function(taskTarget) {
    if (this.energy < 5 || this.hunger < 5) return "疲れすぎて動けない...";
    const targetKey = taskTarget; 
    if (targetKey && !buildingCatalog[targetKey]) return "目標設定エラー (データなし)";
    let mode = 'gather'; let bData = null;
    if (targetKey) {
        bData = buildingCatalog[targetKey];
        if (this.stats.intel < bData.reqIntel) return "知識不足(INTEL必要)...";
        let missing = null; const myItems = {};
        this.inventory.forEach(k => myItems[k] = (myItems[k] || 0) + 1);
        for (let mat in bData.materials) { if ((myItems[mat] || 0) < bData.materials[mat]) { missing = mat; break; } }
        if (!missing) mode = 'build';
    }
    if (mode === 'build') {
        const success = this.constructBuilding(targetKey);
        if (success) return `建設完了: ${bData.name}`;
        else { if (this.energy < bData.cost.energy) return "建設待機(体力不足)..."; return "建設場所がありません"; }
    } else {
        this.energy -= 2; this.hunger -= 2;
        if (Math.random() < (0.3 + this.stats.power * 0.01)) {
            const resources = [];
            for (let uid in assets) {
                const a = assets[uid]; if (typeof a.resources === 'number' && a.resources > 0) resources.push(a);
            }
            if (resources.length > 0) {
                const targetAsset = resources[Math.floor(Math.random() * resources.length)];
                targetAsset.resources--;
                const fData = facilityData[targetAsset.type] || facilityData['default'];
                const itemKey = fData.items[Math.floor(Math.random() * fData.items.length)];
                this.inventory.push(itemKey);
                if (targetAsset.resources <= 0) {
                    const depKey = fData.depletedType || 'grass1';
                    const depVisual = catalog[depKey] || defaultCatalog[depKey];
                    if(depVisual) {
                        targetAsset.img = depVisual.img; targetAsset.sx = depVisual.sx; targetAsset.sy = depVisual.sy;
                        targetAsset.type = depVisual.type; targetAsset.name = "跡地";
                    }
                }
                return `採取: ${itemCatalog[itemKey].name}`;
            } else return "資源が見つからない...";
        } else return "採取失敗...";
    }
};

aiPet.update = function() {
    const shouldAnimate = (currentMode === 'play') || (currentMode === 'ai_adjust' && isTestPlaying);
    if (!shouldAnimate || isRouletteSpinning) return;
    if (typeof this.gameTimer === 'undefined') this.gameTimer = 0;
    this.gameTimer++;
    const isOneMinutePassed = (this.gameTimer >= 20);
    
    if (isOneMinutePassed) {
        this.gameTimer = 0;
        this.updateWeather();
        if (currentMode === 'play' && this.schedule.length > 0) {
            const task = this.schedule[0];
            if (!this.indoorTarget) {
                let targetType = null;
                if (task.type === 'rest') targetType = ['hut', 'house', 'castle'];
                else if (task.type === 'study') targetType = ['library', 'school', 'castle', 'house'];
                else if (task.type === 'train') targetType = ['gym', 'castle', 'house', 'hut'];
                else if (task.type === 'eat') targetType = ['restaurant', 'house', 'hut'];
                if (targetType) {
                    let bestDist = 9999; let bestAsset = null;
                    for (let uid in assets) {
                        const a = assets[uid];
                        if (targetType.includes(a.type)) {
                            const dist = Math.sqrt((a.dx - this.x)**2 + (a.dy - this.y)**2);
                            if (dist < bestDist) { bestDist = dist; bestAsset = a; }
                        }
                    }
                    if (bestAsset) this.indoorTarget = bestAsset;
                }
            }
            let isArrived = false;
            if (this.indoorTarget) {
                const t = this.indoorTarget;
                if (!assets[getAssetKey(t)]) { this.indoorTarget = null; this.isIndoors = false; } else {
                    const tx = t.dx + (t.sw * t.scale)/2; const ty = t.dy + (t.sh * t.scale)/2;
                    const dist = Math.sqrt((tx - this.x)**2 + (ty - this.y)**2);
                    if (dist <= 10) isArrived = true;
                }
            } else { isArrived = true; this.isIndoors = false; }

            if (isArrived) {
                if (this.indoorTarget) { this.isIndoors = true; this.actionState = 'idle'; }
                if (this.visualActionTimer > 0) {
                    this.visualActionTimer--; if (this.visualActionTimer <= 0) this.visualAction = null;
                }
                let trait = charaTraits[this.baseType] || charaTraits['robot'];
                if(this.currentSkin.includes('spirit')) trait = charaTraits['spirit'];
                else if(this.currentSkin.includes('magician')) trait = charaTraits['magician'];
                const effData = getActionEfficiency(task.type); const efficiency = effData.rate;

                if (task.type === 'rest') { 
                    this.energy += 2 * efficiency; this.hunger -= 0.5; 
                    this.message = this.isIndoors ? "💤 休憩中..." : `💤 野宿...`; 
                    
                    // ★修正: 体力が満タンになったら終了
                    if (this.energy >= 100) {
                        this.message = "体力満タン！";
                        task.duration = 0; 
                        this.visualAction = null;
                        this.visualActionTimer = 0;
                    }
                } 
                else if (task.type === 'study') { 
                    if (this.energy <= 0 && this.hunger <= 0) {
                        task.duration = 0; 
                    } else {
                        this.stats.intel += (0.1 * trait.statBonus.intel) * efficiency;
                        this.energy -= 1; this.hunger -= 1; 
                        this.message = `📚 勉強...`;
                    }
                } 
                else if (task.type === 'train') { 
                    if (this.energy <= 0 && this.hunger <= 0) {
                        task.duration = 0; 
                    } else {
                        this.stats.power += (0.1 * trait.statBonus.power) * efficiency;
                        this.energy -= 2; this.hunger -= 2; 
                        this.message = `💪 運動...`;
                    }
                } 
                else if (task.type === 'eat') { 
                    if (this.hunger >= 100) { this.message = "ごちそうさま！(満腹)"; task.duration = 0; this.visualAction = null; this.visualActionTimer = 0; }
                    else if (task.duration % 10 === 0) { 
                        const ate = this.consumeFood(); 
                        if (!ate) { this.message = "もう食べない"; task.duration = 0; this.visualAction = null; this.visualActionTimer = 0; } 
                    } else { if(this.messageTimer <= 0) this.message = "もぐもぐ..."; }
                } 
                else if (task.type === 'project') { const res = this.executeProject(task.target); this.message = res; this.isIndoors = false; }
                
                task.duration--;
                if (task.duration <= 0) { 
                    if (this.energy <= 0 && this.hunger <= 0 && task.type !== 'rest' && task.type !== 'eat') {
                         this.message = "限界で倒れてしまった...";
                    } else {
                         this.message = `${getTaskName(task.type)} 完了！`;
                    }
                    this.schedule.shift(); this.indoorTarget = null; this.isIndoors = false; resetIdle(); 
                }
            } else {
                this.actionState = 'moving_schedule'; this.message = `${getTaskName(task.type)}へ移動中...`; this.isIndoors = false;
            }
            this.messageTimer = 60;
        } else if (currentMode === 'play') {
            if (this.isIndoors) { this.isIndoors = false; this.indoorTarget = null; }
            if (Math.random() < 0.0005) { processWeatherAndDisaster(); }
            if (this.activeQuests && this.activeQuests.length > 0) {
                for (let i = this.activeQuests.length - 1; i >= 0; i--) {
                    this.activeQuests[i].timeLeft--;
                    if (this.activeQuests[i].timeLeft <= 0) { this.activeQuests.splice(i, 1); this.message = "依頼の期限が過ぎてしまった..."; }
                }
            }
            let trait = charaTraits[this.baseType] || charaTraits['robot'];
            if(this.currentSkin.includes('spirit')) trait = charaTraits['spirit'];
            else if(this.currentSkin.includes('magician')) trait = charaTraits['magician'];
            else if(this.currentSkin.includes('robot')) trait = charaTraits['robot'];
            const powerBonus = this.stats.power * 0.0005;
            const baseConsumption = 0.05;
            const finalConsump = Math.max(0.01, (baseConsumption - powerBonus) * trait.consumption);
            this.energy -= finalConsump;
            this.hunger -= (0.03 + powerBonus) * trait.consumption;
            if (trait.natureHeal && Math.random() < 0.1) { this.energy += 0.5; this.stats.mood += 0.1; }
        }
    }

    if (currentMode === 'play') {
        if (this.schedule.length > 0) {
            if (this.actionState === 'moving_schedule' && this.indoorTarget) {
                const t = this.indoorTarget;
                const tx = t.dx + (t.sw * t.scale)/2; const ty = t.dy + (t.sh * t.scale)/2;
                const dist = Math.sqrt((tx - this.x)**2 + (ty - this.y)**2);
                if (dist > 5) {
                    const dx = tx - this.x; const dy = ty - this.y;
                    if (dx < 0) this.flip = true; else this.flip = false;
                    this.x += (dx / dist) * 4; this.y += (dy / dist) * 4;
                }
            }
        } else {
            if (this.actionState === 'idle' || this.actionState === 'moving') {
                const dx = this.targetX - this.x; const dy = this.targetY - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist > 5 && this.energy > 0) { 
                    this.actionState = 'moving';
                    if (dx < 0) this.flip = true; else this.flip = false;
                    this.x += (dx / dist) * 3; this.y += (dy / dist) * 3; 
                } else { this.actionState = 'idle'; }
                this.idleTimer++;
                if (this.idleTimer > 60 && this.actionState === 'idle') { if (Math.random() < 0.02) { this.performIdleAction(); this.idleTimer = 0; } }
            }
            else if (this.actionState === 'moving_to_facility') {
                const dx = this.targetX - this.x; const dy = this.targetY - this.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist > 5) {
                    if (dx < 0) this.flip = true; else this.flip = false;
                    this.x += (dx / dist) * 3; this.y += (dy / dist) * 3;
                } else {
                    const asset = this.interactionTarget; this.actionState = 'idle'; this.interactionTarget = null;
                    if (asset) this.performFacilityAction(asset);
                }
            }
            else if (this.actionState === 'moving_to_enter') {
                 const dx = this.targetX - this.x; const dy = this.targetY - this.y;
                 const dist = Math.sqrt(dx*dx + dy*dy);
                 if (dist > 5) {
                    if (dx < 0) this.flip = true; else this.flip = false;
                    this.x += (dx / dist) * 3.5; this.y += (dy / dist) * 3.5;
                 } else { this.actionState = 'entering'; }
            }
            else if (this.actionState === 'entering') {
                this.visualScale -= 0.05;
                if (this.visualScale <= 0) {
                    this.visualScale = 0; this.actionState = 'inside';
                    if (this.interactionTarget && (this.interactionTarget.type === 'hut' || this.interactionTarget.type === 'bridge')) {
                        this.interactionTimer = 60; this.message = (this.interactionTarget.type === 'hut') ? "休憩中..." : "釣り中...";
                    } else { this.interactionTimer = 100; this.message = ""; }
                }
            }
            else if (this.actionState === 'inside') {
                const target = this.interactionTarget;
                if (target && (target.type === 'hut' || target.type === 'bridge')) {
                    this.interactionTimer--;
                    if (this.interactionTimer <= 0) { this.interactWithFacility(target); this.actionState = 'exiting'; }
                } else {
                    this.exploreTimer++; if (this.exploreTimer % 20 === 0) { this.processExploration(); }
                }
            }
            else if (this.actionState === 'exiting') {
                this.visualScale += 0.05; this.y += 1;
                if (this.visualScale >= 1.0) { this.visualScale = 1.0; this.actionState = 'idle'; this.interactionTarget = null; }
            }
        }
    }
    if (++this.tick > 8) { this.frameStep = (this.frameStep + 1) % 4; this.frameIndex = [0, 1, 2, 1][this.frameStep]; this.tick = 0; }
    if (this.messageTimer > 0) this.messageTimer--;
    this.energy = Math.max(0, Math.min(100, this.energy));
    this.hunger = Math.max(0, Math.min(100, this.hunger));
    this.stats.intel = Math.max(0, this.stats.intel);
    this.stats.power = Math.max(0, this.stats.power);
    this.stats.mood = Math.max(0, this.stats.mood);
    if (currentMode === 'play') {
        const currentType = this.currentSkin || this.type;
        if (this.age >= 30 && ['robot','spirit','magician'].includes(currentType)) {
            if (typeof this.getAvailableEvolutions === 'function') { const evos = this.getAvailableEvolutions(); this.canEvolve = (evos.length > 0); }
        } else { this.canEvolve = false; }
        if (this.age >= this.lifespan) triggerReincarnation();
    }
};

aiPet.performFacilityAction = function(asset) {
    const type = asset.type; this.messageTimer = 0;
    if (this.intendedAction === 'demolish') {
        const uid = getAssetKey(asset);
        if (uid) { this.demolishBuilding(uid); this.intendedAction = null; } return;
    }
    if (type === 'restaurant') this.autoCook();
    else if (type === 'blacksmith') this.autoCraft();
    else if (type === 'castle') this.autoCastleQuest();
    else if (type === 'casino') this.autoGamble();
    else if (type === 'shop') this.autoShop();
    else if (type === 'farm') this.processFarmInteraction(asset);
    else if (type === 'hut' || type === 'house') {
        if (this.inventory.includes('tool_pan')) { if (Math.random() < 0.7) { this.autoCook(true); return; } }
        this.actionState = 'entering'; this.message = getSmartDialogue('move', asset.name); this.interactionTarget = asset; this.messageTimer = 100;
    } else if (type === 'bridge') {
        this.actionState = 'entering'; this.message = "釣り場へ..."; this.interactionTarget = asset; this.messageTimer = 100;
    }
};

aiPet.autoCook = function(isSimpleOnly = false) {
    const myItems = {}; this.inventory.forEach(k => myItems[k] = (myItems[k] || 0) + 1);
    let cookable = [];
    recipeCatalog.forEach(recipe => {
        if (isSimpleOnly && recipe.type !== 'simple') return;
        let can = true; for (let mat in recipe.ingredients) { if ((myItems[mat] || 0) < recipe.ingredients[mat]) can = false; }
        if (can) cookable.push(recipe);
    });
    if (cookable.length > 0) {
        const recipe = cookable[Math.floor(Math.random() * cookable.length)];
        for (let mat in recipe.ingredients) {
            for(let i=0; i<recipe.ingredients[mat]; i++) { const idx = this.inventory.indexOf(mat); this.inventory.splice(idx, 1); }
        }
        this.visualAction = 'cook'; this.visualActionTimer = 100;
        if (isSimpleOnly) { this.message = "小屋で料理中..."; startActionRoulette('cook', recipe, true); } 
        else { startActionRoulette('cook', recipe, true); }
    } else {
        if (isSimpleOnly) { this.message = "料理する食材がないな..."; this.actionState = 'entering'; this.interactionTarget = this.indoorTarget; } 
        else { this.message = "食材が足りなくて料理できない..."; this.messageTimer = 120; }
    }
};

aiPet.autoCraft = function() {
    const myItems = {}; this.inventory.forEach(k => myItems[k] = (myItems[k] || 0) + 1);
    let craftable = [];
    craftCatalog.forEach(recipe => {
        let can = true; for (let mat in recipe.materials) { if ((myItems[mat] || 0) < recipe.materials[mat]) can = false; }
        if (can) craftable.push(recipe);
    });
    if (craftable.length > 0) {
        const recipe = craftable[Math.floor(Math.random() * craftable.length)];
        for (let mat in recipe.materials) {
            for(let i=0; i<recipe.materials[mat]; i++) { const idx = this.inventory.indexOf(mat); this.inventory.splice(idx, 1); }
        }
        this.visualAction = 'smith'; this.visualActionTimer = 100; startActionRoulette('craft', recipe, true);
    } else { this.message = "素材がなくて作れない..."; this.messageTimer = 120; }
};

aiPet.autoGamble = function() {
    if (this.casinoCoins >= 5) {
        this.message = "スロットを回すぞ！"; this.messageTimer = 100; openCasino(); 
        setTimeout(() => { if (document.getElementById('casinoOverlay').classList.contains('active')) { playSlot(); setTimeout(() => { document.getElementById('casinoOverlay').classList.remove('active'); this.message = "カジノ楽しかった！"; this.messageTimer = 120; }, 3000); } }, 1000);
    } else {
        if (this.gold >= 100) { this.exchangeCoin(100); this.message = "コインを交換した！"; setTimeout(() => this.autoGamble(), 1000); } 
        else { this.message = "お金もコインもない..."; this.messageTimer = 120; }
    }
};

aiPet.autoCastleQuest = function() {
    this.checkCastleQuest(); let delivered = false;
    for (let i = this.activeQuests.length - 1; i >= 0; i--) {
        const res = this.deliverQuest(i); if (res.success) { delivered = true; this.messageTimer = 150; }
    }
    if (delivered) return;
    if (this.activeQuests.length < 3) {
        if (this.questBoard.length > 0) {
            const targetIdx = Math.floor(Math.random() * this.questBoard.length); const q = this.questBoard[targetIdx];
            let qName = q.target;
            if(itemCatalog[q.target]) qName = itemCatalog[q.target].name; else if(facilityData[q.target]) qName = facilityData[q.target].name; else if(buildingCatalog[q.target]) qName = buildingCatalog[q.target].name;
            this.acceptQuest(targetIdx); this.message = `「${qName}」の依頼を受けた！`; this.messageTimer = 150; this.checkCastleQuest();
        } else { this.message = "今は依頼がないみたいだ..."; this.messageTimer = 120; }
    } else { this.message = "依頼がいっぱいだ！片付けなきゃ"; this.messageTimer = 120; }
};

aiPet.autoShop = function() {
    this.messageTimer = 150; 
    if (this.gold >= 50) {
        let buyCandidates = ['seed_carrot', 'seed_tomato', 'seed_pepper', 'wood', 'iron'];
        const hasRodOld = this.inventory.includes('rod_old'); const hasRodNorm = this.inventory.includes('rod_norm'); const hasRodSuper = this.inventory.includes('rod_super');
        if (!hasRodOld && !hasRodNorm && !hasRodSuper) buyCandidates.push('rod_old');
        if (this.shopLevel >= 3 && !hasRodNorm && !hasRodSuper) buyCandidates.push('rod_norm');
        if (this.shopLevel >= 5 && !hasRodSuper) buyCandidates.push('rod_super');
        const target = buyCandidates[Math.floor(Math.random() * buyCandidates.length)]; const item = itemCatalog[target];
        if (item) {
            const price = item.value * 2; 
            if (this.gold >= price) {
                if (Math.random() < 0.6) { this.gold -= price; this.inventory.push(target); this.processShopTransaction(price, true); this.message = `店で ${item.name} を買った！`; } 
                else { this.message = "欲しいものがなかったな..."; }
            } else { this.message = "高くて買えなかった..."; }
        } else { this.message = "品切れみたいだ..."; }
    } else { this.message = "お金がないから見るだけ..."; }
};

aiPet.craftItem = function(itemId, isSuccess) {
    const recipe = craftCatalog.find(r => r.id === itemId); if(!recipe) return false;
    if (isSuccess) {
        this.inventory.push(itemId);
        const itemData = itemCatalog[itemId];
        if(itemData.stats) {
            if(itemData.stats.power) this.stats.power += itemData.stats.power; if(itemData.stats.intel) this.stats.intel += itemData.stats.intel;
            if(itemData.stats.mood) this.stats.mood += itemData.stats.mood; if(itemData.stats.energy) this.energy = 100; 
        }
        this.message = `作成成功！: ${recipe.name}`;
    } else { this.inventory.push('scrap_metal'); this.message = "作成失敗... 鉄くずになった"; }
    saveGameData(); return isSuccess;
};

aiPet.processFarmInteraction = function(farm) {
    if (this.energy < 5) { this.message = "疲れた..."; this.messageTimer = 120; return; }
    if (!farm.plantedCrop) {
        let seedIndex = -1;
        if (this.intendedSeed) {
            seedIndex = this.inventory.indexOf(this.intendedSeed);
            if (seedIndex === -1) { this.message = `${itemCatalog[this.intendedSeed].name}を持ってない...`; this.intendedSeed = null; this.messageTimer = 120; return; }
        } else { seedIndex = this.inventory.findIndex(k => itemCatalog[k] && itemCatalog[k].type === 'seed'); }
        if (seedIndex !== -1) {
            const seedKey = this.inventory[seedIndex]; const seedData = itemCatalog[seedKey]; this.inventory.splice(seedIndex, 1);
            farm.plantedCrop = seedData.crop; farm.growth = 0; farm.name = `${seedData.crop}畑`;
            this.message = getSmartDialogue('farm_plant', seedData.name); this.energy -= 5; this.intendedSeed = null; 
        } else { this.message = getSmartDialogue('no_item', "種"); }
    } else if (farm.growth >= 100) {
        const cropKey = farm.plantedCrop; const cropData = itemCatalog[cropKey]; this.inventory.push(cropKey);
        this.message = getSmartDialogue('farm_harvest', cropData.name); this.stats.mood += 5; this.energy -= 10;
        farm.plantedCrop = null; farm.growth = 0; farm.name = "空の畑";
    } else {
        farm.growth += 20 + (this.stats.intel * 0.5); this.message = getSmartDialogue('farm_water', ""); this.energy -= 8; this.stats.power += 0.5;
    }
    this.messageTimer = 120; saveGameData();
};

aiPet.performIdleAction = function() {
    if (this.energy < 20 || this.hunger < 20) {
        if (this.stats.intel < 20) { this.message = ["...", "うぅ...", "ふぇ...", "(じっとしている)"][Math.floor(Math.random()*4)]; this.actionState = 'idle'; } 
        else if (this.stats.intel < 50) { if (this.energy < 20) this.message = "つかれた..."; else this.message = "おなかへった"; }
        else { if (this.energy < 20) this.message = "休ませてくれ！"; else this.message = "何か食べたいな"; }
        this.messageTimer = 120; return;
    }
    const rand = Math.random(); const exploreRate = 0.1 + (this.stats.intel * 0.005);
    if (rand < exploreRate) {
        let buildings = []; for(let key in assets) { let type = assets[key].type || 'object'; if (type === 'building' || type === 'house') buildings.push(assets[key]); }
        if (buildings.length > 0) { const target = buildings[Math.floor(Math.random() * buildings.length)]; this.startBuildingInteraction(target); return; }
    }
    if (rand < 0.7) {
        const wanderX = (Math.random() - 0.5) * 300; const wanderY = (Math.random() - 0.5) * 300;
        let nextX = this.x + wanderX; let nextY = this.y + wanderY;
        nextX = Math.max(50, Math.min(750, nextX)); nextY = Math.max(50, Math.min(430, nextY));
        this.targetX = nextX; this.targetY = nextY;
    } else {
        const pType = getPersonalityType(this.stats);
        let typeKey = this.baseType;
        if (this.currentSkin.includes('robot')) typeKey = 'robot'; if (this.currentSkin.includes('spirit')) typeKey = 'spirit'; if (this.currentSkin.includes('magician')) typeKey = 'magician';
        if (!characterDialogues[typeKey]) typeKey = 'robot';
        const data = characterDialogues[typeKey][pType];
        if (this.stats.intel < 15) { this.message = ["あー？", "てくてく", "んー", "！"][Math.floor(Math.random() * 4)]; } 
        else if (data && data.length > 0) { this.message = data[Math.floor(Math.random() * data.length)]; }
        this.messageTimer = 120;
    }
};

aiPet.startBuildingInteraction = function(targetAsset) {
    this.interactionTarget = targetAsset;
    this.targetX = targetAsset.dx + (targetAsset.sw * targetAsset.scale)/2;
    this.targetY = targetAsset.dy + (targetAsset.sh * targetAsset.scale) - 20; 
    let keyPrefix = ""; for(let k in assets) { if(assets[k] === targetAsset) keyPrefix = k.split('_')[0]; }
    const fData = facilityData[keyPrefix] || facilityData['default'];
    this.exploreState = { depth: 0, maxDepth: fData.maxDepth, currentFacility: keyPrefix, name: fData.name };
    this.actionState = 'moving_to_enter'; this.message = getSmartDialogue('move', fData.name); this.messageTimer = 60;
};

aiPet.processExploration = function() {
    const state = this.exploreState; const fData = facilityData[state.currentFacility] || facilityData['default'];
    this.energy -= 2; this.hunger -= 2;
    if (this.energy <= 5 || this.hunger <= 5) { this.message = getSmartDialogue('retreat', ""); this.finishExploration(); return; }
    if (state.depth >= state.maxDepth) { this.message = getSmartDialogue('clear', ""); this.stats.mood += 20; this.finishExploration(); return; }
    state.depth++;
    const currentProg = this.facilityProgress[state.currentFacility] || 0;
    if (state.depth > currentProg) { this.facilityProgress[state.currentFacility] = state.depth; }
    
    let difficulty = state.depth * fData.difficulty; const myStat = this.stats[fData.stat] || 0; 
    const time = this.getTimePhase(); if (time.id === 'night') difficulty *= 1.5;
    let successRate = (myStat / (difficulty + 1)); if (myStat < difficulty * 0.5) successRate = 0; successRate = Math.min(1.0, successRate);
    let dropChance = 0.3; if (time.id === 'night') dropChance = 0.5;
    
    console.log(`Explore: ${fData.name} Lv.${state.depth} (Diff:${difficulty}) vs Stat:${myStat} => Rate:${(successRate*100).toFixed(1)}%`);
    
    if (Math.random() < successRate) {
        if (Math.random() < dropChance) {
            const itemKey = fData.items[Math.floor(Math.random() * fData.items.length)]; const item = itemCatalog[itemKey]; this.inventory.push(itemKey);
            if (!this.discoveredItems) this.discoveredItems = {}; if (!this.discoveredItems[state.currentFacility]) this.discoveredItems[state.currentFacility] = [];
            if (!this.discoveredItems[state.currentFacility].includes(itemKey)) { this.discoveredItems[state.currentFacility].push(itemKey); }
            this.message = getSmartDialogue('item', item.name); this.stats.mood += 5;
        } else { this.message = getSmartDialogue('progress', state.depth); this.stats[fData.stat] += 1; }
    } else { this.message = getSmartDialogue('danger', ""); this.energy -= 5; this.stats.mood -= 2; }

    const targetAsset = this.interactionTarget;
    if (targetAsset && typeof targetAsset.resources === 'number' && targetAsset.resources > 0) {
        targetAsset.resources--;
        if (targetAsset.resources <= 0) {
            delete assets[getAssetKey(targetAsset)]; this.message = "資源を取り尽くした！"; this.finishExploration(); this.interactionTarget = null;
        }
    }
    this.messageTimer = 120; saveGameData();
};

aiPet.finishExploration = function() { this.actionState = 'exiting'; this.interactionTimer = 0; this.messageTimer = 100; };

function processWeatherAndDisaster() {
    const disasterTypes = ["嵐", "地震", "火事"]; const type = disasterTypes[Math.floor(Math.random() * disasterTypes.length)];
    let destroyed = false;
    if (typeof window.triggerDisasterVisual === 'function') window.triggerDisasterVisual(type);
    for (let uid in assets) {
        const asset = assets[uid]; const bData = buildingCatalog[asset.type];
        if (bData && bData.breakChance) {
            if (Math.random() < bData.breakChance) { delete assets[uid]; aiPet.message = `大変！${type}で${asset.name}が壊れた！`; destroyed = true; break; }
        }
    }
    if (!destroyed) aiPet.message = `${type}が来たが、持ちこたえた！`;
}

aiPet.demolishBuilding = function(uid) {
    const asset = assets[uid]; if (!asset) return;
    const bData = buildingCatalog[asset.type];
    if (bData && bData.materials) {
        for (let mat in bData.materials) {
            const amount = Math.floor(bData.materials[mat] * 0.5); if (amount > 0) { for(let i=0; i<amount; i++) this.inventory.push(mat); }
        }
    }
    delete assets[uid]; this.message = "解体完了。素材の一部を回収しました。"; this.messageTimer = 120; this.actionState = 'idle'; saveGameData();
};

aiPet.constructBuilding = function(typeKey) {
    const buildData = buildingCatalog[typeKey]; if (!buildData) return false;
    if (this.stats.intel < buildData.reqIntel) { if (this.stats.intel < 10) this.message = "？"; else this.message = "作り方がわからない..."; return false; }
    if (this.energy < buildData.cost.energy) { this.message = "疲れて作れない..."; return false; }
    const required = buildData.materials; const myItems = {}; this.inventory.forEach(k => myItems[k] = (myItems[k] || 0) + 1);
    for (let mat in required) { if ((myItems[mat] || 0) < required[mat]) { this.message = `素材不足: ${itemCatalog[mat].name}`; return false; } }

    let bestX = this.x; let bestY = this.y; let foundSpot = false;
    for(let i=0; i<10; i++) {
        const tryX = this.x + (Math.random() * 200 - 100); const tryY = this.y + (Math.random() * 100 - 50);
        let hasObstacle = false; let onWater = false;
        for (let key in assets) {
            const a = assets[key];
            if (a.type !== 'ground') {
                const dist = Math.sqrt((tryX - a.dx)**2 + (tryY - a.dy)**2);
                if (dist < 40) { if (a.type === 'water') onWater = true; else hasObstacle = true; }
            }
        }
        if (!hasObstacle) {
            if (buildData.onWater) { if (onWater) { foundSpot = true; bestX = tryX; bestY = tryY; break; } } 
            else { if (!onWater) { foundSpot = true; bestX = tryX; bestY = tryY; break; } }
        }
    }
    if (!foundSpot) { this.message = buildData.onWater ? "水辺がない..." : "場所がない..."; return false; }

    this.energy -= buildData.cost.energy;
    for (let mat in required) { const count = required[mat]; for(let i=0; i<count; i++) { const idx = this.inventory.indexOf(mat); if(idx !== -1) this.inventory.splice(idx, 1); } }

    const visualData = catalog[typeKey] || buildData; const uid = typeKey + '_' + Date.now();
    const finalY = bestY - 40; 
    assets[uid] = { 
        img: visualData.img, sx: visualData.sx, sy: visualData.sy, sw: visualData.sw, sh: visualData.sh, 
        scale: (visualData.scale !== undefined) ? visualData.scale : 0.5,
        dx: bestX - 25, dy: finalY, 
        type: typeKey, name: buildData.name, growth: 0, plantedCrop: null, flip: false, durability: buildData.maxDurability || -1
    };
    this.message = `${buildData.name}を建てた！`; this.actionState = 'idle'; saveGameData(); return true; 
};

aiPet.interactWithFacility = function(asset) {
    if (asset.type === 'hut') {
        this.energy = Math.min(100, this.energy + 50); this.message = "小屋でひと休み...";
        if (asset.durability > 0) { asset.durability--; if (asset.durability <= 0) { delete assets[getAssetKey(asset)]; this.message = "小屋が壊れてしまった！"; } }
    } else if (asset.type === 'bridge') {
        if (this.energy < 5) { this.message = "疲れた..."; return; }
        if (typeof window.startFishingGame === 'function') window.startFishingGame(asset);
    }
    saveGameData();
};

function getAssetKey(targetAsset) { for(let k in assets) if(assets[k] === targetAsset) return k; return null; }

aiPet.cookItem = function(recipe, isSuccess) {
    let resultName = "";
    if (isSuccess) { this.inventory.push(recipe.id); this.skills.cooking += 1; resultName = recipe.name; } 
    else { this.inventory.push('burnt_food'); this.skills.cooking += 0.2; resultName = "焦げた料理"; }
    this.message = isSuccess ? `料理成功！: ${resultName}` : `失敗...: ${resultName}`; saveGameData(); return isSuccess;
};

aiPet.processShopTransaction = function(amount, isBuying) {
    if (isBuying) { this.shopExp += amount; this.shopBalance += amount; } else { this.shopBalance -= amount; }
    const nextLevelCost = this.shopLevel * 500;
    if (this.shopExp >= nextLevelCost) { this.shopLevel++; this.shopExp = 0; this.message = `ショップがLv${this.shopLevel}になった！`; }
    if (this.shopBalance < -2000) {
        for (let uid in assets) { if (assets[uid].type === 'shop') { delete assets[uid]; this.message = "赤字でショップが潰れた..."; this.shopBalance = 0; break; } }
    }
    saveGameData();
};

aiPet.moveToFacility = function(asset) {
    this.targetX = asset.dx + (asset.sw * asset.scale)/2; this.targetY = asset.dy + (asset.sh * asset.scale)/2;
    this.interactionTarget = asset; this.actionState = 'moving_to_facility'; this.message = getSmartDialogue('move', asset.name);
};

function processOfflineProgression() {
    const now = Date.now(); const lastTime = aiPet.lastSaveTime; let elapsedMin = Math.floor((now - lastTime) / (1000 * 60));
    if (elapsedMin < 0) elapsedMin = 0; if (elapsedMin <= 0) return; 
    let reportLog = []; let totalTimeSpent = 0;
    const offlineHungerRate = 0.5 + (aiPet.stats.power * 0.005); const offlineEnergyRate = 0.5;

    while (elapsedMin > 0 && aiPet.schedule.length > 0) {
        if (aiPet.energy <= 5 || aiPet.hunger <= 5) { reportLog.push("⛔ [中断] 限界で動けませんでした..."); break; }
        const task = aiPet.schedule[0]; const spend = Math.min(task.duration, elapsedMin);
        task.duration -= spend; elapsedMin -= spend; totalTimeSpent += spend;

        if (task.type !== 'project') {
            if (task.type !== 'rest') { aiPet.energy -= spend * offlineEnergyRate; aiPet.hunger -= spend * offlineHungerRate; } 
            else { const effData = getActionEfficiency('rest'); aiPet.energy += spend * 1.0 * effData.rate; aiPet.hunger -= spend * 0.2; }
            const effData = getActionEfficiency(task.type); const eff = (spend * 0.1) * effData.rate; 
            if (task.type === 'study') { aiPet.stats.intel += eff; aiPet.stats.mood -= eff*0.2; }
            if (task.type === 'train') { aiPet.stats.power += eff; aiPet.stats.mood -= eff*0.2; }
            if (task.type === 'rest')  { aiPet.stats.mood += eff * 1.5; }
            if (task.type === 'explore') { aiPet.stats.intel += eff*0.5; aiPet.stats.power += eff*0.5; aiPet.stats.mood += eff*0.3; }
            if (task.type === 'eat') { aiPet.hunger += spend * 3.0; aiPet.stats.mood += eff; }
        } else if (task.type === 'project') {
            let builtList = []; let gatheredCounts = {}; let failCount = 0;
            for(let i=0; i<spend; i++) {
                if(aiPet.energy < 5 || aiPet.hunger < 5) break; 
                const res = aiPet.executeProject(task.target);
                if (res.startsWith("建設完了")) { builtList.push(res.replace("建設完了: ", "")); } 
                else if (res.startsWith("採取")) { const itemName = res.replace("採取: ", ""); gatheredCounts[itemName] = (gatheredCounts[itemName] || 0) + 1; }
            }
            let logDetails = []; if (builtList.length > 0) logDetails.push(`🔨 建設: ${builtList.join(', ')}`);
            let gatherText = []; for (let name in gatheredCounts) { gatherText.push(`${name}x${gatheredCounts[name]}`); }
            if (gatherText.length > 0) logDetails.push(`🎒 採取: ${gatherText.join(', ')}`);
            let taskTitle = `✅ [完了] ${getTaskName(task.type)}`;
            if (task.target) { const bName = buildingCatalog[task.target] ? buildingCatalog[task.target].name : "??"; taskTitle += ` [${bName}]`; }
            if (task.duration > 0) taskTitle = taskTitle.replace("完了", "途中");
            reportLog.push(taskTitle); if (logDetails.length > 0) reportLog.push(`   └ ${logDetails.join('\n   └ ')}`);
        }
        if (task.type !== 'project') {
            if (task.duration <= 0) { reportLog.push(`✅ [完了] ${getTaskName(task.type)}`); aiPet.schedule.shift(); } 
            else { reportLog.push(`⏳ [途中] ${getTaskName(task.type)} (残り${task.duration}分)`); }
        } else { if (task.duration <= 0) aiPet.schedule.shift(); }
    }
    aiPet.energy = Math.max(0, Math.min(100, aiPet.energy));
    aiPet.hunger = Math.max(0, Math.min(100, aiPet.hunger));
    aiPet.stats.intel = Math.floor(aiPet.stats.intel);
    aiPet.stats.power = Math.floor(aiPet.stats.power);
    aiPet.stats.mood = Math.floor(aiPet.stats.mood);

    if (totalTimeSpent > 0) {
        const reportText = `経過時間: ${totalTimeSpent}分\n--------------------------------\n` + (reportLog.length > 0 ? reportLog.join('\n') : "特になし") + `\n--------------------------------\n現在ステータス:\n⚡体力:${Math.floor(aiPet.energy)}% / 🍖満腹:${Math.floor(aiPet.hunger)}%\n賢さ:${aiPet.stats.intel} / 活力:${aiPet.stats.power} / 機嫌:${aiPet.stats.mood}`;
        const contentEl = document.getElementById('reportContent'); const overlayEl = document.getElementById('reportOverlay');
        if (contentEl && overlayEl) { contentEl.innerText = reportText; overlayEl.classList.add('active'); }
    }
    aiPet.lastSaveTime = Date.now(); saveGameData();
}

aiPet.checkCastleQuest = function() {
    const rank = this.castleRank || 1; if (!this.questBoard) this.questBoard = [];
    let attempts = 0;
    while (this.questBoard.length < 3 && attempts < 10) {
        attempts++;
        const types = ['delivery']; if (rank >= 2) types.push('explore'); if (rank >= 3) types.push('build');
        const type = types[Math.floor(Math.random() * types.length)]; let newQuest = null;
        if (type === 'delivery') {
            let candidates = ['stone', 'wood', 'herb', 'fish'];
            if (rank >= 2) candidates.push('iron', 'carrot', 'dish_salad');
            if (rank >= 3) candidates.push('coin', 'pepper', 'dish_stirfry', 'crystal');
            const target = candidates[Math.floor(Math.random() * candidates.length)];
            if (itemCatalog[target]) {
                const itemVal = itemCatalog[target].value; const count = Math.floor(Math.random() * 3) + rank;
                newQuest = { type: 'delivery', target: target, count: count, reward: Math.floor(itemVal * count * 1.5), timeLeft: 200 };
            }
        } 
        else if (type === 'explore') {
            const dungeons = ['skull', 'palms', 'mountain', 'crystal', 'casino', 'castle'];
            const target = dungeons[Math.floor(Math.random() * dungeons.length)]; const fData = facilityData[target];
            if (fData) {
                const current = this.facilityProgress[target] || 0; const goal = Math.min(fData.maxDepth, current + Math.floor(Math.random()*2) + 1);
                newQuest = { type: 'explore', target: target, count: goal, reward: goal * 50 + 100, timeLeft: 300 };
            }
        }
        else if (type === 'build') {
            const buildings = ['hut', 'farm', 'bridge', 'shop', 'restaurant', 'blacksmith'];
            const target = buildings[Math.floor(Math.random() * buildings.length)];
            if (buildingCatalog[target]) { newQuest = { type: 'build', target: target, count: 1, reward: 500, timeLeft: 400 }; }
        }
        if (newQuest) this.questBoard.push(newQuest);
    }
    saveGameData();
};

aiPet.acceptQuest = function(index) {
    if (this.questBoard[index]) { const quest = this.questBoard.splice(index, 1)[0]; this.activeQuests.push(quest); this.message = "依頼を引き受けた！"; saveGameData(); }
};

aiPet.deliverQuest = function(index) {
    const q = this.activeQuests[index]; if (!q) return { success: false, reason: "expired" };
    let completed = false; const qType = q.type || 'delivery';
    if (qType === 'delivery') {
        const myCount = this.inventory.filter(i => i === q.target).length;
        if (myCount >= q.count) { for(let i=0; i<q.count; i++) { const idx = this.inventory.indexOf(q.target); this.inventory.splice(idx, 1); } completed = true; } 
        else { return { success: false, reason: "shortage" }; }
    } else if (qType === 'explore') {
        const currentDepth = this.facilityProgress[q.target] || 0; if (currentDepth >= q.count) completed = true; else return { success: false, reason: "explore_more" };
    } else if (qType === 'build') {
        let exists = false; for (let uid in assets) { if (assets[uid].type === q.target) { exists = true; break; } }
        if (exists) completed = true; else return { success: false, reason: "build_more" };
    }
    if (completed) {
        this.gold += q.reward; this.activeQuests.splice(index, 1);
        let isRankUp = false;
        if (Math.random() < 0.3) { this.castleRank = (this.castleRank || 1) + 1; this.message = `王様の信頼を得た！(Rank ${this.castleRank})`; isRankUp = true; } 
        else { this.message = `依頼達成！報酬をもらった (+${q.reward}G)`; }
        saveGameData(); return { success: true, rankUp: isRankUp, newRank: this.castleRank };
    }
    return { success: false, reason: "unknown" };
};

aiPet.exchangeCoin = function(goldAmount) {
    if (this.gold >= goldAmount) { this.gold -= goldAmount; this.casinoCoins += Math.floor(goldAmount / 10); saveGameData(); return true; } return false;
};

window.spinSlotLogic = function() {
    if (aiPet.casinoCoins < 5) return null; aiPet.casinoCoins -= 5;
    const symbols = ['🍒', '🔔', '⭐', '7️⃣'];
    const r1 = symbols[Math.floor(Math.random() * symbols.length)]; const r2 = symbols[Math.floor(Math.random() * symbols.length)]; const r3 = symbols[Math.floor(Math.random() * symbols.length)];
    let win = 0;
    if (r1 === r2 && r2 === r3) { if (r1 === '7️⃣') win = 100; else if (r1 === '⭐') win = 50; else win = 20; } 
    else if (r1 === r2 || r2 === r3 || r1 === r3) { win = 2; }
    if (win > 0) aiPet.casinoCoins += win; saveGameData();
    return { reels: [r1, r2, r3], win: win };
};

aiPet.getCurrentHour = function() { if (typeof this.debugHour === 'number' && this.debugHour >= 0) return this.debugHour; return new Date().getHours(); };

aiPet.getTimePhase = function() {
    const h = this.getCurrentHour();
    if (h >= 5 && h < 10) return { id: 'morning', name: '朝', color: 'rgba(255, 200, 100, 0.1)' };
    if (h >= 10 && h < 16) return { id: 'day', name: '昼', color: 'rgba(0, 0, 0, 0)' };
    if (h >= 16 && h < 19) return { id: 'evening', name: '夕', color: 'rgba(200, 100, 50, 0.2)' };
    return { id: 'night', name: '夜', color: 'rgba(0, 0, 50, 0.5)' };
};

aiPet.getPriceRate = function() { const h = this.getCurrentHour(); if (h >= 11 && h < 14) return 0.8; return 1.0; };

// ★修正: action変数定義漏れを修正
aiPet.consumeFood = function() {
    if (this.hunger >= 95) { this.message = "もうお腹いっぱい！"; return false; }
    let bestFood = null; let bestIdx = -1; let maxPriority = -1;
    this.inventory.forEach((key, idx) => {
        const item = itemCatalog[key]; if (!item) return;
        let potentialGain = 0; if (item.stats && typeof item.stats.hunger !== 'undefined') { potentialGain = item.stats.hunger; } else { if (item.type === 'dish') potentialGain = 20; else potentialGain = 10; }
        if (this.hunger + potentialGain > 100) { return; }
        let priority = 0; if (item.type === 'dish') priority = 3; else if (item.type === 'food') priority = 2; else if (item.type === 'ingredient') priority = 1;
        if (priority > maxPriority) { maxPriority = priority; bestFood = item; bestIdx = idx; }
    });
    if (bestFood && bestIdx !== -1) {
        this.inventory.splice(bestIdx, 1);
        let gainEnergy = 0; let gainHunger = 0;
        if (bestFood.stats) {
            if (bestFood.stats.energy) gainEnergy += bestFood.stats.energy; gainHunger += (bestFood.stats.hunger || 20);
            if (bestFood.stats.power) this.stats.power += bestFood.stats.power; if (bestFood.stats.intel) this.stats.intel += bestFood.stats.intel; if (bestFood.stats.mood) this.stats.mood += bestFood.stats.mood;
        } else { gainHunger += 10; gainEnergy += 5; }
        
        // ★修正点: action変数を定義
        let action = "食べた";
        if (bestFood.type === 'dish') { 
            this.visualAction = 'eat_dish'; 
            action = "食べた";
        } else { 
            this.visualAction = 'eat_raw'; 
            action = "丸かじりした";
        }
        
        this.visualActionTimer = 60;
        this.energy = Math.min(100, this.energy + gainEnergy); this.hunger = Math.min(100, this.hunger + gainHunger);
        this.message = `${bestFood.name}を${action}！`; return true;
    } else { if (this.hunger >= 90) { this.message = "腹八分目にしておこう"; } else { this.message = "ちょうどいい食事がなかった..."; } return false; }
};

aiPet.forceDisaster = function(targetType) {
    console.log(`Debug: Force Disaster -> ${targetType}`);
    if (typeof window.triggerDisasterVisual === 'function') window.triggerDisasterVisual(targetType);
    let destroyed = false; let victimName = "";
    for (let uid in assets) {
        const asset = assets[uid]; const bData = buildingCatalog[asset.type];
        if (bData && bData.breakChance) {
            if (Math.random() < bData.breakChance) { delete assets[uid]; victimName = asset.name; destroyed = true; break; }
        }
    }
    if (destroyed) this.message = `(デバッグ) 大変！${targetType}で${victimName}が壊れた！`; else this.message = `(デバッグ) ${targetType}が来たが、持ちこたえた！`;
    this.messageTimer = 150; saveGameData();
};

const evolutionRequirements = {
    'robot': [ { next: 'robot_v2', name: "強化ロボ", weight: 50, req: {} }, { next: 'robot_tank', name: "重戦車", weight: 30, req: { power: 80 } }, { next: 'robot_gold', name: "黄金ロボ", weight: 15, req: { intel: 100, mood: 100 } } ],
    'spirit': [ { next: 'spirit_flower', name: "花の精", weight: 50, req: {} }, { next: 'spirit_fall', name: "紅葉の精", weight: 30, req: { mood: 80 } }, { next: 'spirit_tree', name: "大樹の精", weight: 15, req: { power: 100, intel: 50 } } ],
    'magician': [ { next: 'magician_dark', name: "闇魔術師", weight: 50, req: {} }, { next: 'magician_fire', name: "炎の魔導", weight: 30, req: { power: 80 } }, { next: 'magician_ice', name: "氷の賢者", weight: 15, req: { intel: 120 } } ]
};

aiPet.getAvailableEvolutions = function() {
    const list = evolutionRequirements[this.currentSkin]; if (!list) return [];
    return list.filter(evo => {
        if (evo.req.power && this.stats.power < evo.req.power) return false;
        if (evo.req.intel && this.stats.intel < evo.req.intel) return false;
        if (evo.req.mood && this.stats.mood < evo.req.mood) return false;
        return true;
    });
};