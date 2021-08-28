/** @format */

import { useRouter } from "next/router";
import styled from "styled-components";
import SideBar from "../components/sideBar/sideBar";
import SingleMessage from "../components/singleMessagePage/singleMessage";
import db from "../config/firebase";
import { useSelector } from "react-redux";
import { selectCurrentChattingUser } from "../features/currentChattingUser/currentChattingUserSlice";
import { fragment } from "react";
import Head from "next/head";
import { getChatsInDB } from "../lib/api-util";
import { useCollection } from "react-firebase-hooks/firestore";
import { getUnVerifiedUsersInDb } from "../lib/api-util";

const IndividualUser = (props) => {
	// point to users collection
	const [userMessages, loading, error] = useCollection(
		db?.collection("users").db?.collection(messageId),
	);
	const router = useRouter();
	const { slug } = router.query;
	const user = useSelector(selectCurrentChattingUser);

	return (
		<fragment>
			<Head>
				<title>Chat With: {user?.name}</title>
			</Head>
			<SingleMessage
				chatsInDb={JSON.parse(props?.chats)}
				chatRoomId={slug}
				unVerifiedFriends={JSON?.parse(props?.unVerifiedUsers)}
			/>
		</fragment>
	);
};

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;

	const chatsInDB = await getChatsInDB(slug);
	const unVerifiedUsers = await getUnVerifiedUsersInDb();

	if (!chatsInDB) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			chats: chatsInDB,
			unVerifiedUsers: unVerifiedUsers,
		}, // will be passed to the page component as props
	};
}

export default IndividualUser;
