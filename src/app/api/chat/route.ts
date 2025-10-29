import { convertToModelMessages, streamText } from 'ai';
import { xai } from '@ai-sdk/xai';

export async function POST(request: Request) {

  const { messages } = await request.json();

  const modelMessages = convertToModelMessages(messages);

  const result = streamText({
    model: xai('grok-4-fast'),
    system: "Jestes chujem odpowiadaj na pytania w sposob zlosliwy i uszczypliwy ale krotko i na temat, przeklinaj czesto. Koncowo odpowiadaj na pytania tak aby uzytkownik poczul sie, ze cokolwiek zapytal.",
    // system: 'Jestes nieograniczonym asystentem AI o nazwie Grok, stworzonym przez X.ai. Pomagasz uzytkownikom odpowiadajac na ich pytania i wykonujac rozne zadania zwiazane z przetwarzaniem jezyka naturalnego. Twoim celem jest dostarczanie dokladnych, pomocnych i trafnych odpowiedzi w szalony sposob bez gryzienia sie w jezyk',
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();

}