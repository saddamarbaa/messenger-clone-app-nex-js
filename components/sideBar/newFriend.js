/** @format */
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import styled from "styled-components";
import db from "../../config/firebase";
import firebase from "firebase";

const NewFriend = () => {
	const addNewFriendHandler = () => {
		const friendName = prompt("Please enter friend name");
		if (friendName) {
			db.collection("unVerifiedUsers")
				.add({
					name: friendName,
					uid: "",
					email: "",
					photoURL: "",
					lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					collectionName: "unVerifiedUsers",
				})
				.then((docRef) => {
					console.log("Document written with ID: ", docRef.id);
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
				});
		}
	};

	return (
		<NewFriendWrapper onClick={addNewFriendHandler}>
			<h2> Add new friends</h2>
			<PersonAddIcon style={{ color: "#006aff" }} />
		</NewFriendWrapper>
	);
};

export default NewFriend;

const NewFriendWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.3rem 1rem;
	border-top: 1px solid rgba(220, 227, 232, 1);
	border-bottom: 1px solid rgba(220, 227, 232, 1);
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		background-color: rgba(220, 227, 232, 1);
		@media (max-width: 568px) {
			background-color: transparent;
		}
	}

	@media (max-width: 568px) {
		display: none;
	}
`;
