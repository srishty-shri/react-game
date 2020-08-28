export function getFromLocalStorage(key) {
    return Number(localStorage.getItem(key));
}
export function setLocalStorage(key,val) {
    localStorage.setItem(key,val);
}