import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		// Get User - created in webflow...https://docs.developers.webflow.com/v2.0.0-beta/reference/all-events#user_account_added
		const { payload } = await req.json();
		if (payload === undefined) {
			throw new Error("Payload is undefined!");
		}
		const { id: userId, isEmailVerified, status: userStatus } = payload;
		const { email, name } = payload?.data;

		// Get or Create user wallet...
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

		// Did we get Wallets?...
		switch (res.status) {
			case "INVALID_EMAIL":
				throw new Error("Invalid email!");
			case "INVALID_REQUEST":
				throw new Error(
					"The request is not valid e.g. if the request json has unsupported fields."
				);
			case "SOMETHING_WENT_WRONG":
				throw new Error(
					"An unknown error occurred. Please get in touch with us if you continue seeing this error."
				);
		}

		// ...IF success, update Webflow User wallets...
		const { ethAddress, solAddress, eosAddress } = res?.wallet;
		const webflowUserWallets = {
			"eth-address": ethAddress,
			"sol-address": solAddress,
			"eos-address": eosAddress,
		};
		const updateWebflowUserOptions = {
			method: "PATCH",
			headers: {
				accept: "application/json",
				"content-type": "application/json",
			},
			body: JSON.stringify({
				data: { ...webflowUserWallets },
			}),
		};

		fetch(
			`https://api.webflow.com/beta/sites/${process.env.WEBFLOW_SITE_ID}/users/${userId}`,
			updateWebflowUserOptions
		)
			.then((response) => response.json())
			.then((response) => console.log(response))
			.catch((err) => console.error(err));

		// Return response...
		const userData = {
			message: "User wallet created successfully!",
			userId,
			isEmailVerified,
			email,
			name,
			userStatus,
			...res,
		};
		return NextResponse.json(userData);
	} catch (err) {
		NextResponse.json(
			{ message: `Error creating user wallet! ${err}` },
			{ status: 500 }
		);
	}
}
