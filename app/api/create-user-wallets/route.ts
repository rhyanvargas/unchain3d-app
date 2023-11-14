import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
	// TODO: Get webflow user email from request body...
	const { email } = await request.json();
	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
			"x-api-key": process.env.METAKEEP_API_KEY,
		},
		body: JSON.stringify({ user: { email } }),
	};

	// Create user wallet...
	const res = await fetch(
		"https://api.metakeep.xyz/v3/getWallet",
		options
	).then((res) => res.json());

	console.log(res);

	return NextResponse.json(res);
}
