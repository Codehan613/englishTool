import { getAllLessons, getLesson, saveLessons } from "@/utils/db/vocabDB";
import { useEffect, useState } from "react";
import { vocabData } from "@/utils/db/vocabData";
import { Card, Image, CardFooter, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store";

export default function HomeIndex() {
  const [lessons, setLessons] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    // 初始化写入数据，只执行一次（实际使用中可加条件判断）
    saveLessons(vocabData).then(() => {
      console.log("Saved vocab lessons.");
      fetchData();
    });
  }, []);
  const fetchData = async () => {
    const all = await getAllLessons();
    let temp = all.sort(
      (a: any, b: any) => a.lesson.replace("Lesson", "") - b.lesson.replace("Lesson", "")
    );
    setLessons(temp);
    // console.log(all);
  };
  const handelTag = (lessonKey: any) => {
    console.log(lessonKey);
    navigate(`/englishTool/createGramer/?lesson=${lessonKey}`);
  };
  const handelOut = () => {
    // const user=useUserStore();
    // user.RESET();
    navigate(`/englishTool/login`);
    localStorage.clear();
    // window.location.reload();
  };

  return (
    <div className="p-3">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lessons.map(lesson => (
          <div key={lesson.lesson}>
            <Card
              isFooterBlurred
              className="border-none py-3 box-border cursor-pointer"
              radius="lg">
              {/* <Image
                alt="Woman listing to music"
                className="object-cover"
                // height={100}
                src="https://heroui.com/images/hero-card.jpeg"
                width={"100%"}
                height={120}
              /> */}
              <div className="w-full h-32 text-center">
                <h1 className="text-xl">{lesson.enTitle}</h1>
                <p>{lesson.zhTitle}</p>
              </div>
              {/* {lesson.lesson} */}
              <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small z-10">
                {/* <p className="text-tiny text-white/80">{lesson.lesson}</p> */}
                <Button
                  className="text-lg w-full text-white bg-black/20"
                  color="default"
                  radius="lg"
                  onPress={() => handelTag(lesson.lesson)}
                  size="sm"
                  variant="flat">
                  {lesson.lesson}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div>
        <Button color="success" className="w-full" onPress={handelOut}>
          退出
        </Button>
      </div>
    </div>
  );
}
