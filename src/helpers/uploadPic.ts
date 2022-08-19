import {Storage} from '@google-cloud/storage';
import {env} from '../env/server.mjs'

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
 const bucketName = 'user-profile-pics';

// The path to your file to upload

// The new ID for your GCS file
const destFileName = 'your-new-file-name';

// Imports the Google Cloud client library

// Creates a client
const storage = new Storage();

async function uploadFile(file:File) {
    const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: env.STORAGE_CLIENT_EMAIL,
      private_key: env.STORAGE_PRIVATE_KEY,
    },
  });
  

  const bucket = storage.bucket(env.STORAGE_BUCKET_NAME);
  bucket.upload(file.name,{})
  const bucketFile = bucket.file(file.name);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { 'x-goog-meta-test': 'data' },
  };

  const [response] = await bucketFile.generateSignedPostPolicyV4(options);
}

