import { createNamespace } from "@nimble-ui/utils";
import { defineComponent, ref } from "vue";
import { YFlex } from "@nimble-ui/components/flex";
import { YImage } from "@nimble-ui/components/image";

import uploadProps, { UploadRawFile, UploaderItem } from "./types";
let fileId = 1;
const genFileId = () => Date.now() + fileId++;

export default defineComponent({
  name: "YUpload",
  props: uploadProps(),
  emits: ["clickUpload", "update:fileList", "exceed"],
  setup(props, ctx) {
    const inputRef = ref<HTMLInputElement>();
    const bem = createNamespace("upload");

    const handleStart = (file: UploadRawFile) => {
      file.uid = genFileId();

      const uploadFile: UploaderItem = {
        name: file.name,
        percentage: 0,
        status: "ready",
        size: file.size,
        raw: file,
        uid: file.uid,
      };
      const { "onUpdate:fileList": _onUpdateFileList } = props;
      _onUpdateFileList?.(uploadFile);
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
    };

    const onChange = (e: Event) => {
      const { files } = e.target as HTMLInputElement;
      if (!files) return;
      handleFiles(Array.from(files));
    };

    const onClickUpload = (event: MouseEvent) => {
      ctx.emit("clickUpload", event);
      inputRef.value?.click();
    };

    const renderUpload = () => {
      const { maxCount, fileList, readonly, disabled, multiple, accept, uploadText } = props;
      if (maxCount && maxCount >= fileList.length) {
        return null;
      }

      const Input = readonly ? null : (
        <input
          type="file"
          ref={inputRef}
          accept={accept}
          disabled={disabled}
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
          {fileList.map((item, index) => {
            return (
              <div key={index} class={bem.e("image")}>
                <YImage src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
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
