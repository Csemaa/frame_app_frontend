import avatar_1 from '../assets/avatars/avatar_1.png'
import avatar_2 from '../assets/avatars/avatar_2.png'
import avatar_3 from '../assets/avatars/avatar_3.png'
import avatar_4 from '../assets/avatars/avatar_4.png'

export const getAvatar = (index: string) => {
    switch (index) {
        case "1":
            return avatar_1
        case "2":
            return avatar_2
        case "3":
            return avatar_3
        case "4":
            return avatar_4
        default:
            return avatar_1
    }
}

