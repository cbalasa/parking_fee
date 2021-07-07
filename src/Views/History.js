import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import _ from "lodash";
const History = (props) => {
	const user = useSelector((state) => state.user.user);
	user.history = _.orderBy(user.history, ["date", "startTime"], "desc");
	return (
		<div className={"flex flex-col justify-center items-center"}>
			<span className={"p-4 font-bold"}>
				History of your parkings at Equilobe Parking
			</span>

			{user.history.map((parking, i) => {
				return (
					<div
						key={i}
						className={
							"flex flex-col bg-gray-100 p-4 rounded-lg md:w-6/12 lg:w-4/12 w-10/12 text-sm shadow-lg my-2"
						}
					>
						<div className={"flex justify-between border-b py-2"}>
							<span>Date </span>
							<span>{moment(parking.date).format("DD-MM-YYYY")}</span>
						</div>
						<div className={"flex justify-between border-b py-2"}>
							<span>You parked at </span>
							<span>{parking.startTime}</span>
						</div>
						<div className={"flex justify-between border-b py-2"}>
							<span>Duration</span>
							<span>
								{parking.duration} {parking.duration > 1 ? "minutes" : "minute"}
							</span>
						</div>
						<div className={"flex justify-between border-b py-2"}>
							<span>Amount payed</span>
							<span>{parking.amount} lei</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default History;
