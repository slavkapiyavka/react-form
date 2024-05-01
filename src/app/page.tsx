'use client'

import { notification } from 'antd';
import styles from './page.module.css'
import RegistrationForm from './components/RegistrationFormComponent'
import { RegistrationFormData } from './shared/interfaces';

export default function Home() {
  const [api, contextHolder] = notification.useNotification()
  const data = ({ username, email, phoneNumber, birthdate }: RegistrationFormData) => {
    const birthdateDay = new Date(birthdate).getDay()
    const birthdateMonth = new Date(birthdate).getMonth()
    const birthdateYear = new Date(birthdate).getFullYear()

    api.open({
      message: `Пользователь ${username} успешно зарегистрирован`,
      description: `
        E-mail: ${email},
        Номер телефона: ${phoneNumber},
        Дата рождения: ${birthdateDay}/${birthdateMonth}/${birthdateYear}
      `,
      duration: 0
    })
  }

  return (
    <main className={styles.main}>
      {contextHolder}
      <RegistrationForm getModalData={data} />
    </main>
  );
}
