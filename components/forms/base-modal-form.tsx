import { CloseCircleOutlined } from "@ant-design/icons";
import {
  Modal, ModalProps, Typography,
} from "antd";
import { CSSProperties } from "react";

export type BaseModalFormProps = ModalProps & {
  title: string;
} & {
  bodyStyle?: CSSProperties
};

const CloseIcon = () => <CloseCircleOutlined style={{ color: "#1890FF" }} />;

function BaseModalForm({
  bodyStyle,
  footer, children,
  style,
  title, ...props
}: BaseModalFormProps) {
  return (
    <Modal
      style={{ top: 0, ...style }}
      width={755}
      bodyStyle={{
        minHeight: "100vh",
        backgroundColor: "white",
        padding: "212px 50px 50px",
        display: "flex",
        flexDirection: "column",
        ...bodyStyle,
      }}
      footer={null}
      closeIcon={<CloseIcon />}
      {...props}
    >
      <Typography.Title style={{
        textAlign: "center",
        fontSize: "30px",
        fontWeight: "normal",
        marginBottom: "30px",
      }}
      >
        {title}
      </Typography.Title>
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1,
      }}
      >
        {children}
        {footer && (
          <div style={{
            paddingTop: "50px",
            borderTop: "solid 1px #D9D9D9",
            display: "flex",
            justifyContent: "space-between",
          }}
          >
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              {footer}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BaseModalForm;
