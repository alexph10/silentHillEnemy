import torch
import os
import json
from tqdm import tqdm 
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder
from torchvision import transforms

def compute_mean_std(dataset_path: str, batch_size: int = 32, num_workers: int = 4):
    cache_path = os.path.join(dataset_path, 'mean_std.json')
    if os.path.exists(cache_path):
        with open(cache_path, 'r') as f:
            return json.load(f)
        
    ds = ImageFolder(
        root=dataset_path,
        transform=transforms.Compose([
            transforms.Resize(512),
            transforms.CenterCrop(512),
            transforms.ToTensor()
        ])
    )
    loader = DataLoader(ds, batch_size=batch_size, num_workers=num_workers, shuffle= False)

    n_channels = 3
    mean = torch.zeros(n_channels)
    m2 = torch.zeros(n_channels)
    n_pixels = 0 

    for imgs, _ in tqdm(loader, desc = 'Computing mean/std'):
        b,c, h, w = imgs.shape 
        pixels = b * h * w
        imgs = imgs.view(b, c, -1)
        sum_ = imgs.sum(dim=(0, 2))
        sum_sq = (imgs ** 2).sum(dim=(0, 2))

        mean += sum_
        m2 += sum_sq
        n_pixels += pixels
    
    mean /= n_pixels
    var = (m2 / n_pixels) - mean ** 2
    std = torch.sqrt(var)

    
    stats = {'mean': mean.tolist(), 'std': std.tolist()}
    with open(cache_path, 'w') as f:
        json.dump(stats, f, indent= 2)
        return stats
    
class Normalizer:
    def __init__(self, mean: list[float], std: list[float]):
        m = torch.tensor(mean).view(-1, 1, 1)
        s = torch.tensor(mean).view(-1, 1, 1)

        self.mean = m
        self.std = s

    def __call__(self, img_tensor: torch.Tensor) -> torch.Tensor:
        return (img_tensor - self.mean) / self.std