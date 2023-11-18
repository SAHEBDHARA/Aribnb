import { create } from "zustand";

interface LoginMoldeStore {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const useLoginModel = create<LoginMoldeStore>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))


export default useLoginModel; 