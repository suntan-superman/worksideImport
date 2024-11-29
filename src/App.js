import React, { useState } from "react";
import JsonDisplay from "./JsonDisplay";
import JsonSampleDataDisplay from "./JsonSampleDataDisplay";
import axios from "axios";
import productSchema from "./schemas/productSchema";
import rigSchema from "./schemas/rigSchema";
import supplierProductSchema from "./schemas/supplierProductSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillLockFill } from "react-icons/bs";
import { Simulate } from "react-dom/test-utils";


const PRODUCTS = 0;
const SUPPLIER_PRODUCTS = 1;
const RIGS = 2;

const App = () => {
	const [fileData, setFileData] = useState(null);
	const [fileLoaded, setFileLoaded] = useState(false);
	const [rawView, setRawView] = useState(true); // Toggle between raw and grid view
	const [loggedIn, setLoggedIn] = useState(false); // Login state
	const [dataValid, setDataValid] = useState(true); // Data validation state
	const [currentImportOption, setCurrentImportOption] = useState(PRODUCTS); // Import option state
	const [recordCount, setRecordCount] = useState(0); // Record count state
	const [progress, setProgress] = useState(0);
	const [importingFlag, setImportingFlag] = useState(false);
	const [showSampleDataFlag, setShowSampleDataFlag] = useState(false);

	const fileInput = document.getElementById("fileInputId");

	const handleLogin = () => {
		setLoggedIn(true); // Simulate login
	};

	const onLogOut = () => {
		setLoggedIn(false);
		setFileData(null);
		setFileLoaded(false);
		setDataValid(false);
		setCurrentImportOption(PRODUCTS);
		setShowSampleDataFlag(false);
	};

	const LogOutButton = () => {
		return (
			<div>
				<button
					type="button"
					onClick={onLogOut}
					// style={{ background: "green", borderRadius: "50%" }}
					style={{ borderRadius: "50%" }}
					className="text-xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray bg-green-500 rounded-lg"
				>
					<BsFillLockFill />
				</button>
			</div>
		);
	};

	const onShowSampleData = () => {
		setShowSampleDataFlag(true);
	};

	const SampleDataButton = () => {
		return (
			<div>
				<button
					type="button"
					onClick={onShowSampleData}
					className="text-base text-white p-3 hover:drop-shadow-xl hover:bg-light-gray bg-green-500"
				>
					Sample JSON Data
				</button>
			</div>
		);
	};

	const handleImportOptionChange = (option) => {
		setCurrentImportOption(option);
		setDataValid(false);
	};

	const showSuccessMessage = (message) => {
		toast.success(message);
	};

	const showErrorMessage = (message) => {
		toast.error(message);
		// toast.error(message, {
		// 	position: toast.POSITION.TOP_RIGHT,
		// });
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		setFileLoaded(false);
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const json = JSON.parse(event.target.result);
					setFileData(json);
					setFileLoaded(true);
					setShowSampleDataFlag(false);
				} catch (error) {
					showErrorMessage(`Invalid JSON file! ${error.message}`);
					setFileLoaded(false);
					resetFileInput();
					setFileData(null);
				}
			};
			reader.readAsText(file);
			setDataValid(false);
		}
	};
	
	function resetFileInput() {
		fileInput.value = "";
	}

	const handleStoreToDB = async () => {
		// const dbURL = `${process.env.REACT_APP_MONGO_URI}`;
		const dbURL = "http://localhost:4000/";
		let apiURL = "";

		if (currentImportOption === PRODUCTS)
			apiURL = `${dbURL}api/product`;
		else if (currentImportOption === RIGS)
			apiURL = `${dbURL}api/rig`;
		else if (currentImportOption === SUPPLIER_PRODUCTS)
			apiURL = `${dbURL}api/supplierproduct`;
		else return;

		// window.alert(`API URL: ${apiURL}`);
		try {
			// Loop through the JSON array and send POST requests
			setProgress(0);
			setImportingFlag(true);
			for (const item of fileData) {
				setProgress(progress + 1);
				const response = await axios.post(apiURL, item);
				// console.log("Data sent:", response.data);
			}
			setDataValid(false);
			showSuccessMessage("All data imported successfully!");
		} catch (error) {
			console.error("Error sending data:", error);
			showErrorMessage(
				"Error sending some data. Check the console for details.",
			);
		}
		setImportingFlag(false);
	};

	const GetRecordCount = async () => {
		let count = 0;
		for (const element of fileData) {
			count += 1;
		}
		setRecordCount(count);
		return count;
	};

	const ValidateData = async () => {
		await ValidateRecord(fileData[0]).then((res) => {
			if (res) {
				showSuccessMessage("Data is Valid!");
				GetRecordCount();
				setDataValid(true);
			} else {
				showErrorMessage("Data is Invalid!");
				setDataValid(false);
			}
		});
	};

	const ValidateRecord = async (data) => {
		if (currentImportOption === PRODUCTS) {
			try {
				await productSchema.validate(data, { abortEarly: false });
				return true;
			} catch (err) {
				setDataValid(false);
				showErrorMessage(err.errors);
				return false;
			}
		}
		if (currentImportOption === SUPPLIER_PRODUCTS) {
			try {
				await supplierProductSchema.validate(data, { abortEarly: false });
				return true;
			} catch (err) {
				setDataValid(false);
				showErrorMessage(err.errors);
				return false;
			}
		}
		if (currentImportOption === RIGS) {
			try {
				await rigSchema.validate(data, { abortEarly: false });
				const jsonObject = { ...data };
				const recordCount = Object.keys(jsonObject).length;

				window.alert(`Record Count: ${recordCount}`);
				return true;
			} catch (err) {
				setDataValid(false);
				showErrorMessage(err.errors);
				return false;
			}
		}
	};
	
const simulateProgress = () => {
		setImportingFlag(true);
		setProgress(progress + 10);
	};

	function ProgressBar({ value, max }) {
		if (value >= max) {
			setImportingFlag(false);
			return null;
		}
		return (
			<div className="progress-bar">
				<div
					className="progress-bar-completed"
					style={{ width: `${(value / max) * 100}%` }}
				/>
			</div>
		);
	}
	const SimulateProgressButton = () => {
		return (
			<div>
				<button
					type="button"
					onClick={simulateProgress}
					className="bg-green-500 border-2 border-black-500 text-black px-2 py-2 w-52 inline-block font-semibold hover:bg-green-700 hover:text-white"
				>
					Simulate Progress
				</button>
			</div>
		);
	};

	const validateButtonStyle =
		"bg-green-500 border-2 border-black-500 text-black px-2 py-2 w-52 inline-block font-semibold hover:bg-green-700 hover:text-white";

	const importButtonStyle =
		"bg-green-500 border-2 border-black-500 text-black px-2 py-2 w-52 inline-block font-semibold hover:bg-green-700 hover:text-white";

		const disabledButtonStyle =
			"bg-gray-500 border-2 border-black-500 text-white px-2 py-2 w-52 inline-block font-semibold hover:bg-gray-700 hover:text-white";

	return (
		<div className="h-screen flex items-center justify-center bg-white">
			{!loggedIn ? (
				<div className="text-center bg-white p-8 rounded shadow-md">
					<div className="text-left text-3xl font-bold mb-6">
						<span className="text-green-500">WORK</span>SIDE
					</div>
					<div className="text-2xl font-bold mb-6 text-center">
						<span className="text-black">Import Utility</span>
					</div>
					<button
						type="button"
						onClick={handleLogin}
						className="bg-green-300 text-xl font-bold hover:drop-shadow-xl hover:bg-light-gray p-1 rounded-lg w-36 items-center justify-center border-2 border-solid border-black border-r-4 border-b-4 hover:border-l-4 hover:border-t-4 hover:bg-green-400"
					>
						Login
					</button>
				</div>
			) : (
				<div className="w-full bg-white p-8 rounded shadow-md h-full">
					<div className="text-left text-4xl font-bold">
						<span className="text-green-500">WORK</span>SIDE
					</div>
					<div className="flex flex-row w-full mb-2">
						<div className="w-48">
							<h2 className="text-2xl font-bold text-black mb-2">
								Import Utility
							</h2>
						</div>
						<div className="flex gap-3 justify-end w-full">
							{/* <SimulateProgressButton /> */}
							<LogOutButton />
							{/* <button type="button" onClick={() => LogOut()}>
								<span className="font-bold text-xl">Log Out</span>
							</button> */}
						</div>
					</div>
					<input
						type="file"
						id="fileInputId"
						accept=".json"
						onChange={handleFileChange}
						className="block w-full mb-4 p-2 border border-gray-300 rounded"
					/>
					{!showSampleDataFlag && !fileData && (
						<div className="flex gap-3 justify-end w-full">
							<SampleDataButton />
						</div>
					)}

					{fileData && (
						<div className="h-full">
							<div className="flex flex-row">
								{/* Buttons */}
								<div className="flex flex-row">
									<button
										type="button"
										onClick={() => ValidateData()}
										className={
											fileLoaded ? validateButtonStyle : disabledButtonStyle
										}
										disabled={!fileLoaded}
									>
										{/* {dataValid && (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5 ml-2"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={2}
											>
												<title>Checkmark icon</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5 13l4 4L19 7"
												/>
											</svg>
										)} */}
										{dataValid ? (
											<span>Data Validated</span>
										) : (
											<span>Validate Data</span>
										)}
									</button>
									<button
										type="button"
										onClick={handleStoreToDB}
										className={
											dataValid ? importButtonStyle : disabledButtonStyle
										}
										disabled={!dataValid}
									>
										Import Data
									</button>
								</div>
								{/* Radio Buttons */}
								<div className="flex gap-3 justify-end w-full">
									<label className="flex items-center space-x-2">
										<input
											type="radio"
											name="options"
											checked={currentImportOption === PRODUCTS}
											className="form-radio text-blue-600"
											onChange={() => handleImportOptionChange(0)}
										/>
										<span className="font-bold text-xl">Products</span>
									</label>
									<label className="flex items-center space-x-2">
										<input
											type="radio"
											name="options"
											checked={currentImportOption === SUPPLIER_PRODUCTS}
											className="form-radio text-blue-600"
											onChange={() => handleImportOptionChange(1)}
										/>
										<span className="font-bold text-xl">Supplier-Products</span>
									</label>
									<label className="flex items-center space-x-2">
										<input
											type="radio"
											name="options"
											checked={currentImportOption === RIGS}
											className="form-radio text-blue-600"
											onChange={() => handleImportOptionChange(2)}
										/>
										<span className="font-bold text-xl">Rigs</span>
									</label>
								</div>
							</div>
							<div>
								{importingFlag && (
									<ProgressBar value={progress} max={recordCount} />
								)}
							</div>
							{!showSampleDataFlag && (
								<div className="h-full">
									<JsonDisplay data={fileData} />
								</div>
							)}
						</div>
					)}
					{showSampleDataFlag && (
						<div className="h-full">
							<JsonSampleDataDisplay />
						</div>
					)}
				</div>
			)}
			<ToastContainer />
		</div>
	);
};

export default App;
