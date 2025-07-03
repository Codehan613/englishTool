import { Textarea } from "@heroui/react";
import { useState } from "react";

export default function TextArea({
  sentence,
  onValueChange,
  wordItem,
}: {
  sentence: {
    key: number;
    value: string;
  };
  wordItem: any;
  onValueChange: (sentenceObj: any, wordObj: any) => void;
}) {
  const [textareaValue, setTextareaValue] = useState(sentence.value);
  const handelValue = (value: string) => {
    setTextareaValue(value);
    let sentenceObj = {
      key: sentence.key,
      value: value,
    };
    onValueChange(sentenceObj, wordItem);
    // setSentences((prev) =>
    //   prev.map((item) => (item.key === sentence.key ? { ...item, value } : item)),
    // );
  };

  // const { sentences } = useGramer();
  return (
    <>
      {
        <div className="flex gap-2 items-center mb-2 w-full">
          <div>{sentence.key}</div>
          <Textarea
            minRows={1}
            className="w-full"
            classNames={{
              input:'text-lg'
            }}
            // label={textareaValue}
            aria-label="text"
            value={textareaValue}
            onValueChange={handelValue}
            placeholder="输入造的句子"
          />
        </div>
      }
    </>
  );
}
