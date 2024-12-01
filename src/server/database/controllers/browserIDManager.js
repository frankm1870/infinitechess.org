

import uuid from "../../../client/scripts/esm/util/uuid.js";
import { isBrowserIDBanned } from "../../middleware/banned.js";
import { logEvents } from "../../middleware/logEvents.js";



const expireOfBrowserIDCookieMillis = 1000 * 60 * 60 * 24 * 7; // 7 days



// ASSUMES they are not logged in
// If they have an existing browser id, it renews it for 7 more days.
// If they don't, it gives them a new browser id for 7 day.
function assignOrRenewBrowserID(req, res) {
	if (!req.cookies['browser-id']) giveBrowserID(res);
	else refreshBrowserID(req, res);
}

function giveBrowserID(res) {

	const cookieName = 'browser-id';
	const id = uuid.generateID(12);

	console.log(`Assigning new browser-id: ${id} --------`);

	// Readable by server with web socket connections, NOT by javascript: MAX AGE IN MILLIS NOT SECS
	res.cookie(cookieName, id, { httpOnly: true, sameSite: 'None', secure: true, maxAge: expireOfBrowserIDCookieMillis /* 1 day */ });
}

function refreshBrowserID(req, res) {

	const cookieName = 'browser-id';
	const id = req.cookies[cookieName];

	if (isBrowserIDBanned(id)) return makeBrowserIDPermanent(req, res, id);

	console.log(`Renewing browser-id: ${id}`);

	// Readable by server with web socket connections, NOT by javascript
	res.cookie(cookieName, id, { httpOnly: true, sameSite: 'None', secure: true, maxAge: expireOfBrowserIDCookieMillis });
}

function makeBrowserIDPermanent(req, res, browserID) {
	// Readable by server with web socket connections, NOT by javascript: MAX AGE IN MILLIS NOT SECS
	res.cookie('browser-id', browserID, { httpOnly: true, sameSite: 'None', secure: true, maxAge: Number.MAX_SAFE_INTEGER /* FOREVER!! */ });

	const logThis = `Making banned browser-id PERMANENT: ${browserID} !!!!!!!!!!!!!!!!!!! ${req.headers.origin}   ${req.method}   ${req.url}   ${req.headers['user-agent']}`;
	logEvents(logThis, 'bannedIPLog.txt', { print: true });
}

export {
	assignOrRenewBrowserID,
};