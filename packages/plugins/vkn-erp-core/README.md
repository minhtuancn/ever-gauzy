# Vietkeynet ERP Core Module

## Overview

The VKN ERP Core module provides foundational business logic, system configuration, and core functionality for the comprehensive Vietkeynet ERP system integrated with Ever Gauzy platform.

## Features

### Core Business Logic
- Multi-tenant architecture support
- RBAC (Role-Based Access Control) with 16+ roles and 560+ permissions
- Comprehensive audit logging
- System configuration management
- Data validation and sanitization

### System Settings
- Company profile and settings
- Multi-currency support
- Localization (Vietnamese, English, Chinese)
- Print template management
- Document numbering sequences
- Email and notification settings

### Configuration Management
- Environment-specific configurations
- Feature flags
- System parameters
- Integration settings
- Security policies

### Admin Features
- User management
- Role and permission management
- System health monitoring
- Activity logs
- Data backup and restore

## Installation

This plugin is part of the Ever Gauzy platform and is installed as a package.

```bash
yarn install
```

## Usage

Import the plugin in your NestJS application:

```typescript
import { VknErpCoreModule } from '@gauzy/plugin-vkn-erp-core';

@Module({
  imports: [
    VknErpCoreModule.forRoot({
      // Configuration options
    })
  ]
})
export class AppModule {}
```

## API Endpoints

### Company Settings
- `GET /api/vkn-erp/core/company` - Get company settings
- `PUT /api/vkn-erp/core/company` - Update company settings
- `GET /api/vkn-erp/core/company/currencies` - Get supported currencies

### System Configuration
- `GET /api/vkn-erp/core/config` - Get system configuration
- `PUT /api/vkn-erp/core/config` - Update configuration
- `POST /api/vkn-erp/core/config/validate` - Validate configuration

### User Management
- `GET /api/vkn-erp/core/users` - List users
- `POST /api/vkn-erp/core/users` - Create user
- `PUT /api/vkn-erp/core/users/:id` - Update user
- `DELETE /api/vkn-erp/core/users/:id` - Delete user

### Role Management
- `GET /api/vkn-erp/core/roles` - List roles
- `POST /api/vkn-erp/core/roles` - Create role
- `PUT /api/vkn-erp/core/roles/:id` - Update role
- `GET /api/vkn-erp/core/roles/:id/permissions` - Get role permissions

## Database Schema

The module includes entities for:
- Companies
- System configurations
- Audit logs
- User preferences
- Print templates
- Document sequences

## Development

Build the plugin:

```bash
yarn nx build plugin-vkn-erp-core
```

Watch mode for development:

```bash
yarn nx build plugin-vkn-erp-core --watch
```

Run tests:

```bash
yarn nx test plugin-vkn-erp-core
```

## License

MIT License - VietKeyNet Software Solutions

## Author

Minh Tuấn - VietKeyNet Software Solutions
Email: vietkeynet@gmail.com
Phone: 0912537003
