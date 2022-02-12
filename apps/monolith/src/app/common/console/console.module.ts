import { Module } from '@nestjs/common';
import ConsoleService from './console.service';
import { SeedModule } from '../seed/seed.module';

@Module({
  imports: [SeedModule],
  providers: [ConsoleService]
})
export class ConsoleModule {}
