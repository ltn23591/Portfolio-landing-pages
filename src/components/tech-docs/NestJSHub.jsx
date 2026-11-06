import React from 'react';
import { Cpu, FileCode, Sparkles, ShieldCheck, Shield } from 'lucide-react';
import HighlightedCode from './HighlightedCode';

const NestJSHub = () => {
    return (
        <div className="space-y-8 animate-fade-in-up text-left">
            {/* Introduction card */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                <h3 className="text-xl font-bold font-outfit text-white mb-2 flex items-center gap-2">
                    <Cpu className="text-rose-400" /> NestJS Enterprise Architecture Hub
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                    NestJS là một framework xây dựng ứng dụng Server-side Node.js hiệu năng cao, dễ mở rộng nhờ kiến trúc Dependency Injection vững chắc kết hợp chặt chẽ với TypeScript và OOP.
                </p>
            </div>

            {/* Section 1: Standard clean folder structure */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 border-b border-white/5 pb-2">
                    <FileCode size={16} /> 1. Cấu trúc Thư mục Dự án Chuẩn (Clean Architecture)
                </h4>
                <p className="text-xs text-slate-300">
                    Kiến trúc khuyên dùng cho các dự án NestJS ở quy mô doanh nghiệp giúp phân tách rõ ràng trách nhiệm giữa controller, business logic và database:
                </p>
                <pre className="font-mono text-[11px] text-slate-400 bg-slate-950 p-4 rounded-xl border border-white/5 leading-relaxed overflow-x-auto select-text">
{`src/
├── common/                  # Các bộ lọc dùng chung toàn hệ thống
│   ├── decorators/          # Custom Decorators (@CurrentUser, @Public,...)
│   ├── filters/             # Exception Filters (HttpExceptionFilter)
│   ├── guards/              # Route Guards (JwtAuthGuard, RolesGuard)
│   └── interceptors/        # Interceptors (TransformInterceptor)
├── controllers/             # Nơi tiếp nhận Request và gửi phản hồi
│   ├── auth.controller.ts
│   └── users.controller.ts
├── db/                      # Cấu hình Database & Entity / Migration
│   ├── entities/            # ORM Entities (user.entity.ts, project.entity.ts)
│   └── seeds/               # Dữ liệu khởi tạo (seeders)
├── services/                # Nơi xử lý Nghiệp vụ Logic chính
│   ├── auth.service.ts
│   └── users.service.ts
├── modules/                 # Đóng gói logic theo từng phân hệ chức năng
│   ├── auth.module.ts
│   └── users.module.ts
├── app.module.ts            # Root Module chính của ứng dụng
└── main.ts                  # Điểm khởi chạy (Entrypoint) ứng dụng`}
                </pre>
            </div>

            {/* Section 2: Core Decorators list with descriptions */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 border-b border-white/5 pb-2">
                    <Sparkles size={16} /> 2. Hướng dẫn chi tiết các Decorators trong NestJS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                        <span className="text-xs font-bold text-primary block">@Controller('path')</span>
                        <p className="text-[11px] text-slate-400">Đánh dấu một class là Controller để xử lý các HTTP Requests đi vào endpoint được chỉ định.</p>
                        <span className="text-[10px] font-mono text-slate-500 block">Ví dụ: @Controller('auth') mapping sang /auth</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                        <span className="text-xs font-bold text-primary block">@Injectable()</span>
                        <p className="text-[11px] text-slate-400">Khai báo một class là Provider trong IoC Container, cho phép NestJS tự động quản lý vòng đời và Inject Service vào Constructor.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                        <span className="text-xs font-bold text-primary block">@Get() / @Post() / @Put() / @Delete()</span>
                        <p className="text-[11px] text-slate-400">Ánh xạ phương thức của class sang các HTTP Methods tương ứng để xử lý request.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                        <span className="text-xs font-bold text-primary block">@Body() / @Query() / @Param()</span>
                        <p className="text-[11px] text-slate-400">Tách xuất trực tiếp dữ liệu từ HTTP Request: Body payload, URL Query strings, hoặc Route Params.</p>
                    </div>
                </div>
                <div className="mt-2">
                    <span className="text-xs font-bold text-slate-300 block mb-2">Code mẫu Controller DTO & Service Injection</span>
                    <HighlightedCode code={`import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';\nimport { UsersService } from '../services/users.service';\nimport { CreateUserDto } from '../dto/create-user.dto';\nimport { JwtAuthGuard } from '../common/guards/jwt-auth.guard';\n\n@Controller('users')\nexport class UsersController {\n  // Inject UsersService qua constructor (Dependency Injection)\n  constructor(private readonly usersService: UsersService) {}\n\n  @Post('register')\n  async register(@Body() createUserDto: CreateUserDto) {\n    // Lấy dữ liệu body đã được validate tự động qua CreateUserDto\n    return this.usersService.create(createUserDto);\n  }\n\n  @Get(':id')\n  @UseGuards(JwtAuthGuard) // Bảo vệ endpoint bằng JWT Auth Guard\n  async findOne(@Param('id') id: string) {\n    return this.usersService.findById(id);\n  }\n}`} />
                </div>
            </div>

            {/* Section 3: class-validator detailed guide */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 border-b border-white/5 pb-2">
                    <ShieldCheck size={16} /> 3. Xác thực Dữ liệu đầu vào (class-validator)
                </h4>
                <p className="text-xs text-slate-300">
                    class-validator giúp cấu hình kiểm tra tính toàn vẹn của payload trước khi đi vào controller bằng cách định nghĩa các decorator validation ngay trong class DTO.
                </p>
                <HighlightedCode code={`import { IsString, IsNotEmpty, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';\n\nexport enum UserRole {\n  ADMIN = 'admin',\n  USER = 'user'\n}\n\nexport class CreateUserDto {\n  @IsNotEmpty({ message: 'Tên không được bỏ trống' })\n  @IsString()\n  name: string;\n\n  @IsEmail({}, { message: 'Định dạng email không hợp lệ' })\n  email: string;\n\n  @IsString()\n  @MinLength(6, { message: 'Mật khẩu tối thiểu phải từ 6 ký tự' })\n  password: string;\n\n  @IsOptional() // Không bắt buộc\n  @IsEnum(UserRole, { message: 'Quyền tài khoản không hợp lệ' })\n  role?: UserRole;\n}`} />
            </div>

            {/* Section 4: Production main.ts Configuration */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2 border-b border-white/5 pb-2">
                    <Shield size={16} /> 4. Cấu hình main.ts đạt chuẩn Production Doanh Nghiệp
                </h4>
                <p className="text-xs text-slate-300">
                    Tệp `main.ts` là điểm khởi chạy chính của NestJS. Cần tích hợp bảo mật, CORS, Global Exception Filters và Validation Pipe để vận hành ổn định:
                </p>
                <HighlightedCode code={`import { NestFactory } from '@nestjs/core';\nimport { AppModule } from './app.module';\nimport { ValidationPipe } from '@nestjs/common';\nimport helmet from 'helmet';\n\nasync function bootstrap() {\n  // Tạo instance ứng dụng từ AppModule chính\n  const app = await NestFactory.create(AppModule);\n\n  // 1. Tích hợp Helmet để đặt các HTTP Headers bảo mật chống XSS, Clickjacking\n  app.use(helmet());\n\n  // 2. Kích hoạt Global ValidationPipe để kiểm soát DTO đầu vào tự động\n  app.useGlobalPipes(new ValidationPipe({\n    whitelist: true,            // Tự động lược bỏ các trường không định nghĩa trong DTO\n    forbidNonWhitelisted: true, // Trả về lỗi 400 Bad Request nếu gửi trường ngoài DTO\n    transform: true,            // Tự động convert kiểu dữ liệu (vd: string sang number)\n  }));\n\n  // 3. Cấu hình CORS để chỉ cho phép Client tin cậy truy vấn API\n  app.enableCors({\n    origin: process.env.CLIENT_URL || 'http://localhost:5173',\n    credentials: true,\n  });\n\n  // 4. Lắng nghe trên cổng chỉ định\n  const port = process.env.PORT || 3000;\n  await app.listen(port);\n  console.log(\`🚀 Server NestJS đang hoạt động tại cổng: \${port}\`);\n}\nbootstrap();`} />
            </div>
        </div>
    );
};

export default NestJSHub;
