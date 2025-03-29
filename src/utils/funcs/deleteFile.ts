import { promises as fsPromises } from 'fs';
import * as fs from 'fs';

export const deleteFile = async (filePath: string | undefined): Promise<void> => {
    try {
        // Check if file exists using synchronous check
        if (filePath && fs.existsSync(filePath)) {
            // Delete file asynchronously
            await fsPromises.unlink(filePath);
        }
    } catch (error) {

    }
};

export const deleteFiles = async (filePaths: (string | undefined)[]): Promise<void> => {
    try {
        await Promise.all(
            filePaths
                .filter((path): path is string => !!path)
                .map(filePath => deleteFile(filePath))
        );
    } catch (error) {
        console.error('Error deleting files:', error);
    }
};


