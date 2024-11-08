import styles from './FolderIcon.module.css'

export default function FolderIcon({ mirror, label }: { mirror:boolean, label:string }) {
    let bodyStyles: string;
    let flapStyles: string;
    let textStyles: string;

    if (mirror) {
        bodyStyles = `${styles.folderBodyMirror}`;
        flapStyles = `${styles.folderFlapMirror}`;
        textStyles = `${styles.textMirror}`;

    } else {
        flapStyles = `${styles.folderFlap}`;
        bodyStyles = `${styles.folderBody}`;
        textStyles = `${styles.text}`;
    }

    return (
        <div className={styles.folderIcon}>
            <div className={flapStyles}></div>
            <div className={bodyStyles}></div>
            <p className={textStyles}>{ label }</p>
        </div>
    );
}
