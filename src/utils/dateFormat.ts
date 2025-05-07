export const formatDate = (fechaISO: string, formato: string): string => {
    const date = new Date(fechaISO);
    if (isNaN(date.getTime())) throw new Error('Fecha inválida');

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return formato
        .replace(/yyyy/g, yyyy.toString())
        .replace(/mm/g, mm)
        .replace(/dd/g, dd)
        .replace(/hh/g, hh)
        .replace(/mi/g, min)
        .replace(/ss/g, ss);
}
