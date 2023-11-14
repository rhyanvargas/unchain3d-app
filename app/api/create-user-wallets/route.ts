import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
	// TODO: Get webflow user email from request body...
	const { email } = await request.json();
	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			"x-api-key": "AhBY/nIJw0ZvN8/iPUP7xbUNTrvcZEKhPKtqApwrDy5V",
		},
		body: JSON.stringify({ user: { email } }),
	};

	// Create user wallet...
	const res = await fetch(
		"https://api.metakeep.xyz/v3/getWallet",
		options
	).then((res) => res.json());

	console.log(res);
	console.log(res);

	return NextResponse.json(res);
}
