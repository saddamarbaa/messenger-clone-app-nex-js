/** @format */

import { useRouter } from "next/router";
import styled from "styled-components";
import SideBar from "../components/sideBar/sideBar";

const IndividualUser = () => {
	const router = useRouter();
	const { messageId } = router.query;

	return (
		<individualUserWrapper>
			<SideBar />
		</individualUserWrapper>
	);
};

export default IndividualUser;

const individualUserWrapper = styled.div`
	position: fixed;
	left: 0;
	width: 30vw;
	max-width: 19rem;
	border-right: 1px solid #e5e5e5;
	padding: 1rem 0;
	min-height: 100vh;
	background: red !important;
	/* overflow-x: hidden !important; */
`;
