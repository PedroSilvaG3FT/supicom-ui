export class FileUtil {
  public static blobToFile(blob: Blob, fileName: string = "file"): File {
    return new File([blob], fileName, {
      type: blob.type || "application/octet-stream",
      lastModified: new Date().getTime(),
    });
  }
}
