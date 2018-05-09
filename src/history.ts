import createHistory from 'history/createBrowserHistory';

const history = createHistory();
export const History = history;
export const Location = history.location;
export const Path = history.location.pathname;
export const LocationState = history.location.state;
export const LocationDescriptor = history.location.hash;
export default history;
