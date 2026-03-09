import styles from './FormButton.module.css';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  btnName: string;
  disabled?: boolean;
}

export const FormButton = ({ btnName }: FormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={styles.button}
      type="submit"
      disabled={pending}>
      {pending ? "Отправка..." : btnName}
    </button>
  );
};  