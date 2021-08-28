/** @format */

import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import moment from "moment";
import { auth } from "../../config/firebase";
import { Avatar, IconButton } from "@material-ui/core";
import { truncate } from "../../lib/api-util";
import React from "react";

const ShowMessages = React.forwardRef((props, ref) => {
	const { message, name, photoURL, date } = props;
	const [user, loading] = useAuthState(auth);

	let messageClasses = "chatMessage";
	let FinalPhotoUrl = "";
	if (user?.displayName === props?.name) {
		messageClasses = "chatMessage chatReceiver";
		FinalPhotoUrl = user?.photoURL;
	}

	return (
		<ShowMessagesWrapper>
			<div className={messageClasses}>
				<div className='heading'>
					<IconButton>
						<Avatar
							style={{
								maxWidth: "35px",
								maxHeight: "35px",
							}}
							src={
								FinalPhotoUrl
									? FinalPhotoUrl
									: "https://lh3.googleusercontent.com/a/AATXAJxvNL0mo2ldUytJDKQLwdUu6Qagh5SbgZnChr5S=s96-c"
							}
						/>
					</IconButton>
					<p className='chatName'>{name}</p>
				</div>

				<p
					style={{
						margin: "5px 0",
						fontSize: "0.9rem",
						lineHeight: "1.7",
					}}>
					{truncate(message, 500)}
				</p>

				<time className='timeStamp'>
					{moment(props?.date).format("LT")}
				</time>
			</div>
		</ShowMessagesWrapper>
	);
});

// To fix error(Component definition is missing display/name-react)
ShowMessages.displayName = "ShowMessages";
export default ShowMessages;

const ShowMessagesWrapper = styled.div`
	.chatMessage {
		background: var(--color-primary-20);
		font-size: 16px;
		padding: 10px;
		padding-top: 0;
		border-radius: 10px;
		width: fit-content;
		margin-bottom: 30px;
		position: relative;
		color: white;
		max-width: 300px;
		overflow: hidden;
		max-width: 50vw;
		min-width: 150px;
		color: black;
		border: 1px solid rgba(220, 227, 232, 0.5);
		background-color: rgba(170, 180, 187, 0.5);
	}
	.chatName {
		color: black;
		font-weight: bold;
		width: fit-content;
		font-size: 0.9rem;
		margin-top: -5px;
	}
	.timeStamp {
		margin-top: 10px;
		color: black;
		color: #006aff;
		font-size: 0.8rem;
		font-weight: bold;
	}
	.chatReceiver {
		color: black;
		margin-left: auto;
		width: fit-content;
		color: black;
		border: 1px solid #c6b8c7;
		background-color: #c6b8c7;
	}
	.heading {
		display: flex;
		align-items: center;
	}
`;
