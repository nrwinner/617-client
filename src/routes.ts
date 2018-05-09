const apiBase = 'https://softwarebytes.herokuapp.com';

export const api = apiBase + '/api';
const users = apiBase + '/users'

const routes = {
    register: users,
    login: users + '/tokens',
    validateToken: users + '/tokens',
}

export default routes;