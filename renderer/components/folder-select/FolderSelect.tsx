import Button from '../button/Button'
import FileIcon from '../file/FileIcon'
import FolderIcon from '../folder/FolderIcon'
import styles from './FolderSelect.module.css'

export default function FolderDisplay({ mirror }: { mirror:boolean }) {

    const handleFileDialogue = () => {

    }

    let folderHolderStyles: string;
    let folderSelectStyles: string;
    let buttonBoxStyles: string;
    let buttonText: string;
    let isMirror: boolean;
    if (mirror) {
        folderHolderStyles = `${styles.folderHolderMirror}`;
        folderSelectStyles = `${styles.folderSelectMirror}`;
        buttonBoxStyles = `${styles.buttonBoxMirror}`;
        buttonText = 'Choose a target directory';
        isMirror = true;
    } else {
        folderHolderStyles = `${styles.folderHolder}`;
        folderSelectStyles = `${styles.folderSelect}`;
        buttonBoxStyles = `${styles.buttonBox}`;
        buttonText = 'Choose a source directory';
        isMirror = false;
    }
    return (
        <div className={`${folderSelectStyles} ${styles.firstSelectCenter}`}>
            <div className={styles.firstSelect}>
                <Button
                    text={buttonText}
                    action={handleFileDialogue}
                    buttonType={'chooseDirectory'}
                />
            </div>
        </div>
        // <div className={folderSelectStyles}>
        //     <section className={folderHolderStyles}>
        //         <FolderIcon 
        //             mirror={isMirror}
        //             label='labelText'
        //         />
        //         <FolderIcon 
        //             mirror={isMirror}
        //             label='labelText'
        //         />
        //         <FolderIcon 
        //             mirror={isMirror}
        //             label='labelText'
        //         />
        //         <FolderIcon 
        //             mirror={isMirror}
        //             label='labelText'
        //         />
        //         <FolderIcon 
        //             mirror={isMirror}
        //             label='labelText'
        //         />
        //         <FileIcon 
        //             mirror={isMirror}
        //             label='labelText'
        //         />
        //         <FileIcon 
        //             mirror={isMirror}
        //             label='labelText'
        //         />
        //     </section>
        //     <aside className={buttonBoxStyles}>
        //         <Button
        //             text='Choose another directory'
        //             action={handleFileDialogue}
        //             buttonType='chooseAnotherDirectory'
        //         />
        //     </aside>
        // </div>
    );
}
