"use client";

import "react-image-crop/dist/ReactCrop.css";

import Show from "./app-show";
import { RotateCcw, Upload } from "lucide-react";
import { cn } from "@/_core/components/lib/utils";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/_core/components/fragments/button";
import ReactCrop, { ReactCropProps, type Crop } from "react-image-crop";

interface IProps {
  label?: string;
  className?: string;
  initialSrc?: string;
  placeholder?: string;
  contentClassName?: string;
  config?: Partial<ReactCropProps>;
  onChange: (data?: Blob) => void;
}

const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) => {
  const maxWidth = mediaWidth;
  const maxHeight = mediaHeight;

  const cropWidth = Math.min(maxWidth, maxHeight * aspect);
  const cropHeight = Math.min(maxHeight, maxWidth / aspect);

  return {
    unit: "%" as const,
    width: (cropWidth / maxWidth) * 100,
    height: (cropHeight / maxHeight) * 100,
    x: ((maxWidth - cropWidth) / 2 / maxWidth) * 100,
    y: ((maxHeight - cropHeight) / 2 / maxHeight) * 100,
  };
};

export default function AppImageCrop(props: IProps) {
  const {
    config,
    onChange,
    className,
    initialSrc,
    contentClassName = "h-56",
    label = "Selecione um arquivo",
    placeholder = "Selecione um arquivo",
  } = props;

  const [initial, setInitial] = useState("");
  const [isInitialLoaded, setInitialLoaded] = useState(false);

  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [src, setSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const handleClick = () => fileInputRef.current?.click();

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
      setInitial("");
    }
  };

  const handleReset = () => {
    setSrc(null);
    setInitial("");
    onChange(undefined);
  };

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: Crop): Promise<Blob> => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
      }

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, "image/jpeg");
      });
    },
    []
  );

  const handleCropComplete = useCallback(
    (crop: Crop) => {
      if (imageRef && crop.width && crop.height) {
        getCroppedImg(imageRef, crop).then((croppedImage) => {
          onChange(croppedImage);
        });
      }
    },
    [getCroppedImg, onChange, imageRef]
  );

  const onImageLoaded = useCallback(
    (img: HTMLImageElement) => {
      setImageRef(img);
      const { width, height } = img;
      const cropAspect = config?.aspect || 1;
      const initialCrop = centerAspectCrop(width, height, cropAspect);
      setCrop(initialCrop);
      if (initialCrop.width && initialCrop.height) {
        getCroppedImg(img, initialCrop).then((croppedImage) => {
          onChange(croppedImage);
        });
      }
    },
    [config?.aspect, getCroppedImg, onChange]
  );

  useEffect(() => {
    if (initialSrc) {
      setInitial(initialSrc);
      setInitialLoaded(true);
    }
  }, [initialSrc]);

  return (
    <article
      className={cn(
        className,
        "w-full flex flex-col p-4 px-6 pb-6 bg-secondary rounded-md relative"
      )}
    >
      <nav className="flex gap-2 items-center justify-between">
        <h5 className="font-medium text-foreground/50">{label}</h5>

        <Button
          size="icon"
          type="button"
          variant="ghost"
          className="scale-75"
          onClick={handleReset}
          disabled={initialSrc ? false : !src}
        >
          <RotateCcw />
        </Button>
      </nav>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onSelectFile}
        id="file-upload-handle"
        className="hidden w-0 h-0 absolute bottom-0 right-0"
      />

      <Show>
        <Show.When condition={!!initial}>
          <figure className="relative group">
            <p
              onClick={handleClick}
              className="rounded-md opacity-0 group-hover:opacity-100 transition-all duration-500 absolute top-0 left-0 w-full h-full bg-black/60 text-white flex items-center justify-center font-semibold cursor-pointer"
            >
              {placeholder}
            </p>

            <img
              alt="initial"
              src={initial || ""}
              className={cn(
                contentClassName,
                "w-full bg-black object-contain rounded-md"
              )}
            />
          </figure>
        </Show.When>
        <Show.When condition={!src}>
          <section
            onClick={handleClick}
            className={cn(
              contentClassName,
              "group w-full text-foreground/50 rounded border-4 border-dashed flex flex-col items-center justify-center cursor-pointer"
            )}
          >
            <Upload className="scale-150 mb-4 transition-transform duration-500 group-hover:scale-125" />
            <h5 className="text-center font-medium">{placeholder}</h5>
          </section>
        </Show.When>

        <Show.Else>
          <section
            className={cn(
              contentClassName,
              "w-full flex items-center justify-center bg-black overflow-auto rounded-md"
            )}
          >
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={handleCropComplete}
              {...config}
            >
              <img
                alt="Upload"
                src={src || ""}
                onLoad={(e) => onImageLoaded(e.currentTarget)}
                className="max-h-full max-w-full object-contain"
              />
            </ReactCrop>
          </section>
        </Show.Else>
      </Show>
    </article>
  );
}
