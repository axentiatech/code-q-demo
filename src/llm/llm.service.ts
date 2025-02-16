import { Injectable } from '@nestjs/common';
import { PromptTemplate } from '@langchain/core/prompts';
import { QUESTION_TEMPLATE } from 'src/prompts/template';
// import { ollamaClient } from 'src/client/llm';
import { StringOutputParser } from '@langchain/core/output_parsers';
// import { TogetherAI } from '@langchain/community/llms/togetherai';
import { OpenAI } from '@langchain/openai';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class LlmService {
  async generate(body: QueryDto) {
    const gptClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4',
    });
    const flattenedQuestion = body.query.trim().replaceAll('\n', '');
    const chain = PromptTemplate.fromTemplate(QUESTION_TEMPLATE)
      .pipe(gptClient)
      .pipe(new StringOutputParser());

    const res = await chain.invoke({
      question: flattenedQuestion,
    });

    return res;
  }
}
