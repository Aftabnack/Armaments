import { useStyletron } from 'baseui';
import { AppNavBar } from 'baseui/app-nav-bar';
import { StyledBody } from 'baseui/card';
import { LabelLarge } from 'baseui/typography';
import ArmsMain from './arms/ArmsMain';
import DBError from './assets/db_error.svg';

type CompProps = {
  dbSuccess: boolean;
};

export default function App(props: CompProps) {
  const { dbSuccess } = props;

  const [css, theme] = useStyletron();

  const rootCls = css({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: theme.colors.backgroundLightAccent
  });

  const contentCls = css({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  });

  return (
    <div className={rootCls}>
      <AppNavBar title="Armaments" />
      {dbSuccess ? (
        <ArmsMain />
      ) : (
        <StyledBody className={contentCls}>
          <img src={DBError} width="80%" />
          <LabelLarge className={css({ marginTop: theme.sizing.scale400 })}>
            Your phone doesn't have access to store the information
          </LabelLarge>
        </StyledBody>
      )}
    </div>
  );
}
