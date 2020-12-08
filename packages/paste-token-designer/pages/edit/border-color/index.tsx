import * as Tokens from '@twilio-paste/core/design-tokens';
import {EditorWrapper} from '../../../components/layout/editor-wrapper';
import {OptionsList} from '../../playground/edit-pane';

const BorderColor: React.FC = () => {
  const [tokens, updateTokens] = React.useState(Tokens);

  const handleChange = (bucket: string, key: string, value: string): void => {
    updateTokens({
      ...tokens,
      [key]: value, // update the root key
      [bucket]: {...tokens[bucket], [key]: value}, // update the bucketed key
    });
  };

  return (
    <EditorWrapper>
      <OptionsList options={tokens.borderColors} handleChange={handleChange} />
    </EditorWrapper>
  );
};

export default BorderColor;
