import { Module } from '@nestjs/common';
import { DataFactoryService } from './data-factory.service';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../../api/user/user.module';

@Module({
  imports: [SharedModule, UserModule],
  providers: [DataFactoryService],
  exports: [DataFactoryService]
})
export class SeedModule {}
