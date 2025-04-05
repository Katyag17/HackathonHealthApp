import pytesseract
from PIL import Image
import re

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Fules\Tesseract-OCR\tesseract.exe'
image = image.open("image.jpg")
text = pyteserract.image_to_string(image)

##i'll make a drop box where you can drop the file later
##this just makes the text accessible for ai
print("Raw Text Extracted:")
print(text)


