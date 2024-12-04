import { useState } from 'react'
import Button from './button/Button'
import FileIcon from './file/FileIcon'
import FolderIcon from './folder/FolderIcon'
import FolderDisplay from './FolderDisplay';

import styles from './FolderSelect.module.css'

export default function FolderSelect({ mirror, onFolderSelect }: { mirror:boolean, onFolderSelect: Function }) {
    const [fileDisplay, setFileDisplay] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const handleFileDialogue = () => {
        window.ipc.send(onTargetSelect, '');
        window.ipc.on(onTargetSelect, (result: any[]) => {
            onFolderSelect({folderPath: result[0], folderContents: result[1]});
            setFileDisplay(result[2]);
            setIsActive(true);
        });
    }

    let folderHolderStyles: string;
    let folderSelectStyles: string;
    let buttonBoxStyles: string;
    let buttonText: string;
    let isMirror: boolean;
    let onTargetSelect: string;
    if (mirror) {
        folderHolderStyles = `${styles.folderHolderMirror}`;
        folderSelectStyles = `${styles.folderSelectMirror}`;
        buttonBoxStyles = `${styles.buttonBoxMirror}`;
        buttonText = 'Choose a target directory';
        isMirror = true;
        onTargetSelect = 'onTargetFolderSelect';
    } else {
        folderHolderStyles = `${styles.folderHolder}`;
        folderSelectStyles = `${styles.folderSelect}`;
        buttonBoxStyles = `${styles.buttonBox}`;
        buttonText = 'Choose a source directory';
        isMirror = false;
        onTargetSelect = 'onSourceFolderSelect';
    }

    if (!isActive) {
        return (
            <div className={`${folderSelectStyles} ${styles.firstSelectCenter}`}>
                    <Button
                        text={buttonText}
                        action={handleFileDialogue}
                        buttonType={'chooseDirectory'}
                    />
            </div>
        );
    }
    
    if (isActive && fileDisplay.length > 0) {
        return (
            <div className={folderSelectStyles}>
                <section className={folderHolderStyles}>
                    { fileDisplay.map( (singleItem: FolderDisplay, index: number) => {
                        const { fileName, isFile } = singleItem;

                        return isFile
                            ? <FileIcon
                                key={index}
                                mirror={isMirror}
                                label={fileName}
                            />
                            : <FolderIcon
                                key={index}                            
                                mirror={isMirror}
                                label={fileName}
                            />
                    })}
                </section>
                <aside className={buttonBoxStyles}>
                    <Button
                        text='Choose another directory'
                        action={handleFileDialogue}
                        buttonType='chooseAnotherDirectory'
                    />
                </aside>
            </div>
        );
    }

    return (
        <div className={folderSelectStyles}>
            <div className={`${folderSelectStyles} ${styles.firstSelectCenter}`}>
                <p>Folder Empty</p>
            </div>
            <aside className={buttonBoxStyles}>
                <Button
                    text='Choose another directory'
                    action={handleFileDialogue}
                    buttonType='chooseAnotherDirectory'
                />
            </aside>
        </div>
    );
}
