import * as yup from "yup";

const supplierProductSchema = yup.object().shape({
	supplier: yup.string().required().min(3).max(30).trim(),
	category: yup.string().required().min(3).max(30).trim(),
	product: yup.string().required().min(3).max(30).trim(),
});

export default supplierProductSchema;
