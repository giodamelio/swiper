import { parseString } from 'xml2js';

export function parseXML(input: string): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    parseString(input, { explicitArray: false }, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}
