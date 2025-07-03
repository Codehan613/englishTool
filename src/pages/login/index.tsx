import { Button, Image } from "@heroui/react";
import React from "react";
import GifImag from "@/assets/images/coin.gif";
import loadingImag from "@/assets/images/tree_loading.png";
import { useUserStore } from "@/store";
import { replace, useNavigate } from "react-router-dom";
interface CoinIconProps {
  width?: number;
  height?: number;
  size?: string;
  alt?: string;
}
export const CoinIcon: React.FC<CoinIconProps> = ({
  width = 30,
  height = 30,
  size = "sm",
  alt = "icon",
  ...props
}) => {
  return <Image alt={alt} src={GifImag} width={width} sizes={size} height={height} {...props} />;
};
export default function Login() {
  const user = useUserStore();
  const navigate = useNavigate();
  const handelLogin = () => {
    // console.log(user)
    user.SET_TOKEN("userLoginEnglish");
    navigate("/englishTool/database", { replace: true });
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div>
          <Image src={loadingImag} width={300} height={300} alt="logo" />
        </div>
        <Button
          onPress={handelLogin}
          color="success"
          size="lg"
          radius="lg"
          className="text-xl sm:text-xl md:text-2xl"
          variant="bordered">
          To Learn
        </Button>
      </div>
    </>
  );
}
