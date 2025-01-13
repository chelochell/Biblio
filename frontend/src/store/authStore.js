import {create} from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) =>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isChecked:false,
    isCheckingAuth: true,

    signup: async(email, pasword, username) =>{
        set
    }
}))