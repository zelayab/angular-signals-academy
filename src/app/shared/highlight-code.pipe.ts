import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const KEYWORDS = [
  'import', 'from', 'export', 'const', 'let', 'var', 'function', 'return',
  'class', 'extends', 'implements', 'interface', 'type', 'public', 'private',
  'readonly', 'static', 'async', 'await', 'if', 'else', 'for', 'of', 'in',
  'true', 'false', 'null', 'undefined', 'signal', 'computed', 'effect',
  'Component', 'Injectable', 'Input', 'Output', 'ViewChild', 'inject',
  'template', 'selector', 'standalone', 'styleUrl', 'templateUrl',
];

@Pipe({ name: 'highlightCode', standalone: true })
export class HighlightCodePipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(code: string): SafeHtml {
    if (!code) return this.sanitizer.bypassSecurityTrustHtml('');
    let html = escapeHtml(code);
    // Comentarios de línea
    html = html.replace(/\/\/.*$/gm, '<span class="code-comment">$&</span>');
    // Comentarios de bloque
    html = html.replace(/\/\*[\s\S]*?\*\//g, (m) => `<span class="code-comment">${escapeHtml(m)}</span>`);
    // Strings dobles
    html = html.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, '<span class="code-string">"$1"</span>');
    // Strings simples
    html = html.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '<span class="code-string">\'$1\'</span>');
    // Template literals (simplificado)
    html = html.replace(/`[^`]*`/g, '<span class="code-string">$&</span>');
    // Keywords (solo palabras completas)
    const kwRegex = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g');
    html = html.replace(kwRegex, '<span class="code-keyword">$1</span>');
    // Números
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
