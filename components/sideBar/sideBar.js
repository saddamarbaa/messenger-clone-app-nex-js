/** @format */
import styled from "styled-components";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Avatar, IconButton } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SearchIcon from "@material-ui/icons/Search";
import { auth } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setLogOutState, selectUser } from "../../features/user/userSlice";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import NewFriend from "./newFriend";
import AllFriends from "./allFriends";
import { useAuthState } from "react-firebase-hooks/auth";

const SideBar = (props) => {
	const [user, loading] = useAuthState(auth);
	const logInUser = useSelector(selectUser);
	const dispatch = useDispatch();
	const router = useRouter();
	const messageRef = useRef(null);

	const userSignedOutHandler = () => {
		// User is signed out(Remove the user from Firebase)
		if (user) {
			auth
				.signOut()
				.then(() => {
					// Sign-out successful.
				})
				.catch((error) => {
					// An error happened.
				});
			dispatch(setLogOutState());
		}
	};

	// search friends function
	const searchFriendHandler = (event) => {
		event.preventDefault();
		messageRef.current.value = "";

		// Logic goes here
	};

	return (
		<SideBarWrapper>
			<SideBarHeader>
				<div className='left'>
					<IconButton
						className='avatar icons'
						onClick={userSignedOutHandler}>
						<Avatar
							src={
								user?.photoURL
									? user?.photoURL
									: "https://lh3.googleusercontent.com/a/AATXAJxvNL0mo2ldUytJDKQLwdUu6Qagh5SbgZnChr5S=s96-c"
							}
						/>
					</IconButton>
					<h2 className='hid-s'>Chat</h2>
				</div>
				<div className='right'>
					<IconButton className='icons hid-s'>
						<MoreHorizIcon style={{ color: "#006aff" }} />
					</IconButton>
					<IconButton className='icons hid-s'>
						<FiberManualRecordIcon style={{ color: "#006aff" }} />
					</IconButton>
				</div>
			</SideBarHeader>

			<SideBarInput>
				<SearchIcon />
				<form onSubmit={searchFriendHandler}>
					<input
						type='text'
						name=''
						id=''
						ref={messageRef}
						placeholder='Search or add anew friends'
					/>
				</form>
			</SideBarInput>

			{/* Add new friend */}
			<NewFriend />

			{/* Show all friends */}
			<SideBarBottom>
				<AllFriends unVerifiedFriends={props?.unVerifiedFriends} />
			</SideBarBottom>
		</SideBarWrapper>
	);
};

export default SideBar;

const SideBarWrapper = styled.div`
	flex: 0.3;
	max-width: 19rem;
	min-height: 100vh;
	max-height: 100vh;
	background-color: #f8fbfe;
	border-right: 1px solid white;
	overflow: hidden !important;

	.hid-s,
	h3 {
		@media (max-width: 568px) {
			display: none;
		}
	}

	@media (min-width: 501px) {
		min-width: 19rem;
	}

	@media (max-width: 500px) {
		width: 25vw;
	}
`;

const SideBarHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #f8fbfe;
	box-shadow: 10px 0px 3px #00000029;

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
	margin: 1.5rem 1rem;
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
			padding-left: 5px;
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
	max-height: 80vh;
	overflow: hidden;

	&:hover {
		overflow-y: auto;
	}

	@media (max-width: 568px) {
		overflow-y: hidden;
	}
`;
