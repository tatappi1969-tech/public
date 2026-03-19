// ==========================================
// TCG コアシステム (tcg_core.js) - 最終完全版
// ==========================================

const savedTCG = JSON.parse(localStorage.getItem('tcg_data_v1'));

window.TCG = savedTCG || {
    myCollection: [], 
    decks: [],        
    unlockedHistory: {} 
};

window.saveTCGData = function() {
    localStorage.setItem('tcg_data_v1', JSON.stringify(window.TCG));
};

// ==========================================
// 1. マスターデータ
// ==========================================
window.TCG_MASTER = {
    // 🐉 ドラゴン
    "dragon_0": { "name": "幼竜の突進", "type": "dragon", "image": "dragon_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 1, "baseHp": 30, "skillName": "体当たり", "skillCost": 1, "baseDmg": 20, "ability": "haste", "sx": -6, "sy": 44, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_1": { "name": "探求の白竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 1, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 2, "baseHp": 20, "skillName": "知識の探求", "skillCost": 2, "baseDmg": 20, "ability": "draw_card", "sx": 559, "sy": 44, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_2": { "name": "結界竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 2, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 3, "baseHp": 60, "skillName": "バリア展開", "skillCost": 1, "baseDmg": 20, "ability": "taunt", "sx": 1085, "sy": 44, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_3": { "name": "飛翔する白竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 3, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 2, "baseHp": 30, "skillName": "滑空攻撃", "skillCost": 1, "baseDmg": 30, "ability": "flight", "sx": 27, "sy": 554, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_4": { "name": "業火の竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 4, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 5, "baseHp": 60, "skillName": "ファイアブレス", "skillCost": 3, "baseDmg": 50, "ability": "roar", "sx": 535, "sy": 554, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_5": { "name": "森に潜む竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 5, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 1, "baseHp": 30, "skillName": "威嚇", "skillCost": 1, "baseDmg": 20, "ability": "stealth", "sx": 1078, "sy": 554, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_6": { "name": "洞窟の番竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 6, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 3, "baseHp": 60, "skillName": "岩砕き", "skillCost": 2, "baseDmg": 20, "ability": "wrath", "sx": 27, "sy": 1066, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_7": { "name": "魔力解放の竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 7, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 4, "baseHp": 40, "skillName": "マジックミサイル", "skillCost": 2, "baseDmg": 40, "ability": "splash_damage", "sx": 532, "sy": 1066, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_8": { "name": "宝物庫の主", "type": "dragon", "image": "dragon_card.png", "imageIndex": 8, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 6, "baseHp": 80, "skillName": "黄金の咆哮", "skillCost": 4, "baseDmg": 60, "ability": null, "sx": 1065, "sy": 1066, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_9": { "name": "疾風の爪", "type": "dragon", "image": "dragon_card.png", "imageIndex": 9, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 2, "baseHp": 30, "skillName": "ウィンドスラッシュ", "skillCost": 1, "baseDmg": 40, "ability": null, "sx": 27, "sy": 1586, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_10": { "name": "終焉の黒球", "type": "dragon", "image": "dragon_card.png", "imageIndex": 10, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 7, "baseHp": 60, "skillName": "ブラックホール", "skillCost": 5, "baseDmg": 80, "ability": "cataclysm", "sx": 545, "sy": 1586, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_11": { "name": "力尽きた竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 11, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 1, "baseHp": 10, "skillName": "最後のあがき", "skillCost": 1, "baseDmg": 20, "ability": "death_bomb", "sx": 1064, "sy": 1646, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_12": { "name": "迅雷の竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 4, "baseHp": 40, "skillName": "ライトニングブレス", "skillCost": 2, "baseDmg": 40, "ability": "double_strike", "sx": 27, "sy": 2125, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_13": { "name": "覚醒の光", "type": "dragon", "image": "dragon_card.png", "imageIndex": 13, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 5, "baseHp": 50, "skillName": "マナチャージ", "skillCost": 1, "baseDmg": 40, "ability": "mana_ramp", "sx": 532, "sy": 2200, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    "dragon_14": { "name": "まどろみの竜", "type": "dragon", "image": "dragon_card.png", "imageIndex": 14, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 510, "baseCost": 2, "baseHp": 40, "skillName": "休息", "skillCost": 1, "baseDmg": 20, "ability": "heal_self", "sx": 1067, "sy": 2200, "sw": 504, "sh": 400, "scaleX": 0.39999999999999963, "scaleY": 0.39999999999999963 },
    // 🤖 ロボット
    "robot_0": { "name": "パンチングロボ", "type": "robot", "image": "robot_card.png", "imageIndex": 0, "offsetX": 5, "offsetY": 0, "zoomX": 335, "zoomY": 505, "baseCost": 1, "baseHp": 40, "skillName": "ストレート", "skillCost": 1, "baseDmg": 30, "ability": null, "sx": 348, "sy": -27, "sw": 339, "sh": 354, "scaleX": 0.5999999999999996, "scaleY": 0.4999999999999996 },
    "robot_1": { "name": "ビームキャノン機", "type": "robot", "image": "robot_card.png", "imageIndex": 1, "offsetX": -3, "offsetY": 0, "zoomX": 360, "zoomY": 505, "baseCost": 4, "baseHp": 40, "skillName": "極太レーザー", "skillCost": 3, "baseDmg": 60, "ability": null, "sx": 1404, "sy": -27, "sw": 339, "sh": 354, "scaleX": 0.5999999999999996, "scaleY": 0.4999999999999996 },
    "robot_2": { "name": "採掘ロボ", "type": "robot", "image": "robot_card.png", "imageIndex": 2, "offsetX": -4.5, "offsetY": 0.5, "zoomX": 360, "zoomY": 520, "baseCost": 2, "baseHp": 40, "skillName": "マテリアル発掘", "skillCost": 2, "baseDmg": 10, "ability": "mana_ramp", "sx": 2203, "sy": -27, "sw": 339, "sh": 354, "scaleX": 0.5999999999999996, "scaleY": 0.4999999999999996 },
    "robot_3": { "name": "アサシンロボ", "type": "robot", "image": "robot_card.png", "imageIndex": 3, "offsetX": 4.5, "offsetY": 0.5, "zoomX": 360, "zoomY": 520, "baseCost": 2, "baseHp": 20, "skillName": "急所蹴り", "skillCost": 1, "baseDmg": 40, "ability": "stealth", "sx": 409, "sy": 279, "sw": 339, "sh": 340, "scaleX": 0.5999999999999996, "scaleY": 0.5499999999999996 },
    "robot_4": { "name": "浮遊ビット展開機", "type": "robot", "image": "robot_card.png", "imageIndex": 4, "offsetX": 3, "offsetY": 0.5, "zoomX": 360, "zoomY": 520, "baseCost": 3, "baseHp": 30, "skillName": "オールレンジ攻撃", "skillCost": 2, "baseDmg": 20, "ability": "double_strike", "sx": 1299, "sy": 279, "sw": 339, "sh": 340, "scaleX": 0.5999999999999996, "scaleY": 0.5499999999999996 },
    "robot_5": { "name": "黄昏の監視者", "type": "robot", "image": "robot_card.png", "imageIndex": 5, "offsetX": -4.5, "offsetY": 0.5, "zoomX": 360, "zoomY": 520, "baseCost": 2, "baseHp": 50, "skillName": "索敵", "skillCost": 1, "baseDmg": 10, "ability": "taunt", "sx": 2303, "sy": 279, "sw": 339, "sh": 340, "scaleX": 0.5999999999999996, "scaleY": 0.5499999999999996 },
    "robot_6": { "name": "双剣の機神", "type": "robot", "image": "robot_card.png", "imageIndex": 6, "offsetX": 4.5, "offsetY": 0, "zoomX": 345, "zoomY": 520, "baseCost": 5, "baseHp": 50, "skillName": "ツインブレード", "skillCost": 3, "baseDmg": 40, "ability": "double_strike", "sx": 367, "sy": 577, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_7": { "name": "帯電アーマー機", "type": "robot", "image": "robot_card.png", "imageIndex": 7, "offsetX": -2, "offsetY": 0, "zoomX": 345, "zoomY": 520, "baseCost": 3, "baseHp": 50, "skillName": "放電ショック", "skillCost": 2, "baseDmg": 20, "ability": "heavy_armor", "sx": 1231, "sy": 577, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_8": { "name": "修理特化ロボ", "type": "robot", "image": "robot_card.png", "imageIndex": 8, "offsetX": -4.5, "offsetY": 0, "zoomX": 345, "zoomY": 520, "baseCost": 2, "baseHp": 30, "skillName": "オーバーホール", "skillCost": 1, "baseDmg": 10, "ability": "heal_self", "sx": 2182, "sy": 577, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_9": { "name": "格闘教官機", "type": "robot", "image": "robot_card.png", "imageIndex": 9, "offsetX": 4.5, "offsetY": 0, "zoomX": 345, "zoomY": 520, "baseCost": 3, "baseHp": 40, "skillName": "クロスカウンター", "skillCost": 2, "baseDmg": 40, "ability": "counter_attack", "sx": 367, "sy": 877, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_10": { "name": "シールド発生機", "type": "robot", "image": "robot_card.png", "imageIndex": 10, "offsetX": 2, "offsetY": 0, "zoomX": 345, "zoomY": 520, "baseCost": 4, "baseHp": 70, "skillName": "イージス展開", "skillCost": 2, "baseDmg": 20, "ability": "taunt", "sx": 1150, "sy": 877, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_11": { "name": "スクラップ機", "type": "robot", "image": "robot_card.png", "imageIndex": 11, "offsetX": -6.5, "offsetY": 0, "zoomX": 345, "zoomY": 520, "baseCost": 1, "baseHp": 10, "skillName": "ショート", "skillCost": 1, "baseDmg": 10, "ability": "self_destruct", "sx": 2173, "sy": 900, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_12": { "name": "高速スピン機", "type": "robot", "image": "robot_card.png", "imageIndex": 12, "offsetX": 4.5, "offsetY": 0, "zoomX": 345, "zoomY": 520, "baseCost": 2, "baseHp": 30, "skillName": "竜巻旋風", "skillCost": 2, "baseDmg": 30, "ability": "flight", "sx": 318, "sy": 1180, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_13": { "name": "次元転送機", "type": "robot", "image": "robot_card.png", "imageIndex": 13, "offsetX": -2, "offsetY": -0.5, "zoomX": 345, "zoomY": 525, "baseCost": 6, "baseHp": 50, "skillName": "ワープアタック", "skillCost": 4, "baseDmg": 80, "ability": "stealth", "sx": 1189, "sy": 1180, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_14": { "name": "勝利のガッツポーズ", "type": "robot", "image": "robot_card.png", "imageIndex": 14, "offsetX": -4.5, "offsetY": -0.5, "zoomX": 345, "zoomY": 525, "baseCost": 3, "baseHp": 40, "skillName": "士気高揚", "skillCost": 2, "baseDmg": 20, "ability": "draw_card", "sx": 2134, "sy": 1180, "sw": 394, "sh": 340, "scaleX": 0.4999999999999996, "scaleY": 0.5499999999999996 },
    "robot_type1_0": { "name": "キリング・マシーン", "type": "robot_type1", "image": "robot_type1_card.png", "imageIndex": 2, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 70, "skillName": "プラズマデストロイ", "skillCost": 2, "baseDmg": 60, "ability": "pierce_recoil", "evolvesFrom": "robot", "sx": 1123, "sy": 1674, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type2_0": { "name": "アイドル・ギア", "type": "robot_type2", "image": "robot_type2_card.png", "imageIndex": 11, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 2, "baseHp": 60, "skillName": "ホログラムライブ", "skillCost": 1, "baseDmg": 30, "ability": "aoe_heal_play", "evolvesFrom": "robot", "sx": 675, "sy": 1022, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type3_0": { "name": "アナリティクス・マキナ", "type": "robot_type3", "image": "robot_type3_card.png", "imageIndex": 8, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 2, "baseHp": 60, "skillName": "データクラッシュ", "skillCost": 2, "baseDmg": 40, "ability": "start_draw", "evolvesFrom": "robot", "sx": 670, "sy": 1011, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type3_2_0": { "name": "マザー・ブレイン", "type": "robot_type3_2", "image": "robot_type3_2_card.png", "imageIndex": 10, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 70, "skillName": "エレメンタルカノン", "skillCost": 2, "baseDmg": 40, "ability": "aura_action_cost", "evolvesFrom": "robot", "sx": 615, "sy": -6, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type4_0": { "name": "ヘビー・タンク", "type": "robot_type4", "image": "robot_type4_card.png", "imageIndex": 5, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 100, "skillName": "ギガントドリル", "skillCost": 2, "baseDmg": 40, "ability": "heavy_armor", "evolvesFrom": "robot", "sx": 1224, "sy": 995, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type4_2_0": { "name": "アサルト・マキナ", "type": "robot_type4_2", "image": "robot_type4_2_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 80, "skillName": "メテオバーン", "skillCost": 3, "baseDmg": 60, "ability": "snipe_play", "evolvesFrom": "robot", "sx": 1330, "sy": 815, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type5_0": { "name": "スクラップ・ウォーカー", "type": "robot_type5", "image": "robot_type5_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 2, "baseHp": 80, "skillName": "ネイチャーバインド", "skillCost": 1, "baseDmg": 30, "ability": "end_heal", "evolvesFrom": "robot", "sx": 1291, "sy": 100, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type1_2_0": { "name": "シン・マキナ", "type": "robot_type1_2", "image": "robot_type1_2_card.png", "imageIndex": 2, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 180, "skillName": "崩星の咆哮", "skillCost": 3, "baseDmg": 90, "ability": "perfect_predation", "evolvesFrom": "robot_type1", "sx": 739, "sy": 29, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type1_3_0": { "name": "ヘル・ギア", "type": "robot_type1_3", "image": "robot_type1_3_card.png", "imageIndex": 2, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 150, "skillName": "煉獄の鎖", "skillCost": 3, "baseDmg": 100, "ability": "nightmare_rule", "evolvesFrom": "robot_type1", "sx": 618, "sy": 54, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type2_2_0": { "name": "スターライト・アーマー", "type": "robot_type2_2", "image": "robot_type2_2_card.png", "imageIndex": 2, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 140, "skillName": "ギャラクシー・ブレード", "skillCost": 2, "baseDmg": 80, "ability": "star_hope", "evolvesFrom": "robot_type2", "sx": 625, "sy": 1075, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type2_3_0": { "name": "セラフィム・ギア", "type": "robot_type2_3", "image": "robot_type2_3_card.png", "imageIndex": 11, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 120, "skillName": "神罰の光", "skillCost": 4, "baseDmg": 70, "ability": "divine_grace", "evolvesFrom": "robot_type2", "sx": 550, "sy": 1241, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type2_4_0": { "name": "ゴールデン・パラディン", "type": "robot_type2_4", "image": "robot_type2_4_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 200, "skillName": "ジャッジメント", "skillCost": 5, "baseDmg": 100, "ability": "heaven_punishment", "evolvesFrom": "robot_type2", "sx": 435, "sy": 693, "sw": 436, "sh": 341, "scaleX": 0.4499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type3_3_0": { "name": "ユニバース・コア", "type": "robot_type3_3", "image": "robot_type3_3_card.png", "imageIndex": 11, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 200, "skillName": "特異点生成", "skillCost": 4, "baseDmg": 50, "ability": "event_horizon", "evolvesFrom": "robot_type3", "sx": 758, "sy": 412, "sw": 549, "sh": 344, "scaleX": 0.39999999999999963, "scaleY": 0.5499999999999996 },
    "robot_type3_4_0": { "name": "マスター・コンソール", "type": "robot_type3_4", "image": "robot_type3_4_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 130, "skillName": "真理の書き換え", "skillCost": 2, "baseDmg": 70, "ability": "truth_overwrite", "evolvesFrom": "robot_type3_2", "sx": 492, "sy": 22, "sw": 549, "sh": 344, "scaleX": 0.39999999999999963, "scaleY": 0.5499999999999996 },
    "robot_type3_5_0": { "name": "サテライト・ルーラー", "type": "robot_type3_5", "image": "robot_type3_5_card.png", "imageIndex": 11, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 150, "skillName": "オービタル・カノン", "skillCost": 3, "baseDmg": 80, "ability": "heaven_judgement", "evolvesFrom": "robot_type3", "sx": 110, "sy": -6, "sw": 549, "sh": 344, "scaleX": 0.39999999999999963, "scaleY": 0.5499999999999996 },
    "robot_type4_3_0": { "name": "フルアーマー・タイタン", "type": "robot_type4_3", "image": "robot_type4_3_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 250, "skillName": "オメガ・バッシュ", "skillCost": 3, "baseDmg": 90, "ability": "absolute_fortress", "evolvesFrom": "robot_type4", "sx": 315, "sy": -6, "sw": 549, "sh": 344, "scaleX": 0.5499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type4_4_0": { "name": "ギガント・クラッシャー", "type": "robot_type4_4", "image": "robot_type4_4_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 190, "skillName": "次元穿孔ドリル", "skillCost": 4, "baseDmg": 120, "ability": "dimension_drill", "evolvesFrom": "robot_type4_2", "sx": 306, "sy": 68, "sw": 549, "sh": 344, "scaleX": 0.5499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type5_2_0": { "name": "クロックワーク・ゴッド", "type": "robot_type5_2", "image": "robot_type5_2_card.png", "imageIndex": 13, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 160, "skillName": "タイム・パラドックス", "skillCost": 3, "baseDmg": 80, "ability": "time_manipulation", "evolvesFrom": "robot_type5", "sx": 523, "sy": 1, "sw": 549, "sh": 344, "scaleX": 0.5499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type5_3_0": { "name": "アストロ・ダイバー", "type": "robot_type5_3", "image": "robot_type5_3_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 10, "baseHp": 170, "skillName": "超新星爆発", "skillCost": 6, "baseDmg": 100, "ability": "super_gravity", "evolvesFrom": "robot_type5", "sx": 536, "sy": 594, "sw": 549, "sh": 344, "scaleX": 0.5499999999999996, "scaleY": 0.5499999999999996 },
    "robot_type5_4_0": { "name": "エンシェント・レリック", "type": "robot_type5_4", "image": "robot_type5_4_card.png", "imageIndex": 12, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 190, "skillName": "ロスト・テクノロジー", "skillCost": 2, "baseDmg": 90, "ability": "eternal_rebirth", "evolvesFrom": "robot_type5", "sx": 1066, "sy": -14, "sw": 549, "sh": 344, "scaleX": 0.5499999999999996, "scaleY": 0.5499999999999996 },

    // 🧙 魔法使い
    'magician_0': { name: "雷鎚の魔道士", type: "magician", image: "magician_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 3, baseHp: 40, skillName: "サンダースマッシュ", skillCost: 2, baseDmg: 40, ability: "splash_damage" },
    'magician_1': { name: "浮遊する魔法使い", type: "magician", image: "magician_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 20, skillName: "マジックアロー", skillCost: 1, baseDmg: 30, ability: "flight" },
    'magician_2': { name: "防壁の結界師", type: "magician", image: "magician_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 4, baseHp: 60, skillName: "魔法の盾", skillCost: 2, baseDmg: 10, ability: "taunt" },
    'magician_3': { name: "暗殺魔法", type: "magician", image: "magician_card.png", imageIndex: 3, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 20, skillName: "ダガー・スロー", skillCost: 1, baseDmg: 30, ability: "silence" },
    'magician_4': { name: "メテオストライク", type: "magician", image: "magician_card.png", imageIndex: 4, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 6, baseHp: 40, skillName: "星の怒り", skillCost: 5, baseDmg: 80, ability: "trample" },
    'magician_5': { name: "書庫の賢者", type: "magician", image: "magician_card.png", imageIndex: 5, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 3, baseHp: 30, skillName: "知識の探求", skillCost: 2, baseDmg: 10, ability: "draw_card" },
    'magician_6': { name: "地裂の杖", type: "magician", image: "magician_card.png", imageIndex: 6, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 4, baseHp: 40, skillName: "アースクエイク", skillCost: 3, baseDmg: 50, ability: "splash_damage" },
    'magician_7': { name: "魔導書の詠唱", type: "magician", image: "magician_card.png", imageIndex: 7, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 30, skillName: "魔力抽出", skillCost: 1, baseDmg: 10, ability: "mana_ramp" },
    'magician_8': { name: "財宝の発見", type: "magician", image: "magician_card.png", imageIndex: 8, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 1, baseHp: 20, skillName: "強欲な壺", skillCost: 2, baseDmg: 10, ability: "draw_card" },
    'magician_9': { name: "残像ダッシュ", type: "magician", image: "magician_card.png", imageIndex: 9, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 1, baseHp: 20, skillName: "クイックムーブ", skillCost: 1, baseDmg: 10, ability: "haste" },
    'magician_10': { name: "召喚士の契約", type: "magician", image: "magician_card.png", imageIndex: 10, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 5, baseHp: 50, skillName: "悪魔召喚", skillCost: 3, baseDmg: 60, ability: null },
    'magician_11': { name: "魔力切れ", type: "magician", image: "magician_card.png", imageIndex: 11, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 1, baseHp: 10, skillName: "ぽんこつ魔法", skillCost: 1, baseDmg: 10, ability: null },
    'magician_12': { name: "魔力キック", type: "magician", image: "magician_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 40, skillName: "エンチャント蹴り", skillCost: 2, baseDmg: 30, ability: null },
    'magician_13': { name: "氷炎の魔道士", type: "magician", image: "magician_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 4, baseHp: 40, skillName: "ダブルキャスト", skillCost: 3, baseDmg: 50, ability: "splash_damage" },
    'magician_14': { name: "癒やしの泉", type: "magician", image: "magician_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 3, baseHp: 30, skillName: "ヒールオーラ", skillCost: 2, baseDmg: 10, ability: "heal_self" },

    // 🍃 精霊
    'spirit_0': { name: "リーフブレード", type: "spirit", image: "spirit_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 1, baseHp: 20, skillName: "葉っぱ斬り", skillCost: 1, baseDmg: 30, ability: null },
    'spirit_1': { name: "森の妖精の呪文", type: "spirit", image: "spirit_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 20, skillName: "自然の導き", skillCost: 2, baseDmg: 10, ability: "draw_card" },
    'spirit_2': { name: "葉っぱの盾", type: "spirit", image: "spirit_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 50, skillName: "防御態勢", skillCost: 1, baseDmg: 10, ability: "taunt" },
    'spirit_3': { name: "キノコキック", type: "spirit", image: "spirit_card.png", imageIndex: 3, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 30, skillName: "スポアアタック", skillCost: 1, baseDmg: 20, ability: "stealth" },
    'spirit_4': { name: "茨の束縛", type: "spirit", image: "spirit_card.png", imageIndex: 4, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 3, baseHp: 40, skillName: "ソーンウィップ", skillCost: 2, baseDmg: 30, ability: "heavy_strike" },
    'spirit_5': { name: "森の狩人", type: "spirit", image: "spirit_card.png", imageIndex: 5, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 3, baseHp: 30, skillName: "ツルムチ", skillCost: 2, baseDmg: 40, ability: "flight" },
    'spirit_6': { name: "つるのムチ", type: "spirit", image: "spirit_card.png", imageIndex: 6, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 30, skillName: "ダブルウィップ", skillCost: 1, baseDmg: 20, ability: "double_strike" },
    'spirit_7': { name: "精霊のバリア", type: "spirit", image: "spirit_card.png", imageIndex: 7, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 4, baseHp: 60, skillName: "自然の守り", skillCost: 2, baseDmg: 20, ability: "taunt" },
    'spirit_8': { name: "擬態する精霊", type: "spirit", image: "spirit_card.png", imageIndex: 8, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 1, baseHp: 20, skillName: "隠れ身", skillCost: 1, baseDmg: 10, ability: "stealth" },
    'spirit_9': { name: "風の刃", type: "spirit", image: "spirit_card.png", imageIndex: 9, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 3, baseHp: 30, skillName: "カマイタチ", skillCost: 2, baseDmg: 40, ability: "splash_damage" },
    'spirit_10': { name: "命の粉塵", type: "spirit", image: "spirit_card.png", imageIndex: 10, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 3, baseHp: 40, skillName: "癒やしの胞子", skillCost: 2, baseDmg: 10, ability: "heal_self" },
    'spirit_11': { name: "亀と長寿の精霊", type: "spirit", image: "spirit_card.png", imageIndex: 11, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 5, baseHp: 70, skillName: "のしかかり", skillCost: 3, baseDmg: 30, ability: "regeneration" },
    'spirit_12': { name: "岩石封じ", type: "spirit", image: "spirit_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 4, baseHp: 50, skillName: "ゴーレム縛り", skillCost: 3, baseDmg: 40, ability: "heavy_strike" },
    'spirit_13': { name: "マナの結晶", type: "spirit", image: "spirit_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 2, baseHp: 30, skillName: "大地の恵み", skillCost: 1, baseDmg: 10, ability: "mana_ramp" },
    'spirit_14': { name: "お昼寝", type: "spirit", image: "spirit_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 505, baseCost: 1, baseHp: 20, skillName: "すやすや", skillCost: 1, baseDmg: 10, ability: "heal_self" },

    // 🪨 ゴーレム
    'stone_0': { name: "岩石の拳", type: "stone", image: "stone_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 2, baseHp: 40, skillName: "スマッシュ", skillCost: 2, baseDmg: 30, ability: null },
    'stone_1': { name: "守護者の咆哮", type: "stone", image: "stone_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 3, baseHp: 50, skillName: "威圧", skillCost: 1, baseDmg: 20, ability: "taunt" },
    'stone_2': { name: "絶対防壁", type: "stone", image: "stone_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 4, baseHp: 80, skillName: "城壁化", skillCost: 2, baseDmg: 20, ability: "counter_attack" },
    'stone_3': { name: "投石兵", type: "stone", image: "stone_card.png", imageIndex: 3, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 30, skillName: "大岩投げ", skillCost: 2, baseDmg: 40, ability: null },
    'stone_4': { name: "磁力ゴーレム", type: "stone", image: "stone_card.png", imageIndex: 4, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 50, skillName: "引き寄せ", skillCost: 2, baseDmg: 20, ability: "draw_card" },
    'stone_5': { name: "苔むす巨人", type: "stone", image: "stone_card.png", imageIndex: 5, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 60, skillName: "大地の休息", skillCost: 1, baseDmg: 20, ability: "heal_self" },
    'stone_6': { name: "攻城の巨岩", type: "stone", image: "stone_card.png", imageIndex: 6, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 60, skillName: "城門破り", skillCost: 4, baseDmg: 70, ability: "trample" },
    'stone_7': { name: "大地を割る者", type: "stone", image: "stone_card.png", imageIndex: 7, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 6, baseHp: 70, skillName: "アース・スタンプ", skillCost: 4, baseDmg: 80, ability: "heavy_strike" },
    'stone_8': { name: "崩れゆく石像", type: "stone", image: "stone_card.png", imageIndex: 8, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 1, baseHp: 20, skillName: "破片飛ばし", skillCost: 1, baseDmg: 20, ability: null },
    'stone_9': { name: "地盤沈下", type: "stone", image: "stone_card.png", imageIndex: 9, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 4, baseHp: 40, skillName: "クレーター生成", skillCost: 3, baseDmg: 50, ability: "heavy_strike" },
    'stone_10': { name: "ストーンミサイル", type: "stone", image: "stone_card.png", imageIndex: 10, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 20, skillName: "岩石連射", skillCost: 2, baseDmg: 40, ability: "haste" },
    'stone_11': { name: "鉄壁の軍団", type: "stone", image: "stone_card.png", imageIndex: 11, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 7, baseHp: 100, skillName: "要塞陣形", skillCost: 3, baseDmg: 40, ability: "taunt" },
    'stone_12': { name: "百裂拳のゴーレム", type: "stone", image: "stone_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 50, skillName: "ガトリングパンチ", skillCost: 3, baseDmg: 60, ability: null },
    'stone_13': { name: "双極の岩神", type: "stone", image: "stone_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 6, baseHp: 60, skillName: "氷炎撃", skillCost: 4, baseDmg: 80, ability: null },
    'stone_14': { name: "瞑想する岩", type: "stone", image: "stone_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 40, skillName: "魔力吸収", skillCost: 1, baseDmg: 10, ability: "mana_ramp" },

    // ⚙️ ぜんまい
    'machine_0': { name: "ダッシュぜんまい", type: "machine", image: "machine_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 1, baseHp: 20, skillName: "突撃", skillCost: 1, baseDmg: 20, ability: "haste" },
    'machine_1': { name: "電撃放逐機", type: "machine", image: "machine_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 3, baseHp: 30, skillName: "ショックウェーブ", skillCost: 2, baseDmg: 40, ability: null },
    'machine_2': { name: "ぜんまいシールド", type: "machine", image: "machine_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 2, baseHp: 40, skillName: "盾構え", skillCost: 1, baseDmg: 10, ability: "taunt" },
    'machine_3': { name: "溶接アーム", type: "machine", image: "machine_card.png", imageIndex: 3, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 30, skillName: "バーナー炙り", skillCost: 2, baseDmg: 30, ability: null },
    'machine_4': { name: "歯車の結界", type: "machine", image: "machine_card.png", imageIndex: 4, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 4, baseHp: 60, skillName: "ギア・フォース", skillCost: 2, baseDmg: 20, ability: "taunt" },
    'machine_5': { name: "設計図の解読", type: "machine", image: "machine_card.png", imageIndex: 5, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 20, skillName: "ひらめき", skillCost: 2, baseDmg: 10, ability: "draw_card" },
    'machine_6': { name: "解体ハンマー", type: "machine", image: "machine_card.png", imageIndex: 6, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 30, skillName: "クラッシュ", skillCost: 2, baseDmg: 50, ability: null },
    'machine_7': { name: "オーバーヒート", type: "machine", image: "machine_card.png", imageIndex: 7, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 40, skillName: "リミッター解除", skillCost: 4, baseDmg: 80, ability: "death_bomb" },
    'machine_8': { name: "故障したぜんまい", type: "machine", image: "machine_card.png", imageIndex: 8, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 1, baseHp: 10, skillName: "空回り", skillCost: 1, baseDmg: 10, ability: "death_bomb" },
    'machine_9': { name: "ジャンク・キック", type: "machine", image: "machine_card.png", imageIndex: 9, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 30, skillName: "飛び蹴り", skillCost: 1, baseDmg: 20, ability: null },
    'machine_10': { name: "覚醒の歯車", type: "machine", image: "machine_card.png", imageIndex: 10, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 4, baseHp: 50, skillName: "フル稼働", skillCost: 2, baseDmg: 30, ability: "mana_ramp" },
    'machine_11': { name: "修理の連鎖", type: "machine", image: "machine_card.png", imageIndex: 11, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 30, skillName: "仲間を直す", skillCost: 2, baseDmg: 20, ability: "aoe_heal_play" },
    'machine_12': { name: "量産型ぜんまい", type: "machine", image: "machine_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 20, skillName: "集団攻撃", skillCost: 1, baseDmg: 20, ability: "death_bomb" },
    'machine_13': { name: "発火ぜんまい", type: "machine", image: "machine_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 20, skillName: "自爆特攻", skillCost: 2, baseDmg: 60, ability: "death_bomb" },
    'machine_14': { name: "ガラクタの山", type: "machine", image: "machine_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 1, baseHp: 40, skillName: "鉄くずの壁", skillCost: 1, baseDmg: 10, ability: "taunt" },

    // 👻 ゴースト
    'ghost_0': { name: "ポルターガイスト", type: "ghost", image: "ghost_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 2, baseHp: 30, skillName: "物投げ", skillCost: 1, baseDmg: 30, ability: "discard_hand" },
    'ghost_1': { name: "霊魂のビーム", type: "ghost", image: "ghost_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 3, baseHp: 30, skillName: "ソウルレイ", skillCost: 2, baseDmg: 50, ability: null },
    'ghost_2': { name: "魂の結晶", type: "ghost", image: "ghost_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 4, baseHp: 60, skillName: "硬化", skillCost: 1, baseDmg: 20, ability: "taunt" },
    'ghost_3': { name: "怨念の渦", type: "ghost", image: "ghost_card.png", imageIndex: 3, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 4, baseHp: 30, skillName: "ダークトルネード", skillCost: 3, baseDmg: 50, ability: "haunt" },
    'ghost_4': { name: "呪いの魔導書", type: "ghost", image: "ghost_card.png", imageIndex: 4, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 20, skillName: "禁術の詠唱", skillCost: 2, baseDmg: 20, ability: "draw_card" },
    'ghost_5': { name: "水面の浮遊霊", type: "ghost", image: "ghost_card.png", imageIndex: 5, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 1, baseHp: 20, skillName: "呪縛", skillCost: 1, baseDmg: 20, ability: "stealth" },
    'ghost_6': { name: "地縛霊", type: "ghost", image: "ghost_card.png", imageIndex: 6, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 40, skillName: "足止め", skillCost: 1, baseDmg: 20, ability: "taunt" },
    'ghost_7': { name: "霊体の盾", type: "ghost", image: "ghost_card.png", imageIndex: 7, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 60, skillName: "霊的防壁", skillCost: 2, baseDmg: 20, ability: "taunt" },
    'ghost_8': { name: "取り憑く霊", type: "ghost", image: "ghost_card.png", imageIndex: 8, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 20, skillName: "ドレイン", skillCost: 2, baseDmg: 30, ability: "life_drain" },
    'ghost_9': { name: "悪霊の急襲", type: "ghost", image: "ghost_card.png", imageIndex: 9, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 20, skillName: "奇襲", skillCost: 1, baseDmg: 30, ability: "haste" },
    'ghost_10': { name: "エクトプラズム", type: "ghost", image: "ghost_card.png", imageIndex: 10, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 4, baseHp: 40, skillName: "霊体攻撃", skillCost: 2, baseDmg: 40, ability: "flight" },
    'ghost_11': { name: "スライム化", type: "ghost", image: "ghost_card.png", imageIndex: 11, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 1, baseHp: 10, skillName: "べとべと", skillCost: 1, baseDmg: 10, ability: "debuff_attack" },
    'ghost_12': { name: "森の悪霊", type: "ghost", image: "ghost_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 40, skillName: "養分吸収", skillCost: 2, baseDmg: 20, ability: "mana_ramp" },
    'ghost_13': { name: "次元の狭間", type: "ghost", image: "ghost_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 30, skillName: "異次元送り", skillCost: 4, baseDmg: 70, ability: "stealth" },
    'ghost_14': { name: "竜の守護霊", type: "ghost", image: "ghost_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 60, skillName: "ドラゴンソウル", skillCost: 3, baseDmg: 50, ability: "flight" },

    // 🐦 鳥
    'bird_0': { name: "筋トレバード", type: "bird", image: "bird_card.png", imageIndex: 0, offsetX: 3, offsetY: 3, zoomX: 320, zoomY: 550, baseCost: 2, baseHp: 30, skillName: "マッスルアタック", skillCost: 1, baseDmg: 30, ability: null },
    'bird_1': { name: "吹雪の翼", type: "bird", image: "bird_card.png", imageIndex: 1, offsetX: 0, offsetY: 3, zoomX: 320, zoomY: 550, baseCost: 4, baseHp: 30, skillName: "ブリザード", skillCost: 3, baseDmg: 50, ability: "flight" },
    'bird_2': { name: "盾持ち鳥", type: "bird", image: "bird_card.png", imageIndex: 2, offsetX: -3, offsetY: 3, zoomX: 320, zoomY: 550, baseCost: 3, baseHp: 40, skillName: "シールドバッシュ", skillCost: 2, baseDmg: 20, ability: "taunt" },
    'bird_3': { name: "急降下爆撃", type: "bird", image: "bird_card.png", imageIndex: 3, offsetX: 3, offsetY: 3, zoomX: 320, zoomY: 550, baseCost: 3, baseHp: 20, skillName: "ダイブアタック", skillCost: 2, baseDmg: 50, ability: "flight" },
    'bird_4': { name: "知識のフクロウ", type: "bird", image: "bird_card.png", imageIndex: 4, offsetX: 0, offsetY: 3, zoomX: 320, zoomY: 550, baseCost: 2, baseHp: 20, skillName: "読書", skillCost: 2, baseDmg: 10, ability: "draw_card" },
    'bird_5': { name: "おやすみ鳥", type: "bird", image: "bird_card.png", imageIndex: 5, offsetX: -3, offsetY: 1.5, zoomX: 320, zoomY: 550, baseCost: 1, baseHp: 20, skillName: "羽休め", skillCost: 1, baseDmg: 10, ability: "heal_self" },
    'bird_6': { name: "ドリルバード", type: "bird", image: "bird_card.png", imageIndex: 6, offsetX: 3, offsetY: 0.5, zoomX: 320, zoomY: 550, baseCost: 2, baseHp: 20, skillName: "貫通くちばし", skillCost: 1, baseDmg: 40, ability: "stealth" },
    'bird_7': { name: "魔法の結界鳥", type: "bird", image: "bird_card.png", imageIndex: 7, offsetX: 0, offsetY: 0.5, zoomX: 320, zoomY: 550, baseCost: 4, baseHp: 50, skillName: "オーラ防壁", skillCost: 2, baseDmg: 20, ability: "taunt" },
    'bird_8': { name: "優勝バード", type: "bird", image: "bird_card.png", imageIndex: 8, offsetX: -3, offsetY: 0.5, zoomX: 320, zoomY: 550, baseCost: 5, baseHp: 50, skillName: "チャンピオンの舞", skillCost: 2, baseDmg: 30, ability: "mana_ramp" },
    'bird_9': { name: "爆砕の翼", type: "bird", image: "bird_card.png", imageIndex: 9, offsetX: 3, offsetY: -0.5, zoomX: 320, zoomY: 550, baseCost: 3, baseHp: 20, skillName: "フレアダイブ", skillCost: 2, baseDmg: 60, ability: "flight" },
    'bird_10': { name: "氷柱落とし", type: "bird", image: "bird_card.png", imageIndex: 10, offsetX: 0, offsetY: -0.5, zoomX: 320, zoomY: 550, baseCost: 4, baseHp: 30, skillName: "アイシクル", skillCost: 2, baseDmg: 40, ability: "double_strike" },
    'bird_11': { name: "力尽きた鳥", type: "bird", image: "bird_card.png", imageIndex: 11, offsetX: -3, offsetY: -0.5, zoomX: 320, zoomY: 550, baseCost: 1, baseHp: 10, skillName: "墜落", skillCost: 1, baseDmg: 10, ability: "haste" },
    'bird_12': { name: "魔法修練鳥", type: "bird", image: "bird_card.png", imageIndex: 12, offsetX: 3, offsetY: -0.5, zoomX: 320, zoomY: 550, baseCost: 2, baseHp: 30, skillName: "詠唱", skillCost: 2, baseDmg: 20, ability: "draw_card" },
    'bird_13': { name: "ダンベルバード", type: "bird", image: "bird_card.png", imageIndex: 13, offsetX: -0.5, offsetY: -0.5, zoomX: 320, zoomY: 550, baseCost: 3, baseHp: 40, skillName: "ダブルダンベル", skillCost: 2, baseDmg: 40, ability: "double_strike" },
    'bird_14': { name: "瞑想バード", type: "bird", image: "bird_card.png", imageIndex: 14, offsetX: -3, offsetY: -0.5, zoomX: 320, zoomY: 550, baseCost: 2, baseHp: 30, skillName: "精神統一", skillCost: 1, baseDmg: 10, ability: "mana_ramp" },

    // 🪲 かぶとむし
    'beetle_0': { name: "岩砕きの甲虫", type: "beetle", image: "beetle_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 3, baseHp: 40, skillName: "ホーンアタック", skillCost: 2, baseDmg: 40, ability: "trample" },
    'beetle_1': { name: "魔力集中の兜", type: "beetle", image: "beetle_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 4, baseHp: 40, skillName: "エネルギー波", skillCost: 3, baseDmg: 50, ability: null },
    'beetle_2': { name: "虹色の鉄壁", type: "beetle", image: "beetle_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 4, baseHp: 60, skillName: "オーラガード", skillCost: 2, baseDmg: 20, ability: "taunt" },
    'beetle_3': { name: "力比べの甲虫", type: "beetle", image: "beetle_card.png", imageIndex: 3, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 30, skillName: "投げ飛ばし", skillCost: 2, baseDmg: 30, ability: null },
    'beetle_4': { name: "爆発甲虫", type: "beetle", image: "beetle_card.png", imageIndex: 4, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 20, skillName: "大爆発", skillCost: 4, baseDmg: 80, ability: null },
    'beetle_5': { name: "黄昏の甲虫", type: "beetle", image: "beetle_card.png", imageIndex: 5, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 50, skillName: "甲殻防御", skillCost: 1, baseDmg: 10, ability: "heavy_armor" },
    'beetle_6': { name: "森の暴れん坊", type: "beetle", image: "beetle_card.png", imageIndex: 6, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 40, skillName: "連続角突き", skillCost: 2, baseDmg: 50, ability: null },
    'beetle_7': { name: "自然との調和", type: "beetle", image: "beetle_card.png", imageIndex: 7, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 40, skillName: "ツルの罠", skillCost: 1, baseDmg: 20, ability: "stealth" },
    'beetle_8': { name: "知識の虫", type: "beetle", image: "beetle_card.png", imageIndex: 8, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 30, skillName: "読書", skillCost: 2, baseDmg: 10, ability: "draw_card" },
    'beetle_9': { name: "砂煙の強襲", type: "beetle", image: "beetle_card.png", imageIndex: 9, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 20, skillName: "サンドタックル", skillCost: 1, baseDmg: 30, ability: "haste" },
    'beetle_10': { name: "地中潜行", type: "beetle", image: "beetle_card.png", imageIndex: 10, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 40, skillName: "アースダイブ", skillCost: 2, baseDmg: 40, ability: "stealth" },
    'beetle_11': { name: "ひっくり返った虫", type: "beetle", image: "beetle_card.png", imageIndex: 11, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 1, baseHp: 20, skillName: "じたばた", skillCost: 1, baseDmg: 10, ability: null },
    'beetle_12': { name: "飛翔する甲虫", type: "beetle", image: "beetle_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 30, skillName: "フライングプレス", skillCost: 2, baseDmg: 40, ability: "haste" },
    'beetle_13': { name: "甲虫の群れ", type: "beetle", image: "beetle_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 4, baseHp: 40, skillName: "スウォーム", skillCost: 2, baseDmg: 50, ability: null },
    'beetle_14': { name: "骸の上の王", type: "beetle", image: "beetle_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 6, baseHp: 80, skillName: "王者の威厳", skillCost: 3, baseDmg: 70, ability: "trample" },

    // 🌱 つぼみ
    'seed_0': { name: "筋トレつぼみ", type: "seed", image: "seed_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 2, baseHp: 30, skillName: "ダンベル殴り", skillCost: 1, baseDmg: 30, ability: null },
    'seed_1': { name: "毒の息", type: "seed", image: "seed_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 3, baseHp: 40, skillName: "ポイズンブレス", skillCost: 2, baseDmg: 20, ability: "venom_strike" },
    'seed_2': { name: "棘の結界", type: "seed", image: "seed_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 3, baseHp: 50, skillName: "チクチクガード", skillCost: 1, baseDmg: 20, ability: "taunt" },
    'seed_3': { name: "弾むつぼみ", type: "seed", image: "seed_card.png", imageIndex: 3, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 1, baseHp: 20, skillName: "体当たり", skillCost: 1, baseDmg: 10, ability: "flight" },
    'seed_4': { name: "緑のレーザー", type: "seed", image: "seed_card.png", imageIndex: 4, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 4, baseHp: 40, skillName: "ソーラービーム", skillCost: 3, baseDmg: 60, ability: null },
    'seed_5': { name: "木登りつぼみ", type: "seed", image: "seed_card.png", imageIndex: 5, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 2, baseHp: 30, skillName: "上から目線", skillCost: 1, baseDmg: 20, ability: "stealth" },
    'seed_6': { name: "茨の鞭", type: "seed", image: "seed_card.png", imageIndex: 6, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 3, baseHp: 30, skillName: "ウィップアタック", skillCost: 2, baseDmg: 40, ability: null },
    'seed_7': { name: "魔法植物", type: "seed", image: "seed_card.png", imageIndex: 7, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 3, baseHp: 30, skillName: "魔力吸収", skillCost: 2, baseDmg: 20, ability: "draw_card" },
    'seed_8': { name: "水やり", type: "seed", image: "seed_card.png", imageIndex: 8, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 2, baseHp: 30, skillName: "成長の兆し", skillCost: 1, baseDmg: 10, ability: "mana_ramp" },
    'seed_9': { name: "地中からの強襲", type: "seed", image: "seed_card.png", imageIndex: 9, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 2, baseHp: 20, skillName: "根っこ攻撃", skillCost: 1, baseDmg: 30, ability: "haste" },
    'seed_10': { name: "光合成", type: "seed", image: "seed_card.png", imageIndex: 10, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 4, baseHp: 40, skillName: "太陽の恵み", skillCost: 2, baseDmg: 40, ability: "life_drain" },
    'seed_11': { name: "枯れたつぼみ", type: "seed", image: "seed_card.png", imageIndex: 11, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 1, baseHp: 10, skillName: "しおれる", skillCost: 1, baseDmg: 10, ability: "death_bomb" },
    'seed_12': { name: "弾き飛ばす", type: "seed", image: "seed_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 2, baseHp: 40, skillName: "バウンス", skillCost: 2, baseDmg: 20, ability: "taunt" },
    'seed_13': { name: "夜の森の妖精", type: "seed", image: "seed_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 3, baseHp: 30, skillName: "妖精の粉", skillCost: 2, baseDmg: 30, ability: "debuff_attack" },
    'seed_14': { name: "進化の輝き", type: "seed", image: "seed_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 510, baseCost: 5, baseHp: 50, skillName: "開花の予感", skillCost: 2, baseDmg: 30, ability: "mana_ramp" },

    // 🎈 風船
    'balloon_0': { name: "氷の拳", type: "balloon", image: "balloon_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 2, baseHp: 30, skillName: "アイスパンチ", skillCost: 1, baseDmg: 30, ability: null },
    'balloon_1': { name: "魔法の射手", type: "balloon", image: "balloon_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 3, baseHp: 30, skillName: "マジックアロー", skillCost: 2, baseDmg: 40, ability: null },
    'balloon_2': { name: "氷のドーム", type: "balloon", image: "balloon_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 490, baseCost: 3, baseHp: 50, skillName: "絶対零度ガード", skillCost: 1, baseDmg: 10, ability: "taunt" },
    'balloon_3': { name: "炎の剣士", type: "balloon", image: "balloon_card.png", imageIndex: 3, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 30, skillName: "フレイムスラッシュ", skillCost: 2, baseDmg: 40, ability: null },
    'balloon_4': { name: "氷結の読書家", type: "balloon", image: "balloon_card.png", imageIndex: 4, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 30, skillName: "知識の探求", skillCost: 2, baseDmg: 20, ability: "draw_card" },
    'balloon_5': { name: "聖なる守護", type: "balloon", image: "balloon_card.png", imageIndex: 5, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 4, baseHp: 60, skillName: "ホーリーバリア", skillCost: 2, baseDmg: 20, ability: "taunt" },
    'balloon_6': { name: "水刃の剣士", type: "balloon", image: "balloon_card.png", imageIndex: 6, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 4, baseHp: 40, skillName: "アクアブレード", skillCost: 3, baseDmg: 50, ability: null },
    'balloon_7': { name: "光のビーム", type: "balloon", image: "balloon_card.png", imageIndex: 7, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 30, skillName: "ソーラーレイ", skillCost: 4, baseDmg: 70, ability: "debuff_attack" },
    'balloon_8': { name: "おやすみ風船", type: "balloon", image: "balloon_card.png", imageIndex: 8, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 1, baseHp: 20, skillName: "休息", skillCost: 1, baseDmg: 10, ability: "heal_self" },
    'balloon_9': { name: "風の竜巻", type: "balloon", image: "balloon_card.png", imageIndex: 9, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 30, skillName: "トルネード", skillCost: 2, baseDmg: 40, ability: "flight" },
    'balloon_10': { name: "宇宙の理", type: "balloon", image: "balloon_card.png", imageIndex: 10, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 50, skillName: "コスモパワー", skillCost: 3, baseDmg: 20, ability: "mana_ramp" },
    'balloon_11': { name: "立ち向かう風船", type: "balloon", image: "balloon_card.png", imageIndex: 11, offsetX: 0, offsetY: 1.5, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 40, skillName: "挑発", skillCost: 1, baseDmg: 10, ability: "burst_damage" },
    'balloon_12': { name: "トゲトゲ風船", type: "balloon", image: "balloon_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 2, baseHp: 30, skillName: "ニードルアタック", skillCost: 1, baseDmg: 30, ability: null },
    'balloon_13': { name: "次元の歪み", type: "balloon", image: "balloon_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 5, baseHp: 40, skillName: "ディメンション", skillCost: 3, baseDmg: 60, ability: "stealth" },
    'balloon_14': { name: "雷の譲渡", type: "balloon", image: "balloon_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 520, baseCost: 3, baseHp: 30, skillName: "スパーク", skillCost: 2, baseDmg: 30, ability: "draw_card" },

// 🍃 精霊 (Spirit) 進化ライン
    "spirit_type2_0": { "name": "スプリング・ピクシー", "type": "spirit_type2", "image": "spirit_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "春の息吹", "skillCost": 2, "baseDmg": 20, "ability": "wind_blessing", "evolvesFrom": "spirit" },
    "spirit_type2_2_0": { "name": "フラワースピリット", "type": "spirit_type2_2", "image": "spirit_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 60, "skillName": "癒やしの香", "skillCost": 3, "baseDmg": 40, "ability": "burst_spores", "evolvesFrom": "spirit_type2" },
    // "spirit_type2_3_0": { "name": "クリスタル・ロータス", "type": "spirit_type2_3", "image": "spirit_type2_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 100, "skillName": "幻光の反射", "skillCost": 4, "baseDmg": 50, "ability": "magic_reflect", "evolvesFrom": "spirit_type2_2" },
    "spirit_type4_0": { "name": "ウッド・ゴーレム", "type": "spirit_type4", "image": "spirit_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 70, "skillName": "丸太パンチ", "skillCost": 2, "baseDmg": 50, "ability": "taunt", "evolvesFrom": "spirit" },
    "spirit_type4_2_0": { "name": "エルダー・トレント", "type": "spirit_type4_2", "image": "spirit_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 100, "skillName": "大自然の怒り", "skillCost": 4, "baseDmg": 60, "ability": "thorns", "evolvesFrom": "spirit_type4" },
    // "spirit_type4_3_0": { "name": "フォレスト・ガーディアン", "type": "spirit_type4_3", "image": "spirit_type4_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 130, "skillName": "森羅万象撃", "skillCost": 5, "baseDmg": 90, "ability": "piercing_juggernaut", "evolvesFrom": "spirit_type4_2" },
    "spirit_type5_0": { "name": "ドライ・リーフ", "type": "spirit_type5", "image": "spirit_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 2, "baseHp": 30, "skillName": "かさかさの舞", "skillCost": 1, "baseDmg": 10, "ability": "mana_refund", "evolvesFrom": "spirit" },
    "spirit_type5_2_0": { "name": "オータム・リーフ", "type": "spirit_type5_2", "image": "spirit_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 50, "skillName": "紅葉の風", "skillCost": 2, "baseDmg": 30, "ability": "death_bomb", "evolvesFrom": "spirit_type5" },
    // "spirit_type5_3_0": { "name": "ウィンター・ウィル", "type": "spirit_type5_3", "image": "spirit_type5_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 100, "skillName": "絶対零度の静寂", "skillCost": 4, "baseDmg": 60, "ability": "absolute_sanctuary", "evolvesFrom": "spirit_type5_2" },
    "spirit_type1_0": { "name": "ポイズン・スポア", "type": "spirit_type1", "image": "spirit_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "猛毒胞子", "skillCost": 2, "baseDmg": 20, "ability": "venom_strike", "evolvesFrom": "spirit" },
    "spirit_type1_2_0": { "name": "マンドラゴラ・マザー", "type": "spirit_type1_2", "image": "spirit_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 70, "skillName": "発狂の悲鳴", "skillCost": 4, "baseDmg": 60, "ability": "curse_death", "evolvesFrom": "spirit_type1" },
    "spirit_type3_0": { "name": "リーフ・スカラー", "type": "spirit_type3", "image": "spirit_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "自然の記録", "skillCost": 2, "baseDmg": 30, "ability": "draw_card", "evolvesFrom": "spirit" },
    "spirit_type3_2_0": { "name": "オラクル・ツリー", "type": "spirit_type3_2", "image": "spirit_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 90, "skillName": "星の啓示", "skillCost": 0, "baseDmg": 40, "ability": "mana_sovereign", "evolvesFrom": "spirit_type3" },

    // 🧙 魔法使い (Magician) 進化ライン
    "magician_type4_0": { "name": "バトル・メイジ", "type": "magician_type4", "image": "magician_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "マジック・ブロウ", "skillCost": 2, "baseDmg": 40, "ability": "spell_echo", "evolvesFrom": "magician" },
    "magician_type4_2_0": { "name": "フレイム・マスター", "type": "magician_type4_2", "image": "magician_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "エクスプロージョン", "skillCost": 3, "baseDmg": 60, "ability": "burn_field", "evolvesFrom": "magician" },
    "magician_type4_3_0": { "name": "ウォー・ウォーロック", "type": "magician_type4_3", "image": "magician_type4_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 110, "skillName": "闘神のオーラ", "skillCost": 4, "baseDmg": 70, "ability": "impregnable_armor", "evolvesFrom": "magician_type4" },
    // "magician_type4_4_0": { "name": "ドラゴニック・メイジ", "type": "magician_type4_4", "image": "magician_type4_4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 120, "skillName": "竜鱗の拳", "skillCost": 5, "baseDmg": 90, "ability": "devour", "evolvesFrom": "magician_type4_3" },
    "magician_type1_0": { "name": "ヴェノム・ウィッチ", "type": "magician_type1", "image": "magician_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 50, "skillName": "カース・スペル", "skillCost": 2, "baseDmg": 30, "ability": "silence", "evolvesFrom": "magician" },
    "magician_type1_2_0": { "name": "ダーク・ウィザード", "type": "magician_type1_2", "image": "magician_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "ドレイン・タッチ", "skillCost": 3, "baseDmg": 40, "ability": "soul_drain", "evolvesFrom": "magician_type1" },
    "magician_type1_3_0": { "name": "アビス・ネクロマンサー", "type": "magician_type1_3", "image": "magician_type1_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 90, "skillName": "ソウル・リバース", "skillCost": 5, "baseDmg": 50, "ability": "raise_dead", "evolvesFrom": "magician_type1_2" },
    // "magician_type1_4_0": { "name": "デーモン・サマナー", "type": "magician_type1_4", "image": "magician_type1_4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 80, "skillName": "サクリファイス", "skillCost": 6, "baseDmg": 100, "ability": "doomsday_detonation", "evolvesFrom": "magician_type1_3" },
    "magician_type5_0": { "name": "グランド・メイガス", "type": "magician_type5", "image": "magician_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "洗練された魔術", "skillCost": 2, "baseDmg": 40, "ability": "mana_refund", "evolvesFrom": "magician" },
    "magician_type5_2_0": { "name": "タイム・ウォーカー", "type": "magician_type5_2", "image": "magician_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 80, "skillName": "クロノス・スライサー", "skillCost": 4, "baseDmg": 60, "ability": "time_manipulation", "evolvesFrom": "magician_type5" },
    "magician_type5_3_0": { "name": "アストラル・プロフェット", "type": "magician_type5_3", "image": "magician_type5_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 100, "skillName": "星の導き", "skillCost": 3, "baseDmg": 50, "ability": "absolute_sanctuary", "evolvesFrom": "magician_type5_2" },
    "magician_type2_0": { "name": "スター・イリュージョニスト", "type": "magician_type2", "image": "magician_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 50, "skillName": "イリュージョン", "skillCost": 2, "baseDmg": 30, "ability": "charm_enemy", "evolvesFrom": "magician" },
    "magician_type2_2_0": { "name": "アイス・クイーン", "type": "magician_type2_2", "image": "magician_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 70, "skillName": "フロスト・ノヴァ", "skillCost": 3, "baseDmg": 50, "ability": "fossilize", "evolvesFrom": "magician_type2" },
    "magician_type2_3_0": { "name": "プリズム・マギ", "type": "magician_type2_3", "image": "magician_type2_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 80, "skillName": "プリズム・リフレクト", "skillCost": 3, "baseDmg": 40, "ability": "magic_reflect", "evolvesFrom": "magician_type2_2" },
    // "magician_type2_4_0": { "name": "セレスティアル・プリンセス", "type": "magician_type2_4", "image": "magician_type2_4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 100, "skillName": "エンジェル・ハイロウ", "skillCost": 4, "baseDmg": 40, "ability": "mass_charm", "evolvesFrom": "magician_type2_3" },
    "magician_type3_0": { "name": "ステラ・スカラー", "type": "magician_type3", "image": "magician_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "天体観測", "skillCost": 1, "baseDmg": 20, "ability": "draw_card", "evolvesFrom": "magician" },
    "magician_type3_2_0": { "name": "コスモ・ルーラー", "type": "magician_type3_2", "image": "magician_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 100, "skillName": "グラビティ・フォール", "skillCost": 5, "baseDmg": 70, "ability": "mass_bounce", "evolvesFrom": "magician_type3" },
    "magician_type3_3_0": { "name": "アカシック・セージ", "type": "magician_type3_3", "image": "magician_type3_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 100, "skillName": "真理の門", "skillCost": 6, "baseDmg": 90, "ability": "absolute_evasion", "evolvesFrom": "magician_type3_2" },

    // 🐦 鳥 (Bird) 進化ライン
    "bird_type2_0": { "name": "フェアリーテイル", "type": "bird_type2", "image": "bird_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "魅惑の鱗粉", "skillCost": 2, "baseDmg": 20, "ability": "charm_enemy", "evolvesFrom": "bird" },
    "bird_type2_2_0": { "name": "セレスティアル・ピーコック", "type": "bird_type2_2", "image": "bird_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 80, "skillName": "銀河の尾羽", "skillCost": 4, "baseDmg": 60, "ability": "rebirth", "evolvesFrom": "bird_type2" },
    "bird_type4_0": { "name": "ハンターホーク", "type": "bird_type4", "image": "bird_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 50, "skillName": "ソニック・ダイブ", "skillCost": 3, "baseDmg": 50, "ability": "double_strike", "evolvesFrom": "bird" },
    "bird_type4_2_0": { "name": "ストーム・ガルーダ", "type": "bird_type4_2", "image": "bird_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 100, "skillName": "テンペスト", "skillCost": 5, "baseDmg": 80, "ability": "cataclysm", "evolvesFrom": "bird_type4" },
    "bird_type5_0": { "name": "ワイズオウル", "type": "bird_type5", "image": "bird_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 50, "skillName": "静寂の凝視", "skillCost": 2, "baseDmg": 30, "ability": "evasion", "evolvesFrom": "bird" },
    "bird_type5_2_0": { "name": "エンシェント・アーケオ", "type": "bird_type5_2", "image": "bird_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 100, "skillName": "始祖の鳴き声", "skillCost": 3, "baseDmg": 40, "ability": "absolute_sanctuary", "evolvesFrom": "bird_type5" },
    "bird_type1_0": { "name": "ナイトレイヴン", "type": "bird_type1", "image": "bird_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "凶兆のついばみ", "skillCost": 2, "baseDmg": 40, "ability": "discard_hand", "evolvesFrom": "bird" },
    "bird_type1_2_0": { "name": "カオス・コンドル", "type": "bird_type1_2", "image": "bird_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 70, "skillName": "デッド・ウィング", "skillCost": 4, "baseDmg": 80, "ability": "curse_death", "evolvesFrom": "bird_type1" },
    "bird_type3_0": { "name": "ルーンバード", "type": "bird_type3", "image": "bird_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 40, "skillName": "空中魔方陣", "skillCost": 3, "baseDmg": 40, "ability": "spell_echo", "evolvesFrom": "bird" },
    "bird_type3_2_0": { "name": "メカニックピジョン", "type": "bird_type3_2", "image": "bird_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 50, "skillName": "データリンク", "skillCost": 1, "baseDmg": 30, "ability": "mana_refund", "evolvesFrom": "bird" },
    "bird_type3_3_0": { "name": "アカシック・オウル", "type": "bird_type3_3", "image": "bird_type3_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 90, "skillName": "神眼の看破", "skillCost": 4, "baseDmg": 70, "ability": "absolute_evasion", "evolvesFrom": "bird_type3" },

    // ⚙️ ぜんまい (Machine) 進化ライン
    "machine_type2_0": { "name": "オルゴール・ドール", "type": "machine_type2", "image": "machine_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 60, "skillName": "ヒーリング・メロディ", "skillCost": 2, "baseDmg": 20, "ability": "heal_self", "evolvesFrom": "machine" },
    "machine_type2_2_0": { "name": "マジェスティック・クロック", "type": "machine_type2_2", "image": "machine_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 90, "skillName": "クロノス・ギア", "skillCost": 4, "baseDmg": 60, "ability": "time_manipulation", "evolvesFrom": "machine_type2" },
    "machine_type4_0": { "name": "ピストン・ワーカー", "type": "machine_type4", "image": "machine_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "スチームパンチ", "skillCost": 2, "baseDmg": 40, "ability": "haste", "evolvesFrom": "machine" },
    "machine_type4_2_0": { "name": "スチーム・ドレッドノート", "type": "machine_type4_2", "image": "machine_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 120, "skillName": "オーバードライブ", "skillCost": 5, "baseDmg": 80, "ability": "piercing_juggernaut", "evolvesFrom": "machine_type4" },
    "machine_type5_0": { "name": "アンティーク・ギア", "type": "machine_type5", "image": "machine_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 2, "baseHp": 50, "skillName": "サビついた回転", "skillCost": 1, "baseDmg": 30, "ability": "mana_refund", "evolvesFrom": "machine" },
    "machine_type5_2_0": { "name": "モス・マシナリー", "type": "machine_type5_2", "image": "machine_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 70, "skillName": "自然修復", "skillCost": 3, "baseDmg": 40, "ability": "burst_spores", "evolvesFrom": "machine_type5" },
    "machine_type5_3_0": { "name": "ロスト・テクノロジー", "type": "machine_type5_3", "image": "machine_type5_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 150, "skillName": "静寂なる起動", "skillCost": 4, "baseDmg": 60, "ability": "impregnable_armor", "evolvesFrom": "machine_type5" },
    "machine_type1_0": { "name": "カースド・ドール", "type": "machine_type1", "image": "machine_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "ホラー・アプローチ", "skillCost": 2, "baseDmg": 30, "ability": "death_bomb", "evolvesFrom": "machine" },
    "machine_type1_2_0": { "name": "スクラップ・ホラー", "type": "machine_type1_2", "image": "machine_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 120, "skillName": "デッドリー・アマルガム", "skillCost": 6, "baseDmg": 120, "ability": "doomsday_detonation", "evolvesFrom": "machine_type1" },
    "machine_type3_0": { "name": "ディファレンス・エンジン", "type": "machine_type3", "image": "machine_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "高速演算", "skillCost": 3, "baseDmg": 40, "ability": "spell_echo", "evolvesFrom": "machine" },
    "machine_type3_2_0": { "name": "クォンタム・クロックワーク", "type": "machine_type3_2", "image": "machine_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 100, "skillName": "特異点計算", "skillCost": 0, "baseDmg": 50, "ability": "infinite_gear", "evolvesFrom": "machine_type3" },

    // 🪨 ゴーレム (Stone) 進化ライン
    "stone_type2_0": { "name": "クリスタル・ゴーレム", "type": "stone_type2", "image": "stone_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 80, "skillName": "クリスタル・レイ", "skillCost": 3, "baseDmg": 40, "ability": "magic_reflect", "evolvesFrom": "stone" },
    "stone_type2_2_0": { "name": "ブリリアント・コロッサス", "type": "stone_type2_2", "image": "stone_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 180, "skillName": "ダイヤ・プレッシャー", "skillCost": 5, "baseDmg": 60, "ability": "pure_aegis", "evolvesFrom": "stone_type2" },
    "stone_type4_0": { "name": "マグマ・ギガント", "type": "stone_type4", "image": "stone_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 90, "skillName": "ヴォルカニック・スマッシュ", "skillCost": 4, "baseDmg": 60, "ability": "burn_field", "evolvesFrom": "stone" },
    "stone_type4_2_0": { "name": "アイアン・フォートレス", "type": "stone_type4_2", "image": "stone_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 100, "skillName": "鉄の城壁", "skillCost": 3, "baseDmg": 60, "ability": "counter_attack", "evolvesFrom": "stone" },
    "stone_type4_3_0": { "name": "メテオ・タイタン", "type": "stone_type4_3", "image": "stone_type4_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 10, "baseHp": 180, "skillName": "アース・シャター", "skillCost": 6, "baseDmg": 100, "ability": "trample", "evolvesFrom": "stone_type4" },
    "stone_type5_0": { "name": "モノリス・ルイン", "type": "stone_type5", "image": "stone_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 80, "skillName": "遺跡の守護", "skillCost": 2, "baseDmg": 30, "ability": "taunt", "evolvesFrom": "stone" },
    "stone_type5_2_0": { "name": "アストラル・モノリス", "type": "stone_type5_2", "image": "stone_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 140, "skillName": "悠久の刻", "skillCost": 4, "baseDmg": 30, "ability": "absolute_sanctuary", "evolvesFrom": "stone_type5" },
    "stone_type1_0": { "name": "カースド・ガーゴイル", "type": "stone_type1", "image": "stone_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 70, "skillName": "ダーク・ダイブ", "skillCost": 3, "baseDmg": 50, "ability": "soul_drain", "evolvesFrom": "stone" },
    "stone_type1_2_0": { "name": "ヴォイド・オブシディアン", "type": "stone_type1_2", "image": "stone_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 100, "skillName": "虚無の引力", "skillCost": 5, "baseDmg": 80, "ability": "void_counter", "evolvesFrom": "stone_type1" },
    "stone_type3_0": { "name": "ルーン・ゴーレム", "type": "stone_type3", "image": "stone_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "ルーン・バレット", "skillCost": 2, "baseDmg": 30, "ability": "counter_attack", "evolvesFrom": "stone" },
    "stone_type3_2_0": { "name": "オラクル・ストーン", "type": "stone_type3_2", "image": "stone_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 90, "skillName": "重力反発", "skillCost": 0, "baseDmg": 40, "ability": "mana_sovereign", "evolvesFrom": "stone_type3" },

    // 🎈 風船 (Balloon) 進化ライン
    "balloon_type2_0": { "name": "シャボン・スライム", "type": "balloon_type2", "image": "balloon_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "プリズム・バブル", "skillCost": 2, "baseDmg": 20, "ability": "debuff_attack", "evolvesFrom": "balloon" },
    "balloon_type2_2_0": { "name": "プリズム・ドロップ", "type": "balloon_type2_2", "image": "balloon_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 60, "skillName": "グラス・シャワー", "skillCost": 3, "baseDmg": 40, "ability": "magic_reflect", "evolvesFrom": "balloon_type2" },
    "balloon_type2_3_0": { "name": "ファンタジー・パレード", "type": "balloon_type2_3", "image": "balloon_type2_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 80, "skillName": "ドリーム・フェスティバル", "skillCost": 4, "baseDmg": 30, "ability": "mass_charm", "evolvesFrom": "balloon_type2_2" },
    "balloon_type4_0": { "name": "マッスル・バルーン", "type": "balloon_type4", "image": "balloon_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "バウンド・タックル", "skillCost": 2, "baseDmg": 40, "ability": "burst_damage", "evolvesFrom": "balloon" },
    "balloon_type4_2_0": { "name": "ホットエア・バルーン", "type": "balloon_type4_2", "image": "balloon_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 70, "skillName": "バーナー・フレイム", "skillCost": 3, "baseDmg": 50, "ability": "burn_field", "evolvesFrom": "balloon_type4" },
    "balloon_type4_3_0": { "name": "ヘビー・ゼペリン", "type": "balloon_type4_3", "image": "balloon_type4_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 130, "skillName": "カーペット・ボミング", "skillCost": 5, "baseDmg": 70, "ability": "impregnable_armor", "evolvesFrom": "balloon_type4_2" },
    "balloon_type1_0": { "name": "スモッグ・ファントム", "type": "balloon_type1", "image": "balloon_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "ポイズン・スモーク", "skillCost": 2, "baseDmg": 30, "ability": "curse_death", "evolvesFrom": "balloon" },
    "balloon_type1_2_0": { "name": "ダーク・マイン", "type": "balloon_type1_2", "image": "balloon_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 50, "skillName": "コンタクト・ボム", "skillCost": 4, "baseDmg": 80, "ability": "nova_burst", "evolvesFrom": "balloon_type1" },
    "balloon_type1_3_0": { "name": "ナイトメア・ブラスト", "type": "balloon_type1_3", "image": "balloon_type1_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 70, "skillName": "絶望の破裂", "skillCost": 5, "baseDmg": 60, "ability": "mass_bounce", "evolvesFrom": "balloon_type1_2" },
    "balloon_type5_0": { "name": "デフレート・スライム", "type": "balloon_type5", "image": "balloon_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 2, "baseHp": 20, "skillName": "しわしわガード", "skillCost": 1, "baseDmg": 10, "ability": "absolute_sanctuary", "evolvesFrom": "balloon" },
    "balloon_type3_0": { "name": "ウェザー・バルーン", "type": "balloon_type3", "image": "balloon_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 50, "skillName": "観測データ", "skillCost": 1, "baseDmg": 20, "ability": "draw_card", "evolvesFrom": "balloon" },
    "balloon_type3_2_0": { "name": "スコープ・バルーン", "type": "balloon_type3_2", "image": "balloon_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 50, "skillName": "レーザー・フォーカス", "skillCost": 3, "baseDmg": 40, "ability": "spell_echo", "evolvesFrom": "balloon_type3" },
    "balloon_type3_3_0": { "name": "サテライト・アイ", "type": "balloon_type3_3", "image": "balloon_type3_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 80, "skillName": "オービタル・ストライク", "skillCost": 5, "baseDmg": 70, "ability": "absolute_evasion", "evolvesFrom": "balloon_type3_2" },

    // 👻 ゴースト (Ghost) 進化ライン
    "ghost_type2_0": { "name": "ルミナス・ソウル", "type": "ghost_type2", "image": "ghost_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "導きの光", "skillCost": 2, "baseDmg": 30, "ability": "burst_spores", "evolvesFrom": "ghost" },
    "ghost_type2_2_0": { "name": "ホーリー・ファントム", "type": "ghost_type2_2", "image": "ghost_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 80, "skillName": "ディヴァイン・ライト", "skillCost": 4, "baseDmg": 60, "ability": "pure_aegis", "evolvesFrom": "ghost_type2" },
    "ghost_type4_0": { "name": "ポルターガイスト", "type": "ghost_type4", "image": "ghost_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 50, "skillName": "サイコ・クラッシュ", "skillCost": 3, "baseDmg": 50, "ability": "haunt", "evolvesFrom": "ghost" },
    "ghost_type4_2_0": { "name": "ファントム・ジャガーノート", "type": "ghost_type4_2", "image": "ghost_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 100, "skillName": "怨念の蹂躙", "skillCost": 5, "baseDmg": 80, "ability": "piercing_juggernaut", "evolvesFrom": "ghost_type4" },
    "ghost_type5_0": { "name": "エイシェント・レイス", "type": "ghost_type5", "image": "ghost_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 70, "skillName": "魂の吸収", "skillCost": 3, "baseDmg": 40, "ability": "soul_drain", "evolvesFrom": "ghost" },
    "ghost_type5_2_0": { "name": "エターナル・ファラオ", "type": "ghost_type5_2", "image": "ghost_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 130, "skillName": "王の呪い", "skillCost": 6, "baseDmg": 80, "ability": "soul_reap", "evolvesFrom": "ghost_type5" },
    "ghost_type1_0": { "name": "シャドウ・リーパー", "type": "ghost_type1", "image": "ghost_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 40, "skillName": "デス・サイズ", "skillCost": 3, "baseDmg": 70, "ability": "curse_death", "evolvesFrom": "ghost" },
    "ghost_type1_2_0": { "name": "デス・ブリンガー", "type": "ghost_type1_2", "image": "ghost_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 90, "skillName": "死の宣告", "skillCost": 5, "baseDmg": 100, "ability": "discard_hand", "evolvesFrom": "ghost_type1" },
    "ghost_type3_0": { "name": "アカデミー・ゴースト", "type": "ghost_type3", "image": "ghost_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "ポルター・リード", "skillCost": 2, "baseDmg": 30, "ability": "spell_echo", "evolvesFrom": "ghost" },
    "ghost_type3_2_0": { "name": "テレパス・ソウル", "type": "ghost_type3_2", "image": "ghost_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 50, "skillName": "マインド・ハック", "skillCost": 3, "baseDmg": 40, "ability": "charm_enemy", "evolvesFrom": "ghost_type3" },
    // "ghost_type3_3_0": { "name": "マスター・リッチ", "type": "ghost_type3_3", "image": "ghost_type3_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 100, "skillName": "アブソリュート・マジック", "skillCost": 6, "baseDmg": 90, "ability": "mass_bounce", "evolvesFrom": "ghost_type3_2" },

    // 🪲 かぶとむし (Beetle) 進化ライン
    "beetle_type4_0": { "name": "タイタン・ホーン", "type": "beetle_type4", "image": "beetle_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 80, "skillName": "ギガ・スロウ", "skillCost": 4, "baseDmg": 80, "ability": "trample", "evolvesFrom": "beetle" },
    "beetle_type5_0": { "name": "アンバー・スカラベ", "type": "beetle_type5", "image": "beetle_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 70, "skillName": "琥珀の盾", "skillCost": 2, "baseDmg": 20, "ability": "heavy_armor", "evolvesFrom": "beetle" },
    "beetle_type5_2_0": { "name": "エターナル・アンモナイト", "type": "beetle_type5_2", "image": "beetle_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 150, "skillName": "化石の檻", "skillCost": 4, "baseDmg": 50, "ability": "fossilize", "evolvesFrom": "beetle_type5" },
    "beetle_type2_0": { "name": "ジュエル・インセクト", "type": "beetle_type2", "image": "beetle_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 50, "skillName": "ジュエル・フラッシュ", "skillCost": 2, "baseDmg": 30, "ability": "magic_reflect", "evolvesFrom": "beetle" },
    "beetle_type2_2_0": { "name": "ルーセント・スタッグ", "type": "beetle_type2_2", "image": "beetle_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 60, "skillName": "ムーンライト・シザー", "skillCost": 3, "baseDmg": 50, "ability": "mass_charm", "evolvesFrom": "beetle" },
    "beetle_type2_3_0": { "name": "フェアリー・モルフォ", "type": "beetle_type2_3", "image": "beetle_type2_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 80, "skillName": "イリュージョン・ダンス", "skillCost": 4, "baseDmg": 50, "ability": "absolute_evasion", "evolvesFrom": "beetle_type2" },
    "beetle_type2_4_0": { "name": "セイクリッド・ビートル", "type": "beetle_type2_4", "image": "beetle_type2_4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 120, "skillName": "神光のオーラ", "skillCost": 5, "baseDmg": 80, "ability": "pure_aegis", "evolvesFrom": "beetle_type2_2" },
    "beetle_type3_0": { "name": "ブレイン・バグ", "type": "beetle_type3", "image": "beetle_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 60, "skillName": "フェロモン・コマンド", "skillCost": 0, "baseDmg": 20, "ability": "mana_sovereign", "evolvesFrom": "beetle" },
    "beetle_type1_0": { "name": "ブラッド・シザー", "type": "beetle_type1", "image": "beetle_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 60, "skillName": "ギロチン・シザー", "skillCost": 3, "baseDmg": 60, "ability": "haste", "evolvesFrom": "beetle" },

    // 🌱 つぼみ (Seed) 進化ライン
    "seed_type4_0": { "name": "ワイルド・ルーツ", "type": "seed_type4", "image": "seed_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 60, "skillName": "大地の怒り", "skillCost": 3, "baseDmg": 40, "ability": "devour", "evolvesFrom": "seed" },
    "seed_type4_2_0": { "name": "ガイア・オメガプランツ", "type": "seed_type4_2", "image": "seed_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 140, "skillName": "アース・イーター", "skillCost": 6, "baseDmg": 90, "ability": "apex_predator", "evolvesFrom": "seed_type4" },
    "seed_type1_0": { "name": "ペイン・アイビー", "type": "seed_type1", "image": "seed_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 50, "skillName": "ポイズン・ソーン", "skillCost": 2, "baseDmg": 30, "ability": "venom_strike", "evolvesFrom": "seed" },
    "seed_type1_2_0": { "name": "パラサイト・イグドラシル", "type": "seed_type1_2", "image": "seed_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 100, "skillName": "デッドリー・ルーツ", "skillCost": 5, "baseDmg": 60, "ability": "life_drain", "evolvesFrom": "seed_type1" },
    "seed_type5_0": { "name": "ミスティック・ボンサイ", "type": "seed_type5", "image": "seed_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 60, "skillName": "侘び寂びの心", "skillCost": 1, "baseDmg": 30, "ability": "mana_refund", "evolvesFrom": "seed" },
    "seed_type5_2_0": { "name": "ペトリファイド・ウッド", "type": "seed_type5_2", "image": "seed_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 120, "skillName": "永遠の年輪", "skillCost": 3, "baseDmg": 50, "ability": "impregnable_armor", "evolvesFrom": "seed_type5" },
    "seed_type3_0": { "name": "アーカイブ・ツリー", "type": "seed_type3", "image": "seed_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 4, "baseHp": 50, "skillName": "歴史の葉擦れ", "skillCost": 2, "baseDmg": 40, "ability": "draw_card", "evolvesFrom": "seed" },
    "seed_type3_2_0": { "name": "ニューロ・プラント", "type": "seed_type3_2", "image": "seed_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 70, "skillName": "シナプス・リンク", "skillCost": 3, "baseDmg": 40, "ability": "spell_echo", "evolvesFrom": "seed_type3" },
    "seed_type3_3_0": { "name": "アカシック・ツリー", "type": "seed_type3_3", "image": "seed_type3_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 10, "baseHp": 150, "skillName": "宇宙の理", "skillCost": 0, "baseDmg": 50, "ability": "mana_sovereign", "evolvesFrom": "seed_type3_2" },
    "seed_type2_0": { "name": "アロマ・ブルーム", "type": "seed_type2", "image": "seed_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 3, "baseHp": 40, "skillName": "魅惑の香り", "skillCost": 2, "baseDmg": 30, "ability": "charm_enemy", "evolvesFrom": "seed" },
    "seed_type2_2_0": { "name": "エデン・ブロッサム", "type": "seed_type2_2", "image": "seed_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 100, "skillName": "パラダイス・ロスト", "skillCost": 4, "baseDmg": 50, "ability": "mass_charm", "evolvesFrom": "seed_type2" },

    // 🐲 ドラゴン (Dragon) 進化ライン
    "dragon_type4_0": { "name": "グランド・ワイバーン", "type": "dragon_type4", "image": "dragon_type4_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 90, "skillName": "エアロ・ブラスト", "skillCost": 4, "baseDmg": 70, "ability": "piercing_juggernaut", "evolvesFrom": "dragon" },
    "dragon_type4_2_0": { "name": "ドレッド・バハムート", "type": "dragon_type4_2", "image": "dragon_type4_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 10, "baseHp": 180, "skillName": "メガフレア", "skillCost": 6, "baseDmg": 120, "ability": "cataclysm", "evolvesFrom": "dragon_type4" },
    "dragon_type1_0": { "name": "カースド・ドレイク", "type": "dragon_type1", "image": "dragon_type1_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 70, "skillName": "ミアズマ・ブレス", "skillCost": 3, "baseDmg": 50, "ability": "roar", "evolvesFrom": "dragon" },
    "dragon_type1_2_0": { "name": "アビス・ウロボロス", "type": "dragon_type1_2", "image": "dragon_type1_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 140, "skillName": "エンドレス・ヴォイド", "skillCost": 5, "baseDmg": 100, "ability": "void_counter", "evolvesFrom": "dragon_type1" },
    "dragon_type5_0": { "name": "エンシェント・ヴルム", "type": "dragon_type5", "image": "dragon_type5_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 6, "baseHp": 100, "skillName": "アース・クエイク", "skillCost": 4, "baseDmg": 60, "ability": "absolute_sanctuary", "evolvesFrom": "dragon" },
    "dragon_type5_2_0": { "name": "ジオ・ククルカン", "type": "dragon_type5_2", "image": "dragon_type5_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 160, "skillName": "星の息吹", "skillCost": 5, "baseDmg": 80, "ability": "wrath", "evolvesFrom": "dragon_type5" },
    "dragon_type3_0": { "name": "アーク・リヴァイアサン", "type": "dragon_type3", "image": "dragon_type3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 7, "baseHp": 100, "skillName": "ハイドロ・カノン", "skillCost": 4, "baseDmg": 60, "ability": "time_manipulation", "evolvesFrom": "dragon" },
    "dragon_type3_2_0": { "name": "ギャラクシー・ノヴァ", "type": "dragon_type3_2", "image": "dragon_type3_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 10, "baseHp": 150, "skillName": "スーパーノヴァ", "skillCost": 6, "baseDmg": 100, "ability": "nova_burst", "evolvesFrom": "dragon_type3" },
    "dragon_type2_0": { "name": "クリスタル・オーレリア", "type": "dragon_type2", "image": "dragon_type2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 5, "baseHp": 70, "skillName": "ジュエル・ブレス", "skillCost": 3, "baseDmg": 50, "ability": "charm_enemy", "evolvesFrom": "dragon" },
    "dragon_type2_2_0": { "name": "セラフィック・応龍", "type": "dragon_type2_2", "image": "dragon_type2_2_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 9, "baseHp": 130, "skillName": "神々の裁き", "skillCost": 5, "baseDmg": 80, "ability": "pure_aegis", "evolvesFrom": "dragon_type2" },
    "dragon_type2_3_0": { "name": "プリズマティカ", "type": "dragon_type2_3", "image": "dragon_type2_3_card.png", "imageIndex": 0, "offsetX": 0, "offsetY": 0, "zoomX": 300, "zoomY": 500, "baseCost": 8, "baseHp": 110, "skillName": "オーロラ・レイ", "skillCost": 4, "baseDmg": 70, "ability": "magic_reflect", "evolvesFrom": "dragon_type2" },

    // 🎒 サポートカード
    'support_0': { name: "鉄鉱石の塊", type: "item", image: "support_card.png", imageIndex: 0, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 1, baseHp: 0, skillName: "錬成", skillCost: 0, baseDmg: 0, ability: "item_hp_up" },
    'support_3': { name: "建築用の木材", type: "item", image: "support_card.png", imageIndex: 3, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 2, baseHp: 0, skillName: "拠点補修", skillCost: 0, baseDmg: 0, ability: "item_taunt" },
    'support_6': { name: "三種の霊薬", type: "item", image: "support_card.png", imageIndex: 6, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 3, baseHp: 0, skillName: "ガブ飲み", skillCost: 0, baseDmg: 0, ability: "item_heal_cleanse" },
    'support_9': { name: "古の魔導書", type: "item", image: "support_card.png", imageIndex: 9, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 3, baseHp: 0, skillName: "知識の探求", skillCost: 0, baseDmg: 0, ability: "item_draw" },
    'support_12': { name: "輝くクリスタル", type: "item", image: "support_card.png", imageIndex: 12, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 2, baseHp: 0, skillName: "マナ抽出", skillCost: 0, baseDmg: 0, ability: "item_mana_boost" },
    'support_1': { name: "静寂の森の小屋", type: "field", image: "support_card.png", imageIndex: 1, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 2, baseHp: 20, skillName: "拠点防衛", skillCost: 0, baseDmg: 0, ability: "field_forest" },
    'support_4': { name: "栄華を極めた城", type: "field", image: "support_card.png", imageIndex: 4, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 5, baseHp: 50, skillName: "城壁", skillCost: 0, baseDmg: 0, ability: "field_castle" },
    'support_7': { name: "廃れたカジノ", type: "field", image: "support_card.png", imageIndex: 7, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 3, baseHp: 10, skillName: "一攫千金", skillCost: 0, baseDmg: 0, ability: "field_casino" },
    'support_10': { name: "ドクロの洞窟", type: "field", image: "support_card.png", imageIndex: 10, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 3, baseHp: 30, skillName: "恐怖のオーラ", skillCost: 0, baseDmg: 0, ability: "field_miasma" },
    'support_13': { name: "結晶の鉱脈", type: "field", image: "support_card.png", imageIndex: 13, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 4, baseHp: 40, skillName: "採掘場", skillCost: 0, baseDmg: 0, ability: "field_mana" },
    'support_2': { name: "みんなで大漁", type: "action", image: "support_card.png", imageIndex: 2, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 2, baseHp: 0, skillName: "釣り上げる", skillCost: 0, baseDmg: 0, ability: "action_draw_3" },
    'support_5': { name: "武器の鍛造", type: "action", image: "support_card.png", imageIndex: 5, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 3, baseHp: 0, skillName: "カンカン", skillCost: 0, baseDmg: 20, ability: "action_atk_up" },
    'support_8': { name: "未知の洞窟探検", type: "action", image: "support_card.png", imageIndex: 8, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 3, baseHp: 0, skillName: "お宝発見", skillCost: 0, baseDmg: 0, ability: "action_search_evo" },
    'support_11': { name: "豊穣の畑仕事", type: "action", image: "support_card.png", imageIndex: 11, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 2, baseHp: 0, skillName: "収穫", skillCost: 0, baseDmg: 0, ability: "action_heal_face" },
    'support_14': { name: "キャンプファイヤー", type: "action", image: "support_card.png", imageIndex: 14, offsetX: 0, offsetY: 0, zoomX: 300, zoomY: 500, baseCost: 1, baseHp: 0, skillName: "大宴会", skillCost: 0, baseDmg: 0, ability: "action_heal_all" }
};

// // ==========================================
// // 2. ヘルパー関数（タイプ名取得など）
// // ==========================================
// window.getCardTypeName = function(type) {
//     if (type.includes('type1')) return '闇';
//     if (type.includes('type2')) return '美';
//     if (type.includes('type3_2')) return '賢+';
//     if (type.includes('type3')) return '賢';
//     if (type.includes('type4_2')) return '活+';
//     if (type.includes('type4')) return '活';
//     if (type.includes('type5')) return '老';
//     if (type === 'robot') return '機';
    
//     const map = {
//         'dragon':'竜', 'magician':'魔', 'spirit':'精', 'stone':'岩',
//         'machine':'械', 'ghost':'霊', 'bird':'鳥', 'beetle':'虫',
//         'seed':'草', 'balloon':'風', 'item':'具', 'action':'技', 'field':'地'
//     };
//     return map[type] || '無';
// };

// window.getEvolvesFromName = function(evolvesFromType) {
//     const map = {
//         'robot': '基本ロボット (機)',
//         'robot_type1': 'キリング系 (闇)',
//         'robot_type2': 'アイドル系 (美)',
//         'robot_type3': 'アナリティクス系 (賢)',
//         'robot_type3_2': 'マザー系 (賢+)',
//         'robot_type4': 'タンク系 (活)',
//         'robot_type4_2': 'アサルト系 (活+)',
//         'robot_type5': 'スクラップ系 (老)'
//     };
//     return map[evolvesFromType] || evolvesFromType;
// };

// window.getActualCost = function(owner, card) {
//     let cost = card.cost;
//     if (card.type === 'action') {
//         if (owner.field.some(c => c.ability === 'all_zero_cost' && !c.isDead)) return 0;
//         if (owner.field.some(c => c.ability === 'aura_action_cost' && !c.isDead)) cost = Math.max(0, cost - 1);
//     }
//     return cost;
// };

// window.checkDeath = function(card, owner, htmlId) {
//     if (card.hp <= 0 && !card.isDead) {
//         if (card.ability === "eternal_rebirth" && !card._reborn) {
//             card.hp = 190; 
//             card._reborn = true;
//             window.showVFX(htmlId, 'heal', '蘇生!');
//             window.showBattleMessage(`⏳ 【悠久の再生】\n${card.name} が時を越えて復活した！`);
//         } else {
//             card.isDead = true;
//             if (!owner.graveyard) owner.graveyard = [];
//             owner.graveyard.push(card); 
//         }
//     }
// };

// // ==========================================
// // 2. 引退したAIからカードを生成する関数 (進化カード＆ボーナス対応版)
// // ==========================================
// window.generateCardFromAI = function(aiPet) {
//     let rawRace = aiPet.currentSkin || aiPet.baseType || 'robot';
    
//     // 1. まず、引退時の姿（Skin）に完全一致するカード群を探す（進化系なら確定でヒットする）
//     let candidateKeys = Object.keys(window.TCG_MASTER).filter(key => window.TCG_MASTER[key].type === rawRace);
    
//     // 2. もし見つからなければ（seed_fire 等の属性違いの場合）、'_' で分割した基本種族で再検索
//     if (candidateKeys.length === 0) {
//         let baseRace = rawRace.split('_')[0];
//         candidateKeys = Object.keys(window.TCG_MASTER).filter(key => window.TCG_MASTER[key].type === baseRace);
//     }
    
//     // それでも無ければデフォルトの robot を対象にする
//     if (candidateKeys.length === 0) {
//         candidateKeys = Object.keys(window.TCG_MASTER).filter(key => window.TCG_MASTER[key].type === 'robot');
//     }

//     // 候補の中からランダムに1枚選ぶ（進化カードの場合は候補が1枚しかないので確定ドロップになる）
//     const masterId = candidateKeys[Math.floor(Math.random() * candidateKeys.length)];
//     const masterData = window.TCG_MASTER[masterId];
    
//     if (!masterData) return null;

//     // AIの最終ステータスをカードの強さに還元するボーナス
//     const hpBonus = Math.floor((aiPet.stats.power || 0) / 10);
//     const dmgBonus = Math.floor((aiPet.stats.intel || 0) / 10);

//     const newCard = {
//         uid: 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000), 
//         masterId: masterId, 
//         name: masterData.name, 
//         type: masterData.type,
//         cost: masterData.baseCost, 
//         hp: masterData.baseHp + hpBonus, // 育成ボーナス加算
//         skillName: masterData.skillName, 
//         skillCost: masterData.skillCost,
//         damage: masterData.baseDmg > 0 ? masterData.baseDmg + dmgBonus : 0, // 育成ボーナス加算
//         ability: masterData.ability, 
//         image: masterData.image, 
//         imageIndex: masterData.imageIndex,
//         // ==========================================
//         // ★ ここを追加！画像切り取り用の座標データをカードに引き継ぐ！
//         sx: masterData.sx,
//         sy: masterData.sy,
//         sw: masterData.sw,
//         sh: masterData.sh,
//         // ==========================================
//         evolvesFrom: masterData.evolvesFrom // ★超重要：進化元の情報を引き継ぐ
//     };

//     window.TCG.myCollection.push(newCard);
//     window.saveTCGData();
//     window.showCardUnlockPopup(newCard, "🎉 AIの生涯がカードに刻まれた！ 🎉");
//     return newCard;
// };

// window.unlockSupportCard = function(masterId, currentGen, categoryName = "サポート") {
//     const masterData = window.TCG_MASTER[masterId];
//     if (!masterData) return;
//     if (!window.TCG.unlockedHistory[currentGen]) window.TCG.unlockedHistory[currentGen] = [];
//     if (window.TCG.unlockedHistory[currentGen].includes(masterId)) return;

//     window.TCG.unlockedHistory[currentGen].push(masterId);

//     const newCard = {
//         uid: 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
//         masterId: masterId, name: masterData.name, type: masterData.type,
//         cost: masterData.baseCost, hp: masterData.baseHp,
//         skillName: masterData.skillName, skillCost: masterData.skillCost,
//         damage: masterData.baseDmg, ability: masterData.ability,
//         image: masterData.image, imageIndex: masterData.imageIndex
//     };

//     window.TCG.myCollection.push(newCard);
//     window.saveTCGData();
//     window.showCardUnlockPopup(newCard, `✨ 新しい${categoryName}カードの記憶を獲得！ ✨`);
// };

// // ==========================================
// // 4. HTML描画機能（新旧ハイブリッド・完全切り抜き対応版）
// // ==========================================
// window.renderCardHTML = function(card) {
//     // ==========================================
//     // ★執念のパッチ：古いセーブデータにも最新の画角を絶対に適用する！
//     // ==========================================
//     if (typeof window.TCG_MASTER !== 'undefined') {
//         let masterData = null;
        
//         // 1. まずカードのID（masterId）からデータを引っ張る
//         if (card.masterId && window.TCG_MASTER[card.masterId]) {
//             masterData = window.TCG_MASTER[card.masterId];
//         }

//         // 2. ★最強の安全装置★
//         // IDで見つからなかった場合、あるいは「見つかったけど sx が設定されていない古いデータ」だった場合、
//         // TCG_MASTER全体から「名前が同じで、かつ sx が調整済みの最新データ」を全力で探す！
//         if (!masterData || masterData.sx === undefined) {
//             const safeName = (card.name || "").trim();
            
//             // sxを持っている同名カードを探す！
//             const adjustedKey = Object.keys(window.TCG_MASTER).find(k => {
//                 const target = window.TCG_MASTER[k];
//                 return target && target.name && target.name.trim() === safeName && target.sx !== undefined;
//             });

//             if (adjustedKey) {
//                 masterData = window.TCG_MASTER[adjustedKey]; // 調整済みデータを発見！上書き！
//             } else {
//                 // sxがなくても、とりあえず名前が一致するものを保険で探す
//                 const fallbackKey = Object.keys(window.TCG_MASTER).find(k => {
//                     const target = window.TCG_MASTER[k];
//                     return target && target.name && target.name.trim() === safeName;
//                 });
//                 if (fallbackKey) masterData = window.TCG_MASTER[fallbackKey];
//             }
//         }

//         if (masterData) {
//             // TCG_MASTER側に調整済みの座標データがあれば、カードの見た目として強制適用する！
//             if (masterData.sx !== undefined) card.sx = masterData.sx;
//             if (masterData.sy !== undefined) card.sy = masterData.sy;
//             if (masterData.sw !== undefined) card.sw = masterData.sw;
//             if (masterData.sh !== undefined) card.sh = masterData.sh;
//             if (masterData.scaleX !== undefined) card.scaleX = masterData.scaleX;
//             if (masterData.scaleY !== undefined) card.scaleY = masterData.scaleY;
//             if (masterData.image) card.image = masterData.image; 
//         }
//     }
//     // ==========================================

//     const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;

//     let abilityText = card.abilityTextOverride || "";
//     if (!abilityText) {
//         if (card.ability === "taunt") abilityText = "【かばう】(相手の攻撃を代わりに受ける)";
//         if (card.ability === "stealth") abilityText = "【潜伏】(攻撃するまでターゲットにされない)";
//         if (card.ability === "heal_self") abilityText = "【修復】(自分のHPを回復する)";
//         if (card.ability === "draw_card") abilityText = "【ドロー】(山札からカードを引く)";
//         if (card.ability === "flight") abilityText = "【飛行】(かばうを無視して攻撃できる)";
//         if (card.ability === "mana_ramp") abilityText = "【成長】(自分の最大マナを+1する)";
//         if (card.ability === "pierce_recoil") abilityText = "【暴走回路】(かばう無視・攻撃時自身に10ダメ)";
//         if (card.ability === "aoe_heal_play") abilityText = "【ファンサービス】(登場時、味方全員を20回復)";
//         if (card.ability === "start_draw") abilityText = "【超演算】(自ターン開始時、1枚ドロー)";
//         if (card.ability === "aura_action_cost") abilityText = "【万能魔法】(場にいる間、アクションコスト-1)";
//         if (card.ability === "heavy_armor") abilityText = "【重装甲】(受けるダメージを常に-10)";
//         if (card.ability === "snipe_play") abilityText = "【殲滅モード】(登場時、ランダムな敵に30ダメ)";
//         if (card.ability === "end_heal") abilityText = "【悠久の風化】(ターン終了時、自身のHPを20回復)";
//         if (card.ability === "god_strike") abilityText = "【神の一撃】(貫通・攻撃時ランダムな敵1体即死)";
//         if (card.ability === "cyber_miracle") abilityText = "【電脳の奇跡】(ターン終了時、味方全回復＆最大HP+10)";
//         if (card.ability === "dimension_hack") abilityText = "【超次元ハック】(登場時、敵手札2枚破壊＆2枚ドロー)";
//         if (card.ability === "all_zero_cost") abilityText = "【森羅万象】(場にいる間、アクションのコストが0)";
//         if (card.ability === "absolute_field") abilityText = "【絶対領域】(受けるあらゆるダメージを1にする)";
//         if (card.ability === "crimson_end") abilityText = "【終末の紅蓮】(登場時、敵リーダーと全敵に50ダメ)";
//         if (card.ability === "star_breath") abilityText = "【星の息吹】(ターン開始時、マナ+2＆リーダー30回復)";
//         if (card.ability === "perfect_predation") abilityText = "【完全捕食】(登場時、ランダムな敵1体を破壊し吸収)";
//         if (card.ability === "nightmare_rule") abilityText = "【悪夢の君臨】(登場時、全敵のHPを強制半減)";
//         if (card.ability === "star_hope") abilityText = "【希望の星】(登場時、味方全回復＆全員に「かばう」付与)";
//         if (card.ability === "divine_grace") abilityText = "【神の恩寵】(ターン終了時、破壊された味方1体を蘇生)";
//         if (card.ability === "heaven_punishment") abilityText = "【天罰】(登場時、全敵モンスターに50ダメージ)";
//         if (card.ability === "event_horizon") abilityText = "【事象の地平】(ターン終了時、ランダムな敵1体を山札に戻す)";
//         if (card.ability === "truth_overwrite") abilityText = "【真理の書換】(登場時、3枚ドロー＆最大マナ+3)";
//         if (card.ability === "heaven_judgement") abilityText = "【天の裁き】(ターン開始時、敵リーダーと全敵に20ダメ)";
//         if (card.ability === "absolute_fortress") abilityText = "【絶対要塞】(受けるダメージを常に -20 する)";
//         if (card.ability === "dimension_drill") abilityText = "【次元穿孔】(貫通・与ダメと同じ値を敵リーダーにも与える)";
//         if (card.ability === "time_manipulation") abilityText = "【時空操作】(登場時、行動済みの味方を未行動にする)";
//         if (card.ability === "super_gravity") abilityText = "【超重力】(登場時、自身以外の全モンスターに100ダメ)";
//         if (card.ability === "eternal_rebirth") abilityText = "【悠久の再生】(破壊された時、一度だけHP満タンで復活)";
//     }

//     // ★HTML描画用の賢い画像パス解決（キー名でもファイル名でも動くようにする）
//     let imgPath = card.image || 'characters.png';
//     if (typeof imageSources !== 'undefined' && imageSources[imgPath]) {
//         imgPath = imageSources[imgPath]; // もし「dragon_card」のようなキー名なら、実際のパスに変換
//     }

//     const flavorText = (card.type === 'item' || card.type === 'action' || card.type === 'field')
//         ? "冒険の途中で見つけた、かけがえのない記憶の欠片。" 
//         : "AIがこれまでの人生で培ってきた、確かな成長の証。";

//     let displayCost = card.cost;
//     if (window.TCG_BATTLE && window.TCG_BATTLE.player) {
//         let owner = window.TCG_BATTLE.player.hand.includes(card) ? window.TCG_BATTLE.player : null;
//         if (!owner && window.TCG_BATTLE.cpu.hand.includes(card)) owner = window.TCG_BATTLE.cpu;
//         if (owner) displayCost = window.getActualCost(owner, card);
//     }
//     const costColor = displayCost < card.cost ? "#4CAF50" : "#FFD700";
//     const typeName = window.getCardTypeName(card.type);

//     let html = `
//     <div class="tcg-card" style="width: 180px; height: 260px; background-color: #222; border: 4px solid #555; border-radius: 12px; position: relative; font-family: sans-serif; color: white; box-shadow: 0 4px 8px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; user-select: none;">`;

//     if (isUnlocked) {
//         html += `<div style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; background: ${costColor}; color: #000; border-radius: 50%; font-weight: bold; font-size: 18px; display: flex; justify-content: center; align-items: center; border: 2px solid #FFF; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.5);">${displayCost}</div>`;
//     }

//     // ==========================================
//     // ★ 画像描画エリア（新・旧 ハイブリッド判定！）
//     // ==========================================
//     if (card.sx !== undefined) {
//         // ①【新仕様】ツールで調整済みのカード（sxのデータがある場合）
//         const scX = card.scaleX !== undefined ? card.scaleX : 1.0;
//         const scY = card.scaleY !== undefined ? card.scaleY : 1.0;
//         const sw = card.sw || 50;
//         const sh = card.sh || 50;
//         const sx = card.sx || 0;
//         const sy = card.sy || 0;

//         html += `
//         <div style="width: 100%; height: 120px; background-color: #1a1a1a; overflow: hidden; display: flex; justify-content: center; align-items: center; position: relative; border-bottom: 3px solid #444;">
//             <div style="
//                 width: ${sw}px; 
//                 height: ${sh}px; 
//                 background-image: url('${imgPath}'); 
//                 background-position: ${-sx}px ${-sy}px;  /* ★修正：-を中に入れることで、--20 が 20 に正しく計算される！ */
//                 background-repeat: no-repeat;
//                 transform: scale(${scX}, ${scY});
//                 transform-origin: center center;
//                 flex-shrink: 0;
//             "></div>
//         </div>`;
//     } else {
//         // ②【旧仕様】まだツールで調整していないカード（今までの等分方式）
//         const col = (card.imageIndex || 0) % 3;
//         const row = Math.floor((card.imageIndex || 0) / 3);
//         const finalPosX = (col * 50) + (card.offsetX || 0); 
//         const finalPosY = (row * 25) + (card.offsetY || 0); 
//         const zoomX = card.zoomX || 300; 
//         const zoomY = card.zoomY || 510;

//         html += `
//         <div style="width: 100%; height: 120px; background-image: url('${imgPath}'); background-size: ${zoomX}% ${zoomY}%; background-position: ${finalPosX}% ${finalPosY}%; background-repeat: no-repeat; border-bottom: 3px solid #444;"></div>`;
//     }
//     // ==========================================

//     html += `
//         <div style="padding: 4px 8px; font-weight: bold; font-size: 14px; background: linear-gradient(to right, #444, #222); border-bottom: 2px solid #111; text-shadow: 1px 1px 2px #000; display: flex; justify-content: space-between; align-items: center;">
//             <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;">${card.name}</span>
//             <span style="font-size: 11px; background: rgba(0,0,0,0.6); color: #00BCD4; padding: 2px 5px; border-radius: 4px; border: 1px solid #00BCD4; margin-left: 4px; white-space: nowrap;">${typeName}</span>
//         </div>`;

//     if (isUnlocked) {
//         html += `
//         <div style="flex: 1; padding: 6px; padding-bottom: 30px; font-size: 11px; color: #ddd; background: #2a2a2a; display: flex; flex-direction: column; gap: 4px;">
//             ${abilityText ? `<div style="color: #FF9800; font-weight: bold; font-size: 10px;">${abilityText}</div>` : ''}
//             <div style="margin-top: auto; padding-top: 4px; border-top: 1px solid #444;">
//                 <div style="display:flex; justify-content:space-between; align-items:flex-end;">
//                     <div style="display:flex; flex-direction:column; gap:3px;">
//                         <span style="display:inline-block; background:#00BCD4; color:#fff; border-radius:4px; padding:2px 4px; font-size:10px; width:fit-content;">コスト ${card.skillCost}</span>
//                         <span style="font-weight:bold; font-size:12px; color:#fff;">${card.skillName}</span>
//                     </div>
//                     ${card.damage > 0 ? `<div style="color:#ff5252; font-weight:bold; font-size:13px; white-space:nowrap;">${card.damage} ダメージ</div>` : ''}
//                 </div>
//             </div>
//         </div>
//         <div style="position: absolute; bottom: -4px; right: -4px; background: #4CAF50; color: white; padding: 4px 12px; border-radius: 8px 0 0 0; font-weight: bold; font-size: 16px; border: 2px solid #333; border-right: none; border-bottom: none; box-shadow: -2px -2px 4px rgba(0,0,0,0.3); z-index: 2;">HP ${card.hp}</div>`;
//     } else {
//         html += `<div style="flex: 1; padding: 15px 10px; font-size: 12px; line-height: 1.6; color: #bbb; background: #2a2a2a; text-align: center; display: flex; align-items: center; justify-content: center;"><span style="font-style: italic;">「${flavorText}」</span></div>`;
//     }
//     html += `</div>`;
//     return html;
// };

// // ==========================================
// // 5. UIとポップアップ関連
// // ==========================================
// window.showCardUnlockPopup = function(card, titleText = "カードを獲得しました！") {
//     let popup = document.getElementById('tcg-unlock-popup');
//     if (!popup) {
//         popup = document.createElement('div');
//         popup.id = 'tcg-unlock-popup';
//         popup.style.cssText = `
//             position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//             background: rgba(0,0,0,0.85); z-index: 100000;
//             display: flex; flex-direction: column; justify-content: center; align-items: center;
//             opacity: 0; transition: opacity 0.5s ease; pointer-events: none;
//         `;
//         document.body.appendChild(popup);
//     }
//     popup.innerHTML = `
//         <h2 style="color: #FFD700; text-shadow: 0 0 15px #FF9800; font-size: 28px; font-weight: bold; margin: 0 0 80px 0; z-index: 10; text-align: center;">${titleText}</h2>
//         <div style="transform: scale(1.5); box-shadow: 0 0 40px rgba(255,215,0,0.6); border-radius: 12px; margin-bottom: 90px; z-index: 5;">${window.renderCardHTML(card)}</div>
//         <button onclick="document.getElementById('tcg-unlock-popup').style.opacity = '0'; setTimeout(()=>document.getElementById('tcg-unlock-popup').style.pointerEvents = 'none', 500);" 
//             style="padding: 15px 40px; font-size: 20px; font-weight: bold; background: #FF9800; color: white; border: 3px solid #FFF; border-radius: 12px; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.6); z-index: 10; transition: transform 0.1s;"
//             onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
//             コレクションに収納する
//         </button>
//     `;
//     popup.style.pointerEvents = 'auto';
//     setTimeout(() => popup.style.opacity = '1', 50);
// };

// window.openCardBinder = function() {
//     let binder = document.getElementById('tcg-binder-ui');
//     if (!binder) {
//         binder = document.createElement('div');
//         binder.id = 'tcg-binder-ui';
//         binder.style.cssText = `
//             position: fixed; top: 5%; left: 5%; width: 90%; height: 90%;
//             background: #1a1a1a; border: 4px solid #FF9800; border-radius: 16px;
//             z-index: 9990; display: none; flex-direction: column; overflow: hidden;
//             box-shadow: 0 10px 30px rgba(0,0,0,0.8);
//         `;
//         document.body.appendChild(binder);
//     }
//     let gridHtml = '';
//     if (window.TCG.myCollection.length === 0) {
//         gridHtml = `<div style="color: #666; font-size: 20px; width: 100%; text-align: center; margin-top: 50px;">まだカードを持っていません。<br>AIを育成して引退させてみましょう。</div>`;
//     } else {
//         window.TCG.myCollection.forEach(card => {
//             gridHtml += `<div style="margin: 10px; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform='scale(1.05) translateY(-5px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">${window.renderCardHTML(card)}</div>`;
//         });
//     }
//     binder.innerHTML = `
//         <div style="background: #333; padding: 15px; border-bottom: 2px solid #555; display: flex; justify-content: space-between; align-items: center;">
//             <h2 style="margin: 0; color: #FFF;">📖 カードバインダー (所持数: ${window.TCG.myCollection.length} 枚)</h2>
//             <button onclick="document.getElementById('tcg-binder-ui').style.display = 'none';" style="background: #ff5252; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;">閉じる ✖</button>
//         </div>
//         <div style="flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-wrap: wrap; justify-content: flex-start; align-content: flex-start; background: #222;">${gridHtml}</div>
//     `;
//     binder.style.display = 'flex';
// };

// // ==========================================
// // 6. デッキ編成システム
// // ==========================================
// window.TCG.editingDeck = [];

// window.openDeckBuilder = function() {
//     let builderUI = document.getElementById('tcg-deck-builder');
//     const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
    
//     const uiTitle = isUnlocked ? "🛠️ デッキ編成" : "📖 思い出の整理";
//     const uiCountUnit = isUnlocked ? "枚" : "個";
//     const uiSaveBtn = isUnlocked ? "デッキを保存" : "アルバムを保存";
//     const uiColArea = isUnlocked ? "🗃️ コレクション（タップでデッキに追加）" : "🗃️ 集めた思い出（タップでアルバムに配置）";
//     const uiDeckArea = isUnlocked ? "🃏 デッキ（タップで外す）" : "📖 アルバムのページ（タップで外す）";
    
//     if (!builderUI) {
//         builderUI = document.createElement('div');
//         builderUI.id = 'tcg-deck-builder';
//         builderUI.style.cssText = `
//             position: fixed; top: 2%; left: 2%; width: 96%; height: 96%;
//             background: #1a1a1a; border: 4px solid #4CAF50; border-radius: 12px;
//             z-index: 10000; display: flex; flex-direction: column; overflow: hidden;
//             box-shadow: 0 10px 40px rgba(0,0,0,0.8); font-family: sans-serif;
//         `;
//         builderUI.innerHTML = `
//             <div style="background: #2E7D32; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1B5E20;">
//                 <h2 id="db-title-text" style="margin: 0; color: #FFF; font-size: 22px;">
//                     ${uiTitle} <span style="font-size: 16px; margin-left: 15px; background: #1B5E20; padding: 5px 10px; border-radius: 20px;">
//                     現在: <span id="db-count" style="color:#FFD700; font-weight:bold; font-size:20px;">0</span> ${uiCountUnit} (最低60${uiCountUnit})
//                     </span>
//                 </h2>
//                 <div>
//                     <button id="db-save-btn" onclick="saveDeck()" style="background: #FF9800; color: #FFF; font-weight: bold; border: 2px solid #FFF; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px; margin-right: 10px;">${uiSaveBtn}</button>
//                     <button onclick="document.getElementById('tcg-deck-builder').style.display='none'" style="background: #666; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer;">閉じる ✖</button>
//                 </div>
//             </div>
//             <div style="flex: 1; display: flex; overflow: hidden;">
//                 <div style="flex: 3; background: #222; display: flex; flex-direction: column; border-right: 4px solid #444;">
//                     <div id="db-col-header" style="padding: 10px; background: #333; color: #aaa; text-align: center; font-weight: bold; border-bottom: 1px solid #111;">${uiColArea}</div>
//                     <div style="padding: 10px; background: #2a2a2a; border-bottom: 2px solid #111; display: flex; gap: 10px;">
//                         <input type="text" id="db-search-name" placeholder="🔍 カード名で検索..." oninput="refreshDeckBuilderView()" style="flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #555; background: #111; color: white; font-size: 14px;">
//                         <select id="db-filter-type" onchange="refreshDeckBuilderView()" style="padding: 8px; border-radius: 6px; border: 1px solid #555; background: #111; color: white; font-size: 14px; cursor: pointer;">
//                             <option value="all">🌟 すべてのカード</option>
//                             <option value="evolution">✨ 進化モンスターのみ</option>
//                             <option value="monster_basic">🟢 基本モンスターのみ</option>
//                             <option value="action">⚡ アクションカード</option>
//                             <option value="item">🎒 アイテムカード</option>
//                             <option value="field">⛺ フィールドカード</option>
//                             <option value="robot">🤖 ロボット種族</option>
//                         </select>
//                     </div>
//                     <div id="db-collection-area" style="flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 10px;"></div>
//                 </div>
//                 <div style="flex: 2; background: #111; display: flex; flex-direction: column;">
//                     <div id="db-deck-header" style="padding: 10px; background: #000; color: #4CAF50; text-align: center; font-weight: bold; border-bottom: 2px solid #222;">${uiDeckArea}</div>
//                     <div id="db-deck-area" style="flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 10px;"></div>
//                 </div>
//             </div>
//         `;
//         document.body.appendChild(builderUI);
//     } else {
//         const titleSpan = document.getElementById('db-title-text');
//         if (titleSpan) titleSpan.innerHTML = `${uiTitle} <span style="font-size: 16px; margin-left: 15px; background: #1B5E20; padding: 5px 10px; border-radius: 20px;">現在: <span id="db-count" style="color:#FFD700; font-weight:bold; font-size:20px;">0</span> ${uiCountUnit} (最低60${uiCountUnit})</span>`;
//         const saveBtn = document.getElementById('db-save-btn');
//         if (saveBtn) saveBtn.innerText = uiSaveBtn;
//         const colHeader = document.getElementById('db-col-header');
//         if (colHeader) colHeader.innerText = uiColArea;
//         const deckHeader = document.getElementById('db-deck-header');
//         if (deckHeader) deckHeader.innerText = uiDeckArea;
        
//         const searchInput = document.getElementById('db-search-name');
//         if (searchInput) searchInput.value = "";
//         const filterSelect = document.getElementById('db-filter-type');
//         if (filterSelect) filterSelect.value = "all";
//     }

//     builderUI.style.display = 'flex';
//     window.refreshDeckBuilderView(); 
// };

// window.refreshDeckBuilderView = function() {
//     const collectionArea = document.getElementById('db-collection-area');
//     const deckArea = document.getElementById('db-deck-area');
//     const countDisplay = document.getElementById('db-count');
    
//     const searchInput = document.getElementById('db-search-name');
//     const searchName = searchInput ? searchInput.value.toLowerCase() : "";
//     const filterSelect = document.getElementById('db-filter-type');
//     const filterType = filterSelect ? filterSelect.value : "all";

//     let collectionHtml = '';
//     let deckHtml = '';
//     let deckCount = window.TCG.editingDeck.length;

//     if (countDisplay) {
//         countDisplay.innerText = deckCount;
//         countDisplay.style.color = deckCount >= 60 ? "#4CAF50" : "#FFD700";
//     }

//     const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
//     const emptyDeckText = isUnlocked ? "デッキは空です" : "アルバムのページは空です";

//     window.TCG.editingDeck.forEach(uid => {
//         const card = window.TCG.myCollection.find(c => c.uid === uid);
//         if (card) deckHtml += `<div onclick="window.toggleCardInDeck('${card.uid}')" style="transform: scale(0.65); transform-origin: top left; width: 117px; height: 169px; cursor: pointer; transition: transform 0.1s;" onmouseover="this.style.transform='scale(0.7) translateY(-5px)'" onmouseout="this.style.transform='scale(0.65) translateY(0)'">${window.renderCardHTML(card)}</div>`;
//     });

//     window.TCG.myCollection.forEach(card => {
//         if (!window.TCG.editingDeck.includes(card.uid)) {
//             let match = true;
//             if (searchName && !card.name.toLowerCase().includes(searchName)) match = false;
//             if (match && filterType !== 'all') {
//                 if (filterType === 'evolution') {
//                     if (!card.evolvesFrom) match = false; 
//                 } else if (filterType === 'monster_basic') {
//                     if (card.evolvesFrom || ['action', 'item', 'field'].includes(card.type)) match = false;
//                 } else if (['action', 'item', 'field'].includes(filterType)) {
//                     if (card.type !== filterType) match = false;
//                 } else {
//                     if (!card.type.startsWith(filterType)) match = false;
//                 }
//             }
//             if (match) collectionHtml += `<div onclick="window.toggleCardInDeck('${card.uid}')" style="transform: scale(0.65); transform-origin: top left; width: 117px; height: 169px; cursor: pointer; transition: transform 0.1s;" onmouseover="this.style.transform='scale(0.7) translateY(-5px)'" onmouseout="this.style.transform='scale(0.65) translateY(0)'">${window.renderCardHTML(card)}</div>`;
//         }
//     });

//     if (collectionArea) collectionArea.innerHTML = collectionHtml || '<div style="color:#666; width:100%; text-align:center; padding-top: 20px;">条件に合うカードが見つかりません</div>';
//     if (deckArea) deckArea.innerHTML = deckHtml || `<div style="color:#666; width:100%; text-align:center; padding-top: 20px;">${emptyDeckText}</div>`;
// };

// window.toggleCardInDeck = function(uid) {
//     const index = window.TCG.editingDeck.indexOf(uid);
//     if (index > -1) window.TCG.editingDeck.splice(index, 1);
//     else window.TCG.editingDeck.push(uid); 
//     window.refreshDeckBuilderView();
// };

// window.saveDeck = function() {
//     const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
//     if (window.TCG.editingDeck.length < 60) {
//         if(isUnlocked) alert(`デッキは最低60枚必要です！\n（現在は ${window.TCG.editingDeck.length} 枚です）`);
//         else alert(`アルバムを完成させるには、記憶が最低60個必要です！\n（現在は ${window.TCG.editingDeck.length} 個です）`);
//         return;
//     }
//     window.TCG.decks[0] = [...window.TCG.editingDeck]; 
//     window.saveTCGData();
//     if(isUnlocked) alert("🎉 デッキを保存しました！これでバトルに挑めます！");
//     else alert("🎉 思い出のアルバムが完成しました……！\n（何かが起こる予感がする…！）");
//     document.getElementById('tcg-deck-builder').style.display = 'none';
// };

// // ==========================================
// // 7. バトルシステム本体
// // ==========================================
// window.TCG_BATTLE = {
//     player: { hp: 200, maxMana: 1, currentMana: 1, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
//     cpu:    { hp: 200, maxMana: 1, currentMana: 1, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
//     turn: 1, selectedAttackerIndex: -1, selectedHandCardIndex: -1, _skipDefendHint: false
// };

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// window.startBattle = function(enemyData = null) {
//     if (!window.TCG.decks[0] || window.TCG.decks[0].length < 60) {
//         alert("デッキが保存されていないか、60枚以上ありません！先にデッキ編成を完了してください。");
//         return;
//     }

//     window.TCG_BATTLE = {
//         player: { hp: 200, maxMana: 1, currentMana: 1, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
//         cpu:    { hp: 200, maxMana: 1, currentMana: 1, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
//         turn: 1, selectedAttackerIndex: -1, selectedHandCardIndex: -1, _skipDefendHint: false
//     };
//     const p = window.TCG_BATTLE.player;
//     const cpu = window.TCG_BATTLE.cpu;

//     let battleUI = document.getElementById('tcg-battle-ui');
//     if (!battleUI) {
//         battleUI = document.createElement('div');
//         battleUI.id = 'tcg-battle-ui';
//         battleUI.style.cssText = `
//             position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//             background: #2a2a2a; z-index: 20000; display: flex; flex-direction: column; 
//             font-family: sans-serif; color: white; overflow: hidden;
//         `;
//         document.body.appendChild(battleUI);
//     }

//     if (!document.getElementById('tcg-scroll-styles')) {
//         const style = document.createElement('style');
//         style.id = 'tcg-scroll-styles';
//         style.innerHTML = `
//             .tcg-board-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.4) rgba(0,0,0,0.3); }
//             .tcg-board-scroll::-webkit-scrollbar { height: 8px; }
//             .tcg-board-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 4px; margin: 0 20px; }
//             .tcg-board-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.4); border-radius: 4px; }
//             .tcg-board-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.7); }
//         `;
//         document.head.appendChild(style);
//     }

//     p.deck = window.TCG.decks[0].map(uid => {
//         const originalCard = window.TCG.myCollection.find(c => c.uid === uid);
//         if (!originalCard) return null;
//         let cardCopy = JSON.parse(JSON.stringify(originalCard));
//         let master = window.TCG_MASTER[cardCopy.masterId];
//         if (master) cardCopy.hp = Math.max(cardCopy.hp, master.baseHp);
//         cardCopy.isDead = false; cardCopy.canAttack = false; cardCopy.isDefending = false;
//         return cardCopy;
//     }).filter(c => c !== null);
//     shuffleArray(p.deck);

//     if (enemyData && enemyData.deck) {
//         cpu.deck = enemyData.deck.map((dCard, i) => {
//             let master = window.TCG_MASTER[dCard.masterId];
//             if(!master) return null;
//             return {
//                 uid: 'ghost_' + i, masterId: dCard.masterId, name: dCard.name || master.name, type: master.type,
//                 cost: master.baseCost, hp: dCard.hp || master.baseHp, 
//                 skillName: master.skillName, skillCost: master.skillCost, damage: dCard.damage || master.baseDmg, 
//                 ability: master.ability, image: master.image, imageIndex: master.imageIndex,
//                 offsetX: master.offsetX, offsetY: master.offsetY, zoomX: master.zoomX, zoomY: master.zoomY, canAttack: false, isDefending: false
//             };
//         }).filter(c => c !== null);
//         if(cpu.deck.length < 60) {
//             alert("敵のデッキデータが不完全です。通常のCPUと対戦します。"); enemyData = null;
//         } else { shuffleArray(cpu.deck); }
//     } 

//     if (!enemyData || !enemyData.deck) {
//         const allMasterKeys = Object.keys(window.TCG_MASTER);
//         for (let i = 0; i < Math.max(60, p.deck.length); i++) {
//             let randomKey = allMasterKeys[Math.floor(Math.random() * allMasterKeys.length)];
//             let master = window.TCG_MASTER[randomKey];
//             cpu.deck.push({
//                 uid: 'cpu_' + i, masterId: randomKey, name: master.name, type: master.type,
//                 cost: master.baseCost, hp: master.baseHp, skillName: master.skillName,
//                 skillCost: master.skillCost, damage: master.baseDmg, ability: master.ability,
//                 image: master.image, imageIndex: master.imageIndex, offsetX: master.offsetX,
//                 offsetY: master.offsetY, zoomX: master.zoomX, zoomY: master.zoomY, canAttack: false, isDefending: false
//             });
//         }
//     }

//     window.renderBattleBoard();

//     let cpuNameLabel = document.getElementById('cpu-name-label');
//     if (!cpuNameLabel) {
//         cpuNameLabel = document.createElement('div');
//         cpuNameLabel.id = 'cpu-name-label';
//         cpuNameLabel.style.cssText = 'position:absolute; top:20px; right:30px; color:#FF5252; font-weight:bold; font-size:24px; text-shadow:0 0 10px #000; z-index:100;';
//         battleUI.appendChild(cpuNameLabel);
//     }
//     cpuNameLabel.innerHTML = enemyData ? `VS ${enemyData.playerName}` : "VS 名もなきCPU";
    
//     battleUI.style.display = 'flex';

//     const blocker = document.createElement('div');
//     blocker.id = 'tcg-battle-blocker';
//     blocker.style.cssText = `position: fixed; top:0; left:0; width:100%; height:100%; z-index:25000;`;
//     document.body.appendChild(blocker);

//     const splash = document.createElement('div');
//     splash.id = 'tcg-battle-splash';
//     splash.style.cssText = `
//         position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//         background: rgba(0,0,0,0.85); z-index: 26000; display: flex;
//         justify-content: center; align-items: center; color: white;
//         font-size: 80px; font-weight: bold; font-style: italic; text-align:center; line-height:1.2;
//         text-shadow: 0 0 30px #FF9800, 5px 5px 0 #000;
//         opacity: 0; transform: scale(1.5); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//     `;
//     splash.innerHTML = enemyData ? `ONLINE BATTLE !!<br><span style="font-size:50px; color:#4fc3f7;">VS ${enemyData.playerName}</span>` : "BATTLE START !!";
//     document.body.appendChild(splash);

//     setTimeout(() => { splash.style.opacity = '1'; splash.style.transform = 'scale(1)'; }, 50);

//     setTimeout(() => {
//         splash.style.opacity = '0';
//         splash.style.transform = 'scale(0.8)';
//         setTimeout(() => splash.remove(), 500);

//         let drawCount = 0;
//         const drawTimer = setInterval(() => {
//             if (drawCount < 5) {
//                 p.hand.push(p.deck.shift());
//                 cpu.hand.push(cpu.deck.shift());
//                 window.showBattleMessage(`シュッ！ (手札: ${drawCount + 1}枚)`, false, 250);
//                 window.renderBattleBoard();
//                 drawCount++;
//             } else {
//                 clearInterval(drawTimer);
//                 blocker.remove(); 
//                 window.showBattleMessage("✨ あなたの先行でスタート！\nマナを使ってカードを出そう！", false, 3000);
//             }
//         }, 350); 
//     }, 1500); 
// };

// // ==========================================
// // 8. VFX（視覚効果）＆ メッセージエンジン
// // ==========================================
// if (!document.getElementById('tcg-vfx-styles')) {
//     const style = document.createElement('style');
//     style.id = 'tcg-vfx-styles';
//     style.innerHTML = `
//         @keyframes slideUpFade { 0% { transform: translate(-50%, 0); opacity: 0; } 10% { transform: translate(-50%, -20px); opacity: 1; } 80% { transform: translate(-50%, -20px); opacity: 1; } 100% { transform: translate(-50%, -40px); opacity: 0; } }
//         @keyframes floatDmg { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(-50%, -120px) scale(1.5); opacity: 0; } }
//         @keyframes slashAnim { 0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.5); opacity: 1; } 100% { transform: translate(-50%, -50%) rotate(20deg) scale(2.5); opacity: 0; } }
//         @keyframes cardDestroy {
//             0% { transform: scale(0.65) rotate(0deg); filter: brightness(1) grayscale(0%); opacity: 1; }
//             20% { transform: scale(0.7) rotate(-5deg); filter: brightness(2) grayscale(0%); opacity: 1; }
//             50% { transform: scale(0.6) rotate(10deg); filter: brightness(0.5) grayscale(100%); opacity: 0.8; }
//             100% { transform: scale(0) rotate(-20deg); filter: brightness(0) grayscale(100%); opacity: 0; }
//         }
//         @keyframes screenHit {
//             0% { transform: translate(0, 0); box-shadow: inset 0 0 0 rgba(255,0,0,0); }
//             10% { transform: translate(-15px, 10px); box-shadow: inset 0 0 150px rgba(255,0,0,0.9); }
//             20% { transform: translate(15px, -10px); }
//             30% { transform: translate(-15px, -10px); }
//             40% { transform: translate(15px, 10px); }
//             50% { transform: translate(-10px, 5px); box-shadow: inset 0 0 80px rgba(255,0,0,0.6); }
//             100% { transform: translate(0, 0); box-shadow: inset 0 0 0 rgba(255,0,0,0); }
//         }
//         .screen-shake-effect { animation: screenHit 0.5s ease-out; }
//     `;
//     document.head.appendChild(style);
// }

// window.showBattleMessage = function(text, isError = false, duration = 2000) {
//     const ui = document.getElementById('tcg-battle-ui');
//     if (!ui) return;
//     const existingCount = document.querySelectorAll('.battle-msg').length;
//     const topPos = 40 + (existingCount * 8);

//     const msg = document.createElement('div');
//     msg.className = 'battle-msg';
//     msg.innerHTML = text;
//     msg.style.cssText = `
//         position: absolute; top: ${topPos}%; left: 50%;
//         background: ${isError ? 'rgba(220, 20, 20, 0.95)' : 'rgba(20, 120, 255, 0.95)'};
//         color: #fff; padding: 15px 40px; border-radius: 12px; border: 2px solid #fff;
//         font-size: 22px; font-weight: bold; pointer-events: none; z-index: 100000;
//         box-shadow: 0 10px 20px rgba(0,0,0,0.5); text-align: center; white-space: pre-wrap;
//         animation: slideUpFade ${duration}ms forwards;
//     `;
//     ui.appendChild(msg);
//     setTimeout(() => msg.remove(), duration);
// };

// window.showVFX = function(targetId, type, text = "") {
//     const target = document.getElementById(targetId);
//     if (!target) return;
//     const rect = target.getBoundingClientRect();
//     const ui = document.getElementById('tcg-battle-ui');
//     if (!ui) return;
    
//     const vfxNode = document.createElement('div');
//     vfxNode.style.cssText = `
//         position: absolute; left: ${rect.left + rect.width / 2}px; top: ${rect.top + rect.height / 2}px;
//         pointer-events: none; z-index: 99999;
//     `;

//     if (type === 'damage' || type === 'heal') {
//         const isHeal = type === 'heal';
//         vfxNode.innerText = (isHeal ? "+" : "-") + text;
//         vfxNode.style.color = isHeal ? '#4CAF50' : '#ff5252';
//         vfxNode.style.fontWeight = '900';
//         vfxNode.style.fontSize = '45px';
//         vfxNode.style.textShadow = '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000';
//         vfxNode.style.animation = 'floatDmg 1.2s ease-out forwards';
//     } else if (type === 'slash') {
//         vfxNode.innerText = "💥";
//         vfxNode.style.fontSize = '80px';
//         vfxNode.style.animation = 'slashAnim 0.3s ease-out forwards';
//     }
//     ui.appendChild(vfxNode);
//     setTimeout(() => vfxNode.remove(), 1200);
// };

// // ==========================================
// // 9. バトルの描画と進行ロジック
// // ==========================================
// window.showCardDetailModal = function(ownerType, index) {
//     const card = ownerType === 'player' ? window.TCG_BATTLE.player.field[index] : window.TCG_BATTLE.cpu.field[index];
//     if (!card) return;

//     let modal = document.getElementById('tcg-card-detail-modal');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'tcg-card-detail-modal';
//         modal.style.cssText = `
//             position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//             background: rgba(0,0,0,0.85); z-index: 40000;
//             display: flex; flex-direction: column; justify-content: center; align-items: center;
//             cursor: pointer;
//         `;
//         modal.onclick = () => { modal.style.display = 'none'; };
//         document.body.appendChild(modal);
//     }
    
//     modal.innerHTML = `
//         <div style="margin-bottom: 30px; color: #00BCD4; font-size: 24px; font-weight: bold; text-shadow: 0 2px 4px #000;">
//             🔍 ${ownerType === 'player' ? '味方' : '敵'}のカード詳細
//         </div>
//         <div style="transform: scale(1.8); box-shadow: 0 0 40px rgba(0, 188, 212, 0.6); border-radius: 12px; pointer-events: none;">
//             ${window.renderCardHTML(card)}
//         </div>
//         <div style="margin-top: 100px; color: #aaa; font-size: 16px; background: rgba(0,0,0,0.5); padding: 10px 20px; border-radius: 20px;">
//             画面のどこかをクリックして閉じる
//         </div>
//     `;
//     modal.style.display = 'flex';
// };

// window.renderBattleBoard = function() {
//     const battleUI = document.getElementById('tcg-battle-ui');
//     const p = window.TCG_BATTLE.player;
//     const cpu = window.TCG_BATTLE.cpu;
//     window.TCG_BATTLE.selectedAttackerIndex = window.TCG_BATTLE.selectedAttackerIndex ?? -1;
//     window.TCG_BATTLE.selectedHandCardIndex = window.TCG_BATTLE.selectedHandCardIndex ?? -1;
//     const isTargeting = window.TCG_BATTLE.selectedAttackerIndex !== -1;
//     const isEvoMode = window.TCG_BATTLE.selectedHandCardIndex !== -1;

//     let handHtml = p.hand.map((card, index) => {
//         let actualCost = window.getActualCost(p, card);
//         const canPlay = p.currentMana >= actualCost;
//         const isSelected = window.TCG_BATTLE.selectedHandCardIndex === index;
//         const opacity = canPlay ? "1" : "0.5";
//         const transform = isSelected ? "scale(0.75) translateY(-30px)" : "scale(0.6)";
//         const filter = isSelected ? "drop-shadow(0 0 20px #E91E63)" : "none";
//         const zIndex = isSelected ? 150 : index;
        
//         return `
//         <div style="transform: ${transform}; margin: -30px -20px; cursor: ${canPlay && !isTargeting ? 'pointer' : 'not-allowed'}; transition: transform 0.2s; position: relative; z-index: ${zIndex}; opacity: ${opacity}; filter: ${filter};"
//              onmouseover="if(${canPlay} && !${isTargeting} && !${isSelected}) { this.style.transform='scale(0.7) translateY(-20px)'; this.style.zIndex=100; }"
//              onmouseout="if(${canPlay} && !${isTargeting} && !${isSelected}) { this.style.transform='scale(0.6) translateY(0)'; this.style.zIndex=${index}; }"
//              onclick="if(!${isTargeting}) window.playCard(${index})">
//             ${window.renderCardHTML(card)}
//         </div>`;
//     }).join('');

//     let fieldHtml = p.field.map((card, index) => {
//         const isReady = card.canAttack;
//         const isAttackerSelected = window.TCG_BATTLE.selectedAttackerIndex === index;
//         let isEvoTarget = false;
//         if (isEvoMode) {
//             const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
//             isEvoTarget = card.type === evoCard.evolvesFrom;
//         }

//         let filter = "grayscale(50%) opacity(70%)";
//         let transform = "scale(0.65)";
//         let cursor = "not-allowed";
        
//         if (isAttackerSelected) {
//             filter = "drop-shadow(0 0 20px #FFD700)"; transform = "scale(0.7) translateY(-20px)"; cursor = "pointer";
//         } else if (isEvoMode) {
//             if (isEvoTarget) { filter = "drop-shadow(0 0 20px #E91E63) brightness(1.2)"; transform = "scale(0.7) translateY(-10px)"; cursor = "pointer"; }
//             else { filter = "grayscale(80%) opacity(40%)"; }
//         } else if (isReady) {
//             filter = "drop-shadow(0 0 10px #4CAF50)"; cursor = "pointer";
//         } else if (!isReady && card.damage > 0 && !card.isDefending && card.ability !== "taunt" && p.currentMana >= 1) {
//             cursor = "pointer";
//         }

//         const animStyle = card.isDead ? "animation: cardDestroy 0.6s ease-out forwards; pointer-events: none;" : "";
//         const isDefending = card.isDefending || card.ability === "taunt";
//         if (card.isDefending) filter = "drop-shadow(0 0 15px #2196F3)";

//         return `
//         <div id="p-card-${index}" style="position: relative; transform: ${transform}; margin: -20px -15px; transition: transform 0.2s, filter 0.2s; cursor: ${cursor}; filter: ${filter}; z-index: ${isAttackerSelected || isEvoTarget ? 100 : 1}; ${animStyle}"
//              onmouseover="if((${isReady} && !${isAttackerSelected} && !${isEvoMode}) || ${isEvoTarget}) { this.style.transform='scale(0.7) translateY(-10px)' }"
//              onmouseout="if((${isReady} && !${isAttackerSelected} && !${isEvoMode}) || ${isEvoTarget}) { this.style.transform='scale(0.65) translateY(0)' }"
//              onclick="window.selectPlayerCard(${index})">
//             ${window.renderCardHTML(card)}
//             ${isDefending && !card.isDead ? `<div style="position:absolute; top:-20px; left:30%; background:#f44336; color:white; padding:2px 10px; border-radius:10px; font-weight:bold; border:2px solid #fff; z-index:10; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">🛡️ 守護</div>` : ''}
//             ${!isReady && !isAttackerSelected && !card.isDead && !isEvoMode && !isDefending ? `<div style="position:absolute; top:40%; left:10%; background:rgba(0,0,0,0.8); color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:24px; transform:rotate(-15deg);">行動済み</div>` : ''}
//             ${isEvoTarget ? `<div style="position:absolute; top:40%; left:15%; background:#E91E63; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:22px; transform:rotate(-10deg); box-shadow:0 0 10px #000;">進化可能!</div>` : ''}
//             <div onclick="event.stopPropagation(); window.showCardDetailModal('player', ${index});" style="position:absolute; top:-10px; right:-10px; background:#222; color:#00BCD4; border:2px solid #00BCD4; border-radius:50%; width:36px; height:36px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.8); z-index:20;" title="詳細を見る">🔍</div>
//         </div>`;
//     }).join('');
//     if (p.field.length === 0) fieldHtml = `<div style="color: #666; font-style: italic; margin: 0 20px;">(あなたの場)</div>`;

//     let cpuFieldHtml = cpu.field.map((card, index) => {
//         const isTaunt = card.ability === "taunt" || card.isDefending; 
//         const isStealth = card.ability === "stealth";
//         const filter = isTargeting && !isStealth ? (isTaunt ? "drop-shadow(0 0 20px #FF5252)" : "drop-shadow(0 0 10px #FF9800)") : "none";
//         const cursor = isTargeting && !isStealth ? "crosshair" : "default";
//         const opacity = isStealth ? "0.6" : "1";
//         const animStyle = card.isDead ? "animation: cardDestroy 0.6s ease-out forwards; pointer-events: none;" : "";

//         return `
//         <div id="c-card-${index}" style="position: relative; transform: scale(0.65); margin: -20px -15px; filter: ${filter}; opacity: ${opacity}; cursor: ${cursor}; transition: transform 0.2s; ${animStyle}"
//              onmouseover="if(${isTargeting} && !${isStealth} && !${card.isDead}){ this.style.transform='scale(0.7) translateY(10px)' }"
//              onmouseout="if(${isTargeting} && !${isStealth} && !${card.isDead}){ this.style.transform='scale(0.65) translateY(0)' }"
//              onclick="if(${isTargeting}) window.executeAttack('card', ${index})">
//             ${window.renderCardHTML(card)}
//             ${isTaunt && !card.isDead ? `<div style="position:absolute; top:-20px; left:30%; background:#f44336; color:white; padding:2px 10px; border-radius:10px; font-weight:bold; border:2px solid #fff; z-index:10;">🛡️ 守護</div>` : ''}
//             <div onclick="event.stopPropagation(); window.showCardDetailModal('cpu', ${index});" style="position:absolute; top:-10px; right:-10px; background:#222; color:#FF5252; border:2px solid #FF5252; border-radius:50%; width:36px; height:36px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.8); z-index:20;" title="詳細を見る">🔍</div>
//         </div>`;
//     }).join('');
//     if (cpu.field.length === 0) cpuFieldHtml = `<div style="color: #666; font-style: italic; margin: 0 20px;">(CPUの場)</div>`;

//     battleUI.innerHTML = `
//         <div style="flex: 1; background: rgba(150,0,0,0.2); border-bottom: 2px solid #555; display: flex; flex-direction: column;">
//             <div id="cpu-face" style="padding: 10px; display: flex; justify-content: space-between; background: rgba(0,0,0,0.5); cursor: ${isTargeting ? 'crosshair' : 'default'}; transition: background 0.2s;"
//                  onmouseover="if(${isTargeting}){ this.style.background='rgba(255,0,0,0.3)' }"
//                  onmouseout="if(${isTargeting}){ this.style.background='rgba(0,0,0,0.5)' }"
//                  onclick="if(${isTargeting}) window.executeAttack('cpu', 0); else if(${isEvoMode}) { window.TCG_BATTLE.selectedHandCardIndex = -1; window.renderBattleBoard(); }">
//                 <div style="font-size: 20px; font-weight: bold;">🤖 敵CPU <span style="color:#ff5252; font-size:24px;">HP: ${cpu.hp}</span> ${isTargeting ? '🎯 (ここをタップで直接攻撃)' : ''}</div>
//                 <div style="color: #FFD700;">💎 マナ: ${cpu.currentMana} / ${cpu.maxMana} | 山札: ${cpu.deck.length} | 手札: ${cpu.hand.length}</div>
//             </div>
//             <div class="tcg-board-scroll" style="flex: 1; display: flex; overflow-x: auto; overflow-y: hidden; align-items: center; width: 100%;">
//                 <div style="display: flex; gap: 5px; padding: 10px 40px; margin: auto; flex-wrap: nowrap; align-items: center;">
//                     ${cpuFieldHtml}
//                 </div>
//             </div>
//         </div>
//         <div style="flex: 1; background: rgba(0,100,200,0.2); display: flex; flex-direction: column; position: relative;"
//              onclick="if(${isTargeting} && event.target === this) { window.TCG_BATTLE.selectedAttackerIndex = -1; window.renderBattleBoard(); } else if (${isEvoMode} && event.target === this) { window.TCG_BATTLE.selectedHandCardIndex = -1; window.renderBattleBoard(); }">
//             <div class="tcg-board-scroll" style="flex: 1; display: flex; overflow-x: auto; overflow-y: hidden; align-items: center; width: 100%; border-bottom: 1px dashed #555; pointer-events: none;">
//                 <div style="pointer-events: auto; display: flex; gap: 5px; padding: 10px 40px; margin: auto; flex-wrap: nowrap; align-items: center;">
//                     ${fieldHtml}
//                 </div>
//             </div>
//             <div style="height: 180px; display: flex; background: rgba(0,0,0,0.8); border-top: 3px solid #1976D2;">
//                 <div id="player-face" style="width: 200px; padding: 10px; border-right: 2px solid #333; display: flex; flex-direction: column; justify-content: space-around;">
//                     <div style="font-size: 20px; font-weight: bold;">🧑 あなた (Turn ${window.TCG_BATTLE.turn})</div>
//                     <div style="font-size: 24px; color: #4CAF50; font-weight: bold;">HP: ${p.hp}</div>
//                     <div style="font-size: 18px; color: #00BCD4;">💎 マナ: ${p.currentMana} / ${p.maxMana}</div>
//                     <div style="font-size: 14px; color: #aaa;">山札: ${p.deck.length} 枚</div>
//                 </div>
//                 <div style="flex: 1; display: flex; justify-content: center; align-items: flex-end; padding-bottom: 10px; overflow: visible;">
//                     ${handHtml}
//                 </div>
//                 <div style="position: absolute; right: 20px; top: -60px; display: flex; gap: 10px;">
//                     <button onclick="window.endTurn()" style="padding: 15px 30px; font-size: 18px; font-weight: bold; background: #FF9800; color: #fff; border: 2px solid #FFF; border-radius: 8px; cursor: pointer;">ターン終了 ➔</button>
//                     <button onclick="document.getElementById('tcg-battle-ui').style.display='none'" style="padding: 15px 15px; background: #333; color: #fff; border: 2px solid #666; border-radius: 8px; cursor: pointer;">逃げる</button>
//                 </div>
//             </div>
//         </div>
//     `;
// };

// window.triggerPlayEffect = function(card, isPlayer) {
//     const owner = isPlayer ? window.TCG_BATTLE.player : window.TCG_BATTLE.cpu;
//     const enemy = isPlayer ? window.TCG_BATTLE.cpu : window.TCG_BATTLE.player;
//     const ownerPrefix = isPlayer ? 'p' : 'c';
//     const enemyPrefix = isPlayer ? 'c' : 'p';
//     const targetFace = isPlayer ? 'player-face' : 'cpu-face';
//     const enemyFace = isPlayer ? 'cpu-face' : 'player-face';

//     if (card.ability === "draw_card") {
//         if (owner.deck.length > 0) {
//             owner.hand.push(owner.deck.shift());
//             if (isPlayer) window.showBattleMessage(`🎴 【ドロー】\n${card.name} の効果でカードを引きました！`);
//         }
//     } else if (card.ability === "mana_ramp") {
//         if (owner.maxMana < 10) {
//             owner.maxMana++;
//             if (isPlayer) window.showBattleMessage(`💎 【成長】\n最大マナが1増えました！`);
//         }
//     } else if (card.ability === "heal_self") {
//         owner.hp += 10; window.showVFX(targetFace, 'heal', 10);
//         if (isPlayer) window.showBattleMessage(`💖 【修復】\nHPが10回復しました！`);
//     } else if (card.ability === "aoe_heal_play") {
//         owner.field.forEach((c, idx) => { if(!c.isDead) { c.hp += 20; window.showVFX(`${ownerPrefix}-card-${idx}`, 'heal', 20); } });
//         if (isPlayer) window.showBattleMessage(`✨ 【ファンサービス】\n味方全員のHPが20回復した！`);
//     } else if (card.ability === "snipe_play") {
//         if (enemy.field.length > 0) {
//             let rIdx = Math.floor(Math.random() * enemy.field.length); let tCard = enemy.field[rIdx];
//             tCard.hp -= 30; window.showVFX(`${enemyPrefix}-card-${rIdx}`, 'slash'); window.showVFX(`${enemyPrefix}-card-${rIdx}`, 'damage', 30);
//             window.checkDeath(tCard, enemy, `${enemyPrefix}-card-${rIdx}`);
//             if (isPlayer) window.showBattleMessage(`💥 【殲滅モード】\n敵の ${tCard.name} に30ダメージ！`);
//         } else {
//             enemy.hp -= 30; window.showVFX(enemyFace, 'slash'); window.showVFX(enemyFace, 'damage', 30);
//             if (isPlayer) window.showBattleMessage(`💥 【殲滅モード】\n敵リーダーに30ダメージ！`);
//         }
//     } else if (card.ability === "dimension_hack") {
//         for(let i=0; i<2; i++) { if(enemy.hand.length > 0) enemy.hand.splice(Math.floor(Math.random()*enemy.hand.length), 1); }
//         for(let i=0; i<2; i++) { if(owner.deck.length > 0) owner.hand.push(owner.deck.shift()); }
//         if(isPlayer) window.showBattleMessage(`🌌 【超次元ハッキング】\n相手の手札を2枚破壊し、2枚ドロー！`);
//     } else if (card.ability === "crimson_end" || card.ability === "heaven_punishment") {
//         if(card.ability === "crimson_end") { enemy.hp -= 50; window.showVFX(enemyFace, 'slash'); }
//         enemy.field.forEach((c, idx) => {
//             c.hp -= 50; window.showVFX(`${enemyPrefix}-card-${idx}`, 'slash'); window.showVFX(`${enemyPrefix}-card-${idx}`, 'damage', 50);
//             window.checkDeath(c, enemy, `${enemyPrefix}-card-${idx}`);
//         });
//         if(isPlayer) window.showBattleMessage(`🌋 【${card.name}の圧倒的な力】\n敵陣全体に50ダメージ！`);
//     } else if (card.ability === "perfect_predation") {
//         let targets = enemy.field.filter(c => !c.isDead);
//         if(targets.length > 0) {
//             let tCard = targets[Math.floor(Math.random() * targets.length)];
//             let drain = tCard.hp; tCard.hp = 0; window.checkDeath(tCard, enemy, `${enemyPrefix}-card-${enemy.field.indexOf(tCard)}`);
//             owner.hp += drain; window.showVFX(targetFace, 'heal', drain);
//             if(isPlayer) window.showBattleMessage(`🌑 【完全捕食】\n敵を喰らい、${drain}回復！`);
//         }
//     } else if (card.ability === "nightmare_rule") {
//         enemy.field.forEach((c, idx) => {
//             if(!c.isDead) { let half = Math.ceil(c.hp / 2); c.hp -= half; window.showVFX(`${enemyPrefix}-card-${idx}`, 'damage', half); }
//         });
//         if(isPlayer) window.showBattleMessage(`⛓️ 【悪夢の君臨】\nすべての敵モンスターのHPが半減！`);
//     } else if (card.ability === "star_hope") {
//         owner.field.forEach((c, idx) => {
//             if(!c.isDead) { c.hp += 100; c.ability = "taunt"; window.showVFX(`${ownerPrefix}-card-${idx}`, 'heal', '全回復'); }
//         });
//         if(isPlayer) window.showBattleMessage(`🌟 【希望の星】\n味方全回復＆全員が「かばう」状態に！`);
//     } else if (card.ability === "truth_overwrite") {
//         for(let i=0; i<3; i++) { if(owner.deck.length > 0) owner.hand.push(owner.deck.shift()); }
//         owner.maxMana = Math.min(10, owner.maxMana + 3); owner.currentMana = Math.min(10, owner.currentMana + 3);
//         if(isPlayer) window.showBattleMessage(`🌐 【真理の書き換え】\n3枚ドロー＆マナ最大値が3増えた！`);
//     } else if (card.ability === "time_manipulation") {
//         owner.field.forEach(c => { c.canAttack = true; c.isDefending = false; });
//         if(isPlayer) window.showBattleMessage(`⏳ 【時空操作】\nすべての味方が再び行動可能になった！`);
//     } else if (card.ability === "super_gravity") {
//         owner.field.forEach((c, idx) => { if(c !== card && !c.isDead) { c.hp -= 100; window.showVFX(`${ownerPrefix}-card-${idx}`, 'damage', 100); window.checkDeath(c, owner, `${ownerPrefix}-card-${idx}`); } });
//         enemy.field.forEach((c, idx) => { if(!c.isDead) { c.hp -= 100; window.showVFX(`${enemyPrefix}-card-${idx}`, 'damage', 100); window.checkDeath(c, enemy, `${enemyPrefix}-card-${idx}`); } });
//         if(isPlayer) window.showBattleMessage(`🌌 【超重力】\n自身以外のお互いの全モンスターに100ダメージ！`);
//     }

//     if ((card.type === "item" || card.type === "action") && card.damage > 0) {
//         enemy.hp -= card.damage; window.showVFX(enemyFace, 'slash'); window.showVFX(enemyFace, 'damage', card.damage);
//         const ui = document.getElementById('tcg-battle-ui'); ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect');
//         if (isPlayer) window.showBattleMessage(`🔥 敵リーダーに ${card.damage} ダメージ！`);
//     }

//     setTimeout(() => { window.renderBattleBoard(); }, 800);
// };

// window.playCard = function(handIndex) {
//     const p = window.TCG_BATTLE.player; const card = p.hand[handIndex];
//     const actualCost = window.getActualCost(p, card);
    
//     if (p.currentMana < actualCost) { window.showBattleMessage(`マナが足りません！\n(必要: ${actualCost} / 現在: ${p.currentMana})`, true); return; }
//     if (card.type === 'action' && p.actionUsed) { window.showBattleMessage("⚠️ アクションカードは1ターンに1回までしか使えません！", true); return; }
    
//     if (card.evolvesFrom) {
//         const canEvolve = p.field.some(c => c.type === card.evolvesFrom);
//         if (!canEvolve) {
//             const evoName = window.getEvolvesFromName(card.evolvesFrom);
//             window.showBattleMessage(`⚠️ 盤面に進化元の\n「${evoName}」がいません！`, true); return;
//         }
//         if (window.TCG_BATTLE.selectedHandCardIndex === handIndex) {
//             window.TCG_BATTLE.selectedHandCardIndex = -1; 
//         } else {
//             window.TCG_BATTLE.selectedHandCardIndex = handIndex; window.TCG_BATTLE.selectedAttackerIndex = -1; 
//             window.showBattleMessage("✨ 進化させるモンスターを選んでください！\n(もう一度押すとキャンセル)");
//         }
//         window.renderBattleBoard(); return;
//     }

//     p.currentMana -= actualCost; p.hand.splice(handIndex, 1);
//     if (card.type === 'action') p.actionUsed = true;
//     if (card.type === 'item' || card.type === 'action') { window.showBattleMessage(`✨ ${card.name} を使用！`); window.triggerPlayEffect(card, true); } 
//     else { card.canAttack = false; p.field.push(card); window.showBattleMessage(`🛡️ ${card.name} を配置！`); window.triggerPlayEffect(card, true); }

//     window.TCG_BATTLE.selectedHandCardIndex = -1; window.renderBattleBoard();
//     if (window.TCG_BATTLE.cpu.hp <= 0) { setTimeout(() => { alert("🎉 YOU WIN!! 相手のHPを0にしました！"); document.getElementById('tcg-battle-ui').style.display = 'none'; }, 1000); }
// };

// window.selectPlayerCard = function(index) {
//     const p = window.TCG_BATTLE.player; const targetCard = p.field[index];

//     if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
//         const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
//         const actualCost = window.getActualCost(p, evoCard);
//         if (targetCard.type === evoCard.evolvesFrom) {
//             p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
//             evoCard.canAttack = false; p.field[index] = evoCard;  
//             window.showVFX(`p-card-${index}`, 'heal', '進化!'); window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`);
//             window.triggerPlayEffect(evoCard, true); window.renderBattleBoard();
//         } else {
//             const evoName = window.getEvolvesFromName(evoCard.evolvesFrom);
//             window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
//         }
//         return;
//     }

//     if (!targetCard.canAttack || targetCard.damage <= 0) {
//         if (!targetCard.isDefending && targetCard.ability !== "taunt" && p.currentMana >= 1) {
//             p.currentMana -= 1; targetCard.isDefending = true; 
//             window.showVFX(`p-card-${index}`, 'heal', '防御!'); window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`); window.renderBattleBoard();
//         } else if (targetCard.isDefending) { window.showBattleMessage(`このカードはすでに防御姿勢です。`); }
//         return;
//     }

//     if (window.TCG_BATTLE.selectedAttackerIndex === index) window.TCG_BATTLE.selectedAttackerIndex = -1;
//     else window.TCG_BATTLE.selectedAttackerIndex = index;
//     window.renderBattleBoard();
// };

// window.executeAttack = function(targetType, enemyIndex) {
//     const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
//     const attackerIndex = window.TCG_BATTLE.selectedAttackerIndex; if (attackerIndex === -1) return;
//     const attackerCard = p.field[attackerIndex];

//     const isPierce = attackerCard.ability === "pierce_recoil" || attackerCard.ability === "flight" || attackerCard.ability === "god_strike" || attackerCard.ability === "dimension_drill";
//     const hasTaunt = cpu.field.some(c => c.ability === "taunt" || c.isDefending);
//     if (hasTaunt && !isPierce) {
//         if (targetType === 'cpu' || (targetType === 'card' && cpu.field[enemyIndex].ability !== "taunt" && !cpu.field[enemyIndex].isDefending)) {
//             window.showBattleMessage("🛡️ 敵の場に【かばう】を持つカードがいます！\n先にそちらを攻撃してください", true); return;
//         }
//     }
//     if (targetType === 'card' && cpu.field[enemyIndex].ability === "stealth") {
//         window.showBattleMessage("🌫️ この敵は【潜伏】しています！\n攻撃対象に選べません！", true); return;
//     }

//     let dmgToTarget = attackerCard.damage; let dmgToAttacker = 0; const attackerHtmlId = `p-card-${attackerIndex}`;

//     if (targetType === 'cpu') {
//         cpu.hp -= dmgToTarget; window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', dmgToTarget);
//     } else if (targetType === 'card') {
//         const targetCard = cpu.field[enemyIndex]; const targetHtmlId = `c-card-${enemyIndex}`;
//         dmgToAttacker = targetCard.damage;
//         if (targetCard.ability === "absolute_field") dmgToTarget = 1;
//         if (attackerCard.ability === "absolute_field") dmgToAttacker = 1;
//         if (targetCard.ability === "absolute_fortress") dmgToTarget = Math.max(0, dmgToTarget - 20);
//         if (attackerCard.ability === "absolute_fortress") dmgToAttacker = Math.max(0, dmgToAttacker - 20);

//         targetCard.hp -= dmgToTarget; window.showVFX(targetHtmlId, 'slash'); window.showVFX(targetHtmlId, 'damage', dmgToTarget);
//         window.checkDeath(targetCard, cpu, targetHtmlId);
//         if (targetCard.ability === "stealth") targetCard.ability = null;
//     }

//     if (attackerCard.ability === "god_strike") {
//         const otherEnemies = cpu.field.filter((c, idx) => (!c.isDead && (targetType === 'cpu' || idx !== enemyIndex)));
//         if (otherEnemies.length > 0) {
//             let tCard = otherEnemies[Math.floor(Math.random() * otherEnemies.length)];
//             tCard.hp = 0; window.checkDeath(tCard, cpu, `c-card-${cpu.field.indexOf(tCard)}`);
//             window.showBattleMessage("⚔️ 【神の一撃】が別の敵を葬り去った！", false, 1500);
//         }
//     }
//     if (attackerCard.ability === "dimension_drill" && targetType === 'card') {
//         cpu.hp -= dmgToTarget; window.showVFX('cpu-face', 'damage', dmgToTarget); window.showBattleMessage("🌪️ 【次元穿孔】敵リーダーも貫いた！", false, 1500);
//     }
//     if (attackerCard.ability === "pierce_recoil") { dmgToAttacker += 10; window.showBattleMessage("⚡ 暴走回路の反動ダメージ！", true, 1000); }

//     if (dmgToAttacker > 0) {
//         setTimeout(() => {
//             attackerCard.hp -= dmgToAttacker; window.showVFX(attackerHtmlId, 'slash'); window.showVFX(attackerHtmlId, 'damage', dmgToAttacker);
//             window.checkDeath(attackerCard, p, attackerHtmlId); window.renderBattleBoard();
//         }, 200);
//     }
    
//     if (attackerCard.ability === "stealth") attackerCard.ability = null;
//     attackerCard.canAttack = false; window.TCG_BATTLE.selectedAttackerIndex = -1; window.renderBattleBoard();

//     setTimeout(() => {
//         p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);
//         if (cpu.hp <= 0) { cpu.hp = 0; window.renderBattleBoard(); window.showBattleMessage("🎉 YOU WIN!!\n相手のHPを0にしました！", false, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }
//         if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }
//         window.renderBattleBoard();
//     }, 800);
// };

// window.showTurnCutin = function(text, color, callback) {
//     const ui = document.getElementById('tcg-battle-ui');
//     if (!ui) { if(callback) callback(); return; }
//     if (text.includes("YOUR TURN")) window.TCG_BATTLE.player.field.forEach(c => c.isDefending = false);

//     const blocker = document.createElement('div');
//     blocker.style.cssText = `position: absolute; top:0; left:0; width:100%; height:100%; z-index:25000;`;
//     ui.appendChild(blocker);

//     const splash = document.createElement('div');
//     splash.style.cssText = `
//         position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 26000; display: flex;
//         justify-content: center; align-items: center; color: white; text-align: center;
//         font-size: 90px; font-weight: bold; font-style: italic; white-space: pre-wrap; line-height: 1.1;
//         text-shadow: 0 0 40px ${color}, 5px 5px 0 #000, -2px -2px 0 #000;
//         opacity: 0; transform: scale(1.5) skewX(-15deg); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); pointer-events: none;
//     `;
//     splash.innerHTML = text; ui.appendChild(splash);

//     setTimeout(() => { splash.style.opacity = '1'; splash.style.transform = 'scale(1) skewX(-15deg)'; }, 50);
//     setTimeout(() => {
//         splash.style.opacity = '0'; splash.style.transform = 'scale(0.8) skewX(-15deg)';
//         setTimeout(() => { splash.remove(); blocker.remove(); if (callback) callback(); }, 300);
//     }, 1200);
// };

// window.showDefendHintModal = function(onConfirm) {
//     let modal = document.getElementById('tcg-defend-hint-modal');
//     if (!modal) {
//         modal = document.createElement('div'); modal.id = 'tcg-defend-hint-modal';
//         modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 30000; display: flex; justify-content: center; align-items: center;`;
//         document.body.appendChild(modal);
//     }
//     modal.innerHTML = `
//         <div style="background: #2a2a2a; border: 3px solid #00BCD4; border-radius: 12px; padding: 25px; width: 400px; color: white; font-family: sans-serif; box-shadow: 0 0 30px rgba(0, 188, 212, 0.5);">
//             <h3 style="color: #00BCD4; margin-top: 0;">💡 マナが残っています！</h3>
//             <p style="line-height: 1.6; font-size: 15px;">行動済みのモンスターをクリックすると、<span style="color:#FFD700; font-weight:bold;">1マナ消費して「🛡️守護」の壁役にさせる</span>ことができます。<br><br>リーダーを守るためにマナを残して壁を作るのも重要な作戦です。このままターンを終了しますか？</p>
//             <label style="display: flex; align-items: center; margin-bottom: 20px; cursor: pointer; font-size: 14px; color: #ddd; background: #111; padding: 10px; border-radius: 6px;">
//                 <input type="checkbox" id="defend-hint-checkbox" style="margin-right: 10px; transform: scale(1.3); cursor: pointer;"><span>このバトル中は、次から表示しない</span>
//             </label>
//             <div style="display: flex; justify-content: space-between; gap: 10px;">
//                 <button id="btn-hint-cancel" style="flex: 1; padding: 12px; background: #555; color: white; border: 2px solid #777; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#666'" onmouseout="this.style.background='#555'">盤面に戻る</button>
//                 <button id="btn-hint-ok" style="flex: 1; padding: 12px; background: #FF9800; color: white; border: 2px solid #FFF; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#F57C00'" onmouseout="this.style.background='#FF9800'">ターンを終了する</button>
//             </div>
//         </div>
//     `;
//     modal.style.display = 'flex';
//     document.getElementById('btn-hint-cancel').onclick = () => { modal.style.display = 'none'; };
//     document.getElementById('btn-hint-ok').onclick = () => {
//         if (document.getElementById('defend-hint-checkbox').checked) window.TCG_BATTLE._skipDefendHint = true;
//         modal.style.display = 'none'; onConfirm(); 
//     };
// };

// window.executeRealEndTurn = function() {
//     const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
//     p.field.forEach((c, i) => {
//         if (c.isDead) return;
//         if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`p-card-${i}`, 'heal', 20); }
//         if (c.ability === "cyber_miracle") { p.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 10; window.showVFX(`p-card-${fi}`, 'heal', '全回復'); } }); }
//         if (c.ability === "event_horizon") {
//             const aliveEnemies = cpu.field.filter(e => !e.isDead);
//             if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; cpu.deck.push(target); window.showVFX(`c-card-${cpu.field.indexOf(target)}`, 'slash', 'バウンス'); }
//         }
//         if (c.ability === "divine_grace" && p.graveyard && p.graveyard.length > 0) {
//             let resCard = p.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
//             p.field.push(resCard); window.showBattleMessage("✨ 【神の恩寵】\n破壊された味方が復活した！");
//         }
//     });
//     p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);
//     window.showTurnCutin("ENEMY TURN", "#ff5252", () => { window.executeCPUTurn(); });
// };

// window.endTurn = function() {
//     window.TCG_BATTLE.selectedAttackerIndex = -1; window.TCG_BATTLE.player.actionUsed = false; window.renderBattleBoard();
//     if (window.TCG_BATTLE.player.currentMana >= 1 && !window.TCG_BATTLE._skipDefendHint) {
//         const canDefendCard = window.TCG_BATTLE.player.field.find(c => (!c.canAttack || c.damage <= 0) && !c.isDefending && c.ability !== "taunt");
//         if (canDefendCard) { window.showDefendHintModal(window.executeRealEndTurn); return; }
//     }
//     window.executeRealEndTurn();
// };

// window.executeCPUTurn = function() {
//     const pField = window.TCG_BATTLE.player.field;
//     pField.forEach(c => { if (c.isDefending) { c._tempOriginalAbility = c.ability; c.ability = "taunt"; } });

//     const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
//     if (cpu.maxMana < 10) cpu.maxMana++; cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
//     cpu.field.forEach((c, i) => {
//         if (c.isDead) return;
//         if (c.ability === "start_draw") { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
//         if (c.ability === "star_breath") { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
//         if (c.ability === "heaven_judgement") {
//             p.hp -= 20; window.showVFX('player-face', 'damage', 20);
//             p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`); } });
//         }
//     });
    
//     if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift());
//     cpu.field.forEach(card => card.canAttack = true);
//     window.renderBattleBoard();

//     setTimeout(() => {
//         let delay = 0;
//         cpu.field.forEach((cpuCard, cpuIndex) => {
//             if (!cpuCard.canAttack || cpuCard.damage <= 0) return;
//             setTimeout(() => {
//                 const tauntTargets = p.field.filter(c => c.ability === "taunt" || c.isDefending);
//                 const validTargets = p.field.filter(c => c.ability !== "stealth"); 
//                 let target = null; let targetHtmlId = null;

//                 const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill";
//                 if (tauntTargets.length > 0 && !isPierce) target = tauntTargets[Math.floor(Math.random() * tauntTargets.length)];
//                 else if (validTargets.length > 0 && Math.random() > 0.5) target = validTargets[Math.floor(Math.random() * validTargets.length)];

//                 let dmgToTarget = cpuCard.damage; let dmgToAttacker = target ? target.damage : 0;

//                 if (target) {
//                     targetHtmlId = `p-card-${p.field.indexOf(target)}`;
//                     if (target.ability === "absolute_field") dmgToTarget = 1;
//                     if (cpuCard.ability === "absolute_field") dmgToAttacker = 1;
//                     if (target.ability === "absolute_fortress") dmgToTarget = Math.max(0, dmgToTarget - 20);
//                     if (cpuCard.ability === "absolute_fortress") dmgToAttacker = Math.max(0, dmgToAttacker - 20);

//                     target.hp -= dmgToTarget; window.showVFX(targetHtmlId, 'slash'); window.showVFX(targetHtmlId, 'damage', dmgToTarget);
//                     window.checkDeath(target, p, targetHtmlId);
//                     if (target.ability === "stealth") target.ability = null;
//                 } else {
//                     p.hp -= dmgToTarget; window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', dmgToTarget);
//                     const ui = document.getElementById('tcg-battle-ui'); ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect');
//                 }

//                 if (cpuCard.ability === "dimension_drill" && target) { p.hp -= dmgToTarget; window.showVFX('player-face', 'damage', dmgToTarget); }
//                 if (cpuCard.ability === "god_strike") {
//                     const otherP = p.field.filter(c => c !== target && !c.isDead);
//                     if (otherP.length > 0) { let tCard = otherP[Math.floor(Math.random() * otherP.length)]; tCard.hp = 0; window.checkDeath(tCard, p, `p-card-${p.field.indexOf(tCard)}`); }
//                 }

//                 if (dmgToAttacker > 0) {
//                     setTimeout(() => { cpuCard.hp -= dmgToAttacker; window.showVFX(`c-card-${cpuIndex}`, 'slash'); window.showVFX(`c-card-${cpuIndex}`, 'damage', dmgToAttacker); window.checkDeath(cpuCard, cpu, `c-card-${cpuIndex}`); }, 200);
//                 }
                
//                 if (cpuCard.ability === "stealth") cpuCard.ability = null;
//                 cpuCard.canAttack = false; window.renderBattleBoard();
//             }, delay);
//             delay += 800;
//         });

//         setTimeout(() => {
//             pField.forEach(c => { if (c.isDefending && c._tempOriginalAbility !== undefined) c.ability = c._tempOriginalAbility; });
//             p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

//             if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

//             for (let i = cpu.hand.length - 1; i >= 0; i--) {
//                 let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
//                 if (cpu.currentMana >= actualCost) {
//                     if (card.type === 'action' && cpu.actionUsed) continue;
//                     if (card.evolvesFrom) {
//                         let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
//                         if (targetIndex !== -1) {
//                             cpu.currentMana -= actualCost; cpu.hand.splice(i, 1); card.canAttack = false;
//                             cpu.field[targetIndex] = card; window.triggerPlayEffect(card, false); continue;
//                         } else { continue; }
//                     }
//                     cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
//                     if (card.type === 'action') cpu.actionUsed = true;
//                     if (card.type === 'item' || card.type === 'action') { window.triggerPlayEffect(card, false); } 
//                     else { card.canAttack = false; cpu.field.push(card); window.triggerPlayEffect(card, false); }
//                 }
//             }

//             cpu.field.forEach((c, i) => {
//                 if (c.isDead) return;
//                 if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
//                 if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 10; window.showVFX(`c-card-${fi}`, 'heal', '全回復'); } }); }
//                 if (c.ability === "event_horizon") {
//                     const aliveEnemies = p.field.filter(e => !e.isDead);
//                     if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
//                 }
//                 if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
//                     let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
//                     cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
//                 }
//             });
//             p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

//             window.TCG_BATTLE.turn++;
//             if (p.maxMana < 10) p.maxMana++; p.currentMana = p.maxMana; p.actionUsed = false; window.TCG_BATTLE.selectedHandCardIndex = -1; 
            
//             if (p.deck.length > 0) p.hand.push(p.deck.shift());
//             p.field.forEach(card => card.canAttack = true);
//             window.renderBattleBoard();

//             window.showTurnCutin(`TURN ${window.TCG_BATTLE.turn}\nYOUR TURN`, "#4CAF50", () => {
//                 p.field.forEach((c, i) => {
//                     if (c.isDead) return;
//                     if (c.ability === "start_draw") { if (p.deck.length > 0) p.hand.push(p.deck.shift()); window.showVFX(`p-card-${i}`, 'heal', 'Draw'); }
//                     if (c.ability === "star_breath") { p.maxMana = Math.min(10, p.maxMana+2); p.currentMana = Math.min(10, p.currentMana+2); p.hp += 30; window.showVFX('player-face', 'heal', 30); }
//                     if (c.ability === "heaven_judgement") {
//                         cpu.hp -= 20; window.showVFX('cpu-face', 'damage', 20);
//                         cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`c-card-${fi}`, 'damage', 20); window.checkDeath(f, cpu, `c-card-${fi}`); } });
//                     }
//                 });
//                 cpu.field = cpu.field.filter(c => !c.isDead);
//                 window.renderBattleBoard(); window.showBattleMessage("✨ マナが回復し、カードを1枚引きました！", false, 2000);
//             });
//         }, delay + 500);
//     }, 800); 
// };

// setInterval(() => {
//     if (!window.TCG || !window.TCG.myCollection) return;
//     const count = window.TCG.myCollection.length;
//     const isUnlocked = count >= 60; 

//     const allTextElements = document.querySelectorAll('div, h2, h3, span, div.menu-title');
//     allTextElements.forEach(el => {
//         if (el.children.length === 0 || el.classList.contains('menu-title')) { 
//             const t = el.innerText.trim();
//             if (t === '🃏 TCGメニュー' || t === 'TCGメニュー') {
//                 if (!isUnlocked) el.innerText = '📖 思い出アルバム';
//             } else if (t === '📖 思い出アルバム') {
//                 if (isUnlocked) el.innerText = '🃏 TCGメニュー';
//             }
//         }
//     });

//     const buttons = document.querySelectorAll('button');
//     buttons.forEach(btn => {
//         const t = btn.innerText;
//         if (t.includes('世界のプレイヤーと対戦') || t.includes('名もなきCPUと練習') || t.includes('デッキをオンライン登録')) {
//             btn.style.display = isUnlocked ? 'block' : 'none';
//         }
//         if (t.includes('コレクション / 編成') || t.includes('記録を見る')) {
//             if (!isUnlocked) {
//                 btn.innerText = `🗃️ 記録を見る (現在: ${count} / 60 個)`;
//             } else {
//                 btn.innerText = '🗃️ コレクション / 編成';
//             }
//         }
//     });
// }, 1000);

// // ==========================================
// // ✨ おまかせ編成 ＆ フルオートバトル 追加パッチ
// // ==========================================

// // --- 1. デッキ自動編成ロジック ---
// window.autoBuildDeck = function() {
//     const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
//     if (!isUnlocked) return;

//     const targetType = prompt("どの系統を中心にデッキを組みますか？\n（例: robot, dragon, magician, spirit, stone, machine, ghost, bird, beetle, seed, balloon）", "robot");
//     if (!targetType) return;

//     let myCards = [...window.TCG.myCollection];
//     let selectedUids = [];

//     // 優先度別にカードを振り分け
//     let primaryCards = myCards.filter(c => c.type.startsWith(targetType)); // 進化系含む指定種族
//     let supportCards = myCards.filter(c => ['item', 'action', 'field'].includes(c.type)); // サポート
//     let otherCards = myCards.filter(c => !c.type.startsWith(targetType) && !['item', 'action', 'field'].includes(c.type));

//     // シャッフル
//     window.shuffleArray(primaryCards); window.shuffleArray(supportCards); window.shuffleArray(otherCards);

//     // バランス： モンスター45枚、サポート15枚を目指す
//     let targetPrimary = 45; let targetSupport = 15;

//     for (let c of primaryCards) { if (selectedUids.length < 60 && targetPrimary > 0) { selectedUids.push(c.uid); targetPrimary--; } }
//     for (let c of supportCards) { if (selectedUids.length < 60 && targetSupport > 0) { selectedUids.push(c.uid); targetSupport--; } }
    
//     // 足りなければ残りの種族カードとサポートで埋める
//     for (let c of primaryCards) { if (selectedUids.length < 60 && !selectedUids.includes(c.uid)) selectedUids.push(c.uid); }
//     for (let c of supportCards) { if (selectedUids.length < 60 && !selectedUids.includes(c.uid)) selectedUids.push(c.uid); }
//     // それでも足りなければ関係ないカードで埋める
//     for (let c of otherCards) { if (selectedUids.length < 60 && !selectedUids.includes(c.uid)) selectedUids.push(c.uid); }

//     if (selectedUids.length < 60) {
//         alert("所持カードが60枚未満のため、編成できませんでした。"); return;
//     }

//     window.TCG.editingDeck = selectedUids;
//     window.refreshDeckBuilderView();
//     alert(`✨「${targetType}」中心の最強デッキを自動編成しました！\n問題なければ右上の「デッキを保存」を押してください。`);
// };

// // --- 2. 編成画面に「おまかせ編成ボタン」を差し込む ---
// window._baseOpenDeckBuilderForAuto = window._baseOpenDeckBuilderForAuto || window.openDeckBuilder;
// window.openDeckBuilder = function() {
//     window._baseOpenDeckBuilderForAuto();
//     // 描画された直後にボタンをDOMに追加
//     setTimeout(() => {
//         let saveBtn = document.getElementById('db-save-btn');
//         if (saveBtn && !document.getElementById('db-auto-btn')) {
//             let autoBtn = document.createElement('button');
//             autoBtn.id = 'db-auto-btn';
//             autoBtn.innerText = '✨ おまかせ編成';
//             autoBtn.style.cssText = 'background: #00BCD4; color: #FFF; font-weight: bold; border: 2px solid #FFF; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px; margin-right: 10px; transition: 0.2s;';
//             autoBtn.onmouseover = () => autoBtn.style.transform = 'scale(1.05)';
//             autoBtn.onmouseout = () => autoBtn.style.transform = 'scale(1)';
//             autoBtn.onclick = window.autoBuildDeck;
//             saveBtn.parentNode.insertBefore(autoBtn, saveBtn);
//         }
//     }, 100);
// };

// // --- 3. バトル画面に「AUTOボタン」を差し込む ---
// window._baseRenderBattleBoardForAuto = window._baseRenderBattleBoardForAuto || window.renderBattleBoard;
// window.renderBattleBoard = function() {
//     window._baseRenderBattleBoardForAuto();
    
//     let playerFace = document.getElementById('player-face');
//     if (playerFace && !document.getElementById('battle-auto-btn')) {
//         let btnContainer = document.createElement('div');
//         btnContainer.style.marginTop = 'auto';
//         playerFace.appendChild(btnContainer);
        
//         let autoBtn = document.createElement('button');
//         autoBtn.id = 'battle-auto-btn';
//         autoBtn.onclick = () => {
//             window.TCG_BATTLE.isAuto = !window.TCG_BATTLE.isAuto;
//             window.renderBattleBoard();
//         };
//         btnContainer.appendChild(autoBtn);
//     }
    
//     let autoBtn = document.getElementById('battle-auto-btn');
//     if (autoBtn && window.TCG_BATTLE) {
//         const isAuto = window.TCG_BATTLE.isAuto;
//         autoBtn.innerText = isAuto ? '🤖 AUTO: ON' : '👤 AUTO: OFF';
//         autoBtn.style.cssText = `padding: 8px 15px; font-size: 16px; font-weight: bold; background: ${isAuto ? '#E91E63' : '#555'}; color: #fff; border: 2px solid #FFF; border-radius: 8px; cursor: pointer; width: 100%; transition: 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.5);`;
//     }
// };

// // --- 4. バトル進行のフラグ管理フック ---
// window._baseStartBattleForAuto = window._baseStartBattleForAuto || window.startBattle;
// window.startBattle = function(enemyData) {
//     window._baseStartBattleForAuto(enemyData);
//     if(window.TCG_BATTLE) {
//         window.TCG_BATTLE.isEnemyTurn = false;
//         window.TCG_BATTLE.isAnimating = true;
//         window.TCG_BATTLE.isAuto = false; // 初期はOFF
//     }
//     setTimeout(() => { if(window.TCG_BATTLE) window.TCG_BATTLE.isAnimating = false; }, 3500); // 最初のドロー演出完了待ち
// };

// window._baseShowTurnCutinForAuto = window._baseShowTurnCutinForAuto || window.showTurnCutin;
// window.showTurnCutin = function(text, color, callback) {
//     if (text.includes("ENEMY TURN")) window.TCG_BATTLE.isEnemyTurn = true;
//     if (text.includes("YOUR TURN")) window.TCG_BATTLE.isEnemyTurn = false;
    
//     window.TCG_BATTLE.isAnimating = true;
//     setTimeout(() => { window.TCG_BATTLE.isAnimating = false; }, 2000); // カットイン終了待ち
    
//     window._baseShowTurnCutinForAuto(text, color, callback);
// };

// // --- 5. オートバトルのAIロジック（毎秒監視） ---
// if (window.TCG_BATTLE_AUTO_LOOP) clearInterval(window.TCG_BATTLE_AUTO_LOOP);
// window.TCG_BATTLE_AUTO_LOOP = setInterval(() => {
//     if (!window.TCG_BATTLE || !document.getElementById('tcg-battle-ui') || document.getElementById('tcg-battle-ui').style.display === 'none') return;
//     if (!window.TCG_BATTLE.isAuto || window.TCG_BATTLE.isEnemyTurn || window.TCG_BATTLE.isAnimating) return;

//     const p = window.TCG_BATTLE.player;
//     const cpu = window.TCG_BATTLE.cpu;

//     // アニメーションロックをかけるヘルパー（演出が被らないように1.5秒待機）
//     const lockAnimation = () => {
//         window.TCG_BATTLE.isAnimating = true;
//         setTimeout(() => { window.TCG_BATTLE.isAnimating = false; }, 1500);
//     };

//     // ① 攻撃可能なモンスターがいれば攻撃！
//     let attackerIndex = p.field.findIndex(c => c.canAttack && c.damage > 0 && !c.isDead);
//     if (attackerIndex !== -1) {
//         window.TCG_BATTLE.selectedAttackerIndex = attackerIndex;
//         let targetType = 'cpu'; let enemyIndex = 0;
//         const tauntTargets = cpu.field.filter(c => (c.ability === "taunt" || c.isDefending) && !c.isDead);
//         const validTargets = cpu.field.filter(c => c.ability !== "stealth" && !c.isDead); 
//         const attackerCard = p.field[attackerIndex];
//         const isPierce = attackerCard.ability === "pierce_recoil" || attackerCard.ability === "flight" || attackerCard.ability === "god_strike" || attackerCard.ability === "dimension_drill";

//         if (tauntTargets.length > 0 && !isPierce) {
//             let t = tauntTargets[Math.floor(Math.random() * tauntTargets.length)];
//             targetType = 'card'; enemyIndex = cpu.field.indexOf(t);
//         } else if (validTargets.length > 0 && Math.random() > 0.5) {
//             let t = validTargets[Math.floor(Math.random() * validTargets.length)];
//             targetType = 'card'; enemyIndex = cpu.field.indexOf(t);
//         }
//         lockAnimation();
//         window.executeAttack(targetType, enemyIndex);
//         return;
//     }

//     // ② 手札に出せるカード（進化含む）があれば出す！
//     for (let i = p.hand.length - 1; i >= 0; i--) {
//         let card = p.hand[i];
//         let actualCost = window.getActualCost(p, card);
//         if (p.currentMana >= actualCost) {
//             if (card.type === 'action' && p.actionUsed) continue;
            
//             if (card.evolvesFrom) {
//                 let targetIndex = p.field.findIndex(c => c.type === card.evolvesFrom && !c.isDead);
//                 if (targetIndex !== -1) {
//                     lockAnimation();
//                     window.TCG_BATTLE.selectedHandCardIndex = i;
//                     window.selectPlayerCard(targetIndex); // 進化実行
//                     return;
//                 }
//                 continue;
//             }
//             lockAnimation();
//             window.playCard(i); // 通常召喚・魔法使用
//             return;
//         }
//     }

//     // ③ やることがなくマナが余っていれば、1マナ防御陣形をとる！
//     let defIndex = p.field.findIndex(c => (!c.canAttack || c.damage <= 0) && !c.isDefending && c.ability !== "taunt" && !c.isDead);
//     if (defIndex !== -1 && p.currentMana >= 1) {
//         lockAnimation();
//         window.selectPlayerCard(defIndex);
//         return;
//     }

//     // ④ マナも尽き、攻撃も終わったらターンエンド！
//     lockAnimation();
//     window.TCG_BATTLE._skipDefendHint = true; // オート中はヒントを出さず即終了
//     window.endTurn();

// }, 1500); // 1.5秒おきに状況を判断して動く（人間が見ていて気持ちいい速度）

// // ==========================================
// // ✨ 超リッチ「おまかせ編成」UI＆賢いロジック 追加パッチ
// // ==========================================

// // 1. おまかせ編成ボタンが押された時に「専用のモーダル」を開くように上書き
// window.autoBuildDeck = function() {
//     const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
//     if (!isUnlocked) {
//         alert("カードが60枚未満のため、おまかせ編成は使えません。");
//         return;
//     }
    
//     let modal = document.getElementById('tcg-auto-build-modal');
//     if (!modal) {
//         modal = document.createElement('div');
//         modal.id = 'tcg-auto-build-modal';
//         modal.style.cssText = `
//             position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//             background: rgba(0,0,0,0.85); z-index: 30000;
//             display: flex; justify-content: center; align-items: center;
//         `;
//         document.body.appendChild(modal);
//     }
    
//     // チェックボックス用の種族リスト
//     const speciesList = [
//         { id: 'robot', name: '🤖 ロボット' },
//         { id: 'dragon', name: '🐉 ドラゴン' },
//         { id: 'magician', name: '🧙 魔法使い' },
//         { id: 'spirit', name: '🍃 精霊' },
//         { id: 'stone', name: '🪨 ゴーレム' },
//         { id: 'machine', name: '⚙️ ぜんまい' },
//         { id: 'ghost', name: '👻 ゴースト' },
//         { id: 'bird', name: '🐦 鳥' },
//         { id: 'beetle', name: '🪲 虫' },
//         { id: 'seed', name: '🌱 つぼみ' },
//         { id: 'balloon', name: '🎈 風船' },
//         { id: 'support', name: '🎒 サポート(魔法/罠等)' }
//     ];
    
//     let speciesHtml = speciesList.map(s => `
//         <label style="display:flex; align-items:center; gap:5px; background:#111; padding:8px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
//             <input type="checkbox" value="${s.id}" class="auto-species-cb" style="transform: scale(1.2);" ${s.id==='robot'?'checked':''}>
//             <span style="font-size:14px; color:#fff;">${s.name}</span>
//         </label>
//     `).join('');
    
//     modal.innerHTML = `
//         <div style="background: #2a2a2a; border: 3px solid #00BCD4; border-radius: 12px; padding: 20px; width: 500px; max-width:90%; color: white; font-family: sans-serif; box-shadow: 0 0 30px rgba(0, 188, 212, 0.5); max-height:90vh; overflow-y:auto;">
//             <h3 style="color: #00BCD4; margin-top: 0; text-align:center; border-bottom:1px solid #444; padding-bottom:10px;">✨ おまかせデッキ編成</h3>
            
//             <div style="margin-bottom: 20px;">
//                 <h4 style="margin:0 0 10px 0; color:#FFD700;">1. 入れたい系統（複数選択可）</h4>
//                 <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
//                     ${speciesHtml}
//                 </div>
//             </div>
            
//             <div style="margin-bottom: 20px;">
//                 <h4 style="margin:0 0 10px 0; color:#FFD700;">2. デッキのコンセプト方針</h4>
//                 <div style="display:flex; flex-direction:column; gap:8px;">
//                     <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
//                         <input type="radio" name="auto-concept" value="balance" checked style="transform: scale(1.3);">
//                         <div>
//                             <div style="font-weight:bold; font-size:14px; color:#fff;">⚖️ バランス型</div>
//                             <div style="font-size:11px; color:#aaa;">色々なカードを程よく配合した標準デッキ。迷ったらこれ。</div>
//                         </div>
//                     </label>
//                     <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
//                         <input type="radio" name="auto-concept" value="aggro" style="transform: scale(1.3);">
//                         <div>
//                             <div style="font-weight:bold; font-size:14px; color:#fff;">⚔️ 低コスト速攻型</div>
//                             <div style="font-size:11px; color:#aaa;">コスト1〜3の軽いカードを最優先し、手数で盤面を制圧する。</div>
//                         </div>
//                     </label>
//                     <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
//                         <input type="radio" name="auto-concept" value="heavy" style="transform: scale(1.3);">
//                         <div>
//                             <div style="font-weight:bold; font-size:14px; color:#fff;">🌋 高コスト重火力型</div>
//                             <div style="font-size:11px; color:#aaa;">コスト4以上の大型モンスターを主軸にした一撃必殺のロマン砲。</div>
//                         </div>
//                     </label>
//                     <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
//                         <input type="radio" name="auto-concept" value="evolve" style="transform: scale(1.3);">
//                         <div>
//                             <div style="font-weight:bold; font-size:14px; color:#fff;">👑 進化特化型</div>
//                             <div style="font-size:11px; color:#aaa;">進化カードとその進化元となる基本カードを最優先でかき集める。</div>
//                         </div>
//                     </label>
//                     <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
//                         <input type="radio" name="auto-concept" value="support" style="transform: scale(1.3);">
//                         <div>
//                             <div style="font-weight:bold; font-size:14px; color:#fff;">🎒 サポート多用型</div>
//                             <div style="font-size:11px; color:#aaa;">アイテムや魔法、フィールドを大量に積み、トリッキーに戦う。</div>
//                         </div>
//                     </label>
//                 </div>
//             </div>
            
//             <div style="display: flex; justify-content: space-between; gap: 15px; margin-top:20px;">
//                 <button id="btn-auto-cancel" style="flex: 1; padding: 12px; background: #555; color: white; border: 2px solid #777; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#666'" onmouseout="this.style.background='#555'">キャンセル</button>
//                 <button id="btn-auto-exec" style="flex: 2; padding: 12px; background: #00BCD4; color: white; border: 2px solid #FFF; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#26C6DA'" onmouseout="this.style.background='#00BCD4'">この条件で編成する</button>
//             </div>
//         </div>
//     `;
//     modal.style.display = 'flex';
    
//     document.getElementById('btn-auto-cancel').onclick = () => modal.style.display = 'none';
    
//     document.getElementById('btn-auto-exec').onclick = () => {
//         // 選択された系統を取得
//         const cbs = document.querySelectorAll('.auto-species-cb:checked');
//         let selectedTypes = Array.from(cbs).map(cb => cb.value);
//         if (selectedTypes.length === 0) {
//             alert("少なくとも1つの系統を選んでください！"); return;
//         }
//         // 選択されたコンセプトを取得
//         const concept = document.querySelector('input[name="auto-concept"]:checked').value;
        
//         modal.style.display = 'none';
//         window.executeAutoBuildLogic(selectedTypes, concept);
//     };
// };

// // 2. 賢い自動編成ロジック本体
// window.executeAutoBuildLogic = function(selectedTypes, concept) {
//     let myCards = [...window.TCG.myCollection];
//     let selectedUids = [];

//     // まず、指定された系統のカードだけを抽出（プール化）
//     let pool = myCards.filter(c => {
//         if (selectedTypes.includes('support') && ['item','action','field'].includes(c.type)) return true;
//         for (let t of selectedTypes) {
//             if (t !== 'support' && c.type.startsWith(t)) return true;
//         }
//         return false;
//     });
    
//     // 指定外のカード（枠が余った時の埋め合わせ用）
//     let otherPool = myCards.filter(c => !pool.includes(c));

//     // ランダム性を出すため一旦シャッフル
//     window.shuffleArray(pool);
//     window.shuffleArray(otherPool);

//     // ★ 選ばれたコンセプトによる「優先度ソート」
//     if (concept === 'aggro') {
//         // コストの低い順（軽いカードがデッキに入りやすくなる）
//         pool.sort((a, b) => a.cost - b.cost);
//     } else if (concept === 'heavy') {
//         // コストの高い順（重いカードが入りやすくなる）
//         pool.sort((a, b) => b.cost - a.cost);
//     } else if (concept === 'evolve') {
//         // 進化カードと、その土台になる基本モンスターを優先して前に持ってくる
//         pool.sort((a, b) => {
//             let aEvo = a.evolvesFrom ? 1 : 0;
//             let bEvo = b.evolvesFrom ? 1 : 0;
//             let aBase = (!a.evolvesFrom && !['item','action','field'].includes(a.type)) ? 0.5 : 0;
//             let bBase = (!b.evolvesFrom && !['item','action','field'].includes(b.type)) ? 0.5 : 0;
//             return (bEvo + bBase) - (aEvo + aBase);
//         });
//     } else if (concept === 'support') {
//         // サポートカードを優先して前に持ってくる
//         pool.sort((a, b) => {
//             let aSup = ['item','action','field'].includes(a.type) ? 1 : 0;
//             let bSup = ['item','action','field'].includes(b.type) ? 1 : 0;
//             return bSup - aSup;
//         });
//     }

//     // ソートされたプールから、上から順に最大60枚をデッキに詰める
//     for (let c of pool) {
//         if (selectedUids.length < 60) selectedUids.push(c.uid);
//     }
    
//     // もし選んだ種族だけでは60枚に届かなかった場合、関係ないカードで埋める
//     for (let c of otherPool) {
//         if (selectedUids.length < 60 && !selectedUids.includes(c.uid)) selectedUids.push(c.uid);
//     }

//     // デッキを更新して画面に反映
//     window.TCG.editingDeck = selectedUids;
//     window.refreshDeckBuilderView();
    
//     // 少し遅れて画面中央にカッコいいメッセージを出す
//     const uiTitle = document.getElementById('db-title-text');
//     if(uiTitle) {
//         let msg = document.createElement('div');
//         msg.innerHTML = "✨ 条件に合わせて最強デッキを編成しました！<br>（右上の『デッキを保存』を押してください）";
//         msg.style.cssText = "position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); background:rgba(0,188,212,0.9); color:#fff; padding:20px 40px; border-radius:12px; font-weight:bold; font-size:20px; z-index:99999; box-shadow:0 10px 30px rgba(0,0,0,0.5); text-align:center; pointer-events:none; animation: slideUpFade 3s forwards;";
//         document.getElementById('tcg-deck-builder').appendChild(msg);
//         setTimeout(() => msg.remove(), 3000);
//     }
// };

// // ==========================================
// // 🪙 先攻・後攻 コイントス＆バランス調整 パッチ
// // ==========================================

// // --- 1. コイントス演出用のCSS ---
// if (!document.getElementById('tcg-cointoss-styles')) {
//     const style = document.createElement('style');
//     style.id = 'tcg-cointoss-styles';
//     style.innerHTML = `
//         @keyframes coinFlip {
//             0% { transform: rotateY(0deg) scale(1); }
//             50% { transform: rotateY(900deg) scale(1.5); }
//             100% { transform: rotateY(1800deg) scale(1); }
//         }
//         .coin-flip-anim { animation: coinFlip 2.5s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
//     `;
//     document.head.appendChild(style);
// }

// // --- 2. プレイヤーのターン開始処理（独立化） ---
// window.startPlayerTurn = function(isFirstTurn = false) {
//     const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
//     window.TCG_BATTLE.isEnemyTurn = false;

//     // ターン（ラウンド）数の加算：自分が先攻の時の2ターン目以降
//     if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'player') window.TCG_BATTLE.turn++;

//     // マナの回復
//     if (p.maxMana < 10) p.maxMana++;
//     p.currentMana = p.maxMana; p.actionUsed = false; window.TCG_BATTLE.selectedHandCardIndex = -1; 
    
//     let drewCard = false;
//     // ★ バランス調整：初手以外、または後攻の初手ならドロー（先攻1ターン目はドロー不可）
//     if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'cpu') && p.deck.length > 0) {
//         p.hand.push(p.deck.shift()); drewCard = true;
//     }
    
//     p.field.forEach(card => card.canAttack = true);
//     window.renderBattleBoard();

//     window.showTurnCutin(`TURN ${window.TCG_BATTLE.turn}\nYOUR TURN`, "#4CAF50", () => {
//         // ターン開始時効果
//         p.field.forEach((c, i) => {
//             if (c.isDead) return;
//             if (c.ability === "start_draw" && !c.isDead) {
//                 if (p.deck.length > 0) p.hand.push(p.deck.shift());
//                 window.showVFX(`p-card-${i}`, 'heal', 'Draw'); window.showBattleMessage("✨ 【超演算】\nターン開始時、追加で1枚ドロー！");
//             }
//             if (c.ability === "star_breath" && !c.isDead) { p.maxMana = Math.min(10, p.maxMana+2); p.currentMana = Math.min(10, p.currentMana+2); p.hp += 30; window.showVFX('player-face', 'heal', 30); }
//             if (c.ability === "heaven_judgement" && !c.isDead) {
//                 cpu.hp -= 20; window.showVFX('cpu-face', 'damage', 20);
//                 cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`c-card-${fi}`, 'damage', 20); window.checkDeath(f, cpu, `c-card-${fi}`); } });
//             }
//         });
//         cpu.field = cpu.field.filter(c => !c.isDead);
//         window.renderBattleBoard(); 
        
//         if (drewCard) window.showBattleMessage("✨ マナが回復し、カードを1枚引きました！", false, 2000);
//         else window.showBattleMessage("✨ マナが回復しました！\n（先攻1ターン目はドローなし）", false, 3500);
        
//         window.TCG_BATTLE.isAnimating = false; // オート用のロック解除
//     });
// };

// // --- 3. CPUのターン開始処理（上書き） ---
// window.executeCPUTurn = function(isFirstTurn = false) {
//     window.TCG_BATTLE.isEnemyTurn = true;
//     window.TCG_BATTLE.isAnimating = true;

//     const pField = window.TCG_BATTLE.player.field;
//     pField.forEach(c => { if (c.isDefending) { c._tempOriginalAbility = c.ability; c.ability = "taunt"; } });

//     const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

//     // ターン数の加算：CPUが先攻の時の2ターン目以降
//     if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

//     if (cpu.maxMana < 10) cpu.maxMana++;
//     cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
//     // ★ バランス調整：初手以外、または後攻の初手ならドロー
//     if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
//         cpu.hand.push(cpu.deck.shift());
//     }

//     cpu.field.forEach((c, i) => {
//         if (c.isDead) return;
//         if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
//         if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
//         if (c.ability === "heaven_judgement" && !c.isDead) {
//             p.hp -= 20; window.showVFX('player-face', 'damage', 20);
//             p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`); } });
//         }
//     });
    
//     cpu.field.forEach(card => card.canAttack = true);
//     window.renderBattleBoard();

//     setTimeout(() => {
//         let delay = 0;
//         cpu.field.forEach((cpuCard, cpuIndex) => {
//             if (!cpuCard.canAttack || cpuCard.damage <= 0) return;
//             setTimeout(() => {
//                 const tauntTargets = p.field.filter(c => c.ability === "taunt" || c.isDefending);
//                 const validTargets = p.field.filter(c => c.ability !== "stealth"); 
//                 let target = null; let targetHtmlId = null;

//                 const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill";
//                 if (tauntTargets.length > 0 && !isPierce) target = tauntTargets[Math.floor(Math.random() * tauntTargets.length)];
//                 else if (validTargets.length > 0 && Math.random() > 0.5) target = validTargets[Math.floor(Math.random() * validTargets.length)];

//                 let dmgToTarget = cpuCard.damage; let dmgToAttacker = target ? target.damage : 0;

//                 if (target) {
//                     targetHtmlId = `p-card-${p.field.indexOf(target)}`;
//                     if (target.ability === "absolute_field") dmgToTarget = 1;
//                     if (cpuCard.ability === "absolute_field") dmgToAttacker = 1;
//                     if (target.ability === "absolute_fortress") dmgToTarget = Math.max(0, dmgToTarget - 20);
//                     if (cpuCard.ability === "absolute_fortress") dmgToAttacker = Math.max(0, dmgToAttacker - 20);

//                     target.hp -= dmgToTarget; window.showVFX(targetHtmlId, 'slash'); window.showVFX(targetHtmlId, 'damage', dmgToTarget);
//                     window.checkDeath(target, p, targetHtmlId);
//                     if (target.ability === "stealth") target.ability = null;
//                 } else {
//                     p.hp -= dmgToTarget; window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', dmgToTarget);
//                     const ui = document.getElementById('tcg-battle-ui'); ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect');
//                 }

//                 if (cpuCard.ability === "dimension_drill" && target) { p.hp -= dmgToTarget; window.showVFX('player-face', 'damage', dmgToTarget); }
//                 if (cpuCard.ability === "god_strike") {
//                     const otherP = p.field.filter(c => c !== target && !c.isDead);
//                     if (otherP.length > 0) { let tCard = otherP[Math.floor(Math.random() * otherP.length)]; tCard.hp = 0; window.checkDeath(tCard, p, `p-card-${p.field.indexOf(tCard)}`); }
//                 }

//                 if (dmgToAttacker > 0) {
//                     setTimeout(() => { cpuCard.hp -= dmgToAttacker; window.showVFX(`c-card-${cpuIndex}`, 'slash'); window.showVFX(`c-card-${cpuIndex}`, 'damage', dmgToAttacker); window.checkDeath(cpuCard, cpu, `c-card-${cpuIndex}`); }, 200);
//                 }
                
//                 if (cpuCard.ability === "stealth") cpuCard.ability = null;
//                 cpuCard.canAttack = false; window.renderBattleBoard();
//             }, delay);
//             delay += 800;
//         });

//         setTimeout(() => {
//             pField.forEach(c => { if (c.isDefending && c._tempOriginalAbility !== undefined) c.ability = c._tempOriginalAbility; });
//             p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

//             if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

//             for (let i = cpu.hand.length - 1; i >= 0; i--) {
//                 let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
//                 if (cpu.currentMana >= actualCost) {
//                     if (card.type === 'action' && cpu.actionUsed) continue;
//                     if (card.evolvesFrom) {
//                         let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
//                         if (targetIndex !== -1) {
//                             cpu.currentMana -= actualCost; cpu.hand.splice(i, 1); card.canAttack = false;
//                             cpu.field[targetIndex] = card; window.triggerPlayEffect(card, false); continue;
//                         } else { continue; }
//                     }
//                     cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
//                     if (card.type === 'action') cpu.actionUsed = true;
//                     if (card.type === 'item' || card.type === 'action') { window.triggerPlayEffect(card, false); } 
//                     else { card.canAttack = false; cpu.field.push(card); window.triggerPlayEffect(card, false); }
//                 }
//             }

//             cpu.field.forEach((c, i) => {
//                 if (c.isDead) return;
//                 if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
//                 if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
//                 if (c.ability === "event_horizon") {
//                     const aliveEnemies = p.field.filter(e => !e.isDead);
//                     if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
//                 }
//                 if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
//                     let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
//                     cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
//                 }
//             });
//             p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

//             // CPUターン終了後、プレイヤーのターンを開始する
//             window.startPlayerTurn(false);

//         }, delay + 500);
//     }, 800); 
// };

// // --- 4. プレイヤーのターン終了時効果（上書き） ---
// window.executeRealEndTurn = function() {
//     window.TCG_BATTLE.isAnimating = true;
//     const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
//     p.field.forEach((c, i) => {
//         if (c.isDead) return;
//         if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`p-card-${i}`, 'heal', 20); }
//         if (c.ability === "cyber_miracle") { p.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`p-card-${fi}`, 'heal', '回復'); } }); }
//         if (c.ability === "event_horizon") {
//             const aliveEnemies = cpu.field.filter(e => !e.isDead);
//             if (aliveEnemies.length > 0) {
//                 let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
//                 target.isDead = true; cpu.deck.push(target); window.showVFX(`c-card-${cpu.field.indexOf(target)}`, 'slash', 'バウンス');
//             }
//         }
//         if (c.ability === "divine_grace" && p.graveyard && p.graveyard.length > 0) {
//             let resCard = p.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
//             p.field.push(resCard); window.showBattleMessage("✨ 【神の恩寵】\n破壊された味方が復活した！");
//         }
//     });
//     p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);
//     window.showTurnCutin("ENEMY TURN", "#ff5252", () => { window.executeCPUTurn(false); });
// };

// // --- 5. バトル開始の初期化とコイントス（完全上書き） ---
// window.startBattle = function(enemyData = null) {
//     if (!window.TCG.decks[0] || window.TCG.decks[0].length < 60) {
//         alert("デッキが保存されていないか、60枚以上ありません！先にデッキ編成を完了してください。"); return;
//     }

//     // 初期化（マナは0からスタートし、ターン開始時に1になる）
//     window.TCG_BATTLE = {
//         player: { hp: 200, maxMana: 0, currentMana: 0, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
//         cpu:    { hp: 200, maxMana: 0, currentMana: 0, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
//         turn: 1, selectedAttackerIndex: -1, selectedHandCardIndex: -1, _skipDefendHint: false,
//         firstPlayer: 'player', isEnemyTurn: false, isAnimating: true, isAuto: false
//     };
//     const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

//     let battleUI = document.getElementById('tcg-battle-ui');
//     if (!battleUI) {
//         battleUI = document.createElement('div');
//         battleUI.id = 'tcg-battle-ui';
//         battleUI.style.cssText = `
//             position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//             background: #2a2a2a; z-index: 20000; display: flex; flex-direction: column; 
//             font-family: sans-serif; color: white; overflow: hidden;
//         `;
//         document.body.appendChild(battleUI);
//     }

//     p.deck = window.TCG.decks[0].map(uid => {
//         const originalCard = window.TCG.myCollection.find(c => c.uid === uid);
//         if (!originalCard) return null;
//         let cardCopy = JSON.parse(JSON.stringify(originalCard));
//         let master = window.TCG_MASTER[cardCopy.masterId];
//         if (master) cardCopy.hp = Math.max(cardCopy.hp, master.baseHp);
//         cardCopy.isDead = false; cardCopy.canAttack = false; cardCopy.isDefending = false;
//         return cardCopy;
//     }).filter(c => c !== null);
//     window.shuffleArray(p.deck);

//     if (enemyData && enemyData.deck) {
//         cpu.deck = enemyData.deck.map((dCard, i) => {
//             let master = window.TCG_MASTER[dCard.masterId];
//             if(!master) return null;
//             return {
//                 uid: 'ghost_' + i, masterId: dCard.masterId, name: dCard.name || master.name, type: master.type,
//                 cost: master.baseCost, hp: dCard.hp || master.baseHp, 
//                 skillName: master.skillName, skillCost: master.skillCost, damage: dCard.damage || master.baseDmg, 
//                 ability: master.ability, image: master.image, imageIndex: master.imageIndex,
//                 offsetX: master.offsetX, offsetY: master.offsetY, zoomX: master.zoomX, zoomY: master.zoomY, canAttack: false, isDefending: false
//             };
//         }).filter(c => c !== null);
//         if(cpu.deck.length < 60) { alert("敵のデッキデータが不完全です。通常のCPUと対戦します。"); enemyData = null; } 
//         else { window.shuffleArray(cpu.deck); }
//     } 

//     if (!enemyData || !enemyData.deck) {
//         const allMasterKeys = Object.keys(window.TCG_MASTER);
//         for (let i = 0; i < Math.max(60, p.deck.length); i++) {
//             let randomKey = allMasterKeys[Math.floor(Math.random() * allMasterKeys.length)];
//             let master = window.TCG_MASTER[randomKey];
//             cpu.deck.push({
//                 uid: 'cpu_' + i, masterId: randomKey, name: master.name, type: master.type,
//                 cost: master.baseCost, hp: master.baseHp, skillName: master.skillName,
//                 skillCost: master.skillCost, damage: master.baseDmg, ability: master.ability,
//                 image: master.image, imageIndex: master.imageIndex, offsetX: master.offsetX,
//                 offsetY: master.offsetY, zoomX: master.zoomX, zoomY: master.zoomY, canAttack: false, isDefending: false
//             });
//         }
//     }

//     window.renderBattleBoard();

//     let cpuNameLabel = document.getElementById('cpu-name-label');
//     if (!cpuNameLabel) {
//         cpuNameLabel = document.createElement('div');
//         cpuNameLabel.id = 'cpu-name-label';
//         cpuNameLabel.style.cssText = 'position:absolute; top:20px; right:30px; color:#FF5252; font-weight:bold; font-size:24px; text-shadow:0 0 10px #000; z-index:100;';
//         battleUI.appendChild(cpuNameLabel);
//     }
//     cpuNameLabel.innerHTML = enemyData ? `VS ${enemyData.playerName}` : "VS 名もなきCPU";
    
//     battleUI.style.display = 'flex';

//     const blocker = document.createElement('div');
//     blocker.id = 'tcg-battle-blocker';
//     blocker.style.cssText = `position: fixed; top:0; left:0; width:100%; height:100%; z-index:25000;`;
//     document.body.appendChild(blocker);

//     const splash = document.createElement('div');
//     splash.id = 'tcg-battle-splash';
//     splash.style.cssText = `
//         position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//         background: rgba(0,0,0,0.85); z-index: 26000; display: flex;
//         justify-content: center; align-items: center; color: white;
//         font-size: 80px; font-weight: bold; font-style: italic; text-align:center; line-height:1.2;
//         text-shadow: 0 0 30px #FF9800, 5px 5px 0 #000;
//         opacity: 0; transform: scale(1.5); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//     `;
//     splash.innerHTML = enemyData ? `ONLINE BATTLE !!<br><span style="font-size:50px; color:#4fc3f7;">VS ${enemyData.playerName}</span>` : "BATTLE START !!";
//     document.body.appendChild(splash);

//     setTimeout(() => { splash.style.opacity = '1'; splash.style.transform = 'scale(1)'; }, 50);

//     setTimeout(() => {
//         splash.style.opacity = '0'; splash.style.transform = 'scale(0.8)';
//         setTimeout(() => {
//             splash.remove();
            
//             // 🪙 コイントス演出
//             const isPlayerFirst = Math.random() < 0.5;
//             window.TCG_BATTLE.firstPlayer = isPlayerFirst ? 'player' : 'cpu';
//             window.TCG_BATTLE.isEnemyTurn = !isPlayerFirst;
            
//             const coinUI = document.createElement('div');
//             coinUI.style.cssText = `
//                 position: fixed; top: 0; left: 0; width: 100%; height: 100%;
//                 background: rgba(0,0,0,0.85); z-index: 26000; display: flex; flex-direction: column;
//                 justify-content: center; align-items: center; color: white;
//             `;
//             coinUI.innerHTML = `
//                 <div style="font-size: 30px; font-weight: bold; margin-bottom: 30px; color:#00BCD4;">先攻・後攻を決定します...</div>
//                 <div class="coin-flip-anim" style="width: 150px; height: 150px; background: #FFD700; border-radius: 50%; border: 10px solid #FFA000; box-shadow: inset 0 0 20px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; font-size: 60px; font-weight: bold; color: #B28900; text-shadow: 1px 1px 0px #FFF;">
//                     TCG
//                 </div>
//             `;
//             document.body.appendChild(coinUI);

//             setTimeout(() => {
//                 coinUI.innerHTML = `
//                     <div style="font-size: 50px; font-weight: bold; margin-bottom: 30px; color:${isPlayerFirst ? '#4CAF50' : '#ff5252'}; text-shadow: 0 0 20px ${isPlayerFirst ? '#4CAF50' : '#ff5252'};">
//                         ${isPlayerFirst ? 'あなたの先攻！' : '敵の先攻！'}
//                     </div>
//                 `;
//                 setTimeout(() => {
//                     coinUI.style.opacity = '0';
//                     coinUI.style.transition = '0.5s';
//                     setTimeout(() => {
//                         coinUI.remove();
                        
//                         // 初期ドロー (5枚ずつ)
//                         let drawCount = 0;
//                         const drawTimer = setInterval(() => {
//                             if (drawCount < 5) {
//                                 p.hand.push(p.deck.shift());
//                                 cpu.hand.push(cpu.deck.shift());
//                                 window.showBattleMessage(`シュッ！ (手札: ${drawCount + 1}枚)`, false, 250);
//                                 window.renderBattleBoard();
//                                 drawCount++;
//                             } else {
//                                 clearInterval(drawTimer);
//                                 blocker.remove(); 
                                
//                                 // ターン開始！
//                                 if (isPlayerFirst) {
//                                     window.startPlayerTurn(true);
//                                 } else {
//                                     window.showTurnCutin("ENEMY TURN", "#ff5252", () => {
//                                         window.executeCPUTurn(true);
//                                     });
//                                 }
//                             }
//                         }, 350);
//                     }, 500);
//                 }, 2000);
//             }, 2500);
//         }, 500);
//     }, 1500); 
// };

// ==========================================
// 2. ヘルパー関数（タイプ名取得など）
// ==========================================
window.getCardTypeName = function(type) {
    if (type.includes('type1')) return '闇';
    if (type.includes('type2')) return '美';
    if (type.includes('type3_2')) return '賢+';
    if (type.includes('type3_3')) return '賢++'; // 2段進化用
    if (type.includes('type3')) return '賢';
    if (type.includes('type4_2')) return '活+';
    if (type.includes('type4_3')) return '活++'; // 2段進化用
    if (type.includes('type4')) return '活';
    if (type.includes('type5_2')) return '老+';   // 2段進化用
    if (type.includes('type5')) return '老';
    if (type === 'robot') return '機';
    
    const map = {
        'dragon':'竜', 'magician':'魔', 'spirit':'精', 'stone':'岩',
        'machine':'械', 'ghost':'霊', 'bird':'鳥', 'beetle':'虫',
        'seed':'草', 'balloon':'風', 'item':'具', 'action':'技', 'field':'地'
    };
    return map[type] || '無';
};

window.getEvolvesFromName = function(evolvesFromType) {
    const map = {
        'robot': '基本ロボット', 'robot_type1': 'キリング系', 'robot_type2': 'アイドル系', 'robot_type3': 'アナリティクス系', 'robot_type3_2': 'マザー系', 'robot_type4': 'タンク系', 'robot_type4_2': 'アサルト系', 'robot_type5': 'スクラップ系',
        'dragon': '基本ドラゴン', 'dragon_type4': 'ワイバーン系', 'dragon_type1': '邪竜系', 'dragon_type5': '古竜系', 'dragon_type3': '水竜系', 'dragon_type2': '宝石竜系',
        'magician': '基本魔法使い', 'magician_type4': '武闘派系', 'magician_type1': '魔女系', 'magician_type5': '老魔道士系', 'magician_type2': '幻術師系', 'magician_type3': '学者系',
        'ghost': '基本ゴースト', 'ghost_type4': 'ポルターガイスト系', 'ghost_type5': '古霊系', 'ghost_type1': '悪霊系', 'ghost_type3': '学者幽霊系', 'ghost_type2': '聖霊系',
        'seed': '基本つぼみ', 'seed_type4': '野生植物系', 'seed_type1': '毒草系', 'seed_type5': '老木系', 'seed_type3': '知識の葉系', 'seed_type2': 'アロマ系',
        'spirit': '基本精霊', 'spirit_type4': 'ゴーレム系', 'spirit_type5': '枯葉系', 'spirit_type1': '毒キノコ系', 'spirit_type3': '記録精霊系', 'spirit_type2': '妖精系',
        'stone': '基本ゴーレム', 'stone_type4': 'マグマ系', 'stone_type5': '遺跡系', 'stone_type1': 'ガーゴイル系', 'stone_type3': 'ルーン石系', 'stone_type2': 'クリスタル系',
        'machine': '基本ぜんまい', 'machine_type4': 'スチーム系', 'machine_type5': 'アンティーク系', 'machine_type1': '呪い人形系', 'machine_type3': 'エンジン系', 'machine_type2': 'オルゴール系',
        'bird': '基本鳥', 'bird_type4': '猛禽系', 'bird_type5': 'フクロウ系', 'bird_type1': 'カラス系', 'bird_type3': 'ルーン鳥系', 'bird_type2': '輝鳥系',
        'beetle': '基本かぶとむし', 'beetle_type4': '巨角系', 'beetle_type5': '琥珀系', 'beetle_type1': '狂刃系', 'beetle_type3': '指揮官系', 'beetle_type2': '宝石虫系',
        'balloon': '基本風船', 'balloon_type4': 'マッスル系', 'balloon_type1': 'スモッグ系', 'balloon_type5': 'デフレート系', 'balloon_type3': '気象系', 'balloon_type2': 'シャボン系'
    };
    return map[evolvesFromType] || evolvesFromType;
};

// ★ マナソヴリン（コスト半減）対応
window.getActualCost = function(owner, card) {
    let cost = card.cost;
    if (owner.field.some(c => c.ability === 'mana_sovereign' && !c.isDead)) {
        cost = Math.ceil(cost / 2); // コスト半減
    }
    if (card.type === 'action') {
        if (owner.field.some(c => c.ability === 'all_zero_cost' && !c.isDead)) return 0;
        if (owner.field.some(c => c.ability === 'aura_action_cost' && !c.isDead)) cost = Math.max(0, cost - 1);
    }
    return Math.max(0, cost);
};

// ★ 新死亡時能力の追加（道連れ、全体バウンス、超新星など）
window.checkDeath = function(card, owner, htmlId, enemyOwner = null) {
    if (card.hp <= 0 && !card.isDead) {
        if ((card.ability === "eternal_rebirth" || card.ability === "rebirth") && !card._reborn) {
            card.hp = card.maxHp || 100; 
            card._reborn = true;
            window.showVFX(htmlId, 'heal', '復活!');
            window.showBattleMessage(`⏳ 【${card.ability === "rebirth" ? "輪廻転生" : "悠久の再生"}】\n${card.name} が復活した！`);
            if (card.ability === "rebirth" && enemyOwner) {
                enemyOwner.field.forEach((ec, idx) => {
                    if(!ec.isDead) {
                        ec.hp -= 30;
                        window.showVFX(`${enemyOwner === window.TCG_BATTLE.cpu ? 'c' : 'p'}-card-${idx}`, 'damage', 30);
                    }
                });
                window.showBattleMessage(`🔥 フェニックスの業火が敵を焼く！`, false, 2000);
            }
        } else {
            card.isDead = true;
            if (!owner.graveyard) owner.graveyard = [];
            owner.graveyard.push(card); 

            // --- 死亡時発動アビリティ ---
            if (card.ability === "curse_death" && enemyOwner) {
                enemyOwner.hp -= 50;
                window.showVFX(enemyOwner === window.TCG_BATTLE.cpu ? 'cpu-face' : 'player-face', 'slash');
                window.showVFX(enemyOwner === window.TCG_BATTLE.cpu ? 'cpu-face' : 'player-face', 'damage', 50);
                window.showBattleMessage(`💀 【死の呪い】\n敵リーダーに怨念のダメージ！`);
            }
            if (card.ability === "death_bomb" && enemyOwner) {
                enemyOwner.hp -= 20;
                const faceId = enemyOwner === window.TCG_BATTLE.cpu ? 'cpu-face' : 'player-face';
                window.showVFX(faceId, 'slash'); window.showVFX(faceId, 'damage', 20);
                window.showBattleMessage(`💣 【誘爆】\n敵リーダーに20ダメージ！`, false, 2000, !isPlayerOwner, true);
                
                // 画面揺れ演出
                const ui = document.getElementById('tcg-battle-ui'); 
                if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
            }
            if (card.ability === "burst_spores") {
                owner.field.forEach((ac, idx) => {
                    if(!ac.isDead) { 
                        ac.hp += 30; ac.damage += 10; 
                        window.showVFX(`${owner === window.TCG_BATTLE.player ? 'p' : 'c'}-card-${idx}`, 'heal', '強化'); 
                    }
                });
                window.showBattleMessage(`🍄 【破裂胞子】\n味方全体が回復＆攻撃力UP！`);
            }
            if (card.ability === "nova_burst" && enemyOwner) {
                let dmg = card.maxHp || 100;
                enemyOwner.field.forEach((ec, idx) => {
                    if(!ec.isDead) { 
                        ec.hp -= dmg; 
                        window.showVFX(`${enemyOwner === window.TCG_BATTLE.cpu ? 'c' : 'p'}-card-${idx}`, 'damage', dmg); 
                    }
                });
                window.showBattleMessage(`💥 【超新星爆発】\n敵全体に ${dmg} ダメージ！`);
            }
            if (card.ability === "mass_bounce" && enemyOwner) {
                enemyOwner.field.forEach((ec) => {
                    if(!ec.isDead) { ec.isDead = true; enemyOwner.deck.push(ec); }
                });
                window.showBattleMessage(`🌪️ 【全バウンス】\n敵全体を山札に吹き飛ばした！`);
            }
        }
    }
};

// ==========================================
// 3. 引退したAIからカードを生成する関数 (偽装対応 ＆ コスト保証パッチ)
// ==========================================
window.generateCardFromAI = function(aiPet) {
    let rawRace = aiPet.currentSkin || aiPet.baseType || 'robot';
    let candidateKeys = Object.keys(window.TCG_MASTER).filter(key => window.TCG_MASTER[key].type === rawRace);
    
    if (candidateKeys.length === 0) {
        let baseRace = rawRace.split('_')[0];
        candidateKeys = Object.keys(window.TCG_MASTER).filter(key => window.TCG_MASTER[key].type === baseRace);
    }
    if (candidateKeys.length === 0) {
        candidateKeys = Object.keys(window.TCG_MASTER).filter(key => window.TCG_MASTER[key].type === 'robot');
    }

    // ==========================================
    // ★ 追加：ステータスに基づく「最低保証コスト」の計算
    // ==========================================
    const totalStats = (aiPet.stats.power || 0) + (aiPet.stats.intel || 0) + (aiPet.stats.beauty || 0);
    // 合計ステータスが 50 上がるごとに、最低保証コストが 1 ずつ上がる（最大コスト8まで）
    const minCost = Math.max(1, Math.min(8, Math.floor(totalStats / 50)));

    // 候補の中から、最低保証コスト「以上」のカードだけに絞り込む
    let validKeys = candidateKeys.filter(k => window.TCG_MASTER[k].baseCost >= minCost);
    
    // もし「その種族に該当する高コストカードが存在しない」場合は、
    // その種族の中で『一番コストが高いカード』を確定でドロップさせる
    if (validKeys.length === 0) {
        candidateKeys.sort((a, b) => window.TCG_MASTER[b].baseCost - window.TCG_MASTER[a].baseCost);
        validKeys = [candidateKeys[0]];
    }

    const masterId = validKeys[Math.floor(Math.random() * validKeys.length)];
    const masterData = window.TCG_MASTER[masterId];
    if (!masterData) return null;

    // さらにステータスから微量のボーナス値を乗せる
    const hpBonus = Math.floor((aiPet.stats.power || 0) / 10);
    const dmgBonus = Math.floor((aiPet.stats.intel || 0) / 10);

    const newCard = {
        uid: 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000), 
        masterId: masterId, name: masterData.name, type: masterData.type,
        cost: masterData.baseCost, hp: masterData.baseHp + hpBonus, maxHp: masterData.baseHp + hpBonus,
        skillName: masterData.skillName, skillCost: masterData.skillCost,
        damage: masterData.baseDmg > 0 ? masterData.baseDmg + dmgBonus : 0,
        ability: masterData.ability, image: masterData.image, imageIndex: masterData.imageIndex,
        sx: masterData.sx, sy: masterData.sy, sw: masterData.sw, sh: masterData.sh,
        scaleX: masterData.scaleX, scaleY: masterData.scaleY, evolvesFrom: masterData.evolvesFrom
    };

    window.TCG.myCollection.push(newCard);
    window.saveTCGData();

    // ★ 偽装処理: 60枚未満ならアルバム風のメッセージにする
    const isUnlocked = window.TCG.myCollection.length >= 60;
    const msg = isUnlocked ? "🎉 AIの生涯がカードに刻まれた！ 🎉" : "✨ AIとの思い出がアルバムに追加された！ ✨";
    window.showCardUnlockPopup(newCard, msg);
    return newCard;
};

// ==========================================
// 4. HTML描画機能（偽装対応・アビリティ完全保持版・超軽量化パッチ）
// ==========================================
window.renderCardHTML = function(card) {
    if (typeof window.TCG_MASTER !== 'undefined') {
        let masterData = null;
        if (card.masterId && window.TCG_MASTER[card.masterId]) {
            masterData = window.TCG_MASTER[card.masterId];
        }
        if (!masterData || masterData.sx === undefined) {
            const safeName = (card.name || "").trim();
            const adjustedKey = Object.keys(window.TCG_MASTER).find(k => {
                const target = window.TCG_MASTER[k];
                return target && target.name && target.name.trim() === safeName && target.sx !== undefined;
            });

            if (adjustedKey) {
                masterData = window.TCG_MASTER[adjustedKey]; 
            } else {
                const fallbackKey = Object.keys(window.TCG_MASTER).find(k => {
                    const target = window.TCG_MASTER[k];
                    return target && target.name && target.name.trim() === safeName;
                });
                if (fallbackKey) masterData = window.TCG_MASTER[fallbackKey];
            }
        }

        if (masterData) {
            if (masterData.sx !== undefined) card.sx = masterData.sx;
            if (masterData.sy !== undefined) card.sy = masterData.sy;
            if (masterData.sw !== undefined) card.sw = masterData.sw;
            if (masterData.sh !== undefined) card.sh = masterData.sh;
            if (masterData.scaleX !== undefined) card.scaleX = masterData.scaleX;
            if (masterData.scaleY !== undefined) card.scaleY = masterData.scaleY;
            if (masterData.image) card.image = masterData.image; 
        }
    }

    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;

    let abilityText = card.abilityTextOverride || "";
    if (!abilityText) {
        const texts = {
            "taunt": "【かばう】(相手の攻撃を代わりに受ける)",
            "stealth": "【潜伏】(攻撃するまでターゲットにされない)",
            "heal_self": "【修復】(自分のHPを小回復する)",
            "draw_card": "【ドロー】(山札からカードを引く)",
            "flight": "【飛行】(かばうを無視して攻撃できる)",
            "mana_ramp": "【成長】(自分の最大マナを+1する)",
            "haste": "【速攻】(場に出たターンにすぐ攻撃できる)",
            "trample": "【貫通】(敵を倒した時、超過ダメージをリーダーに与える)",
            "death_bomb": "【誘爆】(破壊された時、相手リーダーに20ダメージ)",
            "pierce_recoil": "【暴走回路】(かばう無視・攻撃時自身にダメ)",
            "aoe_heal_play": "【全体回復】(登場時、味方全員を回復)",
            "start_draw": "【超演算】(自ターン開始時、1枚ドロー)",
            "aura_action_cost": "【万能魔法】(場にいる間、アクションコスト-1)",
            "heavy_armor": "【重装甲】(受けるダメージを常に-10)",
            "snipe_play": "【殲滅】(登場時、ランダムな敵にダメージ)",
            "end_heal": "【悠久の風化】(ターン終了時、自身のHP回復)",
            "god_strike": "【神の一撃】(貫通・攻撃時敵1体即死)",
            "cyber_miracle": "【電脳の奇跡】(ターン終了時、味方全回復)",
            "dimension_hack": "【超次元ハック】(登場時、敵手札破壊＆ドロー)",
            "all_zero_cost": "【森羅万象】(場にいる間、アクションのコスト0)",
            "absolute_field": "【絶対領域】(受けるあらゆるダメージを1にする)",
            "crimson_end": "【終末の紅蓮】(登場時、敵全体に50ダメ)",
            "star_breath": "【星の息吹】(ターン開始時マナ+2＆リーダー回復)",
            "perfect_predation": "【完全捕食】(登場時、敵1体を破壊し吸収)",
            "nightmare_rule": "【悪夢の君臨】(登場時、全敵のHPを強制半減)",
            "star_hope": "【希望の星】(登場時、味方全回復＆かばう付与)",
            "divine_grace": "【神の恩寵】(ターン終了時、破壊された味方蘇生)",
            "heaven_punishment": "【天罰】(登場時、全敵モンスターに50ダメージ)",
            "event_horizon": "【事象の地平】(ターン終了時、敵1体を山札に戻す)",
            "truth_overwrite": "【真理の書換】(登場時、3枚ドロー＆最大マナ+3)",
            "heaven_judgement": "【天の裁き】(ターン開始時、敵全体に20ダメ)",
            "absolute_fortress": "【絶対要塞】(受けるダメージを常に-20する)",
            "dimension_drill": "【次元穿孔】(貫通・リーダーにも同じダメを与える)",
            "super_gravity": "【超重力】(登場時、自身以外の全モンスターに100ダメ)",
            "eternal_rebirth": "【悠久の再生】(破壊された時、一度だけHP満タンで復活)",
            "burn_field": "【焦土化】(ターン終了時、敵全体に少ダメージ)",
            "cataclysm": "【天変地異】(ターン終了時、敵全体に貫通大ダメージ)",
            "spell_echo": "【魔法反響】(登場・スキル使用時、ダメージ増幅)",
            "mana_refund": "【魔力還元】(登場・スキル使用時、マナが回復)",
            "charm_enemy": "【魅惑】(登場時、敵1体を確率で「魅了」する)",
            "mass_charm": "【全体魅了】(登場時、敵全体を確率で「魅了」する)",
            "curse_death": "【道連れ】(破壊された時、敵リーダーに大ダメージ)",
            "soul_drain": "【魂吸収】(攻撃で与えたダメージの半分を回復)",
            "soul_reap": "【魂刈り】(攻撃時、相手の最大HPも減少させる)",
            "thorns": "【茨の鎧】(攻撃を受けた時、相手にも反射ダメージ)",
            "void_counter": "【虚無】(一度だけダメージを無効化し倍返しする)",
            "devour": "【捕食】(敵を倒した時、自身のHPと攻撃力UP)",
            "apex_predator": "【頂点捕食】(敵を倒した時、ステータスが倍増する)",
            "burst_spores": "【破裂胞子】(破壊された時、味方全体を回復＆強化)",
            "absolute_sanctuary": "【絶対聖域】(ターン終了時、味方全体を回復する)",
            "mana_sovereign": "【魔力の支配者】(場にいる間、味方の全コスト半減)",
            "impregnable_armor": "【難攻不落】(30以下のダメージを完全に無効化する)",
            "pure_aegis": "【純真の盾】(かばう＋あらゆる状態異常を無効化)",
            "infinite_gear": "【無限歯車】(ターン開始時、手札が5枚になるようドロー)",
            "doomsday_detonation": "【終末起爆】(登場時、盤面全てを消し飛ばす)",
            "rebirth": "【輪廻転生】(破壊された時、一度だけ復活し敵を焼く)",
            "absolute_evasion": "【絶対回避】(敵からの攻撃を高い確率で無効化する)",
            "piercing_juggernaut": "【暴走貫通】(攻撃するたび火力が上がり、かばう無視)",
            "fossilize": "【化石化】(登場時、敵1体を確率で「スタン」させる)",
            "mass_bounce": "【全バウンス】(破壊された時、全敵を山札に戻す)",
            "nova_burst": "【超新星爆発】(破壊された時、敵全体に最大HP分ダメ)",
            "time_manipulation": "【時空操作】(登場時、行動済みの味方を未行動にする)",
            "raise_dead": "【死霊復活】(ターン終了時、破壊された味方を半分の力で蘇生)"
        };
        abilityText = texts[card.ability] || "";
    }

    // ==========================================
    // ★最強の安全装置：存在しない画像は最初から読み込まず、ダミーのグラデーションにする！
    // ==========================================
    let imgPath = card.image;
    // imgPathが未定義、あるいは "characters.png" (古くて削除された画像名) の場合は null にして通信を防ぐ
    if (!imgPath || imgPath === 'characters.png') {
        imgPath = null;
    } else if (typeof imageSources !== 'undefined' && imageSources[imgPath]) {
        imgPath = imageSources[imgPath]; 
    }

    const flavorText = (card.type === 'item' || card.type === 'action' || card.type === 'field')
        ? "冒険の途中で見つけた、かけがえのない記憶の欠片。" 
        : "AIがこれまでの人生で培ってきた、確かな成長の証。";

    let displayCost = card.cost;
    if (window.TCG_BATTLE && window.TCG_BATTLE.player) {
        let owner = window.TCG_BATTLE.player.hand.includes(card) ? window.TCG_BATTLE.player : null;
        if (!owner && window.TCG_BATTLE.cpu.hand.includes(card)) owner = window.TCG_BATTLE.cpu;
        if (owner) displayCost = window.getActualCost(owner, card);
    }
    const costColor = displayCost < card.cost ? "#4CAF50" : "#FFD700";
    const typeName = window.getCardTypeName(card.type);

    let html = `
    <div class="tcg-card" style="width: 180px; height: 260px; background-color: #222; border: 4px solid #555; border-radius: 12px; position: relative; font-family: sans-serif; color: white; box-shadow: 0 4px 8px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; user-select: none;">`;

    if (card.status === 'stunned' && !card.isDead) {
        html += `<div style="position:absolute; top:35%; left:5%; background:#795548; color:white; padding:5px 15px; border-radius:6px; font-weight:bold; font-size:22px; transform:rotate(-15deg); z-index:15; border: 2px solid #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">🪨 化石化</div>`;
    }
    if (card.status === 'charmed' && !card.isDead) {
        html += `<div style="position:absolute; top:35%; left:15%; background:#E91E63; color:white; padding:5px 15px; border-radius:6px; font-weight:bold; font-size:22px; transform:rotate(15deg); z-index:15; border: 2px solid #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">💕 魅了</div>`;
    }

    if (isUnlocked) {
        html += `<div style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; background: ${costColor}; color: #000; border-radius: 50%; font-weight: bold; font-size: 18px; display: flex; justify-content: center; align-items: center; border: 2px solid #FFF; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.5);">${displayCost}</div>`;
    }

    // ★画像パス (imgPath) が null の場合は、ダミーのCSSグラデーションを描画して通信をさせない！
    if (card.sx !== undefined) {
        const scX = card.scaleX !== undefined ? card.scaleX : 1.0;
        const scY = card.scaleY !== undefined ? card.scaleY : 1.0;
        const sw = card.sw || 50; const sh = card.sh || 50;
        const sx = card.sx || 0; const sy = card.sy || 0;

        let imgStyle = imgPath 
            ? `background-image: url('${imgPath}'); background-position: ${-sx}px ${-sy}px; background-repeat: no-repeat;`
            : `background: linear-gradient(135deg, #444, #111);`; // ★エラー回避用のダミー背景

        html += `
        <div style="width: 100%; height: 120px; background-color: #1a1a1a; overflow: hidden; display: flex; justify-content: center; align-items: center; position: relative; border-bottom: 3px solid #444;">
            <div style="width: ${sw}px; height: ${sh}px; ${imgStyle} transform: scale(${scX}, ${scY}); transform-origin: center center; flex-shrink: 0;">
                ${!imgPath ? '<div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:#666; font-size:12px; font-weight:bold;">NO IMAGE</div>' : ''}
            </div>
        </div>`;
    } else {
        const col = (card.imageIndex || 0) % 3; const row = Math.floor((card.imageIndex || 0) / 3);
        const finalPosX = (col * 50) + (card.offsetX || 0); const finalPosY = (row * 25) + (card.offsetY || 0); 
        const zoomX = card.zoomX || 300; const zoomY = card.zoomY || 510;

        let imgStyle = imgPath
            ? `background-image: url('${imgPath}'); background-size: ${zoomX}% ${zoomY}%; background-position: ${finalPosX}% ${finalPosY}%; background-repeat: no-repeat;`
            : `background: linear-gradient(135deg, #444, #111); display:flex; justify-content:center; align-items:center; color:#666; font-size:12px; font-weight:bold;`; // ★エラー回避用のダミー背景

        html += `<div style="width: 100%; height: 120px; ${imgStyle} border-bottom: 3px solid #444;">${!imgPath ? 'NO IMAGE' : ''}</div>`;
    }

    html += `
        <div style="padding: 4px 8px; font-weight: bold; font-size: 14px; background: linear-gradient(to right, #444, #222); border-bottom: 2px solid #111; text-shadow: 1px 1px 2px #000; display: flex; justify-content: space-between; align-items: center;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;">${card.name}</span>
            ${isUnlocked ? `<span style="font-size: 11px; background: rgba(0,0,0,0.6); color: #00BCD4; padding: 2px 5px; border-radius: 4px; border: 1px solid #00BCD4; margin-left: 4px; white-space: nowrap;">${typeName}</span>` : ''}
        </div>`;

    if (isUnlocked) {
        html += `
        <div style="flex: 1; padding: 6px; padding-bottom: 30px; font-size: 11px; color: #ddd; background: #2a2a2a; display: flex; flex-direction: column; gap: 4px;">
            ${abilityText ? `<div style="color: #FF9800; font-weight: bold; font-size: 10px;">${abilityText}</div>` : ''}
            <div style="margin-top: auto; padding-top: 4px; border-top: 1px solid #444;">
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="display:flex; flex-direction:column; gap:3px;">
                        <span style="display:inline-block; background:#00BCD4; color:#fff; border-radius:4px; padding:2px 4px; font-size:10px; width:fit-content;">コスト ${card.skillCost}</span>
                        <span style="font-weight:bold; font-size:12px; color:#fff;">${card.skillName}</span>
                    </div>
                    ${card.damage > 0 ? `<div style="color:#ff5252; font-weight:bold; font-size:13px; white-space:nowrap;">${card.damage} ダメージ</div>` : ''}
                </div>
            </div>
        </div>
        <div style="position: absolute; bottom: -4px; right: -4px; background: #4CAF50; color: white; padding: 4px 12px; border-radius: 8px 0 0 0; font-weight: bold; font-size: 16px; border: 2px solid #333; border-right: none; border-bottom: none; box-shadow: -2px -2px 4px rgba(0,0,0,0.3); z-index: 2;">HP ${card.hp}</div>`;
    } else {
        html += `<div style="flex: 1; padding: 15px 10px; font-size: 12px; line-height: 1.6; color: #bbb; background: #2a2a2a; text-align: center; display: flex; align-items: center; justify-content: center;"><span style="font-style: italic;">「${flavorText}」</span></div>`;
    }
    html += `</div>`;
    return html;
};

// ==========================================
// 5. UIとポップアップ関連 (偽装対応)
// ==========================================
window.showCardUnlockPopup = function(card, titleText = "カードを獲得しました！") {
    let popup = document.getElementById('tcg-unlock-popup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'tcg-unlock-popup';
        popup.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 100000;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            opacity: 0; transition: opacity 0.5s ease; pointer-events: none;
        `;
        document.body.appendChild(popup);
    }
    
    // ★ 偽装処理: ボタンのテキストを変える
    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
    const btnText = isUnlocked ? "コレクションに収納する" : "アルバムに綴じる";

    popup.innerHTML = `
        <h2 style="color: #FFD700; text-shadow: 0 0 15px #FF9800; font-size: 28px; font-weight: bold; margin: 0 0 80px 0; z-index: 10; text-align: center;">${titleText}</h2>
        <div style="transform: scale(1.5); box-shadow: 0 0 40px rgba(255,215,0,0.6); border-radius: 12px; margin-bottom: 90px; z-index: 5;">${window.renderCardHTML(card)}</div>
        <button onclick="document.getElementById('tcg-unlock-popup').style.opacity = '0'; setTimeout(()=>document.getElementById('tcg-unlock-popup').style.pointerEvents = 'none', 500);" 
            style="padding: 15px 40px; font-size: 20px; font-weight: bold; background: #FF9800; color: white; border: 3px solid #FFF; border-radius: 12px; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.6); z-index: 10; transition: transform 0.1s;"
            onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            ${btnText}
        </button>
    `;
    popup.style.pointerEvents = 'auto';
    setTimeout(() => popup.style.opacity = '1', 50);
};

window.openCardBinder = function() {
    let binder = document.getElementById('tcg-binder-ui');
    if (!binder) {
        binder = document.createElement('div');
        binder.id = 'tcg-binder-ui';
        binder.style.cssText = `
            position: fixed; top: 5%; left: 5%; width: 90%; height: 90%;
            background: #1a1a1a; border: 4px solid #FF9800; border-radius: 16px;
            z-index: 9990; display: none; flex-direction: column; overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        `;
        document.body.appendChild(binder);
    }
    let gridHtml = '';
    if (window.TCG.myCollection.length === 0) {
        gridHtml = `<div style="color: #666; font-size: 20px; width: 100%; text-align: center; margin-top: 50px;">まだカードを持っていません。<br>AIを育成して引退させてみましょう。</div>`;
    } else {
        window.TCG.myCollection.forEach(card => {
            gridHtml += `<div style="margin: 10px; transition: transform 0.2s; cursor: pointer;" onmouseover="this.style.transform='scale(1.05) translateY(-5px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">${window.renderCardHTML(card)}</div>`;
        });
    }
    binder.innerHTML = `
        <div style="background: #333; padding: 15px; border-bottom: 2px solid #555; display: flex; justify-content: space-between; align-items: center;">
            <h2 style="margin: 0; color: #FFF;">📖 カードバインダー (所持数: ${window.TCG.myCollection.length} 枚)</h2>
            <button onclick="document.getElementById('tcg-binder-ui').style.display = 'none';" style="background: #ff5252; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold;">閉じる ✖</button>
        </div>
        <div style="flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-wrap: wrap; justify-content: flex-start; align-content: flex-start; background: #222;">${gridHtml}</div>
    `;
    binder.style.display = 'flex';
};

// ==========================================
// 6. デッキ編成システム
// ==========================================
window.TCG.editingDeck = [];

window.openDeckBuilder = function() {
    let builderUI = document.getElementById('tcg-deck-builder');
    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
    
    const uiTitle = isUnlocked ? "🛠️ デッキ編成" : "📖 思い出の整理";
    const uiCountUnit = isUnlocked ? "枚" : "個";
    const uiSaveBtn = isUnlocked ? "デッキを保存" : "アルバムを保存";
    const uiColArea = isUnlocked ? "🗃️ コレクション（タップでデッキに追加）" : "🗃️ 集めた思い出（タップでアルバムに配置）";
    const uiDeckArea = isUnlocked ? "🃏 デッキ（タップで外す）" : "📖 アルバムのページ（タップで外す）";
    
    // ★仕様変更：デッキ3枠の初期化と現在のデッキの読み込み
    window.TCG.currentDeckIndex = window.TCG.currentDeckIndex || 0;
    while(window.TCG.decks.length < 3) window.TCG.decks.push([]);
    window.TCG.editingDeck = [...window.TCG.decks[window.TCG.currentDeckIndex]];

    if (!builderUI) {
        builderUI = document.createElement('div');
        builderUI.id = 'tcg-deck-builder';
        builderUI.style.cssText = `
            position: fixed; top: 2%; left: 2%; width: 96%; height: 96%;
            background: #1a1a1a; border: 4px solid #4CAF50; border-radius: 12px;
            z-index: 10000; display: flex; flex-direction: column; overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8); font-family: sans-serif;
        `;
        builderUI.innerHTML = `
            <div style="background: #2E7D32; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1B5E20;">
                <div style="display:flex; flex-direction:column;">
                    <h2 id="db-title-text" style="margin: 0 0 5px 0; color: #FFF; font-size: 22px;">
                        ${uiTitle} <span style="font-size: 16px; margin-left: 15px; background: #1B5E20; padding: 5px 10px; border-radius: 20px;">
                        現在: <span id="db-count" style="color:#FFD700; font-weight:bold; font-size:20px;">0</span> ${uiCountUnit} (最低60${uiCountUnit})
                        </span>
                    </h2>
                    ${isUnlocked ? `
                    <div style="display:flex; gap:5px;" id="deck-tabs-container">
                        <button onclick="window.switchDeckSlot(0)" style="padding:5px 15px; border-radius:6px 6px 0 0; font-weight:bold; cursor:pointer; border:none; background:${window.TCG.currentDeckIndex===0 ? '#FFF' : '#888'}; color:${window.TCG.currentDeckIndex===0 ? '#2E7D32' : '#FFF'};">デッキ1</button>
                        <button onclick="window.switchDeckSlot(1)" style="padding:5px 15px; border-radius:6px 6px 0 0; font-weight:bold; cursor:pointer; border:none; background:${window.TCG.currentDeckIndex===1 ? '#FFF' : '#888'}; color:${window.TCG.currentDeckIndex===1 ? '#2E7D32' : '#FFF'};">デッキ2</button>
                        <button onclick="window.switchDeckSlot(2)" style="padding:5px 15px; border-radius:6px 6px 0 0; font-weight:bold; cursor:pointer; border:none; background:${window.TCG.currentDeckIndex===2 ? '#FFF' : '#888'}; color:${window.TCG.currentDeckIndex===2 ? '#2E7D32' : '#FFF'};">デッキ3</button>
                        <button onclick="window.copyDeckSlot()" style="padding:5px 10px; border-radius:4px; font-size:11px; cursor:pointer; margin-left:10px; background:#444; color:#fff; border:1px solid #666;">📋 コピー</button>
                    </div>` : ''}
                </div>
                <div>
                    ${isUnlocked ? `<button id="db-auto-btn" onclick="window.autoBuildDeck()" style="background: #00BCD4; color: #FFF; font-weight: bold; border: 2px solid #FFF; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px; margin-right: 10px; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">✨ おまかせ編成</button>` : ''}
                    <button id="db-save-btn" onclick="window.saveDeck()" style="background: #FF9800; color: #FFF; font-weight: bold; border: 2px solid #FFF; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px; margin-right: 10px;">${uiSaveBtn}</button>
                    <button onclick="window.closeDeckBuilder()" style="background: #666; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer;">閉じる ✖</button>
                </div>
            </div>
            <div style="flex: 1; display: flex; overflow: hidden;">
                <div style="flex: 3; background: #222; display: flex; flex-direction: column; border-right: 4px solid #444;">
                    <div id="db-col-header" style="padding: 10px; background: #333; color: #aaa; text-align: center; font-weight: bold; border-bottom: 1px solid #111;">${uiColArea}</div>
                    <div style="padding: 10px; background: #2a2a2a; border-bottom: 2px solid #111; display: flex; gap: 10px;">
                        <input type="text" id="db-search-name" placeholder="🔍 ${isUnlocked ? 'カード名' : '思い出'}で検索..." oninput="window.refreshDeckBuilderView()" style="flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #555; background: #111; color: white; font-size: 14px;">
                        
                        <select id="db-filter-type" onchange="window.refreshDeckBuilderView()" style="padding: 8px; border-radius: 6px; border: 1px solid #555; background: #111; color: white; font-size: 14px; cursor: pointer; display: ${isUnlocked ? 'block' : 'none'};">
                            <option value="all">🌟 すべてのカード</option>
                            <option value="evolution">✨ 進化モンスターのみ</option>
                            <option value="monster_basic">🟢 基本モンスターのみ</option>
                            <option value="action">⚡ アクションカード</option>
                            <option value="item">🎒 アイテムカード</option>
                            <option value="field">⛺ フィールドカード</option>
                            <option value="robot">🤖 ロボット種族</option>
                            <option value="dragon">🐉 ドラゴン種族</option>
                            <option value="magician">🧙 魔法使い種族</option>
                            <option value="ghost">👻 ゴースト種族</option>
                            <option value="seed">🌱 つぼみ種族</option>
                            <option value="spirit">🍃 精霊種族</option>
                            <option value="stone">🪨 ゴーレム種族</option>
                            <option value="machine">⚙️ ぜんまい種族</option>
                            <option value="bird">🐦 鳥種族</option>
                            <option value="beetle">🪲 虫種族</option>
                            <option value="balloon">🎈 風船種族</option>
                        </select>
                    </div>
                    <div id="db-collection-area" style="flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 10px;"></div>
                </div>
                <div style="flex: 2; background: #111; display: flex; flex-direction: column;">
                    <div id="db-deck-header" style="padding: 10px; background: #000; color: #4CAF50; text-align: center; font-weight: bold; border-bottom: 2px solid #222;">${uiDeckArea}</div>
                    <div id="db-deck-area" style="flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 10px;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(builderUI);
    } else {
        const titleSpan = document.getElementById('db-title-text');
        if (titleSpan) titleSpan.innerHTML = `${uiTitle} <span style="font-size: 16px; margin-left: 15px; background: #1B5E20; padding: 5px 10px; border-radius: 20px;">現在: <span id="db-count" style="color:#FFD700; font-weight:bold; font-size:20px;">0</span> ${uiCountUnit} (最低60${uiCountUnit})</span>`;
        const saveBtn = document.getElementById('db-save-btn');
        if (saveBtn) saveBtn.innerText = uiSaveBtn;
        const colHeader = document.getElementById('db-col-header');
        if (colHeader) colHeader.innerText = uiColArea;
        const deckHeader = document.getElementById('db-deck-header');
        if (deckHeader) deckHeader.innerText = uiDeckArea;
        
        const searchInput = document.getElementById('db-search-name');
        if (searchInput) searchInput.placeholder = `🔍 ${isUnlocked ? 'カード名' : '思い出'}で検索...`;
        
        const filterSelect = document.getElementById('db-filter-type');
        if (filterSelect) { filterSelect.style.display = isUnlocked ? 'block' : 'none'; filterSelect.value = "all"; }
        const autoBtn = document.getElementById('db-auto-btn');
        if (autoBtn) autoBtn.style.display = isUnlocked ? 'block' : 'none';
    }

    builderUI.style.display = 'flex';
    window.refreshDeckBuilderView(); 
};

window.refreshDeckBuilderView = function() {
    const collectionArea = document.getElementById('db-collection-area');
    const deckArea = document.getElementById('db-deck-area');
    const countDisplay = document.getElementById('db-count');
    
    const searchInput = document.getElementById('db-search-name');
    const searchName = searchInput ? searchInput.value.toLowerCase() : "";
    const filterSelect = document.getElementById('db-filter-type');
    const filterType = filterSelect ? filterSelect.value : "all";

    let collectionHtml = '';
    let deckHtml = '';
    let deckCount = window.TCG.editingDeck.length;

    if (countDisplay) {
        countDisplay.innerText = deckCount;
        countDisplay.style.color = deckCount >= 60 ? "#4CAF50" : "#FFD700";
    }

    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
    const emptyDeckText = isUnlocked ? "デッキは空です" : "アルバムのページは空です";

    window.TCG.editingDeck.forEach(uid => {
        const card = window.TCG.myCollection.find(c => c.uid === uid);
        if (card) deckHtml += `<div onclick="window.toggleCardInDeck('${card.uid}')" style="transform: scale(0.65); transform-origin: top left; width: 117px; height: 169px; cursor: pointer; transition: transform 0.1s;" onmouseover="this.style.transform='scale(0.7) translateY(-5px)'" onmouseout="this.style.transform='scale(0.65) translateY(0)'">${window.renderCardHTML(card)}</div>`;
    });

    window.TCG.myCollection.forEach(card => {
        if (!window.TCG.editingDeck.includes(card.uid)) {
            let match = true;
            if (searchName && !card.name.toLowerCase().includes(searchName)) match = false;
            if (match && filterType !== 'all') {
                if (filterType === 'evolution') {
                    if (!card.evolvesFrom) match = false; 
                } else if (filterType === 'monster_basic') {
                    if (card.evolvesFrom || ['action', 'item', 'field'].includes(card.type)) match = false;
                } else if (['action', 'item', 'field'].includes(filterType)) {
                    if (card.type !== filterType) match = false;
                } else {
                    if (!card.type.startsWith(filterType)) match = false;
                }
            }
            if (match) collectionHtml += `<div onclick="window.toggleCardInDeck('${card.uid}')" style="transform: scale(0.65); transform-origin: top left; width: 117px; height: 169px; cursor: pointer; transition: transform 0.1s;" onmouseover="this.style.transform='scale(0.7) translateY(-5px)'" onmouseout="this.style.transform='scale(0.65) translateY(0)'">${window.renderCardHTML(card)}</div>`;
        }
    });

    if (collectionArea) collectionArea.innerHTML = collectionHtml || '<div style="color:#666; width:100%; text-align:center; padding-top: 20px;">条件に合うカードが見つかりません</div>';
    if (deckArea) deckArea.innerHTML = deckHtml || `<div style="color:#666; width:100%; text-align:center; padding-top: 20px;">${emptyDeckText}</div>`;
};

window.toggleCardInDeck = function(uid) {
    const index = window.TCG.editingDeck.indexOf(uid);
    if (index > -1) window.TCG.editingDeck.splice(index, 1);
    else window.TCG.editingDeck.push(uid); 
    window.refreshDeckBuilderView();
};

window.saveDeck = function() {
    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
    
    // ★追加：アラートの代わりに、画面中央にリッチなポップアップを出す関数
    const showMessage = (msg, isError = false) => {
        let popup = document.createElement('div');
        popup.innerHTML = msg;
        popup.style.cssText = `position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); background:${isError ? 'rgba(244,67,54,0.95)' : 'rgba(0,188,212,0.95)'}; color:#fff; padding:20px 40px; border-radius:12px; font-weight:bold; font-size:20px; z-index:99999; box-shadow:0 10px 30px rgba(0,0,0,0.5); text-align:center; pointer-events:none; animation: slideUpFade 3s forwards;`;
        let container = document.getElementById('tcg-deck-builder');
        if (container) container.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
    };

    if (window.TCG.editingDeck.length < 60) {
        if(isUnlocked) showMessage(`⚠️ デッキは最低60枚必要です！<br><span style="font-size:16px;">（現在は ${window.TCG.editingDeck.length} 枚です）</span>`, true);
        else showMessage(`⚠️ アルバムを完成させるには、記憶が最低60個必要です！<br><span style="font-size:16px;">（現在は ${window.TCG.editingDeck.length} 個です）</span>`, true);
        return;
    }
    
    window.TCG.decks[window.TCG.currentDeckIndex || 0] = [...window.TCG.editingDeck]; 
    window.saveTCGData();
    
    // ★修正：保存しても外には出ず、ポップアップだけ出して編成を続けられるようにする
    if(isUnlocked) showMessage(`🎉 デッキ ${(window.TCG.currentDeckIndex || 0) + 1} を保存しました！`);
    else showMessage("🎉 思い出のアルバムが保存されました！");
};

// ★追加：明示的に「閉じる ✖」ボタンを押した時に、カジノロビーに戻るための関数
window.closeDeckBuilder = function() {
    document.getElementById('tcg-deck-builder').style.display = 'none';
    let lobby = document.getElementById('casino-lobby-ui');
    if (lobby) lobby.style.display = 'flex'; // カジノロビーを再表示する
};

// ==========================================
// 7. バトルシステム本体
// ==========================================

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.startBattle = function(enemyData = null) {
    if (!window.TCG.decks[0] || window.TCG.decks[0].length < 60) {
        alert("デッキが保存されていないか、60枚以上ありません！先にデッキ編成を完了してください。"); return;
    }

    // 初期化（マナは0からスタート、ターン開始時に1になる）
    window.TCG_BATTLE = {
        player: { hp: 200, maxMana: 0, currentMana: 0, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
        cpu:    { hp: 200, maxMana: 0, currentMana: 0, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
        turn: 1, selectedAttackerIndex: -1, selectedHandCardIndex: -1, _skipDefendHint: false,
        firstPlayer: 'player', isEnemyTurn: false, isAnimating: true, isAuto: false
    };
    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    let battleUI = document.getElementById('tcg-battle-ui');
    if (!battleUI) {
        battleUI = document.createElement('div');
        battleUI.id = 'tcg-battle-ui';
        battleUI.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #2a2a2a; z-index: 20000; display: flex; flex-direction: column; 
            font-family: sans-serif; color: white; overflow: hidden;
        `;
        document.body.appendChild(battleUI);
    }

    if (!document.getElementById('tcg-scroll-styles')) {
        const style = document.createElement('style');
        style.id = 'tcg-scroll-styles';
        style.innerHTML = `
            .tcg-board-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.4) rgba(0,0,0,0.3); }
            .tcg-board-scroll::-webkit-scrollbar { height: 8px; }
            .tcg-board-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 4px; margin: 0 20px; }
            .tcg-board-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.4); border-radius: 4px; }
            .tcg-board-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.7); }
        `;
        document.head.appendChild(style);
    }

    p.deck = window.TCG.decks[0].map(uid => {
        const originalCard = window.TCG.myCollection.find(c => c.uid === uid);
        if (!originalCard) return null;
        let cardCopy = JSON.parse(JSON.stringify(originalCard));
        let master = window.TCG_MASTER[cardCopy.masterId];
        if (master) cardCopy.hp = Math.max(cardCopy.hp, master.baseHp);
        cardCopy.maxHp = cardCopy.hp; // ★ MAX HPの保存
        cardCopy.isDead = false; cardCopy.canAttack = false; cardCopy.isDefending = false; cardCopy.status = null;
        return cardCopy;
    }).filter(c => c !== null);
    window.shuffleArray(p.deck);

    if (enemyData && enemyData.deck) {
        cpu.deck = enemyData.deck.map((dCard, i) => {
            let master = window.TCG_MASTER[dCard.masterId];
            if(!master) return null;
            return {
                uid: 'ghost_' + i, masterId: dCard.masterId, name: dCard.name || master.name, type: master.type,
                cost: master.baseCost, hp: dCard.hp || master.baseHp, maxHp: dCard.hp || master.baseHp,
                skillName: master.skillName, skillCost: master.skillCost, damage: dCard.damage || master.baseDmg, 
                ability: master.ability, image: master.image, imageIndex: master.imageIndex,
                offsetX: master.offsetX, offsetY: master.offsetY, zoomX: master.zoomX, zoomY: master.zoomY, canAttack: false, isDefending: false, status: null,
                // ★バグ修正：オンラインの敵データにも「進化元」情報を引き継ぐ！
                evolvesFrom: master.evolvesFrom
            };
        }).filter(c => c !== null);
        if(cpu.deck.length < 60) { alert("敵のデッキデータが不完全です。通常のCPUと対戦します。"); enemyData = null; } 
        else { window.shuffleArray(cpu.deck); }
    } 

    if (!enemyData || !enemyData.deck) {
        const allMasterKeys = Object.keys(window.TCG_MASTER);
        for (let i = 0; i < Math.max(60, p.deck.length); i++) {
            let randomKey = allMasterKeys[Math.floor(Math.random() * allMasterKeys.length)];
            let master = window.TCG_MASTER[randomKey];
            cpu.deck.push({
                uid: 'cpu_' + i, masterId: randomKey, name: master.name, type: master.type,
                cost: master.baseCost, hp: master.baseHp, maxHp: master.baseHp, skillName: master.skillName,
                skillCost: master.skillCost, damage: master.baseDmg, ability: master.ability,
                image: master.image, imageIndex: master.imageIndex, offsetX: master.offsetX,
                offsetY: master.offsetY, zoomX: master.zoomX, zoomY: master.zoomY, canAttack: false, isDefending: false, status: null,
                // ★バグ修正：ランダムCPUのデータにも「進化元」情報を引き継ぐ！
                evolvesFrom: master.evolvesFrom
            });
        }
    }

    window.renderBattleBoard();

    let cpuNameLabel = document.getElementById('cpu-name-label');
    if (!cpuNameLabel) {
        cpuNameLabel = document.createElement('div');
        cpuNameLabel.id = 'cpu-name-label';
        cpuNameLabel.style.cssText = 'position:absolute; top:20px; right:30px; color:#FF5252; font-weight:bold; font-size:24px; text-shadow:0 0 10px #000; z-index:100;';
        battleUI.appendChild(cpuNameLabel);
    }
    cpuNameLabel.innerHTML = enemyData ? `VS ${enemyData.playerName}` : "VS 名もなきCPU";
    
    battleUI.style.display = 'flex';

    const blocker = document.createElement('div');
    blocker.id = 'tcg-battle-blocker';
    blocker.style.cssText = `position: fixed; top:0; left:0; width:100%; height:100%; z-index:25000;`;
    document.body.appendChild(blocker);

    const splash = document.createElement('div');
    splash.id = 'tcg-battle-splash';
    splash.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 26000; display: flex;
        justify-content: center; align-items: center; color: white;
        font-size: 80px; font-weight: bold; font-style: italic; text-align:center; line-height:1.2;
        text-shadow: 0 0 30px #FF9800, 5px 5px 0 #000;
        opacity: 0; transform: scale(1.5); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    splash.innerHTML = enemyData ? `ONLINE BATTLE !!<br><span style="font-size:50px; color:#4fc3f7;">VS ${enemyData.playerName}</span>` : "BATTLE START !!";
    document.body.appendChild(splash);

    setTimeout(() => { splash.style.opacity = '1'; splash.style.transform = 'scale(1)'; }, 50);

    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.transform = 'scale(0.8)';
        setTimeout(() => {
            splash.remove();
            
            // 🪙 コイントス演出
            const isPlayerFirst = Math.random() < 0.5;
            window.TCG_BATTLE.firstPlayer = isPlayerFirst ? 'player' : 'cpu';
            window.TCG_BATTLE.isEnemyTurn = !isPlayerFirst;
            
            const coinUI = document.createElement('div');
            coinUI.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.85); z-index: 26000; display: flex; flex-direction: column;
                justify-content: center; align-items: center; color: white;
            `;
            coinUI.innerHTML = `
                <div style="font-size: 30px; font-weight: bold; margin-bottom: 30px; color:#00BCD4;">先攻・後攻を決定します...</div>
                <div class="coin-flip-anim" style="width: 150px; height: 150px; background: #FFD700; border-radius: 50%; border: 10px solid #FFA000; box-shadow: inset 0 0 20px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; font-size: 60px; font-weight: bold; color: #B28900; text-shadow: 1px 1px 0px #FFF;">
                    TCG
                </div>
            `;
            document.body.appendChild(coinUI);

            setTimeout(() => {
                coinUI.innerHTML = `
                    <div style="font-size: 50px; font-weight: bold; margin-bottom: 30px; color:${isPlayerFirst ? '#4CAF50' : '#ff5252'}; text-shadow: 0 0 20px ${isPlayerFirst ? '#4CAF50' : '#ff5252'};">
                        ${isPlayerFirst ? 'あなたの先攻！' : '敵の先攻！'}
                    </div>
                `;
                setTimeout(() => {
                    coinUI.style.opacity = '0';
                    coinUI.style.transition = '0.5s';
                    setTimeout(() => {
                        coinUI.remove();
                        
                        // 初期ドロー (5枚ずつ)
                        let drawCount = 0;
                        
                        // ★仕様変更：初手で必ずコスト1のカードを1枚確保する（手札事故防止マリガン）
                        let pOneManaIdx = p.deck.findIndex(c => window.getActualCost(p, c) === 1 || c.cost === 1);
                        if (pOneManaIdx !== -1) {
                            p.hand.push(p.deck.splice(pOneManaIdx, 1)[0]);
                            drawCount = 1; // すでに1枚引いた状態からスタート
                        }
                        
                        const drawTimer = setInterval(() => {
                            if (drawCount < 5) {
                                p.hand.push(p.deck.shift()); // 足りない分を追加ドロー
                                cpu.hand.push(cpu.deck.shift());
                                window.showBattleMessage(`シュッ！ (手札: ${drawCount + 1}枚)`, false, 250);
                                window.renderBattleBoard();
                                drawCount++;
                            } else {
                                clearInterval(drawTimer);
                                blocker.remove(); 
                                
                                // ターン開始！
                                if (isPlayerFirst) {
                                    window.startPlayerTurn(true);
                                } else {
                                    window.showTurnCutin("ENEMY TURN", "#ff5252", () => {
                                        window.executeCPUTurn(true);
                                    });
                                }
                            }
                        }, 350);
                    }, 500);
                }, 2000);
            }, 2500);
        }, 500);
    }, 1500); 
};

// ==========================================
// 8. VFX（視覚効果）＆ メッセージエンジン
// ==========================================
if (!document.getElementById('tcg-vfx-styles')) {
    const style = document.createElement('style');
    style.id = 'tcg-vfx-styles';
    style.innerHTML = `
        @keyframes slideUpFade { 0% { transform: translate(-50%, 0); opacity: 0; } 10% { transform: translate(-50%, -20px); opacity: 1; } 80% { transform: translate(-50%, -20px); opacity: 1; } 100% { transform: translate(-50%, -40px); opacity: 0; } }
        @keyframes floatDmg { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(-50%, -120px) scale(1.5); opacity: 0; } }
        @keyframes slashAnim { 0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.5); opacity: 1; } 100% { transform: translate(-50%, -50%) rotate(20deg) scale(2.5); opacity: 0; } }
        @keyframes cardDestroy {
            0% { transform: scale(0.65) rotate(0deg); filter: brightness(1) grayscale(0%); opacity: 1; }
            20% { transform: scale(0.7) rotate(-5deg); filter: brightness(2) grayscale(0%); opacity: 1; }
            50% { transform: scale(0.6) rotate(10deg); filter: brightness(0.5) grayscale(100%); opacity: 0.8; }
            100% { transform: scale(0) rotate(-20deg); filter: brightness(0) grayscale(100%); opacity: 0; }
        }
        @keyframes screenHit {
            0% { transform: translate(0, 0); box-shadow: inset 0 0 0 rgba(255,0,0,0); }
            10% { transform: translate(-15px, 10px); box-shadow: inset 0 0 150px rgba(255,0,0,0.9); }
            20% { transform: translate(15px, -10px); }
            30% { transform: translate(-15px, -10px); }
            40% { transform: translate(15px, 10px); }
            50% { transform: translate(-10px, 5px); box-shadow: inset 0 0 80px rgba(255,0,0,0.6); }
            100% { transform: translate(0, 0); box-shadow: inset 0 0 0 rgba(255,0,0,0); }
        }
        .screen-shake-effect { animation: screenHit 0.5s ease-out; }
    `;
    document.head.appendChild(style);
}

window.showBattleMessage = function(text, isError = false, duration = 2000) {
    const ui = document.getElementById('tcg-battle-ui');
    if (!ui) return;
    const existingCount = document.querySelectorAll('.battle-msg').length;
    const topPos = 40 + (existingCount * 8);

    const msg = document.createElement('div');
    msg.className = 'battle-msg';
    msg.innerHTML = text;
    msg.style.cssText = `
        position: absolute; top: ${topPos}%; left: 50%;
        background: ${isError ? 'rgba(220, 20, 20, 0.95)' : 'rgba(20, 120, 255, 0.95)'};
        color: #fff; padding: 15px 40px; border-radius: 12px; border: 2px solid #fff;
        font-size: 22px; font-weight: bold; pointer-events: none; z-index: 100000;
        box-shadow: 0 10px 20px rgba(0,0,0,0.5); text-align: center; white-space: pre-wrap;
        animation: slideUpFade ${duration}ms forwards;
    `;
    ui.appendChild(msg);
    setTimeout(() => msg.remove(), duration);
};

window.showVFX = function(targetId, type, text = "") {
    const target = document.getElementById(targetId);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const ui = document.getElementById('tcg-battle-ui');
    if (!ui) return;
    
    const vfxNode = document.createElement('div');
    vfxNode.style.cssText = `
        position: absolute; left: ${rect.left + rect.width / 2}px; top: ${rect.top + rect.height / 2}px;
        pointer-events: none; z-index: 99999;
    `;

    if (type === 'damage' || type === 'heal') {
        const isHeal = type === 'heal';
        vfxNode.innerText = (isHeal && typeof text === 'number' ? "+" : (typeof text === 'number' ? "-" : "")) + text;
        vfxNode.style.color = isHeal ? '#4CAF50' : '#ff5252';
        vfxNode.style.fontWeight = '900';
        vfxNode.style.fontSize = '45px';
        vfxNode.style.textShadow = '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000';
        vfxNode.style.animation = 'floatDmg 1.2s ease-out forwards';
    } else if (type === 'slash') {
        vfxNode.innerText = text || "💥";
        vfxNode.style.fontSize = '80px';
        vfxNode.style.animation = 'slashAnim 0.3s ease-out forwards';
    }
    ui.appendChild(vfxNode);
    setTimeout(() => vfxNode.remove(), 1200);
};

// ==========================================
// 9. バトルの描画と進行ロジック
// ==========================================
window.showCardDetailModal = function(ownerType, index) {
    const card = ownerType === 'player' ? window.TCG_BATTLE.player.field[index] : window.TCG_BATTLE.cpu.field[index];
    if (!card) return;

    let modal = document.getElementById('tcg-card-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'tcg-card-detail-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 40000;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            cursor: pointer;
        `;
        modal.onclick = () => { modal.style.display = 'none'; };
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div style="margin-bottom: 30px; color: #00BCD4; font-size: 24px; font-weight: bold; text-shadow: 0 2px 4px #000;">
            🔍 ${ownerType === 'player' ? '味方' : '敵'}のカード詳細
        </div>
        <div style="transform: scale(1.8); box-shadow: 0 0 40px rgba(0, 188, 212, 0.6); border-radius: 12px; pointer-events: none;">
            ${window.renderCardHTML(card)}
        </div>
        <div style="margin-top: 100px; color: #aaa; font-size: 16px; background: rgba(0,0,0,0.5); padding: 10px 20px; border-radius: 20px;">
            画面のどこかをクリックして閉じる
        </div>
    `;
    modal.style.display = 'flex';
};

window.renderBattleBoard = function() {
    const battleUI = document.getElementById('tcg-battle-ui');
    if(!battleUI) return;

    const p = window.TCG_BATTLE.player;
    const cpu = window.TCG_BATTLE.cpu;
    window.TCG_BATTLE.selectedAttackerIndex = window.TCG_BATTLE.selectedAttackerIndex ?? -1;
    window.TCG_BATTLE.selectedHandCardIndex = window.TCG_BATTLE.selectedHandCardIndex ?? -1;
    const isTargeting = window.TCG_BATTLE.selectedAttackerIndex !== -1;
    const isEvoMode = window.TCG_BATTLE.selectedHandCardIndex !== -1;

    // ==========================================
    // ★ 画面サイズに基づく動的スケール＆絶対座標計算ロジック
    // ==========================================
    // ブラウザの実際の描画領域を取得（スクロールバー等を除外した正確な幅）
    const w = document.documentElement.clientWidth || window.innerWidth;
    const h = document.documentElement.clientHeight || window.innerHeight;
    
    // UIの縦方向の割り当て (px)
    const headerH = 60;   // 敵ステータスバー
    const footerH = 180;  // 味方ステータス＆手札バー
    const boardH = h - headerH - footerH; // 残りが盤面
    const fieldH = boardH / 2; // 盤面を敵味方で半分こ
    
    // UIの横方向の割り当て (px)
    const leftPanelW = 240;  // 左のステータス
    const rightPanelW = 160; // 右のボタン群
    const handAreaW = w - leftPanelW - rightPanelW; // 中央の手札エリア
    const fieldAreaW = w; // 盤面は画面幅いっぱい

    // --- 自動スケールと座標を計算する関数 ---
    // N枚のカードを指定エリアに収めるための倍率(scale)と左端開始位置(startX)、間隔(stepW)を返す
    const calcLayout = (count, aW, aH, overlap, maxScale = 1.0) => {
        if (count === 0) return null;
        const bw = 180; const bh = 260; // カードのベースサイズ
        const availableW = aW - 20; // 左右の安全マージン
        
        // スケール1.0の時に必要な幅を計算
        const stepW_1 = bw * (1 - overlap);
        const totalW_1 = bw + stepW_1 * (count - 1);
        
        // 幅の限界、高さの限界、最大倍率 のうち一番厳しいものに合わせる
        let scale = Math.min(availableW / totalW_1, aH / bh, maxScale);
        
        // 実際のカード描画幅と開始X座標（中央揃え）
        const stepW = bw * scale * (1 - overlap);
        const totalW = (bw * scale) + stepW * (count - 1);
        const startX = (aW - totalW) / 2;
        
        return { scale, startX, stepW };
    };

    // 手札: 重なり40% (overlap=0.4)、最大スケール0.8
    const handL = calcLayout(p.hand.length, handAreaW, footerH - 20, 0.4, 0.8);
    // プレイヤー盤面: 重なり10% (overlap=0.1)、最大スケール0.7
    const pFieldL = calcLayout(p.field.length, fieldAreaW, fieldH - 20, 0.1, 0.7);
    // CPU盤面: 重なり10% (overlap=0.1)、最大スケール0.7
    const cFieldL = calcLayout(cpu.field.length, fieldAreaW, fieldH - 20, 0.1, 0.7);

    // ==========================================
    // 手札のHTML生成 (絶対配置)
    // ==========================================
    let handHtml = p.hand.map((card, index) => {
        let actualCost = window.getActualCost(p, card);
        const canPlay = p.currentMana >= actualCost;
        const isSelected = window.TCG_BATTLE.selectedHandCardIndex === index;
        const opacity = canPlay ? "1" : "0.5";
        
        let left = handL ? handL.startX + index * handL.stepW : 0;
        let scale = handL ? handL.scale : 0.6;
        let hoverScale = Math.min(1.0, scale * 1.3); // ホバー時は少し大きく
        
        let yOffset = isSelected ? "-30px" : "0px";
        let currentScale = isSelected ? hoverScale : scale;
        
        const filter = isSelected ? "drop-shadow(0 0 20px #E91E63)" : "none";
        const zIndex = isSelected ? 150 : index;
        
        return `
        <div class="tcg-card-wrap" style="left: ${left}px; bottom: 10px; transform: scale(${currentScale}) translateY(${yOffset}); transform-origin: bottom center; cursor: ${canPlay && !isTargeting ? 'pointer' : 'not-allowed'}; z-index: ${zIndex}; opacity: ${opacity}; filter: ${filter}; width: 180px; height: 260px;"
             onmouseover="if(${canPlay} && !${isTargeting} && !${isSelected}) { this.style.transform='scale(${hoverScale}) translateY(-20px)'; }"
             onmouseout="if(${canPlay} && !${isTargeting} && !${isSelected}) { this.style.transform='scale(${scale}) translateY(0)'; }"
             onclick="if(!${isTargeting}) window.playCard(${index})">
            ${window.renderCardHTML(card)}
        </div>`;
    }).join('');

    // ==========================================
    // プレイヤーフィールドのHTML生成 (絶対配置)
    // ==========================================
    let fieldHtml = p.field.map((card, index) => {
        const isReady = card.canAttack && card.status !== 'stunned';
        // ★修正：相手ターン中は、味方カードは「自分が攻撃で選ばれている」と勘違いしないようにする
        const isAttackerSelected = (!window.TCG_BATTLE.isEnemyTurn && window.TCG_BATTLE.selectedAttackerIndex === index);
        let isEvoTarget = false;
        if (isEvoMode) {
            const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
            isEvoTarget = window.checkCanEvolve(card, evoCard); // ★新しい判定に変更
        }

        let filter = "grayscale(50%) opacity(70%)";
        let cursor = "not-allowed";
        
        if (isAttackerSelected) {
            filter = "drop-shadow(0 0 20px #FFD700)"; cursor = "pointer";
        } else if (isEvoMode) {
            if (isEvoTarget) { filter = "drop-shadow(0 0 20px #E91E63) brightness(1.2)"; cursor = "pointer"; }
            else { filter = "grayscale(80%) opacity(40%)"; }
        } else if (isReady) {
            filter = "drop-shadow(0 0 10px #4CAF50)"; cursor = "pointer";
        } else if (!isReady && card.damage > 0 && !card.isDefending && card.ability !== "taunt" && p.currentMana >= 1 && card.status !== 'stunned') {
            cursor = "pointer";
        }

        // ★修正1：純真の盾も「守護」の変数としてまとめる
        const isDefending = card.isDefending || card.ability === "taunt" || card.ability === "pure_aegis";
        if (isDefending) filter = "drop-shadow(0 0 15px #2196F3)"; // ★ついでに、元からかばうを持っているカードも青く光るように修正！
        
        let left = pFieldL ? pFieldL.startX + index * pFieldL.stepW : 0;
        let scale = pFieldL ? pFieldL.scale : 0.65;
        let hoverScale = Math.min(1.0, scale * 1.15);
        
        let currentScale = scale;
        let yOffset = "0px";
        if (isAttackerSelected) { currentScale = hoverScale; yOffset = "-20px"; } 
        else if (isEvoTarget) { currentScale = hoverScale; yOffset = "-10px"; }

        const animStyle = card.isDead ? "animation: cardDestroy 0.6s ease-out forwards; pointer-events: none;" : "";

        return `
        <div id="p-card-${index}" class="tcg-card-wrap" style="position: absolute; left: ${left}px; bottom: 10px; transform: scale(${currentScale}) translateY(${yOffset}); transform-origin: bottom center; cursor: ${cursor}; filter: ${filter}; z-index: ${isAttackerSelected || isEvoTarget ? 100 : index}; ${animStyle}; width: 180px; height: 260px; transition: all 0.2s cubic-bezier(0.2, 0.8, 0.4, 1);"
             onmouseover="if(this.style.cursor==='pointer') { this.style.transform='scale(${hoverScale}) translateY(-15px)'; this.style.zIndex=1000; }"
             onmouseout="this.style.transform='scale(${currentScale}) translateY(${yOffset})'; this.style.zIndex=${isAttackerSelected || isEvoTarget ? 100 : index}; "
             onclick="window.selectPlayerCard(${index})">
            ${window.renderCardHTML(card)}
            ${isDefending && !card.isDead ? `<div style="position:absolute; top:-20px; left:30%; background:#f44336; color:white; padding:2px 10px; border-radius:10px; font-weight:bold; border:2px solid #fff; z-index:10; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">🛡️ 守護</div>` : ''}
            ${!isReady && !isAttackerSelected && !card.isDead && !isEvoMode && !card.isDefending && card.ability !== 'taunt' && card.ability !== 'pure_aegis' && card.status !== 'stunned' ? `<div style="position:absolute; top:40%; left:10%; background:rgba(0,0,0,0.8); color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:24px; transform:rotate(-15deg);">行動済み</div>` : ''}
            ${isEvoTarget ? `<div style="position:absolute; top:40%; left:15%; background:#E91E63; color:white; padding:5px 10px; border-radius:4px; font-weight:bold; font-size:22px; transform:rotate(-10deg); box-shadow:0 0 10px #000;">進化可能!</div>` : ''}
            <div onclick="event.stopPropagation(); window.showCardDetailModal('player', ${index});" style="position:absolute; top:-10px; right:-10px; background:#222; color:#00BCD4; border:2px solid #00BCD4; border-radius:50%; width:36px; height:36px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.8); z-index:20;" title="詳細を見る">🔍</div>
        </div>`;
    }).join('');
    if (p.field.length === 0) fieldHtml = `<div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color: #666; font-style: italic; font-size:18px;">(あなたの場)</div>`;

    // ==========================================
    // CPUフィールドのHTML生成 (絶対配置)
    // ==========================================
    let cpuFieldHtml = cpu.field.map((card, index) => {
        const isTaunt = card.ability === "taunt" || card.ability === "pure_aegis" || card.isDefending;
        const isStealth = card.ability === "stealth";
        const filter = isTargeting && !isStealth ? (isTaunt ? "drop-shadow(0 0 20px #FF5252)" : "drop-shadow(0 0 10px #FF9800)") : "none";
        const cursor = isTargeting && !isStealth ? "crosshair" : "default";
        const opacity = isStealth ? "0.6" : "1";
        
        let left = cFieldL ? cFieldL.startX + index * cFieldL.stepW : 0;
        let scale = cFieldL ? cFieldL.scale : 0.65;
        let hoverScale = Math.min(1.0, scale * 1.15);
        const animStyle = card.isDead ? "animation: cardDestroy 0.6s ease-out forwards; pointer-events: none;" : "";

        // CPUのカードは上からぶら下がるように配置する
        return `
        <div id="c-card-${index}" class="tcg-card-wrap" style="left: ${left}px; top: 10px; transform: scale(${scale}); transform-origin: top center; filter: ${filter}; opacity: ${opacity}; cursor: ${cursor}; z-index: ${index}; ${animStyle}; width: 180px; height: 260px;"
             onmouseover="if(${isTargeting} && !${isStealth} && !${card.isDead}){ this.style.transform='scale(${hoverScale}) translateY(15px)'; }"
             onmouseout="if(${isTargeting} && !${isStealth} && !${card.isDead}){ this.style.transform='scale(${scale}) translateY(0)'; }"
             onclick="if(${isTargeting}) window.executeAttack('card', ${index})">
            ${window.renderCardHTML(card)}
            ${isTaunt && !card.isDead ? `<div style="position:absolute; top:-20px; left:30%; background:#f44336; color:white; padding:2px 10px; border-radius:10px; font-weight:bold; border:2px solid #fff; z-index:10;">🛡️ 守護</div>` : ''}
            <div onclick="event.stopPropagation(); window.showCardDetailModal('cpu', ${index});" style="position:absolute; top:-10px; right:-10px; background:#222; color:#FF5252; border:2px solid #FF5252; border-radius:50%; width:36px; height:36px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.8); z-index:20;" title="詳細を見る">🔍</div>
        </div>`;
    }).join('');
    if (cpu.field.length === 0) cpuFieldHtml = `<div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color: #666; font-style: italic; font-size:18px;">(CPUの場)</div>`;

    let autoBtnHtml = '';
    if (window.TCG_BATTLE) {
        const isAuto = window.TCG_BATTLE.isAuto;
        autoBtnHtml = `
            <button id="battle-auto-btn" onclick="window.TCG_BATTLE.isAuto = !window.TCG_BATTLE.isAuto; window.renderBattleBoard();" 
                style="padding: 10px; font-size: 15px; font-weight: bold; background: ${isAuto ? '#E91E63' : '#555'}; color: #fff; border: 2px solid #FFF; border-radius: 8px; cursor: pointer; width: 100%; transition: 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.5); margin-top: auto;">
                ${isAuto ? '🤖 AUTO: ON' : '👤 AUTO: OFF'}
            </button>
        `;
    }

    // ==========================================
    // ★ 完璧な全画面レイアウト ＋ ログ＆墓地ボタン追加！
    // ==========================================
    battleUI.innerHTML = `
        <style>
            #tcg-battle-ui, #tcg-battle-ui * { box-sizing: border-box !important; }
            .tcg-card-wrap { position: absolute; transition: all 0.2s cubic-bezier(0.2, 0.8, 0.4, 1); }
            .tcg-card-wrap:hover { z-index: 1000 !important; }
            @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0.6; transform: scale(1.05); } }
        </style>

        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #111; display: flex; flex-direction: column; overflow: hidden; z-index: 20000;">
            
            <div id="cpu-face" style="flex: 0 0 ${headerH}px; background: rgba(0,0,0,0.85); border-bottom: 2px solid #ff5252; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; cursor: ${isTargeting ? 'crosshair' : 'default'}; transition: background 0.2s;"
                 onmouseover="if(${isTargeting}){ this.style.background='rgba(255,0,0,0.4)' }"
                 onmouseout="if(${isTargeting}){ this.style.background='rgba(0,0,0,0.85)' }"
                 onclick="if(${isTargeting}) window.executeAttack('cpu', 0); else if(${isEvoMode}) { window.TCG_BATTLE.selectedHandCardIndex = -1; window.renderBattleBoard(); }">
                <div style="font-size: 20px; font-weight: bold; color: white; display: flex; align-items: center; white-space: nowrap;">
                    🤖 敵CPU <span style="color:#ff5252; font-size:26px; margin-left: 15px; font-weight: 900; text-shadow: 1px 1px 0 #fff;">HP: ${cpu.hp}</span> 
                    ${isTargeting ? '<span style="color:#FF9800; font-size: 16px; margin-left: 15px; animation: pulse 1s infinite alternate;">🎯 (ここをタップで直接攻撃)</span>' : ''}
                </div>
                <div style="color: #FFD700; font-size: 16px; font-weight: bold; white-space: nowrap; display:flex; align-items:center; gap:10px;">
                    💎 マナ: ${cpu.currentMana} / ${cpu.maxMana} &nbsp;|&nbsp; 🎴 山札: ${cpu.deck.length} &nbsp;|&nbsp; 🖐 手札: ${cpu.hand.length}
                    <button onclick="window.showGraveyard('cpu')" style="font-size:12px; background:#444; color:#fff; border:1px solid #666; border-radius:4px; padding:2px 8px; cursor:pointer;">💀 墓地: ${cpu.graveyard.length}</button>
                </div>
            </div>

            <div style="flex: 1; display: flex; flex-direction: column; background: #1a1a1a; position: relative;">
                <div style="flex: 1; position: relative; border-bottom: 2px dashed #444; background: rgba(255,0,0,0.05);">
                    ${cpuFieldHtml}
                </div>
                <div style="flex: 1; position: relative; background: rgba(0,188,212,0.05);"
                     onclick="if(${isTargeting} && event.target === this) { window.TCG_BATTLE.selectedAttackerIndex = -1; window.renderBattleBoard(); } else if (${isEvoMode} && event.target === this) { window.TCG_BATTLE.selectedHandCardIndex = -1; window.renderBattleBoard(); }">
                    ${fieldHtml}
                </div>
            </div>

            <div style="flex: 0 0 ${footerH}px; background: rgba(0,0,0,0.9); border-top: 3px solid #00BCD4; display: flex; position: relative; z-index: 10;">
                <div id="player-face" style="flex: 0 0 ${leftPanelW}px; padding: 15px; border-right: 2px solid #333; display: flex; flex-direction: column; justify-content: flex-start; background: rgba(0,188,212,0.1); gap: 6px;">
                    <div style="font-size: 18px; font-weight: bold; color: white;">🧑 あなた <span style="color:#aaa; font-size:14px;">(Turn ${window.TCG_BATTLE.turn})</span></div>
                    <div style="font-size: 34px; color: #4CAF50; font-weight: 900; text-shadow: 1px 1px 0 #fff; line-height: 1;">HP: ${p.hp}</div>
                    <div style="font-size: 16px; color: #00BCD4; font-weight: bold;">💎 マナ: ${p.currentMana} / ${p.maxMana}</div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="font-size: 14px; color: #aaa;">🎴 山札: ${p.deck.length} 枚</div>
                        <button onclick="window.showGraveyard('player')" style="font-size:12px; background:#444; color:#fff; border:1px solid #666; border-radius:4px; padding:2px 8px; cursor:pointer;">💀 墓地: ${p.graveyard.length}</button>
                    </div>
                    <div style="display:flex; gap:5px; margin-top:auto;">
                        ${autoBtnHtml}
                        <button onclick="window.showBattleLogUI()" style="padding: 10px; font-size: 14px; font-weight:bold; background: #673AB7; color: #fff; border: 2px solid #FFF; border-radius: 8px; cursor: pointer; flex:1; box-shadow: 0 4px 6px rgba(0,0,0,0.5);">📜 ログ</button>
                    </div>
                </div>
                <div style="flex: 1; position: relative; overflow: visible;">
                    ${handHtml}
                </div>
                <div style="flex: 0 0 ${rightPanelW}px; padding: 15px; border-left: 2px solid #333; display: flex; flex-direction: column; justify-content: center; gap: 15px; background: rgba(255,152,0,0.05);">
                    <button onclick="window.endTurn()" style="padding: 20px 10px; font-size: 16px; font-weight: bold; background: #FF9800; color: #fff; border: 2px solid #FFF; border-radius: 8px; cursor: pointer; width: 100%; box-shadow: 0 4px 6px rgba(0,0,0,0.4); transition: transform 0.1s;" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">ターン終了 ➔</button>
                    <button onclick="if(confirm('本当にバトルから逃げますか？')) { document.getElementById('tcg-battle-ui').style.display='none'; }" style="padding: 12px 10px; font-size: 14px; background: #444; color: #ccc; border: 1px solid #666; border-radius: 8px; cursor: pointer; width: 100%; transition: background 0.2s;" onmouseover="this.style.background='#555'" onmouseout="this.style.background='#444'">逃げる</button>
                </div>
            </div>
        </div>
    `;
};

// ブラウザ幅が変わった時に自動で再計算・再描画するリスナー
if (!window._tcgResizeListenerAdded) {
    window.addEventListener('resize', () => {
        if (document.getElementById('tcg-battle-ui') && document.getElementById('tcg-battle-ui').style.display !== 'none') {
            window.renderBattleBoard();
        }
    });
    window._tcgResizeListenerAdded = true;
}

// ★ プレイ時効果（新アビリティ対応版）
// ★ プレイ時効果（新アビリティ＆全ログ記録対応版）
window.triggerPlayEffect = function(card, isPlayer) {
    const owner = isPlayer ? window.TCG_BATTLE.player : window.TCG_BATTLE.cpu;
    const enemy = isPlayer ? window.TCG_BATTLE.cpu : window.TCG_BATTLE.player;
    const ownerPrefix = isPlayer ? 'p' : 'c';
    const enemyPrefix = isPlayer ? 'c' : 'p';
    const targetFace = isPlayer ? 'player-face' : 'cpu-face';
    const enemyFace = isPlayer ? 'cpu-face' : 'player-face';

    // ★追加：第4引数の「!isPlayer」で、CPUの行動はポップアップなしの裏ログに書き込む
    if (card.ability === "draw_card") {
        if (owner.deck.length > 0) {
            owner.hand.push(owner.deck.shift());
            window.showBattleMessage(`🎴 【ドロー】\n${card.name} の効果で引きました！`, false, 2000, !isPlayer);
        }
    }
    // ▼▼▼ 風の加護 ▼▼▼
    else if (card.ability === "wind_blessing") {
        owner.field.forEach((c, idx) => {
            if (c !== card && !c.isDead) {
                c.damage += 10;
                window.showVFX(`${ownerPrefix}-card-${idx}`, 'heal', '攻撃UP');
            }
        });
        window.showBattleMessage(`🍃 【風の加護】\n他の味方全員の攻撃力が上がった！`, false, 2000, !isPlayer, true);
    }
    // ▼▼▼ 咆哮 ▼▼▼
    else if (card.ability === "roar") {
        const enemyObj = isPlayer ? window.TCG_BATTLE.cpu : window.TCG_BATTLE.player;
        const enemyPrefix = isPlayer ? 'c' : 'p';
        let hit = false;
        enemyObj.field.forEach((c, idx) => {
            if (!c.isDead) {
                c.hp -= 20;
                window.showVFX(`${enemyPrefix}-card-${idx}`, 'damage', 20);
                window.checkDeath(c, enemyObj, `${enemyPrefix}-card-${idx}`, owner);
                hit = true;
            }
        });
        if (hit) {
            window.showBattleMessage(`🐉 【咆哮】\n強烈な咆哮で敵全体に20ダメージ！`, false, 2000, !isPlayer, true);
            const ui = document.getElementById('tcg-battle-ui'); 
            if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
        }
    }
    // ▼▼▼ 忘却 ▼▼▼
    else if (card.ability === "discard_hand") {
        if (enemy.hand.length > 0) {
            enemy.hand.splice(Math.floor(Math.random() * enemy.hand.length), 1);
            window.showBattleMessage(`🧠 【忘却】\n相手の手札を1枚破壊した！`, false, 2000, !isPlayer);
            window.showVFX(enemyFace, 'slash', '忘却');
        }
    }
    else if (card.ability === "mana_ramp") {
        if (owner.maxMana < 10) { owner.maxMana++; window.showBattleMessage(`💎 【成長】\n最大マナが1増えました！`, false, 2000, !isPlayer); }
    } else if (card.ability === "heal_self") {
        owner.hp += 10; window.showVFX(targetFace, 'heal', 10);
        window.showBattleMessage(`💖 【修復】\nHPが10回復しました！`, false, 2000, !isPlayer);
    } else if (card.ability === "aoe_heal_play") {
        owner.field.forEach((c, idx) => { if(!c.isDead) { c.hp += 20; window.showVFX(`${ownerPrefix}-card-${idx}`, 'heal', 20); } });
        window.showBattleMessage(`✨ 【ファンサービス】\n味方全員のHPが20回復した！`, false, 2000, !isPlayer);
    } else if (card.ability === "snipe_play") {
        if (enemy.field.length > 0) {
            let rIdx = Math.floor(Math.random() * enemy.field.length); let tCard = enemy.field[rIdx];
            tCard.hp -= 30; window.showVFX(`${enemyPrefix}-card-${rIdx}`, 'slash'); window.showVFX(`${enemyPrefix}-card-${rIdx}`, 'damage', 30);
            window.checkDeath(tCard, enemy, `${enemyPrefix}-card-${rIdx}`, owner);
            window.showBattleMessage(`💥 【殲滅モード】\n相手の ${tCard.name} に30ダメージ！`, false, 2000, !isPlayer);
        } else {
            enemy.hp -= 30; window.showVFX(enemyFace, 'slash'); window.showVFX(enemyFace, 'damage', 30);
            window.showBattleMessage(`💥 【殲滅モード】\n相手リーダーに30ダメージ！`, false, 2000, !isPlayer);
        }
    } else if (card.ability === "dimension_hack") {
        for(let i=0; i<2; i++) { if(enemy.hand.length > 0) enemy.hand.splice(Math.floor(Math.random()*enemy.hand.length), 1); }
        for(let i=0; i<2; i++) { if(owner.deck.length > 0) owner.hand.push(owner.deck.shift()); }
        window.showBattleMessage(`🌌 【超次元ハッキング】\n相手の手札を2枚破壊し、2枚ドロー！`, false, 2000, !isPlayer);
    } else if (card.ability === "crimson_end" || card.ability === "heaven_punishment") {
        if(card.ability === "crimson_end") { enemy.hp -= 50; window.showVFX(enemyFace, 'slash'); }
        enemy.field.forEach((c, idx) => {
            c.hp -= 50; window.showVFX(`${enemyPrefix}-card-${idx}`, 'slash'); window.showVFX(`${enemyPrefix}-card-${idx}`, 'damage', 50);
            window.checkDeath(c, enemy, `${enemyPrefix}-card-${idx}`, owner);
        });
        window.showBattleMessage(`🌋 【${card.name}の圧倒的な力】\n敵陣全体に50ダメージ！`, false, 2000, !isPlayer);
    } else if (card.ability === "perfect_predation") {
        let targets = enemy.field.filter(c => !c.isDead);
        if(targets.length > 0) {
            let tCard = targets[Math.floor(Math.random() * targets.length)];
            let drain = tCard.hp; tCard.hp = 0; window.checkDeath(tCard, enemy, `${enemyPrefix}-card-${enemy.field.indexOf(tCard)}`, owner);
            owner.hp += drain; window.showVFX(targetFace, 'heal', drain);
            window.showBattleMessage(`🌑 【完全捕食】\n敵を喰らい、${drain}回復！`, false, 2000, !isPlayer);
        }
    } else if (card.ability === "nightmare_rule") {
        enemy.field.forEach((c, idx) => {
            if(!c.isDead) { let half = Math.ceil(c.hp / 2); c.hp -= half; window.showVFX(`${enemyPrefix}-card-${idx}`, 'damage', half); }
        });
        window.showBattleMessage(`⛓️ 【悪夢の君臨】\nすべての敵モンスターのHPが半減！`, false, 2000, !isPlayer);
    } else if (card.ability === "star_hope") {
        owner.field.forEach((c, idx) => {
            if(!c.isDead) { c.hp += 100; c.ability = "taunt"; window.showVFX(`${ownerPrefix}-card-${idx}`, 'heal', '全回復'); }
        });
        window.showBattleMessage(`🌟 【希望の星】\n味方全回復＆全員が「かばう」状態に！`, false, 2000, !isPlayer);
    } else if (card.ability === "truth_overwrite") {
        for(let i=0; i<3; i++) { if(owner.deck.length > 0) owner.hand.push(owner.deck.shift()); }
        owner.maxMana = Math.min(10, owner.maxMana + 3); owner.currentMana = Math.min(10, owner.currentMana + 3);
        window.showBattleMessage(`🌐 【真理の書き換え】\n3枚ドロー＆マナ最大値が3増えた！`, false, 2000, !isPlayer);
    } else if (card.ability === "time_manipulation") {
        owner.field.forEach(c => { c.canAttack = true; c.isDefending = false; });
        window.showBattleMessage(`⏳ 【時空操作】\nすべての味方が再び行動可能になった！`, false, 2000, !isPlayer);
    } else if (card.ability === "super_gravity") {
        owner.field.forEach((c, idx) => { if(c !== card && !c.isDead) { c.hp -= 100; window.showVFX(`${ownerPrefix}-card-${idx}`, 'damage', 100); window.checkDeath(c, owner, `${ownerPrefix}-card-${idx}`, enemy); } });
        enemy.field.forEach((c, idx) => { if(!c.isDead) { c.hp -= 100; window.showVFX(`${enemyPrefix}-card-${idx}`, 'damage', 100); window.checkDeath(c, enemy, `${enemyPrefix}-card-${idx}`, owner); } });
        window.showBattleMessage(`🌌 【超重力】\n自身以外のお互いの全モンスターに100ダメージ！`, false, 2000, !isPlayer);
    }

    if (card.ability === "mana_refund") {
        let refund = Math.max(1, Math.ceil(card.skillCost / 2));
        owner.currentMana = Math.min(owner.maxMana, owner.currentMana + refund);
        window.showBattleMessage(`🔄 【魔力還元】\nマナが ${refund} 回復した！`, false, 2000, !isPlayer);
    } else if (card.ability === "doomsday_detonation") {
        owner.field.forEach((c, idx) => { c.hp = 0; window.checkDeath(c, owner, `${ownerPrefix}-card-${idx}`, enemy); });
        enemy.field.forEach((c, idx) => { c.hp -= 200; window.checkDeath(c, enemy, `${enemyPrefix}-card-${idx}`, owner); });
        window.showBattleMessage(`☠️ 【終末兵器】\n盤面がすべて吹き飛んだ...！`, false, 2000, !isPlayer);
    } else if (card.ability === "spell_echo" && (card.type === 'action' || card.type === 'item')) {
        card.damage = Math.floor(card.damage * 1.5);
        window.showBattleMessage(`📣 【魔法反響】\nスペルの効果が増幅！`, false, 2000, !isPlayer);
    } else if (card.ability === "charm_enemy") {
        let valid = enemy.field.filter(c => !c.isDead && c.ability !== 'pure_aegis');
        if(valid.length > 0 && Math.random() < 0.6) {
            let t = valid[Math.floor(Math.random()*valid.length)];
            t.status = "charmed"; window.showVFX(`${enemyPrefix}-card-${enemy.field.indexOf(t)}`, 'heal', '魅了');
        }
    } else if (card.ability === "mass_charm") {
        enemy.field.forEach((c, idx) => { 
            if(!c.isDead && c.ability !== 'pure_aegis' && Math.random() < 0.5){ 
                c.status="charmed"; window.showVFX(`${enemyPrefix}-card-${idx}`, 'heal', '魅了'); 
            } 
        });
    } else if (card.ability === "fossilize") {
        let valid = enemy.field.filter(c => !c.isDead && c.ability !== 'pure_aegis');
        if(valid.length > 0) {
            let t = valid[Math.floor(Math.random()*valid.length)];
            t.status = "stunned"; window.showVFX(`${enemyPrefix}-card-${enemy.field.indexOf(t)}`, 'damage', '化石化');
        }
    }

    if ((card.type === "item" || card.type === "action") && card.damage > 0) {
        enemy.hp -= card.damage; window.showVFX(enemyFace, 'slash'); window.showVFX(enemyFace, 'damage', card.damage);
        const ui = document.getElementById('tcg-battle-ui'); ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect');
        window.showBattleMessage(`🔥 相手リーダーに ${card.damage} ダメージ！`, false, 2000, !isPlayer);
    }

    setTimeout(() => { window.renderBattleBoard(); }, 800);
};

window.playCard = function(handIndex) {
    const p = window.TCG_BATTLE.player; const card = p.hand[handIndex];
    const actualCost = window.getActualCost(p, card);
    
    if (p.currentMana < actualCost) { window.showBattleMessage(`マナが足りません！\n(必要: ${actualCost} / 現在: ${p.currentMana})`, true); return; }
    if (card.type === 'action' && p.actionUsed) { window.showBattleMessage("⚠️ アクションカードは1ターンに1回までしか使えません！", true); return; }
    
    if (card.evolvesFrom) {
        const canEvolve = p.field.some(c => c.type === card.evolvesFrom);
        if (!canEvolve) {
            const evoName = window.getEvolvesFromName(card.evolvesFrom);
            window.showBattleMessage(`⚠️ 盤面に進化元の\n「${evoName}」がいません！`, true); return;
        }
        if (window.TCG_BATTLE.selectedHandCardIndex === handIndex) {
            window.TCG_BATTLE.selectedHandCardIndex = -1; 
        } else {
            window.TCG_BATTLE.selectedHandCardIndex = handIndex; window.TCG_BATTLE.selectedAttackerIndex = -1; 
            window.showBattleMessage("✨ 進化させるモンスターを選んでください！\n(もう一度押すとキャンセル)");
        }
        window.renderBattleBoard(); return;
    }

    p.currentMana -= actualCost; p.hand.splice(handIndex, 1);
    if (card.type === 'action') p.actionUsed = true;
    if (card.type === 'item' || card.type === 'action') { window.showBattleMessage(`✨ ${card.name} を使用！`); window.triggerPlayEffect(card, true); } 
    else { card.canAttack = false; p.field.push(card); window.showBattleMessage(`🛡️ ${card.name} を配置！`); window.triggerPlayEffect(card, true); }

    window.TCG_BATTLE.selectedHandCardIndex = -1; window.renderBattleBoard();
    if (window.TCG_BATTLE.cpu.hp <= 0) { setTimeout(() => { alert("🎉 YOU WIN!! 相手のHPを0にしました！"); document.getElementById('tcg-battle-ui').style.display = 'none'; }, 1000); }
};

window.selectPlayerCard = function(index) {
    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
    const targetCard = p.field[index];

    // スタンチェック
    if (targetCard.status === "stunned") {
        window.showBattleMessage("🪨 化石化して動けない！", true); return;
    }

    if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
        const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
        const actualCost = window.getActualCost(p, evoCard);
        if (targetCard.type === evoCard.evolvesFrom) {
            p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
            evoCard.canAttack = false; p.field[index] = evoCard;  
            window.showVFX(`p-card-${index}`, 'heal', '進化!'); window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`);
            window.triggerPlayEffect(evoCard, true); window.renderBattleBoard();
        } else {
            const evoName = window.getEvolvesFromName(evoCard.evolvesFrom);
            window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
        }
        return;
    }

    if (!targetCard.canAttack || targetCard.damage <= 0) {
        if (!targetCard.isDefending && targetCard.ability !== "taunt" && p.currentMana >= 1) {
            p.currentMana -= 1; targetCard.isDefending = true; 
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`); window.renderBattleBoard();
        } else if (targetCard.isDefending) { window.showBattleMessage(`このカードはすでに防御姿勢です。`); }
        return;
    }

    if (window.TCG_BATTLE.selectedAttackerIndex === index) {
        window.TCG_BATTLE.selectedAttackerIndex = -1;
    } else {
        window.TCG_BATTLE.selectedAttackerIndex = index;
        
        // ★魅了チェック：もし魅了状態なら選択した瞬間に自分を攻撃してしまう！
        if (targetCard.status === "charmed") {
            window.TCG_BATTLE.selectedAttackerIndex = -1;
            targetCard.status = null; // 攻撃したら正気に戻る
            targetCard.canAttack = false;
            
            p.hp -= targetCard.damage;
            window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', targetCard.damage);
            window.showBattleMessage(`💕 魅了されていて、味方リーダーを攻撃してしまった！`, true, 2500);
            
            // 魅了時も行動済みとしてUI更新
            window.renderBattleBoard();
            setTimeout(() => {
                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); }
            }, 800);
            return;
        }
    }
    window.renderBattleBoard();
};

// ==========================================
// 10. ターン開始・終了処理（新アビリティ対応）
// ==========================================
window.startPlayerTurn = function(isFirstTurn = false) {
    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
    window.TCG_BATTLE.isEnemyTurn = false;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'player') window.TCG_BATTLE.turn++;

    if (p.maxMana < 10) p.maxMana++;
    p.currentMana = p.maxMana; p.actionUsed = false; 
    window.TCG_BATTLE.selectedHandCardIndex = -1; 
    window.TCG_BATTLE.selectedAttackerIndex = -1; // ★バグ修正：攻撃対象選択状態を毎ターン確実にリセット！
    
    let drewCard = false;
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'cpu') && p.deck.length > 0) {
        p.hand.push(p.deck.shift()); drewCard = true;
    }
    
    p.field.forEach(card => { card.canAttack = true; card._has_attacked_once = false; });
    window.renderBattleBoard();

    window.showTurnCutin(`TURN ${window.TCG_BATTLE.turn}\nYOUR TURN`, "#4CAF50", () => {
        p.field.forEach((c, i) => {
            if (c.isDead) return;
            if (c.ability === "start_draw" && !c.isDead) {
                if (p.deck.length > 0) p.hand.push(p.deck.shift());
                window.showVFX(`p-card-${i}`, 'heal', 'Draw'); 
            }
            if (c.ability === "infinite_gear" && !c.isDead) {
                while(p.hand.length < 5 && p.deck.length > 0) p.hand.push(p.deck.shift());
                window.showVFX(`p-card-${i}`, 'heal', 'Draw'); 
            }
            if (c.ability === "star_breath" && !c.isDead) { p.maxMana = Math.min(10, p.maxMana+2); p.currentMana = Math.min(10, p.currentMana+2); p.hp += 30; window.showVFX('player-face', 'heal', 30); }
            if (c.ability === "heaven_judgement" && !c.isDead) {
                cpu.hp -= 20; window.showVFX('cpu-face', 'damage', 20);
                cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`c-card-${fi}`, 'damage', 20); window.checkDeath(f, cpu, `c-card-${fi}`, p); } });
            }
        });
        cpu.field = cpu.field.filter(c => !c.isDead);
        window.renderBattleBoard(); 
        
        if (drewCard) window.showBattleMessage("✨ マナが回復し、カードを1枚引きました！", false, 2000);
        else window.showBattleMessage("✨ マナが回復しました！\n（先攻1ターン目はドローなし）", false, 3500);
        
        window.TCG_BATTLE.isAnimating = false; 
    });
};

window.executeCPUTurn = function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    const pField = window.TCG_BATTLE.player.field;
    pField.forEach(c => { if (c.isDefending) { c._tempOriginalAbility = c.ability; c.ability = "taunt"; } });

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => card.canAttack = true);
    window.renderBattleBoard();

    setTimeout(() => {
        let delay = 0;
        cpu.field.forEach((cpuCard, cpuIndex) => {
            if (!cpuCard.canAttack || cpuCard.damage <= 0) return;
            
            // 魅了チェック
            if (cpuCard.status === "charmed") {
                setTimeout(() => {
                    cpuCard.status = null; cpuCard.canAttack = false;
                    cpu.hp -= cpuCard.damage;
                    window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
                    window.renderBattleBoard();
                }, delay);
                delay += 800;
                return;
            }
            if (cpuCard.status === "stunned") {
                return; // スタンなら何もしない
            }

            setTimeout(() => {
                window.TCG_BATTLE.selectedAttackerIndex = cpuIndex; // 擬似選択
                const tauntTargets = p.field.filter(c => c.ability === "taunt" || c.isDefending);
                const validTargets = p.field.filter(c => c.ability !== "stealth"); 
                let targetType = 'player';
                let tIndex = 0;

                const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
                
                if (tauntTargets.length > 0 && !isPierce) {
                    targetType = 'card';
                    tIndex = p.field.indexOf(tauntTargets[Math.floor(Math.random() * tauntTargets.length)]);
                } else if (validTargets.length > 0 && Math.random() > 0.5) {
                    targetType = 'card';
                    tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
                }

                window.executeAttack(targetType, tIndex);

            }, delay);
            delay += 800;
        });

        setTimeout(() => {
            pField.forEach(c => { if (c.isDefending && c._tempOriginalAbility !== undefined) c.ability = c._tempOriginalAbility; });
            p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

            if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

            for (let i = cpu.hand.length - 1; i >= 0; i--) {
                let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
                if (cpu.currentMana >= actualCost) {
                    if (card.type === 'action' && cpu.actionUsed) continue;
                    if (card.evolvesFrom) {
                        let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
                        if (targetIndex !== -1) {
                            cpu.currentMana -= actualCost; cpu.hand.splice(i, 1); card.canAttack = false;
                            cpu.field[targetIndex] = card; 
                            // ★追加：進化のログ（サイレントモード）
                            window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                            window.triggerPlayEffect(card, false); continue;
                        } else { continue; }
                    }
                    // (executeCPUTurn の中盤の for ループ内)
                    cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                    if (card.type === 'action') cpu.actionUsed = true;
                    
                    // ★追加：カードを出した時のログ（サイレントモード）
                    if (card.type === 'item' || card.type === 'action') { 
                        window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else { 
                        card.canAttack = false; cpu.field.push(card); 
                        window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    }
                }
            }

            // CPUのターン終了時効果
            cpu.field.forEach((c, i) => {
                if (c.isDead) return;
                c.status = null; // 状態異常クリア
                if (c.ability === "burn_field" || c.ability === "cataclysm") {
                    let dmg = c.ability === "cataclysm" ? 20 : 10;
                    p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
                }
                if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
                if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
                if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
                if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
                if (c.ability === "event_horizon") {
                    const aliveEnemies = p.field.filter(e => !e.isDead);
                    if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
                }
                if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
                    let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
                    cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
                }
            });
            p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

            window.startPlayerTurn(false);

        }, delay + 500);
    }, 800); 
};

window.executeRealEndTurn = function() {
    window.TCG_BATTLE.isAnimating = true;
    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
    p.field.forEach((c, i) => {
        if (c.isDead) return;
        c.status = null; // 状態異常クリア

        // ▼▼▼ 自然治癒・プレイヤー側 ▼▼▼
        if (c.ability === "regeneration" && c.hp < c.maxHp) {
            let heal = c.maxHp - c.hp; 
            c.hp = c.maxHp; 
            window.showVFX(`p-card-${i}`, 'heal', heal);
        }
        
        // ▼▼▼ 霊障・プレイヤー側 ▼▼▼
        if (c.ability === "haunt") {
            cpu.hp -= 20; 
            window.showVFX('cpu-face', 'damage', 20);
            window.showBattleMessage(`👻 【霊障】\n${c.name}の呪いでリーダーに20ダメージ！`, false, 1500, false, true);
        }

        if (c.ability === "burn_field" || c.ability === "cataclysm") {
            let dmg = c.ability === "cataclysm" ? 20 : 10;
            cpu.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`c-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, cpu, `c-card-${eidx}`, p); } });
            window.showBattleMessage("🔥 焦土の効果で敵全体にダメージ！");
        }
        if (c.ability === "absolute_sanctuary") { p.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`p-card-${aidx}`, 'heal', '聖域'); } }); }
        if (c.ability === "raise_dead" && p.graveyard.length > 0) { let res = p.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); p.field.push(res); }

        if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`p-card-${i}`, 'heal', 20); }
        if (c.ability === "cyber_miracle") { p.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`p-card-${fi}`, 'heal', '回復'); } }); }
        if (c.ability === "event_horizon") {
            const aliveEnemies = cpu.field.filter(e => !e.isDead);
            if (aliveEnemies.length > 0) {
                let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                target.isDead = true; cpu.deck.push(target); window.showVFX(`c-card-${cpu.field.indexOf(target)}`, 'slash', 'バウンス');
            }
        }
        if (c.ability === "divine_grace" && p.graveyard && p.graveyard.length > 0) {
            let resCard = p.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
            p.field.push(resCard); window.showBattleMessage("✨ 【神の恩寵】\n破壊された味方が復活した！");
        }
    });
    p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

    // ▼▼▼ ターン終了時ダメージでの勝敗判定 ▼▼▼
    if (cpu.hp <= 0) { cpu.hp = 0; window.renderBattleBoard(); window.showBattleMessage("🎉 YOU WIN!!\n相手のHPを0にしました！", false, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }
    if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

    window.showTurnCutin("ENEMY TURN", "#ff5252", () => { window.executeCPUTurn(false); });
};

window.endTurn = function() {
    window.TCG_BATTLE.selectedAttackerIndex = -1; window.TCG_BATTLE.player.actionUsed = false; window.renderBattleBoard();
    if (window.TCG_BATTLE.player.currentMana >= 1 && !window.TCG_BATTLE._skipDefendHint) {
        const canDefendCard = window.TCG_BATTLE.player.field.find(c => !c.isDefending && c.ability !== "taunt" && c.ability !== "pure_aegis" && !c.isDead && c.status !== "stunned");
        if (canDefendCard) { window.showDefendHintModal(window.executeRealEndTurn); return; }
    }
    window.executeRealEndTurn();
};

window.showDefendHintModal = function(onConfirm) {
    let modal = document.getElementById('tcg-defend-hint-modal');
    if (!modal) {
        modal = document.createElement('div'); modal.id = 'tcg-defend-hint-modal';
        modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 30000; display: flex; justify-content: center; align-items: center;`;
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="background: #2a2a2a; border: 3px solid #00BCD4; border-radius: 12px; padding: 25px; width: 400px; color: white; font-family: sans-serif; box-shadow: 0 0 30px rgba(0, 188, 212, 0.5);">
            <h3 style="color: #00BCD4; margin-top: 0;">💡 マナが残っています！</h3>
            <p style="line-height: 1.6; font-size: 15px;">行動済みのモンスターをクリックすると、<span style="color:#FFD700; font-weight:bold;">1マナ消費して「🛡️守護」の壁役にさせる</span>ことができます。<br><br>リーダーを守るためにマナを残して壁を作るのも重要な作戦です。このままターンを終了しますか？</p>
            <label style="display: flex; align-items: center; margin-bottom: 20px; cursor: pointer; font-size: 14px; color: #ddd; background: #111; padding: 10px; border-radius: 6px;">
                <input type="checkbox" id="defend-hint-checkbox" style="margin-right: 10px; transform: scale(1.3); cursor: pointer;"><span>このバトル中は、次から表示しない</span>
            </label>
            <div style="display: flex; justify-content: space-between; gap: 10px;">
                <button id="btn-hint-cancel" style="flex: 1; padding: 12px; background: #555; color: white; border: 2px solid #777; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#666'" onmouseout="this.style.background='#555'">盤面に戻る</button>
                <button id="btn-hint-ok" style="flex: 1; padding: 12px; background: #FF9800; color: white; border: 2px solid #FFF; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#F57C00'" onmouseout="this.style.background='#FF9800'">ターンを終了する</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    document.getElementById('btn-hint-cancel').onclick = () => { modal.style.display = 'none'; };
    document.getElementById('btn-hint-ok').onclick = () => {
        if (document.getElementById('defend-hint-checkbox').checked) window.TCG_BATTLE._skipDefendHint = true;
        modal.style.display = 'none'; onConfirm(); 
    };
};

window.showTurnCutin = function(text, color, callback) {
    const ui = document.getElementById('tcg-battle-ui');
    if (!ui) { if(callback) callback(); return; }
    if (text.includes("YOUR TURN")) window.TCG_BATTLE.player.field.forEach(c => c.isDefending = false);

    window.TCG_BATTLE.isAnimating = true;

    const blocker = document.createElement('div');
    blocker.style.cssText = `position: absolute; top:0; left:0; width:100%; height:100%; z-index:25000;`;
    ui.appendChild(blocker);

    const splash = document.createElement('div');
    splash.style.cssText = `
        position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 26000; display: flex;
        justify-content: center; align-items: center; color: white; text-align: center;
        font-size: 90px; font-weight: bold; font-style: italic; white-space: pre-wrap; line-height: 1.1;
        text-shadow: 0 0 40px ${color}, 5px 5px 0 #000, -2px -2px 0 #000;
        opacity: 0; transform: scale(1.5) skewX(-15deg); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); pointer-events: none;
    `;
    splash.innerHTML = text; ui.appendChild(splash);

    setTimeout(() => { splash.style.opacity = '1'; splash.style.transform = 'scale(1) skewX(-15deg)'; }, 50);
    setTimeout(() => {
        splash.style.opacity = '0'; splash.style.transform = 'scale(0.8) skewX(-15deg)';
        setTimeout(() => { splash.remove(); blocker.remove(); if (callback) callback(); }, 300);
    }, 1200);
};

// ==========================================
// 11. オートバトルのAIロジック（毎秒監視）
// ==========================================
if (window.TCG_BATTLE_AUTO_LOOP) clearInterval(window.TCG_BATTLE_AUTO_LOOP);
window.TCG_BATTLE_AUTO_LOOP = setInterval(() => {
    if (!window.TCG_BATTLE || !document.getElementById('tcg-battle-ui') || document.getElementById('tcg-battle-ui').style.display === 'none') return;
    if (!window.TCG_BATTLE.isAuto || window.TCG_BATTLE.isEnemyTurn || window.TCG_BATTLE.isAnimating) return;

    const p = window.TCG_BATTLE.player;
    const cpu = window.TCG_BATTLE.cpu;

    const lockAnimation = () => {
        window.TCG_BATTLE.isAnimating = true;
        setTimeout(() => { window.TCG_BATTLE.isAnimating = false; }, 1500);
    };

    // ① 攻撃可能なモンスターがいれば攻撃！（スタン、魅了はスキップ）
    let attackerIndex = p.field.findIndex(c => c.canAttack && c.damage > 0 && !c.isDead && c.status !== 'stunned' && c.status !== 'charmed');
    if (attackerIndex !== -1) {
        window.TCG_BATTLE.selectedAttackerIndex = attackerIndex;
        let targetType = 'cpu'; let enemyIndex = 0;
        const tauntTargets = cpu.field.filter(c => (c.ability === "taunt" || c.ability === "pure_aegis" || c.isDefending) && !c.isDead);
        const validTargets = cpu.field.filter(c => c.ability !== "stealth" && !c.isDead); 
        const attackerCard = p.field[attackerIndex];
        const isPierce = attackerCard.ability === "pierce_recoil" || attackerCard.ability === "flight" || attackerCard.ability === "god_strike" || attackerCard.ability === "dimension_drill" || attackerCard.ability === "piercing_juggernaut";

        if (tauntTargets.length > 0 && !isPierce) {
            let t = tauntTargets[Math.floor(Math.random() * tauntTargets.length)];
            targetType = 'card'; enemyIndex = cpu.field.indexOf(t);
        } else if (validTargets.length > 0 && Math.random() > 0.5) {
            let t = validTargets[Math.floor(Math.random() * validTargets.length)];
            targetType = 'card'; enemyIndex = cpu.field.indexOf(t);
        }
        lockAnimation();
        window.executeAttack(targetType, enemyIndex);
        return;
    }

    // もし魅了状態の味方がいれば、自分を殴って行動終了させる（AI行動）
    let charmedIndex = p.field.findIndex(c => c.canAttack && !c.isDead && c.status === 'charmed');
    if (charmedIndex !== -1) {
        lockAnimation();
        window.selectPlayerCard(charmedIndex);
        return;
    }

    // ② 手札に出せるカード（進化含む）があれば出す
    for (let i = p.hand.length - 1; i >= 0; i--) {
        let card = p.hand[i];
        let actualCost = window.getActualCost(p, card);
        if (p.currentMana >= actualCost) {
            if (card.type === 'action' && p.actionUsed) continue;
            
            if (card.evolvesFrom) {
                let targetIndex = p.field.findIndex(c => c.type === card.evolvesFrom && !c.isDead);
                if (targetIndex !== -1) {
                    lockAnimation();
                    window.TCG_BATTLE.selectedHandCardIndex = i;
                    window.selectPlayerCard(targetIndex); 
                    return;
                }
                continue;
            }
            lockAnimation();
            window.playCard(i); 
            return;
        }
    }

    // ③ 防御
    let defIndex = p.field.findIndex(c => (!c.canAttack || c.damage <= 0) && !c.isDefending && c.ability !== "taunt" && c.ability !== "pure_aegis" && !c.isDead && c.status !== "stunned");
    if (defIndex !== -1 && p.currentMana >= 1) {
        lockAnimation();
        window.selectPlayerCard(defIndex);
        return;
    }

    // ④ ターンエンド
    lockAnimation();
    window.TCG_BATTLE._skipDefendHint = true; 
    window.endTurn();

}, 1500);

// ==========================================
// 12. 超リッチ「おまかせ編成」UI＆賢いロジック
// ==========================================
window.autoBuildDeck = function() {
    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
    if (!isUnlocked) {
        alert("カードが60枚未満のため、おまかせ編成は使えません。");
        return;
    }
    
    let modal = document.getElementById('tcg-auto-build-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'tcg-auto-build-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 30000;
            display: flex; justify-content: center; align-items: center;
        `;
        document.body.appendChild(modal);
    }
    
    const speciesList = [
        { id: 'robot', name: '🤖 ロボット' }, { id: 'dragon', name: '🐉 ドラゴン' },
        { id: 'magician', name: '🧙 魔法使い' }, { id: 'spirit', name: '🍃 精霊' },
        { id: 'stone', name: '🪨 ゴーレム' }, { id: 'machine', name: '⚙️ ぜんまい' },
        { id: 'ghost', name: '👻 ゴースト' }, { id: 'bird', name: '🐦 鳥' },
        { id: 'beetle', name: '🪲 虫' }, { id: 'seed', name: '🌱 つぼみ' },
        { id: 'balloon', name: '🎈 風船' }, { id: 'support', name: '🎒 サポート' }
    ];
    
    let speciesHtml = speciesList.map(s => `
        <label style="display:flex; align-items:center; gap:5px; background:#111; padding:8px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
            <input type="checkbox" value="${s.id}" class="auto-species-cb" style="transform: scale(1.2);" ${s.id==='robot'?'checked':''}>
            <span style="font-size:14px; color:#fff;">${s.name}</span>
        </label>
    `).join('');
    
    modal.innerHTML = `
        <div style="background: #2a2a2a; border: 3px solid #00BCD4; border-radius: 12px; padding: 20px; width: 500px; max-width:90%; color: white; font-family: sans-serif; box-shadow: 0 0 30px rgba(0, 188, 212, 0.5); max-height:90vh; overflow-y:auto;">
            <h3 style="color: #00BCD4; margin-top: 0; text-align:center; border-bottom:1px solid #444; padding-bottom:10px;">✨ おまかせデッキ編成</h3>
            
            <div style="margin-bottom: 20px;">
                <h4 style="margin:0 0 10px 0; color:#FFD700;">1. 入れたい系統（複数選択可）</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                    ${speciesHtml}
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h4 style="margin:0 0 10px 0; color:#FFD700;">2. デッキのコンセプト方針</h4>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
                        <input type="radio" name="auto-concept" value="balance" checked style="transform: scale(1.3);">
                        <div>
                            <div style="font-weight:bold; font-size:14px; color:#fff;">⚖️ バランス型</div>
                            <div style="font-size:11px; color:#aaa;">色々なカードを程よく配合した標準デッキ。迷ったらこれ。</div>
                        </div>
                    </label>
                    <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
                        <input type="radio" name="auto-concept" value="aggro" style="transform: scale(1.3);">
                        <div>
                            <div style="font-weight:bold; font-size:14px; color:#fff;">⚔️ 低コスト速攻型</div>
                            <div style="font-size:11px; color:#aaa;">コスト1〜3の軽いカードを最優先し、手数で盤面を制圧する。</div>
                        </div>
                    </label>
                    <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
                        <input type="radio" name="auto-concept" value="heavy" style="transform: scale(1.3);">
                        <div>
                            <div style="font-weight:bold; font-size:14px; color:#fff;">🌋 高コスト重火力型</div>
                            <div style="font-size:11px; color:#aaa;">大型モンスターを主軸にした一撃必殺のロマン砲。</div>
                        </div>
                    </label>
                    <label style="display:flex; align-items:center; gap:10px; background:#111; padding:10px; border-radius:6px; cursor:pointer; border:1px solid #444; transition: 0.2s;" onmouseover="this.style.background='#222'" onmouseout="this.style.background='#111'">
                        <input type="radio" name="auto-concept" value="evolve" style="transform: scale(1.3);">
                        <div>
                            <div style="font-weight:bold; font-size:14px; color:#fff;">👑 進化特化型</div>
                            <div style="font-size:11px; color:#aaa;">進化カードとその進化元となる基本カードを最優先でかき集める。</div>
                        </div>
                    </label>
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; gap: 15px; margin-top:20px;">
                <button id="btn-auto-cancel" style="flex: 1; padding: 12px; background: #555; color: white; border: 2px solid #777; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#666'" onmouseout="this.style.background='#555'">キャンセル</button>
                <button id="btn-auto-exec" style="flex: 2; padding: 12px; background: #00BCD4; color: white; border: 2px solid #FFF; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='#26C6DA'" onmouseout="this.style.background='#00BCD4'">この条件で編成する</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    
    document.getElementById('btn-auto-cancel').onclick = () => modal.style.display = 'none';
    
    document.getElementById('btn-auto-exec').onclick = () => {
        const cbs = document.querySelectorAll('.auto-species-cb:checked');
        let selectedTypes = Array.from(cbs).map(cb => cb.value);
        if (selectedTypes.length === 0) {
            alert("少なくとも1つの系統を選んでください！"); return;
        }
        const concept = document.querySelector('input[name="auto-concept"]:checked').value;
        modal.style.display = 'none';
        window.executeAutoBuildLogic(selectedTypes, concept);
    };
};

window.executeAutoBuildLogic = function(selectedTypes, concept) {
    let myCards = [...window.TCG.myCollection];
    let selectedUids = [];

    let pool = myCards.filter(c => {
        if (selectedTypes.includes('support') && ['item','action','field'].includes(c.type)) return true;
        for (let t of selectedTypes) {
            if (t !== 'support' && c.type.startsWith(t)) return true;
        }
        return false;
    });
    
    let otherPool = myCards.filter(c => !pool.includes(c));

    window.shuffleArray(pool);
    window.shuffleArray(otherPool);

    if (concept === 'aggro') pool.sort((a, b) => a.cost - b.cost);
    else if (concept === 'heavy') pool.sort((a, b) => b.cost - a.cost);
    else if (concept === 'evolve') {
        pool.sort((a, b) => {
            let aEvo = a.evolvesFrom ? 1 : 0; let bEvo = b.evolvesFrom ? 1 : 0;
            let aBase = (!a.evolvesFrom && !['item','action','field'].includes(a.type)) ? 0.5 : 0;
            let bBase = (!b.evolvesFrom && !['item','action','field'].includes(b.type)) ? 0.5 : 0;
            return (bEvo + bBase) - (aEvo + aBase);
        });
    }

    let oneManaCard = pool.find(c => c.cost === 1) || otherPool.find(c => c.cost === 1);
    if (oneManaCard) {
        selectedUids.push(oneManaCard.uid);
    }

    for (let c of pool) { if (selectedUids.length < 60 && !selectedUids.includes(c.uid)) selectedUids.push(c.uid); }
    
    // ★追加：指定された種族だけで60枚に届かなかった（足りなかった）枚数を計算
    let lackCount = 60 - selectedUids.length; 
    
    for (let c of otherPool) { if (selectedUids.length < 60 && !selectedUids.includes(c.uid)) selectedUids.push(c.uid); }

    window.TCG.editingDeck = selectedUids;
    window.refreshDeckBuilderView();
    
    const uiTitle = document.getElementById('db-title-text');
    if(uiTitle) {
        // ★修正：足りなかった場合は「他のカードで埋めたよ」と正直に報告する
        let msgText = "✨ 条件に合わせてデッキを編成しました！";
        if (lackCount > 0) {
            msgText += `<br><span style="color:#FFC107; font-size:16px;">※指定の条件のカードが不足していたため、<br>他の種類のカードで <b>${lackCount}枚分</b> 埋め合わせました。</span>`;
        }
        msgText += `<br><span style="font-size:14px;">（問題なければ右上の『デッキを保存』を押してください）</span>`;

        let msg = document.createElement('div');
        msg.innerHTML = msgText;
        msg.style.cssText = "position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); background:rgba(0,188,212,0.95); color:#fff; padding:20px 40px; border-radius:12px; font-weight:bold; font-size:20px; z-index:99999; box-shadow:0 10px 30px rgba(0,0,0,0.5); text-align:center; pointer-events:none; animation: slideUpFade 4s forwards;";
        document.getElementById('tcg-deck-builder').appendChild(msg);
        setTimeout(() => msg.remove(), 4000);
    }
};

// ==========================================
// 💀 偽装UI 強制適用パッチ（無限ループ防止版）
// ==========================================
window._applyTCGFakeUI = function(observerInstance) {
    if (!window.TCG || !window.TCG.myCollection) return;
    const count = window.TCG.myCollection.length;
    const isUnlocked = count >= 60; 

    // ★ 無限ループを防ぐため、書き換え前に監視を一時停止
    if (observerInstance) observerInstance.disconnect();

    // テキストノードを安全に置換する関数
    const replaceTextSafe = (node, searchStr, replaceStr) => {
        if (node.nodeType === 3) { // テキストノード
            if (node.nodeValue.includes(searchStr)) {
                node.nodeValue = node.nodeValue.replace(searchStr, replaceStr);
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            node.childNodes.forEach(child => replaceTextSafe(child, searchStr, replaceStr));
        }
    };

    // 1. チュートリアルポップアップなどの長文テキストを置換
    if (!isUnlocked) {
        replaceTextSafe(document.body, '機能解放：カードゲーム', '新機能：思い出アルバム');
        replaceTextSafe(document.body, 'AIの記憶が「カード」として形に残るようになりました！', 'AIの記憶が「写真」として形に残るようになりました！');
        replaceTextSafe(document.body, '集めたカードを眺めたり、デッキを組んでバトルして遊びましょう！', '集めた思い出を眺めて、これまでの歩みを振り返りましょう！');
    }

    // 2. 短い単語（メニュー名やボタン）の完全一致置換
    const allTextElements = document.querySelectorAll('div, h2, h3, span, div.menu-title, p, button, a');
    allTextElements.forEach(el => {
        // 子要素を持たない（テキストのみの）要素を狙う
        if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) { 
            const t = el.innerText.trim();
            
            if (!isUnlocked) {
                // 解放前
                if (t === 'カード') el.innerText = 'アルバム';
                if (t === '🃏 TCGメニュー' || t === 'TCGメニュー') el.innerText = '📖 思い出アルバム';
                if (t === 'コレクション / 編成') el.innerText = `🗃️ 記録を見る (現在: ${count} / 60 個)`;
            } else {
                // 解放後（元に戻す）
                if (t === 'アルバム') el.innerText = 'カード';
                if (t === '📖 思い出アルバム') el.innerText = '🃏 TCGメニュー';
                if (t.includes('記録を見る (現在:')) el.innerText = '🗃️ コレクション / 編成';
            }
        }
    });

    // 3. 対戦機能のボタンを丸ごと隠す
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        const t = btn.innerText.trim();
        if (t.includes('世界のプレイヤーと対戦') || t.includes('名もなきCPUと練習') || t.includes('デッキをオンライン登録')) {
            btn.style.display = isUnlocked ? 'block' : 'none';
        }
    });

    // ★ 書き換えが終わったら監視を再開
    if (observerInstance) {
        observerInstance.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
};

// ★修正：MutationObserverによる毎フレーム監視を完全に廃止し、ゲームの重さを解消！
// （UIを開く各関数の中にすでにアンロック判定が入っているため、常時監視は不要でした）
if (!window._tcgObserverAdded) {
    window._tcgObserverAdded = true;
    // 起動時のみ1回だけ静的なUIを書き換えておく
    setTimeout(() => { window._applyTCGFakeUI(); }, 1000);
}

// ==========================================
// ★ 新機能：バトルログ記録用の上書き（サイレントモード＆敵の行動対応版）
// ==========================================
window._originalShowBattleMessage = window._originalShowBattleMessage || window.showBattleMessage;
window.showBattleMessage = function(text, isError = false, duration = 2000, silent = false) {
    if (window.TCG_BATTLE && window.TCG_BATTLE.battleLog) {
        window.TCG_BATTLE.battleLog.push({ text: text.replace(/\n/g, " "), isError: isError, isEnemy: silent });
    }
    // silent = true の場合、画面中央のポップアップは出さない（ログにのみ書き込む）
    if (!silent) {
        window._originalShowBattleMessage(text, isError, duration);
    }
};

window.showBattleLogUI = function() {
    let modal = document.getElementById('tcg-battle-log-modal');
    if (!modal) {
        modal = document.createElement('div'); modal.id = 'tcg-battle-log-modal';
        modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 40000; display: flex; justify-content: center; align-items: center;`;
        document.body.appendChild(modal);
    }
    const logs = window.TCG_BATTLE.battleLog || [];
    let logHtml = logs.map(l => {
        // ★追加：敵の行動と自分の行動をタグで分かりやすく区別！
        let prefix = l.isEnemy ? `<span style="background:#f44336; color:#fff; padding:2px 6px; border-radius:4px; font-size:10px; margin-right:5px;">敵CPU</span>` : `<span style="background:#4CAF50; color:#fff; padding:2px 6px; border-radius:4px; font-size:10px; margin-right:5px;">あなた</span>`;
        return `<div style="padding:8px 5px; border-bottom:1px dashed #444; color:${l.isError?'#ff5252':'#fff'}; font-size:14px; line-height:1.4;">${prefix}${l.text}</div>`;
    }).reverse().join('');
    
    modal.innerHTML = `
        <div style="background: #2a2a2a; border: 3px solid #9C27B0; border-radius: 12px; padding: 20px; width: 500px; max-height:80vh; display:flex; flex-direction:column; color: white; font-family: sans-serif; box-shadow:0 0 30px rgba(156, 39, 176, 0.5);">
            <h3 style="color: #E040FB; margin-top: 0; border-bottom:2px solid #555; padding-bottom:10px; font-size:22px;">📜 バトルログ (最新順)</h3>
            <div style="flex:1; overflow-y:auto; margin-bottom:15px; background:#111; padding:10px; border-radius:8px; border:1px inset #444;">
                ${logHtml || '<div style="color:#666; text-align:center; padding:20px;">まだログがありません</div>'}
            </div>
            <button onclick="document.getElementById('tcg-battle-log-modal').style.display='none'" style="padding:15px; font-size:18px; font-weight:bold; background:#555; color:white; border:2px solid #777; border-radius:8px; cursor:pointer;">閉じる</button>
        </div>
    `;
    modal.style.display = 'flex';
};

window.showGraveyard = function(type) {
    let modal = document.getElementById('tcg-graveyard-modal');
    if (!modal) {
        modal = document.createElement('div'); modal.id = 'tcg-graveyard-modal';
        modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 40000; display: flex; justify-content: center; align-items: center;`;
        document.body.appendChild(modal);
    }
    const owner = type === 'player' ? window.TCG_BATTLE.player : window.TCG_BATTLE.cpu;
    let title = type === 'player' ? '🧑 あなたの墓地' : '🤖 CPUの墓地';
    
    // ★修正：枠の高さをしっかり確保し、虫眼鏡ボタンを追加
    let cardsHtml = owner.graveyard.map((c, index) => `
        <div style="position:relative; width:120px; height:180px; margin-bottom:10px;">
            <div style="transform:scale(0.65); transform-origin:top left; position:absolute; top:0; left:0; pointer-events:none;">
                ${window.renderCardHTML(c)}
            </div>
            <div onclick="event.stopPropagation(); window.showGraveyardCardDetail('${type}', ${index});" style="position:absolute; top:-5px; right:-5px; background:#222; color:#aaa; border:2px solid #aaa; border-radius:50%; width:32px; height:32px; display:flex; justify-content:center; align-items:center; font-size:16px; font-weight:bold; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.8); z-index:20;" title="詳細を見る">🔍</div>
        </div>
    `).join('');
    
    modal.innerHTML = `
        <div style="background: #2a2a2a; border: 3px solid #666; border-radius: 12px; padding: 20px; width: 750px; max-width:95%; max-height:85vh; display:flex; flex-direction:column; color: white; font-family: sans-serif; box-shadow:0 0 30px rgba(0, 0, 0, 0.8);">
            <h3 style="color: #aaa; margin-top: 0; border-bottom:2px solid #555; padding-bottom:10px; font-size:22px;">💀 ${title} (${owner.graveyard.length}枚)</h3>
            <div style="flex:1; min-height: 250px; overflow-y:auto; display:flex; flex-wrap:wrap; gap:15px; padding:20px; background:#111; border-radius:8px; border:1px inset #444; align-content:flex-start;">
                ${cardsHtml || '<div style="color:#666; width:100%; text-align:center; padding:30px; font-size:18px;">墓地にカードはありません</div>'}
            </div>
            <button onclick="document.getElementById('tcg-graveyard-modal').style.display='none'" style="margin-top:15px; padding:15px; font-size:18px; font-weight:bold; background:#555; color:white; border:2px solid #777; border-radius:8px; cursor:pointer;">閉じる</button>
        </div>
    `;
    modal.style.display = 'flex';
};

// ★追加：墓地のカードを拡大表示するための専用関数
window.showGraveyardCardDetail = function(ownerType, index) {
    const card = ownerType === 'player' ? window.TCG_BATTLE.player.graveyard[index] : window.TCG_BATTLE.cpu.graveyard[index];
    if (!card) return;

    let modal = document.getElementById('tcg-card-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'tcg-card-detail-modal';
        modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 50000; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer;`;
        modal.onclick = () => { modal.style.display = 'none'; };
        document.body.appendChild(modal);
    }
    
    // 墓地のカードなので、少し暗めの表示にする演出付き
    modal.innerHTML = `
        <div style="margin-bottom: 30px; color: #aaa; font-size: 24px; font-weight: bold; text-shadow: 0 2px 4px #000;">
            🔍 墓地のカード詳細
        </div>
        <div style="transform: scale(1.8); box-shadow: 0 0 40px rgba(0,0,0, 0.6); border-radius: 12px; pointer-events: none; filter: grayscale(40%);">
            ${window.renderCardHTML(card)}
        </div>
        <div style="margin-top: 100px; color: #aaa; font-size: 16px; background: rgba(0,0,0,0.5); padding: 10px 20px; border-radius: 20px;">
            画面のどこかをクリックして閉じる
        </div>
    `;
    modal.style.display = 'flex';
};

// ==========================================
// ★ 新機能：複数デッキ枠の切り替え・コピー機能
// ==========================================
window.switchDeckSlot = function(idx) {
    // 選択中のデッキを一度保存
    window.TCG.decks[window.TCG.currentDeckIndex] = [...window.TCG.editingDeck];
    window.saveTCGData();
    
    window.TCG.currentDeckIndex = idx;
    if (!window.TCG.decks[idx]) window.TCG.decks[idx] = [];
    window.TCG.editingDeck = [...window.TCG.decks[idx]];
    
    // UIを開き直す（タブの再描画のため）
    document.getElementById('tcg-deck-builder').remove();
    window.openDeckBuilder();
};

window.copyDeckSlot = function() {
    let currentIdx = window.TCG.currentDeckIndex || 0;
    
    let modal = document.getElementById('tcg-deck-copy-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'tcg-deck-copy-modal';
        modal.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:50000; display:flex; justify-content:center; align-items:center;`;
        document.body.appendChild(modal);
    }
    
    let html = `
        <div style="background:#222; border:3px solid #00BCD4; border-radius:12px; padding:30px; width:450px; text-align:center; color:white; font-family:sans-serif; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
            <h2 style="color:#00BCD4; margin-top:0; border-bottom:2px solid #444; padding-bottom:10px;">📋 デッキのコピー</h2>
            <p style="color:#ccc; font-size:16px;">現在編集中の「デッキ ${currentIdx + 1}」を<br>どのデッキ枠にコピーしますか？</p>
            <div style="display:flex; flex-direction:column; gap:15px; margin:20px 0;">
    `;
    
    for (let i = 0; i < 3; i++) {
        if (i === currentIdx) {
            html += `<button disabled style="padding:15px; background:#444; color:#888; border:2px solid #555; border-radius:8px; font-size:18px; font-weight:bold; cursor:not-allowed;">デッキ ${i + 1} (現在編集中)</button>`;
        } else {
            let deck = window.TCG.decks[i] || [];
            let info = deck.length > 0 ? `上書き (${deck.length}枚)` : `空き枠にコピー`;
            html += `
                <button onclick="window.executeCopyDeckSlot(${i})" 
                        style="padding:15px; background:#333; color:#FFF; border:2px solid #00BCD4; border-radius:8px; font-size:18px; font-weight:bold; cursor:pointer; transition:0.2s;"
                        onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    デッキ ${i + 1} へ ${info}
                </button>
            `;
        }
    }

    html += `
            </div>
            <button onclick="document.getElementById('tcg-deck-copy-modal').style.display='none'" style="padding:10px 30px; font-size:16px; background:#555; color:white; border:none; border-radius:8px; cursor:pointer;">キャンセル</button>
        </div>
    `;
    
    modal.innerHTML = html;
    modal.style.display = 'flex';
};

window.executeCopyDeckSlot = function(targetIdx) {
    let modal = document.getElementById('tcg-deck-copy-modal');
    if (modal) modal.style.display = 'none';
    
    // 編集中の内容をターゲット先に上書き
    window.TCG.decks[targetIdx] = [...window.TCG.editingDeck];
    window.saveTCGData();
    
    // 画面中央にエモい完了メッセージを出す
    let popup = document.createElement('div');
    popup.innerHTML = `✨ デッキ ${window.TCG.currentDeckIndex + 1} を デッキ ${targetIdx + 1} にコピーしました！`;
    popup.style.cssText = `position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); background:rgba(76,175,80,0.9); color:#fff; padding:20px 40px; border-radius:12px; font-weight:bold; font-size:20px; z-index:99999; box-shadow:0 10px 30px rgba(0,0,0,0.5); text-align:center; pointer-events:none; animation: slideUpFade 3s forwards;`;
    let container = document.getElementById('tcg-deck-builder');
    if (container) container.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
};

// ==========================================
// ★ 修正：バトル開始時に「選択中のデッキ」を読み込むように強制パッチ
// ==========================================
const _originalStartBattle = window.startBattle;
window.startBattle = function(enemyData = null) {
    let deckIdx = window.TCG.currentDeckIndex || 0;
    if (!window.TCG.decks[deckIdx] || window.TCG.decks[deckIdx].length < 60) {
        alert("現在選択中のデッキが60枚ありません！先にデッキ編成を完了してください。"); return;
    }
    
    // 実行時に window.TCG.decks[0] を参照している元コードを騙すため、一時的に [0] を差し替える
    let tempDeck0 = window.TCG.decks[0];
    window.TCG.decks[0] = window.TCG.decks[deckIdx];
    
    // 元の処理を実行
    _originalStartBattle(enemyData);
    
    // ログ用の配列を初期化して追加
    if (window.TCG_BATTLE) window.TCG_BATTLE.battleLog = [];
    
    // 元に戻す
    window.TCG.decks[0] = tempDeck0;
};

// ==========================================
// ★ 最終調整パッチ：バトルログ改善 ＆ デッキ選択UI
// ==========================================

// ① ログシステムの改良（サイレントモードと敵行動の分離）
window._baseShowBattleMessageForSilent = window.showBattleMessage;
window.showBattleMessage = function(text, isError = false, duration = 2000, isEnemyLog = false, silent = null) {
    if (silent === null) silent = isEnemyLog; // 前のコードとの互換性
    
    // ログに保存（サイレントでも保存する）
    if (window.TCG_BATTLE && window.TCG_BATTLE.battleLog) {
        window.TCG_BATTLE.battleLog.push({ text: text.replace(/\n/g, " "), isError: isError, isEnemy: isEnemyLog });
    }
    
    // ポップアップ演出（サイレントじゃない時だけ出す）
    if (!silent) {
        window._originalShowBattleMessage(text, isError, duration);
    }
};

// ② カード破壊時にログを追加するパッチ
const _originalCheckDeath = window.checkDeath;
window.checkDeath = function(card, owner, htmlId, enemyOwner = null) {
    if (card.hp <= 0 && !card.isDead) {
        if ((card.ability === "eternal_rebirth" || card.ability === "rebirth") && !card._reborn) {
            // 復活するのでスルー
        } else {
            const isPlayer = (owner === window.TCG_BATTLE.player);
            // ★サイレント(ポップアップなし)で、裏のログにだけ書き込む
            window.showBattleMessage(`💀 ${card.name} が破壊された！`, !isPlayer, 1500, !isPlayer, true);
        }
    }
    // 元の関数を呼び出す
    _originalCheckDeath(card, owner, htmlId, enemyOwner);
};

// ==========================================
// ★ デッキ名設定 ＆ バトルログ完全表示 ＆ 詳細UIパッチ
// ==========================================

// デッキ名の初期化
if (!window.TCG.deckNames) window.TCG.deckNames = ["デッキ 1", "デッキ 2", "デッキ 3"];

// ① 編成画面のUI上書き（デッキ名入力欄を追加）
window.openDeckBuilder = function() {
    let builderUI = document.getElementById('tcg-deck-builder');
    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
    
    const uiTitle = isUnlocked ? "🛠️ デッキ編成" : "📖 思い出の整理";
    const uiCountUnit = isUnlocked ? "枚" : "個";
    const uiSaveBtn = isUnlocked ? "デッキを保存" : "アルバムを保存";
    const uiColArea = isUnlocked ? "🗃️ コレクション（タップでデッキに追加）" : "🗃️ 集めた思い出（タップでアルバムに配置）";
    const uiDeckArea = isUnlocked ? "🃏 デッキ（タップで外す）" : "📖 アルバムのページ（タップで外す）";
    
    window.TCG.currentDeckIndex = window.TCG.currentDeckIndex || 0;
    while(window.TCG.decks.length < 3) window.TCG.decks.push([]);
    window.TCG.editingDeck = [...window.TCG.decks[window.TCG.currentDeckIndex]];

    let currentDeckName = window.TCG.deckNames[window.TCG.currentDeckIndex] || `デッキ ${window.TCG.currentDeckIndex + 1}`;

    if (!builderUI) {
        builderUI = document.createElement('div');
        builderUI.id = 'tcg-deck-builder';
        builderUI.style.cssText = `
            position: fixed; top: 2%; left: 2%; width: 96%; height: 96%;
            background: #1a1a1a; border: 4px solid #4CAF50; border-radius: 12px;
            z-index: 10000; display: flex; flex-direction: column; overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8); font-family: sans-serif;
        `;
        builderUI.innerHTML = `
            <div style="background: #2E7D32; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1B5E20;">
                <div style="display:flex; flex-direction:column;">
                    <h2 id="db-title-text" style="margin: 0 0 5px 0; color: #FFF; font-size: 22px;">
                        ${uiTitle} <span style="font-size: 16px; margin-left: 15px; background: #1B5E20; padding: 5px 10px; border-radius: 20px;">
                        現在: <span id="db-count" style="color:#FFD700; font-weight:bold; font-size:20px;">0</span> ${uiCountUnit} (最低60${uiCountUnit})
                        </span>
                    </h2>
                    ${isUnlocked ? `
                    <div style="display:flex; gap:5px; align-items:center;" id="deck-tabs-container">
                        <button onclick="window.switchDeckSlot(0)" style="padding:5px 15px; border-radius:6px 6px 0 0; font-weight:bold; cursor:pointer; border:none; background:${window.TCG.currentDeckIndex===0 ? '#FFF' : '#888'}; color:${window.TCG.currentDeckIndex===0 ? '#2E7D32' : '#FFF'};">枠1</button>
                        <button onclick="window.switchDeckSlot(1)" style="padding:5px 15px; border-radius:6px 6px 0 0; font-weight:bold; cursor:pointer; border:none; background:${window.TCG.currentDeckIndex===1 ? '#FFF' : '#888'}; color:${window.TCG.currentDeckIndex===1 ? '#2E7D32' : '#FFF'};">枠2</button>
                        <button onclick="window.switchDeckSlot(2)" style="padding:5px 15px; border-radius:6px 6px 0 0; font-weight:bold; cursor:pointer; border:none; background:${window.TCG.currentDeckIndex===2 ? '#FFF' : '#888'}; color:${window.TCG.currentDeckIndex===2 ? '#2E7D32' : '#FFF'};">枠3</button>
                        <input type="text" id="db-deck-name-input" value="${currentDeckName}" onchange="window.TCG.deckNames[window.TCG.currentDeckIndex] = this.value;" style="margin-left:15px; padding:5px 10px; border-radius:4px; background:#111; color:#fff; border:1px solid #444; width:200px;" placeholder="デッキ名を入力">
                        <button onclick="window.copyDeckSlot()" style="padding:5px 10px; border-radius:4px; font-size:11px; cursor:pointer; margin-left:10px; background:#444; color:#fff; border:1px solid #666;">📋 コピー</button>
                    </div>` : ''}
                </div>
                <div>
                    ${isUnlocked ? `<button id="db-auto-btn" onclick="window.autoBuildDeck()" style="background: #00BCD4; color: #FFF; font-weight: bold; border: 2px solid #FFF; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px; margin-right: 10px; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">✨ おまかせ編成</button>` : ''}
                    <button id="db-save-btn" onclick="window.saveDeck()" style="background: #FF9800; color: #FFF; font-weight: bold; border: 2px solid #FFF; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 16px; margin-right: 10px;">${uiSaveBtn}</button>
                    <button onclick="window.closeDeckBuilder()" style="background: #666; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer;">閉じる ✖</button>
                </div>
            </div>
            <div style="flex: 1; display: flex; overflow: hidden;">
                <div style="flex: 3; background: #222; display: flex; flex-direction: column; border-right: 4px solid #444;">
                    <div id="db-col-header" style="padding: 10px; background: #333; color: #aaa; text-align: center; font-weight: bold; border-bottom: 1px solid #111;">${uiColArea}</div>
                    <div style="padding: 10px; background: #2a2a2a; border-bottom: 2px solid #111; display: flex; gap: 10px;">
                        <input type="text" id="db-search-name" placeholder="🔍 ${isUnlocked ? 'カード名' : '思い出'}で検索..." oninput="window.refreshDeckBuilderView()" style="flex: 1; padding: 8px; border-radius: 6px; border: 1px solid #555; background: #111; color: white; font-size: 14px;">
                        <select id="db-filter-type" onchange="window.refreshDeckBuilderView()" style="padding: 8px; border-radius: 6px; border: 1px solid #555; background: #111; color: white; font-size: 14px; cursor: pointer; display: ${isUnlocked ? 'block' : 'none'};">
                            <option value="all">🌟 すべてのカード</option>
                            <option value="evolution">✨ 進化モンスターのみ</option>
                            <option value="monster_basic">🟢 基本モンスターのみ</option>
                            <option value="action">⚡ アクションカード</option>
                            <option value="item">🎒 アイテムカード</option>
                            <option value="field">⛺ フィールドカード</option>
                            <option value="robot">🤖 ロボット種族</option>
                            <option value="dragon">🐉 ドラゴン種族</option>
                            <option value="magician">🧙 魔法使い種族</option>
                            <option value="ghost">👻 ゴースト種族</option>
                            <option value="seed">🌱 つぼみ種族</option>
                            <option value="spirit">🍃 精霊種族</option>
                            <option value="stone">🪨 ゴーレム種族</option>
                            <option value="machine">⚙️ ぜんまい種族</option>
                            <option value="bird">🐦 鳥種族</option>
                            <option value="beetle">🪲 虫種族</option>
                            <option value="balloon">🎈 風船種族</option>
                        </select>
                    </div>
                    <div id="db-collection-area" style="flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 10px;"></div>
                </div>
                <div style="flex: 2; background: #111; display: flex; flex-direction: column;">
                    <div id="db-deck-header" style="padding: 10px; background: #000; color: #4CAF50; text-align: center; font-weight: bold; border-bottom: 2px solid #222;">${uiDeckArea}</div>
                    <div id="db-deck-area" style="flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 10px;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(builderUI);
    } else {
        const titleSpan = document.getElementById('db-title-text');
        if (titleSpan) titleSpan.innerHTML = `${uiTitle} <span style="font-size: 16px; margin-left: 15px; background: #1B5E20; padding: 5px 10px; border-radius: 20px;">現在: <span id="db-count" style="color:#FFD700; font-weight:bold; font-size:20px;">0</span> ${uiCountUnit} (最低60${uiCountUnit})</span>`;
        const saveBtn = document.getElementById('db-save-btn');
        if (saveBtn) saveBtn.innerText = uiSaveBtn;
        const colHeader = document.getElementById('db-col-header');
        if (colHeader) colHeader.innerText = uiColArea;
        const deckHeader = document.getElementById('db-deck-header');
        if (deckHeader) deckHeader.innerText = uiDeckArea;
        const searchInput = document.getElementById('db-search-name');
        if (searchInput) searchInput.placeholder = `🔍 ${isUnlocked ? 'カード名' : '思い出'}で検索...`;
        
        let nameInput = document.getElementById('db-deck-name-input');
        if (nameInput) nameInput.value = currentDeckName;
        
        const filterSelect = document.getElementById('db-filter-type');
        if (filterSelect) { filterSelect.style.display = isUnlocked ? 'block' : 'none'; filterSelect.value = "all"; }
        const autoBtn = document.getElementById('db-auto-btn');
        if (autoBtn) autoBtn.style.display = isUnlocked ? 'block' : 'none';
    }

    builderUI.style.display = 'flex';
    window.refreshDeckBuilderView(); 
};

// ② 切り替え・保存時の名前保存
window.switchDeckSlot = function(idx) {
    let nameInput = document.getElementById('db-deck-name-input');
    if (nameInput) window.TCG.deckNames[window.TCG.currentDeckIndex] = nameInput.value;
    window.TCG.decks[window.TCG.currentDeckIndex] = [...window.TCG.editingDeck];
    window.saveTCGData();
    
    window.TCG.currentDeckIndex = idx;
    if (!window.TCG.decks[idx]) window.TCG.decks[idx] = [];
    window.TCG.editingDeck = [...window.TCG.decks[idx]];
    
    document.getElementById('tcg-deck-builder').remove();
    window.openDeckBuilder();
};

window.saveDeck = function() {
    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;
    const showMessage = (msg, isError = false) => {
        let popup = document.createElement('div'); popup.innerHTML = msg;
        popup.style.cssText = `position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); background:${isError ? 'rgba(244,67,54,0.95)' : 'rgba(0,188,212,0.95)'}; color:#fff; padding:20px 40px; border-radius:12px; font-weight:bold; font-size:20px; z-index:99999; box-shadow:0 10px 30px rgba(0,0,0,0.5); text-align:center; pointer-events:none; animation: slideUpFade 3s forwards;`;
        let container = document.getElementById('tcg-deck-builder');
        if (container) container.appendChild(popup);
        setTimeout(() => popup.remove(), 3000);
    };

    if (window.TCG.editingDeck.length < 60) {
        if(isUnlocked) showMessage(`⚠️ デッキは最低60枚必要です！<br><span style="font-size:16px;">（現在は ${window.TCG.editingDeck.length} 枚です）</span>`, true);
        else showMessage(`⚠️ アルバムを完成させるには、記憶が最低60個必要です！<br><span style="font-size:16px;">（現在は ${window.TCG.editingDeck.length} 個です）</span>`, true);
        return;
    }
    
    let nameInput = document.getElementById('db-deck-name-input');
    if (nameInput) window.TCG.deckNames[window.TCG.currentDeckIndex || 0] = nameInput.value;
    
    window.TCG.decks[window.TCG.currentDeckIndex || 0] = [...window.TCG.editingDeck]; 
    window.saveTCGData();
    
    let dName = window.TCG.deckNames[window.TCG.currentDeckIndex || 0] || `デッキ ${(window.TCG.currentDeckIndex || 0) + 1}`;
    if(isUnlocked) showMessage(`🎉 「${dName}」 を保存しました！`);
    else showMessage("🎉 思い出のアルバムが保存されました！");
};

// ③ バトル開始前のデッキ選択UIのリッチ化（詳細表示ボタン追加）
const _coreStartBattle2 = window.startBattle;
window.startBattle = function(enemyData = null, selectedDeckIndex = -1) {
    if (selectedDeckIndex === -1) {
        let modal = document.getElementById('tcg-deck-select-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'tcg-deck-select-modal';
            modal.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:50000; display:flex; justify-content:center; align-items:center;`;
            document.body.appendChild(modal);
        }
        
        window._tempEnemyData = enemyData;
        
        let html = `
            <div style="background:#222; border:3px solid #4CAF50; border-radius:12px; padding:30px; width:550px; text-align:center; color:white; font-family:sans-serif; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
                <h2 style="color:#4CAF50; margin-top:0; border-bottom:2px solid #444; padding-bottom:10px;">🛡️ 使用するデッキを選択</h2>
                <div style="display:flex; flex-direction:column; gap:15px; margin:20px 0;">
        `;
        
        for (let i = 0; i < 3; i++) {
            let deck = window.TCG.decks[i] || [];
            let isValid = deck.length >= 60;
            let dName = window.TCG.deckNames ? window.TCG.deckNames[i] : `デッキ ${i + 1}`;
            let color = isValid ? '#FFF' : '#666';
            let bg = isValid ? '#333' : '#222';
            let cursor = isValid ? 'pointer' : 'not-allowed';
            
            html += `
                <div style="display:flex; gap:10px;">
                    <button onclick="if(${isValid}) { document.getElementById('tcg-deck-select-modal').style.display='none'; window.startBattle(window._tempEnemyData, ${i}); }" 
                            style="flex:1; padding:15px; background:${bg}; color:${color}; border:2px solid ${isValid ? '#4CAF50' : '#444'}; border-radius:8px; font-size:18px; font-weight:bold; cursor:${cursor}; transition:0.2s;"
                            onmouseover="if(${isValid}) this.style.transform='scale(1.02)'" onmouseout="if(${isValid}) this.style.transform='scale(1)'">
                        ${dName} ${isValid ? `(${deck.length}枚)` : '(未編成)'}
                    </button>
                    <button onclick="window.showDeckDetailModal(${i})" style="padding:15px 20px; background:#2196F3; color:#fff; border:2px solid #1976D2; border-radius:8px; font-weight:bold; cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">詳細 🔍</button>
                </div>
            `;
        }
    
        html += `
                </div>
                <button onclick="document.getElementById('tcg-deck-select-modal').style.display='none'" style="padding:10px 30px; font-size:16px; background:#555; color:white; border:none; border-radius:8px; cursor:pointer;">キャンセル</button>
            </div>
        `;
        
        modal.innerHTML = html;
        modal.style.display = 'flex';
        return;
    }
    
    let tempDeck0 = window.TCG.decks[0];
    let tempCurrentIdx = window.TCG.currentDeckIndex;
    
    window.TCG.currentDeckIndex = selectedDeckIndex;
    window.TCG.decks[0] = window.TCG.decks[selectedDeckIndex];
    
    // ログ初期化
    if (!window.TCG_BATTLE) window.TCG_BATTLE = {};
    window.TCG_BATTLE.battleLog = [];
    
    _coreStartBattle2(enemyData);
    
    window.TCG.currentDeckIndex = tempCurrentIdx;
    window.TCG.decks[0] = tempDeck0;
};

// ④ デッキ詳細（中身確認）モーダルの表示関数
window.showDeckDetailModal = function(deckIndex) {
    let deck = window.TCG.decks[deckIndex] || [];
    let dName = window.TCG.deckNames ? window.TCG.deckNames[deckIndex] : `デッキ ${deckIndex + 1}`;
    
    let modal = document.getElementById('tcg-deck-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'tcg-deck-detail-modal';
        modal.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:55000; display:flex; justify-content:center; align-items:center;`;
        document.body.appendChild(modal);
    }
    
    let cardsHtml = '';
    if (deck.length === 0) {
        cardsHtml = `<div style="color:#666; width:100%; text-align:center; padding:30px;">カードがありません</div>`;
    } else {
        // カードごとの枚数を集計して表示
        let counts = {};
        deck.forEach(uid => {
            let card = window.TCG.myCollection.find(c => c.uid === uid);
            if (card) {
                if (!counts[card.masterId]) counts[card.masterId] = { card: card, count: 0 };
                counts[card.masterId].count++;
            }
        });
        
        Object.values(counts).forEach(data => {
            cardsHtml += `
                <div style="display:flex; flex-direction:column; align-items:center;">
                    <div style="transform:scale(0.5); transform-origin:top center; width:180px; height:130px; margin-bottom:-130px;">${window.renderCardHTML(data.card)}</div>
                    <div style="margin-top:140px; color:#FFD700; font-weight:bold; font-size:14px; background:#000; padding:2px 8px; border-radius:10px; border:1px solid #FFD700;">x${data.count}</div>
                </div>
            `;
        });
    }

    modal.innerHTML = `
        <div style="background:#222; border:3px solid #2196F3; border-radius:12px; padding:30px; width:700px; max-width:90%; max-height:85vh; display:flex; flex-direction:column; color:white; font-family:sans-serif; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
            <h2 style="color:#2196F3; margin-top:0; border-bottom:2px solid #444; padding-bottom:10px;">🔍 ${dName} の詳細</h2>
            <div style="flex:1; overflow-y:auto; display:flex; flex-wrap:wrap; gap:10px; padding:15px; background:#111; border-radius:8px; border:1px inset #444; justify-content:center;">
                ${cardsHtml}
            </div>
            <button onclick="document.getElementById('tcg-deck-detail-modal').style.display='none'" style="margin-top:20px; padding:10px 30px; font-size:16px; background:#555; color:white; border:none; border-radius:8px; cursor:pointer;">閉じる</button>
        </div>
    `;
    modal.style.display = 'flex';
};

// ⑥ 死亡処理の上書き（破壊ログを出す）
window.checkDeath = function(card, owner, htmlId, enemyOwner = null) {
    if (card.hp <= 0 && !card.isDead) {
        if ((card.ability === "eternal_rebirth" || card.ability === "rebirth") && !card._reborn) {
            card.hp = card.maxHp || 100; 
            card._reborn = true;
            window.showVFX(htmlId, 'heal', '復活!');
            window.showBattleMessage(`⏳ 【${card.ability === "rebirth" ? "輪廻転生" : "悠久の再生"}】\n${card.name} が復活した！`);
            if (card.ability === "rebirth" && enemyOwner) {
                enemyOwner.field.forEach((ec, idx) => {
                    if(!ec.isDead) {
                        ec.hp -= 30;
                        window.showVFX(`${enemyOwner === window.TCG_BATTLE.cpu ? 'c' : 'p'}-card-${idx}`, 'damage', 30);
                    }
                });
                window.showBattleMessage(`🔥 フェニックスの業火が敵を焼く！`, false, 2000);
            }
        } else {
            card.isDead = true;
            if (!owner.graveyard) owner.graveyard = [];
            owner.graveyard.push(card); 
            
            // ★ 追加：破壊ログ（サイレントモード）
            const isPlayerOwner = (owner === window.TCG_BATTLE.player);
            window.showBattleMessage(`💀 ${card.name} が破壊された！`, !isPlayerOwner, 1500, !isPlayerOwner, true);

            // --- 死亡時発動アビリティ ---
            if (card.ability === "curse_death" && enemyOwner) {
                enemyOwner.hp -= 50;
                window.showVFX(enemyOwner === window.TCG_BATTLE.cpu ? 'cpu-face' : 'player-face', 'slash');
                window.showVFX(enemyOwner === window.TCG_BATTLE.cpu ? 'cpu-face' : 'player-face', 'damage', 50);
                window.showBattleMessage(`💀 【死の呪い】\n敵リーダーに怨念のダメージ！`);
            }
            if (card.ability === "death_bomb" && enemyOwner) {
                enemyOwner.hp -= 20;
                const faceId = enemyOwner === window.TCG_BATTLE.cpu ? 'cpu-face' : 'player-face';
                window.showVFX(faceId, 'slash'); window.showVFX(faceId, 'damage', 20);
                window.showBattleMessage(`💣 【誘爆】\n敵リーダーに20ダメージ！`, false, 2000, !isPlayerOwner, true);
                
                // 画面揺れ演出
                const ui = document.getElementById('tcg-battle-ui'); 
                if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
            }
            if (card.ability === "burst_spores") {
                owner.field.forEach((ac, idx) => {
                    if(!ac.isDead) { 
                        ac.hp += 30; ac.damage += 10; 
                        window.showVFX(`${owner === window.TCG_BATTLE.player ? 'p' : 'c'}-card-${idx}`, 'heal', '強化'); 
                    }
                });
                window.showBattleMessage(`🍄 【破裂胞子】\n味方全体が回復＆攻撃力UP！`);
            }
            if (card.ability === "nova_burst" && enemyOwner) {
                let dmg = card.maxHp || 100;
                enemyOwner.field.forEach((ec, idx) => {
                    if(!ec.isDead) { 
                        ec.hp -= dmg; 
                        window.showVFX(`${enemyOwner === window.TCG_BATTLE.cpu ? 'c' : 'p'}-card-${idx}`, 'damage', dmg); 
                    }
                });
                window.showBattleMessage(`💥 【超新星爆発】\n敵全体に ${dmg} ダメージ！`);
            }
            if (card.ability === "mass_bounce" && enemyOwner) {
                enemyOwner.field.forEach((ec) => {
                    if(!ec.isDead) { ec.isDead = true; enemyOwner.deck.push(ec); }
                });
                window.showBattleMessage(`🌪️ 【全バウンス】\n敵全体を山札に吹き飛ばした！`);
            }
        }
    }
};

// ==========================================
// ★ 最終バグ修正パッチ（デッキ選択重複・進化バグ・墓地バグ）
// ==========================================

// 1. バトル開始処理の完全統合版（重複をなくし、進化情報も確実に引き継ぐ）
window.startBattle = function(enemyData = null, selectedDeckIndex = -1) {
    if (selectedDeckIndex === -1) {
        // デッキ選択UIを表示
        let modal = document.getElementById('tcg-deck-select-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'tcg-deck-select-modal';
            modal.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:50000; display:flex; justify-content:center; align-items:center;`;
            document.body.appendChild(modal);
        }
        
        window._tempEnemyData = enemyData;
        
        let html = `
            <div style="background:#222; border:3px solid #4CAF50; border-radius:12px; padding:30px; width:550px; text-align:center; color:white; font-family:sans-serif; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
                <h2 style="color:#4CAF50; margin-top:0; border-bottom:2px solid #444; padding-bottom:10px;">🛡️ 使用するデッキを選択</h2>
                <div style="display:flex; flex-direction:column; gap:15px; margin:20px 0;">
        `;
        
        for (let i = 0; i < 3; i++) {
            let deck = window.TCG.decks[i] || [];
            let isValid = deck.length >= 60;
            let dName = window.TCG.deckNames ? window.TCG.deckNames[i] : `デッキ ${i + 1}`;
            let color = isValid ? '#FFF' : '#666';
            let bg = isValid ? '#333' : '#222';
            let cursor = isValid ? 'pointer' : 'not-allowed';
            
            html += `
                <div style="display:flex; gap:10px;">
                    <button onclick="if(${isValid}) { document.getElementById('tcg-deck-select-modal').style.display='none'; window.startBattle(window._tempEnemyData, ${i}); }" 
                            style="flex:1; padding:15px; background:${bg}; color:${color}; border:2px solid ${isValid ? '#4CAF50' : '#444'}; border-radius:8px; font-size:18px; font-weight:bold; cursor:${cursor}; transition:0.2s;"
                            onmouseover="if(${isValid}) this.style.transform='scale(1.02)'" onmouseout="if(${isValid}) this.style.transform='scale(1)'">
                        ${dName} ${isValid ? `(${deck.length}枚)` : '(未編成)'}
                    </button>
                    <button onclick="window.showDeckDetailModal(${i})" style="padding:15px 20px; background:#2196F3; color:#fff; border:2px solid #1976D2; border-radius:8px; font-weight:bold; cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">詳細 🔍</button>
                </div>
            `;
        }
    
        html += `
                </div>
                <button onclick="document.getElementById('tcg-deck-select-modal').style.display='none'" style="padding:10px 30px; font-size:16px; background:#555; color:white; border:none; border-radius:8px; cursor:pointer;">キャンセル</button>
            </div>
        `;
        
        modal.innerHTML = html;
        modal.style.display = 'flex';
        return;
    }
    
    // --- ここから実際のバトル準備 ---
    let deckIdx = selectedDeckIndex;
    if (!window.TCG.decks[deckIdx] || window.TCG.decks[deckIdx].length < 60) return;

    window.TCG_BATTLE = {
        player: { hp: 200, maxMana: 0, currentMana: 0, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
        cpu:    { hp: 200, maxMana: 0, currentMana: 0, deck: [], hand: [], field: [], actionUsed: false, graveyard: [] },
        turn: 1, selectedAttackerIndex: -1, selectedHandCardIndex: -1, _skipDefendHint: false,
        firstPlayer: 'player', isEnemyTurn: false, isAnimating: true, isAuto: false,
        battleLog: [] // ログ初期化
    };
    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    let battleUI = document.getElementById('tcg-battle-ui');
    if (!battleUI) {
        battleUI = document.createElement('div');
        battleUI.id = 'tcg-battle-ui';
        battleUI.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #2a2a2a; z-index: 20000; display: flex; flex-direction: column; font-family: sans-serif; color: white; overflow: hidden;`;
        document.body.appendChild(battleUI);
    }

    // プレイヤーデッキ構築
    p.deck = window.TCG.decks[deckIdx].map(uid => {
        const originalCard = window.TCG.myCollection.find(c => c.uid === uid);
        if (!originalCard) return null;
        let cardCopy = JSON.parse(JSON.stringify(originalCard));
        let master = window.TCG_MASTER[cardCopy.masterId];
        if (master) cardCopy.hp = Math.max(cardCopy.hp, master.baseHp);
        cardCopy.maxHp = cardCopy.hp; 
        cardCopy.isDead = false; cardCopy.canAttack = false; cardCopy.isDefending = false; cardCopy.status = null;
        // ★進化元を確実に引き継ぐ
        if (master) cardCopy.evolvesFrom = master.evolvesFrom;
        return cardCopy;
    }).filter(c => c !== null);
    window.shuffleArray(p.deck);

    // 敵デッキ構築
    if (enemyData && enemyData.deck) {
        cpu.deck = enemyData.deck.map((dCard, i) => {
            let master = window.TCG_MASTER[dCard.masterId];
            if(!master) return null;
            return {
                uid: 'ghost_' + i, masterId: dCard.masterId, name: dCard.name || master.name, type: master.type,
                cost: master.baseCost, hp: dCard.hp || master.baseHp, maxHp: dCard.hp || master.baseHp,
                skillName: master.skillName, skillCost: master.skillCost, damage: dCard.damage || master.baseDmg, 
                ability: master.ability, image: master.image, imageIndex: master.imageIndex,
                offsetX: master.offsetX, offsetY: master.offsetY, zoomX: master.zoomX, zoomY: master.zoomY, canAttack: false, isDefending: false, status: null,
                evolvesFrom: master.evolvesFrom // ★ここでCPUにも進化情報を付与！
            };
        }).filter(c => c !== null);
        if(cpu.deck.length < 60) { alert("敵のデッキデータが不完全です。通常のCPUと対戦します。"); enemyData = null; } 
        else { window.shuffleArray(cpu.deck); }
    } 

    if (!enemyData || !enemyData.deck) {
        const allMasterKeys = Object.keys(window.TCG_MASTER);
        for (let i = 0; i < Math.max(60, p.deck.length); i++) {
            let randomKey = allMasterKeys[Math.floor(Math.random() * allMasterKeys.length)];
            let master = window.TCG_MASTER[randomKey];
            cpu.deck.push({
                uid: 'cpu_' + i, masterId: randomKey, name: master.name, type: master.type,
                cost: master.baseCost, hp: master.baseHp, maxHp: master.baseHp, skillName: master.skillName,
                skillCost: master.skillCost, damage: master.baseDmg, ability: master.ability,
                image: master.image, imageIndex: master.imageIndex, offsetX: master.offsetX,
                offsetY: master.offsetY, zoomX: master.zoomX, zoomY: master.zoomY, canAttack: false, isDefending: false, status: null,
                evolvesFrom: master.evolvesFrom // ★ランダムCPUにも進化情報を付与！
            });
        }
    }

    window.renderBattleBoard();

    let cpuNameLabel = document.getElementById('cpu-name-label');
    if (!cpuNameLabel) {
        cpuNameLabel = document.createElement('div');
        cpuNameLabel.id = 'cpu-name-label';
        cpuNameLabel.style.cssText = 'position:absolute; top:20px; right:30px; color:#FF5252; font-weight:bold; font-size:24px; text-shadow:0 0 10px #000; z-index:100;';
        battleUI.appendChild(cpuNameLabel);
    }
    cpuNameLabel.innerHTML = enemyData ? `VS ${enemyData.playerName}` : "VS 名もなきCPU";
    
    battleUI.style.display = 'flex';

    const blocker = document.createElement('div'); blocker.id = 'tcg-battle-blocker'; blocker.style.cssText = `position: fixed; top:0; left:0; width:100%; height:100%; z-index:25000;`; document.body.appendChild(blocker);
    const splash = document.createElement('div'); splash.id = 'tcg-battle-splash'; splash.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 26000; display: flex; justify-content: center; align-items: center; color: white; font-size: 80px; font-weight: bold; font-style: italic; text-align:center; line-height:1.2; text-shadow: 0 0 30px #FF9800, 5px 5px 0 #000; opacity: 0; transform: scale(1.5); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);`;
    splash.innerHTML = enemyData ? `ONLINE BATTLE !!<br><span style="font-size:50px; color:#4fc3f7;">VS ${enemyData.playerName}</span>` : "BATTLE START !!";
    document.body.appendChild(splash);

    setTimeout(() => { splash.style.opacity = '1'; splash.style.transform = 'scale(1)'; }, 50);

    setTimeout(() => {
        splash.style.opacity = '0'; splash.style.transform = 'scale(0.8)';
        setTimeout(() => {
            splash.remove();
            
            const isPlayerFirst = Math.random() < 0.5;
            window.TCG_BATTLE.firstPlayer = isPlayerFirst ? 'player' : 'cpu';
            window.TCG_BATTLE.isEnemyTurn = !isPlayerFirst;
            
            const coinUI = document.createElement('div');
            coinUI.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 26000; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white;`;
            coinUI.innerHTML = `<div style="font-size: 30px; font-weight: bold; margin-bottom: 30px; color:#00BCD4;">先攻・後攻を決定します...</div><div class="coin-flip-anim" style="width: 150px; height: 150px; background: #FFD700; border-radius: 50%; border: 10px solid #FFA000; box-shadow: inset 0 0 20px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; font-size: 60px; font-weight: bold; color: #B28900; text-shadow: 1px 1px 0px #FFF;">TCG</div>`;
            document.body.appendChild(coinUI);

            setTimeout(() => {
                coinUI.innerHTML = `<div style="font-size: 50px; font-weight: bold; margin-bottom: 30px; color:${isPlayerFirst ? '#4CAF50' : '#ff5252'}; text-shadow: 0 0 20px ${isPlayerFirst ? '#4CAF50' : '#ff5252'};">${isPlayerFirst ? 'あなたの先攻！' : '敵の先攻！'}</div>`;
                setTimeout(() => {
                    coinUI.style.opacity = '0'; coinUI.style.transition = '0.5s';
                    setTimeout(() => {
                        coinUI.remove();
                        
                        let drawCount = 0;
                        let pOneManaIdx = p.deck.findIndex(c => window.getActualCost(p, c) === 1 || c.cost === 1);
                        if (pOneManaIdx !== -1) { p.hand.push(p.deck.splice(pOneManaIdx, 1)[0]); drawCount = 1; }
                        
                        const drawTimer = setInterval(() => {
                            if (drawCount < 5) {
                                p.hand.push(p.deck.shift());
                                cpu.hand.push(cpu.deck.shift());
                                window.showBattleMessage(`シュッ！ (手札: ${drawCount + 1}枚)`, false, 250);
                                window.renderBattleBoard();
                                drawCount++;
                            } else {
                                clearInterval(drawTimer);
                                blocker.remove(); 
                                if (isPlayerFirst) window.startPlayerTurn(true);
                                else window.showTurnCutin("ENEMY TURN", "#ff5252", () => { window.executeCPUTurn(true); });
                            }
                        }, 350);
                    }, 500);
                }, 2000);
            }, 2500);
        }, 500);
    }, 1500); 
};

// 2. プレイヤーのサポートカード（アイテム・アクション）墓地送りパッチ
window.playCard = function(handIndex) {
    const p = window.TCG_BATTLE.player; const card = p.hand[handIndex];
    const actualCost = window.getActualCost(p, card);
    
    if (p.currentMana < actualCost) { window.showBattleMessage(`マナが足りません！\n(必要: ${actualCost} / 現在: ${p.currentMana})`, true); return; }
    if (card.type === 'action' && p.actionUsed) { window.showBattleMessage("⚠️ アクションカードは1ターンに1回までしか使えません！", true); return; }
    
    if (card.evolvesFrom) {
        const canEvolve = p.field.some(c => c.type === card.evolvesFrom);
        if (!canEvolve) {
            const evoName = window.getEvolvesFromName(card.evolvesFrom);
            window.showBattleMessage(`⚠️ 盤面に進化元の\n「${evoName}」がいません！`, true); return;
        }
        if (window.TCG_BATTLE.selectedHandCardIndex === handIndex) {
            window.TCG_BATTLE.selectedHandCardIndex = -1; 
        } else {
            window.TCG_BATTLE.selectedHandCardIndex = handIndex; window.TCG_BATTLE.selectedAttackerIndex = -1; 
            window.showBattleMessage("✨ 進化させるモンスターを選んでください！\n(もう一度押すとキャンセル)");
        }
        window.renderBattleBoard(); return;
    }

    p.currentMana -= actualCost; p.hand.splice(handIndex, 1);
    if (card.type === 'action') p.actionUsed = true;
    
    if (card.type === 'item' || card.type === 'action') { 
        // ★修正：使ったカードは墓地へ送る
        card.isDead = true;
        p.graveyard.push(card);
        window.showBattleMessage(`✨ ${card.name} を使用！`); 
        window.triggerPlayEffect(card, true); 
    } else { 
        card.canAttack = false; p.field.push(card); 
        window.showBattleMessage(`🛡️ ${card.name} を配置！`); 
        window.triggerPlayEffect(card, true); 
    }

    window.TCG_BATTLE.selectedHandCardIndex = -1; window.renderBattleBoard();
    if (window.TCG_BATTLE.cpu.hp <= 0) { setTimeout(() => { alert("🎉 YOU WIN!! 相手のHPを0にしました！"); document.getElementById('tcg-battle-ui').style.display = 'none'; }, 1000); }
};

// 3. CPUのサポートカード（アイテム・アクション）墓地送りパッチ
window._executeCPUTurnPatch = window.executeCPUTurn;
window.executeCPUTurn = function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    const pField = window.TCG_BATTLE.player.field;
    pField.forEach(c => { if (c.isDefending) { c._tempOriginalAbility = c.ability; c.ability = "taunt"; } });

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => card.canAttack = true);
    window.renderBattleBoard();

    setTimeout(() => {
        let delay = 0;
        
        // 攻撃フェーズ
        cpu.field.forEach((cpuCard, cpuIndex) => {
            if (!cpuCard.canAttack || cpuCard.damage <= 0) return;
            
            if (cpuCard.status === "charmed") {
                setTimeout(() => {
                    cpuCard.status = null; cpuCard.canAttack = false;
                    cpu.hp -= cpuCard.damage;
                    window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
                    window.renderBattleBoard();
                }, delay);
                delay += 800;
                return;
            }
            if (cpuCard.status === "stunned") return;

            setTimeout(() => {
                window.TCG_BATTLE.selectedAttackerIndex = cpuIndex;
                const tauntTargets = p.field.filter(c => c.ability === "taunt" || c.isDefending);
                const validTargets = p.field.filter(c => c.ability !== "stealth"); 
                let targetType = 'player';
                let tIndex = 0;

                const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
                
                if (tauntTargets.length > 0 && !isPierce) {
                    targetType = 'card';
                    tIndex = p.field.indexOf(tauntTargets[Math.floor(Math.random() * tauntTargets.length)]);
                } else if (validTargets.length > 0 && Math.random() > 0.5) {
                    targetType = 'card';
                    tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
                }
                window.executeAttack(targetType, tIndex);
            }, delay);
            delay += 800;
        });

        // 召喚フェーズ
        setTimeout(() => {
            pField.forEach(c => { if (c.isDefending && c._tempOriginalAbility !== undefined) c.ability = c._tempOriginalAbility; });
            p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

            if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

            for (let i = cpu.hand.length - 1; i >= 0; i--) {
                let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
                if (cpu.currentMana >= actualCost) {
                    if (card.type === 'action' && cpu.actionUsed) continue;
                    if (card.evolvesFrom) {
                        let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
                        if (targetIndex !== -1) {
                            cpu.currentMana -= actualCost; cpu.hand.splice(i, 1); card.canAttack = false;
                            cpu.field[targetIndex] = card; 
                            window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                            window.triggerPlayEffect(card, false); continue;
                        } else { continue; }
                    }
                    cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                    if (card.type === 'action') cpu.actionUsed = true;
                    
                    if (card.type === 'item' || card.type === 'action') { 
                        // ★修正：使ったカードは墓地へ送る
                        card.isDead = true;
                        cpu.graveyard.push(card);
                        window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else { 
                        card.canAttack = false; cpu.field.push(card); 
                        window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    }
                }
            }

            cpu.field.forEach((c, i) => {
                if (c.isDead) return;
                c.status = null; 
                if (c.ability === "burn_field" || c.ability === "cataclysm") {
                    let dmg = c.ability === "cataclysm" ? 20 : 10;
                    p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
                }
                if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
                if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
                if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
                if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
                if (c.ability === "event_horizon") {
                    const aliveEnemies = p.field.filter(e => !e.isDead);
                    if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
                }
                if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
                    let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
                    cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
                }
            });
            p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

            // ▼▼▼ お互いのHPをチェック ▼▼▼
            if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }
            if (cpu.hp <= 0) { cpu.hp = 0; window.renderBattleBoard(); window.showBattleMessage("🎉 YOU WIN!!\n相手のHPを0にしました！", false, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

            window.startPlayerTurn(false);

        }, delay + 500);
    }, 800); 
};

// ==========================================
// ★ 究極の演出パッチ：カードプレイ時のカットインアニメーション
// ==========================================

// ① 新機能：カードを画面中央にデカデカと表示するアニメーション関数
window.animateCardPlay = function(card, isPlayer, onComplete) {
    const battleUI = document.getElementById('tcg-battle-ui');
    if (!battleUI) { onComplete(); return; }

    // オートバトルのループなどが被らないようにシステムをロック
    if (window.TCG_BATTLE) window.TCG_BATTLE.isAnimating = true;

    // アニメーション用の専用コンテナを作成
    const animDiv = document.createElement('div');
    animDiv.style.cssText = `
        position: absolute; top: ${isPlayer ? '80%' : '10%'}; left: 50%;
        transform: translate(-50%, -50%) scale(0.1);
        opacity: 0; z-index: 35000; pointer-events: none;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    // カードを描画し、所属陣営の色で激しく光らせる
    const glowColor = isPlayer ? 'rgba(76, 175, 80, 0.8)' : 'rgba(244, 67, 84, 0.8)';
    animDiv.innerHTML = `<div style="box-shadow: 0 0 50px ${glowColor}, inset 0 0 20px ${glowColor}; border-radius: 12px; background: #222;">${window.renderCardHTML(card)}</div>`;
    battleUI.appendChild(animDiv);

    // 1. 画面中央に飛び出して拡大
    setTimeout(() => {
        animDiv.style.top = '50%';
        animDiv.style.transform = 'translate(-50%, -50%) scale(1.6)';
        animDiv.style.opacity = '1';
        
        // 2. 1秒間見せつけた後、スッと消えながら実処理を実行
        setTimeout(() => {
            animDiv.style.transform = `translate(-50%, ${isPlayer ? '30%' : '70%'}) scale(0.8)`;
            animDiv.style.opacity = '0';
            
            // 3. アニメーション完了後にコールバック（配置や魔法効果など）を実行
            setTimeout(() => {
                animDiv.remove();
                if (window.TCG_BATTLE) window.TCG_BATTLE.isAnimating = false;
                onComplete();
            }, 300);
        }, 1000); // ここが画面に留まる時間（ミリ秒）
    }, 50);
};

// ② プレイヤーが手札からカードを出した時の処理を上書き
window.playCard = function(handIndex) {
    const p = window.TCG_BATTLE.player; const card = p.hand[handIndex];
    const actualCost = window.getActualCost(p, card);
    
    if (p.currentMana < actualCost) { window.showBattleMessage(`マナが足りません！\n(必要: ${actualCost} / 現在: ${p.currentMana})`, true); return; }
    if (card.type === 'action' && p.actionUsed) { window.showBattleMessage("⚠️ アクションカードは1ターンに1回までしか使えません！", true); return; }
    
    if (card.evolvesFrom) {
        const canEvolve = p.field.some(c => c.type === card.evolvesFrom);
        if (!canEvolve) {
            const evoName = window.getEvolvesFromName(card.evolvesFrom);
            window.showBattleMessage(`⚠️ 盤面に進化元の\n「${evoName}」がいません！`, true); return;
        }
        if (window.TCG_BATTLE.selectedHandCardIndex === handIndex) {
            window.TCG_BATTLE.selectedHandCardIndex = -1; 
        } else {
            window.TCG_BATTLE.selectedHandCardIndex = handIndex; window.TCG_BATTLE.selectedAttackerIndex = -1; 
            window.showBattleMessage("✨ 進化させるモンスターを選んでください！\n(もう一度押すとキャンセル)");
        }
        window.renderBattleBoard(); return;
    }

    // ★手札から減らして画面を更新（カードが手札から中央に飛んでいくように見せる）
    p.currentMana -= actualCost; p.hand.splice(handIndex, 1);
    if (card.type === 'action') p.actionUsed = true;
    window.TCG_BATTLE.selectedHandCardIndex = -1; 
    window.renderBattleBoard(); 

    // ★アニメーション関数を呼び出し、終わったら効果を発動！
    window.animateCardPlay(card, true, () => {
        if (card.type === 'item' || card.type === 'action') { 
            card.isDead = true;
            p.graveyard.push(card);
            window.showBattleMessage(`✨ ${card.name} を使用！`); 
            window.triggerPlayEffect(card, true); 
        } else { 
            card.canAttack = false; p.field.push(card); 
            window.showBattleMessage(`🛡️ ${card.name} を配置！`); 
            window.triggerPlayEffect(card, true); 
        }
        if (window.TCG_BATTLE.cpu.hp <= 0) { setTimeout(() => { alert("🎉 YOU WIN!! 相手のHPを0にしました！"); document.getElementById('tcg-battle-ui').style.display = 'none'; }, 1000); }
    });
};

// ③ 進化時の処理を上書き（進化もアニメーションさせる）
window.selectPlayerCard = function(index) {
    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
    const targetCard = p.field[index];

    if (targetCard.status === "stunned") {
        window.showBattleMessage("🪨 化石化して動けない！", true); return;
    }

    if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
        const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
        const actualCost = window.getActualCost(p, evoCard);
        if (targetCard.type === evoCard.evolvesFrom) {
            // ★手札から消して描画
            p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
            window.renderBattleBoard();

            // ★進化カードのカットイン演出
            window.animateCardPlay(evoCard, true, () => {
                evoCard.canAttack = false; p.field[index] = evoCard;  
                window.showVFX(`p-card-${index}`, 'heal', '進化!'); 
                window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`);
                window.triggerPlayEffect(evoCard, true); 
            });
        } else {
            const evoName = window.getEvolvesFromName(evoCard.evolvesFrom);
            window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
        }
        return;
    }

    if (!targetCard.canAttack || targetCard.damage <= 0) {
        if (!targetCard.isDefending && targetCard.ability !== "taunt" && p.currentMana >= 1) {
            p.currentMana -= 1; targetCard.isDefending = true; 
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`); window.renderBattleBoard();
        } else if (targetCard.isDefending) { window.showBattleMessage(`このカードはすでに防御姿勢です。`); }
        return;
    }

    if (window.TCG_BATTLE.selectedAttackerIndex === index) {
        window.TCG_BATTLE.selectedAttackerIndex = -1;
    } else {
        window.TCG_BATTLE.selectedAttackerIndex = index;
        if (targetCard.status === "charmed") {
            window.TCG_BATTLE.selectedAttackerIndex = -1;
            targetCard.status = null; targetCard.canAttack = false;
            p.hp -= targetCard.damage;
            window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', targetCard.damage);
            window.showBattleMessage(`💕 魅了されていて、味方リーダーを攻撃してしまった！`, true, 2500);
            window.renderBattleBoard();
            setTimeout(() => {
                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); }
            }, 800);
            return;
        }
    }
    window.renderBattleBoard();
};

// ④ CPUのターン処理を完全上書き（順番にカードを出してアニメーションさせる）
window.executeCPUTurn = function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    const pField = window.TCG_BATTLE.player.field;
    pField.forEach(c => { if (c.isDefending) { c._tempOriginalAbility = c.ability; c.ability = "taunt"; } });

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    // ターン開始時効果
    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => card.canAttack = true);
    window.renderBattleBoard();

    // アニメーションのためのシーケンシャル処理
    setTimeout(() => {
        let delay = 0;
        
        // --- 攻撃フェーズ ---
        cpu.field.forEach((cpuCard, cpuIndex) => {
            if (!cpuCard.canAttack || cpuCard.damage <= 0) return;
            
            if (cpuCard.status === "charmed") {
                setTimeout(() => {
                    cpuCard.status = null; cpuCard.canAttack = false;
                    cpu.hp -= cpuCard.damage;
                    window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
                    window.renderBattleBoard();
                }, delay);
                delay += 800;
                return;
            }
            if (cpuCard.status === "stunned") return;

            setTimeout(() => {
                window.TCG_BATTLE.selectedAttackerIndex = cpuIndex;
                const tauntTargets = p.field.filter(c => c.ability === "taunt" || c.isDefending);
                const validTargets = p.field.filter(c => c.ability !== "stealth"); 
                let targetType = 'player'; let tIndex = 0;
                const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
                
                if (tauntTargets.length > 0 && !isPierce) {
                    targetType = 'card'; tIndex = p.field.indexOf(tauntTargets[Math.floor(Math.random() * tauntTargets.length)]);
                } else if (validTargets.length > 0 && Math.random() > 0.5) {
                    targetType = 'card'; tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
                }
                window.executeAttack(targetType, tIndex);
            }, delay);
            delay += 800;
        });

        // --- 召喚フェーズ ---
        setTimeout(() => {
            // ★CPUが出す予定のカードを先にリストアップ（マナも消費させておく）
            let cardsToPlay = [];
            for (let i = cpu.hand.length - 1; i >= 0; i--) {
                let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
                if (cpu.currentMana >= actualCost) {
                    if (card.type === 'action' && cpu.actionUsed) continue;
                    if (card.evolvesFrom) {
                        let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
                        if (targetIndex !== -1) {
                            cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: true, targetIndex: targetIndex });
                            cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                        }
                    } else {
                        cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: false });
                        cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                        if (card.type === 'action') cpu.actionUsed = true;
                    }
                }
            }

            // 手札が減った状態を先に描画
            if (cardsToPlay.length > 0) window.renderBattleBoard(); 

            // ★抽出したカードを「順番にカットインアニメーションさせながら」発動する
            const playNextCard = (idx) => {
                if (idx >= cardsToPlay.length) {
                    finishCPUTurn(); // すべて終わったらターン終了
                    return;
                }
                
                let playData = cardsToPlay[idx];
                let card = playData.card;
                
                window.animateCardPlay(card, false, () => {
                    if (playData.isEvo) {
                        card.canAttack = false; cpu.field[playData.targetIndex] = card; 
                        window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else {
                        if (card.type === 'item' || card.type === 'action') { 
                            card.isDead = true; cpu.graveyard.push(card);
                            window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                            window.triggerPlayEffect(card, false); 
                        } else { 
                            card.canAttack = false; cpu.field.push(card); 
                            window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                            window.triggerPlayEffect(card, false); 
                        }
                    }
                    // 効果の演出を待ってから次のカードへ
                    setTimeout(() => { playNextCard(idx + 1); }, 1000); 
                });
            };
            
            playNextCard(0); // ループ開始

            // --- ターン終了処理 ---
            function finishCPUTurn() {
                cpu.field.forEach((c, i) => {
                    if (c.isDead) return;
                    c.status = null; 
                    if (c.ability === "burn_field" || c.ability === "cataclysm") {
                        let dmg = c.ability === "cataclysm" ? 20 : 10;
                        p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
                    }
                    if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
                    if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
                    if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
                    if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
                    if (c.ability === "event_horizon") {
                        const aliveEnemies = p.field.filter(e => !e.isDead);
                        if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
                    }
                    if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
                        let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
                        cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
                    }
                });
                p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

                window.startPlayerTurn(false);
            }

        }, delay + 500);
    }, 800); 
};

// ==========================================
// ★ 演出テンポ改善 ＆ 手札虫眼鏡 パッチ
// ==========================================

// ① ポップアップメッセージの被り防止（位置の動的調整）
window.showBattleMessage = function(text, isError = false, duration = 2000, isEnemyLog = false, silent = false) {
    if (window.TCG_BATTLE && window.TCG_BATTLE.battleLog) {
        window.TCG_BATTLE.battleLog.push({ text: text.replace(/\n/g, " "), isError: isError, isEnemy: isEnemyLog });
    }
    
    if (!silent) {
        const ui = document.getElementById('tcg-battle-ui');
        if (!ui) return;
        
        // 既存のメッセージ要素を取得してY座標をズラす（重なり防止）
        const existingMsgs = document.querySelectorAll('.battle-msg');
        let topPos = 35 + (existingMsgs.length * 12);
        if (topPos > 70) topPos = 35; // 下にはみ出さないようループさせる
        
        const msg = document.createElement('div');
        msg.className = 'battle-msg';
        msg.innerHTML = text;
        msg.style.cssText = `
            position: absolute; top: ${topPos}%; left: 50%; transform: translate(-50%, -50%);
            background: ${isError ? 'rgba(220, 20, 20, 0.95)' : 'rgba(20, 120, 255, 0.95)'};
            color: #fff; padding: 12px 30px; border-radius: 12px; border: 2px solid #fff;
            font-size: 20px; font-weight: bold; pointer-events: none; z-index: 100000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.5); text-align: center; white-space: pre-wrap;
            animation: slideUpFade ${duration}ms forwards;
        `;
        ui.appendChild(msg);
        setTimeout(() => msg.remove(), duration);
    }
};

// ② 手札の虫眼鏡＆拡大表示の対応
window.showCardDetailModal = function(ownerType, index) {
    let card = null;
    if (ownerType === 'player') card = window.TCG_BATTLE.player.field[index];
    else if (ownerType === 'cpu') card = window.TCG_BATTLE.cpu.field[index];
    else if (ownerType === 'player_hand') card = window.TCG_BATTLE.player.hand[index];
    if (!card) return;

    let modal = document.getElementById('tcg-card-detail-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'tcg-card-detail-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 40000;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            cursor: pointer;
        `;
        modal.onclick = () => { modal.style.display = 'none'; };
        document.body.appendChild(modal);
    }
    
    let titleStr = ownerType === 'player_hand' ? '手札' : (ownerType === 'player' ? '味方' : '敵');
    
    modal.innerHTML = `
        <div style="margin-bottom: 30px; color: #00BCD4; font-size: 24px; font-weight: bold; text-shadow: 0 2px 4px #000;">
            🔍 ${titleStr}のカード詳細
        </div>
        <div style="transform: scale(1.8); box-shadow: 0 0 40px rgba(0, 188, 212, 0.6); border-radius: 12px; pointer-events: none;">
            ${window.renderCardHTML(card)}
        </div>
        <div style="margin-top: 100px; color: #aaa; font-size: 16px; background: rgba(0,0,0,0.5); padding: 10px 20px; border-radius: 20px;">
            画面のどこかをクリックして閉じる
        </div>
    `;
    modal.style.display = 'flex';
};

// 盤面描画関数にパッチ（手札に虫眼鏡を後付け追加）
const _originalRenderBattleBoard_forHand = window.renderBattleBoard;
window.renderBattleBoard = function() {
    _originalRenderBattleBoard_forHand();
    // 描画後に手札のHTMLをハックして虫眼鏡を追加する
    const handWraps = document.querySelectorAll('#tcg-battle-ui .tcg-card-wrap[onclick*="window.playCard"]');
    handWraps.forEach((wrap, index) => {
        if (!wrap.querySelector('.hand-magnifier')) {
            const mag = document.createElement('div');
            mag.className = 'hand-magnifier';
            mag.style.cssText = `position:absolute; top:-10px; right:-10px; background:#222; color:#00BCD4; border:2px solid #00BCD4; border-radius:50%; width:36px; height:36px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.8); z-index:20;`;
            mag.title = "詳細を見る";
            mag.innerHTML = "🔍";
            mag.onclick = function(e) {
                e.stopPropagation();
                window.showCardDetailModal('player_hand', index);
            };
            wrap.appendChild(mag);
        }
    });
};

// ③ カードプレイ・進化時のメッセージ表示タイミングの分離
// アニメーション開始時（1秒前）に「出した」宣言をして、アニメ完了時に「効果」を出すようにします。
window.playCard = function(handIndex) {
    const p = window.TCG_BATTLE.player; const card = p.hand[handIndex];
    const actualCost = window.getActualCost(p, card);
    
    if (p.currentMana < actualCost) { window.showBattleMessage(`マナが足りません！\n(必要: ${actualCost} / 現在: ${p.currentMana})`, true); return; }
    if (card.type === 'action' && p.actionUsed) { window.showBattleMessage("⚠️ アクションカードは1ターンに1回までしか使えません！", true); return; }
    
    if (card.evolvesFrom) {
        const canEvolve = p.field.some(c => window.checkCanEvolve(c, card)); // ★新しい判定に変更
        if (!canEvolve) {
            const evoName = window.getEvolvesFromName(card); // ★引数もカードそのものに変更
            window.showBattleMessage(`⚠️ 盤面に進化元の\n「${evoName}」がいません！`, true); return;
        }
        if (window.TCG_BATTLE.selectedHandCardIndex === handIndex) {
            window.TCG_BATTLE.selectedHandCardIndex = -1; 
        } else {
            window.TCG_BATTLE.selectedHandCardIndex = handIndex; window.TCG_BATTLE.selectedAttackerIndex = -1; 
            window.showBattleMessage("✨ 進化させるモンスターを選んでください！\n(もう一度押すとキャンセル)");
        }
        window.renderBattleBoard(); return;
    }

    p.currentMana -= actualCost; p.hand.splice(handIndex, 1);
    if (card.type === 'action') p.actionUsed = true;
    window.TCG_BATTLE.selectedHandCardIndex = -1; 
    window.renderBattleBoard(); 

    // ★ アニメーション開始前にプレイ宣言メッセージを出す
    let playMsg = (card.type === 'item' || card.type === 'action') ? `✨ ${card.name} を使用！` : `🛡️ ${card.name} を配置！`;
    window.showBattleMessage(playMsg, false, 1500, false, false);

    window.animateCardPlay(card, true, () => {
        // ★ アニメーション完了後に、効果を発動させる
        if (card.type === 'item' || card.type === 'action') { 
            card.isDead = true;
            p.graveyard.push(card);
            window.triggerPlayEffect(card, true); 
        } else { 
            card.canAttack = (card.ability === "haste"); p.field.push(card); 
            window.triggerPlayEffect(card, true); 
        }
        if (window.TCG_BATTLE.cpu.hp <= 0) { setTimeout(() => { alert("🎉 YOU WIN!! 相手のHPを0にしました！"); document.getElementById('tcg-battle-ui').style.display = 'none'; }, 1000); }
    });
};

window.selectPlayerCard = function(index) {
    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
    const targetCard = p.field[index];

    if (targetCard.status === "stunned") {
        window.showBattleMessage("🪨 化石化して動けない！", true); return;
    }

    if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
        const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
        const actualCost = window.getActualCost(p, evoCard);
        if (targetCard.type === evoCard.evolvesFrom) {
            p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
            window.renderBattleBoard();

            // ★ アニメーション開始前に進化宣言メッセージを出す
            window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`, false, 1500, false, false);

            window.animateCardPlay(evoCard, true, () => {
                // ★ アニメーション完了後に、進化効果を発動させる
                evoCard.canAttack = false; p.field[index] = evoCard;  
                window.showVFX(`p-card-${index}`, 'heal', '進化!'); 
                window.triggerPlayEffect(evoCard, true); 
            });
        } else {
            const evoName = window.getEvolvesFromName(evoCard.evolvesFrom);
            window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
        }
        return;
    }

    if (!targetCard.canAttack || targetCard.damage <= 0) {
        if (!targetCard.isDefending && targetCard.ability !== "taunt" && p.currentMana >= 1) {
            p.currentMana -= 1; targetCard.isDefending = true; 
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`); window.renderBattleBoard();
        } else if (targetCard.isDefending) { window.showBattleMessage(`このカードはすでに防御姿勢です。`); }
        return;
    }

    if (window.TCG_BATTLE.selectedAttackerIndex === index) {
        window.TCG_BATTLE.selectedAttackerIndex = -1;
    } else {
        window.TCG_BATTLE.selectedAttackerIndex = index;
        if (targetCard.status === "charmed") {
            window.TCG_BATTLE.selectedAttackerIndex = -1;
            targetCard.status = null; targetCard.canAttack = false;
            p.hp -= targetCard.damage;
            window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', targetCard.damage);
            window.showBattleMessage(`💕 魅了されていて、味方リーダーを攻撃してしまった！`, true, 2500);
            window.renderBattleBoard();
            setTimeout(() => {
                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); }
            }, 800);
            return;
        }
    }
    window.renderBattleBoard();
};

// ==========================================
// ★ ダイレクトアタック強化 ＆ 進化バッジ表示バグ修正パッチ
// ==========================================

// ① 進化バッジ（闇+など）が正しく表示されないバグの修正
window.getCardTypeName = function(type) {
    // ★修正：上位の進化から順に判定しないと、名前に内包されて誤判定されてしまう
    if (type.includes('type1_4')) return '闇+++';
    if (type.includes('type1_3')) return '闇++';
    if (type.includes('type1_2')) return '闇+';
    if (type.includes('type1')) return '闇';
    
    if (type.includes('type2_4')) return '美+++';
    if (type.includes('type2_3')) return '美++';
    if (type.includes('type2_2')) return '美+';
    if (type.includes('type2')) return '美';
    
    if (type.includes('type3_5')) return '賢++++';
    if (type.includes('type3_4')) return '賢+++';
    if (type.includes('type3_3')) return '賢++';
    if (type.includes('type3_2')) return '賢+';
    if (type.includes('type3')) return '賢';
    
    if (type.includes('type4_4')) return '活+++';
    if (type.includes('type4_3')) return '活++';
    if (type.includes('type4_2')) return '活+';
    if (type.includes('type4')) return '活';
    
    if (type.includes('type5_4')) return '老+++';
    if (type.includes('type5_3')) return '老++';
    if (type.includes('type5_2')) return '老+';
    if (type.includes('type5')) return '老';
    
    if (type === 'robot') return '機';
    
    const map = {
        'dragon':'竜', 'magician':'魔', 'spirit':'精', 'stone':'岩',
        'machine':'械', 'ghost':'霊', 'bird':'鳥', 'beetle':'虫',
        'seed':'草', 'balloon':'風', 'item':'具', 'action':'技', 'field':'地'
    };
    return map[type] || '無';
};

// ② ダイレクトアタックの超リッチなカットイン演出関数
window.showDirectAttackCutin = function(isPlayer, isPierce) {
    const ui = document.getElementById('tcg-battle-ui');
    if (!ui) return;
    
    const daText = document.createElement('div');
    const textStr = isPierce ? "PIERCING ATTACK!!" : "DIRECT ATTACK!!";
    const color = isPlayer ? "#4CAF50" : "#ff5252";
    const glow = isPlayer ? "#00E676" : "#ff0000";
    
    // 斜体、ドロップシャドウ、極太フォントでカードゲームらしさを全開に
    daText.innerHTML = `<div style="font-size: 70px; font-weight: 900; font-style: italic; color: ${color}; text-shadow: 0 0 30px ${glow}, 4px 4px 0px #fff, -2px -2px 0px #000; transform: skewX(-15deg); letter-spacing: 4px; white-space: nowrap;">${textStr}</div>`;
    daText.style.cssText = `position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; z-index: 45000; pointer-events: none; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);`;
    
    ui.appendChild(daText);
    
    // ログには残す（サイレントモード）
    window.showBattleMessage(`💥 ${isPierce ? '貫通' : 'ダイレクト'}アタック！！`, !isPlayer, 2000, !isPlayer, true);

    setTimeout(() => { 
        daText.style.transform = 'translate(-50%, -50%) scale(1.2)'; 
        daText.style.opacity = '1'; 
    }, 50);
    
    setTimeout(() => { 
        daText.style.transform = 'translate(-50%, -50%) scale(1.5)'; 
        daText.style.opacity = '0'; 
        setTimeout(() => daText.remove(), 300); 
    }, 1000);
};

// ==========================================
// ★ 進化バッジ修正 ＆ 攻撃演出の完全修復パッチ
// ==========================================

// ① 進化バッジの誤表示を修正（上位進化から判定する）
window.getCardTypeName = function(type) {
    if (type.includes('type1_4')) return '闇+++';
    if (type.includes('type1_3')) return '闇++';
    if (type.includes('type1_2')) return '闇+';
    if (type.includes('type1')) return '闇';
    
    if (type.includes('type2_4')) return '美+++';
    if (type.includes('type2_3')) return '美++';
    if (type.includes('type2_2')) return '美+';
    if (type.includes('type2')) return '美';
    
    if (type.includes('type3_5')) return '賢++++';
    if (type.includes('type3_4')) return '賢+++';
    if (type.includes('type3_3')) return '賢++';
    if (type.includes('type3_2')) return '賢+';
    if (type.includes('type3')) return '賢';
    
    if (type.includes('type4_4')) return '活+++';
    if (type.includes('type4_3')) return '活++';
    if (type.includes('type4_2')) return '活+';
    if (type.includes('type4')) return '活';
    
    if (type.includes('type5_4')) return '老+++';
    if (type.includes('type5_3')) return '老++';
    if (type.includes('type5_2')) return '老+';
    if (type.includes('type5')) return '老';
    
    if (type === 'robot') return '機';
    
    const map = {
        'dragon':'竜', 'magician':'魔', 'spirit':'精', 'stone':'岩',
        'machine':'械', 'ghost':'霊', 'bird':'鳥', 'beetle':'虫',
        'seed':'草', 'balloon':'風', 'item':'具', 'action':'技', 'field':'地'
    };
    return map[type] || '無';
};

// ② ダイレクトアタックのカットイン演出関数（安全設計）
window.showDirectAttackCutin = function(isPlayer, isPierce) {
    try {
        const ui = document.getElementById('tcg-battle-ui');
        if (!ui) return;
        
        const daText = document.createElement('div');
        const textStr = isPierce ? "PIERCING ATTACK!!" : "DIRECT ATTACK!!";
        const color = isPlayer ? "#4CAF50" : "#ff5252";
        const glow = isPlayer ? "#00E676" : "#ff0000";
        
        daText.innerHTML = `<div style="font-size: 70px; font-weight: 900; font-style: italic; color: ${color}; text-shadow: 0 0 30px ${glow}, 4px 4px 0px #fff, -2px -2px 0px #000; transform: skewX(-15deg); letter-spacing: 4px; white-space: nowrap;">${textStr}</div>`;
        daText.style.cssText = `position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; z-index: 45000; pointer-events: none; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);`;
        
        ui.appendChild(daText);
        
        // ログには残す（サイレントモード）
        window.showBattleMessage(`💥 ${isPierce ? '貫通' : 'ダイレクト'}アタック！！`, !isPlayer, 2000, !isPlayer, true);

        setTimeout(() => { 
            daText.style.transform = 'translate(-50%, -50%) scale(1.2)'; 
            daText.style.opacity = '1'; 
        }, 50);
        
        setTimeout(() => { 
            daText.style.transform = 'translate(-50%, -50%) scale(1.5)'; 
            daText.style.opacity = '0'; 
            setTimeout(() => daText.remove(), 300); 
        }, 1000);
    } catch (e) { console.error("Cutin Error:", e); }
};

// ==========================================
// ★ 進化バッジ色分け ＆ コイントス復活 パッチ
// ==========================================

// ① コイントスのアニメーションCSSを復活
if (!document.getElementById('tcg-cointoss-styles')) {
    const style = document.createElement('style');
    style.id = 'tcg-cointoss-styles';
    style.innerHTML = `
        @keyframes coinFlip {
            0% { transform: rotateY(0deg) scale(1); }
            50% { transform: rotateY(900deg) scale(1.5); }
            100% { transform: rotateY(1800deg) scale(1); }
        }
        .coin-flip-anim { animation: coinFlip 2.5s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
    `;
    document.head.appendChild(style);
}

// ② 進化元をマスターデータから正確に判定して、名前を表示する
window.getEvolvesFromName = function(evolvesFromType) {
    const parentKey = Object.keys(window.TCG_MASTER).find(k => window.TCG_MASTER[k].type === evolvesFromType);
    if (parentKey) return window.TCG_MASTER[parentKey].name;
    return evolvesFromType; // 見つからなかった場合の保険
};

// ③ 賢いバッジ生成ロジック（+判定の正確化と、種族・属性ごとの色分け）
window.getCardBadgeInfo = function(card) {
    let text = '無'; let color = '#FFF';

    // 1. サポートカード
    if (card.type === 'item') return { text: '具', color: '#8D6E63' };
    if (card.type === 'action') return { text: '技', color: '#FFB74D' };
    if (card.type === 'field') return { text: '地', color: '#4DB6AC' };

    // 2. 進化の段階を判定
    let isStage1 = false; let isStage2 = false;
    if (card.evolvesFrom) {
        const parentKey = Object.keys(window.TCG_MASTER).find(k => window.TCG_MASTER[k].type === card.evolvesFrom);
        const parent = parentKey ? window.TCG_MASTER[parentKey] : null;
        if (parent && parent.evolvesFrom) isStage2 = true;
        else isStage1 = true;
    }

    // 3. 属性（進化先）の判定
    let attr = '';
    if (card.type.includes('type1')) { attr = '闇'; color = '#9C27B0'; }
    else if (card.type.includes('type2')) { attr = '美'; color = '#E91E63'; }
    else if (card.type.includes('type3')) { attr = '賢'; color = '#2196F3'; }
    else if (card.type.includes('type4')) { attr = '活'; color = '#FF5722'; }
    else if (card.type.includes('type5')) { attr = '老'; color = '#795548'; }

    if (attr) {
        if (isStage2) return { text: attr + '+', color: color };
        if (isStage1) return { text: attr, color: color };
        return { text: attr, color: color }; 
    }

    // 4. 基本種族
    const raceMap = {
        'dragon': { t: '竜', c: '#FFC107' }, 'magician': { t: '魔', c: '#9C27B0' },
        'spirit': { t: '精', c: '#4CAF50' }, 'stone': { t: '岩', c: '#795548' },
        'machine': { t: '械', c: '#607D8B' }, 'ghost': { t: '霊', c: '#673AB7' },
        'bird': { t: '鳥', c: '#03A9F4' }, 'beetle': { t: '虫', c: '#8BC34A' },
        'seed': { t: '草', c: '#8BC34A' }, 'balloon': { t: '風', c: '#00BCD4' },
        'robot': { t: '機', c: '#9E9E9E' }
    };
    if (raceMap[card.type]) return { text: raceMap[card.type].t, color: raceMap[card.type].c };

    return { text: '無', color: '#999' };
};

// ④ UI描画の完全上書き（新しいカラフルなバッジを適用）
window.renderCardHTML = function(card) {
    if (typeof window.TCG_MASTER !== 'undefined') {
        let masterData = null;
        if (card.masterId && window.TCG_MASTER[card.masterId]) {
            masterData = window.TCG_MASTER[card.masterId];
        }
        if (!masterData || masterData.sx === undefined) {
            const safeName = (card.name || "").trim();
            const adjustedKey = Object.keys(window.TCG_MASTER).find(k => {
                const target = window.TCG_MASTER[k];
                return target && target.name && target.name.trim() === safeName && target.sx !== undefined;
            });
            if (adjustedKey) {
                masterData = window.TCG_MASTER[adjustedKey]; 
            } else {
                const fallbackKey = Object.keys(window.TCG_MASTER).find(k => {
                    const target = window.TCG_MASTER[k];
                    return target && target.name && target.name.trim() === safeName;
                });
                if (fallbackKey) masterData = window.TCG_MASTER[fallbackKey];
            }
        }
        if (masterData) {
            if (masterData.sx !== undefined) card.sx = masterData.sx;
            if (masterData.sy !== undefined) card.sy = masterData.sy;
            if (masterData.sw !== undefined) card.sw = masterData.sw;
            if (masterData.sh !== undefined) card.sh = masterData.sh;
            if (masterData.scaleX !== undefined) card.scaleX = masterData.scaleX;
            if (masterData.scaleY !== undefined) card.scaleY = masterData.scaleY;
            if (masterData.image) card.image = masterData.image; 
        }
    }

    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;

    let abilityText = card.abilityTextOverride || "";
    if (!abilityText) {
        const texts = {
            "taunt": "【かばう】(相手の攻撃を代わりに受ける)", "stealth": "【潜伏】(攻撃するまでターゲットにされない)",
            "heal_self": "【修復】(自分のHPを小回復する)", "draw_card": "【ドロー】(山札からカードを引く)",
            "flight": "【飛行】(かばうを無視して攻撃できる)", "mana_ramp": "【成長】(自分の最大マナを+1する)",
            "pierce_recoil": "【暴走回路】(かばう無視・攻撃時自身にダメ)", "aoe_heal_play": "【全体回復】(登場時、味方全員を回復)",
            "start_draw": "【超演算】(自ターン開始時、1枚ドロー)", "aura_action_cost": "【万能魔法】(場にいる間、アクションコスト-1)",
            "heavy_armor": "【重装甲】(受けるダメージを常に-10)", "snipe_play": "【殲滅】(登場時、ランダムな敵にダメージ)",
            "end_heal": "【悠久の風化】(ターン終了時、自身のHP回復)", "god_strike": "【神の一撃】(貫通・攻撃時敵1体即死)",
            "cyber_miracle": "【電脳の奇跡】(ターン終了時、味方全回復)", "dimension_hack": "【超次元ハック】(登場時、敵手札破壊＆ドロー)",
            "all_zero_cost": "【森羅万象】(場にいる間、アクションのコスト0)", "absolute_field": "【絶対領域】(受けるあらゆるダメージを1にする)",
            "crimson_end": "【終末の紅蓮】(登場時、敵全体に50ダメ)", "star_breath": "【星の息吹】(ターン開始時マナ+2＆リーダー回復)",
            "perfect_predation": "【完全捕食】(登場時、敵1体を破壊し吸収)", "nightmare_rule": "【悪夢の君臨】(登場時、全敵のHPを強制半減)",
            "star_hope": "【希望の星】(登場時、味方全回復＆かばう付与)", "divine_grace": "【神の恩寵】(ターン終了時、破壊された味方蘇生)",
            "heaven_punishment": "【天罰】(登場時、全敵モンスターに50ダメージ)", "event_horizon": "【事象の地平】(ターン終了時、敵1体を山札に戻す)",
            "truth_overwrite": "【真理の書換】(登場時、3枚ドロー＆最大マナ+3)", "heaven_judgement": "【天の裁き】(ターン開始時、敵全体に20ダメ)",
            "absolute_fortress": "【絶対要塞】(受けるダメージを常に-20する)", "dimension_drill": "【次元穿孔】(貫通・リーダーにも同じダメを与える)",
            "super_gravity": "【超重力】(登場時、自身以外の全モンスターに100ダメ)", "eternal_rebirth": "【悠久の再生】(破壊された時、一度だけHP満タンで復活)",
            "burn_field": "【焦土化】(ターン終了時、敵全体に少ダメージ)", "cataclysm": "【天変地異】(ターン終了時、敵全体に貫通大ダメージ)",
            "spell_echo": "【魔法反響】(登場・スキル使用時、ダメージ増幅)", "mana_refund": "【魔力還元】(登場・スキル使用時、マナが回復)",
            "charm_enemy": "【魅惑】(登場時、敵1体を確率で「魅了」する)", "mass_charm": "【全体魅了】(登場時、敵全体を確率で「魅了」する)",
            "curse_death": "【道連れ】(破壊された時、敵リーダーに大ダメージ)", "soul_drain": "【魂吸収】(攻撃で与えたダメージの半分を回復)",
            "soul_reap": "【魂刈り】(攻撃時、相手の最大HPも減少させる)", "thorns": "【茨の鎧】(攻撃を受けた時、相手にも反射ダメージ)",
            "void_counter": "【虚無】(一度だけダメージを無効化し倍返しする)", "devour": "【捕食】(敵を倒した時、自身のHPと攻撃力UP)",
            "apex_predator": "【頂点捕食】(敵を倒した時、ステータスが倍増する)", "burst_spores": "【破裂胞子】(破壊された時、味方全体を回復＆強化)",
            "absolute_sanctuary": "【絶対聖域】(ターン終了時、味方全体を回復する)", "mana_sovereign": "【魔力の支配者】(場にいる間、味方の全コスト半減)",
            "impregnable_armor": "【難攻不落】(30以下のダメージを完全に無効化する)", "pure_aegis": "【純真の盾】(かばう＋あらゆる状態異常を無効化)",
            "infinite_gear": "【無限歯車】(ターン開始時、手札が5枚になるようドロー)", "doomsday_detonation": "【終末起爆】(登場時、盤面全てを消し飛ばす)",
            "rebirth": "【輪廻転生】(破壊された時、一度だけ復活し敵を焼く)", "absolute_evasion": "【絶対回避】(敵からの攻撃を高い確率で無効化する)",
            "piercing_juggernaut": "【暴走貫通】(攻撃するたび火力が上がり、かばう無視)", "fossilize": "【化石化】(登場時、敵1体を確率で「スタン」させる)",
            "mass_bounce": "【全バウンス】(破壊された時、全敵を山札に戻す)", "nova_burst": "【超新星爆発】(破壊された時、敵全体に最大HP分ダメ)",
            "time_manipulation": "【時空操作】(登場時、行動済みの味方を未行動にする)", "raise_dead": "【死霊復活】(ターン終了時、破壊された味方を半分の力で蘇生)"
        };
        abilityText = texts[card.ability] || "";
    }

    let imgPath = card.image;
    if (!imgPath || imgPath === 'characters.png') {
        imgPath = null;
    } else if (typeof imageSources !== 'undefined' && imageSources[imgPath]) {
        imgPath = imageSources[imgPath]; 
    }

    const flavorText = (card.type === 'item' || card.type === 'action' || card.type === 'field')
        ? "冒険の途中で見つけた、かけがえのない記憶の欠片。" 
        : "AIがこれまでの人生で培ってきた、確かな成長の証。";

    let displayCost = card.cost;
    if (window.TCG_BATTLE && window.TCG_BATTLE.player) {
        let owner = window.TCG_BATTLE.player.hand.includes(card) ? window.TCG_BATTLE.player : null;
        if (!owner && window.TCG_BATTLE.cpu.hand.includes(card)) owner = window.TCG_BATTLE.cpu;
        if (owner) displayCost = window.getActualCost(owner, card);
    }
    const costColor = displayCost < card.cost ? "#4CAF50" : "#FFD700";
    
    // ★新しいバッジ生成システム！
    const badge = window.getCardBadgeInfo(card);

    let html = `<div class="tcg-card" style="width: 180px; height: 260px; background-color: #222; border: 4px solid #555; border-radius: 12px; position: relative; font-family: sans-serif; color: white; box-shadow: 0 4px 8px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; user-select: none;">`;

    if (card.status === 'stunned' && !card.isDead) {
        html += `<div style="position:absolute; top:35%; left:5%; background:#795548; color:white; padding:5px 15px; border-radius:6px; font-weight:bold; font-size:22px; transform:rotate(-15deg); z-index:15; border: 2px solid #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">🪨 化石化</div>`;
    }
    if (card.status === 'charmed' && !card.isDead) {
        html += `<div style="position:absolute; top:35%; left:15%; background:#E91E63; color:white; padding:5px 15px; border-radius:6px; font-weight:bold; font-size:22px; transform:rotate(15deg); z-index:15; border: 2px solid #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">💕 魅了</div>`;
    }

    if (isUnlocked) {
        html += `<div style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; background: ${costColor}; color: #000; border-radius: 50%; font-weight: bold; font-size: 18px; display: flex; justify-content: center; align-items: center; border: 2px solid #FFF; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.5);">${displayCost}</div>`;
    }

    if (card.sx !== undefined) {
        const scX = card.scaleX !== undefined ? card.scaleX : 1.0;
        const scY = card.scaleY !== undefined ? card.scaleY : 1.0;
        const sw = card.sw || 50; const sh = card.sh || 50;
        const sx = card.sx || 0; const sy = card.sy || 0;
        let imgStyle = imgPath 
            ? `background-image: url('${imgPath}'); background-position: ${-sx}px ${-sy}px; background-repeat: no-repeat;`
            : `background: linear-gradient(135deg, #444, #111);`; 
        html += `
        <div style="width: 100%; height: 120px; background-color: #1a1a1a; overflow: hidden; display: flex; justify-content: center; align-items: center; position: relative; border-bottom: 3px solid #444;">
            <div style="width: ${sw}px; height: ${sh}px; ${imgStyle} transform: scale(${scX}, ${scY}); transform-origin: center center; flex-shrink: 0;">
                ${!imgPath ? '<div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:#666; font-size:12px; font-weight:bold;">NO IMAGE</div>' : ''}
            </div>
        </div>`;
    } else {
        const col = (card.imageIndex || 0) % 3; const row = Math.floor((card.imageIndex || 0) / 3);
        const finalPosX = (col * 50) + (card.offsetX || 0); const finalPosY = (row * 25) + (card.offsetY || 0); 
        const zoomX = card.zoomX || 300; const zoomY = card.zoomY || 510;
        let imgStyle = imgPath
            ? `background-image: url('${imgPath}'); background-size: ${zoomX}% ${zoomY}%; background-position: ${finalPosX}% ${finalPosY}%; background-repeat: no-repeat;`
            : `background: linear-gradient(135deg, #444, #111); display:flex; justify-content:center; align-items:center; color:#666; font-size:12px; font-weight:bold;`;
        html += `<div style="width: 100%; height: 120px; ${imgStyle} border-bottom: 3px solid #444;">${!imgPath ? 'NO IMAGE' : ''}</div>`;
    }

    // ★ バッジのカラーを動的に反映！
    html += `
        <div style="padding: 4px 8px; font-weight: bold; font-size: 14px; background: linear-gradient(to right, #444, #222); border-bottom: 2px solid #111; text-shadow: 1px 1px 2px #000; display: flex; justify-content: space-between; align-items: center;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;">${card.name}</span>
            ${isUnlocked ? `<span style="font-size: 11px; background: rgba(0,0,0,0.6); color: ${badge.color}; padding: 2px 5px; border-radius: 4px; border: 1px solid ${badge.color}; margin-left: 4px; white-space: nowrap;">${badge.text}</span>` : ''}
        </div>`;

    if (isUnlocked) {
        html += `
        <div style="flex: 1; padding: 6px; padding-bottom: 30px; font-size: 11px; color: #ddd; background: #2a2a2a; display: flex; flex-direction: column; gap: 4px;">
            ${abilityText ? `<div style="color: #FF9800; font-weight: bold; font-size: 10px;">${abilityText}</div>` : ''}
            <div style="margin-top: auto; padding-top: 4px; border-top: 1px solid #444;">
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="display:flex; flex-direction:column; gap:3px;">
                        <span style="display:inline-block; background:#00BCD4; color:#fff; border-radius:4px; padding:2px 4px; font-size:10px; width:fit-content;">コスト ${card.skillCost}</span>
                        <span style="font-weight:bold; font-size:12px; color:#fff;">${card.skillName}</span>
                    </div>
                    ${card.damage > 0 ? `<div style="color:#ff5252; font-weight:bold; font-size:13px; white-space:nowrap;">${card.damage} ダメージ</div>` : ''}
                </div>
            </div>
        </div>
        <div style="position: absolute; bottom: -4px; right: -4px; background: #4CAF50; color: white; padding: 4px 12px; border-radius: 8px 0 0 0; font-weight: bold; font-size: 16px; border: 2px solid #333; border-right: none; border-bottom: none; box-shadow: -2px -2px 4px rgba(0,0,0,0.3); z-index: 2;">HP ${card.hp}</div>`;
    } else {
        html += `<div style="flex: 1; padding: 15px 10px; font-size: 12px; line-height: 1.6; color: #bbb; background: #2a2a2a; text-align: center; display: flex; align-items: center; justify-content: center;"><span style="font-style: italic;">「${flavorText}」</span></div>`;
    }
    html += `</div>`;
    return html;
};

// ==========================================
// ★ 進化バッジ複数表示（種族＋進化系）対応 ＆ 演出強化パッチ
// ==========================================

// ① コイントスのアニメーションCSSを復活
if (!document.getElementById('tcg-cointoss-styles')) {
    const style = document.createElement('style');
    style.id = 'tcg-cointoss-styles';
    style.innerHTML = `
        @keyframes coinFlip {
            0% { transform: rotateY(0deg) scale(1); }
            50% { transform: rotateY(900deg) scale(1.5); }
            100% { transform: rotateY(1800deg) scale(1); }
        }
        .coin-flip-anim { animation: coinFlip 2.5s cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
    `;
    document.head.appendChild(style);
}

// ② 賢いバッジ生成ロジック（配列で複数バッジを返すように変更）
window.getCardBadgeInfo = function(card) {
    let badges = [];

    // 1. サポートカード
    if (card.type === 'item') { badges.push({ text: '具', color: '#8D6E63' }); return badges; }
    if (card.type === 'action') { badges.push({ text: '技', color: '#FFB74D' }); return badges; }
    if (card.type === 'field') { badges.push({ text: '地', color: '#4DB6AC' }); return badges; }

    // 2. 基本種族の判定
    const raceMap = {
        'dragon': { t: '竜', c: '#FFC107' }, 'magician': { t: '魔', c: '#9C27B0' },
        'spirit': { t: '精', c: '#4CAF50' }, 'stone': { t: '岩', c: '#795548' },
        'machine': { t: '械', c: '#607D8B' }, 'ghost': { t: '霊', c: '#673AB7' },
        'bird': { t: '鳥', c: '#03A9F4' }, 'beetle': { t: '虫', c: '#8BC34A' },
        'seed': { t: '草', c: '#8BC34A' }, 'balloon': { t: '風', c: '#00BCD4' },
        'robot': { t: '機', c: '#9E9E9E' }
    };

    let baseType = card.type.split('_')[0]; // "beetle_type4_2" から "beetle" を抽出
    if (raceMap[baseType]) {
        badges.push({ text: raceMap[baseType].t, color: raceMap[baseType].c });
    }

    // 3. 進化の段階を判定
    let evoText = ''; let evoColor = '';
    if (card.type.includes('type1')) { evoText = '闇'; evoColor = '#9C27B0'; }
    else if (card.type.includes('type2')) { evoText = '美'; evoColor = '#E91E63'; }
    else if (card.type.includes('type3')) { evoText = '賢'; evoColor = '#2196F3'; }
    else if (card.type.includes('type4')) { evoText = '活'; evoColor = '#FF5722'; }
    else if (card.type.includes('type5')) { evoText = '老'; evoColor = '#795548'; }

    if (evoText) {
        if (card.type.includes('_4')) evoText += '+++';
        else if (card.type.includes('_3')) evoText += '++';
        else if (card.type.includes('_2')) evoText += '+';
        badges.push({ text: evoText, color: evoColor });
    }

    if (badges.length === 0) badges.push({ text: '無', color: '#999' });

    return badges;
};

// ③ UI描画の完全上書き（複数バッジを描画）
window.renderCardHTML = function(card) {
    if (typeof window.TCG_MASTER !== 'undefined') {
        let masterData = null;
        if (card.masterId && window.TCG_MASTER[card.masterId]) {
            masterData = window.TCG_MASTER[card.masterId];
        }
        if (!masterData || masterData.sx === undefined) {
            const safeName = (card.name || "").trim();
            const adjustedKey = Object.keys(window.TCG_MASTER).find(k => {
                const target = window.TCG_MASTER[k];
                return target && target.name && target.name.trim() === safeName && target.sx !== undefined;
            });
            if (adjustedKey) {
                masterData = window.TCG_MASTER[adjustedKey]; 
            } else {
                const fallbackKey = Object.keys(window.TCG_MASTER).find(k => {
                    const target = window.TCG_MASTER[k];
                    return target && target.name && target.name.trim() === safeName;
                });
                if (fallbackKey) masterData = window.TCG_MASTER[fallbackKey];
            }
        }
        if (masterData) {
            if (masterData.sx !== undefined) card.sx = masterData.sx;
            if (masterData.sy !== undefined) card.sy = masterData.sy;
            if (masterData.sw !== undefined) card.sw = masterData.sw;
            if (masterData.sh !== undefined) card.sh = masterData.sh;
            if (masterData.scaleX !== undefined) card.scaleX = masterData.scaleX;
            if (masterData.scaleY !== undefined) card.scaleY = masterData.scaleY;
            if (masterData.image) card.image = masterData.image; 
        }
    }

    const isUnlocked = window.TCG && window.TCG.myCollection && window.TCG.myCollection.length >= 60;

    let abilityText = card.abilityTextOverride || "";
    if (!abilityText) {
        const texts = {
            "taunt": "【かばう】(相手の攻撃を代わりに受ける)", "stealth": "【潜伏】(攻撃するまでターゲットにされない)",
            "heal_self": "【修復】(自分のHPを小回復する)", "draw_card": "【ドロー】(山札からカードを引く)",
            "flight": "【飛行】(かばうを無視して攻撃できる)", "mana_ramp": "【成長】(自分の最大マナを+1する)",
            "haste": "【速攻】(場に出たターンにすぐ攻撃できる)",
            "trample": "【貫通】(敵を倒した時、超過ダメージをリーダーに与える)",
            "death_bomb": "【誘爆】(破壊された時、相手リーダーに20ダメージ)",
            "burst_damage": "【破裂】(ダメージを受けた時、攻撃者に20ダメージを返す)",
            "debuff_attack": "【弱体化】(攻撃した相手の攻撃力を強制的に半分にする)",
            "venom_strike": "【猛毒】(ダメージを与えた敵モンスターを即死させる)",
            "discard_hand": "【忘却】(場に出た時、相手の手札をランダムに1枚破壊する)",
            "haunt": "【霊障】(ターン終了時、敵リーダーに20ダメージを与える)",
            "counter_attack": "【迎撃】(攻撃を受けた時、自身の攻撃力分のダメージを相手に返す)",
            "heavy_strike": "【重撃】(ダメージを与えた敵モンスターを「化石化(スタン)」させる)",
            "double_strike": "【連撃】(1ターンに2回攻撃できる)",
            "evasion": "【見切り】(敵からの攻撃を50%の確率で回避して無効化する)",
            "splash_damage": "【範囲魔法】(攻撃時、対象以外の全ての敵に10ダメージを与える)",
            "silence": "【沈黙】(ダメージを与えた相手の能力を無効化する)",
            "wind_blessing": "【風の加護】(場に出た時、自分以外の味方全員の攻撃力を+10する)",
            "regeneration": "【自然治癒】(ターン終了時、自身のHPを全回復する)",
            "self_destruct": "【自爆】(破壊された時、相手のリーダーに30ダメージを与える)",
            "roar": "【咆哮】(場に出た時、敵モンスター全体に20ダメージを与える)",
            "wrath": "【逆鱗】(ダメージを受けた時、自身の攻撃力が+20される)",
            "life_drain": "【吸収】(ダメージを与えた時、その分リーダーのHPを回復する)",
            "pierce_recoil": "【暴走回路】(かばう無視・攻撃時自身にダメ)", "aoe_heal_play": "【全体回復】(登場時、味方全員を回復)",
            "start_draw": "【超演算】(自ターン開始時、1枚ドロー)", "aura_action_cost": "【万能魔法】(場にいる間、アクションコスト-1)",
            "heavy_armor": "【重装甲】(攻撃される時、受けるダメージを常に20軽減する)", "snipe_play": "【殲滅】(登場時、ランダムな敵にダメージ)",
            "end_heal": "【悠久の風化】(ターン終了時、自身のHP回復)", "god_strike": "【神の一撃】(貫通・攻撃時敵1体即死)",
            "cyber_miracle": "【電脳の奇跡】(ターン終了時、味方全回復)", "dimension_hack": "【超次元ハック】(登場時、敵手札破壊＆ドロー)",
            "all_zero_cost": "【森羅万象】(場にいる間、アクションのコスト0)", "absolute_field": "【絶対領域】(受けるあらゆるダメージを1にする)",
            "crimson_end": "【終末の紅蓮】(登場時、敵全体に50ダメ)", "star_breath": "【星の息吹】(ターン開始時マナ+2＆リーダー回復)",
            "perfect_predation": "【完全捕食】(登場時、敵1体を破壊し吸収)", "nightmare_rule": "【悪夢の君臨】(登場時、全敵のHPを強制半減)",
            "star_hope": "【希望の星】(登場時、味方全回復＆かばう付与)", "divine_grace": "【神の恩寵】(ターン終了時、破壊された味方蘇生)",
            "heaven_punishment": "【天罰】(登場時、全敵モンスターに50ダメージ)", "event_horizon": "【事象の地平】(ターン終了時、敵1体を山札に戻す)",
            "truth_overwrite": "【真理の書換】(登場時、3枚ドロー＆最大マナ+3)", "heaven_judgement": "【天の裁き】(ターン開始時、敵全体に20ダメ)",
            "absolute_fortress": "【絶対要塞】(受けるダメージを常に-20する)", "dimension_drill": "【次元穿孔】(貫通・リーダーにも同じダメを与える)",
            "super_gravity": "【超重力】(登場時、自身以外の全モンスターに100ダメ)", "eternal_rebirth": "【悠久の再生】(破壊された時、一度だけHP満タンで復活)",
            "burn_field": "【焦土化】(ターン終了時、敵全体に少ダメージ)", "cataclysm": "【天変地異】(ターン終了時、敵全体に貫通大ダメージ)",
            "spell_echo": "【魔法反響】(登場・スキル使用時、ダメージ増幅)", "mana_refund": "【魔力還元】(登場・スキル使用時、マナが回復)",
            "charm_enemy": "【魅惑】(登場時、敵1体を確率で「魅了」する)", "mass_charm": "【全体魅了】(登場時、敵全体を確率で「魅了」する)",
            "curse_death": "【道連れ】(破壊された時、敵リーダーに大ダメージ)", "soul_drain": "【魂吸収】(攻撃で与えたダメージの半分を回復)",
            "soul_reap": "【魂刈り】(攻撃時、相手の最大HPも減少させる)", "thorns": "【茨の鎧】(攻撃を受けた時、相手にも反射ダメージ)",
            "void_counter": "【虚無】(一度だけダメージを無効化し倍返しする)", "devour": "【捕食】(敵を倒した時、自身のHPと攻撃力UP)",
            "apex_predator": "【頂点捕食】(敵を倒した時、ステータスが倍増する)", "burst_spores": "【破裂胞子】(破壊された時、味方全体を回復＆強化)",
            "absolute_sanctuary": "【絶対聖域】(ターン終了時、味方全体を回復する)", "mana_sovereign": "【魔力の支配者】(場にいる間、味方の全コスト半減)",
            "impregnable_armor": "【難攻不落】(30以下のダメージを完全に無効化する)", "pure_aegis": "【純真の盾】(かばう＋あらゆる状態異常を無効化)",
            "infinite_gear": "【無限歯車】(ターン開始時、手札が5枚になるようドロー)", "doomsday_detonation": "【終末起爆】(登場時、盤面全てを消し飛ばす)",
            "rebirth": "【輪廻転生】(破壊された時、一度だけ復活し敵を焼く)", "absolute_evasion": "【絶対回避】(敵からの攻撃を高い確率で無効化する)",
            "piercing_juggernaut": "【暴走貫通】(攻撃するたび火力が上がり、かばう無視)", "fossilize": "【化石化】(登場時、敵1体を確率で「スタン」させる)",
            "mass_bounce": "【全バウンス】(破壊された時、全敵を山札に戻す)", "nova_burst": "【超新星爆発】(破壊された時、敵全体に最大HP分ダメ)",
            "time_manipulation": "【時空操作】(登場時、行動済みの味方を未行動にする)", "raise_dead": "【死霊復活】(ターン終了時、破壊された味方を半分の力で蘇生)",
            // フィールド
            "field_forest": "【森の加護】(場にある間、自然系[精霊/草/虫]が出た時に最大HP+20)",
            "field_castle": "【鉄壁の陣】(場にある間、全プレイヤーの[守護化]コストが0になる)",
            "field_casino": "【ギャンブル】(ターン開始時、50%で1ドロー、50%でリーダーに10ダメ)",
            "field_miasma": "【瘴気】(ターン終了時、お互いのリーダーと全モンスターに10ダメ)",
            "field_mana": "【マナ活性】(お互いの最大マナが常に+2される)",
            // アクション
            "action_draw_3": "【大量ドロー】(山札からカードを3枚引く)",
            "action_atk_up": "【超強化】(指定した味方1体の攻撃力を永続で+40する)",
            "action_search_evo": "【確定サーチ】(山札から[進化後]のカードをランダムに1枚引く)",
            "action_heal_face": "【大回復】(リーダーのHPを100回復する)",
            "action_heal_all": "【全体回復】(リーダーと味方全員のHPを全回復する)",
            // アイテム
            "item_hp_up": "【装甲付与】(指定した味方1体の最大HPを+20する)",
            "item_taunt": "【拠点防衛】(指定した味方1体に[守護]を付与する)",
            "item_heal_cleanse": "【状態異常回復】(指定した味方1体を全回復し、状態異常を解除)",
            "item_draw": "【知恵】(山札からカードを1枚引く)",
            "item_mana_boost": "【マナブースト】(このターン中、マナを+2する)"
        };
        abilityText = texts[card.ability] || "";
    }

    let imgPath = card.image;
    if (!imgPath || imgPath === 'characters.png') {
        imgPath = null;
    } else if (typeof imageSources !== 'undefined' && imageSources[imgPath]) {
        imgPath = imageSources[imgPath]; 
    }

    const flavorText = (card.type === 'item' || card.type === 'action' || card.type === 'field')
        ? "冒険の途中で見つけた、かけがえのない記憶の欠片。" 
        : "AIがこれまでの人生で培ってきた、確かな成長の証。";

    let displayCost = card.cost;
    if (window.TCG_BATTLE && window.TCG_BATTLE.player) {
        let owner = window.TCG_BATTLE.player.hand.includes(card) ? window.TCG_BATTLE.player : null;
        if (!owner && window.TCG_BATTLE.cpu.hand.includes(card)) owner = window.TCG_BATTLE.cpu;
        if (owner) displayCost = window.getActualCost(owner, card);
    }
    const costColor = displayCost < card.cost ? "#4CAF50" : "#FFD700";
    
    // ★ 複数バッジ情報の取得
    const badges = window.getCardBadgeInfo(card);
    let badgesHtml = badges.map(b => `<span style="font-size: 11px; background: rgba(0,0,0,0.6); color: ${b.color}; padding: 2px 5px; border-radius: 4px; border: 1px solid ${b.color}; white-space: nowrap;">${b.text}</span>`).join('');

    let html = `<div class="tcg-card" style="width: 180px; height: 260px; background-color: #222; border: 4px solid #555; border-radius: 12px; position: relative; font-family: sans-serif; color: white; box-shadow: 0 4px 8px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden; user-select: none;">`;

    if (card.status === 'stunned' && !card.isDead) {
        html += `<div style="position:absolute; top:35%; left:5%; background:#795548; color:white; padding:5px 15px; border-radius:6px; font-weight:bold; font-size:22px; transform:rotate(-15deg); z-index:15; border: 2px solid #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">🪨 化石化</div>`;
    }
    if (card.status === 'charmed' && !card.isDead) {
        html += `<div style="position:absolute; top:35%; left:15%; background:#E91E63; color:white; padding:5px 15px; border-radius:6px; font-weight:bold; font-size:22px; transform:rotate(15deg); z-index:15; border: 2px solid #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">💕 魅了</div>`;
    }

    if (isUnlocked) {
        html += `<div style="position: absolute; top: 6px; left: 6px; width: 28px; height: 28px; background: ${costColor}; color: #000; border-radius: 50%; font-weight: bold; font-size: 18px; display: flex; justify-content: center; align-items: center; border: 2px solid #FFF; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.5);">${displayCost}</div>`;
    }

    if (card.sx !== undefined) {
        const scX = card.scaleX !== undefined ? card.scaleX : 1.0;
        const scY = card.scaleY !== undefined ? card.scaleY : 1.0;
        const sw = card.sw || 50; const sh = card.sh || 50;
        const sx = card.sx || 0; const sy = card.sy || 0;
        let imgStyle = imgPath 
            ? `background-image: url('${imgPath}'); background-position: ${-sx}px ${-sy}px; background-repeat: no-repeat;`
            : `background: linear-gradient(135deg, #444, #111);`; 
        html += `
        <div style="width: 100%; height: 120px; background-color: #1a1a1a; overflow: hidden; display: flex; justify-content: center; align-items: center; position: relative; border-bottom: 3px solid #444;">
            <div style="width: ${sw}px; height: ${sh}px; ${imgStyle} transform: scale(${scX}, ${scY}); transform-origin: center center; flex-shrink: 0;">
                ${!imgPath ? '<div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; color:#666; font-size:12px; font-weight:bold;">NO IMAGE</div>' : ''}
            </div>
        </div>`;
    } else {
        const col = (card.imageIndex || 0) % 3; const row = Math.floor((card.imageIndex || 0) / 3);
        const finalPosX = (col * 50) + (card.offsetX || 0); const finalPosY = (row * 25) + (card.offsetY || 0); 
        const zoomX = card.zoomX || 300; const zoomY = card.zoomY || 510;
        let imgStyle = imgPath
            ? `background-image: url('${imgPath}'); background-size: ${zoomX}% ${zoomY}%; background-position: ${finalPosX}% ${finalPosY}%; background-repeat: no-repeat;`
            : `background: linear-gradient(135deg, #444, #111); display:flex; justify-content:center; align-items:center; color:#666; font-size:12px; font-weight:bold;`;
        html += `<div style="width: 100%; height: 120px; ${imgStyle} border-bottom: 3px solid #444;">${!imgPath ? 'NO IMAGE' : ''}</div>`;
    }

    html += `
        <div style="padding: 4px 8px; font-weight: bold; font-size: 14px; background: linear-gradient(to right, #444, #222); border-bottom: 2px solid #111; text-shadow: 1px 1px 2px #000; display: flex; justify-content: space-between; align-items: center;">
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;">${card.name}</span>
            ${isUnlocked ? `<div style="display:flex; gap:2px; margin-left: 4px;">${badgesHtml}</div>` : ''}
        </div>`;

    if (isUnlocked) {
        html += `
        <div style="flex: 1; padding: 6px; padding-bottom: 30px; font-size: 11px; color: #ddd; background: #2a2a2a; display: flex; flex-direction: column; gap: 4px;">
            ${abilityText ? `<div style="color: #FF9800; font-weight: bold; font-size: 10px;">${abilityText}</div>` : ''}
            <div style="margin-top: auto; padding-top: 4px; border-top: 1px solid #444;">
                <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="display:flex; flex-direction:column; gap:3px;">
                        <span style="display:inline-block; background:#00BCD4; color:#fff; border-radius:4px; padding:2px 4px; font-size:10px; width:fit-content;">コスト ${card.skillCost}</span>
                        <span style="font-weight:bold; font-size:12px; color:#fff;">${card.skillName}</span>
                    </div>
                    ${card.damage > 0 ? `<div style="color:#ff5252; font-weight:bold; font-size:13px; white-space:nowrap;">${card.damage} ダメージ</div>` : ''}
                </div>
            </div>
        </div>
        <div style="position: absolute; bottom: -4px; right: -4px; background: #4CAF50; color: white; padding: 4px 12px; border-radius: 8px 0 0 0; font-weight: bold; font-size: 16px; border: 2px solid #333; border-right: none; border-bottom: none; box-shadow: -2px -2px 4px rgba(0,0,0,0.3); z-index: 2;">HP ${card.hp}</div>`;
    } else {
        html += `<div style="flex: 1; padding: 15px 10px; font-size: 12px; line-height: 1.6; color: #bbb; background: #2a2a2a; text-align: center; display: flex; align-items: center; justify-content: center;"><span style="font-style: italic;">「${flavorText}」</span></div>`;
    }
    html += `</div>`;
    return html;
};

// ⑤ ダイレクトアタックの超リッチなカットイン演出関数
window.showDirectAttackCutin = function(isPlayer, isPierce) {
    const ui = document.getElementById('tcg-battle-ui');
    if (!ui) return;
    
    const daText = document.createElement('div');
    const textStr = isPierce ? "PIERCING ATTACK!!" : "DIRECT ATTACK!!";
    const color = isPlayer ? "#4CAF50" : "#ff5252";
    const glow = isPlayer ? "#00E676" : "#ff0000";
    
    // 斜体、ドロップシャドウ、極太フォントでカードゲームらしさを全開に
    daText.innerHTML = `<div style="font-size: 70px; font-weight: 900; font-style: italic; color: ${color}; text-shadow: 0 0 30px ${glow}, 4px 4px 0px #fff, -2px -2px 0px #000; transform: skewX(-15deg); letter-spacing: 4px; white-space: nowrap;">${textStr}</div>`;
    daText.style.cssText = `position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%) scale(0.1); opacity: 0; z-index: 45000; pointer-events: none; transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);`;
    
    ui.appendChild(daText);
    
    // ログには残す（サイレントモード）
    window.showBattleMessage(`💥 ${isPierce ? '貫通' : 'ダイレクト'}アタック！！`, !isPlayer, 2000, !isPlayer, true);

    setTimeout(() => { 
        daText.style.transform = 'translate(-50%, -50%) scale(1.2)'; 
        daText.style.opacity = '1'; 
    }, 50);
    
    setTimeout(() => { 
        daText.style.transform = 'translate(-50%, -50%) scale(1.5)'; 
        daText.style.opacity = '0'; 
        setTimeout(() => daText.remove(), 300); 
    }, 1000);
};

// ⑥ 攻撃処理を上書きしてダイレクトアタック演出を組み込む
// window.executeAttack = function(targetType, enemyIndex) {
//     const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
//     const isPlayer = window.TCG_BATTLE.isEnemyTurn === false;
//     const owner = isPlayer ? p : cpu;
//     const enemy = isPlayer ? cpu : p;
//     const ownerPrefix = isPlayer ? 'p' : 'c';
//     const enemyPrefix = isPlayer ? 'c' : 'p';
    
//     const attackerIndex = window.TCG_BATTLE.selectedAttackerIndex; 
//     if (attackerIndex === -1) return;
//     const attackerCard = owner.field[attackerIndex];

//     const isPierce = attackerCard.ability === "pierce_recoil" || attackerCard.ability === "flight" || attackerCard.ability === "god_strike" || attackerCard.ability === "dimension_drill" || attackerCard.ability === "piercing_juggernaut";
//     const hasTaunt = enemy.field.some(c => c.ability === "taunt" || c.ability === "pure_aegis" || c.isDefending);
    
//     if (hasTaunt && !isPierce) {
//         if (targetType === 'cpu' || targetType === 'player' || (targetType === 'card' && enemy.field[enemyIndex].ability !== "taunt" && enemy.field[enemyIndex].ability !== "pure_aegis" && !enemy.field[enemyIndex].isDefending)) {
//             if(isPlayer) window.showBattleMessage("🛡️ 敵の場に【かばう】を持つカードがいます！\n先にそちらを攻撃してください", true); return;
//         }
//     }
//     if (targetType === 'card' && enemy.field[enemyIndex].ability === "stealth") {
//         if(isPlayer) window.showBattleMessage("🌫️ この敵は【潜伏】しています！\n攻撃対象に選べません！", true); return;
//     }

//     window.showBattleMessage(`⚔️ ${attackerCard.name} の攻撃！`, false, 1500, !isPlayer);

//     if (attackerCard.ability === "piercing_juggernaut") {
//         attackerCard.damage += 10;
//         window.showVFX(`${ownerPrefix}-card-${attackerIndex}`, 'heal', '火力UP');
//     }
    
//     let dmgToTarget = attackerCard.damage; 
//     let dmgToAttacker = 0; 
//     const attackerHtmlId = `${ownerPrefix}-card-${attackerIndex}`;
    
//     let targetDied = false;
//     let target = null;
//     let targetHtmlId = null;

//     if (targetType === 'cpu' || targetType === 'player') {
//         const faceId = isPlayer ? 'cpu-face' : 'player-face';
        
//         // ダイレクトアタック演出
//         const ui = document.getElementById('tcg-battle-ui'); 
//         if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
        
//         window.showDirectAttackCutin(isPlayer, false);

//         window.showVFX(faceId, 'slash'); 
//         window.showVFX(faceId, 'damage', dmgToTarget);
//         window.showBattleMessage(`🔥 ${isPlayer ? '敵' : '味方'}リーダーに ${dmgToTarget} ダメージ！`, false, 2000, !isPlayer, true);

//         enemy.hp -= dmgToTarget; 
//         if (attackerCard.ability === "soul_reap") {
//             enemy.hp -= 20; window.showVFX(faceId, 'damage', 20);
//         }

//         setTimeout(() => {
//             const hpSpan = isPlayer ? document.querySelector('#cpu-face span') : document.querySelector('#player-face div:nth-child(2)');
//             if (hpSpan) {
//                 hpSpan.style.transition = "all 0.1s";
//                 hpSpan.innerText = `HP: ${enemy.hp}`;
//                 hpSpan.style.color = '#ff5252';
//                 hpSpan.style.transform = 'scale(1.4)';
//                 setTimeout(() => {
//                     hpSpan.style.color = isPlayer ? '#ff5252' : '#4CAF50';
//                     hpSpan.style.transform = 'scale(1)';
//                 }, 300);
//             }
//         }, 500);

//     } else if (targetType === 'card') {
//         target = enemy.field[enemyIndex]; 
//         targetHtmlId = `${enemyPrefix}-card-${enemyIndex}`;
//         dmgToAttacker = target.damage;

//         // ▼▼▼ 迎撃 ▼▼▼
//         if (target.ability === "counter_attack") {
//             dmgToAttacker += target.damage; // 元々の反撃ダメージ（target.damage）に、迎撃分としてさらに同等のダメージを加算！
//             window.showVFX(targetHtmlId, 'slash', '迎撃');
//         }

//         if (target.ability === "absolute_field") dmgToTarget = 1;
//         if (attackerCard.ability === "absolute_field") dmgToAttacker = 1;
//         if (target.ability === "absolute_fortress") dmgToTarget = Math.max(0, dmgToTarget - 20);
//         if (attackerCard.ability === "absolute_fortress") dmgToAttacker = Math.max(0, dmgToAttacker - 20);
        
//         if (target.ability === "absolute_evasion" && Math.random() < 0.5) {
//             dmgToTarget = 0; window.showVFX(targetHtmlId, 'heal', '回避');
//         }
//         if (target.ability === "evasion" && Math.random() < 0.5) {
//             dmgToTarget = 0; window.showVFX(targetHtmlId, 'heal', '回避');
//         }
//         if (target.ability === "impregnable_armor" && dmgToTarget <= 30) {
//             dmgToTarget = 0; window.showVFX(targetHtmlId, 'heal', '無効化');
//         }
//         if (target.ability === "void_counter" && !target._void_used) {
//             target._void_used = true; dmgToAttacker += dmgToTarget * 2; dmgToTarget = 0;
//             window.showVFX(targetHtmlId, 'slash', '倍返し');
//         }
//         if (target.ability === "magic_reflect") {
//             dmgToAttacker += Math.floor(dmgToTarget / 2); dmgToTarget = Math.floor(dmgToTarget / 2);
//             window.showVFX(targetHtmlId, 'slash', '反射');
//         }
//         if (target.ability === "thorns") {
//             dmgToAttacker += Math.floor(dmgToTarget / 2); 
//             window.showVFX(targetHtmlId, 'slash', '棘');
//         }
//         if (attackerCard.ability === "soul_reap") {
//             target.maxHp = Math.max(1, target.maxHp - 20); 
//             dmgToTarget += 20; 
//         }

//         target.hp -= dmgToTarget; 
//         window.showVFX(targetHtmlId, 'slash'); window.showVFX(targetHtmlId, 'damage', dmgToTarget);
        
//         window.showBattleMessage(`💥 ${target.name} に ${dmgToTarget} ダメージ！`, false, 1500, !isPlayer, true);

//         // ▼▼▼ 猛毒処理 ▼▼▼
//         if (attackerCard.ability === "venom_strike" && target.hp > 0 && dmgToTarget > 0) {
//             target.hp = 0;
//             window.showVFX(targetHtmlId, 'slash', '猛毒');
//             window.showBattleMessage(`☠️ 【猛毒】${target.name} は毒に侵され即死した！`, false, 2000, !isPlayer, true);
//         }

//         // ▼▼▼ 重撃 ▼▼▼
//         if (attackerCard.ability === "heavy_strike" && target.hp > 0 && dmgToTarget > 0) {
//             target.status = "stunned";
//             window.showVFX(targetHtmlId, 'damage', '化石化');
//             window.showBattleMessage(`🪨 【重撃】${target.name} は重い一撃でスタンした！`, false, 2000, !isPlayer, true);
//         }

//         // ★ 破裂（カウンターダメージ）
//         if (target.ability === "burst_damage") {
//             attackerCard.hp -= 20;
//             window.showVFX(attackerHtmlId, 'slash'); window.showVFX(attackerHtmlId, 'damage', 20);
//             window.showBattleMessage(`🎈 【破裂】${target.name}の破片で 20ダメージ！`, false, 1500, !isPlayer, true);
//             if(attackerCard.hp <= 0 && !attackerCard.isDead) {
//                 window.checkDeath(attackerCard, owner, attackerHtmlId, enemy);
//             }
//         }
        
//         // ★ デバフ（攻撃力半減）
//         if (attackerCard.ability === "debuff_attack" && target.hp > 0 && !target.isDead) {
//             target.damage = Math.floor(target.damage / 2);
//             window.showVFX(targetHtmlId, 'heal', '攻撃ダウン');
//             window.showBattleMessage(`📉 【弱体化】${target.name} の攻撃力が半減した！`, false, 2000, !isPlayer, true);
//         }

//         // ★追加：トランプル（貫通）処理
//         if (attackerCard.ability === "trample" && target.hp < 0) {
//             let excess = -target.hp;
//             enemy.hp -= excess;
//             const faceId = isPlayer ? 'cpu-face' : 'player-face';
//             window.showVFX(faceId, 'damage', excess);
//             const ui = document.getElementById('tcg-battle-ui'); 
//             if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
//             window.showBattleMessage(`💥 【貫通】超過した ${excess} ダメージがリーダーに直撃！`, false, 2000, !isPlayer, true);
//         }

//         if(target.hp <= 0 && !target.isDead) targetDied = true;
//         window.checkDeath(target, enemy, targetHtmlId, owner);
//         if (target.ability === "stealth") target.ability = null;
//     }

//     if (attackerCard.ability === "soul_drain" && dmgToTarget > 0) {
//         let heal = Math.floor(dmgToTarget / 2);
//         attackerCard.hp += heal; window.showVFX(attackerHtmlId, 'heal', heal);
//     }

//     // ▼▼▼ 吸収処理 ▼▼▼
//     if (attackerCard.ability === "life_drain" && dmgToTarget > 0) {
//         owner.hp += dmgToTarget;
//         const faceId = isPlayer ? 'player-face' : 'cpu-face';
//         window.showVFX(faceId, 'heal', dmgToTarget);
//         window.showBattleMessage(`💖 【吸収】リーダーのHPが ${dmgToTarget} 回復した！`, false, 1500, !isPlayer, true);
//     }

//     if (targetDied) {
//         if (attackerCard.ability === "devour") {
//             attackerCard.maxHp = (attackerCard.maxHp||attackerCard.hp) + 20;
//             attackerCard.hp += 20; attackerCard.damage += 10;
//             window.showVFX(attackerHtmlId, 'heal', '捕食');
//         }
//         if (attackerCard.ability === "apex_predator") {
//             attackerCard.maxHp = (attackerCard.maxHp||attackerCard.hp) * 2;
//             attackerCard.hp = attackerCard.maxHp; attackerCard.damage *= 2;
//             window.showVFX(attackerHtmlId, 'heal', '超捕食');
//         }
//     }

//     if (attackerCard.ability === "god_strike") {
//         const otherEnemies = enemy.field.filter((c, idx) => (!c.isDead && (targetType !== 'card' || idx !== enemyIndex)));
//         if (otherEnemies.length > 0) {
//             let tCard = otherEnemies[Math.floor(Math.random() * otherEnemies.length)];
//             tCard.hp = 0; window.checkDeath(tCard, enemy, `${enemyPrefix}-card-${enemy.field.indexOf(tCard)}`, owner);
//             window.showBattleMessage("⚔️ 【神の一撃】が別の敵を葬り去った！", false, 1500, !isPlayer);
//         }
//     }
//     if (attackerCard.ability === "dimension_drill" && targetType === 'card') {
//         const faceId = isPlayer ? 'cpu-face' : 'player-face';
//         const ui = document.getElementById('tcg-battle-ui'); 
//         if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
        
//         window.showDirectAttackCutin(isPlayer, true);
//         window.showVFX(faceId, 'damage', dmgToTarget); 
//         window.showBattleMessage(`🌪️ 【次元穿孔】敵リーダーも貫いた！`, false, 1500, !isPlayer, true);
        
//         enemy.hp -= dmgToTarget;
        
//         setTimeout(() => {
//             const hpSpan = isPlayer ? document.querySelector('#cpu-face span') : document.querySelector('#player-face div:nth-child(2)');
//             if (hpSpan) {
//                 hpSpan.style.transition = "all 0.1s";
//                 hpSpan.innerText = `HP: ${enemy.hp}`;
//                 hpSpan.style.color = '#ff5252';
//                 hpSpan.style.transform = 'scale(1.4)';
//                 setTimeout(() => {
//                     hpSpan.style.color = isPlayer ? '#ff5252' : '#4CAF50';
//                     hpSpan.style.transform = 'scale(1)';
//                 }, 300);
//             }
//         }, 500);
//     }
//     if (attackerCard.ability === "pierce_recoil") { dmgToAttacker += 10; }

//     if (dmgToAttacker > 0) {
//         setTimeout(() => {
//             attackerCard.hp -= dmgToAttacker; window.showVFX(attackerHtmlId, 'slash'); window.showVFX(attackerHtmlId, 'damage', dmgToAttacker);
//             window.checkDeath(attackerCard, owner, attackerHtmlId, enemy); window.renderBattleBoard();
//         }, 200);
//     }
    
//     if (attackerCard.ability === "stealth") attackerCard.ability = null;
//     attackerCard.canAttack = false; 

//     // ▼▼▼ 連撃の処理 ▼▼▼
//     if (attackerCard.ability === "double_strike" && !attackerCard._has_attacked_once) {
//         attackerCard._has_attacked_once = true;
//         window.showBattleMessage(`🌪️ 【連撃】${attackerCard.name} はもう一度攻撃できる！`, false, 1500, !isPlayer, true);
//     } else {
//         attackerCard.canAttack = false; 
//         attackerCard._has_attacked_once = false;
//     }

//     if(isPlayer) window.TCG_BATTLE.selectedAttackerIndex = -1; 

//     setTimeout(() => {
//         window.renderBattleBoard();
//         p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);
//         if (cpu.hp <= 0) { cpu.hp = 0; window.renderBattleBoard(); window.showBattleMessage("🎉 YOU WIN!!\n相手のHPを0にしました！", false, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }
//         if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }
//         window.renderBattleBoard();
//     }, 1100);
// };

// ==========================================
// ★ 攻撃処理の完全版（全アビリティ・連撃バグ修正済）
// ==========================================
window.executeAttack = function(targetType, enemyIndex) {
    try {
        const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
        const isPlayer = window.TCG_BATTLE.isEnemyTurn === false;
        const owner = isPlayer ? p : cpu;
        const enemy = isPlayer ? cpu : p;
        const ownerPrefix = isPlayer ? 'p' : 'c';
        const enemyPrefix = isPlayer ? 'c' : 'p';
        
        const attackerIndex = window.TCG_BATTLE.selectedAttackerIndex; 
        if (attackerIndex === -1) return;
        const attackerCard = owner.field[attackerIndex];

        const isPierce = attackerCard.ability === "pierce_recoil" || attackerCard.ability === "flight" || attackerCard.ability === "god_strike" || attackerCard.ability === "dimension_drill" || attackerCard.ability === "piercing_juggernaut";
        const hasTaunt = enemy.field.some(c => c.ability === "taunt" || c.ability === "pure_aegis" || c.isDefending);
        
        if (hasTaunt && !isPierce) {
            if (targetType === 'cpu' || targetType === 'player' || (targetType === 'card' && enemy.field[enemyIndex].ability !== "taunt" && enemy.field[enemyIndex].ability !== "pure_aegis" && !enemy.field[enemyIndex].isDefending)) {
                if(isPlayer) window.showBattleMessage("🛡️ 敵の場に【かばう】を持つカードがいます！\n先にそちらを攻撃してください", true); return;
            }
        }
        if (targetType === 'card' && enemy.field[enemyIndex].ability === "stealth") {
            if(isPlayer) window.showBattleMessage("🌫️ この敵は【潜伏】しています！\n攻撃対象に選べません！", true); return;
        }

        window.showBattleMessage(`⚔️ ${attackerCard.name} の攻撃！`, false, 1500, !isPlayer);

        if (attackerCard.ability === "piercing_juggernaut") {
            attackerCard.damage += 10;
            window.showVFX(`${ownerPrefix}-card-${attackerIndex}`, 'heal', '火力UP');
        }
        
        let dmgToTarget = attackerCard.damage; 
        let dmgToAttacker = 0; 
        const attackerHtmlId = `${ownerPrefix}-card-${attackerIndex}`;
        
        let targetDied = false;
        let target = null;
        let targetHtmlId = null;

        if (targetType === 'cpu' || targetType === 'player') {
            const faceId = isPlayer ? 'cpu-face' : 'player-face';
            
            const ui = document.getElementById('tcg-battle-ui'); 
            if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
            
            window.showDirectAttackCutin(isPlayer, false);

            window.showVFX(faceId, 'slash'); 
            window.showVFX(faceId, 'damage', dmgToTarget);
            window.showBattleMessage(`🔥 ${isPlayer ? '敵' : '味方'}リーダーに ${dmgToTarget} ダメージ！`, false, 2000, !isPlayer, true);

            enemy.hp -= dmgToTarget; 
            if (attackerCard.ability === "soul_reap") {
                enemy.hp -= 20; window.showVFX(faceId, 'damage', 20);
            }

            setTimeout(() => {
                const hpSpan = isPlayer ? document.querySelector('#cpu-face span') : document.querySelector('#player-face div:nth-child(2)');
                if (hpSpan) {
                    hpSpan.style.transition = "all 0.1s";
                    hpSpan.innerText = `HP: ${enemy.hp}`;
                    hpSpan.style.color = '#ff5252';
                    hpSpan.style.transform = 'scale(1.4)';
                    setTimeout(() => {
                        hpSpan.style.color = isPlayer ? '#ff5252' : '#4CAF50';
                        hpSpan.style.transform = 'scale(1)';
                    }, 300);
                }
            }, 500);

        } else if (targetType === 'card') {
            target = enemy.field[enemyIndex]; 
            targetHtmlId = `${enemyPrefix}-card-${enemyIndex}`;
            dmgToAttacker = target.damage;

            // 迎撃
            if (target.ability === "counter_attack") {
                dmgToAttacker += target.damage;
                window.showVFX(targetHtmlId, 'slash', '迎撃');
            }

            // ▼▼▼ 重装甲 ▼▼▼
            if (target.ability === "heavy_armor") {
                dmgToTarget = Math.max(0, dmgToTarget - 20);
                window.showVFX(targetHtmlId, 'heal', '装甲化');
            }

            if (target.ability === "absolute_field") dmgToTarget = 1;
            if (attackerCard.ability === "absolute_field") dmgToAttacker = 1;
            if (target.ability === "absolute_fortress") dmgToTarget = Math.max(0, dmgToTarget - 20);
            if (attackerCard.ability === "absolute_fortress") dmgToAttacker = Math.max(0, dmgToAttacker - 20);
            
            // 見切り＆絶対回避
            if ((target.ability === "evasion" || target.ability === "absolute_evasion") && Math.random() < 0.5) {
                dmgToTarget = 0; window.showVFX(targetHtmlId, 'heal', '回避');
            }
            if (target.ability === "impregnable_armor" && dmgToTarget <= 30) {
                dmgToTarget = 0; window.showVFX(targetHtmlId, 'heal', '無効化');
            }
            if (target.ability === "void_counter" && !target._void_used) {
                target._void_used = true; dmgToAttacker += dmgToTarget * 2; dmgToTarget = 0;
                window.showVFX(targetHtmlId, 'slash', '倍返し');
            }
            if (target.ability === "magic_reflect") {
                dmgToAttacker += Math.floor(dmgToTarget / 2); dmgToTarget = Math.floor(dmgToTarget / 2);
                window.showVFX(targetHtmlId, 'slash', '反射');
            }
            if (target.ability === "thorns") {
                dmgToAttacker += Math.floor(dmgToTarget / 2); 
                window.showVFX(targetHtmlId, 'slash', '棘');
            }
            if (attackerCard.ability === "soul_reap") {
                target.maxHp = Math.max(1, target.maxHp - 20); 
                dmgToTarget += 20; 
            }

            target.hp -= dmgToTarget; 
            window.showVFX(targetHtmlId, 'slash'); window.showVFX(targetHtmlId, 'damage', dmgToTarget);
            
            window.showBattleMessage(`💥 ${target.name} に ${dmgToTarget} ダメージ！`, false, 1500, !isPlayer, true);

            // ▼▼▼ 沈黙 ▼▼▼
            if (attackerCard.ability === "silence" && target && target.ability) {
                target.ability = null; // 相手の能力を消去
                window.showVFX(targetHtmlId, 'slash', '沈黙');
                window.showBattleMessage(`🔇 【沈黙】${target.name} の能力が封じられた！`, false, 2000, !isPlayer, true);
            }

            // 猛毒
            if (attackerCard.ability === "venom_strike" && target.hp > 0 && dmgToTarget > 0) {
                target.hp = 0;
                window.showVFX(targetHtmlId, 'slash', '猛毒');
                window.showBattleMessage(`☠️ 【猛毒】${target.name} は毒に侵され即死した！`, false, 2000, !isPlayer, true);
            }

            // 重撃
            if (attackerCard.ability === "heavy_strike" && target.hp > 0 && dmgToTarget > 0) {
                target.status = "stunned";
                window.showVFX(targetHtmlId, 'damage', '化石化');
                window.showBattleMessage(`🪨 【重撃】${target.name} は重い一撃でスタンした！`, false, 2000, !isPlayer, true);
            }

            // 破裂
            if (target.ability === "burst_damage") {
                attackerCard.hp -= 20;
                window.showVFX(attackerHtmlId, 'slash'); window.showVFX(attackerHtmlId, 'damage', 20);
                window.showBattleMessage(`🎈 【破裂】${target.name}の破片で 20ダメージ！`, false, 1500, !isPlayer, true);
            }

            // 貫通
            if (attackerCard.ability === "trample" && target.hp < 0) {
                let excess = -target.hp;
                enemy.hp -= excess;
                const faceId = isPlayer ? 'cpu-face' : 'player-face';
                window.showVFX(faceId, 'damage', excess);
                const ui = document.getElementById('tcg-battle-ui'); 
                if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
                window.showBattleMessage(`💥 【貫通】超過した ${excess} ダメージがリーダーに直撃！`, false, 2000, !isPlayer, true);
            }

            if(target.hp <= 0 && !target.isDead) targetDied = true;
            window.checkDeath(target, enemy, targetHtmlId, owner);

            // ▼▼▼ 修正＆追加（ターゲット側の自爆） ▼▼▼
            let targetWasAlive = !target.isDead;
            if(target.hp <= 0 && !target.isDead) targetDied = true;
            window.checkDeath(target, enemy, targetHtmlId, owner);

            // ダメージを受けて生き残っていれば逆鱗発動！
            if (targetWasAlive && !target.isDead && target.ability === "wrath" && dmgToTarget > 0) {
                target.damage += 20;
                window.showVFX(targetHtmlId, 'heal', '逆鱗(攻+20)');
                window.showBattleMessage(`💢 【逆鱗】${target.name} の攻撃力が上がった！`, false, 1500, !isPlayer, true);
            }
            
            // 死んだ瞬間に自爆発動！
            if (targetWasAlive && target.isDead && target.ability === "self_destruct" && !target._has_self_destructed) {
                target._has_self_destructed = true;
                owner.hp -= 30; // 攻撃してきた側のリーダーにダメージ
                const faceId = isPlayer ? 'player-face' : 'cpu-face';
                window.showVFX(faceId, 'damage', 30);
                window.showBattleMessage(`💥 【自爆】${target.name} の爆発でリーダーに30ダメージ！`, false, 1500, !isPlayer, true);
                const ui = document.getElementById('tcg-battle-ui'); 
                if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
            }

            if (target.ability === "stealth") target.ability = null;
        }

        // 魂吸収
        if (attackerCard.ability === "soul_drain" && dmgToTarget > 0) {
            let heal = Math.floor(dmgToTarget / 2);
            attackerCard.hp += heal; window.showVFX(attackerHtmlId, 'heal', heal);
        }

        // 吸収
        if (attackerCard.ability === "life_drain" && dmgToTarget > 0) {
            owner.hp += dmgToTarget;
            const faceId = isPlayer ? 'player-face' : 'cpu-face';
            window.showVFX(faceId, 'heal', dmgToTarget);
            window.showBattleMessage(`💖 【吸収】リーダーのHPが ${dmgToTarget} 回復した！`, false, 1500, !isPlayer, true);
        }

        // 捕食系
        if (targetDied) {
            if (attackerCard.ability === "devour") {
                attackerCard.maxHp = (attackerCard.maxHp||attackerCard.hp) + 20;
                attackerCard.hp += 20; attackerCard.damage += 10;
                window.showVFX(attackerHtmlId, 'heal', '捕食');
            }
            if (attackerCard.ability === "apex_predator") {
                attackerCard.maxHp = (attackerCard.maxHp||attackerCard.hp) * 2;
                attackerCard.hp = attackerCard.maxHp; attackerCard.damage *= 2;
                window.showVFX(attackerHtmlId, 'heal', '超捕食');
            }
        }

        // 神の一撃
        if (attackerCard.ability === "god_strike") {
            const otherEnemies = enemy.field.filter((c, idx) => (!c.isDead && (targetType !== 'card' || idx !== enemyIndex)));
            if (otherEnemies.length > 0) {
                let tCard = otherEnemies[Math.floor(Math.random() * otherEnemies.length)];
                tCard.hp = 0; window.checkDeath(tCard, enemy, `${enemyPrefix}-card-${enemy.field.indexOf(tCard)}`, owner);
                window.showBattleMessage("⚔️ 【神の一撃】が別の敵を葬り去った！", false, 1500, !isPlayer);
            }
        }

        // ▼▼▼ 範囲魔法 ▼▼▼
        if (attackerCard.ability === "splash_damage") {
            const otherEnemies = enemy.field.filter((c, idx) => (!c.isDead && (targetType !== 'card' || idx !== enemyIndex)));
            if (otherEnemies.length > 0) {
                otherEnemies.forEach(c => {
                    c.hp -= 10;
                    let idx = enemy.field.indexOf(c);
                    let hId = `${enemyPrefix}-card-${idx}`;
                    window.showVFX(hId, 'damage', 10);
                    window.checkDeath(c, enemy, hId, owner);
                });
                window.showBattleMessage(`🔥 【範囲魔法】他の敵全員に 10 の巻き添えダメージ！`, false, 1500, !isPlayer, true);
                
                // 画面揺れ演出
                const ui = document.getElementById('tcg-battle-ui'); 
                if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
            }
        }

        // 次元穿孔
        if (attackerCard.ability === "dimension_drill" && targetType === 'card') {
            const faceId = isPlayer ? 'cpu-face' : 'player-face';
            const ui = document.getElementById('tcg-battle-ui'); 
            if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
            
            window.showDirectAttackCutin(isPlayer, true);
            window.showVFX(faceId, 'damage', dmgToTarget); 
            window.showBattleMessage(`🌪️ 【次元穿孔】敵リーダーも貫いた！`, false, 1500, !isPlayer, true);
            
            enemy.hp -= dmgToTarget;
            
            setTimeout(() => {
                const hpSpan = isPlayer ? document.querySelector('#cpu-face span') : document.querySelector('#player-face div:nth-child(2)');
                if (hpSpan) {
                    hpSpan.style.transition = "all 0.1s";
                    hpSpan.innerText = `HP: ${enemy.hp}`;
                    hpSpan.style.color = '#ff5252';
                    hpSpan.style.transform = 'scale(1.4)';
                    setTimeout(() => {
                        hpSpan.style.color = isPlayer ? '#ff5252' : '#4CAF50';
                        hpSpan.style.transform = 'scale(1)';
                    }, 300);
                }
            }, 500);
        }
        
        // デバフ
        if (attackerCard.ability === "debuff_attack" && target && target.hp > 0 && !target.isDead) {
            target.damage = Math.floor(target.damage / 2);
            window.showVFX(targetHtmlId, 'heal', '攻撃ダウン');
            window.showBattleMessage(`📉 【弱体化】${target.name} の攻撃力が半減した！`, false, 2000, !isPlayer, true);
        }

        if (attackerCard.ability === "pierce_recoil") { dmgToAttacker += 10; }

        // 反撃ダメージの処理（200ms遅延）
        if (dmgToAttacker > 0) {
            setTimeout(() => {
                attackerCard.hp -= dmgToAttacker; window.showVFX(attackerHtmlId, 'slash'); window.showVFX(attackerHtmlId, 'damage', dmgToAttacker);
                
                // ▼▼▼ 修正＆追加（アタッカー側の自爆） ▼▼▼
                let attackerWasAlive = !attackerCard.isDead;
                window.checkDeath(attackerCard, owner, attackerHtmlId, enemy); 

                // ▼▼▼ 逆鱗・アタッカー側 ▼▼▼
                if (attackerWasAlive && !attackerCard.isDead && attackerCard.ability === "wrath" && dmgToAttacker > 0) {
                    attackerCard.damage += 20;
                    window.showVFX(attackerHtmlId, 'heal', '逆鱗(攻+20)');
                    window.showBattleMessage(`💢 【逆鱗】${attackerCard.name} の攻撃力が上がった！`, false, 1500, isPlayer, true);
                }
                
                // 反撃で死んだ瞬間に自爆発動！
                if (attackerWasAlive && attackerCard.isDead && attackerCard.ability === "self_destruct" && !attackerCard._has_self_destructed) {
                    enemy.hp -= 30; // 迎撃してきた側のリーダーにダメージ
                    const faceId = isPlayer ? 'cpu-face' : 'player-face';
                    window.showVFX(faceId, 'damage', 30);
                    window.showBattleMessage(`💥 【自爆】${attackerCard.name} の爆発でリーダーに30ダメージ！`, false, 1500, isPlayer, true);
                    const ui = document.getElementById('tcg-battle-ui'); 
                    if (ui) { ui.classList.remove('screen-shake-effect'); void ui.offsetWidth; ui.classList.add('screen-shake-effect'); }
                } 
                if (attackerCard.isDead) attackerCard.canAttack = false; // 死んだら攻撃不可
                window.renderBattleBoard();
            }, 200);
        }
        
        if (attackerCard.ability === "stealth") attackerCard.ability = null;

        // ★ 連撃の完全管理
        if (attackerCard.ability === "double_strike" && !attackerCard._has_attacked_once && !attackerCard.isDead) {
            attackerCard._has_attacked_once = true;
            // canAttack は true のまま残す！
            window.showBattleMessage(`🌪️ 【連撃】${attackerCard.name} はもう一度攻撃できる！`, false, 1500, !isPlayer, true);
        } else {
            attackerCard.canAttack = false; 
            attackerCard._has_attacked_once = false;
        }

        if(isPlayer) window.TCG_BATTLE.selectedAttackerIndex = -1; 

        setTimeout(() => {
            window.renderBattleBoard();
            p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);
            if (cpu.hp <= 0) { cpu.hp = 0; window.renderBattleBoard(); window.showBattleMessage("🎉 YOU WIN!!\n相手のHPを0にしました！", false, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }
            if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }
            window.renderBattleBoard();
        }, 1100);
    } catch (e) {
        console.error("Attack Execution Error: ", e);
    }
};

// ==========================================
// ★ 進化バッジ正確化パッチ（ID名に依存せず進化深度を判定）
// ==========================================
window.getCardBadgeInfo = function(card) {
    let badges = [];

    // 1. サポートカード
    if (card.type === 'item') { badges.push({ text: '具', color: '#8D6E63' }); return badges; }
    if (card.type === 'action') { badges.push({ text: '技', color: '#FFB74D' }); return badges; }
    if (card.type === 'field') { badges.push({ text: '地', color: '#4DB6AC' }); return badges; }

    // 2. 基本種族の判定
    const raceMap = {
        'dragon': { t: '竜', c: '#FFC107' }, 'magician': { t: '魔', c: '#9C27B0' },
        'spirit': { t: '精', c: '#4CAF50' }, 'stone': { t: '岩', c: '#795548' },
        'machine': { t: '械', c: '#607D8B' }, 'ghost': { t: '霊', c: '#673AB7' },
        'bird': { t: '鳥', c: '#03A9F4' }, 'beetle': { t: '虫', c: '#8BC34A' },
        'seed': { t: '草', c: '#8BC34A' }, 'balloon': { t: '風', c: '#00BCD4' },
        'robot': { t: '機', c: '#9E9E9E' }
    };

    let baseType = card.type.split('_')[0]; 
    if (raceMap[baseType]) {
        badges.push({ text: raceMap[baseType].t, color: raceMap[baseType].c });
    }

    // 3. ★修正：文字(ID)ではなく「進化の深さ」を直接調べて段階を判定する！
    let isStage1 = false;
    let isStage2 = false;

    if (card.evolvesFrom) {
        // マスターデータの中から、親となるカードを検索する
        const parentKey = Object.keys(window.TCG_MASTER).find(k => window.TCG_MASTER[k].type === card.evolvesFrom);
        const parentData = parentKey ? window.TCG_MASTER[parentKey] : null;

        if (parentData && parentData.evolvesFrom) {
            // 親もさらに進化元を持っている ＝ 自分は「最終進化（第2形態）」
            isStage2 = true;
        } else {
            // 親は基本種族 ＝ 自分は「1進化（第1形態）」
            isStage1 = true;
        }
    }

    // 4. 進化属性の判定
    let evoText = ''; let evoColor = '';
    if (card.type.includes('type1')) { evoText = '闇'; evoColor = '#9C27B0'; }
    else if (card.type.includes('type2')) { evoText = '美'; evoColor = '#E91E63'; }
    else if (card.type.includes('type3')) { evoText = '賢'; evoColor = '#2196F3'; }
    else if (card.type.includes('type4')) { evoText = '活'; evoColor = '#FF5722'; }
    else if (card.type.includes('type5')) { evoText = '老'; evoColor = '#795548'; }

    if (evoText) {
        // 最終進化（第2形態）の時だけ「+」をつける
        if (isStage2) evoText += '+'; 
        badges.push({ text: evoText, color: evoColor });
    }

    if (badges.length === 0) badges.push({ text: '無', color: '#999' });

    return badges;
};

// ==========================================
// ★ 進化時の攻撃権（速攻）引き継ぎパッチ
// ==========================================

// プレイヤー側のカード選択（進化・攻撃・防御）処理を上書き
window.selectPlayerCard = function(index) {
    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;
    const targetCard = p.field[index];

    if (targetCard.status === "stunned") {
        window.showBattleMessage("🪨 化石化して動けない！", true); return;
    }

    if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
        const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
        const actualCost = window.getActualCost(p, evoCard);
        if (targetCard.type === evoCard.evolvesFrom) {
            
            // ★修正：進化元の「攻撃できる状態か」を記憶しておく！
            const canAttackInherit = targetCard.canAttack;

            p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
            window.renderBattleBoard();

            window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`, false, 1500, false, false);

            window.animateCardPlay(evoCard, true, () => {
                // ★修正：アニメーション完了後、記憶しておいた攻撃権を進化カードに引き継ぐ
                evoCard.canAttack = canAttackInherit; 
                p.field[index] = evoCard;  
                window.showVFX(`p-card-${index}`, 'heal', '進化!'); 
                window.triggerPlayEffect(evoCard, true); 
            });
        } else {
            const evoName = window.getEvolvesFromName(evoCard.evolvesFrom);
            window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
        }
        return;
    }

    if (!targetCard.canAttack || targetCard.damage <= 0) {
        if (!targetCard.isDefending && targetCard.ability !== "taunt" && p.currentMana >= 1) {
            p.currentMana -= 1; targetCard.isDefending = true; 
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`); window.renderBattleBoard();
        } else if (targetCard.isDefending) { window.showBattleMessage(`このカードはすでに防御姿勢です。`); }
        return;
    }

    if (window.TCG_BATTLE.selectedAttackerIndex === index) {
        window.TCG_BATTLE.selectedAttackerIndex = -1;
    } else {
        window.TCG_BATTLE.selectedAttackerIndex = index;
        if (targetCard.status === "charmed") {
            window.TCG_BATTLE.selectedAttackerIndex = -1;
            targetCard.status = null; targetCard.canAttack = false;
            p.hp -= targetCard.damage;
            window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', targetCard.damage);
            window.showBattleMessage(`💕 魅了されていて、味方リーダーを攻撃してしまった！`, true, 2500);
            window.renderBattleBoard();
            setTimeout(() => {
                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); }
            }, 800);
            return;
        }
    }
    window.renderBattleBoard();
};

// 敵（CPU）のターン処理を上書き（敵も進化後即殴ってくるようにする）
window.executeCPUTurn = function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    const pField = window.TCG_BATTLE.player.field;
    pField.forEach(c => { if (c.isDefending) { c._tempOriginalAbility = c.ability; c.ability = "taunt"; } });

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    // ターン開始時効果
    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => card.canAttack = true);
    window.renderBattleBoard();

    setTimeout(() => {
        let delay = 0;
        
        // --- 攻撃フェーズ ---
        cpu.field.forEach((cpuCard, cpuIndex) => {
            if (!cpuCard.canAttack || cpuCard.damage <= 0) return;
            
            if (cpuCard.status === "charmed") {
                setTimeout(() => {
                    cpuCard.status = null; cpuCard.canAttack = false;
                    cpu.hp -= cpuCard.damage;
                    window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
                    window.renderBattleBoard();
                }, delay);
                delay += 800;
                return;
            }
            if (cpuCard.status === "stunned") return;

            setTimeout(() => {
                window.TCG_BATTLE.selectedAttackerIndex = cpuIndex;
                const tauntTargets = p.field.filter(c => c.ability === "taunt" || c.isDefending);
                const validTargets = p.field.filter(c => c.ability !== "stealth"); 
                let targetType = 'player'; let tIndex = 0;
                const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
                
                if (tauntTargets.length > 0 && !isPierce) {
                    targetType = 'card'; tIndex = p.field.indexOf(tauntTargets[Math.floor(Math.random() * tauntTargets.length)]);
                } else if (validTargets.length > 0 && Math.random() > 0.5) {
                    targetType = 'card'; tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
                }
                window.executeAttack(targetType, tIndex);
            }, delay);
            delay += 800;
        });

        // --- 召喚＆進化フェーズ ---
        setTimeout(() => {
            let cardsToPlay = [];
            for (let i = cpu.hand.length - 1; i >= 0; i--) {
                let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
                if (cpu.currentMana >= actualCost) {
                    if (card.type === 'action' && cpu.actionUsed) continue;
                    if (card.evolvesFrom) {
                        let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
                        if (targetIndex !== -1) {
                            cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: true, targetIndex: targetIndex });
                            cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                        }
                    } else {
                        cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: false });
                        cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                        if (card.type === 'action') cpu.actionUsed = true;
                    }
                }
            }

            if (cardsToPlay.length > 0) window.renderBattleBoard(); 

            const playNextCard = (idx) => {
                if (idx >= cardsToPlay.length) {
                    finishCPUTurn(); // すべて終わったらターン終了
                    return;
                }
                
                let playData = cardsToPlay[idx];
                let card = playData.card;
                
                window.animateCardPlay(card, false, () => {
                    if (playData.isEvo) {
                        // ★修正：敵CPUも進化元の攻撃権をしっかり引き継ぐ！
                        let prevCard = cpu.field[playData.targetIndex];
                        let canAttackInherit = prevCard ? prevCard.canAttack : false;
                        
                        card.canAttack = canAttackInherit; 
                        cpu.field[playData.targetIndex] = card; 
                        window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else {
                        if (card.type === 'item' || card.type === 'action') { 
                            card.isDead = true; cpu.graveyard.push(card);
                            window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                            window.triggerPlayEffect(card, false); 
                        } else { 
                            card.canAttack = false; cpu.field.push(card); 
                            window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                            window.triggerPlayEffect(card, false); 
                        }
                    }
                    setTimeout(() => { playNextCard(idx + 1); }, 1000); 
                });
            };
            
            playNextCard(0);

            // --- ターン終了処理 ---
            function finishCPUTurn() {
                cpu.field.forEach((c, i) => {
                    if (c.isDead) return;
                    c.status = null; 

                    // ▼▼▼ 自然治癒・CPU側 ▼▼▼
                    if (c.ability === "regeneration" && c.hp < c.maxHp) {
                        let heal = c.maxHp - c.hp; 
                        c.hp = c.maxHp; 
                        window.showVFX(`c-card-${i}`, 'heal', heal);
                    }

                    // ▼▼▼ 霊障・CPU側 ▼▼▼
                    if (c.ability === "haunt") {
                        p.hp -= 20; 
                        window.showVFX('player-face', 'damage', 20);
                        window.showBattleMessage(`👻 【霊障】\n${c.name}の呪いでリーダーに20ダメージ！`, false, 1500, true, true);
                    }

                    if (c.ability === "burn_field" || c.ability === "cataclysm") {
                        let dmg = c.ability === "cataclysm" ? 20 : 10;
                        p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
                    }
                    if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
                    if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
                    if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
                    if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
                    if (c.ability === "event_horizon") {
                        const aliveEnemies = p.field.filter(e => !e.isDead);
                        if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
                    }
                    if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
                        let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
                        cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
                    }
                });
                p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

                window.startPlayerTurn(false);
            }
        }, delay + 500);
    }, 800); 
};

// ==========================================
// ★ 割り込み防御（インタラプト・ディフェンス）＆ キャンセル実装パッチ
// ==========================================

// ① 防御ヒントの文言を「相手ターンへの割り込み」を強調するものに変更
window.showDefendHintModal = function(onConfirm) {
    let modal = document.getElementById('tcg-defend-hint-modal');
    if (!modal) {
        modal = document.createElement('div'); modal.id = 'tcg-defend-hint-modal';
        modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 30000; display: flex; justify-content: center; align-items: center;`;
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="background: #2a2a2a; border: 3px solid #00BCD4; border-radius: 12px; padding: 25px; width: 480px; color: white; font-family: sans-serif; box-shadow: 0 0 30px rgba(0, 188, 212, 0.5);">
            <h3 style="color: #00BCD4; margin-top: 0;">💡 マナが残っています！</h3>
            <p style="line-height: 1.6; font-size: 15px;">
                自分の場のモンスターをクリックすると、<span style="color:#FFD700; font-weight:bold;">1マナ消費して「🛡️守護」の壁役にさせる</span>ことができます。<br>
                （もう一度クリックで解除し、マナを戻せます）<br><br>
                さらに、マナさえ残しておけば<span style="color:#ff5252; font-weight:bold;">相手のターン中であっても、敵の攻撃の瞬間に割り込んで瞬時に守護を立てる</span>ことが可能です！<br>
                あえてマナを残してターンを終了しますか？
            </p>
            <label style="display: flex; align-items: center; margin-bottom: 20px; cursor: pointer; font-size: 14px; color: #ddd; background: #111; padding: 10px; border-radius: 6px;">
                <input type="checkbox" id="defend-hint-checkbox" style="margin-right: 10px; transform: scale(1.3); cursor: pointer;"><span>このバトル中は、次から表示しない</span>
            </label>
            <div style="display: flex; justify-content: space-between; gap: 10px;">
                <button id="btn-hint-cancel" style="flex: 1; padding: 12px; background: #555; color: white; border: 2px solid #777; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#666'" onmouseout="this.style.background='#555'">盤面に戻る</button>
                <button id="btn-hint-ok" style="flex: 1; padding: 12px; background: #FF9800; color: white; border: 2px solid #FFF; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#F57C00'" onmouseout="this.style.background='#FF9800'">ターンを終了する</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    document.getElementById('btn-hint-cancel').onclick = () => { modal.style.display = 'none'; };
    document.getElementById('btn-hint-ok').onclick = () => {
        if (document.getElementById('defend-hint-checkbox').checked) window.TCG_BATTLE._skipDefendHint = true;
        modal.style.display = 'none'; onConfirm(); 
    };
};

// ② プレイヤーカードの選択処理をアップデート（キャンセルと割り込みの許可）
window.selectPlayerCard = function(index) {
    const p = window.TCG_BATTLE.player;
    const targetCard = p.field[index];

    if (targetCard.status === "stunned") {
        window.showBattleMessage("🪨 化石化して動けない！", true); return;
    }

    // ★ 相手ターンの場合、進化や攻撃はできないが、防御（割り込み・解除）だけは許可する
    if (window.TCG_BATTLE.isEnemyTurn) {
        if (targetCard.ability === "taunt") {
            window.showBattleMessage(`このカードは元々【かばう】を持っています。`, false, 1500);
        } else if (targetCard.isDefending) {
            p.currentMana += 1; targetCard.isDefending = false;
            window.showBattleMessage(`🛡️ 防御姿勢を解除し、\n1マナ返還されました。`, false, 1500); window.renderBattleBoard();
        } else if (p.currentMana >= 1) {
            p.currentMana -= 1; targetCard.isDefending = true; 
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); window.showBattleMessage(`🛡️ 相手ターンに割り込み！\n${targetCard.name} が防御姿勢をとった！`, false, 1500); window.renderBattleBoard();
        } else {
            window.showBattleMessage("⚠️ マナが足りないため防御できません！", true);
        }
        return;
    }

    // 進化モードの場合
    if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
        const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
        const actualCost = window.getActualCost(p, evoCard);
        if (targetCard.type === evoCard.evolvesFrom) {
            const canAttackInherit = targetCard.canAttack;
            p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
            window.renderBattleBoard();
            window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`, false, 1500, false, false);
            window.animateCardPlay(evoCard, true, () => {
                evoCard.canAttack = canAttackInherit; 
                p.field[index] = evoCard;  
                window.showVFX(`p-card-${index}`, 'heal', '進化!'); 
                window.triggerPlayEffect(evoCard, true); 
            });
        } else {
            const evoName = window.getEvolvesFromName(evoCard.evolvesFrom);
            window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
        }
        return;
    }

    // 自ターンの攻撃できない/終わったカード、または防御・解除させたい場合
    if (!targetCard.canAttack || targetCard.damage <= 0 || targetCard.isDefending) {
        if (targetCard.ability === "taunt") {
            window.showBattleMessage(`このカードは元々【かばう】を持っています。`, false, 1500);
        } else if (targetCard.isDefending) { 
            // ★ 解除処理
            p.currentMana += 1; targetCard.isDefending = false;
            window.showBattleMessage(`🛡️ 防御姿勢を解除し、\n1マナ返還されました。`, false, 1500); window.renderBattleBoard();
        } else if (p.currentMana >= 1) {
            // ★ 防御設定
            p.currentMana -= 1; targetCard.isDefending = true; 
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`, false, 1500); window.renderBattleBoard();
        } else {
            window.showBattleMessage("⚠️ マナが足りないため防御できません！", true);
        }
        return;
    }

    // 自ターンの攻撃選択
    if (window.TCG_BATTLE.selectedAttackerIndex === index) {
        window.TCG_BATTLE.selectedAttackerIndex = -1;
    } else {
        window.TCG_BATTLE.selectedAttackerIndex = index;
        if (targetCard.status === "charmed") {
            window.TCG_BATTLE.selectedAttackerIndex = -1;
            targetCard.status = null; targetCard.canAttack = false;
            p.hp -= targetCard.damage;
            window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', targetCard.damage);
            window.showBattleMessage(`💕 魅了されていて、味方リーダーを攻撃してしまった！`, true, 2500);
            window.renderBattleBoard();
            setTimeout(() => {
                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); }
            }, 800);
            return;
        }
    }
    window.renderBattleBoard();
};

// ③ CPUターン開始時/終了時に「一時的にアビリティを書き換えるバグ」の温床を削除
window._executeCPUTurnPatch_Interrupt = window.executeCPUTurn; 
window.executeCPUTurn = function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    // ★削除: p.field.forEach(c => { if (c.isDefending) { c._tempOriginalAbility = c.ability; c.ability = "taunt"; } });
    // （元のコードではここで一時的にアビリティを書き換えていたため、次のターン以降も守護が残り続けるバグが発生していました。
    //   攻撃対象の判定で既に c.isDefending は考慮されているため、書き換え自体が不要です）

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => card.canAttack = true);
    window.renderBattleBoard();

    setTimeout(() => {
        let delay = 0;
        
        // --- 攻撃フェーズ ---
        cpu.field.forEach((cpuCard, cpuIndex) => {
            if (!cpuCard.canAttack || cpuCard.damage <= 0) return;
            
            // 魅了チェック
            if (cpuCard.status === "charmed") {
                setTimeout(() => {
                    cpuCard.status = null; cpuCard.canAttack = false;
                    cpu.hp -= cpuCard.damage;
                    window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
                    window.showBattleMessage(`💕 魅了により、敵が自滅攻撃！`, false, 2000, true);
                    window.renderBattleBoard();
                    
                    // ★追加：自滅によってHPが0になった場合の勝利判定
                    if (cpu.hp <= 0) { 
                        cpu.hp = 0; window.renderBattleBoard(); 
                        window.showBattleMessage("🎉 YOU WIN!!\n相手のHPを0にしました！", false, 5000); 
                        setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); 
                    }
                }, delay);
                delay += 800;
                return;
            }
            if (cpuCard.status === "stunned") return;

            setTimeout(() => {
                window.TCG_BATTLE.selectedAttackerIndex = cpuIndex;
                const tauntTargets = p.field.filter(c => c.ability === "taunt" || c.isDefending);
                const validTargets = p.field.filter(c => c.ability !== "stealth"); 
                let targetType = 'player'; let tIndex = 0;
                const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
                
                if (tauntTargets.length > 0 && !isPierce) {
                    targetType = 'card'; tIndex = p.field.indexOf(tauntTargets[Math.floor(Math.random() * tauntTargets.length)]);
                } else if (validTargets.length > 0 && Math.random() > 0.5) {
                    targetType = 'card'; tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
                }
                window.executeAttack(targetType, tIndex);
            }, delay);
            delay += 800;
        });

        setTimeout(() => {
            let cardsToPlay = [];
            for (let i = cpu.hand.length - 1; i >= 0; i--) {
                let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
                if (cpu.currentMana >= actualCost) {
                    if (card.type === 'action' && cpu.actionUsed) continue;
                    if (card.evolvesFrom) {
                        let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
                        if (targetIndex !== -1) {
                            cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: true, targetIndex: targetIndex });
                            cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                        }
                    } else {
                        cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: false });
                        cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                        if (card.type === 'action') cpu.actionUsed = true;
                    }
                }
            }

            if (cardsToPlay.length > 0) window.renderBattleBoard(); 

            const playNextCard = (idx) => {
                if (idx >= cardsToPlay.length) {
                    finishCPUTurn(); // すべて終わったらターン終了
                    return;
                }
                
                let playData = cardsToPlay[idx];
                let card = playData.card;
                
                window.animateCardPlay(card, false, () => {
                    if (playData.isEvo) {
                        let prevCard = cpu.field[playData.targetIndex];
                        let canAttackInherit = prevCard ? prevCard.canAttack : false;
                        
                        // ★追加：CPU側も進化前のステータス変動を引き継ぐ
                        if (prevCard) {
                            const hpDiff = prevCard.hp - prevCard.maxHp;
                            const masterTarget = window.TCG_MASTER[prevCard.masterId];
                            const dmgDiff = prevCard.damage - (masterTarget ? (masterTarget.baseDmg || 0) : 0);
                            
                            card.hp = Math.max(1, card.maxHp + hpDiff);
                            if (card.hp > card.maxHp) card.maxHp = card.hp;
                            card.damage = Math.max(0, card.damage + dmgDiff);
                        }
                        
                        card.canAttack = canAttackInherit; 
                        cpu.field[playData.targetIndex] = card; 
                        window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else {
                        if (card.type === 'item' || card.type === 'action') { 
                            card.isDead = true; cpu.graveyard.push(card);
                            window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                            window.triggerPlayEffect(card, false); 
                        } else { 
                            card.canAttack = false; cpu.field.push(card); 
                            window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                            window.triggerPlayEffect(card, false); 
                        }
                    }
                    setTimeout(() => { playNextCard(idx + 1); }, 1000); 
                });
            };
            
            playNextCard(0);

            function finishCPUTurn() {
                // ★削除: pField.forEach(c => { if (c.isDefending && c._tempOriginalAbility !== undefined) c.ability = c._tempOriginalAbility; });

                cpu.field.forEach((c, i) => {
                    if (c.isDead) return;
                    c.status = null; 
                    if (c.ability === "burn_field" || c.ability === "cataclysm") {
                        let dmg = c.ability === "cataclysm" ? 20 : 10;
                        p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
                    }
                    if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
                    if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
                    if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
                    if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
                    if (c.ability === "event_horizon") {
                        const aliveEnemies = p.field.filter(e => !e.isDead);
                        if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
                    }
                    if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
                        let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
                        cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
                    }
                });
                p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

                window.startPlayerTurn(false);
            }

        }, delay + 500);
    }, 800); 
};

// ④ 相手ターン中でも「防御（解除）可能」なカードにはマウスポインターをつけるパッチ
const _originalRenderBattleBoard_cursorPatch2 = window.renderBattleBoard;
window.renderBattleBoard = function() {
    _originalRenderBattleBoard_cursorPatch2();
    
    const p = window.TCG_BATTLE.player;
    if (window.TCG_BATTLE.isEnemyTurn) {
        const pCards = document.querySelectorAll('#tcg-battle-ui [id^="p-card-"]');
        pCards.forEach((el, index) => {
            const card = p.field[index];
            if (card && card.ability !== "taunt" && !card.isDead && card.status !== 'stunned') {
                // すでに防御中なら解除のためクリック可能、マナが1以上あれば防御のためにクリック可能
                if (card.isDefending || p.currentMana >= 1) {
                    el.style.cursor = "pointer";
                }
            }
        });
    }
};

// ==========================================
// ★ 超絶戦術パッチ：割り込み防御（インタラプト）＆ 守護キャンセル実装
// ==========================================

// 便利な待機関数（名前被りエラー防止のため変更・統一）
window.tcgSleep = window.tcgSleep || (ms => new Promise(r => setTimeout(r, ms)));

// ① 防御ヒントの文言を「相手ターンへの割り込み」を強調するものに変更
window.showDefendHintModal = function(onConfirm) {
    let modal = document.getElementById('tcg-defend-hint-modal');
    if (!modal) {
        modal = document.createElement('div'); modal.id = 'tcg-defend-hint-modal';
        modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 30000; display: flex; justify-content: center; align-items: center;`;
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="background: #2a2a2a; border: 3px solid #00BCD4; border-radius: 12px; padding: 25px; width: 480px; color: white; font-family: sans-serif; box-shadow: 0 0 30px rgba(0, 188, 212, 0.5);">
            <h3 style="color: #00BCD4; margin-top: 0;">💡 マナが残っています！</h3>
            <p style="line-height: 1.6; font-size: 15px;">
                盤面のモンスターをクリックすると、<span style="color:#FFD700; font-weight:bold;">1マナ消費して「🛡️守護」の壁役にさせる</span>ことができます。<br>
                <span style="font-size: 12px; color:#aaa;">※自分のターン中は「行動済み」のモンスターのみ指定可能ですが、<br>
                マナさえ残しておけば、<span style="color:#ff5252; font-weight:bold;">相手のターン中の【割り込み】時に「未行動」のモンスターも守護にできます！</span></span><br><br>
                あえてマナを残してターンを終了しますか？
            </p>
            <label style="display: flex; align-items: center; margin-bottom: 20px; cursor: pointer; font-size: 14px; color: #ddd; background: #111; padding: 10px; border-radius: 6px;">
                <input type="checkbox" id="defend-hint-checkbox" style="margin-right: 10px; transform: scale(1.3); cursor: pointer;"><span>このバトル中は、次から表示しない</span>
            </label>
            <div style="display: flex; justify-content: space-between; gap: 10px;">
                <button id="btn-hint-cancel" style="flex: 1; padding: 12px; background: #555; color: white; border: 2px solid #777; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#666'" onmouseout="this.style.background='#555'">盤面に戻る</button>
                <button id="btn-hint-ok" style="flex: 1; padding: 12px; background: #FF9800; color: white; border: 2px solid #FFF; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.background='#F57C00'" onmouseout="this.style.background='#FF9800'">ターンを終了する</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
    document.getElementById('btn-hint-cancel').onclick = () => { modal.style.display = 'none'; };
    document.getElementById('btn-hint-ok').onclick = () => {
        if (document.getElementById('defend-hint-checkbox').checked) window.TCG_BATTLE._skipDefendHint = true;
        modal.style.display = 'none'; onConfirm(); 
    };
};

// ② プレイヤーカードの選択処理をアップデート（キャンセルと割り込みの許可）
window.selectPlayerCard = function(index) {
    const p = window.TCG_BATTLE.player;
    const targetCard = p.field[index];

    if (targetCard.status === "stunned") {
        window.showBattleMessage("🪨 化石化して動けない！", true); return;
    }

    // ★ 相手ターンの場合（割り込み処理）
    if (window.TCG_BATTLE.isEnemyTurn) {
        if (window.TCG_BATTLE.isIntercepting) {
            // 割り込み画面が出ている時のクリック処理
            if (targetCard.ability === "taunt" || targetCard.isDefending) {
                // 守護モンスターを身代わりとして決定！
                window.finishIntercept('card', index);
            } else if (p.currentMana >= 1 && (!targetCard.canAttack || targetCard.damage <= 0) && targetCard.status !== "stunned") {
                // マナを使ってとっさに守護を追加！
                p.currentMana -= 1; targetCard.isDefending = true;
                window.showVFX(`p-card-${index}`, 'heal', '防御!'); 
                window.renderBattleBoard();
                
                // スルーボタンを消す（守護ができたので必ず受ける必要がある）
                let ui = document.getElementById('tcg-intercept-ui');
                if (ui) {
                    let btn = ui.querySelector('button');
                    if (btn) btn.remove();
                    ui.querySelector('p').innerHTML = "守護モンスターが複数います。<br>どのモンスターで攻撃を受けますか？対象をクリックしてください。";
                }
            } else {
                window.showBattleMessage("⚠️ そのカードは防御や対象に選べません", true);
            }
        }
        return;
    }

    // 進化モードの場合
    if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
        const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
        const actualCost = window.getActualCost(p, evoCard);
        if (targetCard.type === evoCard.evolvesFrom) {
            const canAttackInherit = targetCard.canAttack;
            p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
            window.renderBattleBoard();
            window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`, false, 1500, false, false);
            window.animateCardPlay(evoCard, true, () => {
                evoCard.canAttack = canAttackInherit; 
                p.field[index] = evoCard;  
                window.showVFX(`p-card-${index}`, 'heal', '進化!'); 
                window.triggerPlayEffect(evoCard, true); 
            });
        } else {
            const evoName = window.getEvolvesFromName(evoCard.evolvesFrom);
            window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
        }
        return;
    }

    // ★ 自ターンの防御付与＆キャンセル処理
    if (!targetCard.canAttack || targetCard.damage <= 0 || targetCard.isDefending) {
        if (targetCard.isDefending) { 
            // 【新機能】キャンセルしてマナを返還
            p.currentMana += 1; targetCard.isDefending = false;
            window.showBattleMessage(`🛡️ 防御姿勢を解除し、1マナ戻りました。`, false, 1500); 
            window.renderBattleBoard();
        } else if (targetCard.ability !== "taunt" && p.currentMana >= 1) {
            // 防御付与
            p.currentMana -= 1; targetCard.isDefending = true; 
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); 
            window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`, false, 1500); 
            window.renderBattleBoard();
        } else if (targetCard.ability === "taunt") {
            window.showBattleMessage(`このカードは元々【かばう】を持っています。`, false, 1500);
        }
        return;
    }

    // 自ターンの攻撃選択
    if (window.TCG_BATTLE.selectedAttackerIndex === index) {
        window.TCG_BATTLE.selectedAttackerIndex = -1;
    } else {
        window.TCG_BATTLE.selectedAttackerIndex = index;
        if (targetCard.status === "charmed") {
            window.TCG_BATTLE.selectedAttackerIndex = -1;
            targetCard.status = null; targetCard.canAttack = false;
            p.hp -= targetCard.damage;
            window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', targetCard.damage);
            window.showBattleMessage(`💕 魅了されていて、味方リーダーを攻撃してしまった！`, true, 2500);
            window.renderBattleBoard();
            setTimeout(() => {
                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); }
            }, 800);
            return;
        }
    }
    window.renderBattleBoard();
};

// ③ ターン開始時に「後付けの防御姿勢」を完全リセットする
const _baseStartPlayerTurn = window.startPlayerTurn;
window.startPlayerTurn = function(isFirstTurn = false) {
    const p = window.TCG_BATTLE.player;
    // 自ターン開始時に、後付けの防御姿勢を解除
    p.field.forEach(c => { c.isDefending = false; });
    _baseStartPlayerTurn(isFirstTurn);
};

// ④ 割り込み処理の完了ヘルパー
window.finishIntercept = function(targetType, targetIndex) {
    window.TCG_BATTLE.isIntercepting = false;
    let interceptUI = document.getElementById("tcg-intercept-ui");
    if (interceptUI) interceptUI.remove();
    
    let resolve = window.TCG_BATTLE.interceptResolve;
    if (resolve) {
        window.TCG_BATTLE.interceptResolve = null;
        resolve({ targetType, targetIndex });
    }
};

// ⑤ CPUターン（攻撃フェーズ）を非同期化して、割り込みを可能にする大改修！
window.executeCPUTurn = async function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    // ターン開始時効果
    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => card.canAttack = true);
    window.renderBattleBoard();
    await window.tcgSleep(1000); // ★修正

    // --- 攻撃フェーズ（割り込み待機可能ループ） ---
    for (let cpuIndex = 0; cpuIndex < cpu.field.length; cpuIndex++) {
        let cpuCard = cpu.field[cpuIndex];
        if (!cpuCard || !cpuCard.canAttack || cpuCard.damage <= 0 || cpuCard.isDead) continue;
        
        if (cpuCard.status === "charmed") {
            cpuCard.status = null; cpuCard.canAttack = false;
            cpu.hp -= cpuCard.damage;
            window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
            window.renderBattleBoard();
            await sleep(800);
            continue;
        }
        if (cpuCard.status === "stunned") continue;

        // 攻撃前のアニメーション表示
        window.TCG_BATTLE.selectedAttackerIndex = cpuIndex;
        window.renderBattleBoard();
        
        const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
        
        let targetType = 'player';
        let tIndex = 0;

        if (!isPierce) {
            // ★ プレイヤーの割り込み判断＆待機処理！
            let targetInfo = await new Promise(resolve => {
                const taunts = p.field.filter(c => c.ability === "taunt" || c.isDefending);
                const canTaunt = p.field.some(c => (!c.canAttack || c.damage <= 0) && !c.isDefending && c.ability !== "taunt" && !c.isDead && c.status !== "stunned");
                const hasMana = p.currentMana >= 1;

                // もしオートバトル中なら、自動で判断してスキップ
                if (window.TCG_BATTLE.isAuto) {
                    if (taunts.length > 0) resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[Math.floor(Math.random() * taunts.length)]) });
                    else {
                        const valids = p.field.filter(c => c.ability !== "stealth" && !c.isDead);
                        if (valids.length > 0 && Math.random() > 0.5) resolve({ targetType: 'card', targetIndex: p.field.indexOf(valids[Math.floor(Math.random() * valids.length)]) });
                        else resolve({ targetType: 'player', targetIndex: 0 });
                    }
                    return;
                }

                // マナが残っているか、守護が複数いる場合は「割り込みUI」を表示して時間を止める！
                if ((hasMana && canTaunt) || taunts.length >= 2) {
                    window.TCG_BATTLE.isIntercepting = true;
                    window.TCG_BATTLE.interceptResolve = resolve;

                    let interceptUI = document.createElement('div');
                    interceptUI.id = "tcg-intercept-ui";
                    interceptUI.style.cssText = `position:absolute; top:40%; left:50%; transform:translate(-50%, -50%); background:rgba(0,0,0,0.9); padding:20px 30px; border:4px solid #ff9800; border-radius:12px; z-index:40000; text-align:center; box-shadow:0 0 50px rgba(255,152,0,0.8); pointer-events:auto;`;
                    
                    let html = `<h3 style="color:#ff9800; margin:0 0 15px 0; font-size:24px; text-shadow:0 2px 4px #000;">⚠️ 敵の攻撃！ (${cpuCard.name})</h3>`;
                    
                    if (hasMana && canTaunt) {
                        html += `<p style="color:#fff; font-size:16px; margin-bottom:20px; line-height:1.6;">マナを消費して「守護」を追加できます。<br>どのモンスターで攻撃を受けますか？<br><span style="color:#00BCD4;">盤面の味方をクリックして指定してください。</span></p>`;
                    } else if (taunts.length > 1) {
                        html += `<p style="color:#fff; font-size:16px; margin-bottom:20px; line-height:1.6;">守護モンスターが複数います。<br>どのモンスターで攻撃を受けますか？<br><span style="color:#00BCD4;">盤面の味方をクリックして指定してください。</span></p>`;
                    }

                    // 守護が1体もいない場合だけ「スルー」ボタンを出す
                    if (taunts.length === 0) {
                        html += `<button onclick="window.finishIntercept('player', 0)" style="padding:12px 25px; background:#f44336; color:#fff; border:2px solid #fff; border-radius:8px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.5); transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">守護せずリーダーで受ける</button>`;
                    } else if (taunts.length === 1 && !hasMana) {
                        // マナもなく守護が1体だけの場合は、UIを出さずに自動でそこに吸い寄せる
                        window.TCG_BATTLE.isIntercepting = false;
                        resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[0]) });
                        return; 
                    }
                    
                    interceptUI.innerHTML = html;
                    document.getElementById('tcg-battle-ui').appendChild(interceptUI);
                } else {
                    // 何もできない場合は自動処理
                    if (taunts.length > 0) {
                        resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[0]) });
                    } else {
                        const valids = p.field.filter(c => c.ability !== "stealth" && !c.isDead); 
                        if (valids.length > 0 && Math.random() > 0.5) {
                            resolve({ targetType: 'card', targetIndex: p.field.indexOf(valids[Math.floor(Math.random() * valids.length)]) });
                        } else {
                            resolve({ targetType: 'player', targetIndex: 0 });
                        }
                    }
                }
            });
            
            targetType = targetInfo.targetType;
            tIndex = targetInfo.targetIndex;
            
        } else {
            // 貫通攻撃の場合は割り込み不可。ランダムか顔面へ
            const validTargets = p.field.filter(c => c.ability !== "stealth" && !c.isDead); 
            if (validTargets.length > 0 && Math.random() > 0.5) {
                targetType = 'card';
                tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
            }
        }

        window.executeAttack(targetType, tIndex);
        await sleep(1500); // 攻撃演出が終わるのを待つ
    }

    // --- 召喚＆進化フェーズ ---
    let cardsToPlay = [];
    for (let i = cpu.hand.length - 1; i >= 0; i--) {
        let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
        if (cpu.currentMana >= actualCost) {
            if (card.type === 'action' && cpu.actionUsed) continue;
            if (card.evolvesFrom) {
                let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
                if (targetIndex !== -1) {
                    cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: true, targetIndex: targetIndex });
                    cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                }
            } else {
                cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: false });
                cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                if (card.type === 'action') cpu.actionUsed = true;
            }
        }
    }

    if (cardsToPlay.length > 0) window.renderBattleBoard(); 

    // カードを順番に出す処理
    for (let idx = 0; idx < cardsToPlay.length; idx++) {
        let playData = cardsToPlay[idx]; let card = playData.card;
        
        await new Promise(resolve => {
            window.animateCardPlay(card, false, () => {
                if (playData.isEvo) {
                    let prevCard = cpu.field[playData.targetIndex];
                    let canAttackInherit = prevCard ? prevCard.canAttack : false;
                    
                    card.canAttack = canAttackInherit; 
                    cpu.field[playData.targetIndex] = card; 
                    window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                    window.triggerPlayEffect(card, false); 
                } else {
                    if (card.type === 'item' || card.type === 'action') { 
                        card.isDead = true; cpu.graveyard.push(card);
                        window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else { 
                        card.canAttack = false; cpu.field.push(card); 
                        window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    }
                }
                setTimeout(resolve, 1000); 
            });
        });
    }

    // --- ターン終了処理 ---
    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        c.status = null; 
        if (c.ability === "burn_field" || c.ability === "cataclysm") {
            let dmg = c.ability === "cataclysm" ? 20 : 10;
            p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
        }
        if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
        if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
        if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
        if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
        if (c.ability === "event_horizon") {
            const aliveEnemies = p.field.filter(e => !e.isDead);
            if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
        }
        if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
            let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
            cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
        }
    });
    p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

    if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

    window.startPlayerTurn(false);
};

// ==========================================
// ★ 割り込みUI（インタラプト）視認性＆ダメージ表示 改善パッチ
// ==========================================

// ① プレイヤーカードの選択処理（割り込み中のUIテキスト変更に対応）
window.selectPlayerCard = function(index) {
    const p = window.TCG_BATTLE.player;
    const targetCard = p.field[index];

    if (targetCard.status === "stunned") {
        window.showBattleMessage("🪨 化石化して動けない！", true); return;
    }

    // ★ 相手ターンの場合（割り込み処理）
    if (window.TCG_BATTLE.isEnemyTurn) {
        if (window.TCG_BATTLE.isIntercepting) {
            // 割り込み画面が出ている時のクリック処理
            if (targetCard.ability === "taunt" || targetCard.isDefending) {
                // 守護モンスターを身代わりとして決定！
                window.finishIntercept('card', index);
            } else if (p.currentMana >= 1 && (!targetCard.canAttack || targetCard.damage <= 0) && targetCard.status !== "stunned") {
                // マナを使ってとっさに守護を追加！
                p.currentMana -= 1; targetCard.isDefending = true;
                window.showVFX(`p-card-${index}`, 'heal', '防御!'); 
                window.renderBattleBoard();
                
                // スルーボタンを消す（守護ができたので必ず受ける必要がある）
                let ui = document.getElementById('tcg-intercept-ui');
                if (ui) {
                    let btn = ui.querySelector('button');
                    if (btn) btn.remove();
                    let pElem = ui.querySelector('p');
                    if (pElem) pElem.innerHTML = "守護が複数います。<br><span style='color:#00BCD4; font-weight:bold;'>受ける味方をクリック</span>";
                }
            } else {
                window.showBattleMessage("⚠️ そのカードは防御や対象に選べません", true);
            }
        }
        return;
    }

    // 進化モードの場合
    if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
        const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
        const actualCost = window.getActualCost(p, evoCard);
        if (targetCard.type === evoCard.evolvesFrom) {
            const canAttackInherit = targetCard.canAttack;
            p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
            window.renderBattleBoard();
            window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`, false, 1500, false, false);
            window.animateCardPlay(evoCard, true, () => {
                evoCard.canAttack = canAttackInherit; 
                p.field[index] = evoCard;  
                window.showVFX(`p-card-${index}`, 'heal', '進化!'); 
                window.triggerPlayEffect(evoCard, true); 
            });
        } else {
            const evoName = window.getEvolvesFromName(evoCard.evolvesFrom);
            window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
        }
        return;
    }

    // 自ターンの防御付与＆キャンセル処理
    if (!targetCard.canAttack || targetCard.damage <= 0 || targetCard.isDefending) {
        if (targetCard.isDefending) { 
            p.currentMana += 1; targetCard.isDefending = false;
            window.showBattleMessage(`🛡️ 防御姿勢を解除し、1マナ戻りました。`, false, 1500); 
            window.renderBattleBoard();
        } else if (targetCard.ability !== "taunt" && p.currentMana >= 1) {
            p.currentMana -= 1; targetCard.isDefending = true; 
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); 
            window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`, false, 1500); 
            window.renderBattleBoard();
        } else if (targetCard.ability === "taunt") {
            window.showBattleMessage(`このカードは元々【かばう】を持っています。`, false, 1500);
        }
        return;
    }

    // 自ターンの攻撃選択
    if (window.TCG_BATTLE.selectedAttackerIndex === index) {
        window.TCG_BATTLE.selectedAttackerIndex = -1;
    } else {
        window.TCG_BATTLE.selectedAttackerIndex = index;
        if (targetCard.status === "charmed") {
            window.TCG_BATTLE.selectedAttackerIndex = -1;
            targetCard.status = null; targetCard.canAttack = false;
            p.hp -= targetCard.damage;
            window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', targetCard.damage);
            window.showBattleMessage(`💕 魅了されていて、味方リーダーを攻撃してしまった！`, true, 2500);
            window.renderBattleBoard();
            setTimeout(() => {
                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); }
            }, 800);
            return;
        }
    }
    window.renderBattleBoard();
};


// ② CPUターン（攻撃フェーズの割り込みUI表示を改善）
window.executeCPUTurn = async function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    // ターン開始時効果
    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => card.canAttack = true);
    window.renderBattleBoard();
    await window.tcgSleep(1000); // ★修正

    // --- 攻撃フェーズ ---
    for (let cpuIndex = 0; cpuIndex < cpu.field.length; cpuIndex++) {
        let cpuCard = cpu.field[cpuIndex];
        if (!cpuCard || !cpuCard.canAttack || cpuCard.damage <= 0 || cpuCard.isDead) continue;
        
        if (cpuCard.status === "charmed") {
            cpuCard.status = null; cpuCard.canAttack = false;
            cpu.hp -= cpuCard.damage;
            window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
            window.renderBattleBoard();
            await sleep(800);
            continue;
        }
        if (cpuCard.status === "stunned") continue;

        window.TCG_BATTLE.selectedAttackerIndex = cpuIndex;
        window.renderBattleBoard();
        
        const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
        
        let targetType = 'player';
        let tIndex = 0;

        if (!isPierce) {
            let targetInfo = await new Promise(resolve => {
                const taunts = p.field.filter(c => c.ability === "taunt" || c.isDefending);
                const canTaunt = p.field.some(c => (!c.canAttack || c.damage <= 0) && !c.isDefending && c.ability !== "taunt" && !c.isDead && c.status !== "stunned");
                const hasMana = p.currentMana >= 1;

                if (window.TCG_BATTLE.isAuto) {
                    if (taunts.length > 0) resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[Math.floor(Math.random() * taunts.length)]) });
                    else {
                        const valids = p.field.filter(c => c.ability !== "stealth" && !c.isDead);
                        if (valids.length > 0 && Math.random() > 0.5) resolve({ targetType: 'card', targetIndex: p.field.indexOf(valids[Math.floor(Math.random() * valids.length)]) });
                        else resolve({ targetType: 'player', targetIndex: 0 });
                    }
                    return;
                }

                if ((hasMana && canTaunt) || taunts.length >= 2) {
                    window.TCG_BATTLE.isIntercepting = true;
                    window.TCG_BATTLE.interceptResolve = resolve;

                    let interceptUI = document.createElement('div');
                    interceptUI.id = "tcg-intercept-ui";
                    // ★修正：盤面を隠さないように右端中央に配置し、コンパクトにする
                    interceptUI.style.cssText = `position:absolute; top:50%; right:20px; transform:translateY(-50%); background:rgba(0,0,0,0.9); padding:20px; border:4px solid #ff9800; border-radius:12px; z-index:40000; text-align:center; box-shadow:0 0 30px rgba(255,152,0,0.8); pointer-events:auto; width: 280px;`;
                    
                    // ★修正：敵の名前と「ダメージ数」をはっきり表示する
                    let html = `<h3 style="color:#ff9800; margin:0 0 10px 0; font-size:20px; text-shadow:0 2px 4px #000;">⚠️ 敵の攻撃！</h3>`;
                    html += `<div style="font-size:18px; color:#fff; margin-bottom: 15px; font-weight:bold;">${cpuCard.name}<br><span style="color:#ff5252; font-size:24px;">${cpuCard.damage} ダメージ</span></div>`;
                    
                    if (hasMana && canTaunt) {
                        html += `<p style="color:#ddd; font-size:13px; margin-bottom:15px; line-height:1.4;">マナを消費して「守護」を追加できます。<br><span style="color:#00BCD4; font-weight:bold;">盤面の味方をクリック</span></p>`;
                    } else if (taunts.length > 1) {
                        html += `<p style="color:#ddd; font-size:13px; margin-bottom:15px; line-height:1.4;">守護が複数います。<br><span style="color:#00BCD4; font-weight:bold;">受ける味方をクリック</span></p>`;
                    }

                    if (taunts.length === 0) {
                        html += `<button onclick="window.finishIntercept('player', 0)" style="padding:10px 15px; background:#f44336; color:#fff; border:2px solid #fff; border-radius:8px; font-weight:bold; font-size:14px; cursor:pointer; width:100%; box-shadow:0 4px 10px rgba(0,0,0,0.5); transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">守護せずリーダーで受ける</button>`;
                    } else if (taunts.length === 1 && !hasMana) {
                        window.TCG_BATTLE.isIntercepting = false;
                        resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[0]) });
                        return; 
                    }
                    
                    interceptUI.innerHTML = html;
                    document.getElementById('tcg-battle-ui').appendChild(interceptUI);
                } else {
                    if (taunts.length > 0) {
                        resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[0]) });
                    } else {
                        const valids = p.field.filter(c => c.ability !== "stealth" && !c.isDead); 
                        if (valids.length > 0 && Math.random() > 0.5) {
                            resolve({ targetType: 'card', targetIndex: p.field.indexOf(valids[Math.floor(Math.random() * valids.length)]) });
                        } else {
                            resolve({ targetType: 'player', targetIndex: 0 });
                        }
                    }
                }
            });
            
            targetType = targetInfo.targetType;
            tIndex = targetInfo.targetIndex;
            
        } else {
            const validTargets = p.field.filter(c => c.ability !== "stealth" && !c.isDead); 
            if (validTargets.length > 0 && Math.random() > 0.5) {
                targetType = 'card';
                tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
            }
        }

        window.executeAttack(targetType, tIndex);
        await sleep(1500); 
    }

    // --- 召喚＆進化フェーズ ---
    let cardsToPlay = [];
    for (let i = cpu.hand.length - 1; i >= 0; i--) {
        let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
        if (cpu.currentMana >= actualCost) {
            if (card.type === 'action' && cpu.actionUsed) continue;
            if (card.evolvesFrom) {
                let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
                if (targetIndex !== -1) {
                    cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: true, targetIndex: targetIndex });
                    cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                }
            } else {
                cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: false });
                cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                if (card.type === 'action') cpu.actionUsed = true;
            }
        }
    }

    if (cardsToPlay.length > 0) window.renderBattleBoard(); 

    for (let idx = 0; idx < cardsToPlay.length; idx++) {
        let playData = cardsToPlay[idx]; let card = playData.card;
        
        await new Promise(resolve => {
            window.animateCardPlay(card, false, () => {
                if (playData.isEvo) {
                    let prevCard = cpu.field[playData.targetIndex];
                    let canAttackInherit = prevCard ? prevCard.canAttack : false;
                    
                    card.canAttack = canAttackInherit; 
                    cpu.field[playData.targetIndex] = card; 
                    window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                    window.triggerPlayEffect(card, false); 
                } else {
                    if (card.type === 'item' || card.type === 'action') { 
                        card.isDead = true; cpu.graveyard.push(card);
                        window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else { 
                        card.canAttack = false; cpu.field.push(card); 
                        window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    }
                }
                setTimeout(resolve, 1000); 
            });
        });
    }

    // --- ターン終了処理 ---
    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        c.status = null; 
        if (c.ability === "burn_field" || c.ability === "cataclysm") {
            let dmg = c.ability === "cataclysm" ? 20 : 10;
            p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
        }
        if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
        if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
        if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
        if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
        if (c.ability === "event_horizon") {
            const aliveEnemies = p.field.filter(e => !e.isDead);
            if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
        }
        if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
            let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
            cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
        }
    });
    p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

    if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

    window.startPlayerTurn(false);
};

// ==========================================
// ★ バグ修正パッチ（守護進行ストップ、攻撃表示ズレ、sleep重複エラー）
// ==========================================

// 1. sleep関数の重複エラーを回避
window.tcgSleep = ms => new Promise(r => setTimeout(r, ms));

// 2. 欠落していた「割り込み完了処理（finishIntercept）」を復活
window.finishIntercept = function(targetType, targetIndex) {
    window.TCG_BATTLE.isIntercepting = false;
    let interceptUI = document.getElementById("tcg-intercept-ui");
    if (interceptUI) interceptUI.remove();
    
    let resolve = window.TCG_BATTLE.interceptResolve;
    if (resolve) {
        window.TCG_BATTLE.interceptResolve = null;
        resolve({ targetType, targetIndex });
    }
};

// 3. 盤面描画の修正：敵ターン中に味方のカードが浮き上がるバグを修正
window._originalRenderBattleBoard_fixAttacker = window._originalRenderBattleBoard_fixAttacker || window.renderBattleBoard;
window.renderBattleBoard = function() {
    window._originalRenderBattleBoard_fixAttacker();

    const p = window.TCG_BATTLE.player;
    const cpu = window.TCG_BATTLE.cpu;
    const isEnemyTurn = window.TCG_BATTLE.isEnemyTurn;

    const allPCards = document.querySelectorAll('#tcg-battle-ui [id^="p-card-"]');
    const allCCards = document.querySelectorAll('#tcg-battle-ui [id^="c-card-"]');

    allPCards.forEach((el, index) => {
        const card = p.field[index];
        if (!card) return;
        
        let filter = "grayscale(50%) opacity(70%)";
        let yOffset = "0px";
        let currentScale = el.style.transform.match(/scale\((.*?)\)/) ? el.style.transform.match(/scale\((.*?)\)/)[1] : 0.65;
        let isAttacker = (!isEnemyTurn && window.TCG_BATTLE.selectedAttackerIndex === index);

        if (isAttacker) {
            filter = "drop-shadow(0 0 20px #FFD700)"; 
            yOffset = "-20px"; 
        } else if (card.canAttack && card.status !== 'stunned') {
            filter = "drop-shadow(0 0 10px #4CAF50)"; 
        }

        if (card.isDefending) filter = "drop-shadow(0 0 15px #2196F3)";
        
        // ★ 割り込みUI表示中、選べる「守護」のカードを青く光らせて分かりやすくする！
        if (window.TCG_BATTLE.isIntercepting && (card.ability === 'taunt' || card.isDefending)) {
            filter = "drop-shadow(0 0 20px #00BCD4) brightness(1.2)"; 
        }

        el.style.filter = filter;
        if (!card.isDead && window.TCG_BATTLE.selectedHandCardIndex === -1) { 
             el.style.transform = `scale(${currentScale}) translateY(${yOffset})`;
        }
    });

    allCCards.forEach((el, index) => {
        const card = cpu.field[index];
        if (!card) return;
        
        let isAttacker = (isEnemyTurn && window.TCG_BATTLE.selectedAttackerIndex === index);
        let yOffset = "0px";
        let currentScale = el.style.transform.match(/scale\((.*?)\)/) ? el.style.transform.match(/scale\((.*?)\)/)[1] : 0.65;

        if (isAttacker) {
            yOffset = "20px"; // 敵は手前（下）に迫ってくるように浮き上がる
            el.style.zIndex = "100";
            el.style.filter = "drop-shadow(0 0 20px #ff5252)";
        }

        if (!card.isDead) {
             el.style.transform = `scale(${currentScale}) translateY(${yOffset})`;
        }
    });
};

// 4. CPUターンの sleep を tcgSleep に置き換え
window.executeCPUTurn = async function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => card.canAttack = true);
    window.renderBattleBoard();
    await window.tcgSleep(1000);

    for (let cpuIndex = 0; cpuIndex < cpu.field.length; cpuIndex++) {
        let cpuCard = cpu.field[cpuIndex];
        if (!cpuCard || !cpuCard.canAttack || cpuCard.damage <= 0 || cpuCard.isDead) continue;
        
        if (cpuCard.status === "charmed") {
            cpuCard.status = null; cpuCard.canAttack = false;
            cpu.hp -= cpuCard.damage;
            window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
            window.renderBattleBoard();
            await window.tcgSleep(800);
            continue;
        }
        if (cpuCard.status === "stunned") continue;

        window.TCG_BATTLE.selectedAttackerIndex = cpuIndex;
        window.renderBattleBoard();
        
        const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
        
        let targetType = 'player';
        let tIndex = 0;

        if (!isPierce) {
            let targetInfo = await new Promise(resolve => {
                const taunts = p.field.filter(c => c.ability === "taunt" || c.isDefending);
                const canTaunt = p.field.some(c => (!c.canAttack || c.damage <= 0) && !c.isDefending && c.ability !== "taunt" && !c.isDead && c.status !== "stunned");
                const hasMana = p.currentMana >= 1;

                if (window.TCG_BATTLE.isAuto) {
                    if (taunts.length > 0) resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[Math.floor(Math.random() * taunts.length)]) });
                    else {
                        const valids = p.field.filter(c => c.ability !== "stealth" && !c.isDead);
                        if (valids.length > 0 && Math.random() > 0.5) resolve({ targetType: 'card', targetIndex: p.field.indexOf(valids[Math.floor(Math.random() * valids.length)]) });
                        else resolve({ targetType: 'player', targetIndex: 0 });
                    }
                    return;
                }

                if ((hasMana && canTaunt) || taunts.length >= 2) {
                    window.TCG_BATTLE.isIntercepting = true;
                    window.TCG_BATTLE.interceptResolve = resolve;
                    window.renderBattleBoard(); // ハイライト更新

                    let interceptUI = document.createElement('div');
                    interceptUI.id = "tcg-intercept-ui";
                    interceptUI.style.cssText = `position:absolute; top:50%; right:20px; transform:translateY(-50%); background:rgba(0,0,0,0.9); padding:20px; border:4px solid #ff9800; border-radius:12px; z-index:40000; text-align:center; box-shadow:0 0 30px rgba(255,152,0,0.8); pointer-events:auto; width: 280px;`;
                    
                    let html = `<h3 style="color:#ff9800; margin:0 0 10px 0; font-size:20px; text-shadow:0 2px 4px #000;">⚠️ 敵の攻撃！</h3>`;
                    html += `<div style="font-size:18px; color:#fff; margin-bottom: 15px; font-weight:bold;">${cpuCard.name}<br><span style="color:#ff5252; font-size:24px;">${cpuCard.damage} ダメージ</span></div>`;
                    
                    if (hasMana && canTaunt) {
                        html += `<p style="color:#ddd; font-size:13px; margin-bottom:15px; line-height:1.4;">マナを消費して「守護」を追加できます。<br><span style="color:#00BCD4; font-weight:bold;">盤面の味方をクリック</span></p>`;
                    } else if (taunts.length > 1) {
                        html += `<p style="color:#ddd; font-size:13px; margin-bottom:15px; line-height:1.4;">守護が複数います。<br><span style="color:#00BCD4; font-weight:bold;">受ける味方をクリック</span></p>`;
                    }

                    if (taunts.length === 0) {
                        html += `<button onclick="window.finishIntercept('player', 0)" style="padding:10px 15px; background:#f44336; color:#fff; border:2px solid #fff; border-radius:8px; font-weight:bold; font-size:14px; cursor:pointer; width:100%; box-shadow:0 4px 10px rgba(0,0,0,0.5); transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">守護せずリーダーで受ける</button>`;
                    } else if (taunts.length === 1 && !hasMana) {
                        window.TCG_BATTLE.isIntercepting = false;
                        resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[0]) });
                        return; 
                    }
                    
                    interceptUI.innerHTML = html;
                    document.getElementById('tcg-battle-ui').appendChild(interceptUI);
                } else {
                    if (taunts.length > 0) {
                        resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[0]) });
                    } else {
                        const valids = p.field.filter(c => c.ability !== "stealth" && !c.isDead); 
                        if (valids.length > 0 && Math.random() > 0.5) {
                            resolve({ targetType: 'card', targetIndex: p.field.indexOf(valids[Math.floor(Math.random() * valids.length)]) });
                        } else {
                            resolve({ targetType: 'player', targetIndex: 0 });
                        }
                    }
                }
            });
            
            targetType = targetInfo.targetType;
            tIndex = targetInfo.targetIndex;
            
        } else {
            const validTargets = p.field.filter(c => c.ability !== "stealth" && !c.isDead); 
            if (validTargets.length > 0 && Math.random() > 0.5) {
                targetType = 'card';
                tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
            }
        }

        window.TCG_BATTLE.selectedAttackerIndex = -1; // 攻撃終了でハイライト解除
        window.executeAttack(targetType, tIndex);
        await window.tcgSleep(1500); 

        // ▼▼▼ CPUの連撃対応 ▼▼▼
        if (cpuCard.ability === "double_strike" && cpuCard.canAttack && !cpuCard.isDead) {
            cpuIndex--; // 配列のインデックスを戻して、同じカードにもう一度攻撃させる
        }
    }

    // --- 召喚＆進化フェーズ ---
    let cardsToPlay = [];
    for (let i = cpu.hand.length - 1; i >= 0; i--) {
        let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
        if (cpu.currentMana >= actualCost) {
            if (card.type === 'action' && cpu.actionUsed) continue;
            if (card.evolvesFrom) {
                let targetIndex = cpu.field.findIndex(c => c.type === card.evolvesFrom);
                if (targetIndex !== -1) {
                    cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: true, targetIndex: targetIndex });
                    cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                }
            } else {
                cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: false });
                cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                if (card.type === 'action') cpu.actionUsed = true;
            }
        }
    }

    if (cardsToPlay.length > 0) window.renderBattleBoard(); 

    for (let idx = 0; idx < cardsToPlay.length; idx++) {
        let playData = cardsToPlay[idx]; let card = playData.card;
        
        await new Promise(resolve => {
            window.animateCardPlay(card, false, () => {
                if (playData.isEvo) {
                    let prevCard = cpu.field[playData.targetIndex];
                    let canAttackInherit = prevCard ? prevCard.canAttack : false;
                    
                    card.canAttack = canAttackInherit; 
                    cpu.field[playData.targetIndex] = card; 
                    window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                    window.triggerPlayEffect(card, false); 
                } else {
                    if (card.type === 'item' || card.type === 'action') { 
                        card.isDead = true; cpu.graveyard.push(card);
                        window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else { 
                        card.canAttack = false; cpu.field.push(card); 
                        window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    }
                }
                setTimeout(resolve, 1000); 
            });
        });
    }

    // --- ターン終了処理 ---
    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        c.status = null; 
        if (c.ability === "burn_field" || c.ability === "cataclysm") {
            let dmg = c.ability === "cataclysm" ? 20 : 10;
            p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
        }
        if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
        if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
        if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
        if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
        if (c.ability === "event_horizon") {
            const aliveEnemies = p.field.filter(e => !e.isDead);
            if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
        }
        if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
            let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
            cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
        }
    });
    p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

    if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

    window.startPlayerTurn(false);
};

// ==========================================
// ★ 割り込み防御の完全版 ＆ 進行停止・表示バグ修正パッチ
// ==========================================

// 2. 欠落していた「割り込み完了」の処理関数を復活！
window.finishIntercept = function(targetType, targetIndex) {
    window.TCG_BATTLE.isIntercepting = false;
    let interceptUI = document.getElementById("tcg-intercept-ui");
    if (interceptUI) interceptUI.remove();
    
    let resolve = window.TCG_BATTLE.interceptResolve;
    if (resolve) {
        window.TCG_BATTLE.interceptResolve = null;
        resolve({ targetType, targetIndex });
    }
};

// 3. 盤面描画の修正：敵ターン中に味方のカードが浮き上がるバグを修正
window._originalRenderBattleBoard_fixAttacker = window._originalRenderBattleBoard_fixAttacker || window.renderBattleBoard;
window.renderBattleBoard = function() {
    window._originalRenderBattleBoard_fixAttacker();

    const p = window.TCG_BATTLE.player;
    const cpu = window.TCG_BATTLE.cpu;
    const isEnemyTurn = window.TCG_BATTLE.isEnemyTurn;

    // プレイヤーのカード表示調整
    const allPCards = document.querySelectorAll('#tcg-battle-ui [id^="p-card-"]');
    allPCards.forEach((el, index) => {
        const card = p.field[index];
        if (!card) return;
        
        let filter = "grayscale(50%) opacity(70%)";
        let yOffset = "0px";
        let currentScale = el.style.transform.match(/scale\((.*?)\)/) ? el.style.transform.match(/scale\((.*?)\)/)[1] : 0.65;
        
        // ★修正：自分のターンでのみ「自分が攻撃中」と判定する
        let isAttacker = (!isEnemyTurn && window.TCG_BATTLE.selectedAttackerIndex === index);

        if (isAttacker) {
            filter = "drop-shadow(0 0 20px #FFD700)"; 
            yOffset = "-20px"; 
        } else if (card.canAttack && card.status !== 'stunned') {
            filter = "drop-shadow(0 0 10px #4CAF50)"; 
        }

        if (card.isDefending) filter = "drop-shadow(0 0 15px #2196F3)";
        
        // 割り込みUI表示中、クリックできる「守護」のカードを青く光らせる
        if (window.TCG_BATTLE.isIntercepting) {
            if (window.TCG_BATTLE.interceptPhase === 'adding' && !card.isDefending && card.ability !== "taunt" && card.ability !== "pure_aegis" && card.status !== "stunned") {
                filter = "drop-shadow(0 0 20px #FFD700) brightness(1.2)";
            } else if (window.TCG_BATTLE.interceptPhase === 'selecting' && (card.ability === 'taunt' || card.ability === 'pure_aegis' || card.isDefending)) {
                filter = "drop-shadow(0 0 20px #00BCD4) brightness(1.2)"; // 身代わりにできるカードは青く
            } else {
                filter = "grayscale(80%) opacity(40%)"; // それ以外は暗く
            }
        }

        el.style.filter = filter;
        if (!card.isDead && window.TCG_BATTLE.selectedHandCardIndex === -1) { 
             el.style.transform = `scale(${currentScale}) translateY(${yOffset})`;
        }
    });

    // CPUのカード表示調整
    const allCCards = document.querySelectorAll('#tcg-battle-ui [id^="c-card-"]');
    allCCards.forEach((el, index) => {
        const card = cpu.field[index];
        if (!card) return;
        
        // ★修正：敵のターンでのみ「敵が攻撃中」と判定する
        let isAttacker = (isEnemyTurn && window.TCG_BATTLE.selectedAttackerIndex === index);
        let yOffset = "0px";
        let currentScale = el.style.transform.match(/scale\((.*?)\)/) ? el.style.transform.match(/scale\((.*?)\)/)[1] : 0.65;

        if (isAttacker) {
            yOffset = "20px"; 
            el.style.zIndex = "100";
            el.style.filter = "drop-shadow(0 0 20px #ff5252)";
        }

        if (!card.isDead) {
             el.style.transform = `scale(${currentScale}) translateY(${yOffset})`;
        }
    });
};

// 4. プレイヤーのクリック処理（2段階の割り込みフェーズに対応！）
window.selectPlayerCard = function(index) {
    const p = window.TCG_BATTLE.player;
    const targetCard = p.field[index];

    if (targetCard.status === "stunned") {
        window.showBattleMessage("🪨 化石化して動けない！", true); return;
    }

    // ★ 相手ターンの場合（割り込み処理）
    if (window.TCG_BATTLE.isEnemyTurn) {
        if (window.TCG_BATTLE.isIntercepting) {
            
            // フェーズ1：守護を追加するカードを選ぶ時
            if (window.TCG_BATTLE.interceptPhase === 'adding') {
                if (p.currentMana >= 1 && targetCard.ability !== "taunt" && targetCard.ability !== "pure_aegis" && !targetCard.isDefending) {
                    p.currentMana -= 1; targetCard.isDefending = true;
                    window.showVFX(`p-card-${index}`, 'heal', '防御!'); 
                    window.renderBattleBoard();
                    window.finishIntercept('added', index); // 追加完了として処理を進める
                } else {
                    window.showBattleMessage("⚠️ そのカードは守護にできません！", true);
                }
            } 
            // フェーズ2：身代わりになる守護を選ぶ時
            else if (window.TCG_BATTLE.interceptPhase === 'selecting') {
                if (targetCard.ability === "taunt" || targetCard.ability === "pure_aegis" || targetCard.isDefending) {
                    window.finishIntercept('card', index); // 攻撃対象として決定！
                } else {
                    window.showBattleMessage("⚠️ 守護モンスターを選んでください！", true);
                }
            }
        }
        return;
    }

    // （自ターンの進化処理）
    if (window.TCG_BATTLE.selectedHandCardIndex !== -1) {
        const evoCard = p.hand[window.TCG_BATTLE.selectedHandCardIndex];
        const actualCost = window.getActualCost(p, evoCard);
        if (window.checkCanEvolve(targetCard, evoCard)) {
            const canAttackInherit = targetCard.canAttack;
            
            // ★追加：進化前の「バフ/デバフ・ダメージ」を計算して引き継ぐ
            const hpDiff = targetCard.hp - targetCard.maxHp; 
            const masterTarget = window.TCG_MASTER[targetCard.masterId];
            const dmgDiff = targetCard.damage - (masterTarget ? (masterTarget.baseDmg || 0) : 0);

            p.currentMana -= actualCost; p.hand.splice(window.TCG_BATTLE.selectedHandCardIndex, 1); window.TCG_BATTLE.selectedHandCardIndex = -1;
            window.renderBattleBoard();
            window.showBattleMessage(`✨ ${targetCard.name} は\n${evoCard.name} に進化した！`, false, 1500, false, false);
            window.animateCardPlay(evoCard, true, () => {
                evoCard.canAttack = canAttackInherit; 
                
                // ★追加：進化後カードにステータス変動を適用
                evoCard.hp = Math.max(1, evoCard.maxHp + hpDiff); // ダメージやオーバーヒールを引き継ぐ
                if (evoCard.hp > evoCard.maxHp) evoCard.maxHp = evoCard.hp; // オーバーヒールなら最大HPも更新
                evoCard.damage = Math.max(0, evoCard.damage + dmgDiff); // 攻撃力の増減を引き継ぐ
                
                p.field[index] = evoCard;  
                window.showVFX(`p-card-${index}`, 'heal', '進化!'); 
                window.triggerPlayEffect(evoCard, true); 
            });
        } else {
            const evoName = window.getEvolvesFromName(evoCard); // ★引数変更
            window.showBattleMessage(`⚠️ そのモンスターには進化できません！\n「${evoName}」を選んでください。`, true);
        }
        return;
    }

    // 自ターンの防御付与＆キャンセル処理
    if (!targetCard.canAttack || targetCard.damage <= 0 || targetCard.isDefending) {
        if (targetCard.isDefending) { 
            p.currentMana += 1; targetCard.isDefending = false;
            window.showBattleMessage(`🛡️ 防御姿勢を解除し、1マナ戻りました。`, false, 1500); 
            window.renderBattleBoard();
        } else if (targetCard.ability !== "taunt" && targetCard.ability !== "pure_aegis" && p.currentMana >= 1) {
            p.currentMana -= 1; targetCard.isDefending = true;
            window.showVFX(`p-card-${index}`, 'heal', '防御!'); 
            window.showBattleMessage(`🛡️ 1マナ消費！\n${targetCard.name} が防御姿勢をとった！`, false, 1500); 
            window.renderBattleBoard();
        } else if (targetCard.ability === "taunt" || targetCard.ability === "pure_aegis") {
            window.showBattleMessage(`このカードは元々【かばう】を持っています。`, false, 1500);
        }
        return;
    }

    // 自ターンの攻撃選択
    if (window.TCG_BATTLE.selectedAttackerIndex === index) {
        window.TCG_BATTLE.selectedAttackerIndex = -1;
    } else {
        window.TCG_BATTLE.selectedAttackerIndex = index;
        if (targetCard.status === "charmed") {
            window.TCG_BATTLE.selectedAttackerIndex = -1;
            targetCard.status = null; targetCard.canAttack = false;
            p.hp -= targetCard.damage;
            window.showVFX('player-face', 'slash'); window.showVFX('player-face', 'damage', targetCard.damage);
            window.showBattleMessage(`💕 魅了されていて、味方リーダーを攻撃してしまった！`, true, 2500);
            window.renderBattleBoard();
            setTimeout(() => {
                if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); }
            }, 800);
            return;
        }
    }
    window.renderBattleBoard();
};

// 5. CPUターンの攻撃処理を async/await で直列化し、2段階の割り込みを実現
window.executeCPUTurn = async function(isFirstTurn = false) {
    window.TCG_BATTLE.isEnemyTurn = true;
    window.TCG_BATTLE.isAnimating = true;

    const p = window.TCG_BATTLE.player; const cpu = window.TCG_BATTLE.cpu;

    if (!isFirstTurn && window.TCG_BATTLE.firstPlayer === 'cpu') window.TCG_BATTLE.turn++;

    if (cpu.maxMana < 10) cpu.maxMana++;
    cpu.currentMana = cpu.maxMana; cpu.actionUsed = false; 
    
    if ((!isFirstTurn || window.TCG_BATTLE.firstPlayer === 'player') && cpu.deck.length > 0) {
        cpu.hand.push(cpu.deck.shift());
    }

    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        if (c.ability === "start_draw" && !c.isDead) { if (cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "infinite_gear" && !c.isDead) { while(cpu.hand.length < 5 && cpu.deck.length > 0) cpu.hand.push(cpu.deck.shift()); window.showVFX(`c-card-${i}`, 'heal', 'Draw'); }
        if (c.ability === "star_breath" && !c.isDead) { cpu.maxMana = Math.min(10, cpu.maxMana+2); cpu.currentMana = Math.min(10, cpu.currentMana+2); cpu.hp += 30; window.showVFX('cpu-face', 'heal', 30); }
        if (c.ability === "heaven_judgement" && !c.isDead) {
            p.hp -= 20; window.showVFX('player-face', 'damage', 20);
            p.field.forEach((f, fi) => { if(!f.isDead){ f.hp -= 20; window.showVFX(`p-card-${fi}`, 'damage', 20); window.checkDeath(f, p, `p-card-${fi}`, cpu); } });
        }
    });
    
    cpu.field.forEach(card => { card.canAttack = true; card._has_attacked_once = false; });
    window.renderBattleBoard();
    await window.tcgSleep(1000);

    // --- 攻撃フェーズ ---
    for (let cpuIndex = 0; cpuIndex < cpu.field.length; cpuIndex++) {
        let cpuCard = cpu.field[cpuIndex];
        if (!cpuCard || !cpuCard.canAttack || cpuCard.damage <= 0 || cpuCard.isDead) continue;
        
        if (cpuCard.status === "charmed") {
            cpuCard.status = null; cpuCard.canAttack = false;
            cpu.hp -= cpuCard.damage;
            window.showVFX('cpu-face', 'slash'); window.showVFX('cpu-face', 'damage', cpuCard.damage);
            window.renderBattleBoard();
            await window.tcgSleep(800);
            continue;
        }
        if (cpuCard.status === "stunned") continue;

        // 攻撃前のアニメーション表示
        window.TCG_BATTLE.selectedAttackerIndex = cpuIndex;
        window.renderBattleBoard();
        
        const isPierce = cpuCard.ability === "pierce_recoil" || cpuCard.ability === "flight" || cpuCard.ability === "god_strike" || cpuCard.ability === "dimension_drill" || cpuCard.ability === "piercing_juggernaut";
        
        let targetType = 'player';
        let tIndex = 0;

        if (!isPierce) {
            // ★ プレイヤーの割り込み判断（フェーズ1：追加するか？ → フェーズ2：どれで受けるか？）
            let targetInfo = await new Promise(async resolve => {
                
                const getTaunts = () => p.field.filter(c => c.ability === "taunt" || c.ability === "pure_aegis" || c.isDefending);
                const getCanTaunt = () => p.field.some(c => !c.isDefending && c.ability !== "taunt" && c.ability !== "pure_aegis" && !c.isDead && c.status !== "stunned");
                
                let taunts = getTaunts();
                let canTaunt = getCanTaunt();
                let hasMana = p.currentMana >= 1;

                if (window.TCG_BATTLE.isAuto) {
                    if (taunts.length > 0) resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[Math.floor(Math.random() * taunts.length)]) });
                    else {
                        const valids = p.field.filter(c => c.ability !== "stealth" && !c.isDead);
                        if (valids.length > 0 && Math.random() > 0.5) resolve({ targetType: 'card', targetIndex: p.field.indexOf(valids[Math.floor(Math.random() * valids.length)]) });
                        else resolve({ targetType: 'player', targetIndex: 0 });
                    }
                    return;
                }

                // 【フェーズ1】マナがあり、守護にできるカードがあるなら「追加」を聞く
                if (hasMana && canTaunt) {
                    window.TCG_BATTLE.isIntercepting = true;
                    window.TCG_BATTLE.interceptPhase = 'asking';
                    window.renderBattleBoard();

                    let phase1Result = await new Promise(res1 => {
                        let ui = document.createElement('div');
                        ui.id = "tcg-intercept-ui";
                        ui.style.cssText = `position:absolute; top:50%; right:20px; transform:translateY(-50%); background:rgba(0,0,0,0.9); padding:20px; border:4px solid #ff9800; border-radius:12px; z-index:40000; text-align:center; box-shadow:0 0 30px rgba(255,152,0,0.8); pointer-events:auto; width: 280px;`;
                        ui.innerHTML = `
                            <h3 style="color:#ff9800; margin:0 0 10px 0; font-size:20px;">⚠️ 敵の攻撃！</h3>
                            <div style="font-size:18px; color:#fff; margin-bottom: 15px; font-weight:bold;">${cpuCard.name}<br><span style="color:#ff5252; font-size:24px;">${cpuCard.damage} ダメージ</span></div>
                            <p style="color:#ddd; font-size:13px; margin-bottom:15px;">マナを消費して「守護」を追加しますか？</p>
                            <button id="btn-add-guard" style="padding:10px; background:#00BCD4; color:#fff; border:2px solid #fff; border-radius:8px; font-weight:bold; cursor:pointer; width:100%; margin-bottom:10px;">🛡️ 守護を追加する (1マナ)</button>
                            <button id="btn-skip-guard" style="padding:10px; background:#555; color:#fff; border:2px solid #777; border-radius:8px; font-weight:bold; cursor:pointer; width:100%;">追加しない</button>
                        `;
                        document.getElementById('tcg-battle-ui').appendChild(ui);
                        
                        document.getElementById('btn-add-guard').onclick = () => { ui.remove(); res1('add'); };
                        document.getElementById('btn-skip-guard').onclick = () => { ui.remove(); res1('skip'); };
                    });

                    if (phase1Result === 'add') {
                        window.showBattleMessage("🛡️ 新たに守護にする味方をクリックしてください", false, 3000);
                        await new Promise(res2 => {
                            window.TCG_BATTLE.interceptPhase = 'adding';
                            window.TCG_BATTLE.interceptResolve = res2;
                            window.renderBattleBoard();
                        });
                        // 守護が追加されたのでリストを更新
                        taunts = getTaunts(); 
                    }
                }

                // 【フェーズ2】守護が2体以上なら「どれで受けるか」を聞く
                if (taunts.length >= 2) {
                    window.TCG_BATTLE.isIntercepting = true;
                    window.TCG_BATTLE.interceptPhase = 'selecting';
                    window.renderBattleBoard();
                    
                    let phase2Result = await new Promise(res3 => {
                        window.TCG_BATTLE.interceptResolve = res3;
                        let ui = document.createElement('div');
                        ui.id = "tcg-intercept-ui";
                        ui.style.cssText = `position:absolute; top:50%; right:20px; transform:translateY(-50%); background:rgba(0,0,0,0.9); padding:20px; border:4px solid #ff9800; border-radius:12px; z-index:40000; text-align:center; box-shadow:0 0 30px rgba(255,152,0,0.8); pointer-events:auto; width: 280px;`;
                        ui.innerHTML = `
                            <h3 style="color:#ff9800; margin:0 0 10px 0; font-size:20px;">⚠️ 敵の攻撃！</h3>
                            <div style="font-size:18px; color:#fff; margin-bottom: 15px; font-weight:bold;">${cpuCard.name}<br><span style="color:#ff5252; font-size:24px;">${cpuCard.damage} ダメージ</span></div>
                            <p style="color:#ddd; font-size:13px; margin-bottom:15px;">守護が複数います。<br><span style="color:#00BCD4; font-weight:bold;">身代わりにする味方をクリック！</span></p>
                        `;
                        document.getElementById('tcg-battle-ui').appendChild(ui);
                    });
                    resolve(phase2Result);
                    return;
                } 
                // 守護が1体だけなら自動で受ける
                else if (taunts.length === 1) {
                    window.TCG_BATTLE.isIntercepting = false;
                    resolve({ targetType: 'card', targetIndex: p.field.indexOf(taunts[0]) });
                    return;
                } 
                // 守護が0体ならランダムor顔面へ
                else {
                    window.TCG_BATTLE.isIntercepting = false;
                    const valids = p.field.filter(c => c.ability !== "stealth" && !c.isDead); 
                    if (valids.length > 0 && Math.random() > 0.5) {
                        resolve({ targetType: 'card', targetIndex: p.field.indexOf(valids[Math.floor(Math.random() * valids.length)]) });
                    } else {
                        resolve({ targetType: 'player', targetIndex: 0 });
                    }
                    return;
                }
            });
            
            targetType = targetInfo.targetType;
            tIndex = targetInfo.targetIndex;
            
        } else {
            // 貫通攻撃の場合は守護を無視して攻撃
            const validTargets = p.field.filter(c => c.ability !== "stealth" && !c.isDead); 
            if (validTargets.length > 0 && Math.random() > 0.5) {
                targetType = 'card';
                tIndex = p.field.indexOf(validTargets[Math.floor(Math.random() * validTargets.length)]);
            }
        }

        // ★修正：順番を入れ替え、さらに sleep を tcgWait に変更
        window.executeAttack(targetType, tIndex);
        window.TCG_BATTLE.selectedAttackerIndex = -1; 
        await window.tcgSleep(1500); 
    }

    // --- 召喚＆進化フェーズ ---
    let cardsToPlay = [];
    for (let i = cpu.hand.length - 1; i >= 0; i--) {
        let card = cpu.hand[i]; let actualCost = window.getActualCost(cpu, card);
        if (cpu.currentMana >= actualCost) {
            if (card.type === 'action' && cpu.actionUsed) continue;
            if (card.evolvesFrom) {
                let targetIndex = cpu.field.findIndex(c => window.checkCanEvolve(c, card)); // ★新しい判定に変更
                if (targetIndex !== -1) {
                    cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: true, targetIndex: targetIndex });
                    cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                }
            } else {
                cardsToPlay.push({ handIndex: i, card: card, cost: actualCost, isEvo: false });
                cpu.currentMana -= actualCost; cpu.hand.splice(i, 1);
                if (card.type === 'action') cpu.actionUsed = true;
            }
        }
    }

    if (cardsToPlay.length > 0) window.renderBattleBoard(); 

    for (let idx = 0; idx < cardsToPlay.length; idx++) {
        let playData = cardsToPlay[idx]; let card = playData.card;
        
        await new Promise(resolve => {
            window.animateCardPlay(card, false, () => {
                if (playData.isEvo) {
                    let prevCard = cpu.field[playData.targetIndex];
                    let canAttackInherit = prevCard ? prevCard.canAttack : false;
                    card.canAttack = canAttackInherit; 
                    cpu.field[playData.targetIndex] = card; 
                    window.showBattleMessage(`✨ 敵が ${card.name} に進化した！`, false, 2000, true);
                    window.triggerPlayEffect(card, false); 
                } else {
                    if (card.type === 'item' || card.type === 'action') { 
                        card.isDead = true; cpu.graveyard.push(card);
                        window.showBattleMessage(`✨ 敵が ${card.name} を使用！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    } else { 
                        card.canAttack = (card.ability === "haste"); cpu.field.push(card); 
                        window.showBattleMessage(`🛡️ 敵が ${card.name} を配置！`, false, 2000, true);
                        window.triggerPlayEffect(card, false); 
                    }
                }
                setTimeout(resolve, 1000); 
            });
        });
    }

    // --- ターン終了処理 ---
    cpu.field.forEach((c, i) => {
        if (c.isDead) return;
        c.status = null; 
        if (c.ability === "burn_field" || c.ability === "cataclysm") {
            let dmg = c.ability === "cataclysm" ? 20 : 10;
            p.field.forEach((ec, eidx) => { if(!ec.isDead) { ec.hp -= dmg; window.showVFX(`p-card-${eidx}`, 'damage', dmg); window.checkDeath(ec, p, `p-card-${eidx}`, cpu); } });
        }
        if (c.ability === "absolute_sanctuary") { cpu.field.forEach((ac, aidx) => { if(!ac.isDead) { ac.hp += 20; window.showVFX(`c-card-${aidx}`, 'heal', '聖域'); } }); }
        if (c.ability === "raise_dead" && cpu.graveyard.length > 0) { let res = cpu.graveyard.shift(); res.isDead = false; res.hp = Math.floor((res.maxHp||50)/2); cpu.field.push(res); }
        if (c.ability === "end_heal") { c.hp += 20; window.showVFX(`c-card-${i}`, 'heal', 20); }
        if (c.ability === "cyber_miracle") { cpu.field.forEach((f, fi) => { if(!f.isDead){ f.hp += 100; window.showVFX(`c-card-${fi}`, 'heal', '回復'); } }); }
        if (c.ability === "event_horizon") {
            const aliveEnemies = p.field.filter(e => !e.isDead);
            if (aliveEnemies.length > 0) { let target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)]; target.isDead = true; p.deck.push(target); window.showVFX(`p-card-${p.field.indexOf(target)}`, 'slash', 'バウンス'); }
        }
        if (c.ability === "divine_grace" && cpu.graveyard && cpu.graveyard.length > 0) {
            let resCard = cpu.graveyard.shift(); resCard.isDead = false; resCard.hp = window.TCG_MASTER[resCard.masterId] ? window.TCG_MASTER[resCard.masterId].baseHp : 50;
            cpu.field.push(resCard); window.showVFX('cpu-face', 'heal', '蘇生');
        }
    });
    p.field = p.field.filter(c => !c.isDead); cpu.field = cpu.field.filter(c => !c.isDead);

    if (p.hp <= 0) { p.hp = 0; window.renderBattleBoard(); window.showBattleMessage("💀 YOU LOSE...\nプレイヤーのHPが0になりました。", true, 5000); setTimeout(() => document.getElementById('tcg-battle-ui').style.display = 'none', 5000); return; }

    window.startPlayerTurn(false);
};

// ==========================================
// ★ 開発者モード用：TCGテストツール群
// ==========================================

// ① 全カードリセット
window.tcgDevResetAllCards = function() {
    if(confirm('本当に全カードとデッキをリセットしますか？\n（所持カード、デッキ、解放履歴がすべて消去されます）')) {
        window.TCG = { 
            myCollection: [], 
            decks: [[], [], []], 
            unlockedHistory: {}, 
            deckNames: ["デッキ 1", "デッキ 2", "デッキ 3"], 
            currentDeckIndex: 0 
        };
        window.saveTCGData();
        alert('TCGデータを完全にリセットしました！真っ更な状態です。');
    }
};

// ② カジノ強制オープン（60枚制限を無視）
window.tcgDevOpenCasino = function() {
    // もし myCollection が未定義なら初期化
    if (!window.TCG) window.TCG = { myCollection: [], decks: [[],[],[]] };
    if (!window.TCG.myCollection) window.TCG.myCollection = [];
    
    // 一時的に60枚制限を突破するためのダミーフラグを持たせてカジノを開く
    const originalLength = window.TCG.myCollection.length;
    
    // もし0枚なら、エラーを防ぐためにダミーを1枚だけ入れる（あとで消します）
    let dummyAdded = false;
    if (originalLength === 0) {
        window.TCG.myCollection.push({ dummy: true });
        dummyAdded = true;
    }

    // カジノオープン用のハック（既存のopenCasino関数を強引に実行）
    const tempCollection = window.TCG.myCollection;
    Object.defineProperty(window.TCG, 'myCollection', {
        get: function() { return { length: 999, forEach: tempCollection.forEach.bind(tempCollection), filter: tempCollection.filter.bind(tempCollection) }; },
        configurable: true
    });

    try {
        window.openCasino();
    } catch(e) {
        console.error(e);
        alert("カジノのオープンに失敗しました。");
    }

    // ハックをもとに戻す
    Object.defineProperty(window.TCG, 'myCollection', { value: tempCollection, configurable: true, writable: true });
    if (dummyAdded) window.TCG.myCollection.pop();
};

// ③ 好きなカードを指定枚数追加するリッチUIツール
window.tcgDevAddCardPrompt = function() {
    let existingModal = document.getElementById('tcg-dev-card-adder-modal');
    if (existingModal) existingModal.remove();

    let modal = document.createElement('div');
    modal.id = 'tcg-dev-card-adder-modal';
    modal.style.cssText = `position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:60000; display:flex; justify-content:center; align-items:center; font-family:sans-serif;`;
    
    let raceOptions = [
        {val: 'beetle', label: '🪲 カブトムシ系'},
        {val: 'dragon', label: '🐉 ドラゴン系'},
        {val: 'magician', label: '🧙 魔法使い系'},
        {val: 'spirit', label: '🍃 精霊系'},
        {val: 'stone', label: '🪨 ゴーレム系'},
        {val: 'machine', label: '⚙️ ぜんまい系'},
        {val: 'ghost', label: '👻 ゴースト系'},
        {val: 'bird', label: '🐦 鳥系'},
        {val: 'seed', label: '🌱 つぼみ系'},
        {val: 'balloon', label: '🎈 風船系'},
        {val: 'robot', label: '🤖 ロボット系'},
        {val: 'support', label: '🎒 サポート(魔法/罠等)'}
    ].map(opt => `<option value="${opt.val}">${opt.label}</option>`).join('');

    // カードリストのHTML生成
    let listHtml = Object.keys(window.TCG_MASTER).map(key => {
        let master = window.TCG_MASTER[key];
        let typeName = window.getCardTypeName(master.type);
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px; background:#222; border-radius:6px; border:1px solid #444;">
                <div style="display:flex; flex-direction:column; text-align:left;">
                    <span style="color:#00BCD4; font-size:10px;">ID: ${key}</span>
                    <span style="color:#FFF; font-size:14px; font-weight:bold;">${master.name} <span style="font-size:10px; color:#aaa;">(${typeName})</span></span>
                </div>
                <div style="display:flex; gap:5px;">
                    <button onclick="window._devAddCards('${key}', 1)" style="padding:6px 12px; background:#4CAF50; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer; transition:0.2s;" onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">+1枚</button>
                    <button onclick="window._devAddCards('${key}', 4)" style="padding:6px 12px; background:#2196F3; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer; transition:0.2s;" onmouseover="this.style.background='#1e88e5'" onmouseout="this.style.background='#2196F3'">+4枚</button>
                </div>
            </div>
        `;
    }).join('');

    modal.innerHTML = `
        <div style="background:#1a1a1a; border:3px solid #4CAF50; border-radius:12px; padding:20px; width:600px; max-width:95%; height:80vh; display:flex; flex-direction:column; box-shadow:0 10px 30px rgba(0,0,0,0.8);">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #444; padding-bottom:10px; margin-bottom:15px;">
                <h2 style="color:#4CAF50; margin:0;">➕ テスト用カード追加</h2>
                <button onclick="document.getElementById('tcg-dev-card-adder-modal').remove()" style="background:#f44336; color:#fff; border:none; padding:8px 15px; border-radius:6px; font-weight:bold; cursor:pointer;">閉じる ✖</button>
            </div>
            
            <div style="background:#2a2a2a; padding:15px; border-radius:8px; margin-bottom:15px; border:1px solid #444;">
                <h3 style="color:#FFC107; margin:0 0 10px 0; font-size:16px;">📦 種族一括追加（全進化形態を含む）</h3>
                <div style="display:flex; gap:10px; align-items:center;">
                    <select id="dev-bulk-race-select" style="padding:8px; background:#111; color:white; border:1px solid #555; border-radius:4px; flex:1;">
                        ${raceOptions}
                    </select>
                    <input type="number" id="dev-bulk-count" value="4" min="1" max="10" style="width:60px; padding:8px; background:#111; color:white; border:1px solid #555; border-radius:4px; text-align:center;"> 枚ずつ
                    <button onclick="window._devAddBulkCards()" style="padding:8px 20px; background:#FF9800; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; transition:0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">一括追加</button>
                </div>
            </div>

            <h3 style="color:#00BCD4; margin:0 0 10px 0; font-size:16px;">📝 個別追加リスト</h3>
            <div style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; padding-right:10px; border-top:1px dashed #444; padding-top:10px;">
                ${listHtml}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
};

// 内部の追加処理用関数（トースト通知付き）
window._devAddCards = function(cardId, count, isSilent = false) {
    if(!window.TCG_MASTER[cardId]) return;
    if (!window.TCG.myCollection) window.TCG.myCollection = [];
    for(let i = 0; i < count; i++) {
        let master = window.TCG_MASTER[cardId];
        window.TCG.myCollection.push({
            uid: 'dev_' + cardId + '_' + Date.now() + '_' + i,
            masterId: cardId, 
            name: master.name, 
            type: master.type,
            cost: master.baseCost, 
            hp: master.baseHp, 
            maxHp: master.baseHp,
            skillName: master.skillName, 
            skillCost: master.skillCost,
            damage: master.baseDmg || 0, 
            ability: master.ability,
            image: master.image, 
            imageIndex: master.imageIndex,
            sx: master.sx, sy: master.sy, sw: master.sw, sh: master.sh,
            scaleX: master.scaleX, scaleY: master.scaleY,
            evolvesFrom: master.evolvesFrom
        });
    }
    window.saveTCGData();
    
    if(!isSilent) {
        let toast = document.createElement('div');
        toast.innerHTML = `✅ ${window.TCG_MASTER[cardId].name} を ${count}枚 追加しました`;
        toast.style.cssText = `position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:rgba(76,175,80,0.9); color:white; padding:10px 20px; border-radius:8px; z-index:65000; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.5); pointer-events:none; transition: opacity 0.5s;`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500); }, 1500);
    }
};

window._devAddBulkCards = function() {
    let racePrefix = document.getElementById('dev-bulk-race-select').value;
    let count = parseInt(document.getElementById('dev-bulk-count').value);
    if(isNaN(count) || count <= 0) return;

    let keys = Object.keys(window.TCG_MASTER).filter(k => k.startsWith(racePrefix));
    if (keys.length === 0) return;

    keys.forEach(k => window._devAddCards(k, count, true));
    alert(`${racePrefix} 系の全カード（${keys.length}種）をそれぞれ ${count}枚ずつ 追加しました！\n（現在の総所持数: ${window.TCG.myCollection.length}枚）`);
};

// ==========================================
// ★ 柔軟な進化判定パッチ（分岐進化対応）
// ==========================================
window.checkCanEvolve = function(targetCard, evoCard) {
    if (!evoCard.evolvesFrom) return false;
    
    // ① 完全一致（基本種 -> 第1形態、または直系の進化）
    if (targetCard.type === evoCard.evolvesFrom) return true;

    // ② 柔軟判定（同じ種族・同じ属性なら、第1形態 -> 第2形態 への進化を全て許可）
    let evoBase = evoCard.type.split('_')[0]; // 例: "seed"
    let targetBase = targetCard.type.split('_')[0]; 
    
    let evoAttrMatch = evoCard.type.match(/type\d/); // 例: "type3"
    let targetAttrMatch = targetCard.type.match(/type\d/);

    if (evoBase === targetBase && evoAttrMatch && targetAttrMatch && evoAttrMatch[0] === targetAttrMatch[0]) {
        // マスターデータから進化段階（深さ）を確認
        const targetMaster = Object.values(window.TCG_MASTER).find(m => m.type === targetCard.type);
        const evoMaster = Object.values(window.TCG_MASTER).find(m => m.type === evoCard.type);
        
        if (targetMaster && evoMaster) {
            // targetCardが第1形態（evolvesFromが基本種）で、evoCardが第2形態（evolvesFromが_typeを含む）なら進化OK！
            let isTargetStage1 = targetMaster.evolvesFrom === targetBase;
            let isEvoStage2 = evoMaster.evolvesFrom && evoMaster.evolvesFrom.includes('_type');
            if (isTargetStage1 && isEvoStage2) return true;
        }
    }
    return false;
};

// エラーメッセージの表示名を親切にするパッチ
window.getEvolvesFromName = function(evoCard) {
    let baseEvolves = evoCard.evolvesFrom;
    
    // 進化元が "_type" を含む（＝第2形態へ進化しようとしている）場合
    if (baseEvolves && baseEvolves.includes('_type')) {
        let attrMap = { 'type1': '闇', 'type2': '美', 'type3': '賢', 'type4': '活', 'type5': '老' };
        let attrMatch = baseEvolves.match(/type\d/);
        if (attrMatch && attrMap[attrMatch[0]]) {
            return `同種族の【${attrMap[attrMatch[0]]}属性】のモンスター`;
        }
    }
    
    // 基本種族からの進化の場合の汎用名マップ
    const baseRaceMap = {
        'robot': '基本のロボット',
        'dragon': '基本のドラゴン',
        'magician': '基本の魔法使い',
        'ghost': '基本のゴースト',
        'seed': '基本のつぼみ',
        'spirit': '基本の精霊',
        'stone': '基本のゴーレム',
        'machine': '基本のぜんまい',
        'bird': '基本の鳥',
        'beetle': '基本のかぶとむし',
        'balloon': '基本の風船'
    };

    if (baseRaceMap[baseEvolves]) {
        return baseRaceMap[baseEvolves] + "モンスター";
    }

    // 万が一の保険
    const parentKey = Object.keys(window.TCG_MASTER).find(k => window.TCG_MASTER[k].type === baseEvolves);
    if (parentKey) return window.TCG_MASTER[parentKey].name;
    
    return baseEvolves;
};