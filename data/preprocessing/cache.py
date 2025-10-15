import os 
import lmdb
import pickle
from typing import Any


class LMDBCache:
    def __init__ (self, db_path: str, map_size: int = 1 << 40):
        os.makedirs(os.path.dirname(db_path), exist_ok = True)
        self.env = lmdb.open(db_path, map_size = map_size, readonly = False, lock= True)
    
    def put (self, key: str, value: Any):
        with self.env.begin(write=True) as txn:
            txn.put(key.encode('utf-8'), pickle.dumps(value))
        
    def get(self, key:str) -> Any:
        with self.env.begin(write=False)  as txn:
            data = txn.get(key.encode('utf-8'))
            return pickle.loads(data) if data else None
    
    def close(self):
        self.env.close()