import styles from './FileIcon.module.css'

export default function FileIcon({ mirror, label }: { mirror:boolean, label:string }) {
    let fileStyles: string;
    let textStyles: string;

    if (mirror) {
        fileStyles = `${styles.fileIconMirror}`;
        textStyles = `${styles.textMirror}`;
    } else {
        fileStyles = `${styles.fileIcon}`;
        textStyles = `${styles.text}`;
    }

    return (
        <div className={styles.fileIconContainer}>
            <div className={fileStyles}></div>
            <p className={textStyles}>{ label }</p>
        </div>
    );
}
