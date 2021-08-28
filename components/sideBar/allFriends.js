/** @format */

import { useEffect, useState } from "react";
import db from "../../config/firebase";
import SideBarOption from "./sideBarOption";
import FlipMove from "react-flip-move";

const AllFriends = (props) => {
	const [unVerifiedFriends, setUnVerifiedFriends] = useState(
		props?.unVerifiedFriends,
	);

	useEffect(() => {
		const unsubscribe = db
			?.collection("unVerifiedUsers")
			?.orderBy("timestamp", "desc")
			?.limit(50)
			?.onSnapshot((snapshot) => {
				setUnVerifiedFriends(
					snapshot?.docs?.map((doc) => {
						return {
							id: doc.id,
							...doc.data(),
							lastSeen: doc?.data()?.lastSeen?.toDate()?.getTime(),
							timestamp: doc?.data()?.timestamp?.toDate()?.getTime(),
						};
					}),
				);
			});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			<FlipMove>
				{unVerifiedFriends?.map((doc, index) => (
					<SideBarOption
						collectionName={doc?.collectionName}
						key={doc?.id}
						userId={doc?.id}
						name={doc?.name}
						email={doc?.email}
						photoURL={doc?.photoURL}
						lastSeen={doc?.lastSeen}
						call={index === 1 || index === 3 || index === 5 ? "call" : ""}
						date={doc?.timestamp}
					/>
				))}
			</FlipMove>
		</>
	);
};

export default AllFriends;
