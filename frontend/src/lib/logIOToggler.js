const logIOToggler = () => {
    const login = document.querySelector('.loginBox');
    const logout = document.querySelector('.logoutButton');
    console.log(login)
    console.log(logout)
    if(document.cookie.includes('token=')) {
        if(logout.classList.contains('inactive')) logout.classList.toggle('inactive');
        if(!login.classList.contains('inactive')) login.classList.toggle('inactive');
    }
    else {
        if(!logout.classList.contains('inactive')) logout.classList.toggle('inactive');
        if(login.classList.contains('inactive')) login.classList.toggle('inactive');
    }
}

export default logIOToggler
