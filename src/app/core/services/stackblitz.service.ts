import StackBlitzSDK from '@stackblitz/sdk';

const INDEX_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Signals Lab</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>`;

const MAIN_TS = `import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));`;

const APP_CONFIG = `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};`;

const ROUTES = `import { Routes } from '@angular/router';

export const routes: Routes = [];`;

function ensureStandalone(code: string): string {
  if (/standalone\s*:\s*true/.test(code)) return code;
  return code.replace(
    /@Component\s*\(\s*\{/,
    '@Component({\n  standalone: true,'
  );
}

function extractSelector(code: string): string | null {
  const m = code.match(/selector\s*:\s*['"]([^'"]+)['"]/);
  return m ? m[1] : null;
}

function extractClassName(code: string): string | null {
  const m = code.match(/export\s+class\s+(\w+)/);
  return m ? m[1] : null;
}

export interface StackBlitzPayload {
  title: string;
  description: string;
  labComponentCode: string;
  labFileName: string;
  selector: string;
  className: string;
}

/** Construye los archivos del proyecto Angular para StackBlitz y lo abre. */
export function openInStackBlitz(payload: StackBlitzPayload): void {
  const code = ensureStandalone(payload.labComponentCode);
  const selector = extractSelector(code) ?? payload.selector;
  const className = extractClassName(code) ?? payload.className;

  const appComponentTs = `import { Component } from '@angular/core';
import { ${className} } from './${payload.labFileName.replace('.ts', '')}';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [${className}],
  template: \`<${selector}></${selector}>\`,
  styles: [\`\`],
})
export class AppComponent {}`;

  const files: Record<string, string> = {
    'src/index.html': INDEX_HTML,
    'src/main.ts': MAIN_TS,
    'src/app/app.config.ts': APP_CONFIG,
    'src/app/app.component.ts': appComponentTs,
    'src/app/routes.ts': ROUTES,
    [`src/app/${payload.labFileName}`]: code,
  };

  const project = {
    template: 'angular-cli' as const,
    title: payload.title,
    description: payload.description,
    files,
    dependencies: {
      '@angular/animations': '^19.0.0',
      '@angular/common': '^19.0.0',
      '@angular/compiler': '^19.0.0',
      '@angular/core': '^19.0.0',
      '@angular/forms': '^19.0.0',
      '@angular/platform-browser': '^19.0.0',
      '@angular/platform-browser-dynamic': '^19.0.0',
      '@angular/router': '^19.0.0',
      'rxjs': '~7.8.0',
      'tslib': '^2.3.0',
      'zone.js': '~0.15.0',
    },
  };

  StackBlitzSDK.openProject(project, {
    newWindow: true,
    openFile: `src/app/${payload.labFileName}`,
  });
}

/** Construye el mismo proyecto y lo embebe en un elemento (iframe en la misma página). */
export function embedInPage(
  elementOrId: string | HTMLElement,
  payload: StackBlitzPayload
): Promise<unknown> {
  const code = ensureStandalone(payload.labComponentCode);
  const selector = extractSelector(code) ?? payload.selector;
  const className = extractClassName(code) ?? payload.className;

  const appComponentTs = `import { Component } from '@angular/core';
import { ${className} } from './${payload.labFileName.replace('.ts', '')}';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [${className}],
  template: \`<${selector}></${selector}>\`,
  styles: [\`\`],
})
export class AppComponent {}`;

  const files: Record<string, string> = {
    'src/index.html': INDEX_HTML,
    'src/main.ts': MAIN_TS,
    'src/app/app.config.ts': APP_CONFIG,
    'src/app/app.component.ts': appComponentTs,
    'src/app/routes.ts': ROUTES,
    [`src/app/${payload.labFileName}`]: code,
  };

  const project = {
    template: 'angular-cli' as const,
    title: payload.title,
    description: payload.description,
    files,
    dependencies: {
      '@angular/animations': '^19.0.0',
      '@angular/common': '^19.0.0',
      '@angular/compiler': '^19.0.0',
      '@angular/core': '^19.0.0',
      '@angular/forms': '^19.0.0',
      '@angular/platform-browser': '^19.0.0',
      '@angular/platform-browser-dynamic': '^19.0.0',
      '@angular/router': '^19.0.0',
      'rxjs': '~7.8.0',
      'tslib': '^2.3.0',
      'zone.js': '~0.15.0',
    },
  };

  return StackBlitzSDK.embedProject(elementOrId, project, {
    view: 'preview',
    height: 480,
    hideDevTools: false,
    devToolsHeight: 35,
    hideExplorer: true,
    openFile: `src/app/${payload.labFileName}`,
  });
}
