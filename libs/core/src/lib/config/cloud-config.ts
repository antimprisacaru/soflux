import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yml';

export function cloudConfig() {
    return yaml.load(readFileSync(join(__dirname, process.env.CLOUD_PROVIDER + '.' + YAML_CONFIG_FILENAME), 'utf8')) as Record<string, any>;
}
