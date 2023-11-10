import { RcFile } from "antd/lib/upload/interface";

import { formatFileName } from "@/utils/file";

import { CroppedAreaPixel } from "../types/common.types";
/**
 * A promise convert image to base64
 * @param file the selected file from device
 * @returns base64 as url of image
 */
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
/**
 * A promise create new image from url
 * @param url path of the image
 * @returns new image
 */
export const createImage = (url: string) =>
  new Promise<HTMLCanvasElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () =>
      resolve(image as unknown as HTMLCanvasElement)
    );
    image.addEventListener("error", error => reject(error));
    image.crossOrigin = "anonymous";
    image.src = `${url}${
      url.includes("https") ? `?r=${Math.floor(Math.random() * 100000)}` : ""
    }`;
  });
const getRadianAngle = (degreeValue: number) => {
  return (degreeValue * Math.PI) / 180;
};
/**
 * Returns the new bounding area of a rotated rectangle.
 */
const rotateSize = (width: number, height: number, rotation: number): any => {
  const rotRad = getRadianAngle(rotation);
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};
/**
 * using canvas to create new image from cropped area, return it as an image file
 * @param imgUrl path of image want to crop
 * @param pixelCrop coordinates and dimension of cropped area in pixels
 * @param fileName name of image
 * @param rotation rotation of image, default = 0
 * @param flip image flip direction, default { horizontal: false, vertical: false }
 * @returns new image as an image file
 */
export const getCroppedImg = async (
  imgUrl: string,
  fileName: string,
  fileType?: string,
  pixelCrop?: CroppedAreaPixel,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) => {
  const image = await createImage(imgUrl);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    Number(image.width),
    Number(image.height),
    rotation
  );
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;
  context.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  context.translate(-image.width / 2, -image.height / 2);
  context.translate(bBoxWidth / 2, bBoxHeight / 2);
  context.rotate(rotRad);
  context.drawImage(image, 0, 0);
  const objHeight = pixelCrop ? pixelCrop.height : image.height;
  const objWidth = pixelCrop ? pixelCrop.width : image.width;
  const data = context.getImageData(
    pixelCrop ? pixelCrop.x : 0,
    pixelCrop ? pixelCrop.y : 0,
    objWidth,
    objHeight
  );
  canvas.width = objWidth;
  canvas.height = objHeight;
  context.putImageData(data, 0, 0);
  return new Promise<File | null>((resolve, reject) => {
    canvas.toBlob(file => {
      if (file) {
        const croppedImageFile = new File([file], formatFileName(fileName), {
          type: `image/${fileType}`,
        });
        resolve(croppedImageFile);
      }
      reject();
    });
  });
};
