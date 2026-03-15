# S3API

API for S3

## Features
- Provides a simple API for interacting with AWS S3 buckets
- Supports basic operations like uploading, downloading, listing, and deleting files
- Automatically handles authentication using AWS credentials
- Allows setting default access control policies for uploaded files

## Requirements
- [Deno](https://deno.land) runtime environment

## Usage
1. Create an `s3.secret.yml` file in the `example` directory with the following contents:

```yaml
AWS_ACCESS_KEY_ID: 
AWS_SECRET_ACCESS_KEY: 
AWS_S3_BUCKET: 
AWS_REGION: ap-northeast-1
```

2. Replace the placeholder values with your actual AWS credentials and S3 bucket information.

3. Use the `S3` class in your code to interact with the S3 bucket:

```javascript
import { S3 } from "../S3.js";

const s3 = await new S3().init();

// Upload a file
await s3.put("test.html", "test");

// List files
console.log(await s3.list());

// Get the URL of a file
console.log(s3.getURL("test.html"));
```

## License
This project is licensed under the [MIT License](LICENSE).