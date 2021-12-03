import fs from "fs";
import path from "path";

export function readdirSyncRecursive(root, files = []) {
  const blobs = fs.readdirSync(root);
  const tempFiles = files;

  blobs.forEach((blob) => {
    const blobPath = path.join(root, blob);
    const result = fs.statSync(blobPath);

    if (result.isFile()) {
      tempFiles.push(blobPath);
      return;
    }

    readdirSyncRecursive(blobPath, tempFiles);
  })

  return files;
}
