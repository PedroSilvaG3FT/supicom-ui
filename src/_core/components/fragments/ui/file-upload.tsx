"use client";

import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@tabler/icons-react";
import { cn } from "@/_core/components/lib/utils";
import { LucideIcon, Upload, X } from "lucide-react";
import {
  ReactNode,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { ToastUtil } from "@/_shared/utils/toast.util";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export interface FileUploadRef {
  clearFiles: () => void;
}

interface IFileUploadProps {
  title?: string;
  accept?: string;
  icon?: LucideIcon;
  maxFiles?: number;
  className?: string;
  description?: string;
  backgroundEl?: ReactNode;
  onChange?: (files: File[]) => void;
  initialFiles?: File[];
}

export const FileUpload = forwardRef<FileUploadRef, IFileUploadProps>(
  (props, ref) => {
    const {
      accept,
      onChange,
      className,
      maxFiles = 5,
      icon: Icon = Upload,
      backgroundEl: BackgroundEl,
      title = "File upload",
      description = `Drag or drop your files here\nor click to upload`,
      initialFiles = [],
    } = props;
    const [files, setFiles] = useState<File[]>(initialFiles);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      handleEmit(files);
    }, [files]);

    const handleEmit = (data: File[]) => {
      onChange && onChange(data);
    };

    const handleFileChange = (newFiles: File[]) => {
      if (!newFiles.length) return;

      if (maxFiles === 1) {
        const [currentFile] = newFiles;
        setFiles([currentFile]);
        return;
      }

      const totalFiles = files.length + newFiles.length;
      if (totalFiles > maxFiles) {
        ToastUtil.info(`Você pode selecionar no máximo ${maxFiles} arquivos.`);
        return;
      }

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleRemoveFile = (index: number) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    const clearFiles = () => {
      setFiles([]);
    };

    useImperativeHandle(ref, () => ({ clearFiles }));

    const { getRootProps, isDragActive } = useDropzone({
      multiple: maxFiles > 1,
      noClick: true,
      onDrop: handleFileChange,
      onDropRejected: (error) => {
        console.log(error);
      },
    });

    return (
      <div className={cn("w-full", className)} {...getRootProps()}>
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className="p-10 group/file block border rounded-lg cursor-pointer w-full relative overflow-hidden"
        >
          <input
            type="file"
            accept={accept}
            ref={fileInputRef}
            className="hidden"
            id="file-upload-handle"
            multiple={maxFiles > 1}
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            {BackgroundEl}
          </div>
          <div className="flex flex-col items-center justify-center">
            <Icon className="mb-4" />
            <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
              {title}
            </p>
            <p className="relative z-20 text-center whitespace-pre font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
              {description}
            </p>
            <div className="relative w-full mt-10 max-w-xl mx-auto">
              {files?.length > 0 &&
                files?.map((file, idx) => (
                  <motion.div
                    key={"file" + idx}
                    layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                    className={cn(
                      "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                      "shadow-sm"
                    )}
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-base flex items-center text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                      >
                        {file?.name}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                      >
                        {(file?.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                      >
                        {file?.type}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                      >
                        modificado{" "}
                        {new Date(file?.lastModified).toLocaleDateString()}
                      </motion.p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(idx);
                      }}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ))}
              {files.length < maxFiles && (
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-background/60 dark:border-dotted flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Solte aqui
                      <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  )}
                </motion.div>
              )}

              {files.length < maxFiles && (
                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                ></motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
