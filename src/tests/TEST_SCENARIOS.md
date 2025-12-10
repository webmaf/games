# Mastermind Game - Test Szenarios

## Unit Test Coverage Plan

### 1. **Utils Tests** (`src/tests/mastermind/utils.test.ts`)

#### Theme Tests
- `backgroundRadialGradient()` - Testet die Erstellung von Radial-Gradienten mit Farbtransformationen
  - Input: color string (z.B. "#E53935")
  - Expected: CSS-String mit korrekten Gradient-Syntaxen
  - Edge Cases: Invalid colors, empty strings

- `backgroundLinearGradient()` - Testet die Erstellung von Linear-Gradienten
  - Input: color string
  - Expected: CSS-String mit korrekter 135deg Rotation
  - Edge Cases: Invalid colors

---

### 2. **Game Logic Tests** (`src/tests/mastermind/gameLogic.test.ts`)

#### Code Validation & Feedback

**Scenario A: Exact Matches (Black Pegs)**
```
masterCode: ["#E53935", "#1E88E5", "#FDD835", "#43A047"]
prediction: ["#E53935", "#1E88E5", "#FDD835", "#43A047"]
expected result: ["black", "black", "black", "black"]
```

**Scenario B: Wrong Position Matches (White Pegs)**
```
masterCode: ["#E53935", "#1E88E5", "#FDD835", "#43A047"]
prediction: ["#1E88E5", "#E53935", "#43A047", "#FDD835"]
expected result: ["white", "white", "white", "white"]
```

**Scenario C: Mixed Matches**
```
masterCode: ["#E53935", "#1E88E5", "#FDD835", "#43A047"]
prediction: ["#E53935", "#43A047", "#FDD835", "#1E88E5"]
expected result: ["black", "white", "black", "white"]
```

**Scenario D: No Matches**
```
masterCode: ["#E53935", "#1E88E5", "#FDD835", "#43A047"]
prediction: ["#8E24AA", "#FB8C00", "#8E24AA", "#FB8C00"]
expected result: []
```

**Scenario E: Partial Matches with Duplicates**
```
masterCode: ["#E53935", "#E53935", "#1E88E5", "#FDD835"]
prediction: ["#1E88E5", "#E53935", "#FDD835", "#E53935"]
expected result: ["white", "black", "white", "black"]
```

**Scenario F: All Same Color**
```
masterCode: ["#E53935", "#E53935", "#E53935", "#E53935"]
prediction: ["#E53935", "#E53935", "#E53935", "#E53935"]
expected result: ["black", "black", "black", "black"]
```

---

### 3. **Master Code Generation Tests** (`src/tests/mastermind/gameLogic.test.ts`)

- `generateMasterCode(amount, colors)` - Testet die Erzeugung von Zufallskombinationen
  - Should return array with correct length
  - Should only contain colors from provided colorCodes
  - Should handle different amounts (4, 5, 6)
  - Randomness: Generated codes should vary across multiple calls

---

### 4. **Settings Management Tests** (`src/tests/mastermind/settings.test.ts`)

- Settings Update Logic:
  - Changing amount should regenerate masterCode
  - Changing name should update name
  - No change if same settings passed
  - Color codes should be maintained

---

### 5. **Data Structure Tests** (`src/tests/mastermind/types.test.ts`)

- Verify TypeScript types compile correctly (Integration test)
- Validate UserCombination shape: `{ prediction: string[], result: string[] }`
- Validate Settings shape: `{ masterCode, amount, colorCodes, name }`

---

## Test Execution Priority

1. **Phase 1 (Core Game Logic)**: Game validation & feedback tests (Scenario A-F)
2. **Phase 2 (Utilities)**: Theme gradient functions
3. **Phase 3 (Systems)**: Master code generation, settings management
4. **Phase 4 (Components)**: Unit tests for React components (SubmitPanel, GameBoard, etc.)

---

## Expected Test Coverage Target

- **Utils**: 100% - small, pure functions
- **Game Logic**: 95%+ - critical business logic
- **Settings**: 90%+ - state management
- **Overall**: 85%+ code coverage goal

---

## Notes

- Tests use **Vitest** with **happy-dom** environment
- Unit tests only - no component rendering tests in Phase 1
- Test scenarios based on actual game rules (Mastermind)
- All tests should be deterministic (mock Math.random for generation tests)
