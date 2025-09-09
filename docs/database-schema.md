# Database Schema Documentation

## Overview
This document outlines the database schema and class structures for the SwagLab.ai application. The schema is designed to support a multi-tenant system with user management, job processing, design generation, and apparel visualization.

## Core Entities

### 1. User Entity
Represents users of the application with authentication and profile information.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    
    -- Security & Authentication
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    failed_login_attempts INT DEFAULT 0,
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    
    -- Profile Details
    avatar_url TEXT,
    phone_number VARCHAR(20),
    bio TEXT,
    
    -- Authentication Provider
    provider VARCHAR(50) DEFAULT 'local', -- 'local', 'google', 'apple', 'microsoft'
    provider_id VARCHAR(255), -- External provider user ID
    
    -- Authorization
    role VARCHAR(20) DEFAULT 'user', -- 'user', 'admin', 'moderator'
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_provider ON users(provider, provider_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);
```

### 2. Job Entity
Represents a processing job for a user, containing all brand information and design inputs.

```sql
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic Job Information
    site_url TEXT NOT NULL,
    brand_name VARCHAR(255),
    brand_personality TEXT,
    industry VARCHAR(100),
    target_audience VARCHAR(100),
    
    -- Logo Configuration
    use_existing_company_logo BOOLEAN DEFAULT FALSE,
    company_logo_url TEXT,
    use_uploaded_image BOOLEAN DEFAULT FALSE,
    uploaded_image_url TEXT,
    
    -- Design Configuration
    design_styles TEXT[], -- Array of design style keywords
    design_elements TEXT[], -- Array of design element keywords
    accent_colors TEXT[], -- Array of accent color hex codes
    fonts TEXT[], -- Array of font names
    
    -- Job Status
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed', 'cancelled'
    current_step VARCHAR(100),
    progress INT DEFAULT 0, -- 0-100
    error_message TEXT,
    
    -- Analysis Results (JSON)
    analysis_result JSONB,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Soft Delete
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);
CREATE INDEX idx_jobs_is_deleted ON jobs(is_deleted);
CREATE INDEX idx_jobs_analysis_result ON jobs USING GIN(analysis_result);
```

### 3. Design Entity
Represents a generated design/image with its specific configuration and inputs.

```sql
CREATE TABLE designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    
    -- Design Information
    design_img_url TEXT NOT NULL,
    aspect_ratio VARCHAR(10) DEFAULT '1:1', -- '1:1', '4:3', '16:9', etc.
    
    -- Generation Parameters
    prompt TEXT NOT NULL,
    negative_prompt TEXT,
    design_style VARCHAR(100),
    design_elements TEXT[], -- Array of design element keywords
    accent_colors TEXT[], -- Array of accent color hex codes
    fonts TEXT[], -- Array of font names
    
    -- Generation Metadata
    generation_provider VARCHAR(50), -- 'dalle', 'imagen', 'stability', 'replicate'
    generation_model VARCHAR(100),
    generation_time_ms INT,
    generation_cost DECIMAL(10,4),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Soft Delete
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_designs_job_id ON designs(job_id);
CREATE INDEX idx_designs_created_at ON designs(created_at);
CREATE INDEX idx_designs_is_deleted ON designs(is_deleted);
CREATE INDEX idx_designs_generation_provider ON designs(generation_provider);
```

### 4. PantoneColor Entity
Represents Pantone color information for consistent color management.

```sql
CREATE TABLE pantone_colors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Color Information
    name VARCHAR(255) NOT NULL,
    pantone_code VARCHAR(50) UNIQUE NOT NULL,
    hex VARCHAR(7) NOT NULL, -- #RRGGBB format
    rgb_r INT NOT NULL CHECK (rgb_r >= 0 AND rgb_r <= 255),
    rgb_g INT NOT NULL CHECK (rgb_g >= 0 AND rgb_g <= 255),
    rgb_b INT NOT NULL CHECK (rgb_b >= 0 AND rgb_b <= 255),
    cmyk_c DECIMAL(5,2) CHECK (cmyk_c >= 0 AND cmyk_c <= 100),
    cmyk_m DECIMAL(5,2) CHECK (cmyk_m >= 0 AND cmyk_m <= 100),
    cmyk_y DECIMAL(5,2) CHECK (cmyk_y >= 0 AND cmyk_y <= 100),
    cmyk_k DECIMAL(5,2) CHECK (cmyk_k >= 0 AND cmyk_k <= 100),
    
    -- Additional Information
    description TEXT,
    color_family VARCHAR(50), -- 'red', 'blue', 'green', etc.
    is_metallic BOOLEAN DEFAULT FALSE,
    is_fluorescent BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_pantone_colors_pantone_code ON pantone_colors(pantone_code);
CREATE INDEX idx_pantone_colors_hex ON pantone_colors(hex);
CREATE INDEX idx_pantone_colors_color_family ON pantone_colors(color_family);
```

### 5. ApparelItem Entity
Represents apparel items (t-shirts, hats, etc.) with design applications.

```sql
CREATE TABLE apparel_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    pantone_color_id UUID REFERENCES pantone_colors(id),
    
    -- Apparel Information
    item_type VARCHAR(50) NOT NULL, -- 't-shirt', 'hat', 'hoodie', 'tank-top', etc.
    item_size VARCHAR(10), -- 'S', 'M', 'L', 'XL', 'XXL', etc.
    
    -- Image URLs
    apparel_img_url_1 TEXT, -- Front view
    apparel_img_url_2 TEXT, -- Back view or alternative angle
    apparel_img_url_3 TEXT, -- Additional view if needed
    
    -- Product Information
    description TEXT,
    price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    supplier_url TEXT,
    supplier_product_id VARCHAR(100),
    
    -- Generation Metadata
    generation_prompt TEXT,
    generation_provider VARCHAR(50),
    generation_time_ms INT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Soft Delete
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_apparel_items_design_id ON apparel_items(design_id);
CREATE INDEX idx_apparel_items_pantone_color_id ON apparel_items(pantone_color_id);
CREATE INDEX idx_apparel_items_item_type ON apparel_items(item_type);
CREATE INDEX idx_apparel_items_is_deleted ON apparel_items(is_deleted);
```

### 6. PersonRendering Entity
Represents person renderings for apparel visualization.

```sql
CREATE TABLE person_renderings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    
    -- Rendering Information
    person_img_url TEXT NOT NULL,
    description TEXT,
    target_audience VARCHAR(100),
    generation_prompt TEXT,
    
    -- Generation Metadata
    generation_provider VARCHAR(50),
    generation_time_ms INT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Soft Delete
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_person_renderings_design_id ON person_renderings(design_id);
CREATE INDEX idx_person_renderings_is_deleted ON person_renderings(is_deleted);
```

## Junction Tables

### 7. JobPantoneColors
Links jobs to their selected Pantone colors.

```sql
CREATE TABLE job_pantone_colors (
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    pantone_color_id UUID NOT NULL REFERENCES pantone_colors(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (job_id, pantone_color_id)
);

-- Indexes
CREATE INDEX idx_job_pantone_colors_job_id ON job_pantone_colors(job_id);
CREATE INDEX idx_job_pantone_colors_pantone_color_id ON job_pantone_colors(pantone_color_id);
```

## Additional Supporting Tables

### 8. UserSessions
Manages user authentication sessions.

```sql
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_session_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX idx_user_sessions_is_active ON user_sessions(is_active);
```

### 9. ApiKeys
Manages API keys for external integrations.

```sql
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) UNIQUE NOT NULL,
    permissions TEXT[], -- Array of permission strings
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_is_active ON api_keys(is_active);
```

### 10. AuditLogs
Tracks important system events for security and debugging.

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50), -- 'job', 'design', 'user', etc.
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_details ON audit_logs USING GIN(details);
```

## Database Constraints and Triggers

### Update Timestamps Trigger
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_designs_updated_at BEFORE UPDATE ON designs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pantone_colors_updated_at BEFORE UPDATE ON pantone_colors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_apparel_items_updated_at BEFORE UPDATE ON apparel_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_person_renderings_updated_at BEFORE UPDATE ON person_renderings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Data Validation Rules

1. **Email Format**: All email addresses must be valid email format
2. **Password Strength**: Minimum 8 characters, must contain letters and numbers
3. **URL Validation**: Site URLs must be valid HTTP/HTTPS URLs
4. **Color Format**: Hex colors must be valid #RRGGBB format
5. **Aspect Ratios**: Must be valid format like "1:1", "4:3", "16:9"
6. **Price Validation**: Prices must be positive numbers
7. **Status Values**: Must be from predefined enum values

## Performance Considerations

1. **Partitioning**: Consider partitioning large tables (audit_logs, designs) by date
2. **Archiving**: Implement data archiving for old completed jobs
3. **Caching**: Use Redis for frequently accessed data (user sessions, API keys)
4. **Indexing**: Monitor query performance and add indexes as needed
5. **Connection Pooling**: Use connection pooling for database connections
