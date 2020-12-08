import {EditorWrapper} from '../../../components/layout/editor-wrapper';
import {OptionsList} from '../../playground/edit-pane';
import {TokenContext} from '../../../context/TokenContext';

const BackgroundColor: React.FC = props => {
  const [tokens, updateTokens] = useContext(TokenContext);
  console.log(props, tokens, updateTokens);
  return (
    <EditorWrapper>
      <OptionsList options={tokens.backgroundColors} handleChange={updateTokens} />
    </EditorWrapper>
  );
};

export default BackgroundColor;
