import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { LightTheme, BaseProvider } from 'baseui';
import App from './App';
import { dbInit } from './utils/db';
import './index.css';

const engine = new Styletron();
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

dbInit().then((res: boolean) => {
  root.render(
    <StrictMode>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <App dbSuccess={res} />
        </BaseProvider>
      </StyletronProvider>
    </StrictMode>
  );
});
