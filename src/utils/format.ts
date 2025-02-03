export function truncateText(text: string | null | undefined, length: number): string {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
}

export function formatTime(timeString: string): string {
    if (!timeString) return "Invalid Time";

    const timeParts = timeString.split(":");
    if (timeParts.length < 2) return "Invalid Time";

    const hours = timeParts[0];
    const minutes = timeParts[1];

    return `${hours}:${minutes}`;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
}