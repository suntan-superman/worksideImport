import * as yup from "yup";

const rigSchema = yup.object().shape({
	rigcompanyname: yup.string().required().min(3).max(30).trim(),
	rigname: yup.string().required().min(1).max(30).trim(),
	rignumber: yup.string().required().min(1).max(10).trim(),
	rigclassification: yup.string().min(3).max(30).trim(),
	description: yup.string().min(3).max(30).trim(),
});

export default rigSchema;
