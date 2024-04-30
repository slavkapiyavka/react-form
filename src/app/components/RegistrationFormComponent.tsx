'use client'

import React from 'react'
import type { FormProps } from 'antd'
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { useForm, Controller } from 'react-hook-form'

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
  const { register, control } = useForm<FieldType>()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Select.Option value="7">+7</Select.Option>
        <Select.Option value="375">+375</Select.Option>
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
      initialValues={{ prefix: '7', gender: ''}}
      style={{ maxWidth: 600 }}
    >
      <Form.Item<FieldType>
        label="Username (имя пользователя)"
        name="username"
        rules={[{ required: true, message: 'пожалуйста, введите ваш username' }]}
      >
        <Input placeholder="Ваш username" {...register('username', { required: true })}/>
      </Form.Item>

      <Form.Item<FieldType>
        label="E-mail"
        name="email"
        rules={[{ required: true, message: 'пожалуйста, введите ваш email', type: 'email' }]}
      >
        <Input placeholder="Ваш email" {...register('email', { required: true })} />
      </Form.Item>
      
      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'пожалуйста, введите пароль' }]}
        hasFeedback
      >
        <Input.Password placeholder="Ваш новый пароль" {...register('password', { required: true })} />
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
        <Input.Password placeholder="Повторите ваш новый пароль" {...register('passwordRepeat', { required: true })} />
      </Form.Item>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="Дата рождения"
            name="birthdate"
            rules={[{ required: true, message: 'пожалуйста, введите вашу дату рождения' }]}
          >
            <Controller
              control={control}
              name="birthdate"
              render={({ field }) => (
                <DatePicker placeholder="Ваша дата рождения" {...field} style={{ width: '100%' }}/>
              )}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<FieldType>
            label="Пол"
            name="gender"
            rules={[{ required: true, message: 'пожалуйста, укажите пол' }]}
          >
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select placeholder="Укажите пол" {...field}>
                  <Select.Option value="male">Мужской</Select.Option>
                  <Select.Option value="female">Женский</Select.Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>
      </Row>


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
