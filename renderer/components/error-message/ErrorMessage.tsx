import { MouseEventHandler } from 'react';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({closeDialogueBox}:{closeDialogueBox:MouseEventHandler<HTMLButtonElement>}) {
    return (
        <div className={styles.errorMessageArea}>
            <section className={styles.errorMessageBox}>
                <div className={styles.text}>
                    <p>The Mirror Broke!</p>
                    <p>Try Again</p>
                </div>
                <button 
                    className={styles.closeButton}
                    onClick={closeDialogueBox}
                >x</button>
            </section>
        </div>
    );
}
