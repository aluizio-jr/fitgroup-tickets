interface Payload {
    hasTime?: boolean;
    date?: Date;
}

export function getMySqlDate({ date = new Date(), hasTime }: Payload): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    if (!hasTime) return formattedDate;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
}