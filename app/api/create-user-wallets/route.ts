import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		// TODO: Get webflow user email from request body...
		const { payload } = await req.json();
		if (payload === undefined) {
			throw new Error("Payload is undefined!");
		}
		const data = payload?.data;
		const { email } = data;

		// Create user wallet...
		const options = {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
				"x-api-key": process.env.METAKEEP_API_KEY,
			},
			body: JSON.stringify({ user: { email } }),
		};

		const res = await fetch(
			"https://api.metakeep.xyz/v3/getWallet",
			options
		).then((res) => res.json());

		return NextResponse.json({
			message: "User wallet created successfully!",
			email: email,
			...res,
		});
	} catch (err) {
		NextResponse.json(
			{ message: `Error creating user wallet! ${err}` },
			{ status: 500 }
		);
	}
}
