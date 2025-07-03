import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getLesson } from "@/utils/db/vocabDB";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Code,
  Divider,
} from "@heroui/react";
import TextArea from "./textarea";
import { $copy, formatWordEntry } from "@/utils";
import { Back2Fill } from "../components/iconList";
import { div } from "framer-motion/client";
export default function CreateGramer() {
  const navigator = useNavigate();
  const [searchParam] = useSearchParams();
  let lesson = searchParam.get("lesson");
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const feachData = async () => {
    // const lesson = searchParam.get("lesson");
    if (lesson) {
      const data = await getLesson(lesson);
      let currentData = { ...data };
      let temp = data?.words.map((word: any) => {
        return {
          ...word,
          isShow: false,
          sentences: [{ key: 1, value: "" }],
        };
      });
      currentData.words = temp;
      // console.log(currentData);
      setCurrentLesson(currentData);
    } else {
      console.log("no lesson");
    }
  };
  const handleWordChange = (currentWord: any, sentenceKey: any, value: string) => {
    const newWords = [...currentLesson.words];
    let newsentences = currentWord.sentences.map((sentence: any) => {
      if (sentence.key === sentenceKey) {
        return {
          ...sentence,
          value: value,
        };
      } else {
        return sentence;
      }
    });
    newWords[currentWord.key] = {
      ...currentWord,
      sentences: newsentences,
    };
    setCurrentLesson({ ...currentLesson, words: newWords });
  };
  const handelChange = (sentenceObj: any, word: any) => {
    const newWords = { ...currentLesson };
    let newWord = { ...word };
    let sentence = newWord.sentences.map((sentence: any) => {
      if (sentence.key === sentenceObj.key) {
        return {
          ...sentence,
          value: sentenceObj.value,
        };
      } else {
        return sentence;
      }
    });
    let wordsTarget = newWords.words.map((wordItem: any) => {
      if (wordItem.id === word.id) {
        newWord = {
          ...wordItem,
          sentences: sentence,
        };
        return newWord;
      } else {
        return wordItem;
      }
    });
    setCurrentLesson({ ...currentLesson, words: wordsTarget });
  };
  const copyValue = async () => {
    let str = "";
    currentLesson.words.forEach((word: any) => {
      let wordStr = formatWordEntry(word);
      str += wordStr + "\n";
    });
    const res = await $copy(str);
    if (res) {
      addToast({
        color: "success",
        title: "Copied to clipboard",
      });
    }
  };
  const addSentences = (word: any) => {
    // console.log(word);
    const newSentens = [...word.sentences, { key: word.sentences.length + 1, value: "" }];
    setCurrentLesson({
      ...currentLesson,
      words: currentLesson.words.map((wordItem: any) => {
        if (wordItem.id === word.id) {
          return { ...word, sentences: newSentens };
        } else return wordItem;
      }),
    });
  };
  const delSentences = (word: any, sentenceKey: number) => {
    const newSentens = word.sentences.filter((sentence: any) => sentence.key !== sentenceKey);
    setCurrentLesson({
      ...currentLesson,
      words: currentLesson.words.map((wordItem: any) => {
        if (wordItem.id === word.id) {
          return { ...word, sentences: newSentens };
        } else return wordItem;
      }),
    });
  };

  useEffect(() => {
    feachData();
  }, []);
  const handelBack = () => {
    navigator("/");
  };

  return (
    <div className="w-full md:flex  md:justify-center ">
      <div className="p-4 box-border w-[100vw] md:w-[50vw] lg:w-[50vw] overflow-x-hidden">
        <div onClick={handelBack}>
          <Back2Fill />
        </div>
        {currentLesson && (
          <>
            <div>
              <div className="text-center text-lg">
                <h1 className="text-2xl font-bold">{currentLesson.enTitle}</h1>
                <p>{currentLesson.zhTitle}</p>
              </div>
              {currentLesson.words.map((item: any) => (
                <Card className=" mt-2" key={item.word}>
                  <CardHeader className="flex gap-3 justify-between items-center">
                    <div className="flex flex-col items-start">
                      <p className="text-2xl font-bold">{item.word}</p>
                      <p className="text-lg text-default-500">{item.phonetic}</p>
                    </div>
                    <div>
                      <Code size="lg" className="text-2xl font-bold">
                        {item.type} {item.meaning}
                      </Code>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    {item.sentences?.map((sentence: any) => (
                      <div key={sentence.key} className="flex gap-2 items-center mb-2">
                        {/* <div>{sentence.key}</div> */}
                        <TextArea
                          sentence={sentence}
                          wordItem={item}
                          onValueChange={handelChange}
                        />
                        {/* <Textarea
                      minRows={1}
                      className="w-full"
                      label={item.key}
                      value={sentence.value}
                      onChange={e => {
                        handleWordChange(item, sentence.key, e.target.value);
                      }}
                      placeholder="Enter your description"
                    /> */}
                        {sentence.key > 1 && (
                          <Button color="default" onPress={() => delSentences(item, sentence.key)}>
                            -
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <Button color="default" onPress={() => addSentences(item)}>
                      +
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div>
              <Button size="lg" className="w-full" color="success" onPress={copyValue}>
                复制
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
