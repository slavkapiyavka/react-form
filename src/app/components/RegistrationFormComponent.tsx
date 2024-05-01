'use client'

import React, { useEffect } from 'react'
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
  phoneNumber: string,
}

const RegistrationForm: React.FC = () => {
  const { control, handleSubmit, trigger, watch, formState: { errors } } = useForm<FieldType>({ mode: 'onChange' })
  const passwordInput = watch('password')

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Select.Option value="7">+7</Select.Option>
        <Select.Option value="375">+375</Select.Option>
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    if (passwordInput) {
      trigger("passwordRepeat")
    }
  }, [passwordInput, trigger]);
  

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit(onFinish)}
      autoComplete="off"
      scrollToFirstError
      initialValues={{ prefix: '7', gender: ''}}
      style={{ maxWidth: 600 }}
    >
      <Form.Item<FieldType>
        label="Username (имя пользователя)"
        name="username"
        help={errors.username && errors.username.message}
        validateStatus={errors.username ? 'error' : 'success'}
        required
      >
        <Controller
          control={control}
          name="username"
          rules={{
            required: 'пожалуйста, введите ваш username',
            minLength: {
              value: 2,
              message: 'username должен быть длиннее двух символов'
            }
          }}
          render={({ field }) => (
            <Input {...field} placeholder="Ваш username" />
          )}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="E-mail"
        name="email"
        help={errors.email && errors.email.message}
        validateStatus={errors.email ? 'error' : 'success'}
        required
        >
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'пожалуйста, введите ваш e-mail',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'невалидный e-mail'
            }
          }}
          render={({ field }) => (
            <Input {...field} placeholder="Ваш e-mail" />
          )}
        />
      </Form.Item>
      
      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        help={errors.password && errors.password.message}
        validateStatus={errors.password ? 'error' : 'success'}
        required
        >
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'пожалуйста, введите пароль',
            minLength: {
              value: 6,
              message: 'пароль должен быть длиннее 6 символов'
            },
            pattern: {
              value: /(?=.*[A-Z])/,
              message: 'пароль должен содержать хотя бы одну заглавную букву'
            }
          }}
          render={({ field }) => (
            <Input.Password {...field} placeholder="Ваш новый пароль" />
          )}
        />
      </Form.Item>
      
      <Form.Item<FieldType>
        label="Повторите пароль"
        name="passwordRepeat"
        help={errors.passwordRepeat && errors.passwordRepeat.message}
        validateStatus={errors.passwordRepeat ? 'error' : 'success'}
        required
        >
        <Controller
          control={control}
          name="passwordRepeat"
          rules={{
            required: 'пожалуйста, повторите пароль',
            validate: (v) => v === passwordInput || 'пароли не совпадают',
          }}
          render={({ field }) => (
            <Input.Password {...field} placeholder="Повторите ваш новый пароль" />
          )}
        />
      </Form.Item>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="Дата рождения"
            name="birthdate"
            help={errors.birthdate && errors.birthdate.message}
            validateStatus={errors.birthdate ? 'error' : 'success'}
            required
          >
            <Controller
              control={control}
              name="birthdate"
              rules={{
                required: 'пожалуйста, введите вашу дату рождения',
                validate: {
                  tooYoung: (v) => {
                    const today = new Date()
                    const birthdate = new Date(v)
                    console.log('today: ', today.getFullYear());
                    console.log('birthdate: ', birthdate.getFullYear());
                    if (today.getFullYear() - birthdate.getFullYear() <= 14) {
                      return 'слишком пиздюк'
                    } else if (today.getFullYear() - birthdate.getFullYear() >= 140) {
                      return 'слишком древний'
                    }
                    return true
                  }
                }
              }}
              render={({ field }) => (
                <DatePicker {...field} placeholder="Ваша дата рождения" style={{ width: '100%' }}/>
              )}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<FieldType>
            label="Пол"
            name="gender"
            help={errors.gender && errors.gender.message}
            validateStatus={errors.gender ? 'error' : 'success'}
            required
          >
            <Controller
              control={control}
              name="gender"
              rules={{
                required: 'пожалуйста, укажите пол'
              }}
              render={({ field }) => (
                <Select {...field} placeholder="Укажите пол">
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
        validateStatus={errors.phoneNumber && 'error'}
        help={errors.phoneNumber?.message}
        required
      >
        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: 'Пожалуйста, введите ваш номер телефона',
            pattern: {
              value: /^\d+$/,
              message: 'Номер телефона должен содержать только цифры'
            }
          }}
          render={({ field }) => <Input {...field} name={field.name} addonBefore={prefixSelector} placeholder="Ваш номер телефона" style={{ width: '100%' }} />}
        />
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
