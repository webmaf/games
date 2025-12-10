import { describe, it, expect } from 'vitest';
import { backgroundRadialGradient, backgroundLinearGradient } from '../../components/games/mastermind/utils';

describe('Utils - Gradient Functions', () => {
  describe('backgroundRadialGradient', () => {
    it('should return a valid CSS radial gradient string', () => {
      const color = '#E53935';
      const result = backgroundRadialGradient(color);

      expect(result).toContain('radial-gradient');
      expect(result).toContain(color);
    });

    it('should include lightened and darkened color variants', () => {
      const color = '#E53935';
      const result = backgroundRadialGradient(color);

      expect(result).toContain('circle at 5px 10px');
      expect(result.match(/%/g)?.length).toBeGreaterThan(0);
    });

    it('should handle different color formats', () => {
      const testColors = ['#FF5733', '#1E88E5', '#FDD835'];

      testColors.forEach(color => {
        const result = backgroundRadialGradient(color);
        expect(result).toContain('radial-gradient');
        expect(result).toContain(color);
      });
    });
  });

  describe('backgroundLinearGradient', () => {
    it('should return a valid CSS linear gradient string', () => {
      const color = '#E53935';
      const result = backgroundLinearGradient(color);

      expect(result).toContain('linear-gradient');
      expect(result).toContain('135deg');
      expect(result).toContain(color);
    });

    it('should include proper gradient stops', () => {
      const color = '#E53935';
      const result = backgroundLinearGradient(color);

      expect(result).toContain('0%');
      expect(result).toContain('100%');
      expect(result.match(/%/g)?.length).toBe(5);
    });

    it('should handle different color formats', () => {
      const testColors = ['#43A047', '#8E24AA', '#FB8C00'];

      testColors.forEach(color => {
        const result = backgroundLinearGradient(color);
        expect(result).toContain('linear-gradient');
        expect(result).toContain(color);
      });
    });
  });
});
