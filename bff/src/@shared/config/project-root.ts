import path from 'path';

const projectRoot: string = process.env.SERVER_PATH ? process.env.SERVER_PATH : path.join(process.cwd(), 'src');

export default projectRoot;
