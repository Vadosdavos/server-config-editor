import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button, Checkbox, Form, Input, Typography,
} from "antd";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

type FormValues = {
  username: string;
  password: string;
  remember: boolean;
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const redirect = query.redirect?.toString() || "/";
  if (req.cookies.token) {
    return {
      redirect: {
        statusCode: 302,
        destination: redirect,
      },
    };
  }
  return {
    props: {
      redirect,
    },
  };
};

const LoginPage: NextPage<{ redirect: string }> = ({ redirect }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (values: FormValues) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        router.push(redirect);
      } else if (res.status === 401) {
        const { message } = await res.json();
        setError(message);
      } else {
        setError(`Error ${res.status}. Please try again later or ask us to help`);
      }
    } catch (e) {
      setError("Unknown error. Please try again later!");
    }
  };

  const onFinish = async (values: FormValues) => {
    setError(null);
    setLoading(true);
    login(values);
    setLoading(false);
  };

  return (
    <main style={{
      minHeight: "100vh",
      padding: "4rem 20px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
      <Form
        name="normal_login"
        style={{ maxWidth: 400, width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
            Log in
          </Button>
        </Form.Item>
        {error && (
          <Form.Item>
            <Typography.Text type="danger" data-testid="text-error">
              {error}
            </Typography.Text>
          </Form.Item>
        )}
      </Form>
    </main>
  );
};

export default LoginPage;
