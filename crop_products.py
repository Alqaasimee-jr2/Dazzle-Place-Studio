from PIL import Image
import os, glob

folder = r'c:\Users\DELL\Desktop\Dazzle Place Studio\assets\products'
files = sorted(glob.glob(os.path.join(folder, '*.jpeg')) + glob.glob(os.path.join(folder, '*.jpg')))
print(f'Found {len(files)} files')

for f in files:
    if '_crop' in f:
        continue
    try:
        img = Image.open(f)
        w, h = img.size
        # Remove phone status bar (top ~8%) and keep only the product image area (up to ~70%)
        top = int(h * 0.08)
        bottom = int(h * 0.70)
        cropped = img.crop((0, top, w, bottom))
        out = os.path.splitext(f)[0] + '_crop.jpg'
        cropped.convert('RGB').save(out, 'JPEG', quality=88)
        print(f'OK: {os.path.basename(out)}  {cropped.size}')
    except Exception as e:
        print(f'ERR {os.path.basename(f)}: {e}')

print('ALL DONE')
