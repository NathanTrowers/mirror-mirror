import styles from './FolderIcon.module.css'

export default function FolderIcon({ mirror, label }: { mirror:boolean, label:string }) {
    let bodyStyles: string;
    let flapStyles: string;
    let textStyles: string;
    let flexContainerStyles: string;

    if (mirror) {
        bodyStyles = `${styles.folderBodyMirror}`;
        flapStyles = `${styles.folderFlapMirror}`;
        flexContainerStyles = `${styles.flexContainerMirror}`;
        textStyles = `${styles.textMirror}`;
    } else {
        bodyStyles = `${styles.folderBody}`;
        flapStyles = `${styles.folderFlap}`;
        flexContainerStyles = `${styles.flexContainer}`;
        textStyles = `${styles.text}`;
    }

    return (
        <div className={flexContainerStyles}>
            <div className={styles.folderIcon}>
                <div className={flapStyles}></div>
                <div className={bodyStyles}></div>
            </div>
            <p className={textStyles}>{ label }</p>
        </div>
    );
}
