const USER_KEY = 'username';

export function saveUsername(username) {
    localStorage.setItem(USER_KEY, username);
}

export function getUsername() {
    return localStorage.getItem(USER_KEY);
}

export function clearUsername() {
    localStorage.removeItem(USER_KEY);
}