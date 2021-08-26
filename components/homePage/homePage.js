/** @format */

import styled from "styled-components";
import Feeds from "../feeds/feeds";
import SideBar from "../sideBar/sideBar";

const HomePageComponent = (props) => {
	return (
		<HomePageComponentWrapper>
			<SideBar unVerifiedFriends={props?.unVerifiedFriends} />
			<Feeds />
		</HomePageComponentWrapper>
	);
};

export default HomePageComponent;

const HomePageComponentWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	max-height: 100vh;
	width: 100vw;
	overflow: hidden;
`;
