"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StorageReference } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { loadingStore } from "@/_store/loading.store";
import { ToastUtil } from "@/_shared/utils/toast.util";
import { CircleMinus, Download, Plus } from "lucide-react";
import { Button } from "@/_core/components/fragments/button";
import { Separator } from "@/_core/components/fragments/separator";
import {
  FileUpload,
  FileUploadRef,
} from "@/_core/components/fragments/ui/file-upload";
import { BackgroundBeams } from "@/_core/components/fragments/ui/background-beams";
import { FirebaseStorageService } from "@/_core/firebase/base/firebase-storage.service";
import {
  DataTable,
  DataTableHeader,
} from "@/_core/components/fragments/datatable";

const _firebaseStorageService = new FirebaseStorageService();

export default function StoragePage() {
  const examplePath = "test";
  const fileUploadRef = useRef<FileUploadRef>(null);
  const _loadingStore = loadingStore((state) => state);

  const [files, setFiles] = useState<File[]>([]);
  const [items, setItems] = useState<StorageReference[]>([]);

  useEffect(() => {
    getAll();
  }, []);

  const handleFileUpload = (files: File[]) => setFiles(files);
  const handleClearFiles = () => fileUploadRef.current?.clearFiles();

  const getAll = () => {
    _loadingStore.setShow(true);

    _firebaseStorageService
      .getAll(examplePath)
      .then((response) => setItems(response.items))
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const handleSubmit = () => {
    if (!files.length) return;
    _loadingStore.setShow(true);

    _firebaseStorageService
      .upload(files[0], examplePath)
      .then(() => {
        getAll();
        setFiles([]);
        handleClearFiles();
      })
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const handleDownload = (file: StorageReference) => {
    _firebaseStorageService
      .download(file.fullPath)
      .then(() => {})
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const handleDelete = (file: StorageReference) => {
    _loadingStore.setShow(true);

    _firebaseStorageService
      .delete(file.fullPath)
      .then(() => getAll())
      .catch(() => ToastUtil.error("Error on request"))
      .finally(() => _loadingStore.setShow(false));
  };

  const columns: ColumnDef<StorageReference>[] = [
    {
      enableSorting: true,
      accessorKey: "name",
      header: ({ column }) => <DataTableHeader column={column} title="Name" />,
      cell: ({ row }) => row.original.name,
    },
    {
      enableSorting: true,
      accessorKey: "bucket",
      header: ({ column }) => (
        <DataTableHeader column={column} title="Bucket" />
      ),
      cell: ({ row }) => row.original.bucket,
    },

    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <section className="flex gap-2 items-center justify-end">
            <Button
              size={"xs"}
              variant={"ghost"}
              onClick={() => handleDownload(row.original)}
            >
              <Download className="w-4" />
            </Button>

            <Button
              size={"xs"}
              variant={"ghost"}
              className="text-red-400"
              onClick={() => handleDelete(row.original)}
            >
              <CircleMinus className="w-4" />
            </Button>
          </section>
        );
      },
    },
  ];

  return (
    <section>
      <h1 className="page-title">Storage</h1>
      <Separator className="my-4" />

      <article className="grid gap-4 grid-cols-2 mobile:grid-cols-1">
        <section className="flex gap-4 flex-col items-center">
          <FileUpload
            maxFiles={1}
            ref={fileUploadRef}
            onChange={handleFileUpload}
            backgroundEl={<BackgroundBeams />}
          />
          <Button
            className="mobile:w-full"
            onClick={handleSubmit}
            disabled={!files.length}
          >
            Create file
            <Plus className="ml-2" />
          </Button>
        </section>

        <Separator className="hidden my-4 mobile:block" />

        <DataTable data={items} columns={columns} />
      </article>
    </section>
  );
}
