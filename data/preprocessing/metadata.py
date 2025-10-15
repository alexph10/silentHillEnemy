import os
import csv
import json
from typing import List, Dict

class MetadataWriter:
    def __init__(self, output_path: str):
        self.output_path = output_path
        os.makedirs(os.path.dirname(output_path), exist_ok = True)
        self.fields = ['filename', 'monster_name', 'source_type']

    def write(self, records: List[Dict[str, str]]):
        ext = os.path.splitext(self.output_path)[1].lower()
        if ext == '.csv':
            self._write_csv(records)
        elif ext == '.json':
            self._write_json(records)
        else:
            raise ValueError("Unsupported metadata format")
        
    def _write_csv(self, records: List[Dict[str, str]]):
        with open(self.output_path, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames = self.fields)
            writer.writeheader()
            for rec in records:
                writer.writerow(rec)
    
    def _write_json(self, records: List[Dict[str, str]]):
        with open(self.output_path, 'w') as f:
            json.dump(records, f, indent= 2)