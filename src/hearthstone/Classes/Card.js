class Card {
    constructor(cardId, name, playerClass, cardSet, type, faction, rarity, cost, attack, health, text, flavor, artist, collectible, elite, race, imgCard, img, imgGold, locale, durability, dbfId, mechanics, howToGetGold, howToGet, armor, classes) {
        if (cardId !== undefined) { this._cardId = cardId; }
        if (name !== undefined) { this._name = name; }
        if (playerClass !== undefined) { this._playerClass = playerClass; }
        if (cardSet !== undefined) { this._cardSet = cardSet; }
        if (type !== undefined) { this._type = type; }
        if (faction !== undefined) { this._faction = faction; }
        if (rarity !== undefined) { this._rarity = rarity; }
        if (cost !== undefined) { this._cost = cost; }
        if (attack !== undefined) { this._attack = attack; }
        if (health !== undefined) { this._health = health; }
        if (text !== undefined) { this._text = text; }
        if (flavor !== undefined) { this._flavor = flavor; }
        if (artist !== undefined) { this._artist = artist; }
        if (collectible !== undefined) { this._collectible = collectible; }
        if (elite !== undefined) { this._elite = elite; }
        if (race !== undefined) { this._race = race; }
        if (imgCard !== undefined) { this._imgCard = imgCard; }
        if (img !== undefined) { this._img = img; }
        if (imgGold !== undefined) { this._imgGold = imgGold; }
        if (locale !== undefined) { this._locale = locale; }
        if (durability !== undefined) { this._durability = durability; }
        if (dbfId !== undefined) { this._dbfId = dbfId; }
        if (mechanics !== undefined) { this._mechanics = mechanics; }
        if (howToGetGold !== undefined) { this._howToGetGold = howToGetGold; }
        if (howToGet !== undefined) { this._howToGet = howToGet; }
        if (armor !== undefined) { this._armor = armor; }
        if (classes !== undefined) { this._classes = classes; }
    }
    get cardId() {
        return this._cardId;
    }
    set cardId(valor) {
        this._cardId = valor;
    }
    get name() {
        return this._name;
    }
    set name(valor) {
        this._name = valor;
    }
    get playerClass() {
        return this._playerClass;
    }
    set playerClass(valor) {
        this._playerClass = valor;
    }
    get cardSet() {
        return this._cardSet;
    }
    set cardSet(valor) {
        this._cardSet = valor;
    }
    get type() {
        return this._type;
    }
    set type(valor) {
        this._type = valor;
    }
    get faction() {
        return this._faction;
    }
    set faction(valor) {
        this._faction = valor;
    }
    get rarity() {
        return this._rarity;
    }
    set rarity(valor) {
        this._rarity = valor;
    }
    get cost() {
        return this._cost;
    }
    set cost(valor) {
        this._cost = valor;
    }
    get attack() {
        return this._attack;
    }
    set attack(valor) {
        this._attack = valor;
    }
    get health() {
        return this._health;
    }
    set health(valor) {
        this._health = valor;
    }
    get text() {
        return this._text;
    }
    set text(valor) {
        this._text = valor;
    }
    get flavor() {
        return this._flavor;
    }
    set flavor(valor) {
        this._flavor = valor;
    }
    get artist() {
        return this._artist;
    }
    set artist(valor) {
        this._artist = valor;
    }
    get collectible() {
        return this._collectible;
    }
    set collectible(valor) {
        this._collectible = valor;
    }
    get elite() {
        return this._elite;
    }
    set elite(valor) {
        this._elite = valor;
    }
    get race() {
        return this._race;
    }
    set race(valor) {
        this._race = valor;
    }
    get imgCard() {
        return this._imgCard;
    }
    set imgCard(valor) {
        this._imgCard = valor;
    }
    get img() {
        return this._img;
    }
    set img(valor) {
        this._img = valor;
    }
    get imgGold() {
        return this._imgGold;
    }
    set imgGold(valor) {
        this._imgGold = valor;
    }
    get locale() {
        return this._locale;
    }
    set locale(valor) {
        this._locale = valor;
    }
    get durability() {
        return this._durability;
    }
    set durability(valor) {
        this._duaribility = valor;
    }
    get dbfId() {
        return this._dbfId;
    }
    set dbfId(valor) {
        this._dbfId = valor;
    }
    get mechanics() {
        return this._mechanics;
    }
    set mechanics(valor) {
        this._mechanics = valor;
    }
    get howToGetGold() {
        return this._howToGetGold;
    }
    set howToGetGold(valor) {
        this._howToGetGold = valor;
    }
    get howToGet() {
        return this._howToGet;
    }
    set howToGet(valor) {
        this._howToGet = valor;
    }
    get armor() {
        return this._armor;
    }
    set armor(valor) {
        this._armor = valor;
    }
    get classes() {
        return this._classes;
    }
    set classes(valor) {
        this._classes = valor;
    }
}
export { Card };