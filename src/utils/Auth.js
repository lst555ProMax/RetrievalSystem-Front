const USER_KEY = 'username';

export function saveUsername(username) {
   console.log("2222222"+username);
    localStorage.setItem(USER_KEY, username);
}

export function getUsername() {
/*     console.log("111"+localStorage.getItem(USER_KEY)); */
    return localStorage.getItem(USER_KEY);
}

export function clearUsername() {
    localStorage.removeItem(USER_KEY);
}