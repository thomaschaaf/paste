import Head from 'next/head';
import * as Tokens from '@twilio-paste/core/design-tokens';
import {Box} from '@twilio-paste/core/box';
import {TokenSelector} from './TokenSelector';
import {TopBar} from '../../topbar';
import {TokenContext} from '../../../context/TokenContext';
import {PreviewPane} from '../../../pages/playground/preview-pane';

const EditorWrapper: React.FC = ({children}) => {
  const [tokens, updateTokens] = React.useState(Tokens);

  const handleUpdate = (bucket: string, key: string, value: string): void => {
    updateTokens({
      ...tokens,
      [key]: value, // update the root key
      [bucket]: {...tokens[bucket], [key]: value}, // update the bucketed key
    });
  };

  return (
    <>
      <Head>
        <title>Token Designer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <Box display="flex" height="100vh" overflow="hidden">
        <TokenContext.Provider tokens={tokens} updateTokens={handleUpdate}>
          <Box maxWidth="size50" width="100%" overflow="scroll">
            <TokenSelector />
            <Box padding="space60">{children}</Box>
          </Box>
          <PreviewPane />
        </TokenContext.Provider>
      </Box>
    </>
  );
};

export {EditorWrapper};
