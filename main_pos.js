const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const paletteEl = document.getElementById('palette');
const spriteSheet = new Image();
spriteSheet.src = 'field_2.png'; 

const SAVE_KEY = 'my_map_data_v_final_adjust';

// 最初は「だいたい」の位置。後で画面上で微調整します
let catalog = {
    skullMountain: { name: '骸骨山', sx: 10, sy: 100, sw: 260, sh: 280 },
    blackMountain: { name: '黒い山', sx: 31, sy: 273, sw: 140, sh: 140 },
    palmTree:      { name: 'ヤシ木', sx: 348, sy: 268, sw: 130, sh: 160 },
    treasure:      { name: '宝箱',   sx: 499, sy: 263, sw: 100, sh: 100 },
    board:         { name: '板',     sx: 33, sy: 471, sw: 130, sh: 100 },
    house:         { name: '民家',   sx: 190, sy: 428, sw: 160, sh: 160 },
    signBoard:     { name: '立て板', sx: 504, sy: 461, sw: 100, sh: 120 }
};

let assets = JSON.parse(localStorage.getItem(SAVE_KEY)) || {};
let viewScale = 1.0;
let lastSelectedKey = null;
let isDragging = false;
let selectedAsset = null;
let offsetX = 0, offsetY = 0;

// 【重要】切り抜き範囲を調整するモード
let adjustMode = false;

function createPalette() {
    paletteEl.innerHTML = '<button onclick="toggleAdjust()" style="padding:10px; background: #c00; color:white; border:none; cursor:pointer;">切り抜き微調整モード切替</button>';
    for (let id in catalog) {
        const item = catalog[id];
        const btn = document.createElement('div');
        btn.className = 'palette-item';
        const size = 60;
        const ratio = size / Math.max(item.sw, item.sh);
        btn.style.backgroundImage = `url(${spriteSheet.src})`;
        btn.style.backgroundSize = `${spriteSheet.width * ratio}px ${spriteSheet.height * ratio}px`;
        btn.style.backgroundPosition = `-${item.sx * ratio}px -${item.sy * ratio}px`;
        btn.style.backgroundRepeat = 'no-repeat';
        btn.onclick = () => { if(!adjustMode) addAssetToMap(id); else selectForAdjust(id); };
        paletteEl.appendChild(btn);
    }
}

let adjustingId = null;
function toggleAdjust() {
    adjustMode = !adjustMode;
    alert(adjustMode ? "【調整モード】パレットのアイコンを選び、キーボードの矢印キーで切り抜き範囲を微調整してください。\n最後にコンソールに出る数値をメモしてください。" : "【通常モード】に戻りました");
    render();
}

function selectForAdjust(id) {
    adjustingId = id;
    render();
}

// キーボードで切り抜き範囲を 1px ずつ動かす
window.addEventListener('keydown', (e) => {
    if (!adjustMode || !adjustingId) return;
    const item = catalog[adjustingId];
    if (e.key === 'ArrowUp')    item.sy -= 1;
    if (e.key === 'ArrowDown')  item.sy += 1;
    if (e.key === 'ArrowLeft')  item.sx -= 1;
    if (e.key === 'ArrowRight') item.sx += 1;
    if (e.key === 'w') item.sw += 1;
    if (e.key === 's') item.sw -= 1;
    
    console.log(`${adjustingId} の新座標: sx:${item.sx}, sy:${item.sy}, sw:${item.sw}, sh:${item.sh}`);
    createPalette();
    render();
});

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (adjustMode && adjustingId) {
        // 調整モード中は画像を大きく表示して確認しやすくする
        ctx.fillStyle = "white";
        ctx.fillText(`調整中: ${catalog[adjustingId].name} (矢印キーでsx, sy移動 / W,Sキーで幅調整)`, 10, 20);
        const item = catalog[adjustingId];
        ctx.drawImage(spriteSheet, item.sx, item.sy, item.sw, item.sh, 100, 100, item.sw * 2, item.sh * 2);
    } else {
        ctx.save();
        ctx.scale(viewScale, viewScale);
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(0, 0, canvas.width/viewScale, canvas.height/viewScale);
        for (let key in assets) {
            const a = assets[key];
            const dw = a.sw * a.scale; const dh = a.sh * a.scale;
            ctx.drawImage(spriteSheet, a.sx, a.sy, a.sw, a.sh, a.dx, a.dy, dw, dh);
        }
        ctx.restore();
    }
}
// (マウスドラッグやホイール、addAssetToMap 等の基本関数は前回と同じものを維持してください)