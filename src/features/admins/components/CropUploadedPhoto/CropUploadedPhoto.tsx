import { ChangeEvent, memo, useCallback, useState } from "react";

import {
  Col,
  FormInstance,
  FormItemProps,
  Row,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";
import cx from "classnames";
import { t } from "i18next";
import Cropper from "react-easy-crop";

import { ReactComponent as UploadIcon } from "@/assets/images/upload-icon.svg";
import Button from "@/components/atoms/Button/Button";
import { Item } from "@/components/organisms/FormBox/FormBox";

import styles from "./CropUploadedPhoto.module.scss";
import { CroppedAreaPixel } from "../../types/common.types";

interface CropUploadedPhotoProps extends UploadProps {
  label?: string;
  btnText?: string;
  setCroppedArea?: (value: CroppedAreaPixel | null) => void;
  url?: string;
  form?: FormInstance;
  errorMessage?: string;
  uploadItemProps?: FormItemProps;
}

const CropUploadedPhoto = ({
  label,
  btnText = t("button.upload"),
  setCroppedArea,
  url,
  form,
  errorMessage,
  uploadItemProps,
  ...props
}: CropUploadedPhotoProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onCropComplete = useCallback(
    async (croppedArea: unknown, croppedAreaPixelsValue: CroppedAreaPixel) => {
      setCroppedArea?.(croppedAreaPixelsValue);
    },
    [setCroppedArea]
  );

  const handleFileChange = async (event: UploadChangeParam) => {
    setFileList(event.fileList);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    props.onChange?.(event);
  };

  const handleZoom = (event: ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(event.target.value));
    form?.setFieldsValue({
      zoom: event.target.value,
    });
  };

  return (
    <>
      <Item
        name={uploadItemProps?.name}
        label={label}
        help={
          errorMessage && (
            <div className="ant-form-item-explain-error">{errorMessage}</div>
          )
        }
        labelCol={uploadItemProps?.labelCol}
        wrapperCol={uploadItemProps?.wrapperCol}
      >
        <Upload
          onChange={handleFileChange}
          fileList={fileList}
          showUploadList={false}
          {...props}
        >
          <Button
            className={cx(
              "px-5 flex-align-center bg-white text-black border-gray-color"
            )}
            icon={<UploadIcon />}
          >
            {btnText}
          </Button>
        </Upload>
      </Item>
      <Row>
        <Col span={uploadItemProps?.labelCol?.span} />
        <Col>
          {url && (
            <>
              <Cropper
                image={url}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                cropSize={{
                  width: 100,
                  height: 100,
                }}
                showGrid={false}
                classes={{ containerClassName: styles.containerClass }}
              />
              <Item className={styles.controls} initialValue={zoom}>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={handleZoom}
                  className={styles.zoomRange}
                />
              </Item>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default memo(CropUploadedPhoto);
