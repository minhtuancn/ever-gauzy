# Vietkeynet ERP Module Migration - Implementation Guide

## Overview
This document outlines the comprehensive migration of Vietkeynet ERP (72+ modules) to Ever Gauzy platform.

## Branch Strategy

### Main Branches
1. **`vkn-erp-integration`** - Integration branch for testing all modules together
2. **`vkn-erp-module_*`** - Individual module branches (38+ branches)
3. **`vkn-erp-flutter`** - Flutter mobile app

### Workflow
```
vkn-erp-module_core ──┐
vkn-erp-module_finance ┼──> vkn-erp-integration (test all modules)
vkn-erp-module_sales ──┘
```

## Tech Stack

### Backend (NestJS)
- **Framework:** NestJS 11+ with TypeScript 5.8+
- **Database:** TypeORM 0.3+ (PostgreSQL/MySQL)
- **Authentication:** JWT + Passport
- **APIs:** REST + GraphQL + WebSocket
- **Validation:** class-validator, class-transformer
- **Documentation:** Swagger/OpenAPI

### Frontend Web (Angular)
- **Framework:** Angular 19+
- **UI Library:** Nebular Theme + Tailwind CSS
- **State:** RxJS + NgRx
- **i18n:** @ngx-translate (vi, en, zh)
- **Charts:** Chart.js, D3.js
- **Forms:** Reactive Forms

### Frontend Mobile (Flutter)
- **Framework:** Flutter 3.x+ with Dart
- **State:** Riverpod
- **Routing:** go_router
- **HTTP:** Dio
- **Storage:** Hive + sqflite
- **Features:** Camera, Barcode, GPS, Notifications

## Module Implementation Template

### 1. Backend Structure
```
packages/plugins/vkn-erp-{module}/
├── src/
│   ├── lib/
│   │   ├── entities/          # TypeORM entities
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── services/          # Business logic
│   │   ├── controllers/       # REST API endpoints
│   │   ├── resolvers/         # GraphQL resolvers (optional)
│   │   └── {module}.module.ts # NestJS module
│   └── index.ts
├── package.json
├── tsconfig.json
├── project.json
└── README.md
```

### 2. Entity Example
```typescript
@Entity('vkn_{module}_{entity}')
export class VknEntity extends TenantOrganizationBaseEntity {
  @Column()
  name: string;
  
  // Add fields...
  
  @ManyToOne(() => Organization)
  organization?: IOrganization;
}
```

### 3. Service Example
```typescript
@Injectable()
export class VknEntityService extends TenantAwareCrudService<VknEntity> {
  constructor(
    @InjectRepository(VknEntity)
    protected readonly repository: Repository<VknEntity>
  ) {
    super(repository);
  }
  
  // Add business logic methods...
}
```

### 4. Controller Example
```typescript
@ApiTags('VKN ERP {Module}')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard)
@Controller('vkn-erp/{module}')
export class VknEntityController {
  constructor(private readonly service: VknEntityService) {}
  
  @Get()
  async findAll() {
    return await this.service.findAll();
  }
  
  // Add endpoints...
}
```

## Completed Modules

### ✅ Phase 1: Core Module (vkn-erp-module_core)

**Branch:** `vkn-erp-module_core`  
**Status:** Implemented  
**Location:** `packages/plugins/vkn-erp-core/`

**Features:**
- Company Settings Entity with 30+ fields
- Audit Log Entity for activity tracking
- DTOs with validation
- CRUD Services
- REST API Endpoints
- Multi-tenant support
- RBAC integration

**API Endpoints:**
- `GET /api/vkn-erp/core/company-settings/:organizationId`
- `POST /api/vkn-erp/core/company-settings/:organizationId`
- `PUT /api/vkn-erp/core/company-settings/:organizationId`
- `PUT /api/vkn-erp/core/company-settings/:id/features`
- `PUT /api/vkn-erp/core/company-settings/:id/modules`
- `GET /api/vkn-erp/core/company-settings/:organizationId/currencies`

## Next Modules (Priority Order)

### Phase 2: Financial Management (8 modules)

#### 1. vkn-erp-module_finance
**Features:**
- General Ledger
- Chart of Accounts
- Journal Entries
- Financial Reports (Balance Sheet, P&L, Cash Flow)
- Budget Management
- Multi-currency
- Fiscal periods

#### 2. vkn-erp-module_expenses
**Features:**
- Expense categories
- Expense submissions
- Approval workflow
- Receipt management
- Reimbursement processing

#### 3. vkn-erp-module_payment
**Features:**
- Payment gateway integration
- Payment methods
- Payment tracking
- Reconciliation
- Refunds

#### 4. vkn-erp-module_einvoice
**Features:**
- Invoice generation
- E-signature integration
- Tax authority integration (Vietnam)
- Invoice templates
- XML/PDF generation

#### 5. vkn-erp-module_pricing
**Features:**
- Price lists
- Discount rules
- Promotion management
- Dynamic pricing
- Price history

#### 6. vkn-erp-module_tax
**Features:**
- Tax codes
- VAT handling
- Tax reports
- Tax compliance
- Tax calculations

#### 7. vkn-erp-module_bank
**Features:**
- Bank accounts
- Transaction sync
- Reconciliation
- Payment import/export
- Bank statement processing

#### 8. vkn-erp-module_financial_reporting
**Features:**
- Custom report builder
- Scheduled reports
- Dashboard widgets
- Export (Excel, PDF)
- KPI tracking

### Phase 3: Sales & CRM (4 modules)
- vkn-erp-module_sales
- vkn-erp-module_crm
- vkn-erp-module_contacts
- vkn-erp-module_contracts

### Phase 4-12: Remaining 26 modules
See main PR description for full list.

## Flutter Mobile App Structure

```
vkn_erp_mobile/
├── lib/
│   ├── core/
│   │   ├── api/
│   │   │   ├── api_client.dart
│   │   │   ├── api_interceptor.dart
│   │   │   └── endpoints.dart
│   │   ├── auth/
│   │   │   ├── auth_provider.dart
│   │   │   └── auth_service.dart
│   │   ├── navigation/
│   │   │   └── app_router.dart
│   │   ├── theme/
│   │   │   ├── app_theme.dart
│   │   │   └── colors.dart
│   │   └── utils/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── finance/
│   │   ├── sales/
│   │   ├── inventory/
│   │   └── [... 38 features]
│   ├── shared/
│   │   ├── widgets/
│   │   ├── models/
│   │   └── providers/
│   └── main.dart
├── pubspec.yaml
└── README.md
```

## Testing Strategy

### Unit Tests
```bash
yarn nx test plugin-vkn-erp-{module}
```

### Integration Tests
Merge modules to `vkn-erp-integration` branch:
```bash
git checkout vkn-erp-integration
git merge vkn-erp-module_core
git merge vkn-erp-module_finance
# ... merge other modules
```

### End-to-End Tests
Test complete workflows across multiple modules.

## Deployment

### Development
```bash
yarn install
yarn nx build plugin-vkn-erp-core
yarn start:dev
```

### Production
```bash
yarn nx build plugin-vkn-erp-core --configuration=production
```

## Migration from Vietkeynet ERP

### Data Migration
1. Export data from Vietkeynet ERP
2. Transform to Ever Gauzy format
3. Import via API or database scripts

### Code Adaptation
- React components → Angular components
- React hooks → RxJS observables
- Tailwind classes → Nebular + Tailwind
- REST clients → NestJS services

## Support

**Developer:** Minh Tuấn - VietKeyNet Software Solutions  
**Email:** vietkeynet@gmail.com  
**Phone:** 0912537003

## License

MIT License
