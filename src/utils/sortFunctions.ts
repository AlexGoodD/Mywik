// src/utils/sortFunctions.ts
export function sortByDateAsc(a: any, b: any) {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
}

export function sortByDateDesc(a: any, b: any) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

export function sortByNameAsc(a: any, b: any) {
    return a.name.localeCompare(b.name);
}

export function sortByNameDesc(a: any, b: any) {
    return b.name.localeCompare(a.name);
}