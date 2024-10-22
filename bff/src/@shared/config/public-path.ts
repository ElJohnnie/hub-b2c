import path from 'path';

const publicPath: string = process.env.PUBLIC_PATH || path.join(__dirname, 'public');

export default publicPath;
