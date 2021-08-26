/** @format */

import styled from "styled-components";
import Feeds from "../feeds/feeds";
import SideBar from "../sideBar/sideBar";

const SingleMessage = (props) => {
	return (
		<SingleMessagePageWrapper>
			<SideBar />
			<Feeds messageId={props?.messageId} />
		</SingleMessagePageWrapper>
	);
};

export default SingleMessage;

const SingleMessagePageWrapper = styled.div`
	display: flex;
	flex-wrap: nowrap;
	max-height: 100vh;
	width: 100vw;
	overflow: hidden;
`;
