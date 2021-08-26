/** @format */

import styled from "styled-components";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

const Message = (props) => {
	const logInUser = useSelector(selectUser);

	//  function to truncate(cut) the string if the length of given string
	//   bigger than  given number(n)
	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + " ...." : string;
	};

	let messageClasses = "chatMessage";
	if (logInUser?.displayName === props?.name) {
		messageClasses = "chatMessage chatReceiver";
	}
	return (
		<MessageWrapper>
			<div className={messageClasses}>
				<p className='chatName'>{props?.name}</p>
				<p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
					{truncate(props?.message, 200)}
				</p>

				<p className='timeStamp'> {moment(props?.date).format("LT")}</p>
			</div>
		</MessageWrapper>
	);
};

export default Message;

const MessageWrapper = styled.div`
	/*  chatting  message styling */

	.chatMessage {
		background: var(--color-primary-20);
		font-size: 16px;
		padding: 10px;
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
		font-weight: 700;
		width: fit-content;
		font-size: 0.8rem;
	}

	.timeStamp {
		font-size: small;
		margin-top: 10px;
		color: black;
	}

	.chatReceiver {
		color: black;
		margin-left: auto;
		width: fit-content;
		color: black;
	}
`;
