/*
 * @Date: 2025-02-24 15:51:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-05-15 14:55:28
 * @Description: 请填写简介
 */
interface LoadingProps {
  tipText?: string;
  loadingImage?: any;
}
import { Image } from "@heroui/react";
import "@/assets/style/loading.scss";
export default function LoadingNumber(props: LoadingProps) {
  const { tipText, loadingImage } = props;
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-start w-screen pt-56">
        {!loadingImage ? (
          <div className="blobs">
            <div className="blob-center"></div>
            <div className="blob"></div>
            <div className="blob"></div>
            <div className="blob"></div>
            <div className="blob"></div>
            <div className="blob"></div>
            <div className="blob"></div>
          </div>
        ) : (
          <Image src={loadingImage} alt="loading" width="200" height="200"></Image>
        )}
        <div className="mt-6">{tipText}</div>
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg> */}
    </>
  );
}
