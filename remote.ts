function getQuestionPart(phrases: string[]): string[] {
    if (phrases.length === 0) {
      return [];
    }
  
    const shortestPhrase: string = phrases[0];
  
    let commonWord: string = "";
    for (let i: number = 0; i < shortestPhrase.length; i++) {
      for (let j: number = i + 1; j <= shortestPhrase.length; j++) {
        const substring: string = shortestPhrase.substring(i, j);
        if (phrases.every((phrase: string) => phrase.includes(substring))) {
          if (substring.length > commonWord.length) {
            commonWord = substring;
          }
        } else {
          break;
        }
      }
    }
  
    let result: string[] = phrases.map((words: string) => words.replaceAll(commonWord, ""));
    return result;
  }
  
