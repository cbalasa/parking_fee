import React from "react";

const ParkingDetails = (props) => {
	return (
		<div
			className={
				"  flex flex-col  sm:w-6/12 w-full " +
				(props.numberOfParkingSpots - props.carsParked.length > 0
					? "border-r "
					: "")
			}
		>
			<span className={"font-bold"}>Parking details</span>
			<div className={"flex justify-between border-b mb-2 p-2"}>
				<span className={"flex self-center font-bold"}>
					Available Parking Spots
				</span>
				<span className={"font-bold"}>
					{props.numberOfParkingSpots - props.carsParked.length}
				</span>
			</div>
			<div className={"flex justify-between border-b mb-2 p-2"}>
				<span className={"flex self-center font-bold"}>Cars Parked</span>
				<div className={"flex flex-wrap w-9/12 justify-end"}>
					{props.carsParked.length > 0 ? (
						<div className={"flex self-end"}>
							{props.carsParked.map((car, i) => {
								return (
									<span key={i} className={"border-r mr-2 px-2"}>
										{car}
									</span>
								);
							})}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default ParkingDetails;
