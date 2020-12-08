import {Theme} from '@twilio-paste/core/theme';

const App: React.FC<{Component: any; pageProps: any}> = ({Component, pageProps}) => {
  return (
    <Theme.Provider theme="default">
      <Component {...pageProps} />
    </Theme.Provider>
  );
};

export default App;
