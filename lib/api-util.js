/** @format */
import db from "../config/firebase";

export async function getUnVerifiedUsersInDb() {
	// PREPARE users
	const unVerifiedUsersRef = await db
		?.collection("unVerifiedUsers")
		?.orderBy("timestamp", "desc")
		?.limit(15)
		?.get();

	let unVerifiedUsers = await unVerifiedUsersRef?.docs?.map((doc) => ({
		id: doc.id,
		...doc.data(),
		lastSeen: doc?.data()?.lastSeen?.toDate()?.getTime(),
		timestamp: doc?.data()?.timestamp?.toDate()?.getTime(),
	}));

	return JSON.stringify(unVerifiedUsers);
}

export async function getVerifiedUsersInDb() {
	// PREPARE users
	const verifiedUsersRef = await db
		?.collection("verifiedUsers")
		?.orderBy("timestamp", "asc")
		?.limit(15)
		?.get();

	let verifiedUsers = await verifiedUsersRef?.docs?.map((doc) => ({
		id: doc.id,
		...doc.data(),
		lastSeen: doc?.data()?.lastSeen?.toDate()?.getTime(),
		timestamp: doc?.data()?.timestamp?.toDate()?.getTime(),
	}));

	return JSON.stringify(verifiedUsers);
}

export async function getChatsInDb(collectionName, userId) {
	console.log("userId", userId);
	if (collectionName && userId) {
		// PREPARE users
		const chatMessagesRef = await db
			?.collection(collectionName)
			?.doc(userId)
			?.collection("messages")
			?.orderBy("timestamp", "asc")
			?.limit(100)
			?.get();

		const chatMessages = await chatMessagesRef?.docs?.map((doc) => ({
			id: doc?.id,
			...doc?.data(),
			lastSeen: doc?.data()?.lastSeen?.toDate()?.getTime(),
			timestamp: doc?.data()?.timestamp?.toDate()?.getTime(),
		}));

		return JSON.stringify(chatMessages);
	}
}
