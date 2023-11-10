/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useMemo, useState } from "react";

import { Col, Input, Row, Upload, UploadFile } from "antd";
import { FormInstance } from "antd/lib/form";
import { RcFile, UploadChangeParam } from "antd/lib/upload/interface";
import { isEqual } from "lodash";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import FormBox, { Item } from "@/components/organisms/FormBox/FormBox";
import {
  CreateAdminRequestBody,
  EditAdminRequestBody,
} from "@/features/admins/types/admins.types";
import {
  confirmPassword,
  emailRules,
  passwordRules,
  requiredRules,
} from "@/helpers/validations.helpers";
import { getMessage } from "@/utils/utils";

import styles from "./AdminForm.module.scss";
import { acceptedImageFileTypes, AdminsPathsEnum } from "../../admins";
import {
  adminInitialValue,
  convertAdminInitialValue,
} from "../../helpers/admins.helpers";
import { getBase64, getCroppedImg } from "../../helpers/crop-photo.helpers";
import useGetAdmin from "../../hooks/useGetAdmin";
import { CroppedAreaPixel } from "../../types/common.types";
import CropUploadedPhoto from "../CropUploadedPhoto/CropUploadedPhoto";

interface AdminFormProps {
  onSubmit: (
    userAdmin: CreateAdminRequestBody | EditAdminRequestBody,
    image?: File | null,
    isHasUploadFile?: boolean
  ) => void;
  formInstance: FormInstance;
  isSubmitting?: boolean;
  fieldsRequire?: string[];
  avatarErrorMsg?: string;
}

const AdminForm = ({
  onSubmit,
  formInstance,
  isSubmitting,
  fieldsRequire,
  avatarErrorMsg,
  ...formProps
}: AdminFormProps) => {
  const { t } = useTranslation("admin");
  const navigate = useNavigate();
  const { adminId } = useParams<{ adminId: string }>();
  const { admin } = useGetAdmin(adminId);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<UploadFile | null>();
  const [croppedArea, setCroppedArea] = useState<CroppedAreaPixel | null>(null);
  const [imageLocation, setImageLocation] = useState<CroppedAreaPixel | null>();
  const [initialImageUrl, setInitialImageUrl] = useState<string>();
  const [errorMessageUpload, setErrorMessageUpload] = useState<string>("");

  useEffect(() => {
    if (admin) {
      setInitialImageUrl(admin?.avatarInfo?.url);
    }
  }, [admin]);

  useEffect(() => {
    if (admin) {
      setImageLocation(
        (imageLocation === null || imageLocation === undefined) &&
          croppedArea !== null
          ? croppedArea
          : imageLocation
      );
    }
  }, [admin, croppedArea, imageLocation]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getFileName = (filename: string) => {
    const fileNameSeparatorIndex = filename?.lastIndexOf("-");
    const name = filename?.substring(
      fileNameSeparatorIndex + 1,
      filename.length
    );
    return name;
  };

  // const handleFinish = async (
  //   values: CreateAdminRequestBody | EditAdminRequestBody
  // ) => {
  //   if (croppedArea && initialImageUrl) {
  //     const croppedImageFile = await getCroppedImg(
  //       initialImageUrl,
  //       croppedArea,
  //       selectedFile?.name ?? getFileName(admin?.avatarInfo?.imagepath ?? "")
  //     );
  //     onSubmit(values, croppedImageFile, !isEqual(imageLocation, croppedArea));
  //   } else {
  //     onSubmit(values);
  //   }
  // };

  const handleCancel = () => {
    navigate(AdminsPathsEnum.ADMINS);
  };

  const handleFileChange = async (e: UploadChangeParam) => {
    const fileChoose = e.fileList?.[0];
    if (fileChoose) {
      setSelectedFile(fileChoose);
      const url = await getBase64(fileChoose.originFileObj as RcFile);
      setInitialImageUrl?.(url);
      formInstance.setFieldsValue({
        filePath: `/${fileChoose.name}`,
      });
    }
  };

  const formValues = useMemo(() => {
    return admin
      ? {
          ...convertAdminInitialValue(admin),
          filePath: admin.avatarInfo?.imagepath,
        }
      : adminInitialValue;
  }, [admin]);

  const handleBeforeUpload = (file: RcFile) => {
    setErrorMessageUpload("");
    const isTooLargeSize = file.size / 1024 / 1024 > 3;
    const isInvalidFile = acceptedImageFileTypes.includes(file.type);
    const isError = (!isTooLargeSize && !isInvalidFile) || Upload.LIST_IGNORE;

    if (isTooLargeSize) {
      setSelectedFile(null);
      setInitialImageUrl(undefined);
      setErrorMessageUpload(getMessage("MSG0019"));
      return isError;
    }

    if (!isInvalidFile) {
      setSelectedFile(null);
      setInitialImageUrl(undefined);
      setErrorMessageUpload(getMessage("MSG_INVALID_IMAGE"));
      return isError;
    }

    return false;
  };

  return (
    <FormBox
      form={formInstance}
      onFinish={() => console.log(123)}
      onCancel={handleCancel}
      labelAlign="left"
      title={t("form.title")}
      className="mb-10"
      labelWrap
      formValues={formValues}
      isSubmitting={isSubmitting}
      fieldsRequire={fieldsRequire}
      submitButtonText={adminId ? t("button.save") : undefined}
      isEditImage={!isEqual(imageLocation, croppedArea)}
      {...formProps}
    >
      <Row className="pb-8">
        <Col span={15}>
          <Item name="id">
            <Input type="hidden" />
          </Item>
          <Item
            label={<div className={styles.root}>{t("form.email")}</div>}
            labelCol={{ span: 6 }}
          >
            <Col span={11}>
              <Item
                name="email"
                rules={[
                  ...requiredRules(t("form.email")),
                  ...emailRules(t("form.email")),
                ]}
                validateFirst
              >
                <Input maxLength={100} disabled={!!adminId} />
              </Item>
            </Col>
          </Item>

          <Item
            className="mb-0"
            label={<div className={styles.root}>{t("form.name")}</div>}
            labelCol={{ span: 6 }}
          >
            <Row>
              <Col span={11}>
                <Item
                  name="nameFamily"
                  rules={requiredRules(t("form.name_family"))}
                >
                  <Input placeholder={t("form.name_family")} maxLength={20} />
                </Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Item
                  name="nameFirst"
                  rules={requiredRules(t("form.name_first"))}
                >
                  <Input placeholder={t("form.name_first")} maxLength={20} />
                </Item>
              </Col>
            </Row>
          </Item>

          {!adminId && (
            <>
              <Item
                name="password"
                label={t("form.password")}
                rules={[
                  ...passwordRules(),
                  ...requiredRules(t("form.password")),
                ]}
                wrapperCol={{ span: 9 }}
                labelCol={{ span: 6 }}
                validateFirst
              >
                <Row>
                  <Col span={22}>
                    <Input type="password" maxLength={32} />
                  </Col>
                  <Col />
                </Row>
              </Item>
              <Item
                className="mb-0"
                label={
                  <div className={styles.root}>
                    {t("form.confirm_password")}
                  </div>
                }
                labelCol={{ span: 6 }}
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  ...passwordRules(),
                  ...confirmPassword("password"),
                  ...requiredRules(t("form.confirm_password")),
                ]}
                validateFirst
              >
                <Row>
                  <Col span={11}>
                    <Input type="password" maxLength={32} />
                  </Col>
                </Row>
              </Item>
            </>
          )}
        </Col>

        <Col span={2} />

        <Col span={7}>
          <CropUploadedPhoto
            accept="image/*"
            label={t("form.avatar")}
            onChange={handleFileChange}
            setCroppedArea={setCroppedArea}
            url={initialImageUrl}
            beforeUpload={handleBeforeUpload}
            errorMessage={errorMessageUpload || avatarErrorMsg}
            form={formInstance}
            uploadItemProps={{
              name: "filePath",
              labelCol: { span: 5 },
              wrapperCol: { span: 24 },
            }}
          />
        </Col>
      </Row>
    </FormBox>
  );
};
export default memo(AdminForm);
