import path from 'path';

let projectRoot: string;

if (process.env.SERVER_PATH) {
  projectRoot = process.env.SERVER_PATH;
} else {
  projectRoot = path.join(process.cwd(), 'src');
}

export default projectRoot;
