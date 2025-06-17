export function generateShareId(length: number = 6) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({length}, () =>
        charset.charAt(Math.floor(Math.random() * charset.length))
    ).join("");
}