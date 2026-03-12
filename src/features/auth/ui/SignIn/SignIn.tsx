import { TextInput } from '../../../../shared/ui/textInput/TextInput';
import styles from './Signin.module.css';
import { FormButton } from '../../../../shared/ui/formButton/FormButton';
import { useActionState, useEffect } from 'react';

export interface SigninForm {
  [key: string]: string;
};

interface FormState {
  email?: string;
  password?: string;
  errors?: {
    email?: string;
    password?: string;
  };
  success?: boolean;
};

const initialState: FormState = {
  email: '',
  password: '',
};

const sendData = async (_: FormState, formData: FormData): Promise<FormState> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const errors: FormState['errors'] = {};

  if (!email) errors.email = 'Поле Email не может быть пустым';
 
  if (!password) errors.password = 'Поле Пароль не может быть пустым';
  
  if (Object.keys(errors).length > 0) return { email, errors };

  const data = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ email, password });
    }, 5000);
  });

  return (await data) as FormState;
};

export const Signin = ({ onSubmit }: { onSubmit: (inputs: SigninForm) => void }) => {
  const [state, formAction, isPending] = useActionState(sendData, initialState);

  useEffect(() => {
    if (state && !state.errors && state.email && state.password) {
      onSubmit({ email: state.email, password: state.password });
    }
  }, [state, onSubmit]);

  return (
    <div className={styles.signin}>
      <h1 className={styles.title}>Форма авторизации</h1>
      <form className={styles.form} action={formAction}>
        <TextInput
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          withAsterisk={true}
          error={isPending ? undefined : state?.errors?.email}
        />

        <TextInput
          label="Пароль"
          placeholder="Пароль"
          name="password"
          type="password"
          withAsterisk={true}
          error={isPending ? undefined : state?.errors?.password}
        />

        <FormButton btnName={"Войти"} />
      </form>
    </div>
  );
};