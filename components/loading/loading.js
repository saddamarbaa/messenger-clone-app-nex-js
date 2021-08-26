/** @format */

import React from "react";
import { Circle } from "better-react-spinkit";

const Loading = () => {
	return (
		<div
			style={{
				background: "#f8f8f8",
				width: "100vw",
				height: "100vh",
				display: "grid",
				placeItems: "center",
			}}>
			<div
				style={{
					padding: "100px",
					paddingTop: "50px",
					textAlign: "center",
					background: "white",
					borderRadius: "6px",
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
					display: "grid",
					placeItems: "center",
				}}>
				<div style={{ marginBottom: "3rem" }}>
					<img
						className='logo-img'
						src='/images/messenger-logo.svg'
						alt='Picture of the messenger'
						style={{
							width: "8rem",
							height: "8rem",
							display: "block",
						}}
					/>
				</div>
				<div>
					<Circle color='#006aff' size={60} />
				</div>
			</div>
		</div>
	);
};

export default Loading;
