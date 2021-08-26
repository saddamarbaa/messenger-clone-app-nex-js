/** @format */

import { useRouter } from "next/router";
import styled from "styled-components";
import SideBar from "../components/sideBar/sideBar";
import SingleMessage from "../components/singleMessagePage/singleMessage";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../config/firebase";
import { useSelector } from "react-redux";
import { selectCurrentChattingUser } from "../features/currentChattingUser/currentChattingUserSlice";
import { fragment } from "react";
import Head from "next/head";

const IndividualUser = () => {
	const router = useRouter();
	const { messageId } = router.query;

	// point to users collection
	const [userMessages, loading, error] = useCollection(
		db?.collection("users").db?.collection(messageId),
	);
	const user = useSelector(selectCurrentChattingUser);

	return (
		<fragment>
			<Head>
				<title>Chat With: {user?.name}</title>
			</Head>
			<SingleMessage messageId={messageId} />
		</fragment>
	);
};

export default IndividualUser;
