import * as gulp from 'gulp';
import minimist = require('minimist');
import serverlessDeploy from './serverless-deploy';
import serveClient from './serve-client';
import serveMonolith from './serve-monolith';

/* serverless:deploy */

const serverless_DEPLOY_OPTIONS: minimist.Opts = {
    string: ['provider'],
    boolean: ['skip-build'],
    default: {
        provider: 'aws',
        'skip-build': false
    }
};
function serverlessDeployTask(): Promise<void> {
    const options = minimist(process.argv.slice(2), serverless_DEPLOY_OPTIONS);
    return serverlessDeploy(options.provider, options['skip-build']);
}
serverlessDeployTask.description = 'Run serverless';
serverlessDeployTask.flags = {
    '--provider': 'Cloud provider: AWS or Google.',
    '--skip-build': 'Will use last built distribution.'
};
gulp.task('serverless:deploy', serverlessDeployTask);

/* serve:client */

function serveClientTask(): Promise<void> {
    return serveClient();
}
serveClientTask.description = 'Serve Client Application';
gulp.task('serve:client', serveClientTask);

/* serve:monolith */

const SERVE_MONOLITH_OPTIONS: minimist.Opts = {
    string: ['platform'],
    boolean: ['sls'],
    default: {
        platform: 'aws',
        sls: false
    }
};
function serveMonolithTask(): Promise<void> {
    const options = minimist(process.argv.slice(2), SERVE_MONOLITH_OPTIONS);
    return serveMonolith(options.platform, options.sls);
}
serveMonolithTask.description = 'Run monolithless';
serveMonolithTask.flags = {
    '--platform': 'Cloud provider: AWS or Google.',
    '--sls': 'Launch monolith as lambda with sls offline.'
};
gulp.task('serve:monolith', serveMonolithTask);
