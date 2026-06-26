import fs from "fs-extra";
import path from "node:path";

const ROOT = path.join(
  process.cwd(),
  "app-data",
  "contact-submissions"
);

async function moveFile(
  source: string,
  destinationFolder: string
): Promise<string> {
  await fs.ensureDir(destinationFolder);

  const destination = path.join(
    destinationFolder,
    path.basename(source)
  );

  await fs.move(source, destination, {
    overwrite: false,
  });

  return destination;
}

export async function markProcessed(filePath: string) {
  return moveFile(
    filePath,
    path.join(ROOT, "processed")
  );
}

export async function markFailed(filePath: string) {
  return moveFile(
    filePath,
    path.join(ROOT, "failed")
  );
}

export async function archiveSubmission(filePath: string) {
  return moveFile(
    filePath,
    path.join(ROOT, "archive")
  );
}
