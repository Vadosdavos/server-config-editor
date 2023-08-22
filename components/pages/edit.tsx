import EditForm, { EntitiesUri, Entity } from "@/components/forms/edit";
import Layout from "@/components/layout";
import { joinAndCapitalize } from "@/utils/strings/capitalize";
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Button, notification, Popconfirm, Table, Typography,
} from "antd";
import { useState } from "react";

type EditPageProps = {
  entitiesProps: Entity[];
  entitiesUri: EntitiesUri;
  entityName: string;
  title: string;
};

type DataSource = {
  key: number,
  view: HTMLPreElement,
  data: Entity,
};

export const EditPage = ({
  entitiesProps, entitiesUri, entityName, title,
}: EditPageProps) => {
  const [loading, setLoading] = useState(false);
  const [entities, setEntities] = useState<Entity[]>(entitiesProps);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [entityForEdit, setEntityForEdit] = useState<Entity | undefined>();

  const onDeleteClick = (entity: Entity) => {
    if (!entity) {
      return;
    }
    setLoading(true);
    const request = fetch(`/api/${entitiesUri}/${entity._id}`, { method: "DELETE" });
    request.then(() => {
      setEntities(entities.filter((el) => el._id !== entity._id));
      notification.success({
        message: `${joinAndCapitalize(entityName)} was deleted successfully`,
      });
    }).catch((e) => notification.error({ message: e.message }))
      .finally(() => setLoading(false));
  };

  const columns = [{
    dataIndex: "view",
  }, {
    title: (
      <Button
        type="primary"
        onClick={() => {
          setEntityForEdit(undefined);
          setEditFormVisible(true);
        }}
      >
        Create
        {" "}
        {entityName}
      </Button>),
    render: (item: DataSource) => (
      <span style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            setEntityForEdit(item.data);
            setEditFormVisible(true);
          }}
          icon={<EditOutlined />}
        />
        <Popconfirm
          title={`Delete ${entityName}`}
          description={`Are you sure to delete this ${entityName}?`}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => onDeleteClick(item.data)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            loading={loading}
            danger
            icon={<DeleteOutlined />}
          />
        </Popconfirm>

      </span>
    ),
    width: "100px",
  }];

  const dataSource = entities.map((el, index) => ({
    key: index,
    view: (<pre>{JSON.stringify(el, null, 2)}</pre>),
    data: el,
  }));

  const onSaved = (saved: Entity) => {
    let isNew = true;
    const updatedEntities = entities.map((el) => {
      if (el._id === saved._id) {
        isNew = false;
        return saved;
      }
      return el;
    });
    if (isNew) {
      updatedEntities.push(saved);
    }
    setEntities(updatedEntities);
    setEditFormVisible(false);
    setEntityForEdit(undefined);
  };

  return (
    <>
      <Layout>
        <Typography.Title level={2}>{title}</Typography.Title>
        <Table columns={columns} dataSource={dataSource} loading={loading} />
      </Layout>
      {editFormVisible
        && (
          <EditForm
            entity={entityForEdit}
            visible={editFormVisible}
            entitiesUri={entitiesUri}
            entityName={entityName}
            onSaved={onSaved}
            onClosed={() => {
              setEditFormVisible(false);
              setEntityForEdit(undefined);
            }}
          />
        )}
    </>
  );
};
