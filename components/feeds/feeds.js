/** @format */
import styled from "styled-components";
import firebase from "firebase";
import { Avatar, IconButton } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VideocamIcon from "@material-ui/icons/Videocam";
import Image from "next/image";
import GifIcon from "@material-ui/icons/Gif";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Message from "./message";
import { useRef } from "react";
import { useSelector } from "react-redux";
import db, { auth } from "../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { selectCurrentChattingUser } from "../../features/currentChattingUser/currentChattingUserSlice";
import { selectUser } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { useAuthState } from "react-firebase-hooks/auth";
import FlipMove from "react-flip-move";

const Feeds = (props) => {
	const [chatInDB, setChatInDB] = useState(props?.chatsInDb);

	// point to messages collection inside user collection
	const [chatInDbByUseCollection, loading, error] = useCollection(
		db
			?.collection("unVerifiedUsers")
			?.doc(props?.messageId)
			?.collection("messages")
			?.orderBy("timestamp", "asc")
			?.limit(100),
	);

	const currentChattingUser = useSelector(selectCurrentChattingUser);
	const messageRef = useRef(null);
	const autoScrollToBottomRef = useRef(null);
	const [user] = useAuthState(auth);

	useEffect(() => {
		if (!props?.chatRoomId) {
			return;
		}

		const unsubscribe = db
			?.collection("unVerifiedUsers")
			?.doc(props?.chatRoomId)
			?.collection("messages")
			?.orderBy("timestamp", "asc")
			?.limit(100)
			?.onSnapshot((snapshot) => {
				setChatInDB(
					snapshot?.docs?.map((doc) => {
						return {
							id: doc.id,
							...doc.data(),
							timestamp: doc?.data()?.timestamp?.toDate()?.getTime(),
						};
					}),
				);
			});

		return () => {
			unsubscribe();
		};
	}, [props?.chatRoomId]);

	// Auto Scroll functionality
	useEffect(
		() => {
			// Auto Scroll functionality
			autoScrollToBottomRef?.current?.scrollIntoView({
				behavior: "smooth",
			});
		},
		[props?.chatRoomId],
		loading,
	);

	const sendMessageHandler = (event) => {
		event.preventDefault();
		if (props?.chatRoomId) {
			db?.collection("unVerifiedUsers")
				?.doc(props?.chatRoomId)
				?.collection("messages")
				?.add({
					message: messageRef?.current?.value,
					name: user?.displayName ? user?.displayName : "Unknown user",
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				})
				.then((docRef) => {
					console.log("Document written with ID: ", docRef.id);
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
				});
		} else {
			return;
		}

		// Auto Scroll functionality
		autoScrollToBottomRef?.current?.scrollIntoView({
			behavior: "smooth",
		});

		messageRef.current.value = "";
	};

	return (
		<FeedWrapper>
			<FeedsHeader>
				<div className='left'>
					<IconButton className='avatar icons'>
						<Avatar
							src={
								currentChattingUser?.photoURL
									? currentChattingUser?.photoURL
									: "/images/messenger-logo.svg"
							}
						/>
					</IconButton>
					<div className='name-last-seen'>
						<h4 className='hid-s'>{currentChattingUser?.name}</h4>
						{currentChattingUser?.date && (
							<span>
								Last active:{" "}
								<TimeAgo date={currentChattingUser?.date} />
							</span>
						)}
					</div>
				</div>
				<div className='right'>
					<CallIcon className='icons hid-s' />
					<VideocamIcon className='icons hid-s' />
					<MoreHorizIcon className='icons hid-s' />
				</div>
				<CallIcon className='icons hid-s hid-m call' />
			</FeedsHeader>
			<FeedsLogo>
				<Image
					src='/images/messenger-logo.svg'
					alt='Picture of the messenger'
					width={90}
					height={90}
					objectFit='contain'
				/>
			</FeedsLogo>
			<FeedsChatBody>
				<FlipMove>
					{/* Loop through all the messages  */}
					{chatInDB?.map((doc, index) => (
						<Message
							key={doc?.id}
							message={doc?.message}
							name={doc?.name}
							photoURL={doc?.photoURL}
							date={doc?.timestamp}
						/>
					))}
				</FlipMove>

				{/* Empty div for auto scroll */}
				<div
					ref={autoScrollToBottomRef}
					style={{ paddingBottom: "100px" }}
					className='auto-scroll'></div>
			</FeedsChatBody>

			<FeedsChatFooter>
				<AddCircleIcon className='icon hids' />
				<InsertPhotoIcon className='icon hids' />
				<AddAPhotoIcon className='icon hids' />
				<GifIcon className='icon hids' style={{ fontSize: "2.5rem" }} />
				<form onSubmit={sendMessageHandler}>
					<label htmlFor='message'></label>
					{!props?.chatRoomId && (
						<input
							type='text'
							id='message'
							required
							ref={messageRef}
							placeholder={`Select friend to start chat`}
							disabled={!props?.chatRoomId}
						/>
					)}
					{props?.chatRoomId && (
						<input
							type='text'
							id='message'
							required
							ref={messageRef}
							placeholder={`Aa`}
							disabled={!props?.chatRoomId}
						/>
					)}

					<SentimentDissatisfiedIcon className='icon' />
				</form>

				<ThumbUpIcon className='icon hids' />
			</FeedsChatFooter>
		</FeedWrapper>
	);
};

export default Feeds;

const FeedWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-bottom: 2rem;
`;

const FeedsHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #f8fbfe;
	box-shadow: 10px 0px 3px #00000029;

	@media (max-width: 768px) {
		justify-content: flex-end;
	}

	.left {
		display: flex;
		align-items: center;

		@media (max-width: 568px) {
			display: none;
		}

		h4 {
			padding-top: 2px;
			font-weight: normal;
		}

		.name-last-seen {
			@media (max-width: 768px) {
				display: none;
			}
		}

		span {
			font-size: 0.9rem;
		}
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: center;

		@media (max-width: 568px) {
			display: none;
		}

		.icons.hid-s {
			margin-right: 1.2rem;
			color: var(--color-primary);
			cursor: pointer;
		}
	}

	@media (max-width: 568px) {
		padding: 1rem;
	}

	.icons.hid-s.hid-m {
		color: var(--color-primary);
		cursor: pointer;

		@media (min-width: 569px) {
			display: none;
		}
	}

	.icons.hid-s.hid-m.call {
		@media (max-width: 768px) {
			margin-right: 30px;
		}
	}
`;

const FeedsLogo = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1rem 0;

	@media (max-width: 568px) {
		display: none;
	}
`;

const FeedsChatBody = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 30px;
	overflow-y: auto !important;
`;

const FeedsChatFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	width: 100%;
	form {
		flex-grow: 1;
		display: flex;
		color: gray;
		border-radius: 1.4rem;
		align-items: center;
		padding: 7px 8px;
		cursor: pointer;
		transition: 0.3s;
		border: 1px solid rgba(220, 227, 232);
		background-color: rgba(220, 227, 232);
		box-shadow: 0 1px 0 rgb(255 255 255 / 50%), 0 1px 0 rgb(0 0 0 / 7%) inset;

		@media (max-width: 768px) {
			max-width: 90%;
		}

		&:hover,
		&:focus {
			border: 1px solid #e0d4fd;
			background-color: #e0d4fd;
			box-shadow: 0 1px 0 #e0d4fd, 0 1px 0 rgb(0 0 0 / 7%) inset;
		}

		input {
			flex: 1;
			padding: 4px;
			padding-left: 8px;
			padding-right: 5px;
			border: none;
			flex: 1;
			outline: none;
			background: transparent;
			font-size: 0.97rem;
		}
	}

	.icon {
		color: var(--color-primary);
		margin-left: 1rem;
		font-size: 1.3rem;
		cursor: pointer;
	}

	.icon.hids {
		@media (max-width: 768px) {
			display: none;
		}
	}
`;

// empty div for auto scroll
const ChatBottom = styled.div`
	padding-bottom: 200px;
`;
