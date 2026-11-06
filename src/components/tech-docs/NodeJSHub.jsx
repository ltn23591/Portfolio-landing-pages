import React from 'react';
import { Server, Activity, Layers, Zap } from 'lucide-react';
import HighlightedCode from './HighlightedCode';

const NodeJSHub = () => {
    return (
        <div className="space-y-8 animate-fade-in-up text-left">
            {/* Introduction card */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
                <h3 className="text-xl font-bold font-outfit text-white mb-2 flex items-center gap-2">
                    <Server className="text-teal-400" /> Node.js Core Deep-dive Hub
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                    Nắm vững kiến trúc phần cứng của Node.js: Xử lý I/O phi đồng bộ đơn luồng, Buffer/Stream tối ưu bộ nhớ, cơ chế đa tiến trình (Cluster) và đa luồng (Worker Threads) để giải quyết các bài toán tải nặng.
                </p>
            </div>

            {/* Section 1: Event Loop details */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 border-b border-white/5 pb-2">
                    <Activity size={16} /> 1. Cơ chế Event Loop & Microtask Queues
                </h4>
                <p className="text-xs text-slate-300">
                    Event Loop vận hành liên tục qua các pha để xử lý callbacks phi đồng bộ. Microtask Queue (`process.nextTick` và `Promise.then`) luôn được ưu tiên thực thi ngay sau mỗi pha trước khi chuyển sang pha kế tiếp.
                </p>
                <pre className="font-mono text-[11px] text-slate-400 bg-slate-950 p-4 rounded-xl border border-white/5 leading-relaxed overflow-x-auto select-text">
{`┌───────────────────────────────────────────┐
│                 Timers                    │ ◄── setTimeout(), setInterval()
└─────────────────────┬─────────────────────┘
                      ▼
┌───────────────────────────────────────────┐
│            Pending Callbacks              │ ◄── Lỗi mạng TCP, I/O bị trì hoãn
└─────────────────────┬─────────────────────┘
                      ▼
┌───────────────────────────────────────────┐
│                 Poll                      │ ◄── Truy vấn dữ liệu mới, I/O file, kết nối socket
└─────────────────────┬─────────────────────┘
                      ▼
┌───────────────────────────────────────────┐
│                 Check                     │ ◄── setImmediate()
└─────────────────────┬─────────────────────┘
                      ▼
┌───────────────────────────────────────────┐
│            Close Callbacks                │ ◄── socket.on('close'), stream.close()
└───────────────────────────────────────────┘
 [Lưu ý] Microtask Queue (Promise / nextTick) được xả sạch ngay lập tức giữa mỗi pha!`}
                </pre>
            </div>

            {/* Section 2: Buffer & Streams with code template */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 border-b border-white/5 pb-2">
                    <Layers size={16} /> 2. Xử lý File lớn với Buffer & Stream (Tối ưu RAM)
                </h4>
                <p className="text-xs text-slate-300">
                    Đọc tệp tin lớn bằng `fs.readFileSync` sẽ nạp toàn bộ tệp vào RAM, gây tràn bộ nhớ khi ứng dụng chịu tải cao. Stream giúp truyền tệp theo từng phần nhỏ (Chunks) thông qua bộ đệm Buffer:
                </p>
                <HighlightedCode code={`import fs from 'node:fs';\nimport { Transform } from 'node:stream';\n\n// 1. Tạo Read Stream để đọc file theo từng Chunk nhỏ\nconst readStream = fs.createReadStream('./large-input.log', {\n  highWaterMark: 64 * 1024 // Đọc mỗi lần tối đa 64KB (Buffer size)\n});\n\n// 2. Tạo Write Stream ghi dữ liệu ra file mới\nconst writeStream = fs.createWriteStream('./large-output.log');\n\n// 3. Tạo Transform Stream để lọc dữ liệu trực tiếp trong quá trình truyền tải\nconst uppercaseTransform = new Transform({\n  transform(chunk, encoding, callback) {\n    // Chuyển đổi ký tự trong chunk sang chữ hoa\n    const upperChunk = chunk.toString().toUpperCase();\n    this.push(upperChunk);\n    callback();\n  }\n});\n\n// 4. Pipe các stream lại với nhau: Đọc -> Biến đổi -> Ghi file\nreadStream\n  .pipe(uppercaseTransform)\n  .pipe(writeStream)\n  .on('finish', () => {\n    console.log('⚡ Đã lọc và sao chép tệp tin dung lượng lớn thành công bằng Stream!');\n  });`} />
            </div>

            {/* Section 3: Cluster and Worker Threads split */}
            <div className="p-6 rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 border-b border-white/5 pb-2">
                    <Zap size={16} /> 3. Đa Tiến Trình (Cluster) vs Đa Luồng (Worker Threads)
                </h4>
                <p className="text-xs text-slate-300">
                    - <strong className="text-white">Cluster</strong>: Nhân bản ứng dụng Node.js thành nhiều Process chạy song song trên các nhân CPU khác nhau để phân chia tải kết nối HTTP (Load balancing). Các tiến trình tách biệt bộ nhớ tuyệt đối.<br />
                    - <strong className="text-white">Worker Threads</strong>: Chạy nhiều luồng tính toán CPU (nhã mã hoá, xử lý ảnh) trên cùng một tiến trình, chia sẻ chung không gian bộ nhớ RAM để tối ưu hiệu năng.
                </p>
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-slate-300 block mb-2">Code mẫu: Tối ưu Cluster cho Server HTTP</span>
                        <HighlightedCode code={`import cluster from 'node:cluster';\nimport http from 'node:http';\nimport os from 'node:os';\n\nif (cluster.isPrimary) {\n  const numCPUs = os.availableParallelism(); // Đếm số nhân CPU thực tế của máy chủ\n  console.log(\`主 Master Process: \${process.pid} đang thiết lập \${numCPUs} tiến trình con...\`);\n\n  // Nhân bản (Fork) tiến trình dựa trên số nhân CPU\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n\n  // Tự động hồi sinh tiến trình con nếu có lỗi đột ngột crash\n  cluster.on('exit', (worker, code, signal) => {\n    console.log(\`❌ Worker \${worker.process.pid} đã tắt. Đang tự động hồi sinh...\`);\n    cluster.fork();\n  });\n} else {\n  // Các tiến trình Worker chia sẻ cổng mạng 8080 để chia tải kết nối HTTP\n  http.createServer((req, res) => {\n    res.writeHead(200);\n    res.end(\`⚡ Phản hồi từ Tiến trình con (Worker Process ID): \${process.pid}\\n\`);\n  }).listen(8080);\n}`} />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-slate-300 block mb-2">Code mẫu: Worker Thread tính toán CPU nặng</span>
                        <HighlightedCode code={`import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';\n\nif (isMainThread) {\n  // Khởi tạo luồng phụ và truyền dữ liệu đầu vào cần tính toán\n  const worker = new Worker(new URL(import.meta.url), {\n    workerData: { num: 40 }\n  });\n\n  // Lắng nghe kết quả trả về từ luồng phụ\n  worker.on('message', (result) => {\n    console.log(\`⚡ Kết quả số Fibonacci thứ 40 tính toán từ Luồng Phụ: \${result}\`);\n  });\n\n  worker.on('error', (err) => console.error(err));\n} else {\n  // Hàm đệ quy tính toán Fibonacci - Tải nặng chặn CPU\n  function fibonacci(n) {\n    if (n < 2) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n  }\n\n  const input = workerData.num;\n  const output = fibonacci(input);\n  \n  // Gửi trả kết quả về Luồng Chính\n  parentPort.postMessage(output);\n}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NodeJSHub;
