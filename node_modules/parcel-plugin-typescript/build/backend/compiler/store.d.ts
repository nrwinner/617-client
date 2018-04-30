import * as ts from 'typescript';
export declare class FileStore {
    static shared(): FileStore;
    private static sharedInstance;
    changedFiles: string[];
    private readonly files;
    private readonly sources;
    exists(path: string): boolean;
    readFile(path: string, onlyCache?: boolean): string | undefined;
    readSource(path: string, target: ts.ScriptTarget): ts.SourceFile;
    writeFile(path: string, contents: string): void;
    getDirectories(path?: string): string[];
    invalidate(path: string): void;
    getFiles(directory?: string): string[];
}
