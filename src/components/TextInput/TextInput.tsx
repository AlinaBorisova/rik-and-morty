import styles from './TextInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  withAsterisk?: boolean;
  icon?: React.ReactNode;
  error?: string;
}

export const TextInput = ({
  label,
  description,
  withAsterisk,
  icon,
  error,
  ...otherProps }: TextInputProps) => {
  const inputClasses = `${styles.input} ${icon ? styles.withIcon : ''} ${error ? styles.inputError : ''}`;

  return (
    <div className={styles.inputWrapper}>

      <label className={styles.label}>
        {label}
        {withAsterisk && <span className={styles.asterisk}> *</span>}
      </label>

      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.inputContainer}>
        {icon && (
          <div className={styles.iconSlot}>
            {icon}
          </div>
        )}
        <input {...otherProps} className={inputClasses} />
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}