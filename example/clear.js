import { S3 } from "../S3.js";

const s3 = await new S3().init(true);

await s3.clear();
