const baseURL = 'http://j3.biomooc.com:8501/';
 
export const getUsers = () => `${baseURL}users`;
export const getUser = (userId) => `${baseURL}users/${userId}`;
export const createUser = () => `${baseURL}users`;
export const updateUser = (userId) => `${baseURL}users/${userId}`;
export const deleteUser = (userId) => `${baseURL}users/${userId}`;


export const getTasks = () => `${baseURL}tasks`;
export const getTask = (taskId) => `${baseURL}tasks/${taskId}`;
export const createTask = () => `${baseURL}tasks`;
export const updateTask = (taskId) => `${baseURL}tasks/${taskId}`;
export const deleteTask = (taskId) => `${baseURL}tasks/${taskId}`;
