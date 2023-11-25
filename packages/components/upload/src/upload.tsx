import { createNamespace, isFunction } from "@nimble-ui/utils";
import { defineComponent, ref } from "vue";
import { YFlex } from "@nimble-ui/components/flex";
import { YImage } from "@nimble-ui/components/image";

import uploadProps, { UploadRawFile, UploadFileItem } from "./types";
let fileId = 1;
const genFileId = () => Date.now() + fileId++;

export default defineComponent({
  name: "YUpload",
  props: uploadProps(),
  emits: ["clickUpload", "update:fileList", "exceed", "change"],
  setup(props, ctx) {
    const inputRef = ref<HTMLInputElement>();
    const bem = createNamespace("upload");

    const handleStart = (file: UploadRawFile) => {
      if (!file.uid) {
        file.uid = genFileId();
      }
      const { fileList, listType } = props;

      const uploadFile: UploadFileItem = {
        name: file.name,
        percentage: 0,
        status: "ready",
        size: file.size,
        raw: file,
        uid: file.uid,
      };

      if (listType == "picture" || listType == "picture-card") {
        try {
          uploadFile.url = URL.createObjectURL(file);
        } catch (e: unknown) {
          console.log(e);
        }
      }

      fileList.push(uploadFile);
      ctx.emit("update:fileList", fileList);
    };
    const handleProgress = () => {
      console.log(222);
    };
    const handleSuccess = () => {
      console.log(333);
    };
    const handleRemove = () => {
      console.log(444);
    };
    const handleError = () => {
      console.log(555);
    };

    const handleFiles = (files: File[]) => {
      if (files.length === 0) return;

      const { fileList, maxCount } = props;
      if (maxCount && fileList?.length + files.length > maxCount) {
        ctx.emit("exceed", files, fileList);
        return;
      }

      for (const file of files) {
        const rawFile = file as UploadRawFile;
        rawFile.uid = genFileId();
        handleStart(rawFile);
      }
    };

    const onChange = (e: Event) => {
      const { files } = e.target as HTMLInputElement;
      if (!files) return;
      const list = Array.from(files);
      handleFiles(list);
      ctx.emit("change", list);
    };

    const onClickUpload = (event: MouseEvent) => {
      ctx.emit("clickUpload", event);
      inputRef.value?.click();
    };

    const renderUpload = () => {
      const { maxCount, fileList, readonly, disabled, multiple, accept, uploadText } = props;
      if (maxCount && maxCount >= fileList.length && maxCount != 1) {
        return null;
      }
      const d = isFunction(disabled) ? disabled() : disabled;
      const Input = readonly ? null : (
        <input
          type="file"
          ref={inputRef}
          accept={accept}
          disabled={d}
          multiple={multiple}
          class={bem.e("input")}
          onChange={onChange}
        />
      );

      if (ctx.slots.default) {
        return (
          <div class={bem.e("warp")} onClick={onClickUpload}>
            {ctx.slots.default()}
            {Input}
          </div>
        );
      }

      return (
        <YFlex vertical justify="center" align="center" class={bem.e("button")} onClick={onClickUpload}>
          <span class={bem.m("icon", "button")}></span>
          {uploadText && <span>{uploadText}</span>}
          {Input}
        </YFlex>
      );
    };

    const renderList = () => {
      const { fileList } = props;
      return (
        <>
          {fileList.map((item) => {
            return (
              <div key={item.uid} class={bem.e("image")}>
                <YImage src={item.url} />
                <span class={[bem.m("actions", "image")]}>删除</span>
              </div>
            );
          })}
        </>
      );
    };

    return () => {
      return (
        <YFlex wrap gap={8} class={bem.b()}>
          {renderList()}
          {renderUpload()}
        </YFlex>
      );
    };
  },
});
