import fantacy from "@/assets/icons/fantacy.svg";
import children from "@/assets/icons/children.svg";
import action from "@/assets/icons/action.svg";
import romantic from "@/assets/icons/romantic.svg";
import drama from "@/assets/icons/drama.svg";


export interface IconInfoProps {
    label: string,
    icon: string
}
export const iconsList: IconInfoProps[] = [
    {
        label: "幻想",
        icon: fantacy
    },
    {
        label: "儿童故事",
        icon: children
    },
    {
        label: "动作",
        icon: action
    },
    {
        label: "浪漫",
        icon: romantic
    },
    {
        label: "冲突",
        icon: drama
    },
]