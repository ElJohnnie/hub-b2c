import path from 'path';

let publicPath: string;

if(process.env.PUBLIC_PATH) {
    publicPath = process.env.PUBLIC_PATH;
}
else {
    publicPath = path.join(__dirname, 'public');
}

export default publicPath;