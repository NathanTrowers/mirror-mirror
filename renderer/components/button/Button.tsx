import styles from './Button.module.css';

export default function Button({ text, action, buttonType }) {
    let buttonStyles: string = buttonType === 'chooseDirectory'
        ? `${styles.chooseDirectory}`
        : `${styles.chooseAnotherDirectory}`;

    return (
        <button 
            onClick={action}
            className={buttonStyles}
        >
            {text}
        </button>
    );
}
