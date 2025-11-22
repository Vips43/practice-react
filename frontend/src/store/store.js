import { create } from 'zustand';

const formData = {
    input: "",
    range:5,
    num: false,
    sym: false,
}
const usePassGenStore = create((set) => ({
    ...formData,
    setInput: (input) => set({ input }),
    setRange: (range) => set({ range }),
    setNum: (num) => set({ num }),
    setSym: (sym) => set({ sym }),
    resetForm: () => set(formData),
}))
export default usePassGenStore