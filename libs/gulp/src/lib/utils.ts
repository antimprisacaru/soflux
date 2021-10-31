import { spawn, StdioOptions } from 'child_process';

export function exec(cmd, args, relativePath, cb, stdio: StdioOptions = 'inherit') {
    const npm = spawn(cmd, args, {
        shell: true,
        cwd: `${process.cwd()}/${relativePath}`,
        stdio
    });
    npm.on('close', function (code) {
        if (!cb) {
            return;
        }

        if (code === 0 || code === null) {
            cb();
        } else {
            cb(`Process exited with status ${code}`);
        }
    });
    process.once('SIGINT', function () {
        npm.kill();
    });

    return npm;
}

export function execAsync(cmd, args, relativePath): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(cmd, args, relativePath, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
