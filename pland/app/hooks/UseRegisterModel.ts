import { create } from "zustand";

interface RegisterMoldeStore {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const useRegisterModel = create<RegisterMoldeStore>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))


export default useRegisterModel; 