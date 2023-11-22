import { create } from "zustand";

interface useRentModelStore {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const useRentModel = create<useRentModelStore>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))


export default useRentModel; 