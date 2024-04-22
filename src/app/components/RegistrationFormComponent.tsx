'use client'

import React from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input, Select } from 'antd'

type FieldType = {
  username: string,
  email: string,
  password: string,
  passwordRepeat: string,
  birthdate: Date,
  gender: string,
  phoneNumber: number,
}

const RegistrationForm: React.FC = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="7">+7</Option>
        <Option value="375">+375</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      scrollToFirstError
    >
      <Form.Item<FieldType>
        label="Username (имя пользователя)"
        name="username"
        rules={[{ required: true, message: 'пожалуйста, введите ваш username' }]}
      >
        <Input placeholder="Ваш username" />
      </Form.Item>

      <Form.Item<FieldType>
        label="E-mail"
        name="email"
        rules={[{ required: true, message: 'пожалуйста, введите ваш email', type: 'email' }]}
      >
        <Input placeholder="Ваш email" />
      </Form.Item>
      
      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'пожалуйста, введите пароль' }]}
        hasFeedback
      >
        <Input.Password placeholder="Ваш новый пароль" />
      </Form.Item>
      
      <Form.Item<FieldType>
        label="Повторите пароль"
        name="passwordRepeat"
        dependencies={['password']}
        rules={[{ required: true, message: 'пожалуйста, введите пароль повторно' }, ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('пароли не совпадают!'));
          },
        }),]}
      >
        <Input.Password placeholder="Повторите ваш новый пароль" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Дата рождения"
        name="birthdate"
        rules={[{ required: true, message: 'пожалуйста, введите вашу дату рождения', type: 'date' }]}
      >
        <Input placeholder="Ваша дата рождения" />
      </Form.Item>

      <Form.Item
        label="Пол"
        name="gender"
        rules={[{ required: true, message: 'пожалуйста, укажите пол' }]}
      >
        <Select placeholder="Укажите пол" defaultValue="male">
          <Option value="male">Мужской</Option>
          <Option value="female">Женский</Option>
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Номер телефона"
        name="phoneNumber"
        rules={[{ required: true, message: 'пожалуйста, введите ваш номер телефона', type: 'number' }]}
      >
        <Input addonBefore={prefixSelector} placeholder="Ваш номер телефона" {...register('phoneNumber', { required: true })} />
      </Form.Item>

      <Form.Item<FieldType>>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegistrationForm
