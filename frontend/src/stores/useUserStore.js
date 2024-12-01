import {create} from "zustand"
import axiosInstance from "../lib/axios.js"
import { toast } from "react-hot-toast"


export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({name ,email, password, confirmPassword}) => {
        set({ loading: true });
        if (password !== confirmPassword) {
            return toast.error("Password do not match")
        }

        try {
            const res = await axiosInstance.post("/auth/signup", { name, email, password, confirmPassword });
            set({ user: res.data.user, loading: false })
            toast.success("User created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred")
        }
    }
})); 