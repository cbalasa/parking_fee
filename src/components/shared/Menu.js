import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const Menu = (props) => {
	const history = useHistory();
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const user = useSelector((state) => state.user.user);

	return (
		<>
			{Object.keys(user).length > 0 ? (
				<div className={"flex flex-start p-2 shadow-md flex-col border-b-2 "}>
					{/* hamburger menu */}
					<div className=" inset-y-0 left-0 flex  sm:hidden">
						<button
							className="inline-flex  justify-center  rounded-md text-gray-400  focus:ring-2 focus:ring-inset focus:ring-white"
							aria-expanded="false"
							onClick={() => setShowMobileMenu(!showMobileMenu)}
						>
							<span className="sr-only">Open main menu</span>

							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>

							<svg
								className="hidden h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					{/* hamburger menu */}
					<div className={"hidden sm:flex "}>
						<div
							onClick={() => history.push("/history")}
							className={"px-4 cursor-pointer"}
						>
							History
						</div>
						<div
							onClick={() => history.push("/")}
							className={"px-4 cursor-pointer"}
						>
							Park
						</div>
						<div
							onClick={() => history.push("/profile")}
							className={"px-4 cursor-pointer "}
						>
							Profile
						</div>
					</div>
					{showMobileMenu ? (
						<div
							className={
								"flex flex-col justify-center items-center self-center  w-full sm:hidden"
							}
						>
							<div
								onClick={() => history.push("/history")}
								className={"px-4 cursor-pointer border-b p-2 font-bold"}
							>
								History
							</div>
							<div
								onClick={() => history.push("/")}
								className={"px-4 cursor-pointer border-b p-2 font-bold"}
							>
								Park
							</div>
							<div
								onClick={() => history.push("/profile")}
								className={"px-4 cursor-pointer border-b p-2 font-bold"}
							>
								Profile
							</div>
						</div>
					) : null}
				</div>
			) : null}
		</>
	);
};

export default Menu;
