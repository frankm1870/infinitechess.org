
// Import Start
import input from '../input.js';
import onlinegame from '../misc/onlinegame.js';
import highlights from './highlights.js';
import stats from '../gui/stats.js';
import perspective from './perspective.js';
import guinavigation from '../gui/guinavigation.js';
import selection from '../chess/selection.js';
import piecesmodel from './piecesmodel.js';
import camera from './camera.js';
import board from './board.js';
import game from '../chess/game.js';
import statustext from '../gui/statustext.js';
import guigameinfo from '../gui/guigameinfo.js';
import colorutil from '../misc/colorutil.js';
import frametracker from './frametracker.js';
import timeutil from '../misc/timeutil.js';
import themes from '../../components/header/themes.js';
import preferences from '../../components/header/preferences.js';
// Import End

"use strict";

/**
 * This script contains adjustable options such as
 * *Board color
 * *Highlight color
 * etc
 */

// When enabled, your view is expanded to show what you normally can't see beyond the edge of the screen.
// Useful for making sure rendering methods are as expected.
let debugMode = false; // Must be toggled by calling toggleDeveloperMode()

let navigationVisible = true;

let theme;

let em = false; // editMode, allows moving pieces anywhere else on the board!

let fps = false;

function initTheme() {
	const selectedThemeName = preferences.getTheme();
	setTheme(selectedThemeName);

	document.addEventListener('theme-change', function(event) { // Custom Event listener.   detail: themeName
		const selectedTheme = event.detail;
		console.log(`Theme change event detected: ${selectedTheme}`);
		setTheme(selectedTheme);
	});
}

function isDebugModeOn() {
	return debugMode;
}

function getNavigationVisible() {
	return navigationVisible;
}

function getTheme() {
	return theme;
}

function toggleDeveloperMode() {
	frametracker.onVisualChange(); // Visual change, render the screen this frame
	debugMode = !debugMode;
	camera.onPositionChange();
	perspective.initCrosshairModel();
	piecesmodel.regenModel(game.getGamefile(), getPieceRegenColorArgs()); // This will regenerate the voids model as wireframe
	statustext.showStatus(`${translations.rendering.toggled_debug} ` + (debugMode ? translations.rendering.on : translations.rendering.off));
}

function disableEM() {
	em = false;
}

function getEM() {
	return em;
}

function isFPSOn() {
	return fps;
}

// Toggles EDIT MODE! editMode
// Called when '1' is pressed!
function toggleEM() {

	// Make sure it's legal
	const legalInPrivate = onlinegame.areInOnlineGame() && onlinegame.getIsPrivate() && input.isKeyHeld('0');
	if (onlinegame.areInOnlineGame() && !legalInPrivate) return; // Don't toggle if in an online game

	frametracker.onVisualChange(); // Visual change, render the screen this frame
	em = !em;
	statustext.showStatus(`${translations.rendering.toggled_edit} ` + (em ? translations.rendering.on : translations.rendering.off));
}

/** Toggles the visibility of the navigation bars. */
function setNavigationBar(value) {
	navigationVisible = value;

	onToggleNavigationBar();
}

function toggleNavigationBar() {
	// We should only ever do this if we are in a game!
	if (!game.getGamefile()) return;
	navigationVisible = !navigationVisible;

	onToggleNavigationBar();
}

function onToggleNavigationBar() {
	if (navigationVisible) {
		guinavigation.open();
		guigameinfo.open();
	}
	else guinavigation.close();

	camera.updatePIXEL_HEIGHT_OF_NAVS();
}

/**
 * Return the color of the specified light or dark tile of our current theme.
 * @param {boolean} isWhite - True if we're wanting the light square color, otherwise dark square
 * @returns 
 */
function getDefaultTiles(isWhite) {
	if (isWhite) return themes.getPropertyOfTheme(theme, 'lightTiles');
	else return themes.getPropertyOfTheme(theme, 'darkTiles');
}

function getLegalMoveHighlightColor({ isOpponentPiece = selection.isOpponentPieceSelected(), isPremove = selection.arePremoving() } = {}) {
	if (isOpponentPiece) return themes.getPropertyOfTheme(theme, 'legalMovesHighlightColor_Opponent');
	else if (isPremove) return themes.getPropertyOfTheme(theme, 'legalMovesHighlightColor_Premove');
	else return themes.getPropertyOfTheme(theme, 'legalMovesHighlightColor_Friendly');
}

function getDefaultSelectedPieceHighlight() {
	return themes.getPropertyOfTheme(theme, 'selectedPieceHighlightColor');
}

function getDefaultLastMoveHighlightColor() {
	return themes.getPropertyOfTheme(theme, 'lastMoveHighlightColor');
}

function getDefaultCheckHighlightColor() {
	return themes.getPropertyOfTheme(theme, 'checkHighlightColor'); 
}

function setTheme(newTheme) {
	if (!themes.isThemeValid(newTheme)) {
		console.error(`Invalid theme "${newTheme}"! Setting to default..`);
		newTheme = themes.defaultTheme;
	}
	theme = newTheme;

	board.updateTheme();
	piecesmodel.regenModel(game.getGamefile(), getPieceRegenColorArgs());
	highlights.regenModel();
}

/**
 * Determines the theme based on the current date.
 * @returns {string} The theme for the current date ('halloween', 'christmas', or 'default').
 */
function getHollidayTheme() {
	if (timeutil.isCurrentDateWithinRange(10, 25, 10, 31)) return 'halloween'; // Halloween week (October 25 to 31)
	// if (timeutil.isCurrentDateWithinRange(11, 23, 11, 29)) return 'thanksgiving'; // Thanksgiving week (November 23 to 29)
	if (timeutil.isCurrentDateWithinRange(12, 19, 12, 25)) return 'christmas'; // Christmas week (December 19 to 25)
	return themes.defaultTheme; // Default theme if not in a holiday week
}

/**
 * Returns the color arrays for the pieces, according to our theme.
 * @returns {Object} An object containing the properties "white", "black", and "neutral".
 */
function getPieceRegenColorArgs() {
	const themeProperties = themes.themes[theme];
	if (!themeProperties.useColoredPieces) return; // Not using colored pieces

	return {
		white: themes.getPropertyOfTheme(theme, 'whitePiecesColor'), // [r,g,b,a]
		black: themes.getPropertyOfTheme(theme, 'blackPiecesColor'),
		neutral: themes.getPropertyOfTheme(theme, 'neutralPiecesColor'),
	};
}

// Returns { r, g, b, a } depending on our current theme!
function getColorOfType(type) {
	const colorArgs = getPieceRegenColorArgs(); // { white, black, neutral }
	if (!colorArgs) return { r: 1, g: 1, b: 1, a: 1 }; // No theme, return default white.

	const pieceColor = colorutil.getPieceColorFromType(type); // white/black/neutral
	const color = colorArgs[pieceColor]; // [r,g,b,a]

	return {
		r: color[0],
		g: color[1],
		b: color[2],
		a: color[3]
	};
}

function toggleFPS() {
	fps = !fps;

	if (fps) stats.showFPS();
	else stats.hideFPS();
}


/*
 * The commented stuff below was ONLY used for fast
 * modifying of theme colors using the keyboard keys!!!
 */

// const allProperties = Object.keys(themes.themes[themes.defaultTheme]);
// let currPropertyIndex = 0;
// let currProperty = allProperties[currPropertyIndex];
// function update() {

// 	const themeProperties = themes.themes[theme];
	
// 	if (input.isKeyDown('u')) {
// 		currPropertyIndex--;
// 		if (currPropertyIndex < 0) currPropertyIndex = allProperties.length - 1;
// 		currProperty = allProperties[currPropertyIndex];
// 		console.log(`Selected property: ${currProperty}`);
// 	}
// 	if (input.isKeyDown('i')) {
// 		currPropertyIndex++;
// 		if (currPropertyIndex > allProperties.length - 1) currPropertyIndex = 0;
// 		currProperty = allProperties[currPropertyIndex];
// 		console.log(`Selected property: ${currProperty}`);
// 	}

// 	const amount = 0.02;

// 	if (input.isKeyDown('j')) {
// 		const dig = 0;
// 		themeProperties[currProperty][dig] += amount;
// 		if (themeProperties[currProperty][dig] > 1) themeProperties[currProperty][dig] = 1;
// 		console.log(themeProperties[currProperty]);
// 	}
// 	if (input.isKeyDown('m')) {
// 		const dig = 0;
// 		themeProperties[currProperty][dig] -= amount;
// 		if (themeProperties[currProperty][dig] < 0) themeProperties[currProperty][dig] = 0;
// 		console.log(themeProperties[currProperty]);
// 	}

// 	if (input.isKeyDown('k')) {
// 		const dig = 1;
// 		themeProperties[currProperty][dig] += amount;
// 		if (themeProperties[currProperty][dig] > 1) themeProperties[currProperty][dig] = 1;
// 		console.log(themeProperties[currProperty]);
// 	}
// 	if (input.isKeyDown(',')) {
// 		const dig = 1;
// 		themeProperties[currProperty][dig] -= amount;
// 		if (themeProperties[currProperty][dig] < 0) themeProperties[currProperty][dig] = 0;
// 		console.log(themeProperties[currProperty]);
// 	}

// 	if (input.isKeyDown('l')) {
// 		const dig = 2;
// 		themeProperties[currProperty][dig] += amount;
// 		if (themeProperties[currProperty][dig] > 1) themeProperties[currProperty][dig] = 1;
// 		console.log(themeProperties[currProperty]);
// 	}
// 	if (input.isKeyDown('.')) {
// 		const dig = 2;
// 		themeProperties[currProperty][dig] -= amount;
// 		if (themeProperties[currProperty][dig] < 0) themeProperties[currProperty][dig] = 0;
// 		console.log(themeProperties[currProperty]);
// 	}

// 	if (input.isKeyDown(';')) {
// 		const dig = 3;
// 		themeProperties[currProperty][dig] += amount;
// 		if (themeProperties[currProperty][dig] > 1) themeProperties[currProperty][dig] = 1;
// 		console.log(themeProperties[currProperty]);
// 	}
// 	if (input.isKeyDown('/')) {
// 		const dig = 3;
// 		themeProperties[currProperty][dig] -= amount;
// 		if (themeProperties[currProperty][dig] < 0) themeProperties[currProperty][dig] = 0;
// 		console.log(themeProperties[currProperty]);
// 	}


// 	if (input.isKeyDown('\\')) {
// 		console.log(JSON.stringify(themes.themes[theme]));
// 	}

// 	board.updateTheme();
// 	piecesmodel.regenModel(game.getGamefile(), getPieceRegenColorArgs());
// 	highlights.regenModel();
// }



export default {
	isDebugModeOn,
	getNavigationVisible,
	setNavigationBar,
	getTheme,
	toggleDeveloperMode,
	toggleEM,
	toggleNavigationBar,
	getDefaultTiles,
	getLegalMoveHighlightColor,
	getDefaultSelectedPieceHighlight,
	getDefaultLastMoveHighlightColor,
	getDefaultCheckHighlightColor,
	getPieceRegenColorArgs,
	getColorOfType,
	getEM,
	toggleFPS,
	disableEM,
	isFPSOn,
	initTheme,
	// update,
};