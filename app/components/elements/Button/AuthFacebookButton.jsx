import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import Button from './Button';
import FacebookIcon from '../Icons/SocialMedia/FacebookIcon';

export default function AuthFacebookButton({
  text,
  onCallback,
  ...otherProps
}) {
  return (
    <FacebookLogin
      appId={process.env.FACEBOOK_CLIENT_ID}
      fields="name,email,picture"
      scope="public_profile"
      callback={onCallback}
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
