import { S3 } from "../S3.js";

const s3 = await new S3().init(true);
console.log(s3);
await s3.put("test.html", "test");
console.log(await s3.list());
console.log(s3.getURL("test.html"));
