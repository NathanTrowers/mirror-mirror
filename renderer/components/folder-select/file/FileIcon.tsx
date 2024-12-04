import styles from './FileIcon.module.css'

export default function FileIcon({ mirror, label }: { mirror:boolean, label:string }) {
    let fileStyles: string;
    let textStyles: string;
    let flexContainerStyles: string;

    if (mirror) {
        fileStyles = `${styles.fileIconMirror}`;
        flexContainerStyles = `${styles.flexContainerMirror}`;
        textStyles = `${styles.textMirror}`;
    } else {
        fileStyles = `${styles.fileIcon}`;
        flexContainerStyles = `${styles.flexContainer}`;
        textStyles = `${styles.text}`;
    }

    return (
        <div className={flexContainerStyles}> 
            <div className={styles.fileIconContainer}>
                <div className={fileStyles}></div>
            </div>
            <p className={textStyles}>{ label }</p>
        </div>
    );
}
