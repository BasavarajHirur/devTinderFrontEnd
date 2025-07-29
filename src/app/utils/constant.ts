//This is for Production
//export const BASE_URL = '/api';

// This is for Development
//export const BASE_URL = 'http://localhost:3000';

export const BASE_URL = location.hostname === 'localhost' ? 'http://localhost:3000' : '/api';