import { create } from "zustand";

export type ModalType =
    | "sign-in-sheet" | "cart-sheet" | "cart-delete-modal" |
    "order-cancel-modal" | "address-modal" | "address-delete-modal" | "name-change-modal";

type ModalStore<T = any> = {
    type: ModalType | null;
    data: T;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: T) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));