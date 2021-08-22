/** @format */
import styled from "styled-components";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Avatar, IconButton } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import SearchIcon from "@material-ui/icons/Search";
import SideBarOption from "./sideBarOption";

const SideBar = () => {
	return (
		<SideBarWrapper>
			<SideBarHeader>
				<div className='left'>
					<IconButton className='avatar icons'>
						<Avatar src='/images/profile.jpg' />
					</IconButton>
					<h3 className='hid-s'>Chat</h3>
				</div>
				<div className='right'>
					<IconButton className='icons hid-s'>
						<MoreHorizIcon />
					</IconButton>
					<IconButton className='icons hid-s'>
						<FiberManualRecordIcon style={{ color: "#006aff" }} />
					</IconButton>
				</div>
			</SideBarHeader>
			<SideBarInput>
				<SearchIcon />
				<form>
					<input
						type='text'
						name=''
						id=''
						placeholder='Search Messenger'
					/>
				</form>
			</SideBarInput>

			{/* Users */}
			<SideBarBottom>
				<SideBarOption name='saddam' date='12,12,43' firstFriend />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' firstFriend />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' firstFriend />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
				<SideBarOption name='saddam' date='12,12,43' />
			</SideBarBottom>
		</SideBarWrapper>
	);
};

export default SideBar;

const SideBarWrapper = styled.div`
	position: fixed;
	left: 0;
	width: 30vw;
	max-width: 19rem;
	border-right: 1px solid #e5e5e5;
	padding: 1rem 0;
	min-height: 100vh;
	/* overflow-x: hidden !important; */

	.hid-s,
	h3 {
		@media (max-width: 568px) {
			display: none;
		}
	}

	@media (max-width: 500px) {
		width: 25vw;
	}
`;

const SideBarHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.left {
		display: flex;
		align-items: center;
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 568px) {
		padding: 1rem;
	}
`;

const SideBarInput = styled.div`
	margin: 1rem;
	display: flex;
	border: 1px solid rgba(220, 227, 232, 0.5);
	background-color: rgba(220, 227, 232, 0.5);
	color: gray;
	border-radius: 1.4rem;
	align-items: center;
	padding: 7px 8px;
	cursor: pointer;
	transition: 0.3s;

	&:hover,
	&:focus {
		border: 1px solid rgba(220, 227, 232);
		background-color: rgba(220, 227, 232);
	}

	form {
		display: flex;
		flex: 1;
		align-items: center;
		overflow: hidden;
		cursor: pointer;

		input {
			flex: 1;
			padding-left: 2px;
			border: none;
			flex: 1;
			outline: none;
			background: transparent;
			font-size: 0.97rem;
		}
	}

	@media (max-width: 568px) {
		display: none;
	}
`;

const SideBarBottom = styled.div`
	max-height: 85vh;
	overflow-y: auto !important;

	@media (max-width: 568px) {
		overflow-y: hidden !important;
	}
`;
