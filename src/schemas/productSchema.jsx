import * as yup from "yup";

const productSchema = yup.object().shape({
	categoryname: yup.string().required().min(3).max(30).trim(),
	productname: yup.string().required().min(3).max(30).trim(),
	description: yup.string().max(40).trim(),
});

export default productSchema;
