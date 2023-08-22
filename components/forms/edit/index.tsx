import {
  Button, Form, Input, notification, Typography,
} from "antd";
import { useEffect, useState } from "react";
import { ServerGroup } from "@/pages/api/serverGroups";
import { JsonBodyValidator } from "@/utils/validation/json-body";
import { ServerAddress } from "@/pages/api/serverAddresses";
import { WalletLinkAddress } from "@/pages/api/walletLinkAddresses";
import { joinAndCapitalize } from "@/utils/strings/capitalize";
import BaseModalForm from "../base-modal-form";

export type Entity = ServerGroup | ServerAddress | WalletLinkAddress;

export enum EntitiesUri {
  serverGroups = "serverGroups",
  serverAddresses = "serverAddresses",
  walletLinkAddresses = "walletLinkAddresses",
}

type EditFormProps = {
  entity?: Entity;
  visible: boolean
  onClosed: () => void;
  onSaved: (entity: Entity) => void;
  entitiesUri: EntitiesUri;
  entityName: string;
};

type FormValues = { body: string };

const DEFAULT_VALUES: FormValues = {
  body: "",
};

function EditForm({
  onClosed, onSaved, entity, visible, entitiesUri, entityName,
}: EditFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const resetFields = () => {
    form.resetFields();
  };

  const onSubmit = (value: FormValues) => {
    setLoading(true);
    setErrors([]);

    const request = entity
      ? fetch(`/api/${entitiesUri}/${entity._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value.body),
      }) : fetch(`/api/${entitiesUri}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value.body),
      });

    request.then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const result = await res.json();
      if (result.insertedId) {
        onSaved({ _id: result.insertedId, ...JSON.parse(value.body) });
        notification.success({
          message: `${joinAndCapitalize(entityName)} was created successfully`,
        });
      } else {
        onSaved(JSON.parse(value.body));
        notification.success({
          message: `${joinAndCapitalize(entityName)} was updated successfully`,
        });
      }
      resetFields();
    }).catch((e) => {
      setErrors([e.message]);
    }).finally(() => setLoading(false));
  };

  const handleOk = async () => {
    form.submit();
  };

  const handleCancel = () => {
    resetFields();
    onClosed();
  };

  useEffect(() => {
    if (entity) {
      form.setFieldsValue({ body: JSON.stringify(entity, null, 2) });
    } else {
      form.setFieldsValue(DEFAULT_VALUES);
    }
    setErrors([]);
  }, [form, entity]);

  return (
    <BaseModalForm
      open={visible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={handleCancel}
      title={entity ? `Edit ${entityName}` : `Create ${entityName}`}
      footer={(
        <div style={{ display: "flex", gap: "20px" }}>
          <Button
            loading={loading}
            onClick={handleOk}
            type="primary"
          >
            {entity ? `Save ${entityName}` : `Create ${entityName}`}

          </Button>
          <Button
            onClick={handleCancel}
          >
            Don&apos;t save
          </Button>
        </div>
      )}
    >
      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          name="body"
          required
          rules={[
            { required: true, message: `Please input ${entityName} body!` },
            {
              validator: JsonBodyValidator,
              message: "Body should be valid JSON-object",
            },
          ]}
        >
          <Input.TextArea rows={11} placeholder={`Place ${entityName} body here in JSON format`} />
        </Form.Item>
        <Form.Item>
          {errors.map((error) => <Typography.Paragraph type="danger">{error}</Typography.Paragraph>)}
        </Form.Item>
      </Form>
    </BaseModalForm>
  );
}
export default EditForm;
