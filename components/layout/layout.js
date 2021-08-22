/** @format */

import { Fragment } from "react";
import SideBar from "../sideBar/sideBar";

function Layout(props) {
	return (
		<Fragment>
			<SideBar />
			{props.children}
		</Fragment>
	);
}

export default Layout;
