import { describe, it, expect, vi } from 'vitest';

/**
 * Master Code Generation Tests
 *
 * Tests the random code generation functionality used in the game
 */

describe('Mastermind Game - Master Code Generation', () => {
  const COLORS = [
    '#E53935',
    '#1E88E5',
    '#FDD835',
    '#43A047',
    '#8E24AA',
    '#FB8C00',
  ];

  const generateMasterCode = (amount: number = 4, colors: string[]): string[] => {
    const combination = [];
    for (let i = 0; i < amount; i++) {
      const max = colors.length;
      const index = max > 0 ? Math.floor(Math.random() * max) : 0;
      combination.push(colors[index]);
    }
    return combination;
  };

  describe('Code Generation', () => {
    it('should generate code with correct length', () => {
      const code = generateMasterCode(4, COLORS);
      expect(code).toHaveLength(4);
    });

    it('should generate code with specified amount', () => {
      expect(generateMasterCode(4, COLORS)).toHaveLength(4);
      expect(generateMasterCode(5, COLORS)).toHaveLength(5);
      expect(generateMasterCode(6, COLORS)).toHaveLength(6);
    });

    it('should only contain colors from provided color array', () => {
      const code = generateMasterCode(4, COLORS);
      code.forEach(color => {
        expect(COLORS).toContain(color);
      });
    });

    it('should handle single color array', () => {
      const singleColor = ['#FF0000'];
      const code = generateMasterCode(4, singleColor);

      expect(code).toHaveLength(4);
      code.forEach(color => {
        expect(color).toBe('#FF0000');
      });
    });

    it('should return array type', () => {
      const code = generateMasterCode(4, COLORS);
      expect(Array.isArray(code)).toBe(true);
    });
  });

  describe('Randomness', () => {
    it('should generate different codes on multiple calls (probabilistic test)', () => {
      const codes = [
        generateMasterCode(4, COLORS),
        generateMasterCode(4, COLORS),
        generateMasterCode(4, COLORS),
      ];

      // With 6 colors and 4 positions, probability of same code twice is low
      // This is a probabilistic test - may rarely fail by chance
      const uniqueCodes = new Set(codes.map(c => JSON.stringify(c)));
      expect(uniqueCodes.size).toBeGreaterThan(1);
    });

    it('should use Math.random for generation', () => {
      const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

      const code = generateMasterCode(4, COLORS);

      // With Math.random() returning 0, Math.floor(0 * 6) = 0
      // So all colors should be COLORS[0]
      expect(code).toEqual([COLORS[0], COLORS[0], COLORS[0], COLORS[0]]);

      randomSpy.mockRestore();
    });

    it('should use different indices with different random values', () => {
      const randomSpy = vi.spyOn(Math, 'random')
        .mockReturnValueOnce(0)      // Math.floor(0 * 6) = 0
        .mockReturnValueOnce(0.5)    // Math.floor(0.5 * 6) = 3
        .mockReturnValueOnce(0.75)   // Math.floor(0.75 * 6) = 4
        .mockReturnValueOnce(0.99);  // Math.floor(0.99 * 6) = 5

      const code = generateMasterCode(4, COLORS);

      expect(code[0]).toBe(COLORS[0]);
      expect(code[1]).toBe(COLORS[3]);
      expect(code[2]).toBe(COLORS[4]);
      expect(code[3]).toBe(COLORS[5]);

      randomSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    it('should handle amount of 0', () => {
      const code = generateMasterCode(0, COLORS);
      expect(code).toHaveLength(0);
    });

    it('should handle empty color array gracefully', () => {
      const code = generateMasterCode(4, []);
      expect(code).toHaveLength(4);
      // Will contain undefined due to empty array
      code.forEach(color => {
        expect(color).toBeUndefined();
      });
    });

    it('should handle large amount', () => {
      const code = generateMasterCode(100, COLORS);
      expect(code).toHaveLength(100);
    });
  });
});
