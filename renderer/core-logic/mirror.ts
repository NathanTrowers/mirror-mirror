import fs from 'node:fs';
import path from 'node:path';

/** Copies nested files and folders from source to target.
 * If the target directory is missing the latest version of a file 
 * it will overwrite the existing file.
 * 
 * @throws Throws on file system error.
 **/
export const copy = (sourceContents: string[], targetDirectory: string) => {
    try {
        if (sourceContents.length <= 0) {
            return;
        }
    
        const source: string = sourceContents.pop();
        copy(sourceContents, targetDirectory);
    
        const sourceName: string = path.basename(source);
        const targetFolderPath: string = path.join(targetDirectory, sourceName);

        if (fs.lstatSync(source).isFile()
            && (!fs.existsSync(targetFolderPath)
                || fs.statSync(source).mtimeMs > fs.statSync(targetFolderPath).mtimeMs)
        ) {
            const fileData: string = fs.readFileSync(source, 'utf8');
            fs.writeFileSync(targetFolderPath, fileData);
        } 

        if (fs.lstatSync(source).isDirectory()) {
            if (!fs.existsSync(targetFolderPath)) {
                fs.mkdirSync(targetFolderPath);
            }

            const sourceFolderContents: string[] = fs.readdirSync(source)
                .map(directoryItem => path.join(source, directoryItem));
            copy(sourceFolderContents, targetFolderPath);
        }
    } catch (error) {
        throw error;
    }
}

/** Deletes nested files and folders in the target directory if
 * the source directory no longer has them.
 * 
 * @throws Throws on file system error.
 **/
export const remove = (sourceDirectory: string, targetDirectory: string) => {
    try {
        const sourceFolderContents: string[] = fs.readdirSync(sourceDirectory)
            .map(directoryItem => directoryItem);
        const deletionCandidates: string[] = fs.readdirSync(targetDirectory)
            .map(directoryItem => directoryItem)
            .filter(file => !sourceFolderContents.includes(file));
        deletionCandidates.map(fileName => {
            let filePath = path.join(targetDirectory, fileName);
            fs.lstatSync(filePath).isDirectory() 
                ? fs.rmdirSync(filePath, { recursive: true })
                : fs.rmSync(filePath);
        });
    } catch (error) {
        throw error;
    }
}
