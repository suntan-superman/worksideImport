import React, { useEffect, useState } from "react";

let data = null;

const productData = 
	[
  {
    "categoryname": "Drilling Tools Rental",
    "productname": "Bit Breaker",
    "description": "Bit Breaker",
    "status": "ACTIVE",
  },
  {
    "categoryname": "Drilling Tools Rental",
    "productname": "PDC Bit",
    "description": "PDC Bit",
    "status": "INACTIVE",
  },
  {
    "categoryname": "Drilling Tools Rental",
    "productname": "Gauge Bit",
    "description": "Gauge Bit",
    "status": "ACTIVE",
  },
  {
    "categoryname": "Mud Management",
    "productname": "Mud Hopper",
    "status": "ACTIVE",
  }
 ];

 const supplierProductData = [
		{
			supplier: "Amped Energy Services",
			category: "Drilling Tools Rental",
			product: "Mill Tooth Bit",
			status: "ACTIVE",
		},
		{
			supplier: "DANCO Coiled Tubing",
			category: "Drilling Tools Rental",
			product: "Hole Openers",
			status: "ACTIVE",
		},
		{
			supplier: "Kameron Environmental",
			category: "Fishing & Re-Entry",
			product: "Junk Retrievers",
			status: "ACTIVE",
		},
		{
			supplier: "Kameron Environmental",
			category: "Fishing & Re-Entry",
			product: "Impression Blocks",
			status: "ACTIVE",
			comment: "",
		},
		{
			supplier: "DANCO Coiled Tubing",
			category: "Drilling Tools Rental",
			product: "Gauge Bit",
			status: "ACTIVE",
		},
	];
  
	const rigData = [
		{
			rigcompanyid: "65423d5c240388c1594e7b84",
			rigcompanyname: "Golden State",
			rigname: "66",
			rigclassification: "DRILLING-S",
			description: "666",
			status: "ACTIVE",
		},
		{
			rigcompanyid: "65423d5c240388c1594e7b85",
			rigcompanyname: "ENSIGN",
			rigname: "84",
			rignumber: "84",
			rigclassification: "MINOR",
			status: "ACTIVE",
		},
		{
			rigcompanyid: "65423d5c240388c1594e7b81",
			rigcompanyname: "GPS",
			rigname: "6445",
			rignumber: "6445",
			rigclassification: "MINOR",
			status: "ACTIVE",
			comment: "",
		},
		{
			rigcompanyid: "65423d5c240388c1594e7b85",
			rigcompanyname: "ENSIGN",
			rigname: "7655",
			rignumber: "7655",
			rigclassification: "DRILLING-D",
			status: "ACTIVE",
			comment: "",
		}
	];

const JsonSampleDataDisplay = () => {
	const [currentSelection, setCurrentSelection] = useState(0);

	useEffect(() => {
		data = productData;
	}, []);
	
	const handleOptionChange = (option) => {
		setCurrentSelection(option);
		if(option === 0) {
			data = productData;
		} else if(option === 1) {
			data = supplierProductData;
		}
		else {
			data = rigData;
		}
	};

	const OutputRadioButtons = () => {
		return (
			<div className="flex justify-center items-center space-x-4">
				<div>
					<input
						type="radio"
						id="output-product"
						name="output-type"
						checked={currentSelection === 0}
						className="form-radio text-blue-600 font-bold mr-2"
						onChange={() => handleOptionChange(0)}
					/>
					<label className="font-bold">PRODUCT</label>
				</div>
				<div>
					<input
						type="radio"
						id="output-supplierproduct"
						name="output-type"
						checked={currentSelection === 1}
						className="form-radio text-blue-600 mr-2"
						onChange={() => handleOptionChange(1)}
					/>
					<label className="font-bold">SUPPLIER-PRODUCTS</label>
				</div>
				<div>
					<input
						type="radio"
						id="output-rig"
						name="output-type"
						checked={currentSelection === 2}
						className="form-radio text-blue-600 mr-2"
						onChange={() => handleOptionChange(2)}
					/>
					<label className="font-bold">RIGS</label>
				</div>
			</div>
		);
	}


	return (
		<div className="w-4/5 h-3/4 bg-white p-4 border rounded overflow-auto mx-auto mt-2">
			<h2 className="text-xl font-bold mb-2 text-center">Sample Data</h2>
			<OutputRadioButtons />
			<div>
				<p className="text-center text-sm text-gray-600">
					Here is a sample of the data you are importing. If you need to see the
					full data, please contact your administrator.
				</p>
			</div>
			<pre className="text-left text-sm bg-white p-4 rounded shadow-inner overflow-x-auto">
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	);
};

export default JsonSampleDataDisplay;
