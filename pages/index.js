/** @format */

import Head from "next/head";
import db from "../config/firebase";
import HomePageComponent from "../components/homePage/homePage";
import { fragment } from "react";
import { getVerifiedUsersInDb, getUnVerifiedUsersInDb } from "../lib/api-util";

const HomePage = (props) => {

	return (
		<fragment>
			<Head>
				<title>Messenger Clone app</title>
				<meta
					name='description'
					content='Messenger Clone build with React + Next Js.'
				/>
			</Head>

			<HomePageComponent
				// verifiedFriends={JSON?.parse(props?.verifiedUsers)}
				unVerifiedFriends={JSON?.parse(props?.unVerifiedUsers)}
			/>
		</fragment>
	);
};

export async function getServerSideProps(context) {
	const verifiedUsers = await getVerifiedUsersInDb();
	const unVerifiedUsers = await getUnVerifiedUsersInDb();

	// Pass data to the page via props
	return {
		props: {
			verifiedUsers: verifiedUsers,
			unVerifiedUsers: unVerifiedUsers,
		},
	};
}

export default HomePage;
