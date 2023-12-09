import { create } from "zustand";

interface SearchModleStore {
    isOpen: boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}

const useSearchModel = create<SearchModleStore>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false})
}))


export default useSearchModel; 