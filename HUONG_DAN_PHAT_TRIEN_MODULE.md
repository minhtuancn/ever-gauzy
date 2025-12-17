# 📘 Hướng Dẫn Phát Triển Module Mới - VKN ERP

**Tài liệu hướng dẫn chi tiết cách phát triển module mới trong dự án Ever Gauzy VKN ERP**

---

## 📋 Mục Lục

1. [Tổng Quan](#tổng-quan)
2. [Chuẩn Bị](#chuẩn-bị)
3. [Các Bước Phát Triển Module](#các-bước-phát-triển-module)
4. [Cấu Trúc Module](#cấu-trúc-module)
5. [Tạo Module Tự Động](#tạo-module-tự-động)
6. [Danh Sách Module Cần Phát Triển](#danh-sách-module-cần-phát-triển)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Tổng Quan

Dự án VKN ERP đang được migrate từ Vietkeynet ERP (React/TypeScript) sang Ever Gauzy platform (Angular/NestJS). Hiện tại có **38 module** cần được phát triển theo từng giai đoạn.

### Trạng Thái Hiện Tại
- ✅ **Phase 1 Complete:** Core Module (100%)
- 🚧 **Phase 2 In Progress:** Finance Module (10%)
- ⏳ **Remaining:** 36 modules

### Tech Stack
- **Backend:** NestJS 11+ với TypeScript 5.8+
- **Frontend:** Angular 19+ với Nebular + Tailwind CSS
- **Database:** TypeORM 0.3+ (PostgreSQL/MySQL)
- **Mobile:** Flutter 3.x+ (sẽ phát triển sau)

---

## 🔧 Chuẩn Bị

### Yêu Cầu Hệ Thống
- Node.js >= 20.18.1
- Yarn >= 1.22.19
- Git
- PostgreSQL hoặc MySQL

### Kiến Thức Cần Có
- TypeScript
- NestJS framework
- TypeORM
- RESTful API design
- Git workflow

### Clone Repository
```bash
git clone https://github.com/minhtuancn/ever-gauzy.git
cd ever-gauzy
yarn install
```

---

## 📝 Các Bước Phát Triển Module

### Bước 1: Tạo Nhánh Mới

```bash
# Checkout từ main branch
git checkout main
git pull origin main

# Tạo nhánh module mới
git checkout -b vkn-erp-module_{tên-module}

# Ví dụ:
git checkout -b vkn-erp-module_expenses
git checkout -b vkn-erp-module_payment
```

**Quy Tắc Đặt Tên Nhánh:**
- Format: `vkn-erp-module_{tên-module}`
- Sử dụng chữ thường
- Sử dụng dấu gạch dưới `_` thay vì dấu gạch ngang `-`
- Ví dụ đúng: `vkn-erp-module_expenses` ✅
- Ví dụ sai: `vkn-erp-module-expenses` ❌

### Bước 2: Tạo Cấu Trúc Module

#### Sử dụng Script Tự Động (Khuyến Nghị)

```bash
# Chạy script tạo module tự động
./scripts/create-vkn-module.sh expenses "Expenses Management Module"
```

Script sẽ tự động tạo:
- Cấu trúc thư mục
- package.json
- tsconfig files
- README.md
- Các file boilerplate (entities, services, controllers)

#### Tạo Thủ Công

```bash
# Tạo thư mục module
cd packages/plugins
mkdir vkn-erp-{module-name}
cd vkn-erp-{module-name}

# Tạo cấu trúc thư mục
mkdir -p src/lib/{entities,dto,services,controllers}
```

### Bước 3: Cấu Hình Package

Tạo `package.json`:
```json
{
  "name": "@gauzy/plugin-vkn-erp-{module}",
  "version": "1.0.0",
  "description": "VKN ERP {Module} - Mô tả chức năng module",
  "author": {
    "name": "Minh Tuấn - VietKeyNet Software Solutions",
    "email": "vietkeynet@gmail.com"
  },
  "license": "MIT",
  "private": true,
  "main": "./src/index.js",
  "typings": "./src/index.d.ts",
  "dependencies": {
    "@gauzy/contracts": "^0.1.0",
    "@gauzy/core": "^0.1.0",
    "@gauzy/plugin": "^0.1.0",
    "@nestjs/common": "^11.1.0",
    "@nestjs/swagger": "^11.1.5",
    "@nestjs/typeorm": "^11.0.0",
    "class-validator": "^0.14.2",
    "class-transformer": "^0.5.1",
    "typeorm": "^0.3.27"
  }
}
```

### Bước 4: Tạo Entities

Ví dụ entity trong `src/lib/entities/`:
```typescript
import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TenantOrganizationBaseEntity } from '@gauzy/core';

@Entity('vkn_{module}_{entity}')
export class Vkn{Entity} extends TenantOrganizationBaseEntity {
  @ApiProperty({ type: () => String })
  @Column()
  name: string;

  @ApiProperty({ type: () => String, required: false })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty({ type: () => String })
  @Column({ default: 'active' })
  status: string;

  // Thêm các field khác...
}
```

**Quy Tắc Entity:**
- Tên bảng: `vkn_{module}_{entity}`
- Extend từ `TenantOrganizationBaseEntity` để có multi-tenant support
- Sử dụng `@ApiProperty` cho Swagger documentation
- Validate với `class-validator` decorators

### Bước 5: Tạo DTOs

Ví dụ DTO trong `src/lib/dto/`:
```typescript
import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Create{Entity}DTO {
  @ApiProperty({ type: () => String, maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  description?: string;

  // Thêm các field khác...
}

export class Update{Entity}DTO extends Create{Entity}DTO {}
```

**Quy Tắc DTO:**
- Separate Create, Update DTOs
- Validation với class-validator
- Documentation với ApiProperty
- Sử dụng PartialType, OmitType, PickType khi cần

### Bước 6: Tạo Services

Ví dụ service trong `src/lib/services/`:
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { Vkn{Entity} } from '../entities';

@Injectable()
export class Vkn{Entity}Service extends TenantAwareCrudService<Vkn{Entity}> {
  constructor(
    @InjectRepository(Vkn{Entity})
    protected readonly repository: Repository<Vkn{Entity}>
  ) {
    super(repository);
  }

  // Thêm business logic methods
  async findByStatus(status: string): Promise<Vkn{Entity}[]> {
    return await this.repository.find({ where: { status } });
  }
}
```

**Quy Tắc Service:**
- Extend từ `TenantAwareCrudService` để có CRUD cơ bản
- Inject repository với @InjectRepository
- Implement business logic methods
- Handle errors properly
- Add logging where needed

### Bước 7: Tạo Controllers

Ví dụ controller trong `src/lib/controllers/`:
```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantPermissionGuard } from '@gauzy/core';
import { Vkn{Entity}Service } from '../services';
import { Create{Entity}DTO, Update{Entity}DTO } from '../dto';

@ApiTags('VKN ERP {Module}')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard)
@Controller('vkn-erp/{module}')
export class Vkn{Entity}Controller {
  constructor(private readonly service: Vkn{Entity}Service) {}

  @Get()
  @ApiOperation({ summary: 'Get all {entities}' })
  async findAll() {
    return await this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create {entity}' })
  async create(@Body() dto: Create{Entity}DTO) {
    return await this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get {entity} by id' })
  async findOne(@Param('id') id: string) {
    return await this.service.findOneByIdString(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update {entity}' })
  async update(@Param('id') id: string, @Body() dto: Update{Entity}DTO) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete {entity}' })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
```

**Quy Tắc Controller:**
- Base path: `/api/vkn-erp/{module}`
- Use guards: TenantPermissionGuard
- Swagger documentation cho tất cả endpoints
- RESTful API design
- Proper HTTP status codes

### Bước 8: Tạo Module File

Tạo `src/lib/vkn-erp-{module}.module.ts`:
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { TenantModule } from '@gauzy/core';
import * as entities from './entities';
import * as controllers from './controllers';
import * as services from './services';

@Module({
  imports: [
    RouterModule.register([
      { path: '/vkn-erp/{module}', module: VknErp{Module}Module }
    ]),
    TypeOrmModule.forFeature(Object.values(entities)),
    TenantModule
  ],
  controllers: Object.values(controllers),
  providers: Object.values(services),
  exports: Object.values(services)
})
export class VknErp{Module}Module {}
```

### Bước 9: Export Module

Tạo `src/index.ts`:
```typescript
export * from './lib/entities';
export * from './lib/dto';
export * from './lib/services';
export * from './lib/controllers';
export * from './lib/vkn-erp-{module}.module';
```

### Bước 10: Viết Tests

Tạo test file `src/lib/services/{entity}.service.spec.ts`:
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vkn{Entity}Service } from './vkn-{entity}.service';
import { Vkn{Entity} } from '../entities';

describe('Vkn{Entity}Service', () => {
  let service: Vkn{Entity}Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Vkn{Entity}Service,
        {
          provide: getRepositoryToken(Vkn{Entity}),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<Vkn{Entity}Service>(Vkn{Entity}Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Thêm test cases khác...
});
```

### Bước 11: Build và Test

```bash
# Build module
yarn nx build plugin-vkn-erp-{module}

# Run tests
yarn nx test plugin-vkn-erp-{module}

# Lint code
yarn nx lint plugin-vkn-erp-{module}

# Watch mode (development)
yarn nx build plugin-vkn-erp-{module} --watch
```

### Bước 12: Commit và Push

```bash
# Kiểm tra thay đổi
git status
git diff

# Add files
git add packages/plugins/vkn-erp-{module}

# Commit với message rõ ràng
git commit -m "feat(vkn-erp-{module}): Initialize {module} module

- Add entities
- Add services
- Add controllers
- Add DTOs
- Add tests
- Add documentation"

# Push lên remote
git push origin vkn-erp-module_{module}
```

### Bước 13: Viết Documentation

Cập nhật `README.md` của module với:
- Tổng quan module
- Features list
- API endpoints
- Database schema
- Usage examples
- Integration với modules khác

---

## 📁 Cấu Trúc Module

```
packages/plugins/vkn-erp-{module}/
├── src/
│   ├── lib/
│   │   ├── entities/
│   │   │   ├── index.ts
│   │   │   └── vkn-{entity}.entity.ts
│   │   ├── dto/
│   │   │   ├── index.ts
│   │   │   └── {entity}.dto.ts
│   │   ├── services/
│   │   │   ├── index.ts
│   │   │   └── vkn-{entity}.service.ts
│   │   ├── controllers/
│   │   │   ├── index.ts
│   │   │   └── vkn-{entity}.controller.ts
│   │   └── vkn-erp-{module}.module.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── tsconfig.lib.json
├── tsconfig.spec.json
├── project.json
├── jest.config.ts
├── .gitignore
├── CHANGELOG.md
└── README.md
```

---

## 🤖 Tạo Module Tự Động

Để tạo module nhanh chóng, sử dụng script tự động:

```bash
# Cú pháp
./scripts/create-vkn-module.sh <module-name> "<module-description>"

# Ví dụ
./scripts/create-vkn-module.sh expenses "Expenses Management Module"
./scripts/create-vkn-module.sh payment "Payment Processing Module"
./scripts/create-vkn-module.sh tax "Tax Management Module"
```

Script sẽ tạo:
- ✅ Cấu trúc thư mục đầy đủ
- ✅ package.json với dependencies
- ✅ TypeScript configuration files
- ✅ Entity boilerplate
- ✅ Service boilerplate
- ✅ Controller boilerplate
- ✅ DTO boilerplate
- ✅ Module file
- ✅ Test boilerplate
- ✅ README.md

---

## 📊 Danh Sách Module Cần Phát Triển

### ✅ Phase 1: Core (HOÀN THÀNH)
- [x] **vkn-erp-core** - Core business logic, settings

### 🚧 Phase 2: Financial Management (8 modules - 15-20 ngày)
- [ ] **vkn-erp-finance** - General Ledger, COA, Journal Entries (5 ngày) 🚧 10%
- [ ] **vkn-erp-expenses** - Expense management, approval workflow (3 ngày)
- [ ] **vkn-erp-payment** - Payment gateway, tracking, reconciliation (4 ngày)
- [ ] **vkn-erp-einvoice** - E-invoice Vietnam, tax authority integration (4 ngày)
- [ ] **vkn-erp-pricing** - Price lists, discounts, promotions (3 ngày)
- [ ] **vkn-erp-tax** - VAT handling, tax reports, compliance (3 ngày)
- [ ] **vkn-erp-bank** - Bank integration, reconciliation (4 ngày)
- [ ] **vkn-erp-financial-reporting** - Custom reports, dashboards (4 ngày)

### ⏳ Phase 3: Sales & CRM (4 modules - 12-15 ngày)
- [ ] **vkn-erp-sales** - Sales orders, quotes, invoices (4 ngày)
- [ ] **vkn-erp-crm** - Customer relationship management (3 ngày)
- [ ] **vkn-erp-contacts** - Contact management (3 ngày)
- [ ] **vkn-erp-contracts** - Contract management, renewals (3 ngày)

### ⏳ Phase 4: Inventory & Purchasing (4 modules - 15-18 ngày)
- [ ] **vkn-erp-purchasing** - Purchase orders, vendors (4 ngày)
- [ ] **vkn-erp-inventory** - Stock management, valuations (5 ngày)
- [ ] **vkn-erp-warehouse** - Warehouse management, bin management (5 ngày)
- [ ] **vkn-erp-assets** - Fixed assets management (3 ngày)

### ⏳ Phase 5: Production & Manufacturing (4 modules - 16-20 ngày)
- [ ] **vkn-erp-production** - BOM, work orders, manufacturing (5 ngày)
- [ ] **vkn-erp-agriculture** - Agricultural operations (4 ngày)
- [ ] **vkn-erp-farm** - Farm management (4 ngày)
- [ ] **vkn-erp-weighing** - Weighing station management (4 ngày)

### ⏳ Phase 6: Distribution (3 modules - 12-15 ngày)
- [ ] **vkn-erp-dms** - Distribution management, route planning (5 ngày)
- [ ] **vkn-erp-stores** - Store management (4 ngày)
- [ ] **vkn-erp-pos** - Point of Sale, offline mode (5 ngày)

### ⏳ Phase 7: HR & Operations (7 modules - 18-22 ngày)
- [ ] **vkn-erp-hr** - HR management (3 ngày)
- [ ] **vkn-erp-attendance** - Biometric integration (4 ngày)
- [ ] **vkn-erp-leave** - Leave management (2 ngày)
- [ ] **vkn-erp-payroll** - Payroll calculations, tax (4 ngày)
- [ ] **vkn-erp-recruitment** - Recruitment management (3 ngày)
- [ ] **vkn-erp-training** - Training management (2 ngày)
- [ ] **vkn-erp-performance** - Performance evaluation (3 ngày)

### ⏳ Phase 8: Fleet & Logistics (2 modules - 8-10 ngày)
- [ ] **vkn-erp-fleet** - Fleet management, GPS (5 ngày)
- [ ] **vkn-erp-logistics** - Logistics management (4 ngày)

### ⏳ Phase 9: Project Management (3 modules - 9-12 ngày)
- [ ] **vkn-erp-tasks** - Task management (3 ngày)
- [ ] **vkn-erp-kanban** - Kanban boards (3 ngày)
- [ ] **vkn-erp-workflow** - Workflow engine (5 ngày)

### ⏳ Phase 10: Reporting & Analytics (2 modules - 10-12 ngày)
- [ ] **vkn-erp-reporting** - Report builder (6 ngày)
- [ ] **vkn-erp-reports** - Standard reports (5 ngày)

### ⏳ Phase 11: AI & Automation (2 modules - 10-14 ngày)
- [ ] **vkn-erp-ai** - ML integration, OCR (7 ngày)
- [ ] **vkn-erp-chat** - Real-time chat, WebSocket (5 ngày)

### ⏳ Phase 12: SaaS (1 module - 6-8 ngày)
- [ ] **vkn-erp-saas** - Multi-tenant, subscription billing (7 ngày)

**Tổng Cộng:** 38 modules, ước tính 4-6 tháng (full-time)

---

## 💡 Best Practices

### 1. Coding Standards
- ✅ Tuân theo TypeScript strict mode
- ✅ Sử dụng ESLint và Prettier
- ✅ Comment code khi cần thiết
- ✅ Meaningful variable/function names
- ✅ Follow NestJS best practices

### 2. Database Design
- ✅ Normalize tables properly
- ✅ Add indexes for performance
- ✅ Use proper foreign keys
- ✅ Implement soft delete when needed
- ✅ Add audit fields (createdAt, updatedAt, etc.)

### 3. API Design
- ✅ RESTful conventions
- ✅ Proper HTTP status codes
- ✅ Pagination for list endpoints
- ✅ Filtering and sorting support
- ✅ Proper error messages
- ✅ API versioning

### 4. Security
- ✅ Input validation
- ✅ SQL injection prevention (TypeORM handles this)
- ✅ Authentication & Authorization
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Environment variables for secrets

### 5. Testing
- ✅ Unit tests for services
- ✅ Integration tests for endpoints
- ✅ Test coverage > 80%
- ✅ Mock external dependencies
- ✅ Test edge cases

### 6. Documentation
- ✅ README.md comprehensive
- ✅ API documentation (Swagger)
- ✅ Code comments where needed
- ✅ Update CHANGELOG.md
- ✅ Architecture decisions documented

### 7. Git Workflow
- ✅ Clear commit messages
- ✅ One feature per commit
- ✅ Regular commits
- ✅ Branch naming conventions
- ✅ Don't commit node_modules, dist, etc.

### 8. Performance
- ✅ Database query optimization
- ✅ Use indexes appropriately
- ✅ Pagination for large datasets
- ✅ Caching where appropriate
- ✅ Lazy loading relations

---

## 🐛 Troubleshooting

### Build Errors

**Error: Cannot find module '@gauzy/...'**
```bash
# Solution: Install dependencies
yarn install
```

**Error: TypeScript compilation errors**
```bash
# Solution: Check tsconfig.json và fix type errors
yarn nx build plugin-vkn-erp-{module} --verbose
```

### Database Errors

**Error: Relation does not exist**
```bash
# Solution: Run migrations
yarn db:migration:run
```

**Error: Connection refused**
```bash
# Solution: Check PostgreSQL/MySQL running
# Check .env file có đúng database credentials
```

### Import Errors

**Error: Circular dependency detected**
```bash
# Solution: Restructure imports, avoid circular dependencies
# Use barrel exports (index.ts) properly
```

### Runtime Errors

**Error: Cannot inject repository**
```bash
# Solution: Add entity to TypeOrmModule.forFeature([Entity])
```

**Error: Guard/Interceptor not working**
```bash
# Solution: Check module imports, ensure proper setup
```

---

## 📚 Tài Liệu Tham Khảo

### Internal Documentation
- `VKN_ERP_COMPREHENSIVE_STRATEGY.md` - Chiến lược tổng thể
- `VKN_ERP_IMPLEMENTATION_GUIDE.md` - Hướng dẫn implement
- `BRANCHING_STRATEGY.md` - Chiến lược branching
- `ROADMAP_SUMMARY.md` - Roadmap dự án
- `packages/plugins/vkn-erp-core/` - Module mẫu (Phase 1)

### External Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Angular Documentation](https://angular.io/docs)
- [Ever Gauzy Documentation](https://github.com/ever-co/ever-gauzy)

---

## 🆘 Hỗ Trợ

**Developer:** Minh Tuấn - VietKeyNet Software Solutions  
**Email:** vietkeynet@gmail.com  
**Phone:** 0912537003  
**Repository:** https://github.com/minhtuancn/ever-gauzy

---

## 📝 Checklist Phát Triển Module

Sử dụng checklist này khi phát triển module mới:

```markdown
## Module: {tên-module}

### Chuẩn Bị
- [ ] Đọc VKN_ERP_COMPREHENSIVE_STRATEGY.md
- [ ] Đọc VKN_ERP_IMPLEMENTATION_GUIDE.md
- [ ] Tạo branch: vkn-erp-module_{tên}
- [ ] Tạo cấu trúc thư mục

### Backend Development
- [ ] Tạo entities (with proper relations)
- [ ] Tạo DTOs (with validation)
- [ ] Tạo services (with business logic)
- [ ] Tạo controllers (with Swagger docs)
- [ ] Tạo module file
- [ ] Viết unit tests
- [ ] Viết integration tests

### Documentation
- [ ] Viết README.md
- [ ] Update CHANGELOG.md
- [ ] Document API endpoints
- [ ] Add code comments
- [ ] Update migration guide

### Testing
- [ ] Build successful
- [ ] All tests passing
- [ ] Lint passing
- [ ] Manual testing
- [ ] Integration testing

### Deployment
- [ ] Commit với clear message
- [ ] Push lên remote
- [ ] Create pull request (if needed)
- [ ] Merge to integration branch
- [ ] Update progress docs
```

---

**Version:** 1.0  
**Last Updated:** December 17, 2025  
**Status:** 🟢 Active Reference Document
