import React, { useEffect, useState } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { bundle } from '../bundler';

const CodeCell = () => {
    const [input, setInput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setError(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [input]);

    return (
        <Resizable direction="vertical">
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Resizable direction={'horizontal'}>
                    <CodeEditor
                        initialValue="const a = 1;"
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} err={error}/>
            </div>
        </Resizable>
    );
};

export default CodeCell;
