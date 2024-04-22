import styles from './page.module.css'
import RegistrationForm from './components/RegistrationFormComponent'

export default function Home() {
  return (
    <main className={styles.main}>
      <RegistrationForm />
    </main>
  );
}
