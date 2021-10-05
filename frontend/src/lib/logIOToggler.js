

const getTokenPayload = (key) => {
    const value = document.cookie
    .split('; ')
    .find(item => item.startsWith(key))
    .split('=')[1]
    .split('.')[1];

    return JSON.parse(decodeURIComponent(escape(window.atob(value))))
}

const logIOToggler = () => {
    const loginBox = document.querySelector('.loginBox');
    const logoutButton = document.querySelector('.logoutButton');

    if(loginBox || logoutButton) {
        const logout = () => {
            if(!logoutButton.classList.contains('inactive')) logoutButton.classList.toggle('inactive');
            if(loginBox.classList.contains('inactive')) loginBox.classList.toggle('inactive');
            return false;
        }
    
        if(document.cookie.includes('token=')) {
            const exp = +getTokenPayload('token=').exp * 1000;
            if(exp < Date.now()) return logout();
            if(logoutButton.classList.contains('inactive')) logoutButton.classList.toggle('inactive');
            if(!loginBox.classList.contains('inactive')) loginBox.classList.toggle('inactive');
            return true;
        }
        else {
            return logout();
        }
    }
}

export default logIOToggler
