/** @format */

import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import db from "../../config/firebase";
import CallIcon from "@material-ui/icons/Call";
import {
	setCurrentChattingUserState,
	selectCurrentChattingUser,
} from "../../features/currentChattingUser/currentChattingUserSlice";
import React, { useEffect, useState } from "react";

const SideBarOption = (props, ref) => {
	const {
		userId,
		name,
		date,
		call,
		email,
		photoURL,
		lastSeen,
		collectionName,
	} = props;
	const dispatch = useDispatch();
	const router = useRouter();

	const user = useSelector(selectCurrentChattingUser);
	const [alternativeImage, setAlternativeImage] = useState(
		"https://lh3.googleusercontent.com/a/AATXAJxvNL0mo2ldUytJDKQLwdUu6Qagh5SbgZnChr5S=s96-c",
	);

	// point to messages collection inside user collection
	const [messagesInDb, setMessagesInDb] = useState([]);

	useEffect(() => {
		if (userId) {
			db?.collection(collectionName)
				?.doc(userId)
				?.collection("messages")
				?.orderBy("timestamp", "desc")
				?.limit(1)
				?.onSnapshot((snapshot) => {
					setMessagesInDb(
						snapshot.docs.map((doc) => {
							return doc.data();
						}),
					);
				});
		}
	}, [userId]);

	const showMessagesHandler = () => {
		if (props?.userId) {
			dispatch(
				setCurrentChattingUserState({
					userId,
					photoURL: photoURL ? photoURL : alternativeImage,
					name,
					date,
					lastSeen,
					collectionName,
				}),
			);

			router.push(`/${props?.userId}`);
		}
	};

	const getRandomNumber = () => {
		const rndInt = Math.floor(Math.random() * 10) + 1;
		return rndInt;
	};

	//  function to truncate(cut) the string if the length of given string
	//   bigger than  given number(n)
	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + " ...." : string;
	};

	return (
		<SideBarOptionWrapper
			onClick={showMessagesHandler}
			style={{
				backgroundColor: props?.firstFriend
					? "rgba(220, 227, 232, 0.5)"
					: "",
			}}>
			<div className='left'>
				<Avatar src={photoURL ? photoURL : alternativeImage} />

				{call && (
					<div className='name time hid-s'>
						<h2 className='name-only' style={{ color: "#DC001A" }}>
							{props?.name}
						</h2>
						<p
							style={{
								fontSize: "0.9rem",
								display: "flex",
								alignItems: "center",
							}}>
							<CallIcon
								style={{ fontSize: "1rem", marginRight: "4px" }}
							/>{" "}
							missed call ({getRandomNumber()})
						</p>
					</div>
				)}
				{!call && (
					<div className='name time hid-s'>
						<h2 className='name-only'>{props?.name}</h2>

						<p style={{ fontSize: "0.8rem" }}>
							{truncate(messagesInDb[0]?.message, 20)}
						</p>
					</div>
				)}
			</div>

			{call && (
				<CheckCircleOutlineIcon
					className='hid-s'
					style={{ color: "#DC001A", fontSize: "1.3rem" }}
				/>
			)}

			{!call && (
				<FiberManualRecordIcon
					style={{ color: "#006aff" }}
					className='hid-s'
				/>
			)}
		</SideBarOptionWrapper>
	);
};

export default SideBarOption;

const SideBarOptionWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	margin-bottom: 1rem;
	/* background-color: rgba(220, 227, 232, 0.5); */
	cursor: pointer;
	transition: 0.3s;
	border-bottom: 1px solid rgba(220, 227, 232, 1);

	@media (max-width: 568px) {
		background-color: transparent;
	}

	&:hover {
		background-color: rgba(220, 227, 232, 1);
		@media (max-width: 568px) {
			background-color: transparent;
		}
	}

	.left {
		display: flex;
		align-items: center;

		.name.time {
			margin-left: 1rem;
		}

		.name-only {
			font-weight: bold;
		}
		.date-only {
			font-size: 0.8rem;
		}
	}

	h2 {
		padding-bottom: 5px;
		font-size: 1.2em;
	}

	p,
	.hid-s {
		@media (max-width: 568px) {
			display: none !important;
		}
	}
`;

// const { userId, name, date, call, email, photoURL, lastSeen } = props;
// 	const dispatch = useDispatch();
// 	const router = useRouter();

// const user = useSelector(selectCurrentChattingUser);
// const [seed, setSeed] = useState("");
// const [confirmedPhotoURL, setConfirmedPhotoURL] = useState(
// 	"https://avatars.dicebear.com/api/human/5.svg",
// );
