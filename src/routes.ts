const apiBase = 'http://localhost:4000';

const api = apiBase + '/api';
const users = apiBase + '/users'

const routes = {
    register: users,
    login: users + '/tokens',
    validateToken: users + '/tokens',
}

export default routes;
module.exports.api = api;