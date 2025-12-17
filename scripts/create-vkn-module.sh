#!/bin/bash

# VKN ERP Module Generator Script
# Usage: ./scripts/create-vkn-module.sh <module-name> "<module-description>"
# Example: ./scripts/create-vkn-module.sh expenses "Expenses Management Module"

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if module name is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Module name is required${NC}"
    echo "Usage: ./scripts/create-vkn-module.sh <module-name> \"<module-description>\""
    echo "Example: ./scripts/create-vkn-module.sh expenses \"Expenses Management Module\""
    exit 1
fi

MODULE_NAME=$1
MODULE_DESC=${2:-"VKN ERP ${MODULE_NAME} Module"}
MODULE_NAME_LOWER=$(echo "$MODULE_NAME" | tr '[:upper:]' '[:lower:]')
MODULE_NAME_UPPER=$(echo "$MODULE_NAME" | tr '[:lower:]' '[:upper:]')
MODULE_NAME_PASCAL=$(echo "$MODULE_NAME" | sed -e 's/\b\(.\)/\u\1/g' -e 's/-//g' -e 's/_//g')

PLUGIN_DIR="packages/plugins/vkn-erp-${MODULE_NAME_LOWER}"
BRANCH_NAME="vkn-erp-module_${MODULE_NAME_LOWER}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}VKN ERP Module Generator${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Module Name: ${GREEN}${MODULE_NAME_LOWER}${NC}"
echo -e "Description: ${GREEN}${MODULE_DESC}${NC}"
echo -e "Location: ${GREEN}${PLUGIN_DIR}${NC}"
echo -e "Branch: ${GREEN}${BRANCH_NAME}${NC}"
echo ""

# Check if module already exists
if [ -d "$PLUGIN_DIR" ]; then
    echo -e "${RED}Error: Module directory already exists: ${PLUGIN_DIR}${NC}"
    exit 1
fi

# Ask for confirmation
read -p "Create this module? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Cancelled${NC}"
    exit 0
fi

echo -e "${BLUE}Creating module structure...${NC}"

# Create directory structure
mkdir -p "${PLUGIN_DIR}/src/lib/entities"
mkdir -p "${PLUGIN_DIR}/src/lib/dto"
mkdir -p "${PLUGIN_DIR}/src/lib/services"
mkdir -p "${PLUGIN_DIR}/src/lib/controllers"

# Create package.json
cat > "${PLUGIN_DIR}/package.json" << EOF
{
  "name": "@gauzy/plugin-vkn-erp-${MODULE_NAME_LOWER}",
  "version": "1.0.0",
  "description": "${MODULE_DESC}",
  "author": {
    "name": "Minh Tuấn - VietKeyNet Software Solutions",
    "email": "vietkeynet@gmail.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/minhtuancn/ever-gauzy",
    "directory": "packages/plugins/vkn-erp-${MODULE_NAME_LOWER}"
  },
  "bugs": {
    "url": "https://github.com/minhtuancn/ever-gauzy/issues"
  },
  "license": "MIT",
  "private": true,
  "type": "commonjs",
  "main": "./src/index.js",
  "typings": "./src/index.d.ts",
  "scripts": {
    "lib:build": "yarn nx build plugin-vkn-erp-${MODULE_NAME_LOWER}",
    "lib:build:prod": "yarn nx build plugin-vkn-erp-${MODULE_NAME_LOWER}",
    "lib:watch": "yarn nx build plugin-vkn-erp-${MODULE_NAME_LOWER} --watch"
  },
  "dependencies": {
    "@gauzy/contracts": "^0.1.0",
    "@gauzy/core": "^0.1.0",
    "@gauzy/plugin": "^0.1.0",
    "@nestjs/common": "^11.1.0",
    "@nestjs/swagger": "^11.1.5",
    "@nestjs/typeorm": "^11.0.0",
    "@nestjs/config": "^3.3.0",
    "@nestjs/jwt": "^11.0.1",
    "@nestjs/passport": "^11.1.0",
    "chalk": "^4.1.0",
    "class-validator": "^0.14.2",
    "class-transformer": "^0.5.1",
    "typeorm": "^0.3.27",
    "tslib": "^2.6.2",
    "rxjs": "^7.8.2"
  },
  "devDependencies": {
    "@types/jest": "29.5.14",
    "@types/node": "^20.14.9",
    "typescript": "^5.8.3"
  },
  "keywords": [
    "gauzy",
    "vietkeynet",
    "erp",
    "${MODULE_NAME_LOWER}",
    "plugin",
    "nestjs",
    "typescript"
  ],
  "engines": {
    "node": ">=20.18.1",
    "yarn": ">=1.22.19"
  },
  "sideEffects": false
}
EOF

# Create tsconfig.json
cat > "${PLUGIN_DIR}/tsconfig.json" << EOF
{
  "extends": "../../../tsconfig.base.json",
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ],
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
EOF

# Create tsconfig.lib.json
cat > "${PLUGIN_DIR}/tsconfig.lib.json" << EOF
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../../dist/out-tsc",
    "declaration": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["jest.config.ts", "src/**/*.spec.ts"]
}
EOF

# Create tsconfig.spec.json
cat > "${PLUGIN_DIR}/tsconfig.spec.json" << EOF
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../../dist/out-tsc",
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": ["jest.config.ts", "src/**/*.spec.ts"]
}
EOF

# Create project.json
cat > "${PLUGIN_DIR}/project.json" << EOF
{
  "name": "plugin-vkn-erp-${MODULE_NAME_LOWER}",
  "\$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/plugins/vkn-erp-${MODULE_NAME_LOWER}/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/packages/plugins/vkn-erp-${MODULE_NAME_LOWER}",
        "main": "packages/plugins/vkn-erp-${MODULE_NAME_LOWER}/src/index.ts",
        "tsConfig": "packages/plugins/vkn-erp-${MODULE_NAME_LOWER}/tsconfig.lib.json",
        "assets": ["packages/plugins/vkn-erp-${MODULE_NAME_LOWER}/*.md"]
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint"
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "packages/plugins/vkn-erp-${MODULE_NAME_LOWER}/jest.config.ts"
      }
    }
  },
  "tags": ["scope:plugins", "type:vkn-erp"]
}
EOF

# Create jest.config.ts
cat > "${PLUGIN_DIR}/jest.config.ts" << EOF
export default {
  displayName: 'plugin-vkn-erp-${MODULE_NAME_LOWER}',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/packages/plugins/vkn-erp-${MODULE_NAME_LOWER}'
};
EOF

# Create .gitignore
cat > "${PLUGIN_DIR}/.gitignore" << EOF
node_modules
dist
*.log
.DS_Store
EOF

# Create CHANGELOG.md
cat > "${PLUGIN_DIR}/CHANGELOG.md" << EOF
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - $(date +%Y-%m-%d)

### Added
- Initial module structure
- Entity definitions
- Service layer
- Controller endpoints
- DTOs with validation
EOF

# Create README.md
cat > "${PLUGIN_DIR}/README.md" << EOF
# VKN ERP ${MODULE_NAME_PASCAL} Module

${MODULE_DESC}

## Features

- TODO: List module features

## Installation

\`\`\`bash
yarn install
\`\`\`

## Usage

\`\`\`typescript
import { VknErp${MODULE_NAME_PASCAL}Module } from '@gauzy/plugin-vkn-erp-${MODULE_NAME_LOWER}';

@Module({
  imports: [VknErp${MODULE_NAME_PASCAL}Module]
})
export class AppModule {}
\`\`\`

## API Endpoints

### Base URL
\`/api/vkn-erp/${MODULE_NAME_LOWER}\`

### Endpoints
- TODO: Document API endpoints

## Development

\`\`\`bash
# Build
yarn nx build plugin-vkn-erp-${MODULE_NAME_LOWER}

# Test
yarn nx test plugin-vkn-erp-${MODULE_NAME_LOWER}

# Watch
yarn nx build plugin-vkn-erp-${MODULE_NAME_LOWER} --watch
\`\`\`

## License

MIT - VietKeyNet Software Solutions
EOF

# Create entity file
cat > "${PLUGIN_DIR}/src/lib/entities/vkn-${MODULE_NAME_LOWER}.entity.ts" << 'EOF'
import { Entity, Column } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength } from 'class-validator';
import { TenantOrganizationBaseEntity } from '@gauzy/core';

@Entity('vkn_MODULE_NAME_LOWER_entity')
export class VknMODULE_NAME_PASCALEntity extends TenantOrganizationBaseEntity {
  @ApiProperty({ type: () => String })
  @IsString()
  @MaxLength(255)
  @Column()
  name: string;

  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ApiProperty({ type: () => String, default: 'active' })
  @IsString()
  @Column({ default: 'active' })
  status: string;
}
EOF

# Replace placeholders in entity file
sed -i "s/MODULE_NAME_LOWER/${MODULE_NAME_LOWER}/g" "${PLUGIN_DIR}/src/lib/entities/vkn-${MODULE_NAME_LOWER}.entity.ts"
sed -i "s/MODULE_NAME_PASCAL/${MODULE_NAME_PASCAL}/g" "${PLUGIN_DIR}/src/lib/entities/vkn-${MODULE_NAME_LOWER}.entity.ts"

# Create entities index
cat > "${PLUGIN_DIR}/src/lib/entities/index.ts" << EOF
export * from './vkn-${MODULE_NAME_LOWER}.entity';
EOF

# Create DTO file
cat > "${PLUGIN_DIR}/src/lib/dto/${MODULE_NAME_LOWER}.dto.ts" << 'EOF'
import { IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMODULE_NAME_PASCALDTO {
  @ApiProperty({ type: () => String, maxLength: 255 })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ type: () => String })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: () => String, default: 'active' })
  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateMODULE_NAME_PASCALDTO extends CreateMODULE_NAME_PASCALDTO {}
EOF

# Replace placeholders in DTO file
sed -i "s/MODULE_NAME_PASCAL/${MODULE_NAME_PASCAL}/g" "${PLUGIN_DIR}/src/lib/dto/${MODULE_NAME_LOWER}.dto.ts"

# Create DTOs index
cat > "${PLUGIN_DIR}/src/lib/dto/index.ts" << EOF
export * from './${MODULE_NAME_LOWER}.dto';
EOF

# Create service file
cat > "${PLUGIN_DIR}/src/lib/services/vkn-${MODULE_NAME_LOWER}.service.ts" << 'EOF'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from '@gauzy/core';
import { VknMODULE_NAME_PASCALEntity } from '../entities';

@Injectable()
export class VknMODULE_NAME_PASCALService extends TenantAwareCrudService<VknMODULE_NAME_PASCALEntity> {
  constructor(
    @InjectRepository(VknMODULE_NAME_PASCALEntity)
    protected readonly repository: Repository<VknMODULE_NAME_PASCALEntity>
  ) {
    super(repository);
  }

  /**
   * Find entities by status
   */
  async findByStatus(status: string): Promise<VknMODULE_NAME_PASCALEntity[]> {
    return await this.repository.find({ where: { status } });
  }

  // Add more business logic methods here
}
EOF

# Replace placeholders in service file
sed -i "s/MODULE_NAME_PASCAL/${MODULE_NAME_PASCAL}/g" "${PLUGIN_DIR}/src/lib/services/vkn-${MODULE_NAME_LOWER}.service.ts"

# Create services index
cat > "${PLUGIN_DIR}/src/lib/services/index.ts" << EOF
export * from './vkn-${MODULE_NAME_LOWER}.service';
EOF

# Create controller file
cat > "${PLUGIN_DIR}/src/lib/controllers/vkn-${MODULE_NAME_LOWER}.controller.ts" << 'EOF'
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TenantPermissionGuard } from '@gauzy/core';
import { VknMODULE_NAME_PASCALService } from '../services';
import { VknMODULE_NAME_PASCALEntity } from '../entities';
import { CreateMODULE_NAME_PASCALDTO, UpdateMODULE_NAME_PASCALDTO } from '../dto';

@ApiTags('VKN ERP MODULE_NAME_PASCAL')
@ApiBearerAuth()
@UseGuards(TenantPermissionGuard)
@Controller('vkn-erp/MODULE_NAME_LOWER')
export class VknMODULE_NAME_PASCALController {
  constructor(private readonly service: VknMODULE_NAME_PASCALService) {}

  @Get()
  @ApiOperation({ summary: 'Get all MODULE_NAME_LOWER entities' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
  async findAll(@Query('status') status?: string): Promise<VknMODULE_NAME_PASCALEntity[]> {
    if (status) {
      return await this.service.findByStatus(status);
    }
    return await this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create MODULE_NAME_LOWER entity' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Record created successfully' })
  async create(@Body() dto: CreateMODULE_NAME_PASCALDTO): Promise<VknMODULE_NAME_PASCALEntity> {
    return await this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get MODULE_NAME_LOWER entity by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found record' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async findOne(@Param('id') id: string): Promise<VknMODULE_NAME_PASCALEntity> {
    return await this.service.findOneByIdString(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update MODULE_NAME_LOWER entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMODULE_NAME_PASCALDTO
  ): Promise<VknMODULE_NAME_PASCALEntity> {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete MODULE_NAME_LOWER entity' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Record deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete(id);
  }
}
EOF

# Replace placeholders in controller file
sed -i "s/MODULE_NAME_LOWER/${MODULE_NAME_LOWER}/g" "${PLUGIN_DIR}/src/lib/controllers/vkn-${MODULE_NAME_LOWER}.controller.ts"
sed -i "s/MODULE_NAME_PASCAL/${MODULE_NAME_PASCAL}/g" "${PLUGIN_DIR}/src/lib/controllers/vkn-${MODULE_NAME_LOWER}.controller.ts"

# Create controllers index
cat > "${PLUGIN_DIR}/src/lib/controllers/index.ts" << EOF
export * from './vkn-${MODULE_NAME_LOWER}.controller';
EOF

# Create module file
cat > "${PLUGIN_DIR}/src/lib/vkn-erp-${MODULE_NAME_LOWER}.module.ts" << 'EOF'
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
      { path: '/vkn-erp/MODULE_NAME_LOWER', module: VknErpMODULE_NAME_PASCALModule }
    ]),
    TypeOrmModule.forFeature(Object.values(entities)),
    TenantModule
  ],
  controllers: Object.values(controllers),
  providers: Object.values(services),
  exports: Object.values(services)
})
export class VknErpMODULE_NAME_PASCALModule {}
EOF

# Replace placeholders in module file
sed -i "s/MODULE_NAME_LOWER/${MODULE_NAME_LOWER}/g" "${PLUGIN_DIR}/src/lib/vkn-erp-${MODULE_NAME_LOWER}.module.ts"
sed -i "s/MODULE_NAME_PASCAL/${MODULE_NAME_PASCAL}/g" "${PLUGIN_DIR}/src/lib/vkn-erp-${MODULE_NAME_LOWER}.module.ts"

# Create main index file
cat > "${PLUGIN_DIR}/src/index.ts" << EOF
export * from './lib/entities';
export * from './lib/dto';
export * from './lib/services';
export * from './lib/controllers';
export * from './lib/vkn-erp-${MODULE_NAME_LOWER}.module';
EOF

# Create test file
cat > "${PLUGIN_DIR}/src/lib/services/vkn-${MODULE_NAME_LOWER}.service.spec.ts" << 'EOF'
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VknMODULE_NAME_PASCALService } from './vkn-MODULE_NAME_LOWER.service';
import { VknMODULE_NAME_PASCALEntity } from '../entities';

describe('VknMODULE_NAME_PASCALService', () => {
  let service: VknMODULE_NAME_PASCALService;
  let repository: Repository<VknMODULE_NAME_PASCALEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VknMODULE_NAME_PASCALService,
        {
          provide: getRepositoryToken(VknMODULE_NAME_PASCALEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VknMODULE_NAME_PASCALService>(VknMODULE_NAME_PASCALService);
    repository = module.get<Repository<VknMODULE_NAME_PASCALEntity>>(
      getRepositoryToken(VknMODULE_NAME_PASCALEntity)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a repository', () => {
    expect(repository).toBeDefined();
  });

  // Add more test cases here
});
EOF

# Replace placeholders in test file
sed -i "s/MODULE_NAME_LOWER/${MODULE_NAME_LOWER}/g" "${PLUGIN_DIR}/src/lib/services/vkn-${MODULE_NAME_LOWER}.service.spec.ts"
sed -i "s/MODULE_NAME_PASCAL/${MODULE_NAME_PASCAL}/g" "${PLUGIN_DIR}/src/lib/services/vkn-${MODULE_NAME_LOWER}.service.spec.ts"

echo -e "${GREEN}✓ Module structure created successfully!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. Review generated files in: ${GREEN}${PLUGIN_DIR}${NC}"
echo -e "2. Customize entities, services, and controllers as needed"
echo -e "3. Build the module: ${YELLOW}yarn nx build plugin-vkn-erp-${MODULE_NAME_LOWER}${NC}"
echo -e "4. Run tests: ${YELLOW}yarn nx test plugin-vkn-erp-${MODULE_NAME_LOWER}${NC}"
echo -e "5. Commit changes: ${YELLOW}git add . && git commit -m \"feat(vkn-erp-${MODULE_NAME_LOWER}): Initialize module\"${NC}"
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Module created successfully! 🎉${NC}"
echo -e "${BLUE}========================================${NC}"
