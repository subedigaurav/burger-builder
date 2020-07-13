import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-builder-95ffe.firebaseio.com',
});

export default instance;
