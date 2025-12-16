# 🌿 VKN ERP Branching Strategy Guide

**Quick Reference for Module Development**

---

## 📐 Branch Architecture

```
Repository: minhtuancn/ever-gauzy
│
├── main
│   └── Ever Gauzy core platform (DO NOT MODIFY)
│
├── vkn-erp-integration
│   └── Integration testing for all completed modules
│
├── vkn-erp-module_core ✅
│   └── Core Module (COMPLETE)
│
├── vkn-erp-module_finance 🚧
│   └── Finance Module (IN PROGRESS - 10%)
│
├── vkn-erp-module_expenses ⏳
├── vkn-erp-module_payment ⏳
├── vkn-erp-module_einvoice ⏳
├── ... (35+ more module branches)
│
└── vkn-erp-flutter
    └── Flutter mobile app
```

---

## 🎯 Branch Types

### 1. Main Branch (`main`)
- **Purpose:** Ever Gauzy core platform
- **Rules:**
  - ❌ Never modify directly
  - ✅ Keep in sync with upstream
  - ✅ Use as base for new features

### 2. Integration Branch (`vkn-erp-integration`)
- **Purpose:** Integration testing of all VKN ERP modules
- **Rules:**
  - ✅ Merge completed modules here
  - ✅ Run full integration tests
  - ✅ Verify module compatibility
  - ❌ Don't develop directly on this branch

### 3. Module Branches (`vkn-erp-module_*`)
- **Purpose:** Individual module development
- **Naming:** `vkn-erp-module_{module-name}`
- **Rules:**
  - ✅ One module per branch
  - ✅ Keep focused on single module
  - ✅ Regular commits with clear messages
  - ✅ Keep branch after completion (don't delete)

### 4. Mobile Branch (`vkn-erp-flutter`)
- **Purpose:** Flutter mobile app development
- **Rules:**
  - ✅ Develop all Flutter code here
  - ✅ Integrate with backend APIs
  - ✅ Keep UI/UX consistent

---

## 🚀 Development Workflow

### Starting a New Module

```bash
# 1. Start from main branch
git checkout main
git pull origin main

# 2. Create new module branch
git checkout -b vkn-erp-module_{module-name}

# 3. Create module structure
cd packages/plugins
mkdir vkn-erp-{module-name}
cd vkn-erp-{module-name}

# 4. Initialize package files
# - package.json
# - tsconfig.json
# - README.md
# - src/ directory

# 5. Start developing
# - Create entities
# - Create services
# - Create controllers
# - Write tests
```

### Committing Work

```bash
# 1. Check what changed
git status
git diff

# 2. Add files
git add packages/plugins/vkn-erp-{module-name}

# 3. Commit with clear message
git commit -m "feat(vkn-erp-{module}): Add {feature}"

# 4. Push to remote
git push origin vkn-erp-module_{module-name}
```

### Testing Module

```bash
# Build the module
yarn nx build plugin-vkn-erp-{module-name}

# Run unit tests
yarn nx test plugin-vkn-erp-{module-name}

# Lint code
yarn nx lint plugin-vkn-erp-{module-name}

# Run E2E tests (if applicable)
yarn nx e2e plugin-vkn-erp-{module-name}-e2e
```

### Merging to Integration

```bash
# 1. Ensure module branch is up to date
git checkout vkn-erp-module_{module-name}
git pull origin vkn-erp-module_{module-name}

# 2. Switch to integration branch
git checkout vkn-erp-integration
git pull origin vkn-erp-integration

# 3. Merge module branch
git merge vkn-erp-module_{module-name}

# 4. Resolve conflicts (if any)
# ... resolve conflicts ...
git add .
git commit -m "Merge vkn-erp-module_{module-name} into integration"

# 5. Test integrated system
yarn start:dev

# 6. Push integration branch
git push origin vkn-erp-integration
```

---

## 📋 Branch Naming Conventions

### Module Branches
Follow this pattern: `vkn-erp-module_{module-name}`

**Examples:**
- `vkn-erp-module_core` ✅
- `vkn-erp-module_finance` ✅
- `vkn-erp-module_expenses` ✅
- `vkn-erp-module_hr` ✅
- `vkn-erp-module_e-invoice` ❌ (use underscore, not dash)
- `vkn-erp-module_einvoice` ✅

### Feature Branches (if needed)
For temporary features or experiments: `feature/{module-name}/{feature-name}`

**Examples:**
- `feature/finance/multi-currency`
- `feature/sales/discount-calculation`

### Bugfix Branches (if needed)
For urgent fixes: `bugfix/{module-name}/{bug-description}`

**Examples:**
- `bugfix/finance/journal-entry-validation`
- `bugfix/inventory/stock-calculation`

---

## 🔄 Integration Strategy

### Phase-by-Phase Integration

After completing all modules in a phase:

1. **Merge to Integration**
   ```bash
   git checkout vkn-erp-integration
   
   # Merge Phase 2 modules
   git merge vkn-erp-module_finance
   git merge vkn-erp-module_expenses
   git merge vkn-erp-module_payment
   # ... etc
   ```

2. **Run Integration Tests**
   ```bash
   yarn test:integration
   ```

3. **Test Complete System**
   ```bash
   yarn start:dev
   # Manual testing of module interactions
   ```

4. **Document Integration**
   - Update `HIEN_TRANG_DU_AN.md`
   - Update `CURRENT_STATUS_AND_NEXT_STEPS.md`
   - Update phase completion status

---

## 📊 Branch Lifecycle

```
┌─────────────────┐
│  main branch    │
└────────┬────────┘
         │
         │ create
         ▼
┌─────────────────────────┐
│ vkn-erp-module_{name}   │ ◄── Development happens here
│                         │
│ 1. Create entities      │
│ 2. Create services      │
│ 3. Create controllers   │
│ 4. Write tests          │
│ 5. Documentation        │
└────────┬────────────────┘
         │
         │ completed
         ▼
┌─────────────────────────┐
│ vkn-erp-integration     │ ◄── Integration testing
│                         │
│ 1. Merge module         │
│ 2. Test interactions    │
│ 3. Verify compatibility │
└────────┬────────────────┘
         │
         │ phase complete
         ▼
┌─────────────────────────┐
│ Keep branch for         │
│ reference/documentation │
└─────────────────────────┘
```

---

## 🛡️ Best Practices

### DO ✅

1. **Create descriptive commits**
   ```bash
   git commit -m "feat(finance): Add multi-currency journal entry support"
   git commit -m "fix(expenses): Correct expense approval workflow"
   git commit -m "docs(sales): Update API documentation"
   ```

2. **Regular commits**
   - Commit after each meaningful change
   - Don't wait until end of day

3. **Keep branches focused**
   - One module per branch
   - Don't mix unrelated changes

4. **Test before merging**
   - Run all tests locally
   - Fix all issues before merge

5. **Update documentation**
   - Update README when adding features
   - Document API changes

### DON'T ❌

1. **Don't modify main**
   - All VKN ERP work in plugin modules
   - Keep Ever Gauzy core untouched

2. **Don't delete module branches**
   - Keep them for reference
   - Historical record of development

3. **Don't mix modules**
   - Keep changes in correct branch
   - One module = one branch

4. **Don't commit broken code**
   - Test before committing
   - Keep builds working

5. **Don't skip documentation**
   - README is mandatory
   - API docs required

---

## 🔍 Branch Status Tracking

### Current Status (as of Dec 16, 2025)

| Branch | Status | Progress | Location |
|--------|--------|----------|----------|
| `main` | 🟢 Active | - | Ever Gauzy core |
| `vkn-erp-integration` | 🟡 Setup | 0% | Integration testing |
| `vkn-erp-module_core` | ✅ Complete | 100% | `packages/plugins/vkn-erp-core/` |
| `vkn-erp-module_finance` | 🚧 Active | 10% | `packages/plugins/vkn-erp-finance/` |
| `vkn-erp-module_expenses` | ⏳ Planned | 0% | Not created |
| `vkn-erp-module_payment` | ⏳ Planned | 0% | Not created |
| ... | ⏳ Planned | 0% | See roadmap |

### Legend
- 🟢 Active - Currently used
- ✅ Complete - Finished and tested
- 🚧 Active - Work in progress
- 🟡 Setup - Created but not active
- ⏳ Planned - Not yet created

---

## 📞 Questions?

If you're unsure about branching strategy:

1. **Check this guide first**
2. **Review ROADMAP_SUMMARY.md**
3. **Look at completed branches** (e.g., `vkn-erp-module_core`)
4. **Contact project maintainer**

---

## 🔗 Related Documents

- `ROADMAP_SUMMARY.md` - Complete development roadmap
- `CURRENT_STATUS_AND_NEXT_STEPS.md` - Current project status
- `HIEN_TRANG_DU_AN.md` - Project status (Vietnamese)
- `VKN_ERP_IMPLEMENTATION_GUIDE.md` - Implementation patterns

---

**Last Updated:** December 16, 2025  
**Maintained by:** GitHub Copilot Agent  
**Status:** 🟢 Active Reference Document
