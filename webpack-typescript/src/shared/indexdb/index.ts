export enum Stores {
    Users = 'users',
}

export interface User {
    id: string,
    name: string
}

export const initDB = (storeName: string): Promise<boolean | IDBDatabase> => {
    return new Promise((resolve) => {
        const request: IDBOpenDBRequest = indexedDB.open('myDB');
        let db: IDBDatabase;

        request.onupgradeneeded = () => {
            db = request.result;

            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});
            }
        };

        request.onsuccess = (e) => {
            db = request?.result;

            resolve(request.result);
        };

        request.onerror = (e) => {
            resolve(false);
        };
    });
};

export const addData = <T>(storeName: string, data: T): Promise<T | string | null> => {
    return new Promise((resolve) => {
        const request: IDBOpenDBRequest = indexedDB.open('myDB');
        let db: IDBDatabase;

        request.onsuccess = () => {
            db = request.result;

            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);

            store.add(data);
            resolve(data);
        };

        request.onerror = () => {
            const error = request.error?.message

            resolve(error ?? 'Unknown error')
        };
    });
};

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
    return new Promise((resolve) => {
        const request: IDBOpenDBRequest = indexedDB.open('myDB');
        let db: IDBDatabase;

        request.onsuccess = () => {
            db = request.result;

            const tx = db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const res = store.getAll();

            res.onsuccess = () => {
                resolve(res.result);
            };
        };
    });
};

export const updateData = <T>(storeName: string, key: string, data: T): Promise<T | string | null> => {
    return new Promise((resolve) => {
        const request: IDBOpenDBRequest = indexedDB.open('myDB');
        let db: IDBDatabase;

        request.onsuccess = () => {
            db = request.result;

            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const res = store.get(key);

            res.onsuccess = () => {
                const newData = {...res.result, ...data};
                console.log(key, res, newData)

                store.put(newData);
                resolve(newData);
            };

            res.onerror = () => {
                resolve(null);
            }
        };
    });
};

export const deleteData = (storeName: string, key: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const request: IDBOpenDBRequest = indexedDB.open('myDB');
        let db: IDBDatabase;

        request.onsuccess = () => {
            db = request.result;

            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const res = store.delete(key);

            res.onsuccess = () => {
                resolve(true);
            };

            res.onerror = () => {
                resolve(false);
            }
        };
    });
};


export {};