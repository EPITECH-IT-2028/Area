import { Injectable } from '@nestjs/common';

export interface ActionData {
  [key: string]: string | number | boolean | null | undefined;
}

@Injectable()
export class VariableReplacer {

  static replaceVariables(template: string, data: ActionData): string {
    let s = template;
    for (const key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
      const v = data[key];
      const replacement = v === null || v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
      const k = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      s = s.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), replacement);
    }

    return s.replace(/\{\{[^}]+\}\}/g, '');
  }
}