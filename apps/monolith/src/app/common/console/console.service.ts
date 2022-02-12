import { Injectable } from '@nestjs/common';
import { DataFactoryService } from '../seed/data-factory.service';
import { SeedType } from '../seed/seed.model';

@Injectable()
export default class ConsoleService {
  constructor(private readonly dataFactory: DataFactoryService) {}

  start(): void {
    this.printHelp();

    process.stdin.resume();

    process.stdin.on('data', async (data): Promise<void> => {
      const parsedInput = data.toString().trim().split(' ');
      process.stdin.pause();
      switch (parsedInput[0]) {
        case 'seed':
          await this.seed(parsedInput[1]);
          break;
        default:
          break;
      }

      process.stdin.resume();

      setTimeout(() => this.printHelp(), 500);
    });
  }

  printHelp(): void {
    process.stdout.write(`Available commands:\n\tseed SEED_TYPE\n\n`);
  }

  async seed(seedTypeString: string): Promise<void> {
    const seedType = SeedType[seedTypeString as keyof typeof SeedType];
    await this.dataFactory.seed(seedType);
  }
}
