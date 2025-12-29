import type { User } from "./entities/User";
import {create} from   "zustand"

const defaultUser: User = {id: 0, email: '', nickname: '', profile_picture: '1'}

interface AuthStore {
    user: User;
    login: (user: User) => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
    user: defaultUser,
    login: user => set(() => ({user: user})),
    logout: () => set(() => ({user: defaultUser}))
}))

export default useAuthStore;