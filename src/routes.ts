<<<<<<< HEAD
const apiBase = 'http://localhost:4000';
=======
const apiBase = '';
>>>>>>> 8b5ee22283824f1c48cb7fc0c38e24f6fe49f610

export const api = apiBase + '/api';
const users = apiBase + '/users'

const routes = {
    register: users,
    login: users + '/tokens',
    validateToken: users + '/tokens',
}

export default routes;