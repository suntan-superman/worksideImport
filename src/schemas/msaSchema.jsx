import * as yup from "yup";

const msaSchema = yup.object().shape({
	customername: yup.string().required().min(2).max(30).trim(),
	customerid: yup.string().required().min(8).max(30).trim(),
	suppliername: yup.string().required().min(1).max(30).trim(),
	supplierid: yup.string().required().min(8).max(30).trim(),
	msastatus: yup.string().required().min(5).max(30).trim(),
});

export default msaSchema;
