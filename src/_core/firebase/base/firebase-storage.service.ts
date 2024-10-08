import { FIREBASE_CONFIG } from "./firebase.config";
import { getApp, initializeApp } from "firebase/app";
import { DownloadUtil } from "@/_shared/utils/download.util";
import { generateUUID } from "@/_shared/functions/uuid.function";
import { FIREBASE_STORAGE_ERROR_LIST } from "../constans/firebase-error.constant";
import {
  ref,
  list,
  getStorage,
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export class FirebaseStorageService {
  public storage!: FirebaseStorage;

  constructor() {
    this.init();
  }

  private init() {
    initializeApp(FIREBASE_CONFIG);
    this.storage = getStorage(getApp());
  }

  public getAll(
    path: string,
    maxResults: number = 100,
    pageToken: string = ""
  ) {
    return list(ref(this.storage, path), {
      pageToken,
      maxResults: maxResults || 100,
    });
  }

  public upload(file: File, path: string = "") {
    const extesion = file.type.split("/").pop();
    const name = `${generateUUID()}.${extesion}`;

    const fullPath = !!path ? `${path}/${name}` : name;
    const storageReference = ref(this.storage, fullPath);
    return uploadBytesResumable(storageReference, file);
  }

  public delete(path: string) {
    const reference = ref(this.storage, path);
    return deleteObject(reference);
  }

  public async download(path: string, preventAutoDownload: boolean = false) {
    try {
      const reference = ref(this.storage, path);
      const url = await getDownloadURL(reference);

      if (!preventAutoDownload)
        DownloadUtil.processBlobByUrl(url, reference.name);

      return url;
    } catch (error: any) {
      const defaultErrorMessage = `Unknown error occurred, inspect the server response`;

      const item = FIREBASE_STORAGE_ERROR_LIST.find(
        (value) => value.key === error.code
      );

      const message = item?.message || defaultErrorMessage;

      throw { message };
    }
  }
}
