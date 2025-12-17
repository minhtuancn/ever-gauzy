# VKN ERP Automation Scripts

This directory contains automation scripts to help with VKN ERP module development.

## Scripts

### 1. create-vkn-module.sh
Automatically generates a complete module structure with all necessary files.

**Usage:**
```bash
./scripts/create-vkn-module.sh <module-name> "<module-description>"
```

**Example:**
```bash
./scripts/create-vkn-module.sh expenses "Expenses Management Module"
./scripts/create-vkn-module.sh payment "Payment Processing Module"
./scripts/create-vkn-module.sh tax "Tax Management Module"
```

**What it creates:**
- Complete directory structure
- package.json with proper dependencies
- TypeScript configuration files
- Entity boilerplate with TypeORM
- Service boilerplate with business logic
- Controller boilerplate with REST endpoints
- DTO boilerplate with validation
- Module file with proper imports
- Test boilerplate
- README.md and CHANGELOG.md

### 2. list-vkn-modules.sh
Displays a comprehensive list of all planned VKN ERP modules organized by phase.

**Usage:**
```bash
./scripts/list-vkn-modules.sh
```

**What it shows:**
- All 38 planned modules
- Current status (completed/in-progress/planned)
- Estimated development time per module
- Phase organization
- Progress summary

### 3. auto-implement-modules.sh ⭐ NEW!
**Automated bulk module creation script** - Creates multiple modules automatically based on phase or module name.

**Usage:**
```bash
./scripts/auto-implement-modules.sh [OPTIONS]
```

**Options:**
- `--phase <number>` - Create all modules for a specific phase (2-12)
- `--module <name>` - Create a specific module by name
- `--all` - Create all remaining modules (Phases 2-12)
- `--help` - Display help message

**Examples:**
```bash
# Create all Phase 2 modules at once
./scripts/auto-implement-modules.sh --phase 2

# Create a specific module
./scripts/auto-implement-modules.sh --module expenses

# Create all remaining modules (use with caution!)
./scripts/auto-implement-modules.sh --all
```

**What it does:**
- Automatically calls create-vkn-module.sh for each module
- Shows progress and statistics
- Skips already created modules
- Provides detailed output for each module creation
- Supports all 36 modules across 11 phases

## Quick Start Guide

### Creating a New Module

1. **Check the module list:**
   ```bash
   ./scripts/list-vkn-modules.sh
   ```

2. **Create the module:**
   ```bash
   ./scripts/create-vkn-module.sh expenses "Expenses Management Module"
   ```

3. **Review generated files:**
   ```bash
   ls -la packages/plugins/vkn-erp-expenses/
   ```

4. **Customize the module:**
   - Edit entities in `src/lib/entities/`
   - Add business logic in `src/lib/services/`
   - Customize endpoints in `src/lib/controllers/`
   - Update DTOs in `src/lib/dto/`

5. **Build and test:**
   ```bash
   yarn nx build plugin-vkn-erp-expenses
   yarn nx test plugin-vkn-erp-expenses
   ```

6. **Commit your changes:**
   ```bash
   git add packages/plugins/vkn-erp-expenses
   git commit -m "feat(vkn-erp-expenses): Initialize expenses module"
   git push origin vkn-erp-module_expenses
   ```

## Module Structure

Each generated module follows this structure:

```
packages/plugins/vkn-erp-{module}/
├── src/
│   ├── lib/
│   │   ├── entities/          # TypeORM entities
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── services/          # Business logic
│   │   ├── controllers/       # REST API endpoints
│   │   └── vkn-erp-{module}.module.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── project.json
├── jest.config.ts
├── README.md
└── CHANGELOG.md
```

## Naming Conventions

### Module Names
- Use lowercase
- Use underscores for multi-word names
- Format: `vkn-erp-{module-name}`
- Examples: `vkn-erp-expenses`, `vkn-erp-payment`, `vkn-erp-einvoice`

### Branch Names
- Format: `vkn-erp-module_{module-name}`
- Examples: `vkn-erp-module_expenses`, `vkn-erp-module_payment`

### Entity Names
- Format: `Vkn{ModuleName}Entity`
- Table name: `vkn_{module}_{entity}`
- Examples: `VknExpenseEntity` → `vkn_expenses_expense`

## Tips

1. **Before creating a module:**
   - Review `VKN_ERP_COMPREHENSIVE_STRATEGY.md`
   - Check `HUONG_DAN_PHAT_TRIEN_MODULE.md` (Vietnamese guide)
   - Look at `packages/plugins/vkn-erp-core/` for reference

2. **After creating a module:**
   - Update the module's README.md with specific features
   - Add proper API documentation
   - Write comprehensive tests
   - Update CHANGELOG.md with changes

3. **Best practices:**
   - Follow existing patterns from vkn-erp-core
   - Use proper TypeScript types
   - Add validation decorators
   - Include Swagger documentation
   - Write unit tests

## Troubleshooting

### Script permission denied
```bash
chmod +x scripts/*.sh
```

### Module already exists
Check if the directory exists and remove it if needed, or choose a different name.

### Build errors
```bash
# Install dependencies
yarn install

# Clean and rebuild
yarn nx reset
yarn nx build plugin-vkn-erp-{module}
```

## Documentation

For more detailed information, see:
- `HUONG_DAN_PHAT_TRIEN_MODULE.md` - Complete development guide (Vietnamese)
- `VKN_ERP_IMPLEMENTATION_GUIDE.md` - Implementation patterns
- `VKN_ERP_COMPREHENSIVE_STRATEGY.md` - Overall strategy
- `BRANCHING_STRATEGY.md` - Git workflow

## Support

**Developer:** Minh Tuấn - VietKeyNet Software Solutions  
**Email:** vietkeynet@gmail.com  
**Phone:** 0912537003

## License

MIT
