import { S3 } from "../S3.js";

const s3 = await new S3().init(true);

const fn = "test.mov";
await s3.put(fn, new Uint8Array(await Deno.readFile("test.mov")), { contentType: "video/quicktime" });
console.log(s3.getURL(fn));
