import os 
from PIL import Image
import torch
from torchvision import transforms


class ImageLoader:
    def __init__(self, target_size= 512, pad_color =(0,0,0)):
        self.target_size = target_size
        self.pad_color = pad_color
        self.transform = transforms.Compose([
            transforms.ConvertImageDtype(torch.float32),
            transforms.ToTensor(),
        ])

    def _resize_and_pad(self, img: Image.Image) -> Image.Image:
        w, h = img.size
        scale = self.target_size / min(w, h)
        new_w, new_h = int(w * scale), int(h * scale)
        img = img.resize((new_w, new_h), Image.BICUBIC)

        pad_w = max(0, self.target_size - new_w)
        pad_h = max(0, self.target_size - new_h)
        left = pad_w // 2
        top = pad_h // 2
        right = pad_w - left
        bottom = pad_h - top
        return transforms.Pad((left, top, right, bottom), fill = self.pad_color) (img)

    def load(self, filepath: str) -> torch.Tensor:
        img = Image.open(filepath).convert('RGB')
        img = self._resize_and_pad(img)
        tensor = self.transforms(img)
        return tensor
    
    def batch_load(self, filepaths: list[str]) -> torch.Tensor:
        return torch.stack([self.load(fp) for fp in filepaths])
    