import { S3Bucket } from "https://deno.land/x/s3@0.4.1/mod.ts";
import { YAML } from "https://js.sabae.cc/YAML.js";

class S3 {
  async init(putopt = { acl: "public-read" }) { // default public!!
    this.putopt = putopt;
    
    const setting = YAML.parse(await Deno.readTextFile("s3.secret.yml"));
    // https://docs.aws.amazon.com/general/latest/gr/s3.html
    const AWS_S3_ENDPOINT_URL = "https://s3." + setting.AWS_REGION + ".amazonaws.com";
    this.bucket = new S3Bucket({
      accessKeyID: setting.AWS_ACCESS_KEY_ID,
      secretKey: setting.AWS_SECRET_ACCESS_KEY,
      bucket: setting.AWS_S3_BUCKET,
      region: setting.AWS_REGION,
      endpointURL: AWS_S3_ENDPOINT_URL,
    });
    this.baseurl = "https://" + setting.AWS_S3_BUCKET + ".s3." + setting.AWS_REGION + ".amazonaws.com/";
    return this;
  }
  getURL(fn) {
    return this.baseurl + fn;
  }
  async put(fn, bin, opt) {
    if (typeof bin == "string" && opt == undefined) {
      opt = { contentType: "text/plain" };
    }
    if (this.putopt) {
      if (!opt) {
        opt = {};
      }
      Object.assign(opt, this.putopt);
    }
    return await this.bucket.putObject(fn, bin, opt);
  }
  async get(fn) {
    return await this.bucket.getObject(fn);
  }
  async getText(fn) {
    const { body } = await this.get(fn);
    return await new Response(body).text();
  }
  async getBin(fn) {
    const { body } = await this.get(fn);
    return new Uint8Array(await new Response(body).arrayBuffer());
  }
  async list() {
    const res = [];
    const list = this.bucket.listAllObjects({});
    for await (const obj of list) {
      res.push(obj);
    }
    return res;
  }
  async del(fn) {
    return await this.bucket.deleteObject(fn);
  }
  async clear() {
    const list = this.bucket.listAllObjects({});
    for await (const obj of list) {
      await this.del(obj.key);
    }
  }
}

export { S3 };
