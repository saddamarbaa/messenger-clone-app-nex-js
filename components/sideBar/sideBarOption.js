/** @format */

import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const SideBarOption = (props) => {
	const getRandomNumber = () => {
		const rndInt = Math.floor(Math.random() * 10) + 1;

		return rndInt;
	};

	return (
		<SideBarOptionWrapper
			style={{
				backgroundColor: props?.firstFriend
					? "rgba(220, 227, 232, 0.5)"
					: "",
			}}>
			<div className='left'>
				<Avatar src='/images/profile.jpg' />
				<div className='name time hid-s'>
					<p className='name-only'>{props?.name}</p>
					<p className='date-only'>last online : {props?.date}</p>
				</div>
			</div>
			{getRandomNumber() > 5 ? (
				<CheckCircleOutlineIcon
					style={{ fontSize: "1.3rem" }}
					className='hid-s'
				/>
			) : (
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
	padding: 1rem 0.5rem;
	margin: 0 1rem;
	margin-bottom: 1rem;
	/* background-color: rgba(220, 227, 232, 0.5); */
	cursor: pointer;
	transition: 0.3s;

	@media (max-width: 568px) {
		background-color: transparent;
	}

	&:hover {
		padding: 1rem 0.5rem;
		border: 1px solid rgba(220, 227, 232, 1);
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

	p,
	.hid-s {
		@media (max-width: 568px) {
			display: none !important;
		}
	}
`;
