import React, { useEffect, useState } from 'react';
import { exec } from 'child_process';

const DbManager = () => {
    const [data, setData] = useState([]);
    const [newItem, setNewItem] = useState('');

    const fetchData = () => {
        exec('node scripts/fileManager.js read', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error fetching data: ${stderr}`);
                return;
            }
            setData(JSON.parse(stdout || '[]'));
        });
    };

    const createOrUpdateData = () => {
        const updatedData = [...data, newItem];

        exec(`node scripts/fileManager.js write '${JSON.stringify(updatedData)}'`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error writing data: ${stderr}`);
                return;
            }
            setNewItem('');
            fetchData();
        });
    };

    const deleteData = () => {
        exec('node scripts/fileManager.js delete', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error deleting data: ${stderr}`);
                return;
            }
            fetchData();
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>Manage JSON Data</h2>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new item"
            />
            <button onClick={createOrUpdateData}>Add/Update</button>
            <button onClick={deleteData}>Delete All</button>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default DbManager;
