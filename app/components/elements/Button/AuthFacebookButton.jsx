import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import Button from './Button';
import FacebookIcon from '../Icons/SocialMedia/FacebookIcon';

export default function AuthFacebookButton({
  text,
  onCallback,
  onFailure = () => {},
  ...otherProps
}) {
  return (
    <FacebookLogin
      appId={process.env.FACEBOOK_CLIENT_ID}
      callback={onCallback}
      onFailure={onFailure}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          invert={true}
          icon={<FacebookIcon width={21} height={21} />}
          withIcon={true}
          tinyBorder={true}
          {...otherProps}
        >
          {text}
        </Button>
      )}
    />
  );
}
