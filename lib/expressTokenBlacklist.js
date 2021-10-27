/**
 * sets app state for token blacklist
 * clearing blacklist all 60s
 * @param {{ instanceOf: "Express"}} app current Express app
 */
const tokenBlackList = (app) => {
    if(!app.locals.states) app.locals.states = {};
    app.locals.states.tokenBlacklist = [];
    
    setInterval(() => {
        app.locals.states.tokenBlacklist = 
            app.locals.states.tokenBlacklist.filter(item => item.exp > Date.now());
    }, 60 * 1000);
}

export default {
    tokenBlackList
}