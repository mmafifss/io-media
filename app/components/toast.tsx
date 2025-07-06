import { toast, TypeOptions } from "react-toastify";

const toastMessage = (text: string, type: TypeOptions) => {
  toast(text, { type });
};

export default toastMessage;
