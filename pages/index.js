/** @format */

import Head from "next/head";

import HomePageComponent from "../components/home-page";

const HomePage = (props) => {
	return (
		<div>
			<Head>
				<title>Messenger Clone app</title>
				<meta
					name='description'
					content='Messenger Clone build with React + Next Js.'
				/>
			</Head>
			{/* <HomePageComponent /> */}
		</div>
	);
};

export default HomePage;
