import random 
import torch
import torchvision.transforms.functional as F
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np

class RandomColorJitter:
    def __init__(self, brightness = 0.2, contrast= 0.2, saturation = 0.2, hue = 0.05):
        self.brightness = brightness
        self.contrast = contrast
        self.saturation = saturation
        self.hue = hue