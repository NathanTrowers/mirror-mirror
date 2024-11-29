import fs from 'node:fs';
import path from 'node:path';

import { copy, remove } from './mirror';

describe('mirror', () => {
    it('copies all files into the target directory', () => {
        const sourceDir: string[] = [ 
            path.resolve('test-copy-source-dir/test-sub-dir1'),
            path.resolve('test-copy-source-dir/test-sub-dir2'),
            path.resolve('test-copy-source-dir/Test Main Folder File.md'),
        ];
        const targetDir: string = path.resolve('test-target-directory');

        expect(() => copy(sourceDir, targetDir)).not.toThrow();
    });
    
    it('replaces updated file in the target directory', () => {
        const modifiedFilePath: string = path.resolve('test-copy-source-dir/Test Main Folder File.md');
        let fileData: string = '\n#### (echo)... just praising The Lord!\n';
        fs.writeFileSync(modifiedFilePath, fileData, { flag: 'a' });

        const sourceDir: string[] = [ 
            path.resolve('test-copy-source-dir/test-sub-dir1'),
            path.resolve('test-copy-source-dir/test-sub-dir2'),
            modifiedFilePath,
        ];
        const targetDir: string = path.resolve('test-target-directory');

        expect(() => copy(sourceDir, targetDir)).not.toThrow();
        expect(fs.readFileSync(`${targetDir}/Test Main Folder File.md`).includes(fileData))
            .toBeTruthy();
    });

    // Not adding files to the target folder will result in nothing being deleted.
    it('deletes all files not found in source directory', () => {
        const sourceDir: string = path.resolve('test-delete-source-dir');
        const targetDir: string = path.resolve('test-target-directory');
        const targetDirContents: string[] = fs.readdirSync(targetDir)
            .map(directoryItem => path.join(targetDir, directoryItem));

        expect(() => remove(sourceDir, targetDirContents)).not.toThrow();
    });

    afterAll(() =>{
        let fileData = '# SOMETHING GOOD IS GOING TO HAPPEN ...\n\n'
            +'## Something Good is in Store ...\n\n'
            +'### We are together again, just praising The Lord!\n';
        fs.writeFileSync(path.resolve('test-copy-source-dir/Test Main Folder File.md'), fileData);
    });
});
