import * as gulp from 'gulp';
import minimist = require('minimist');
import deploy from './deploy';
import serveClient from './serve-client';
import serveMonolith from './serve-monolith';
import buildMonolith from "./build-monolith";
import buildClient from "./build-client";

/* serverless:deploy */

const serverless_DEPLOY_OPTIONS: minimist.Opts = {
    string: ['provider', 'stage'],
    boolean: ['skip-build'],
    default: {
        provider: 'aws',
        stage: 'dev',
        'skip-build': false
    }
};
function deployTask(): Promise<void> {
    const options = minimist(process.argv.slice(2), serverless_DEPLOY_OPTIONS);
    return deploy(options.provider, options.stage);
}
deployTask.description = 'Run deploy command';
deployTask.flags = {
    '--provider': 'Cloud provider: AWS or Google.',
    '--stage': `'dev' / 'test' / 'prod'`
};
gulp.task('deploy', deployTask);

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
serveMonolithTask.description = 'Run monolith';
serveMonolithTask.flags = {
    '--platform': 'Cloud provider: AWS or Google.',
    '--sls': 'Launch monolith as lambda with sls offline.'
};
gulp.task('serve:monolith', serveMonolithTask);


/* build:monolith */
function buildMonolithTask(): Promise<void> {
  return buildMonolith();
}
buildMonolithTask.description = 'Build monolith';
gulp.task('build:monolith', buildMonolithTask);


/* build:client */
function buildClientTask(): Promise<void>{
  return buildClient();
}
buildClientTask.description = 'Build client';
gulp.task('build:client', buildClientTask);
