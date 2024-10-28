from transformers import BlipProcessor, BlipForConditionalGeneration
import torch
from PIL import Image
import numpy as np

MODEL_PATH = "D:\\Tailor AI Full Stack\\server\\model\BLIP Fashion Captioning"

# Load BLIP processor and model
processor = BlipProcessor.from_pretrained(MODEL_PATH)
model = BlipForConditionalGeneration.from_pretrained(MODEL_PATH)

def image_caption_and_embedding(image_path: str):
    # Load an image
    image = Image.open(image_path)

    # Process the image
    inputs = processor(images=image, return_tensors="pt")

    # Generate captions
    outputs = model.generate(**inputs)
    caption = processor.decode(outputs[0], skip_special_tokens=True)


    return caption
