/**
 * sets server state for token blacklist
 * clearing blacklist all 60s
 * @param {{ instanceOf: "Express"}} server current Express app
 */
const tokenBlackList = (server) => {
    if(!server.locals.states) server.locals.states = {};
    server.locals.states.tokenBlacklist = [];
    
    setInterval(() => {
        server.locals.states.tokenBlacklist = 
            server.locals.states.tokenBlacklist.filter(item => item.exp > Date.now());
    }, 60 * 1000);
}

export default {
    tokenBlackList
}