import { colorArray } from '@/app/Utils/constants';
export const getColor = (index: number, type: string, theme : string | undefined, change1h: number)=> {
    const arrayLength = colorArray.length;
    const colorIndex = theme === 'light' ? (change1h > 0 ? 9 : 10) : index % arrayLength;
    const colorArrayItem = colorArray[colorIndex];

    if (!colorArrayItem) {
        // Handle the case where colorArrayItem is undefined
        return '';
    } else {
        return type === 'graph' ? colorArrayItem[3] : type === 'color' ? colorArrayItem[2] : type === 'text' ? colorArrayItem[1] : colorArrayItem[0] + ' bg-opacity-50';
    }

    
}  