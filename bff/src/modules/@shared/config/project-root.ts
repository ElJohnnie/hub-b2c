let projectRoot: string;

if (process.env.SERVER_PATH) {
    projectRoot = process.env.SERVER_PATH;
} else {
    projectRoot = process.cwd();
}

export default projectRoot;