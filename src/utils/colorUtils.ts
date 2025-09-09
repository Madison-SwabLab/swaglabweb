// Color Utility Class
export class ColorUtils {
  static readonly COLOR_FAMILIES = [
    'red', 'blue', 'green', 'yellow', 'purple', 
    'orange', 'pink', 'brown', 'gray', 'black', 'white'
  ];

  static readonly PANTONE_COLOR_RANGES = {
    red: { min: 0, max: 30 },
    orange: { min: 30, max: 60 },
    yellow: { min: 60, max: 90 },
    green: { min: 90, max: 150 },
    blue: { min: 150, max: 240 },
    purple: { min: 240, max: 300 },
    pink: { min: 300, max: 330 },
    brown: { min: 15, max: 45 },
    gray: { min: 0, max: 360 },
    black: { min: 0, max: 360 },
    white: { min: 0, max: 360 }
  };

  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  static rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  }

  static cmykToRgb(c: number, m: number, y: number, k: number): { r: number; g: number; b: number } {
    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    const r = Math.round(255 * (1 - c) * (1 - k));
    const g = Math.round(255 * (1 - m) * (1 - k));
    const b = Math.round(255 * (1 - y) * (1 - k));

    return { r, g, b };
  }

  static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }

  static getContrastColor(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return '#000000';

    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  static getColorDistance(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return Infinity;

    // Euclidean distance in RGB space
    const dr = rgb1.r - rgb2.r;
    const dg = rgb1.g - rgb2.g;
    const db = rgb1.b - rgb2.b;
    
    return Math.sqrt(dr * dr + dg * dg + db * db);
  }

  static generateColorPalette(baseColor: string, count: number): string[] {
    const baseRgb = this.hexToRgb(baseColor);
    if (!baseRgb) return [];

    const hsl = this.rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
    const palette: string[] = [];

    for (let i = 0; i < count; i++) {
      const hue = (hsl.h + (i * 360 / count)) % 360;
      const newRgb = this.hslToRgb(hue, hsl.s, hsl.l);
      palette.push(this.rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }

    return palette;
  }

  static validateHexColor(hex: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  }

  static getColorFamily(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 'unknown';

    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hue = hsl.h;

    if (hsl.l < 20) return 'black';
    if (hsl.l > 80) return 'white';
    if (hsl.s < 10) return 'gray';

    if (hue >= 0 && hue < 30) return 'red';
    if (hue >= 30 && hue < 60) return 'orange';
    if (hue >= 60 && hue < 90) return 'yellow';
    if (hue >= 90 && hue < 150) return 'green';
    if (hue >= 150 && hue < 240) return 'blue';
    if (hue >= 240 && hue < 300) return 'purple';
    if (hue >= 300 && hue < 330) return 'pink';
    if (hue >= 330 && hue < 360) return 'red';

    return 'unknown';
  }

  static generateRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return this.rgbToHex(r, g, b);
  }

  static generateRandomColorPalette(count: number): string[] {
    const palette: string[] = [];
    for (let i = 0; i < count; i++) {
      palette.push(this.generateRandomColor());
    }
    return palette;
  }

  static interpolateColors(color1: string, color2: string, steps: number): string[] {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    if (!rgb1 || !rgb2) return [];

    const colors: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio);
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio);
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio);
      colors.push(this.rgbToHex(r, g, b));
    }

    return colors;
  }
}
