import { dirname } from "path";
import { fileURLToPath } from "url";

// create url from => the meta.url returns current file address
// actually returns file url
const __filename = fileURLToPath(import.meta.url);

// create dirname from filename
const __dirname = dirname(__filename);

export default __dirname;
