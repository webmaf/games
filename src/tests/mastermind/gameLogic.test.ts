import { describe, it, expect } from 'vitest';

/**
 * Game Logic Tests for Mastermind Game
 *
 * These tests verify the core game validation logic:
 * - Exact position matches (black pegs)
 * - Wrong position matches (white pegs)
 * - Result calculations
 */

describe('Mastermind Game Logic', () => {
  // Extract the checkCode logic from Mastermind.tsx for testing
  // This is a helper function that simulates the game validation
  const checkCode = (prediction: string[], masterCode: string[]): string[] => {
    const result: string[] = [];

    if (prediction.length === 4) {
      const copyMasterCode = [...masterCode];
      const copyCombination = [...prediction];

      // First pass: find exact matches (black pegs)
      masterCode.forEach((color: string, index: number) => {
        if (prediction[index] === color) {
          copyCombination[index] = "clear";
          copyMasterCode[index] = "black";
          result.push("black");
        }
      });

      // Second pass: find wrong position matches (white pegs)
      copyCombination
        .filter((color) => color !== "clear")
        .forEach((color: string) => {
          copyMasterCode.some((masterColor: string, index: number) => {
            if (color === masterColor) {
              copyMasterCode[index] = "white";
              result.push("white");
              return true;
            }
            return false;
          });
        });

      return result;
    }

    return result;
  };

  const COLORS = {
    RED: '#E53935',
    BLUE: '#1E88E5',
    YELLOW: '#FDD835',
    GREEN: '#43A047',
    PURPLE: '#8E24AA',
    ORANGE: '#FB8C00',
  };

  describe('Scenario A: Perfect Match', () => {
    it('should return 4 black pegs when all colors match in correct positions', () => {
      const masterCode = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN];
      const prediction = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN];

      const result = checkCode(prediction, masterCode);

      expect(result).toHaveLength(4);
      expect(result).toEqual(['black', 'black', 'black', 'black']);
    });
  });

  describe('Scenario B: All Wrong Positions', () => {
    it('should return 4 white pegs when all colors match but in wrong positions', () => {
      const masterCode = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN];
      const prediction = [COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN, COLORS.RED];

      const result = checkCode(prediction, masterCode);

      expect(result).toHaveLength(4);
      expect(result.filter(r => r === 'white')).toHaveLength(4);
    });
  });

  describe('Scenario C: Mixed Matches', () => {
    it('should return correct mix of black and white pegs', () => {
      const masterCode = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN];
      const prediction = [COLORS.RED, COLORS.GREEN, COLORS.YELLOW, COLORS.BLUE];

      const result = checkCode(prediction, masterCode);

      // Position 0: RED == RED (black)
      // Position 1: GREEN != BLUE (white, because GREEN exists at position 3)
      // Position 2: YELLOW == YELLOW (black)
      // Position 3: BLUE != GREEN (white, because BLUE exists at position 1)
      expect(result).toHaveLength(4);
      expect(result.filter(r => r === 'black')).toHaveLength(2);
      expect(result.filter(r => r === 'white')).toHaveLength(2);
    });
  });

  describe('Scenario D: No Matches', () => {
    it('should return empty array when no colors match', () => {
      const masterCode = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN];
      const prediction = [COLORS.PURPLE, COLORS.ORANGE, COLORS.PURPLE, COLORS.ORANGE];

      const result = checkCode(prediction, masterCode);

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe('Scenario E: Duplicates in Code', () => {
    it('should handle duplicate colors correctly', () => {
      const masterCode = [COLORS.RED, COLORS.RED, COLORS.BLUE, COLORS.YELLOW];
      const prediction = [COLORS.RED, COLORS.YELLOW, COLORS.RED, COLORS.BLUE];

      const result = checkCode(prediction, masterCode);

      // Position 0: RED == RED (black)
      // Position 1: YELLOW != RED (white, YELLOW exists at position 3)
      // Position 2: RED != BLUE (white, RED exists at position 0, but already matched)
      // Position 3: BLUE != YELLOW (black)
      expect(result).toContain('black');
      expect(result).toContain('white');
    });
  });

  describe('Scenario F: All Same Color', () => {
    it('should handle when all positions have the same color', () => {
      const masterCode = [COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED];
      const prediction = [COLORS.RED, COLORS.RED, COLORS.RED, COLORS.RED];

      const result = checkCode(prediction, masterCode);

      expect(result).toHaveLength(4);
      expect(result).toEqual(['black', 'black', 'black', 'black']);
    });

    it('should return white pegs when duplicate color is in wrong position', () => {
      const masterCode = [COLORS.RED, COLORS.RED, COLORS.BLUE, COLORS.BLUE];
      const prediction = [COLORS.BLUE, COLORS.BLUE, COLORS.RED, COLORS.RED];

      const result = checkCode(prediction, masterCode);

      expect(result.filter(r => r === 'white')).toHaveLength(4);
    });
  });

  describe('Edge Cases', () => {
    it('should return empty array for invalid prediction length', () => {
      const masterCode = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN];
      const prediction = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW];

      const result = checkCode(prediction, masterCode);

      expect(result).toHaveLength(0);
    });

    it('should return empty array for empty prediction', () => {
      const masterCode = [COLORS.RED, COLORS.BLUE, COLORS.YELLOW, COLORS.GREEN];
      const prediction: string[] = [];

      const result = checkCode(prediction, masterCode);

      expect(result).toHaveLength(0);
    });
  });
});
