// Image Utility Class
export class ImageUtils {
  static readonly SUPPORTED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  static readonly MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  static readonly THUMBNAIL_SIZES = [150, 300, 600, 1200];

  static validateImageUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname.toLowerCase();
      const extension = pathname.split('.').pop();
      
      return this.SUPPORTED_FORMATS.includes(extension || '');
    } catch {
      return false;
    }
  }

  static getImageDimensions(url: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = url;
    });
  }

  static calculateAspectRatio(width: number, height: number): string {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  }

  static resizeImage(url: string, width: number, height: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = width;
        canvas.height = height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL());
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }

  static generateThumbnail(url: string, size: number): Promise<string> {
    return this.resizeImage(url, size, size);
  }

  static compressImage(url: string, quality: number = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }

  static convertImageFormat(url: string, format: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const mimeType = `image/${format}`;
          resolve(canvas.toDataURL(mimeType));
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }

  static extractImageColors(url: string, count: number = 5): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const colors = this.extractColorsFromImageData(imageData, count);
          resolve(colors);
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }

  private static extractColorsFromImageData(imageData: ImageData, count: number): string[] {
    const data = imageData.data;
    const colorMap = new Map<string, number>();

    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Skip transparent pixels
      if (a < 128) continue;

      const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      colorMap.set(color, (colorMap.get(color) || 0) + 1);
    }

    // Sort by frequency and return top colors
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([color]) => color);
  }

  static detectImageContent(url: string): Promise<{ hasText: boolean; hasFaces: boolean; hasObjects: string[] }> {
    // This is a simplified implementation
    // In a real application, you would use a computer vision API
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Placeholder implementation
        resolve({
          hasText: false,
          hasFaces: false,
          hasObjects: []
        });
      };
      img.src = url;
    });
  }

  static generateImageHash(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = 8;
        canvas.height = 8;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, 8, 8);
          const imageData = ctx.getImageData(0, 0, 8, 8);
          const hash = this.calculateImageHash(imageData);
          resolve(hash);
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }

  private static calculateImageHash(imageData: ImageData): string {
    const data = imageData.data;
    let hash = '';
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      hash += gray > 128 ? '1' : '0';
    }
    
    return hash;
  }

  static validateImageFile(file: File): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: 'No file provided' };
    }

    if (file.size > this.MAX_IMAGE_SIZE) {
      return { valid: false, error: 'File size too large' };
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !this.SUPPORTED_FORMATS.includes(extension)) {
      return { valid: false, error: 'Unsupported file format' };
    }

    return { valid: true };
  }

  static createImageFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  }

  static downloadImage(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static copyImageToClipboard(url: string): Promise<void> {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const item = new ClipboardItem({ 'image/png': blob });
        return navigator.clipboard.write([item]);
      });
  }
}
