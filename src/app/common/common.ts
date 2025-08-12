export function getTimeDetails(isoString: string) {
    const date = new Date(isoString);

    // Extract hours and minutes
    const hours = date.getUTCHours(); // Use getHours() for local time
    const minutes = date.getUTCMinutes(); // Use getMinutes() for local time

    // Format as "HH:MM"
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    return formattedTime;
}