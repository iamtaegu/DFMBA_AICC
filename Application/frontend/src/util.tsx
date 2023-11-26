import emotion1 from "./img/emotion1.png"
import emotion2 from "./img/emotion2.png"
import emotion3 from "./img/emotion3.png"
import emotion4 from "./img/emotion4.png"
import emotion5 from "./img/emotion5.png"

interface Emotion {
    id: number;
    name: string;
    img: string | null;
}

export const getEmotionImgById = (emotionId: number): string | null => {
    const targetEmotionId = String(emotionId);
    switch (targetEmotionId) {
        case "1":
            return emotion1;
        case "2":
            return emotion2;
        case "3":
            return emotion3;
        case "4":
            return emotion4;
        case "5":
            return emotion5;
        default:
            return null;
    }
};

/**
 * month, date 가 10미만의 숫자라면 0을 붙임
 * @param targetDate
 * @returns {`${number}-${number}-${number}`} yyyy-mm-dd format
 */
export const getFormattedDate = (targetDate: Date): string => {
    let year = targetDate.getFullYear().toString();
    let month = (targetDate.getMonth() + 1).toString();
    let date = (targetDate.getDate()).toString();
    if (month < "10") {
        month = `0${month}`;
    }
    if (date < "10") {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

export const emotionList: Emotion[] = [
    {
        id: 1,
        name: "긍정",
        img: getEmotionImgById(1),
    },
    /*{
            id: 2,
            name: "좋음",
            img: getEmotionImgById(2),
    },*/
    {
        id: 3,
        name: "중립",
        img: getEmotionImgById(3),
    },
    /*{
        id: 4,
        name: "나쁨",
        img: getEmotionImgById(4),
    },*/
    {
        id: 5,
        name: "부정",
        img: getEmotionImgById(5),
    },
]

export const getMonthRangeByDate = (date: Date): { beginTimeStamp: number; endTimeStamp: number } => {
    const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const endTimeStamp = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
        23,
        59,
        59
    ).getTime();
    return { beginTimeStamp, endTimeStamp };
};

export const getSentiment = (emotionId: number): string => {
    switch (emotionId) {
        case 1:
            return "positive";
        case 3:
            return "neutral";
        case 5:
            return "negative";
        default:
            return "";
    }
};