export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}
export function setLocalStorage(key,val) {
    localStorage.setItem(key,val);
}