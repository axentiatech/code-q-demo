import { Body, Controller, Post } from '@nestjs/common';
import { LlmService } from './llm.service';
import { QueryDto } from './dto/query.dto';

@Controller('llm')
export class LlmController {
  constructor(private llm: LlmService) {}

  @Post('query')
  async generate(@Body() body: QueryDto) {
    return this.llm.generate(body);
  }
}
