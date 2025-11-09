import dayjs from "dayjs";

 
 export function getAge(birthdate:any) {
    const age = dayjs().diff(dayjs(birthdate), 'year');
    return age;
}