
import coordutil from '../util/coordutil.js';

/** 
 * Type Definitions 
 * @typedef {import('../../util/math.js').BoundingBox} BoundingBox
*/

'use strict';

/**
 * Generates the Omega^4 position example
 * @returns {Object} The position in keys format
 */
function genPositionOfOmegaFourth() {
	const dist = 500; // Generate Omega^4 up to a distance of 50 tiles away

	// King chamber
	const startingPos = {
		'-14,17':'pawnsW',
		'-14,18':'pawnsB',
		'-13,14':'pawnsW',
		'-13,15':'pawnsB',
		'-13,16':'pawnsW',
		'-13,17':'pawnsB',
		'-13,20':'pawnsW',
		'-13,21':'pawnsB',
		'-13,22':'pawnsW',
		'-13,23':'pawnsB',
		'-13,24':'pawnsW',
		'-13,25':'pawnsB',
		'-13,26':'pawnsW',
		'-13,27':'pawnsB',
		'-12,16':'bishopsB',
		'-12,25':'bishopsW',
		'-11,14':'pawnsW',
		'-11,15':'pawnsB',
		'-11,16':'kingsB',
		'-11,17':'pawnsB',
		'-11,24':'pawnsW',
		'-11,25':'kingsW',
		'-11,26':'pawnsW',
		'-11,27':'pawnsB',
		'-10,16':'bishopsB',
		'-10,25':'bishopsW',
		'-9,14':'pawnsW',
		'-9,15':'pawnsB',
		'-9,16':'pawnsW',
		'-9,17':'pawnsB',
		'-9,18':'pawnsW',
		'-9,19':'pawnsB',
		'-9,20':'pawnsW',
		'-9,21':'pawnsB',
		'-9,22':'pawnsW',
		'-9,23':'pawnsB',
		'-9,24':'pawnsW',
		'-9,25':'pawnsB',
		'-9,26':'pawnsW',
		'-9,27':'pawnsB',
	};

	// Rook towers

	const startOfRookTowers = {
		'0,3': 'pawnsW',
		'0,4': 'pawnsB',
		'0,5': 'pawnsW',
		'0,6': 'pawnsB',
		'0,11': 'pawnsW',
		'0,12': 'pawnsB',
		'1,4': 'bishopsW',
		'1,12': 'bishopsW',
		'1,13': 'rooksB',
		'2,1': 'pawnsW',
		'2,2': 'pawnsB',
		'2,3': 'pawnsW',
		'2,4': 'pawnsB',
		'2,5': 'pawnsW',
		'2,6': 'pawnsB',
		'2,7': 'pawnsW',
		'2,8': 'pawnsW',
		'2,9': 'pawnsW',
		'2,10': 'pawnsW',
		'2,11': 'pawnsW',
		'2,12': 'pawnsB',
		'3,2': 'bishopsW',
		'3,4': 'bishopsB',
		'3,6': 'pawnsW',
		'3,7': 'pawnsB',
		'3,8': 'bishopsW',
		'3,9': 'pawnsW',
		'3,10': 'bishopsW',
		'3,12': 'bishopsW',
		'3,14': 'bishopsW',
		'4,1': 'pawnsW',
		'4,2': 'pawnsB',
		'4,3': 'pawnsW',
		'4,4': 'pawnsB',
		'4,7': 'pawnsW',
		'4,8': 'pawnsB',
		'4,9': 'bishopsW',
		'4,11': 'bishopsW',
		'4,13': 'bishopsW',
		'4,15': 'bishopsW',
		'4,16': 'rooksB',
		'5,4': 'pawnsW',
		'5,5': 'pawnsB',
		'5,8': 'pawnsW',
		'5,9': 'pawnsB',
		'5,10': 'pawnsW',
		'5,11': 'pawnsW',
		'5,12': 'pawnsW',
		'5,13': 'pawnsW',
		'5,14': 'pawnsW',
		'5,15': 'pawnsB',
	};

	const keys = Object.keys(startOfRookTowers);
	for (const key of keys) {
		startingPos[key] = startOfRookTowers[key];
	}

	appendPawnTower(startingPos, 0, 13, dist);
	appendPawnTower(startingPos, 2, 13, dist);
	appendPawnTower(startingPos, 3, 16, dist);
	appendPawnTower(startingPos, 5, 16, dist);

	spawnAllRookTowers(startingPos, 6, 3, dist + 3, dist);

	// Bishop Cannon Battery

	startingPos[coordutil.getKeyFromCoords([0,-6])] = 'pawnsB';
	startingPos[coordutil.getKeyFromCoords([0,-7])] = 'pawnsW';

	spawnAllBishopCannons(startingPos, 1, -7, dist, -dist);

	spawnAllWings(startingPos, -1, -7, -dist, -dist);

	addVoidSquaresToOmegaFourth(startingPos, -866, 500, 567, -426, -134);

	return startingPos;

	function appendPawnTower(startingPos, x, startY, endY) {
		if (endY < startY) return; // Don't do negative pawn towers
        
		for (let y = startY; y <= endY; y++) {
			const thisCoords = [x,y];
			const key = coordutil.getKeyFromCoords(thisCoords);
			startingPos[key] = "pawnsW";
		}
	}
        
	function setAir(startingPos, coords) {
		const key = coordutil.getKeyFromCoords(coords);
		delete startingPos[key];
	}
        
	function spawnRookTower(startingPos, xStart, yStart, dist) {
        
		// First wall with 4 bishops
		startingPos[coordutil.getKeyFromCoords([xStart,yStart])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([xStart,yStart + 1])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([xStart,yStart + 2])] = 'pawnsW';
		if (yStart + 3 <= dist) startingPos[coordutil.getKeyFromCoords([xStart,yStart + 3])] = 'pawnsB';
		if (yStart + 6 <= dist) startingPos[coordutil.getKeyFromCoords([xStart,yStart + 6])] = 'pawnsW';
		if (yStart + 7 <= dist) startingPos[coordutil.getKeyFromCoords([xStart,yStart + 7])] = 'pawnsB';
		if (yStart + 8 <= dist) startingPos[coordutil.getKeyFromCoords([xStart,yStart + 8])] = 'bishopsW';
		if (yStart + 9 <= dist) startingPos[coordutil.getKeyFromCoords([xStart,yStart + 9])] = 'pawnsW';
		if (yStart + 10 <= dist) startingPos[coordutil.getKeyFromCoords([xStart,yStart + 10])] = 'bishopsW';
		if (yStart + 12 <= dist) startingPos[coordutil.getKeyFromCoords([xStart,yStart + 12])] = 'bishopsW';
		if (yStart + 14 <= dist) startingPos[coordutil.getKeyFromCoords([xStart,yStart + 14])] = 'bishopsW';
		appendPawnTower(startingPos, xStart, yStart + 16, dist);
        
		// Second wall with rook
		startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 1])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 2])] = 'pawnsB';
		if (yStart + 3 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 3])] = 'pawnsW';
		if (yStart + 4 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 4])] = 'pawnsB';
		if (yStart + 7 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 7])] = 'pawnsW';
		if (yStart + 8 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 8])] = 'pawnsB';
		if (yStart + 9 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 9])] = 'bishopsW';
		if (yStart + 11 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 11])] = 'bishopsW';
		if (yStart + 13 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 13])] = 'bishopsW';
		if (yStart + 15 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 15])] = 'bishopsW';
		if (yStart + 16 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 1,yStart + 16])] = 'rooksB';
        
		// Third pawn wall
		startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 2])] = 'pawnsW';
		if (yStart + 3 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 3])] = 'pawnsB';
		if (yStart + 4 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 4])] = 'pawnsW';
		if (yStart + 5 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 5])] = 'pawnsB';
		if (yStart + 8 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 8])] = 'pawnsW';
		if (yStart + 9 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 9])] = 'pawnsB';
		if (yStart + 10 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 10])] = 'pawnsW';
		if (yStart + 11 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 11])] = 'pawnsW';
		if (yStart + 12 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 12])] = 'pawnsW';
		if (yStart + 13 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 13])] = 'pawnsW';
		if (yStart + 14 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 14])] = 'pawnsW';
		if (yStart + 15 <= dist) startingPos[coordutil.getKeyFromCoords([xStart + 2,yStart + 15])] = 'pawnsB';
		appendPawnTower(startingPos, xStart + 2, yStart + 16, dist);
	}
    
	function spawnAllRookTowers(startingPos, xStart, yStart, xEnd, yEnd) {
		let y = yStart;
		for (let x = xStart; x < xEnd; x += 3) {
			spawnRookTower(startingPos, x, y, yEnd);
			y += 3; // Increment y as well!
		}
	}

	function spawnAllBishopCannons(startingPos, startX, startY, endX, endY) {
		const spacing = 7;

		let currX = startX;
		let currY = startY;
		let i = 0;
		do {
			genBishopCannon(startingPos, currX, currY, i);

			currX += spacing;
			currY -= spacing;
			i++;
		} while (currX < endX && currY > endY);
	}

	function genBishopCannon(startingPos, x, y, i) {

		// Pawn staples that never change
		startingPos[coordutil.getKeyFromCoords([x,y])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x,y - 1])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x + 1,y - 1])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x + 1,y - 2])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x + 2,y - 2])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x + 2,y - 3])] = 'pawnsW';
		if (y - 3 - x + 3 > -980) startingPos[coordutil.getKeyFromCoords([x + 3,y - 3])] = 'pawnsB';
		if (y - 4 - x + 3 > -980) startingPos[coordutil.getKeyFromCoords([x + 3,y - 4])] = 'pawnsW';
		if (y - 5 - x + 4 > -980) startingPos[coordutil.getKeyFromCoords([x + 4,y - 4])] = 'pawnsB';
		if (y - 3 - x + 4 > -980) startingPos[coordutil.getKeyFromCoords([x + 4,y - 5])] = 'pawnsW';
		if (y - 4 - x + 5 > -980) startingPos[coordutil.getKeyFromCoords([x + 5,y - 3])] = 'pawnsB';
		if (y - 4 - x + 5 > -980) startingPos[coordutil.getKeyFromCoords([x + 5,y - 4])] = 'pawnsW';
		if (y - 2 - x + 6 > -980) startingPos[coordutil.getKeyFromCoords([x + 6,y - 2])] = 'pawnsB';
		if (y - 3 - x + 6 > -980) startingPos[coordutil.getKeyFromCoords([x + 6,y - 3])] = 'pawnsW';
		if (y - 1 - x + 7 > -980) startingPos[coordutil.getKeyFromCoords([x + 7,y - 1])] = 'pawnsB';
		if (y - 2 - x + 7 > -980) startingPos[coordutil.getKeyFromCoords([x + 7,y - 2])] = 'pawnsW';
		if (y + 1 - x + 7 > -980) startingPos[coordutil.getKeyFromCoords([x + 7,y + 1])] = 'pawnsB';
		if (y + 0 - x + 7 > -980) startingPos[coordutil.getKeyFromCoords([x + 7,y + 0])] = 'pawnsW';
		if (y - 2 - x + 8 > -980) startingPos[coordutil.getKeyFromCoords([x + 8,y - 2])] = 'bishopsB';
        
		if (y - 6 - x + 6 > -980) startingPos[coordutil.getKeyFromCoords([x + 6,y - 6])] = 'pawnsB';
		if (y - 7 - x + 6 > -980) startingPos[coordutil.getKeyFromCoords([x + 6,y - 7])] = 'pawnsW';
		if (y - 5 - x + 7 > -980) startingPos[coordutil.getKeyFromCoords([x + 7,y - 5])] = 'pawnsB';
		if (y - 6 - x + 7 > -980) startingPos[coordutil.getKeyFromCoords([x + 7,y - 6])] = 'pawnsW';
		if (y - 4 - x + 8 > -980) startingPos[coordutil.getKeyFromCoords([x + 8,y - 4])] = 'pawnsB';
		if (y - 5 - x + 8 > -980) startingPos[coordutil.getKeyFromCoords([x + 8,y - 5])] = 'pawnsW';
		if (y - 3 - x + 9 > -980) startingPos[coordutil.getKeyFromCoords([x + 9,y - 3])] = 'pawnsB';
		if (y - 4 - x + 9 > -980) startingPos[coordutil.getKeyFromCoords([x + 9,y - 4])] = 'pawnsW';

		// Generate bishop puzzle pieces.
		// it tells us how many to iteratively gen!
		const count = i + 2;

		let puzzleX = x + 8;
		let puzzleY = y + 2;
		const upDiag = puzzleY - puzzleX;
		if (upDiag > -990) {
			for (let a = 1; a <= count; a++) {
				const isLastIndex = a === count;
				genBishopPuzzlePiece(startingPos, puzzleX, puzzleY, isLastIndex);

				puzzleX += 1;
				puzzleY += 1;
			}
		}

		// White pawn strip
		let pawnX = x + 4;
		let pawnY = y;
		for (let a = 0; a < i; a++) {
			startingPos[coordutil.getKeyFromCoords([pawnX,pawnY])] = 'pawnsW';

			pawnX++;
			pawnY++;
		}
	}

	function genBishopPuzzlePiece(startingPos, x, y, isLastIndex) {
		startingPos[coordutil.getKeyFromCoords([x,y])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x,y - 1])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x,y - 2])] = 'bishopsB';
		startingPos[coordutil.getKeyFromCoords([x + 1,y - 2])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x + 1,y - 3])] = 'bishopsB';
		startingPos[coordutil.getKeyFromCoords([x + 2,y - 4])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x + 2,y - 5])] = 'pawnsW';

		if (!isLastIndex) return;

		// Is last index
		startingPos[coordutil.getKeyFromCoords([x + 1,y - 2])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x + 1,y - 1])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x + 2,y - 3])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x + 2,y - 2])] = 'pawnsB';
	}

	function spawnAllWings(startingPos, startX, startY, endX, endY) {
		const spacing = 8;

		let currX = startX;
		let currY = startY;
		let i = 0;
		do {
			spawnWing(startingPos, currX, currY, i);

			currX -= spacing;
			currY -= spacing;
			i++;
		} while (currX > endX && currY > endY);
	}

	function spawnWing(startingPos, x, y, i) {
		startingPos[coordutil.getKeyFromCoords([x,y])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x,y - 1])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 1,y - 1])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 1,y - 2])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 2,y - 2])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 2,y - 3])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 3,y - 3])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 3,y - 4])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 4,y - 4])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 4,y - 5])] = 'pawnsW';
        
		// Generate segments
		// it tells us how many to iteratively gen!
		const count = i + 1;
		const segSpacing = 6;

		let segX = x - 5;
		let segY = y - 8;
		for (let a = 1; a <= count; a++) {
			const isLastIndex = a === count;
			genWingSegment(startingPos, segX, segY, isLastIndex);

			segX -= segSpacing;
			segY += segSpacing;
		}

		setAir(startingPos, [x - 6,y - 8]);
		setAir(startingPos, [x - 6,y - 9]);
		setAir(startingPos, [x - 5,y - 9]);
		setAir(startingPos, [x - 5,y - 10]);
	}

	function genWingSegment(startingPos, x, y, isLastIndex) {
		startingPos[coordutil.getKeyFromCoords([x,y - 2])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x,y - 1])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 1,y - 1])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 1,y + 0])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 0])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 1])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 3,y + 1])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 3,y + 2])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 4,y + 2])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 4,y + 3])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 3])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 4])] = 'pawnsB';

		startingPos[coordutil.getKeyFromCoords([x,y + 2])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x,y + 3])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 1,y + 3])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 1,y + 4])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 4])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 5])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 6])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 7])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 8])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 9])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 10])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 2,y + 11])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 3,y + 11])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 3,y + 12])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 4,y + 12])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 4,y + 13])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 11])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 12])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 10])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 9])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 8])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 7])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 4,y + 7])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 4,y + 6])] = 'pawnsW';
		startingPos[coordutil.getKeyFromCoords([x - 4,y + 10])] = 'bishopsW';

		if (!isLastIndex) return;

		// Is last wing segment!
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 6])] = 'pawnsB';
		startingPos[coordutil.getKeyFromCoords([x - 5,y + 5])] = 'pawnsW';
	}
}

function addVoidSquaresToOmegaFourth(startingPos, left, top, right, bottomright, bottomleft) {

	for (let x = left; x <= right; x++) {
		const key = coordutil.getKeyFromCoords([x,top]);
		startingPos[key] = 'voidsN';
	}
	for (let y = top; y >= bottomright; y--) {
		const key = coordutil.getKeyFromCoords([right,y]);
		startingPos[key] = 'voidsN';
	}

	let y = bottomright;
	for (let x = right; x >= -3; x--) {
		let key = coordutil.getKeyFromCoords([x,y]);
		startingPos[key] = 'voidsN';
		key = coordutil.getKeyFromCoords([x,y - 1]);
		startingPos[key] = 'voidsN';
		y--;
	}

	for (let y = top; y >= bottomleft; y--) {
		const key = coordutil.getKeyFromCoords([left,y]);
		startingPos[key] = 'voidsN';
	}
	y = bottomleft;
	for (let x = left; x <= -4; x++) {
		let key = coordutil.getKeyFromCoords([x,y]);
		startingPos[key] = 'voidsN';
		key = coordutil.getKeyFromCoords([x,y - 1]);
		startingPos[key] = 'voidsN';
		y--;
	}

	startingPos[`492,493`] = 'voidsN';
}

export default {
	genPositionOfOmegaFourth
};