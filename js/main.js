const app = new PIXI.Application({ width: 1320, height: 630 });
document.body.appendChild(app.view);
//statics
const logo = PIXI.Sprite.from('./assets/logo.png'),
	final = PIXI.Sprite.from('./assets/final.png'),
	bg = PIXI.Sprite.from('./assets/back.jpg'),
	table = PIXI.Sprite.from('./assets/table.png'),
	globe = PIXI.Sprite.from('./assets/globe.png'),
	plant = PIXI.Sprite.from('./assets/plant.png'),
	plant2 = PIXI.Sprite.from('./assets/plant2.png'),
	dec1 = PIXI.Sprite.from('./assets/dec_1.png'),
	book = PIXI.Sprite.from('./assets/book_stand.png'),
	sofa = PIXI.Sprite.from('./assets/sofa.png'),
	austin = PIXI.Sprite.from('./assets/austin.png');
bg.width = app.screen.width;
bg.height = app.screen.height;
app.stage.addChild(bg, sofa, table, globe, plant, plant2, book, austin);
//sofa
sofa.anchor.set(0.5);
sofa.x = 220;
sofa.y = app.screen.height - app.screen.height * 0.25;
//table
table.anchor.set(0.5);
table.x = 300;
table.y = app.screen.height - app.screen.height * 0.5;
//globe
globe.anchor.set(0.5);
globe.x = 110;
globe.y = app.screen.height - app.screen.height * 0.65;
//plant
plant.anchor.set(0.5);
plant.x = 500;
plant.y = 50;
//plant
plant2.anchor.set(0.5);
plant2.x = 1140;
plant2.y = 230;
//book
book.anchor.set(0.5);
book.x = 860;
book.y = 70;
//austin
austin.anchor.set(0.5);
austin.x = 700;
austin.y = 240;
//stairs
const stairs = [
		PIXI.Sprite.from('./assets/new_stair_01.png'),
		PIXI.Sprite.from('./assets/new_stair_02.png'),
		PIXI.Sprite.from('./assets/new_stair_03.png')
	],
	stairOld = PIXI.Sprite.from('./assets/old_stair.png'),
  stairSize = 500,
	stairPosition = [1080, 265];
app.stage.addChild(stairOld);
for (let i = 0; i < stairs.length; i++) {
	stairs[i].width = stairSize;
  // stairs[i].height = stairSize;
	stairs[i].anchor.set(0.5);
	stairs[i].position.set(stairPosition[0], stairPosition[1] - 50);
	stairs[i].visible = false;
	stairs[i].alpha = 0;
	app.stage.addChild(stairOld, stairs[i]);
}
//stairOld
stairOld.width = 520;
stairOld.height = 520;
stairOld.anchor.set(0.5);
//stairOld.position.set(stairPosition[0], stairPosition[1]);
stairOld.position.set(1066, 320);
stairOld.visible = true;
//hammer for show menu
const textureHammerBtn = PIXI.Texture.from('./assets/hammer.png'),
	hammerBtn = new PIXI.Sprite(textureHammerBtn);
hammerBtn.anchor.set(0.5);
hammerBtn.x = 1090;
hammerBtn.y = 250;
hammerBtn.visible = false;
hammerBtn.interactive = true;
hammerBtn.buttonMode = true;
hammerBtn.alpha = 0;
app.stage.addChild(hammerBtn);
hammerBtn.on('pointerdown', hummerlick);
function hummerlick() {
	hammerBtn.visible = false;
  showHideMenuBtn();
}
function showHideMenuBtn() {
  for (let i = 0; i < menuButtons.length; i++) {
		menuButtons[i].visible = !menuButtons[i].visible;
	}
	menuButtonsImage1.visible = !menuButtonsImage1.visible ;
	menuButtonsImage2.visible = !menuButtonsImage2.visible ;
	menuButtonsImage3.visible = !menuButtonsImage3.visible ;
}
setTimeout(() => {
	hammerBtn.visible = true;
	animateHummer();
}, 3000);
function animateHummer() {
	if (hammerBtn.alpha < 1) {
		hammerBtn.alpha += 0.02;
		if (hammerBtn.y < 300) {
			hammerBtn.y += 5;
		}
		requestAnimationFrame(animateHummer);
	}
}
//menu
const menuButtonBg = PIXI.Texture.from('./assets/btnbg.png'),
	menuButtonSize = 130,
	menuActiveButton = PIXI.Texture.from('./assets/btnchoosed.png'),
	menuButtons = [],
	menuButtonsImage1 = PIXI.Sprite.from('./assets/01.png'),
	menuButtonsImage2 = PIXI.Sprite.from('./assets/02.png'),
	menuButtonsImage3 = PIXI.Sprite.from('./assets/03.png'),
	menuButtonPositions = [735, 865, 995],
	ok = PIXI.Texture.from('./assets/ok.png'),
	menuButtonConfirm = new PIXI.Sprite(ok);
let choosedStair;
for (let i = 0; i < 3; i++) {
	const button = new PIXI.Sprite(menuButtonBg);
	button.x = menuButtonPositions[i];
	button.y = 5;
	button.id = i;
	button.width = menuButtonSize;
	button.height = menuButtonSize;
	button.interactive = true;
	button.buttonMode = true;
	button.on('pointerdown', menuButtonClick);
	app.stage.addChild(button);
	menuButtons.push(button);
	menuButtons[i].visible = false;
}
menuButtonConfirm.visible = false;
menuButtonConfirm.buttonMode = true;
menuButtonConfirm.interactive = true;

function menuButtonClick() {
	choosedStair = this.id;
	for (let i = 0; i < menuButtons.length; i++) {
		menuButtons[i].texture = menuButtonBg;
	}
	this.texture = menuActiveButton;
	menuButtonConfirm.visible = true;
	menuButtonConfirm.position.set(this.x - 15, 118);
	for (let i = 0; i < stairs.length; i++) {
		stairs[i].visible = false;
    stairs[this.id].alpha = 0;
		stairs[this.id].y = stairPosition[1];
	}
	stairs[this.id].visible = true;
	stairOld.visible = false;
	showStair();
}
menuButtonConfirm.on('pointerdown', confirmStair);
//final show
function confirmStair() {
	final.visible = true;
  showHideMenuBtn();
}
function showStair() {
	if (stairs[choosedStair].alpha < 1) {
		stairs[choosedStair].alpha += 0.02;
		stairs[choosedStair].y += 1;
		requestAnimationFrame(showStair);
	}
}
menuButtonsImage1.position.set(menuButtons[0].x + 23, menuButtons[0].y - 7);
menuButtonsImage2.position.set(menuButtons[1].x + 27, menuButtons[1].y - 8);
menuButtonsImage3.position.set(menuButtons[2].x + 23, menuButtons[2].y + 2);
menuButtonsImage1.visible = false;
menuButtonsImage2.visible = false;
menuButtonsImage3.visible = false;
app.stage.addChild(
	menuButtonsImage1,
	menuButtonsImage2,
	menuButtonsImage3,
	menuButtonConfirm
);
//plant near stair
dec1.anchor.set(0.5);
dec1.x = 1230;
dec1.y = app.screen.height - 100;
app.stage.addChild(dec1);
//final
final.width = app.screen.width;
final.height = app.screen.height;
final.visible = false;
app.stage.addChild(final);
//continue
const textureContinueBtn = PIXI.Texture.from('./assets/continue.png');
const continueBtn = new PIXI.Sprite(textureContinueBtn);
continueBtn.anchor.set(0.5);
continueBtn.x = app.screen.width / 2 - 10;
continueBtn.y = app.screen.height - app.screen.height * 0.15;
continueBtn.interactive = true;
continueBtn.buttonMode = true;
app.stage.addChild(continueBtn);
let elapsed = 0.0;
app.ticker.add((delta) => {
	elapsed += delta / 60;
	const amount = Math.sin(elapsed);
	const scale = 1.0 + 0.09 * amount;
	continueBtn.scale.set(scale);
});
//logo
app.stage.addChild(logo);
