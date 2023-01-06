import { toast } from "react-toastify";

class ToastClass {

    Show(type: "success" | "error", message: string) {

        toast.dismiss();
        toast(message, {
            type,
            theme: "colored",
            autoClose: 5000,
            
        });
    }
}

var Toast = new ToastClass();
export default Toast;